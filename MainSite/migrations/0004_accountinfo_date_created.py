# Generated by Django 5.1.2 on 2024-12-07 22:07

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MainSite', '0003_accountinfo_account_status_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='accountinfo',
            name='date_created',
            field=models.DateTimeField(db_default=datetime.datetime(2024, 12, 7, 22, 7, 27, 489007)),
        ),
    ]
