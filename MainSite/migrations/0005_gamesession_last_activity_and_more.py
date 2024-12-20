# Generated by Django 5.1.2 on 2024-12-08 01:06

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MainSite', '0004_accountinfo_date_created'),
    ]

    operations = [
        migrations.AddField(
            model_name='gamesession',
            name='last_activity',
            field=models.DateTimeField(db_default=datetime.datetime(2024, 12, 8, 1, 6, 37, 854380), verbose_name='last activity'),
        ),
        migrations.AlterField(
            model_name='accountinfo',
            name='date_created',
            field=models.DateTimeField(db_default=datetime.datetime(2024, 12, 8, 1, 6, 37, 846764)),
        ),
        migrations.AlterField(
            model_name='accountinfo',
            name='user_id',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='loginsession',
            name='session_id',
            field=models.CharField(max_length=50),
        ),
    ]
