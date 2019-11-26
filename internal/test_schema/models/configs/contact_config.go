package configs

import "github.com/lolopinto/ent/ent"

type ContactConfig struct {
	EmailAddress  string `unique:"true"`
	FirstName     string
	LastName      string
	UserID        string  `fkey:"UserConfig.ID"`
	Favorite      bool    `graphql:"_" nullable:"true"` // these 3 exist for testing casts...
	NumberOfCalls int     `graphql:"_" nullable:"true"`
	Pi            float64 `graphql:"_" nullable:"true"`
}

func (config *ContactConfig) GetTableName() string {
	return "contacts"
}

func (config *ContactConfig) GetEdges() ent.EdgeMap {
	return ent.EdgeMap{
		"AllowList": &ent.AssociationEdge{
			EntConfig: UserConfig{},
		},
		"ContactEmails": ent.ForeignKeyEdge{
			EntConfig: ContactEmailConfig{},
		},
	}
}

func (config *ContactConfig) GetActions() []*ent.ActionConfig {
	return []*ent.ActionConfig{
		&ent.ActionConfig{
			Action: ent.CreateAction,
		},
	}
}
