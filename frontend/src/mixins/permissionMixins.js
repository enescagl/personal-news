import { mapGetters } from "vuex";

const userHasPermissionMixin = {
  computed: {
    ...mapGetters("auth", ["currentUserPermissions"]),
  },
  methods: {
    hasPermission(permissionType, contentType = this.resourceName) {
      return this.currentUserPermissions.filter(
        (permission) =>
          permission.codename === `${permissionType}_${contentType}`,
      );
    },
  },
};

export { userHasPermissionMixin };
