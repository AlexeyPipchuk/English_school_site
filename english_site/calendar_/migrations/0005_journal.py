# Generated by Django 2.1.2 on 2019-01-22 14:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_', '0004_auto_20190122_1820'),
    ]

    operations = [
        migrations.CreateModel(
            name='Journal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='calendar_.Client')),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='calendar_.Lesson')),
            ],
        ),
    ]
