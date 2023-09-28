# Code generated by github.com/lolopinto/ent/ent, DO NOT edit. (TODO figure out correct pythonic way of doing this)

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from auto_schema.schema_item import FullTextIndex

metadata = sa.MetaData()

 
sa.Table("account_created_workspaces_edges", metadata,
    sa.Column("id1", sa.Text(), nullable=False),
    sa.Column("id1_type", sa.Text(), nullable=False),
    sa.Column("edge_type", sa.Text(), nullable=False),
    sa.Column("id2", sa.Text(), nullable=False),
    sa.Column("id2_type", sa.Text(), nullable=False),
    sa.Column("time", sa.TIMESTAMP(), nullable=False),
    sa.Column("data", sa.Text(), nullable=True),
    sa.Column("deleted_at", sa.TIMESTAMP(), nullable=True),
    sa.PrimaryKeyConstraint("id1", "edge_type", "id2", name="account_created_workspaces_edges_id1_edge_type_id2_pkey"),
    sa.Index("account_created_workspaces_edges_time_idx", "time"),
)
   
sa.Table("accounts", metadata,
    sa.Column("id", sa.Text(), nullable=False),
    sa.Column("created_at", sa.TIMESTAMP(), nullable=False),
    sa.Column("updated_at", sa.TIMESTAMP(), nullable=False),
    sa.Column("deleted_at", sa.TIMESTAMP(), nullable=True),
    sa.Column("name", sa.Text(), nullable=False),
    sa.Column("phone_number", sa.Text(), nullable=False),
    sa.Column("account_state", sa.Text(), nullable=True),
    sa.Column("account_prefs", sa.Text(), nullable=True),
    sa.Column("account_prefs_3", sa.Text(), nullable=False, server_default='{"finished_nux":false,"enable_notifs":false,"preferred_language":"en_US"}'),
    sa.Column("account_prefs_list", sa.Text(), nullable=True),
    sa.Column("credits", sa.Integer(), nullable=False, server_default='1000'),
    sa.Column("country_infos", sa.Text(), nullable=True),
    sa.Index("accounts_deleted_at_idx", "deleted_at"),
    sa.PrimaryKeyConstraint("id", name="accounts_id_pkey"),
    sa.UniqueConstraint("phone_number", name="accounts_unique_phone_number"),
)
   
sa.Table("assoc_edge_config", metadata,
    sa.Column("edge_type", sa.Text(), nullable=False),
    sa.Column("edge_name", sa.Text(), nullable=False),
    sa.Column("symmetric_edge", sa.Boolean(), nullable=False, server_default='false'),
    sa.Column("inverse_edge_type", sa.Text(), nullable=True),
    sa.Column("edge_table", sa.Text(), nullable=False),
    sa.Column("created_at", sa.TIMESTAMP(), nullable=False),
    sa.Column("updated_at", sa.TIMESTAMP(), nullable=False),
    sa.PrimaryKeyConstraint("edge_type", name="assoc_edge_config_edge_type_pkey"),
    sa.UniqueConstraint("edge_name", name="assoc_edge_config_unique_edge_name"),
    sa.ForeignKeyConstraint(["inverse_edge_type"], ["assoc_edge_config.edge_type"], name="assoc_edge_config_inverse_edge_type_fkey", ondelete="RESTRICT"),
)
   
sa.Table("object_scoped_todos_edges", metadata,
    sa.Column("id1", sa.Text(), nullable=False),
    sa.Column("id1_type", sa.Text(), nullable=False),
    sa.Column("edge_type", sa.Text(), nullable=False),
    sa.Column("id2", sa.Text(), nullable=False),
    sa.Column("id2_type", sa.Text(), nullable=False),
    sa.Column("time", sa.TIMESTAMP(), nullable=False),
    sa.Column("data", sa.Text(), nullable=True),
    sa.Column("deleted_at", sa.TIMESTAMP(), nullable=True),
    sa.PrimaryKeyConstraint("id1", "edge_type", "id2", name="object_scoped_todos_edges_id1_edge_type_id2_pkey"),
    sa.Index("object_scoped_todos_edges_time_idx", "time"),
)
   
sa.Table("tags", metadata,
    sa.Column("id", sa.Text(), nullable=False),
    sa.Column("created_at", sa.TIMESTAMP(), nullable=False),
    sa.Column("updated_at", sa.TIMESTAMP(), nullable=False),
    sa.Column("deleted_at", sa.TIMESTAMP(), nullable=True),
    sa.Column("display_name", sa.Text(), nullable=False),
    sa.Column("canonical_name", sa.Text(), nullable=False),
    sa.Column("owner_id", sa.Text(), nullable=False),
    sa.Column("related_tag_ids", sa.Text(), nullable=True),
    sa.Index("tags_deleted_at_idx", "deleted_at"),
    sa.Index("tags_owner_id_idx", "owner_id"),
    sa.PrimaryKeyConstraint("id", name="tags_id_pkey"),
    sa.ForeignKeyConstraint(["owner_id"], ["accounts.id"], name="tags_owner_id_fkey", ondelete="CASCADE"),
    sa.UniqueConstraint("canonical_name", "owner_id", name="uniqueForOwner"),
)
   
sa.Table("todo_edges", metadata,
    sa.Column("id1", sa.Text(), nullable=False),
    sa.Column("id1_type", sa.Text(), nullable=False),
    sa.Column("edge_type", sa.Text(), nullable=False),
    sa.Column("id2", sa.Text(), nullable=False),
    sa.Column("id2_type", sa.Text(), nullable=False),
    sa.Column("time", sa.TIMESTAMP(), nullable=False),
    sa.Column("data", sa.Text(), nullable=True),
    sa.Column("deleted_at", sa.TIMESTAMP(), nullable=True),
    sa.PrimaryKeyConstraint("id1", "edge_type", "id2", name="todo_edges_id1_edge_type_id2_pkey"),
    sa.Index("todo_edges_time_idx", "time"),
)
   
sa.Table("todo_tags_edges", metadata,
    sa.Column("id1", sa.Text(), nullable=False),
    sa.Column("id1_type", sa.Text(), nullable=False),
    sa.Column("edge_type", sa.Text(), nullable=False),
    sa.Column("id2", sa.Text(), nullable=False),
    sa.Column("id2_type", sa.Text(), nullable=False),
    sa.Column("time", sa.TIMESTAMP(), nullable=False),
    sa.Column("data", sa.Text(), nullable=True),
    sa.Column("deleted_at", sa.TIMESTAMP(), nullable=True),
    sa.PrimaryKeyConstraint("id1", "edge_type", "id2", name="todo_tags_edges_id1_edge_type_id2_pkey"),
    sa.Index("todo_tags_edges_time_idx", "time"),
)
   
sa.Table("todos", metadata,
    sa.Column("id", sa.Text(), nullable=False),
    sa.Column("created_at", sa.TIMESTAMP(), nullable=False),
    sa.Column("updated_at", sa.TIMESTAMP(), nullable=False),
    sa.Column("deleted_at", sa.TIMESTAMP(), nullable=True),
    sa.Column("text", sa.Text(), nullable=False),
    sa.Column("completed", sa.Boolean(), nullable=False),
    sa.Column("creator_id", sa.Text(), nullable=False),
    sa.Column("completed_date", sa.TIMESTAMP(), nullable=True),
    sa.Column("assignee_id", sa.Text(), nullable=False),
    sa.Column("scope_id", sa.Text(), nullable=False),
    sa.Column("scope_type", sa.Text(), nullable=False),
    sa.Column("bounty", sa.Integer(), nullable=True),
    sa.Index("todos_created_at_idx", "created_at"),
    sa.Index("todos_deleted_at_idx", "deleted_at"),
    sa.Index("todos_completed_idx", "completed"),
    sa.Index("todos_creator_id_idx", "creator_id"),
    sa.Index("todos_completed_date_idx", "completed_date"),
    sa.Index("todos_assignee_id_idx", "assignee_id"),
    sa.PrimaryKeyConstraint("id", name="todos_id_pkey"),
    sa.ForeignKeyConstraint(["creator_id"], ["accounts.id"], name="todos_creator_id_fkey", ondelete="CASCADE"),
)
   
sa.Table("workspace_members_edges", metadata,
    sa.Column("id1", sa.Text(), nullable=False),
    sa.Column("id1_type", sa.Text(), nullable=False),
    sa.Column("edge_type", sa.Text(), nullable=False),
    sa.Column("id2", sa.Text(), nullable=False),
    sa.Column("id2_type", sa.Text(), nullable=False),
    sa.Column("time", sa.TIMESTAMP(), nullable=False),
    sa.Column("data", sa.Text(), nullable=True),
    sa.Column("deleted_at", sa.TIMESTAMP(), nullable=True),
    sa.PrimaryKeyConstraint("id1", "edge_type", "id2", name="workspace_members_edges_id1_edge_type_id2_pkey"),
    sa.Index("workspace_members_edges_time_idx", "time"),
)
   
sa.Table("workspaces", metadata,
    sa.Column("id", sa.Text(), nullable=False),
    sa.Column("created_at", sa.TIMESTAMP(), nullable=False),
    sa.Column("updated_at", sa.TIMESTAMP(), nullable=False),
    sa.Column("deleted_at", sa.TIMESTAMP(), nullable=True),
    sa.Column("name", sa.Text(), nullable=False),
    sa.Column("creator_id", sa.Text(), nullable=False),
    sa.Column("viewer_creator_id", sa.Text(), nullable=False),
    sa.Column("slug", sa.Text(), nullable=False),
    sa.Index("workspaces_deleted_at_idx", "deleted_at"),
    sa.PrimaryKeyConstraint("id", name="workspaces_id_pkey"),
    sa.ForeignKeyConstraint(["creator_id"], ["accounts.id"], name="workspaces_creator_id_fkey", ondelete="CASCADE"),
    sa.UniqueConstraint("slug", name="workspaces_unique_slug"),
)
  

metadata.info["edges"] = {
  'public': {
    'AccountToClosedTodosDupEdge': {"edge_name":"AccountToClosedTodosDupEdge", "edge_type":"7dcd1712-6a08-4253-96d9-068996bb6e4a", "edge_table":"todo_edges", "symmetric_edge":False, "inverse_edge_type":None},
    'AccountToCreatedWorkspacesEdge': {"edge_name":"AccountToCreatedWorkspacesEdge", "edge_type":"533096dc-3e79-4e66-8af8-b65e4e9c86d3", "edge_table":"account_created_workspaces_edges", "symmetric_edge":False, "inverse_edge_type":None},
    'AccountToOpenTodosDupEdge': {"edge_name":"AccountToOpenTodosDupEdge", "edge_type":"a75dafbf-0051-4804-bb99-a0c212599af3", "edge_table":"todo_edges", "symmetric_edge":False, "inverse_edge_type":None},
    'AccountToWorkspacesEdge': {"edge_name":"AccountToWorkspacesEdge", "edge_type":"b27492cd-a064-4e74-a3af-59256352ed91", "edge_table":"workspace_members_edges", "symmetric_edge":False, "inverse_edge_type":"1c8f1e5c-4bab-4ab5-8a31-1ac71688bbb0"},
    'ObjectToScopedTodosEdge': {"edge_name":"ObjectToScopedTodosEdge", "edge_type":"2a4965c1-c959-4a2d-9f93-afd131baf16b", "edge_table":"object_scoped_todos_edges", "symmetric_edge":False, "inverse_edge_type":"04ad27c4-1da0-4a90-aa2d-df4e95e381da"},
    'TagToTodosEdge': {"edge_name":"TagToTodosEdge", "edge_type":"33dd169d-a290-4d3f-8b09-b74628bec247", "edge_table":"todo_tags_edges", "symmetric_edge":False, "inverse_edge_type":"546160e1-224a-42ef-92c7-46089ab5e06e"},
    'TodoToTagsEdge': {"edge_name":"TodoToTagsEdge", "edge_type":"546160e1-224a-42ef-92c7-46089ab5e06e", "edge_table":"todo_tags_edges", "symmetric_edge":False, "inverse_edge_type":"33dd169d-a290-4d3f-8b09-b74628bec247"},
    'TodoToTodoScopeEdge': {"edge_name":"TodoToTodoScopeEdge", "edge_type":"04ad27c4-1da0-4a90-aa2d-df4e95e381da", "edge_table":"object_scoped_todos_edges", "symmetric_edge":False, "inverse_edge_type":"2a4965c1-c959-4a2d-9f93-afd131baf16b"},
    'WorkspaceToMembersEdge': {"edge_name":"WorkspaceToMembersEdge", "edge_type":"1c8f1e5c-4bab-4ab5-8a31-1ac71688bbb0", "edge_table":"workspace_members_edges", "symmetric_edge":False, "inverse_edge_type":"b27492cd-a064-4e74-a3af-59256352ed91"},
  }
}





def get_metadata():
  return metadata
