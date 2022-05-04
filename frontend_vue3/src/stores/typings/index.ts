import type { User } from "@/models/auth";

export interface AuthStoreState {
  currentUser: null | User;
}
