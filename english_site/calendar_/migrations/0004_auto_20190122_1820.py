# Generated by Django 2.1.2 on 2019-01-22 11:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_', '0003_auto_20190121_2215'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lesson',
            name='lower_bound',
        ),
        migrations.RemoveField(
            model_name='lesson',
            name='period',
        ),
        migrations.RemoveField(
            model_name='lesson',
            name='upper_bound',
        ),
        migrations.AlterField(
            model_name='lesson',
            name='description',
            field=models.CharField(default='', max_length=5000),
        ),
    ]
