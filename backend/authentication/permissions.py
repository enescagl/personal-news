from rest_framework.permissions import IsAuthenticated


class EIsAuth(IsAuthenticated):
    def has_permission(self, request, view):
        print(request)
        return bool(request.user and request.user.is_authenticated)
