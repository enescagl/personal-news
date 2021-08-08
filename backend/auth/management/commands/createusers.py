from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import Group, User


class Command(BaseCommand):
    help = 'Creates demo users for the app.'

    def add_arguments(self, parser):
        parser.add_argument('--group',
                            help="""Create user on specified group.
                (You can select either 'Editor' or 'Admin')""")

    def handle(self, *args, **options):
        groups = Group.objects.all()
        if ['Editor', 'Admin'] not in groups:
            editor_group = Group.objects.get_or_create(name='Editor')
            admin_group = Group.objects.get_or_create(name='Admin')

        try:
            if options['group'] in ['Editor', 'Admin']:
                editor_group = groups.filter(name='Editor').get()
                admin_group = groups.filter(name='Admin').get()
                if options['group'] == 'Editor':
                    demo_editor = User.objects.create_user(
                        'demo_editor', 'demo_editor@demo.com', '123456789')
                    demo_editor.groups.add(editor_group.id)
                    demo_editor.save()
                if options['group'] == 'Admin':
                    demo_admin = User.objects.create_superuser(
                        'demo_admin', 'demo_admin@demo.com', '123456789')
                    demo_admin.groups.add(admin_group.id, editor_group.id)
                    demo_admin.save()
            elif not options['group']:
                editor_group = groups.filter(name='Editor').get()
                admin_group = groups.filter(name='Admin').get()

                demo_editor = User.objects.create_user('demo_editor',
                                                       'demo_editor@demo.com',
                                                       '123456789')
                demo_editor.groups.add(editor_group.id)
                demo_editor.save()

                demo_admin = User.objects.create_superuser(
                    'demo_admin', 'demo_admin@demo.com', '123456789')
                demo_admin.groups.add(admin_group.id, editor_group.id)

                demo_admin.save()
        except Exception as e:
            raise CommandError(
                'Invalid group name. Either don\'t use group or specify a correct group name.\n Exception: %s'
                % e)
