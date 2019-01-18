package models

import (
	"errors"
	"fmt"
	"reflect"
	"strings"
	"time"

	"github.com/google/uuid"
	"github.com/jmoiron/sqlx/reflectx"
	"github.com/lolopinto/jarvis/data"

	_ "github.com/lib/pq" //driver not used
)

// todo deal with struct tags
// todo empty interface{}
type insertdata struct {
	columns []string
	values  []interface{}
}

/**
* Returns the list of columns which will be affected for a SELECT statement
 */
func (insertData insertdata) getColumnsString() string {
	// remove the time pieces. can't scan into embedded objects
	columns := insertData.columns[:len(insertData.columns)-2]

	return strings.Join(columns, ", ")
}

/**
* Returns the list of columns which will be affected for a SELECT statement
 */
func (insertData insertdata) getColumnsStringForInsert() string {
	return strings.Join(insertData.columns, ", ")
}

/*
* For an INSERT or UPDATE string, return the string for values
* @see getValuesDataForInsert() and getValuesDataForUpdate
 */
func getValsString(values []interface{}) string {
	var vals []string
	for i := range values {
		vals = append(vals, fmt.Sprintf("$%d", i+1))
	}
	return strings.Join(vals, ", ")
}

/*
* Returns the string used in an INSERT statement for the values in the format:
* INSERT INTO table_name (cols_string) VALUES(vals_string)
 */
func (insertData insertdata) getValuesDataForInsert() ([]interface{}, string) {
	valsString := getValsString(insertData.values)
	return insertData.values, valsString
}

/**
* Returns a tuple of the following:
*
* We're not updating the ID and created_at columns
*
* values to be updated and
* a comma-separated string of column to positional bindvars which will be affected for an UPDATE statement
*
*	The 2nd item returned is (col_name = $1, col_name2 = $2) etc.
 */
func (insertData insertdata) getValuesDataForUpdate() ([]interface{}, string) {
	columns := insertData.columns
	// remove the id field. don't update that when updating a node
	columns = columns[1:]
	// remove the created_at field which is the last one
	columns = columns[:len(columns)-1]

	values := insertData.values
	// remove the id field. don't update that when updating a node
	values = values[1:]
	// remove the created_at field which is the last one
	values = values[:len(values)-1]

	if len(values) != len(columns) {
		panic("columns and values not of equal length for update")
	}

	var vals []string
	for i, column := range columns {
		setter := fmt.Sprintf("%s = $%d", column, i+1)
		vals = append(vals, setter)
	}

	valsString := strings.Join(vals, ", ")
	return values, valsString
}

// todo: make this smarter. for example, it shouldn't go through the
// process of reading the values from the struct/entity for reads
func getFieldsAndValuesOfStruct(value reflect.Value, setIDField bool) insertdata {
	if value.Kind() == reflect.Ptr {
		value = value.Elem()
	}
	valueType := value.Type()

	//fmt.Println(value, valueType)

	fieldCount := value.NumField()
	// fields -1 for node + 3 for uuid, created_at, updated_at
	var columns []string
	var values []interface{}

	newUUID := uuid.New().String()
	// add id column and value
	columns = append(columns, "id")
	values = append(values, newUUID)

	// TODO could eventually set time fields
	// make this a flag indicating if new object being created
	if setIDField {
		fbn := value.FieldByName("ID")
		if fbn.IsValid() {
			fbn.Set(reflect.ValueOf(newUUID))
		}
	}

	// use sqlx here?
	for i := 0; i < fieldCount; i++ {
		field := value.Field(i)
		typeOfField := valueType.Field(i)

		if field.Kind() == reflect.Struct {
			continue
			// TODO figure this out eventually
			// can hardcode the other info for now
			// or just migrate to use pop
			//getFieldsAndValuesOfStruct(field)
		}
		//fmt.Println(field.Kind(), field.Type())

		var column string
		tag := typeOfField.Tag.Get("db")
		if tag != "" {
			column = tag
		} else {
			column = typeOfField.Name
		}

		columns = append(columns, column)
		values = append(values, field.Interface())
	}
	// put updated_at before created_at so it's easier to modify later
	// for UPDATE. we don't want to change created_at field on UPDATE
	columns = append(columns, "updated_at", "created_at")
	values = append(values, time.Now(), time.Now())

	return insertdata{columns, values}
}

func getFieldsAndValues(obj interface{}, setIDField bool) insertdata {
	value := reflect.ValueOf(obj)
	return getFieldsAndValuesOfStruct(value, setIDField)
}

func loadNode(id string, entity interface{}, tableName string) error {
	if entity == nil {
		return errors.New("nil pointer passed to loadNode")
	}
	// ok, so now we need a way to map from struct to fields
	db, err := data.DBConn()
	if err != nil {
		fmt.Println("error connecting to db ", err)
		return err
	}

	defer db.Close()

	insertData := getFieldsAndValues(entity, false)
	colsString := insertData.getColumnsString()

	computedQuery := fmt.Sprintf("SELECT %s FROM %s WHERE id = $1", colsString, tableName)
	fmt.Println(computedQuery)

	stmt, err := db.Preparex(computedQuery)
	if err != nil {
		fmt.Println(err)
		return err
	}
	defer stmt.Close()

	err = stmt.QueryRowx(id).StructScan(entity)
	if err != nil {
		fmt.Println(err)
	}
	return err
}

// this borrows from/learns from scanAll in sqlx library
func loadNodes(id string, nodes interface{}, colName string, tableName string) error {
	db, err := data.DBConn()
	if err != nil {
		fmt.Println("error connecting to db ", err)
		return err
	}

	value := reflect.ValueOf(nodes)
	direct := reflect.Indirect(value)

	if value.Kind() != reflect.Ptr {
		return errors.New("must pass a pointer to loadNodes")
	}
	if value.IsNil() {
		return errors.New("nil pointer passed to loadNodes")
	}

	// get the slice from the pointer
	slice := reflectx.Deref(value.Type())
	if slice.Kind() != reflect.Slice {
		fmt.Println("sadness")
		return errors.New("sadness with error in loadNodes")
	}

	// get the base type from the slice
	base := reflectx.Deref(slice.Elem())
	// todo: confirm this is what I think it is
	// fmt.Println(base)

	// get a zero value of this
	value = reflect.New(base)
	// really need to rename this haha
	insertData := getFieldsAndValuesOfStruct(value, false)
	colsString := insertData.getColumnsString()

	computedQuery := fmt.Sprintf("SELECT %s FROM %s WHERE %s = $1", colsString, tableName, colName)
	fmt.Println(computedQuery)

	defer db.Close()

	stmt, err := db.Preparex(computedQuery)
	if err != nil {
		fmt.Println(err)
		return err
	}
	defer stmt.Close()

	rows, err := stmt.Queryx(id)
	if err != nil {
		fmt.Println(err)
		return err
	}

	defer rows.Close()

	for rows.Next() {
		entity := reflect.New(base)
		err = rows.StructScan(entity.Interface())
		if err != nil {
			fmt.Println(err)
			break
		}
		// append each entity into "nodes" destination
		direct.Set(reflect.Append(direct, reflect.Indirect(entity)))
	}

	return nil
}

func createNode(entity interface{}, tableName string) error {
	if entity == nil {
		// same as loadNode in terms of handling this better
		return errors.New("nil pointer passed to createNode")
	}
	insertData := getFieldsAndValues(entity, true)
	colsString := insertData.getColumnsStringForInsert()
	values, valsString := insertData.getValuesDataForInsert()

	computedQuery := fmt.Sprintf("INSERT INTO %s (%s) VALUES( %s)", tableName, colsString, valsString)
	fmt.Println(computedQuery)

	return changeNode(computedQuery, values)
}

func changeNode(computedQuery string, values []interface{}) error {
	db, err := data.DBConn()
	if err != nil {
		fmt.Println("error connecting to db")
		return err
	}

	defer db.Close()

	stmt, err := db.Preparex(computedQuery)

	if err != nil {
		fmt.Println(err)
		return err
	}

	res, err := stmt.Exec(values...)
	if err != nil {
		fmt.Println(err)
		return err
	}
	defer stmt.Close()

	rowCount, err := res.RowsAffected()

	if err != nil || rowCount == 0 {
		fmt.Println(err)
		return err
	}
	return nil
}

// TODO should prevent updating relational fields maybe?
func updateNode(entity interface{}, tableName string) error {
	if entity == nil {
		// same as loadNode in terms of handling this better
		return errors.New("nil pointer passed to updateNode")

	}

	insertData := getFieldsAndValues(entity, false)

	values, valsString := insertData.getValuesDataForUpdate()

	id := findID(entity)
	computedQuery := fmt.Sprintf(
		"UPDATE %s SET %s WHERE id = '%s'",
		tableName,
		valsString,
		id,
	)
	fmt.Println(computedQuery)

	return changeNode(computedQuery, values)
}

// this is a hack because i'm lazy and don't want to go update getFieldsAndValuesOfStruct()
// to do the right thing for now. now that I know what's going on here, can update everything
func findID(entity interface{}) string {
	value := reflect.ValueOf(entity).Elem()
	for i := 0; i < value.NumField(); i++ {
		field := value.Field(i)
		fieldType := field.Type()

		if field.Kind() == reflect.Struct {
			for j := 0; j < field.NumField(); j++ {
				field2 := field.Field(j)
				if fieldType.Field(j).Name == "ID" {
					return field2.Interface().(string)
				}
			}
		}
	}
	panic("Could not find ID field")
}

func deleteNode(entity interface{}, tableName string) error {
	if entity == nil {
		return errors.New("nil pointer passed to deleteNode")
	}

	db, err := data.DBConn()
	if err != nil {
		fmt.Println("error connecting to db")
		return err
	}

	defer db.Close()

	query := fmt.Sprintf("DELETE FROM %s WHERE id = $1", tableName)
	stmt, err := db.Preparex(query)

	if err != nil {
		fmt.Println(err)
		return err
	}

	id := findID(entity)
	_, err = stmt.Exec(id)
	if err != nil {
		fmt.Println(err)
		return err
	}
	defer stmt.Close()
	return nil
}
