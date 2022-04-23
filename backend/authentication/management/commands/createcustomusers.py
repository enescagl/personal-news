from authentication.models import User
from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand, CommandError
from django.db import DatabaseError, transaction
from django.db.models import Q


class Command(BaseCommand):
    help = 'Creates demo users for the app.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--group',
            help="""Create user on specified group. (You can select either 'Editor' or 'Admin')"""
        )

    def handle(self, *args, **options):
        groups = Group.objects.all()
        if not groups.filter(name__in=['Editor', 'Admin']).exists():
            _groups = [
                Group(name='Editor'),
                Group(name='Admin')
            ]
            Group.objects.bulk_create(_groups)

        group_param = options.get('group', None)

        editor_group = groups.get(name='Editor')
        admin_group = groups.get(name='Admin')

        admin_query = Q(email='demo_admin@demo.com')
        editor_query = Q(email='demo_editor@demo.com')
        has_all_users = User.objects.filter(admin_query & editor_query).count() == 2
        has_editor_user = User.objects.filter(editor_query).exists()
        has_admin_user = User.objects.filter(admin_query).exists()

        if not has_all_users and not group_param:
            try:
                with transaction.atomic():

                    demo_editor = User.objects.create_user('demo_editor@demo.com', '123456789')
                    demo_editor.groups.add(editor_group.id)
                    demo_editor.save()

                    demo_admin = User.objects.create_superuser('demo_admin@demo.com', '123456789')
                    demo_admin.groups.add(admin_group.id, editor_group.id)
                    demo_admin.save()
            except DatabaseError as e:
                self.stdout.write(self.style.WARNING('[WARN]: Users already created.'))
                self.stdout.write(self.style.ERROR('[ERROR]: %(error)s' % {'error': e}))
        elif group_param not in ['Editor', 'Admin']:
            raise CommandError(
                'Can\'t create users for specified group \'%s\'. Your options are: \'Editor\' or \'Admin\'.'
                % group_param
            )
        else:
            if not has_editor_user and group_param == 'Editor':
                demo_editor = User.objects.create_user(
                    'demo_editor', 'demo_editor@demo.com', '123456789')
                demo_editor.groups.add(editor_group.id)
                demo_editor.save()
            elif not has_admin_user and group_param == 'Admin':
                demo_admin = User.objects.create_superuser(
                    'demo_admin', 'demo_admin@demo.com', '123456789')
                demo_admin.groups.add(admin_group.id, editor_group.id)
                demo_admin.save()
