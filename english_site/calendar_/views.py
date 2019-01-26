from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect
from calendar_.models import *
from datetime import datetime, timedelta, timezone
from .models import *
from django.contrib.auth.models import User, Group as Django_Group
from django.db.models import Q, Sum
from django.contrib.auth import (
    authenticate,
    login as auth_login,
    logout
)

from .forms import UserLoginForm, UserRegistrationForm, ClientRegistrationForm, UpdateProfile

#################################################################
# Login


def login(request):
    return HttpResponse(render(request, 'calendar_/login.html'))


def login_view(request):
    if request.user.is_authenticated:
        return redirect('/')
    if request.method == 'POST':
        form = UserLoginForm(request.POST)
        data = {k: v for (k, v) in request.POST.items()}
        action = data.get('action', '')
        form.student = False
        form.manager = False
        if action == 'Войти':
            try:
                client = Client.objects.get(user__last_name=data['last_name'])
                user = authenticate(username=client.user.username, password='aabbccdd')
                auth_login(request, user)
                return redirect('/')
            except:
                form.student = True
        elif form.is_valid():
            try:
                username = form.cleaned_data.get('username')
                password = form.cleaned_data.get('password')
                user = authenticate(username=username, password=password)
                auth_login(request, user)
                if user.groups.filter(name='manager').exists():
                    print('redirect')
                    return redirect('/')
                elif user.groups.filter(name='teacher').exists():
                    print('redirect')
                    return redirect('/')
            except:
                form.manager = True

    else:
        form = UserLoginForm()
    context = {
        'form': form,
    }
    return render(request, "calendar_/login.html", context)


def logout_view(request):
    logout(request)
    return redirect('/')


def forbidden(request):
    return HttpResponse(render(request, 'calendar_/forbidden.html'))

#######################################################################################
# Calendar


def calendar(request):
    if not request.user.is_authenticated:
        return redirect('/forbidden')
    role = get_role(request)
    id = request.user.id
    return render(request, 'calendar_/calendar.html', locals())


def get_group_id(l):
    if l.group:
        return l.group.id
    return 0


def get_calendar(l):
    if l.group:
        return 'Занятие'
    return 'Мероприятие'


def get_course_name_from_lesson(l):
    if l.group and l.group.course:
        return l.group.course.name
    return ''


def get_course_cost_from_lesson(l):
    if l.group and l.group.course:
        return l.group.course.coast
    return ''


def get_lesson_teachers(l):
    if l.teachers:
        return [t.user.id for t in l.teachers.all()]
    return []


def lesson_to_json(l):
    return {'id': l.id,
            'begin': l.begin,
            'end': l.end,
            'title': l.title if l.title else 'Нет заголовка',
            'room_id': l.room.id,
            'group_id': l.group.id if l.group else 0,
            'group_name': l.group.name if l.group else '',
            'course_name': get_course_name_from_lesson(l),
            'course_cost': get_course_cost_from_lesson(l),
            'calendar': l.is_event,
            'teachers': get_lesson_teachers(l),
            'description': l.description,
            }


def user_in_role(user, role):
    try:
        q = User.objects.get(pk=user.id)
        return q.groups.filter(name=role).exists()
    except:
        return False


def get_role(request):
    try:
        return request.user.groups.first().name
    except:
        return 'anon'


def is_manager(user):
    return user_in_role(user, 'manager')


def is_teacher(user):
    return user_in_role(user, 'teacher')


def is_student(user):
    return user_in_role(user, 'student')


def get_lessons(request, date):
    date = datetime.strptime(date, '%Y-%m-%d')
    date = date - timedelta(days=date.weekday())
    date = date.replace(tzinfo=timezone.utc)
    print(date)
    if is_manager(request.user):
        print('manager')
        q = Lesson.objects.filter(begin__gte=date, end__lt=date + timedelta(days=7))
        return JsonResponse([lesson_to_json(l) for l in q], safe=False)

    if is_teacher(request.user):
        q = Lesson.objects.filter(teachers__user__id=request.user.id)
        return JsonResponse([lesson_to_json(l) for l in q], safe=False)

    if is_student(request.user):
        print('student')
        qq = Lesson.objects.all()
        q = []
        for i in qq:
            if i.group and i.group.client_set.filter(user__id=request.user.id).exists():
                q.append(i)
        return JsonResponse([lesson_to_json(l) for l in q], safe=False)
    return JsonResponse([], safe=False)


def create_lesson(request):
    response = {
        'ok': True,
        'message': 'created!!!'
    }
    try:
        data = {key: val for (key, val) in request.POST.items()}
        del data['csrfmiddlewaretoken']
        del data['id']
        data['begin'] = datetime.strptime(data['begin'], "%Y-%m-%dT%H:%M:%S.%fZ")
        data['end'] = datetime.strptime(data['end'], "%Y-%m-%dT%H:%M:%S.%fZ")
        data['begin'] = data['begin'].replace(tzinfo=timezone.utc)
        data['end'] = data['end'].replace(tzinfo=timezone.utc)
        print(data)
        period = int(data['period'])
        del data['date']
        del data['period']
        bg = data['begin']
        end = data['end']
        data['is_event'] = data['is_event'] == 'true'
        # room check
        for i in range(period):
            q = Lesson.objects.filter(room_id=data['room_id']).filter(Q(begin__lt=bg, end__gt=bg)
                                                                      | Q(begin__lt=end, end__gt=end)
                                                                      | Q(begin__gt=bg, begin__lt=end)
                                                                      | Q(end__gt=bg, end__lt=end)
                                                                      | Q(begin=bg, end=end))
            bg = bg + timedelta(days=7)
            end = end + timedelta(days=7)
            if len(q) > 0:
                response = {
                    'ok': False,
                    'message': 'Аудитория занята ' + q[0].begin.strftime('%Y-%m-%d')
                }
                return JsonResponse(response)
        # teacher check
        if int(data['group_id']) != 0:
            pass
            # bg = data['begin']
            # end = data['end']
            # group = Group.objects.get(pk=data['group_id'])
            # for i in range(period):
            #     q = Lesson.objects.filter(Q(begin__lt=bg, end__gt=bg)
            #                               | Q(begin__lt=end, end__gt=end)
            #                               | Q(begin__gt=bg, begin__lt=end)
            #                               | Q(end__gt=bg, end__lt=end)
            #                               | Q(begin=bg, end=end))
            #     bg = bg + timedelta(days=7)
            #     end = end + timedelta(days=7)
            #     for qq in q:
            #         if qq.group.teacher.id == group.teacher.id:
            #             response = {
            #                 'ok': False,
            #                 'message': 'Учитель занят ' + qq.group.teacher.user.first_name + ' ' + qq.group.teacher.user.last_name
            #             }
            #             return JsonResponse(response)
        else:
            data['group_id'] = None
        tids = []
        keys = []
        for (k, v) in data.items():
            if k.startswith('teacher'):
                tids.append(int(v))
                keys.append(k)
        for key in keys:
            del data[key]
        for i in range(period):
            lesson = Lesson(**data)
            lesson.save()
            data['begin'] += timedelta(days=7)
            data['end'] += timedelta(days=7)
        for tid in tids:
            print(int(tid))
            t = Teacher.objects.get(user__id=int(tid))
            lesson.teachers.add(t)
        lesson.save()
    except Exception as e:
        print(e)
        response = {
            'ok': False,
            'message': 'error'
        }
    return JsonResponse(response)


def update_lesson(request):
    response = {
        'ok': True,
        'message': 'saved!!!'
    }
    try:
        data = {key: val for (key, val) in request.POST.items()}
        print(data)
        lesson = Lesson.objects.get(pk=data['id'])
        if lesson.room.id != data['room_id']:
            room = Classroom.objects.get(pk=data['room_id'])
            lesson.room = room
        if not lesson.group and data['group_id'] or lesson.group.id != data['group_id']:
            if int(data['group_id']) != 0:
                group = Group.objects.get(pk=data['group_id'])
                lesson.group = group
            else:
                lesson.group = None

        lesson.begin = datetime.strptime(data['begin'], "%Y-%m-%dT%H:%M:%S.%fZ").replace(tzinfo=timezone.utc)
        lesson.end = datetime.strptime(data['end'], "%Y-%m-%dT%H:%M:%S.%fZ").replace(tzinfo=timezone.utc)
        lesson.description = data['description']
        lesson.title = data['title']
        lesson.is_event = data['is_event'] == 'true'
        bg = lesson.begin
        end = lesson.end
        q = Lesson.objects.filter(room_id=lesson.room.id).exclude(pk=lesson.id).filter(Q(begin__lt=bg, end__gt=bg)
                                                                                       | Q(begin__lt=end, end__gt=end)
                                                                                       | Q(begin__gt=bg, begin__lt=end)
                                                                                       | Q(end__gt=bg, end__lt=end)
                                                                                       | Q(begin=bg, end=end))
        if len(q) > 0:
            response = {
                'ok': False,
                'message': 'Аудитория занята ' + q[0].begin.strftime('%Y-%m-%d')
            }
            return JsonResponse(response)
        # if lesson.group:
        #     q = Lesson.objects.filter(group__isnull=False).exclude(pk=lesson.id).filter(Q(begin__lt=bg, end__gt=bg)
        #                                                                                 | Q(begin__lt=end, end__gt=end)
        #                                                                                 | Q(begin__gt=bg, begin__lt=end)
        #                                                                                 | Q(end__gt=bg, end__lt=end)
        #                                                                                 | Q(begin=bg, end=end))
        #     for qq in q:
        #         if qq.group.teacher.id == lesson.group.teacher.id:
        #             response = {
        #                 'ok': False,
        #                 'message': 'Учитель занят ' + qq.group.teacher.user.first_name + ' ' + qq.group.teacher.user.last_name
        #             }
        #             return JsonResponse(response)
        for t in lesson.teachers.all():
            lesson.teachers.remove(t)
        for (k, v) in data.items():
            if k.startswith('teacher'):
                t = Teacher.objects.get(user__id=int(v))
                lesson.teachers.add(t)
        lesson.save()
    except Exception as e:
        print(e)
        response = {
            'ok': False,
            'message': 'error'
        }
    return JsonResponse(response)


def delete_lesson(request, id):
    Lesson.objects.get(pk=id).delete()
    response = {
        'ok': True,
        'message': 'deleted'
    }
    return JsonResponse(response)


def get_rooms(request):
    q = Classroom.objects.all()
    rooms = [{'id': r.id,
              'name': r.name} for r in q]
    print(rooms)
    return JsonResponse(rooms, safe=False)


#######################################################################################
# Classroom


def delete_classroom(request, id):
     obj = Classroom.objects.get(id=id)
     obj.delete()
     return redirect("/manage/classes/")

def create_classroom(request):
    if request.method == "POST":
        obj = Classroom()
        if request.POST.get("number_of_seats") == '':
            obj.name = 0
        else:
            obj.number_of_seats = request.POST.get("number_of_seats")
        obj.name = request.POST.get("name")
        obj.save()
    return redirect("/manage/classes/")


def get_classes(request):
    if not is_manager(request.user):
        return JsonResponse([], safe=False)
    q = Classroom.objects.all()
    return JsonResponse([classroom_to_json(t) for t in q], safe=False)


def classroom_to_json(t):
    return {
        'id': t.id,
        'name': t.name,
        'number_of_seats': t.number_of_seats,
    }


def edit_classroom(request, id):
    classroom = Classroom.objects.get(id=id)
    return render(request, 'class/edit.html', locals())


def save_classroom(request, id):
    classroom = Classroom.objects.get(id=id)
    classroom.name = request.POST.get('name')
    if request.POST.get("number_of_seats") == '':
        classroom.number_of_seats = 0
    else:
        classroom.number_of_seats = request.POST.get("number_of_seats")
    classroom.save()
    return redirect('/manage/classes')


#######################################################################################
# Teacher


def teacher_to_json(t):
    return {
        'id': t.user.id,
        'first_name': t.user.first_name,
        'last_name': t.user.last_name,
        'email': t.user.email,
        'full_name': t.user.first_name + ' ' + t.user.last_name
    }


def get_teachers(request):
    if not is_manager(request.user):
        return JsonResponse([], safe=False)
    q = Teacher.objects.all()
    return JsonResponse([teacher_to_json(t) for t in q], safe=False)


def teacher(request):
    if not is_manager(request.user):
        return redirect('/forbidden')
    return render(request, 'teacher/index.html')


def create_teacher(request):
    if not is_manager(request.user):
        return redirect('/forbidden')
    AE = False
    form = UserRegistrationForm(request.POST or None)
    if form.is_valid():
        try:
            print('strange')
            user = form.save(commit=False)
            password = form.cleaned_data.get('password')
            user.set_password(password)
            print('strange')
            user.save()
            print('strange')
            my_group = Django_Group.objects.get(name='teacher')
            my_group.user_set.add(user)
            obj = Teacher()
            obj.user = user
            obj.save()
            return redirect('/teacher')
        except Exception as e:
            print('here')
            print(e)
            AE = True
    context = {
        'form': form,
        'AE': AE
    }
    return render(request, 'teacher/create.html', context=context)


def edit_teacher(request, id):
    if request.method != 'POST':
        u = User.objects.get(id=id)
        form = UpdateProfile(initial={
            'first_name': u.first_name,
            'last_name': u.last_name,
            'email': u.email
        })
        return render(request, 'teacher/edit.html', context={'form': form})
    form = UpdateProfile(request.POST)
    if form.is_valid():
        u = User.objects.get(pk=id)
        u.first_name = form.cleaned_data['first_name']
        u.last_name = form.cleaned_data['last_name']
        u.email = form.cleaned_data['email']
        u.save()
        return redirect('/teacher/')
    return render(request, 'teacher/edit.html', locals())


def delete_teacher(request, id):
    obj = User.objects.get(id=id)
    obj.delete()
    return redirect("/teacher")


#######################################################################################
# Course

def create_course(request):
    if request.method == "POST":
        obj = Course()
        if request.POST.get("coast") == '':
            obj.coast = 0
        else:
            obj.coast = request.POST.get("coast")
        obj.name = request.POST.get("name")
        obj.about = request.POST.get("about")
        if request.POST.get("public"):
            obj.public = request.POST.get("public")
        else:
            obj.public = False

        obj.save()
    return redirect("/manage/courses/")


def delete_course(request, id):
    obj = Course.objects.get(id=id)
    obj.delete()
    return redirect("/manage/courses/")


def get_courses(request):
    if not is_manager(request.user):
        return JsonResponse([], safe=False)
    q = Course.objects.all()
    return JsonResponse([course_to_json(t) for t in q], safe=False)


def course_to_json(t):
    return {
        'id': t.id,
        'name': t.name,
        'coast': t.coast,
        'public': t.public,
        'about': t.about,
    }


def edit_course(request, id):
    course = Course.objects.get(id=id)
    return render(request, 'course/edit.html', locals())


def save_course(request, id):
    course = Course.objects.get(id=id)
    course.name = request.POST.get('name')
    if request.POST.get("coast") == '':
        course.coast = 0
    else:
        course.coast = request.POST.get("coast")
    if request.POST.get("public"):
        course.public = True
    else:
        course.public = False
    course.about = request.POST.get('about')
    course.save()
    return redirect('/manage/courses')

#######################################################################################
# Client


def client(request):
    if not is_manager(request.user):
        return redirect('/forbidden')
    return render(request, 'client/index.html')


def get_client_balance(c):
    add = Payment.objects.filter(client__id=c.id).aggregate(Sum('difference'))['difference__sum']
    sub = Journal.objects.filter(client__id=c.id).aggregate(Sum('lesson__group__course__coast'))['lesson__group__course__coast__sum']
    if add is None:
        add = 0
    if sub is None:
        sub = 0
    return add - sub


def client_to_json(c):
    return {
        'id': c.user.id,
        'first_name': c.user.first_name,
        'last_name': c.user.last_name,
        'balance': get_client_balance(c),
    }


def get_clients(request):
    if not is_manager(request.user):
        return JsonResponse([], safe=False)
    q = Client.objects.all()
    return JsonResponse([client_to_json(t) for t in q], safe=False)


def create_client(request):
    form = ClientRegistrationForm(request.POST or None)
    AE = False
    if form.is_valid():
        try:
            user = form.save(commit=False)
            password = 'aabbccdd'
            user.set_password(password)
            user.username = user.first_name + user.last_name
            user.save()
            my_group = Django_Group.objects.get(name='student')
            my_group.user_set.add(user)
            obj = Client()
            obj.user = user
            obj.save()
            return redirect('/client')
        except:
            AE = True
    return render(request, 'client/create.html', locals())


def edit_client(request, id):
    if not is_manager(request.user):
        return redirect('/forbidden')
    if request.method != 'POST':
        u = User.objects.get(pk=id)
        form = ClientRegistrationForm(initial={
            'first_name': u.first_name,
            'last_name': u.last_name
        })
        context = {'form': form, 'hid': id}
        return render(request, 'client/edit.html', context=context)
    AE = False
    form = ClientRegistrationForm(request.POST)
    try:
        if form.is_valid():
            u = User.objects.get(pk=id)
            u.first_name = form.cleaned_data['first_name']
            u.last_name = form.cleaned_data['last_name']
            u.save()
            return redirect('/client')
    except Exception as e:
        print(e)
        AE = True

    context = {
        'form': form,
        'AE': AE
    }
    return render(request, 'client/edit.html', context=context)


def delete_client(request, id):
    obj = User.objects.get(id=id)
    obj.delete()
    return redirect("/client")


def get_client_groups(request, id):
    c = Client.objects.get(user__id=id)
    return JsonResponse([group_to_json(g) for g in c.group.all()], safe=False)


def delete_client_group(request, uid, gid):
    c = Client.objects.get(user__id=uid)
    g = Group.objects.get(pk=gid)
    c.group.remove(g)
    c.save()
    return JsonResponse([], safe=False)


def add_client_group(request, uid, gid):
    c = Client.objects.get(user__id=uid)
    g = Group.objects.get(pk=gid)
    if len(c.group.filter(pk=gid)) > 0:
        return JsonResponse({'ok': False}, safe=False)
    c.group.add(g)
    c.save()
    return JsonResponse({'ok': True}, safe=False)


def get_client_payments(request, id):
    q = Payment.objects.filter(client__user__id=id)
    return JsonResponse([payment_to_json(p) for p in q], safe=False)


def add_client_payments(request, id, val):
    p = Payment()
    p.date = datetime.now().replace(tzinfo=timezone.utc)
    p.difference = val
    p.client = Client.objects.get(user__id=id)
    p.save()
    return JsonResponse([], safe=False)


def get_client_lessons(request, id):
    q = Journal.objects.filter(client__user__id=id)
    return JsonResponse([lesson_to_json(j.lesson) for j in q], safe=False)


#######################################################################################
# Groups

def group_to_json(g):
    return {
        'id': g.id,
        'name': g.name,
        'course': g.course.name if g.course else 'У этой группы ещё нет курса',
    }


def get_groups(request):
    q = Group.objects.all()
    return JsonResponse([group_to_json(g) for g in q], safe=False)


def create_group(request):
    if request.method == "POST":
        obj = Group()
        obj.name = request.POST.get("name")
        obj.course = Course.objects.get(id=request.POST.get("course"))
        obj.save()
    return redirect("/manage/groups/")


def delete_group(request, id):
    obj = Group.objects.get(id=id)
    caption = "Без_Группы"
    if obj.name == caption:
        if Client.objects.filter(group=obj).exists():
            return redirect("/manage/clients/")
    clients = Client.objects.filter(group=obj)
    lost = Group()
    # новая группа для тех, то ее лишился
    for i in clients:
        if not(Group.objects.filter(name=caption).exists()):
            lost.name = caption
            lost.number_of_clients = 1
            lost.save()
        else:
            lost = Group.objects.get(name=caption)
            lost.number_of_clients = number_of_clients + 1
        i.group = lost
        i.save()
    obj.delete()
    return redirect("/manage/groups/")


def edit_group(request, id):
    cur = Group.objects.get(id=id)
    courses = Course.objects.all()
    return render(request, "group/edit_group.html", {'cur': cur, 'courses': courses})


def save_group(request, id):
    obj = Group.objects.get(id=id)
    obj.name = request.POST.get("name")
    obj.course = Course.objects.get(id=request.POST.get("course"))
    obj.save()
    return redirect("/manage/groups/")


#######################################################################################
# Journal

def save_journal(request, id, l_id):
    lesson = Lesson.objects.get(id=l_id)
    cost = lesson.group.course.coast
    journals = Journal.objects.filter(lesson=lesson)
    clients_id = request.POST.getlist("checks")
    without_changes = []
    for i in clients_id:
        client = Client.objects.get(id=i)
        for j in journals:
            if client == j.client:
                without_changes.append(j)
                break
    off = list(set(journals) - set(without_changes))
    for k in off:
        client_back_money = k.client
        client_back_money.balance = client_back_money.balance + int(cost)
        client_back_money.save()
        death_log = Payment.objects.get(date=lesson.begin)
        death_log.delete()
        k.delete()

    exist_already = 0
    for i in clients_id:
        client = Client.objects.get(id=i)
        journal = Journal()
        for j in journals:
            if j.client == client:
                exist_already = 1
                break
        if exist_already == 1:
            exist_already = 0
            continue
        journal.lesson = lesson
        journal.client = client
        journal.save()
        client.balance = client.balance - int(cost)
        client.save()
        pay_log = Payment()
        pay_log.client = client
        pay_log.date = lesson.begin
        pay_log.difference = -1 * int(cost)
        pay_log.save()

    return redirect("/calendar/")


#######################################################################################
# payment

def payment_to_json(p):
    return {
        'id': p.id,
        'difference': p.difference,
        'date': p.date
    }
