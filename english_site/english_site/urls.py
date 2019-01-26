from django.contrib import admin
from django.urls import path, include
import calendar_.views as views
from .views import payment, classes, courses, price, journal, balance, groups

urlpatterns = [
    path('admin/', admin.site.urls),
    path('calendar/', include('calendar_.urls')),

    # Login
    path('login/', views.login_view),
    path(r'', price),
    path('logout/', views.logout_view),
    path('forbidden/', views.forbidden),

    # Courses
    path('manage/courses/', courses),
    path('course/delete/<int:id>/', views.delete_course),
    path('manage/courses/create/', views.create_course),
    path('course/get_courses/', views.get_courses),
    path('course/edit/<int:id>/', views.edit_course),
    path('course/edit/<int:id>/save_course/', views.save_course),

    # Journal
    path('calendar/journal/<int:id>/<int:l_id>/', journal),
    path('calendar/journal/<int:id>/<int:l_id>/save_journal/', views.save_journal),

    # Classes
    path('manage/classes/', classes),
    path('class/get_classes/', views.get_classes),
    path('manage/classes/create/', views.create_classroom),
    path('class/delete/<int:id>/', views.delete_classroom),
    path('class/edit/<int:id>/', views.edit_classroom),
    path('class/edit/<int:id>/save_classroom/', views.save_classroom),

    # Teachers
    path('teacher/',  views.teacher),
    path('teacher/create',  views.create_teacher),
    path('teacher/edit/<int:id>',  views.edit_teacher),
    path('teacher/delete/<int:id>',  views.delete_teacher),
    path('teacher/get_teachers/', views.get_teachers),

    # Client
    path('client/', views.client),
    path('client/create/', views.create_client),
    path('client/edit/<int:id>/', views.edit_client),
    path('client/delete/<int:id>/', views.delete_client),
    path('client/get_clients/', views.get_clients),
    path('client/get_groups/<int:id>/', views.get_client_groups),
    path('client/delete_group/<int:uid>/<int:gid>/', views.delete_client_group),
    path('client/add_group/<int:uid>/<int:gid>/', views.add_client_group),
    path('client/get_payments/<int:id>/', views.get_client_payments),
    path('client/add_payment/<int:id>/<int:val>/', views.add_client_payments),
    path('client/get_lessons/<int:id>/', views.get_client_lessons),

    # Groups
    path('group/get_groups/', views.get_groups),
    path('manage/groups/', groups),
    path('group/delete/<int:id>/', views.delete_group),
    path('manage/groups/create/', views.create_group),
    path('group/edit/<int:id>/', views.edit_group),
    path('group/edit/<int:id>/save_group/', views.save_group),
]
