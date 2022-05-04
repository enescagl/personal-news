import { useAuthStore } from "@/stores/auth";

export function useUserHasPermission(resource: string) {
  const authStore = useAuthStore();

  type PermissionType = "add" | "change" | "delete" | "view";

  function hasPermission(permissionType: PermissionType) {
    return authStore.currentUserPermissions.filter(
      (permission) => permission.codename === `${permissionType}_${resource}`
    );
  }

  return {
    hasPermission,
  };
}
