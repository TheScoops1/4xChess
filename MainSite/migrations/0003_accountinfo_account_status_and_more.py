# Generated by Django 5.1.2 on 2024-11-28 00:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MainSite', '0002_gamesession_loginsession_delete_gameinstance_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='accountinfo',
            name='account_status',
            field=models.CharField(db_default='bse', max_length=3),
        ),
        migrations.AddField(
            model_name='gamesession',
            name='date_time_deleted',
            field=models.DateTimeField(default='2024-11-27 18:31', verbose_name='date time deleted'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='loginsession',
            name='date_time_deleted',
            field=models.DateTimeField(default='2024-11-27 18:31', verbose_name='date time deleted'),
            preserve_default=False,
        ),
    ]
