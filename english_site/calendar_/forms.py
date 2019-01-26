from django import forms
from django.contrib.auth import (
    authenticate,
    get_user_model,
)

from django.contrib.auth.forms import UserCreationForm

User = get_user_model()


class UserLoginForm(forms.Form):
    username = forms.CharField(label='Логин')
    password = forms.CharField(widget=forms.PasswordInput, label='Пароль')


class UserRegistrationForm(forms.ModelForm):
    email = forms.EmailField(label='Почта')
    password = forms.CharField(widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
            'email',
            'username',
            'password'
        ]


class UpdateProfile(forms.ModelForm):
    first_name = forms.CharField(required=False, label='Имя')
    last_name = forms.CharField(required=False, label='Фамилия')
    email = forms.EmailField(required=True, label='Почта')
    # username = forms.CharField(required=True, label='Логин')
    # password = forms.CharField(required=True, label='Пароль')

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')

    # def clean_email(self):
    #     username = self.cleaned_data.get('username')
    #     email = self.cleaned_data.get('email')
    #     if email and User.objects.filter(email=email).exclude(username=username).count():
    #         raise forms.ValidationError('Такой адрес уже зарегистрирован другим пользователем')
    #     return email
    #
    # def save(self, commit=True):
    #     user = super(UpdateProfile, self).save(commit=False)
    #
    #     user.email = self.cleaned_data['email']
    #     if commit:
    #         user.save()
    #     return user


class ClientRegistrationForm(forms.ModelForm):
    class Meta:
        model = User
        fields = [
            'first_name',
            'last_name',
        ]
