import { useAuthStore } from "@/stores/auth";

type PermissionType = "add" | "change" | "delete" | "view";

export function useUserHasPermission(resource: string) {
  const authStore = useAuthStore();

  function hasPermission(permissionType: PermissionType) {
    return authStore.currentUserPermissions.filter(
      (permission) => permission.codename === `${permissionType}_${resource}`
    );
  }

  return {
    hasPermission,
  };
}
