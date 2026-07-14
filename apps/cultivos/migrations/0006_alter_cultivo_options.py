from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cultivos', '0005_cultivousuario_iniciado'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='cultivo',
            options={'ordering': ['id']},
        ),
    ]