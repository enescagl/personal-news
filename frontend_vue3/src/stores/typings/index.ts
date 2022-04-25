import type { User } from "@/models";

export interface AuthStoreState {
  currentUser: null | User;
}
