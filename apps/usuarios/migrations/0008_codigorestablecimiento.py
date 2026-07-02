import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0007_alter_usuario_fecha_nacimiento_alter_usuario_genero'),
    ]

    operations = [
        migrations.CreateModel(
            name='CodigoRestablecimiento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=6)),
                ('creado', models.DateTimeField(auto_now_add=True)),
                ('usado', models.BooleanField(default=False)),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='codigos_restablecimiento', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]