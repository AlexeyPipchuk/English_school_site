from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from calendar_.models import Classroom, Teacher, Course, Client, Group, Lesson, Journal, Payment


@login_required
def payment(request):
    clients = Client.objects.all()
    groups = Group.objects.all()
    return render(request, 'calendar_/payment.html', locals())


@login_required
def classes(request):
    classroms = Classroom.objects.all()
    return render(request, 'class/classes.html', locals())


@login_required


@login_required
def courses(request):
    courses = Course.objects.all()
    return render(request, 'course/courses.html', locals())


@login_required
def journal(request, id, l_id):
    group = Group.objects.get(id=id)
    clients = Client.objects.filter(group=group)
    lesson = Lesson.objects.get(id=l_id)
    teachers = lesson.teachers
    journals = Journal.objects.filter(lesson=lesson)
    checked = []
    for i in clients:
        for j in journals:
            if j.client == i:
                checked.append(i)
                break
    unchecked = list(set(clients) - set(checked))
    return render(request, 'calendar_/journal.html', locals())


def price(request):
    courses = Course.objects.filter(public=True)
    role = 'anon'
    try:
        role = request.user.groups.first().name
    except:
        pass
    return render(request, 'calendar_/price.html', locals())


@login_required
def balance(request, id):
    client = Client.objects.get(id=id)
    logs = Payment.objects.filter(client=client)
    return render(request, 'manage/balance.html', locals())

@login_required
def groups(request):
    groups = Group.objects.all()
    courses = Course.objects.all()
    return render(request, 'group/index.html', locals())
