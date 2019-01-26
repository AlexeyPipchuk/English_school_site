# Generated by Django 2.1.2 on 2019-01-23 06:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_', '0005_journal'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', models.DateTimeField()),
                ('difference', models.IntegerField(default=0)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='calendar_.Client')),
            ],
        ),
    ]
