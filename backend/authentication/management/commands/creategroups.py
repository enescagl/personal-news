from django.contrib.auth.models import Group, Permission
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Creates \'Editor\' and \'Admin\' groups. And then creates appropriate permissions for them.'
    group_names = ('Editor', 'Admin')

    def handle(self, *args, **options):
        groups_to_insert = []
        for group in self.group_names:
            group_in_db = Group.objects.filter(name=group).first()
            if not group_in_db:
                groups_to_insert.append(Group(name=group))

        self.stdout.write(self.style.SUCCESS('Creating default groups. (%s)' % ', '.join(self.group_names)))
        Group.objects.bulk_create(groups_to_insert)

        self.stdout.write(self.style.SUCCESS('Giving article and image permissions to \'Editor\''))
        editor_group = Group.objects.get(name='Editor')
        editor_permissions = Permission.objects.filter(content_type__model__in=['article', 'imagecontent'])
        editor_group.permissions.set(list(editor_permissions.values_list('id', flat=True)))

        self.stdout.write(self.style.SUCCESS('Giving all permissions to \'Admin\''))
        admin_group = Group.objects.get(name='Admin')
        admin_permissions = Permission.objects.filter(
            content_type__model__in=['article', 'imagecontent', 'user', 'group', 'permission']
        )
        admin_group.permissions.set(list(admin_permissions.values_list('id', flat=True)))
