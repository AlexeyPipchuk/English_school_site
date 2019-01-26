from django.db import models
from django.contrib.auth.models import User


class Lesson(models.Model):
    begin = models.DateTimeField()
    end = models.DateTimeField()
    title = models.CharField(max_length=100, default='Нет заголовка')
    description = models.CharField(max_length=5000, default='', blank=True, null=True)
    is_event = models.BooleanField(default=False)
    group = models.ForeignKey('Group', on_delete=models.SET_NULL, blank=True, null=True)
    teachers = models.ManyToManyField('Teacher')
    room = models.ForeignKey('Classroom', on_delete=models.PROTECT)


class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    group = models.ManyToManyField('Group', blank=True)


class Group(models.Model):
    name = models.CharField(max_length=50)
    course = models.ForeignKey('Course', default=None, on_delete=models.SET_NULL, null=True, blank=True)


class Classroom(models.Model):
    name = models.CharField(max_length=50, default=None)
    number_of_seats = models.IntegerField(default=0)


class Course(models.Model):
    name = models.CharField(max_length=50, default=None)
    coast = models.IntegerField(default=0)
    about = models.CharField(max_length=250, default=None, null=True)
    public = models.BooleanField(default=True)


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Journal(models.Model):
    client = models.ForeignKey(Client, on_delete=models.SET_NULL, null=True, blank=True)
    lesson = models.ForeignKey(Lesson, on_delete=models.SET_NULL, null=True, blank=True)


class Payment(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    date = models.DateTimeField()
    difference = models.IntegerField(default=0)
