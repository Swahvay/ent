package configs

import (
	"time"

	"github.com/lolopinto/ent/ent"
)

// AccountConfig is the config for test accounts in test land
type AccountConfig struct {
	FirstName      string
	LastName       string
	PhoneNumber    string    `unique:"true"`
	NumberOfLogins int       `graphql:"_"`
	LastLoginAt    time.Time `graphql:"lastLoginTime" db:"last_login_time"`
}

// GetTableName returns the underyling database table the account model's data is stored
func (config *AccountConfig) GetTableName() string {
	return "accounts"
}

// GetEdges returns the edges that this account is mapped to
func (config *AccountConfig) GetEdges() map[string]interface{} {
	return map[string]interface{}{
		"Todos": ent.ForeignKeyEdge{
			EntConfig: TodoConfig{},
		},
		"Friendships": ent.AssociationEdgeGroup{
			EdgeGroups: ent.EdgeMap{
				"FriendRequests": ent.AssociationEdge{
					EntConfig: AccountConfig{},
					InverseEdge: &ent.InverseAssocEdge{
						EdgeName: "FriendRequestsReceived",
					},
				},
			},
			GroupStatusName: "FriendshipStatus",
			// TODO move Friends in here
		},
		"Friends": ent.AssociationEdge{
			EntConfig: AccountConfig{},
			Symmetric: true,
		},
		// edge from account -> folders. one-way edge with the inverse data being stored in the field
		"Folders": ent.AssociationEdge{
			EntConfig: FolderConfig{},
			EdgeAction: &ent.EdgeActionConfig{
				Action:            ent.AddEdgeAction,
				CustomActionName:  "AccountAddFoldersAction", // EventAddInviteesAction is default
				CustomGraphQLName: "accountFolderAdd",
			},
		},
	}
}
