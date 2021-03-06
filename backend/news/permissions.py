from django.contrib.auth.models import Group
from rest_framework.permissions import BasePermission


class IsEditor(BasePermission):
    """
    Custom permission class for limiting editing, deleting and creating
    news only for editors.
    """

    def has_permission(self, request, view):
        action = getattr(view, 'action', None)
        if action is not None and (action == 'list' or action == 'retrieve'):
            return True
        is_user_editor = Group.objects.get(name='Editor').user_set.filter(id=request.user.id).exists()

        return request.user and request.user.is_authenticated and is_user_editor
