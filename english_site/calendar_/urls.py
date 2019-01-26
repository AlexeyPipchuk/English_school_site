from django.urls import path, re_path
from . import views
from django.conf.urls import url

urlpatterns = [
    path('', views.calendar, name='calendar'),
    re_path(r'^get_lessons/(?P<date>\d{4}-\d{2}-\d{2})/$', views.get_lessons),
    path('update_lesson/', views.update_lesson),
    path('create_lesson/', views.create_lesson),
    path('delete_lesson/<int:id>/', views.delete_lesson),
    path('get_rooms/', views.get_rooms),
    path('get_role', views.get_role),
]
