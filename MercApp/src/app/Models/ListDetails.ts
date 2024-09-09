import { List } from "./List";
import { Permission } from "./Permission";
import { User } from "./User";

export interface ListDetails {
    id: number;
    userId: number;
    permissionId: number;
    listId: number;
    user?: User;
    permission?: Permission;
    list?: List;
  }
  