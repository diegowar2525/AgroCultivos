from django.db import migrations, models
class Migration(migrations.Migration):

    dependencies = [
        ('cultivos', '0004_remove_especificacion_ph_max_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cultivousuario',
            name='iniciado',
            field=models.BooleanField(default=False),
        ),
    ]
