from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager

class Post(models.Model):
    post_user = models.ForeignKey('User',on_delete=models.CASCADE)
    post_image = models.FileField(upload_to = 'media/post_images/')
    post_description = models.TextField(null=True,blank=True)

    uploaded_date = models.DateTimeField(auto_now = True)


class UserManager(BaseUserManager):
    def create_user(self,username,password):
        if not username and password:
            msg = 'This username is not valid'
            raise ValueError(msg)


class User(AbstractUser):
    username = models.CharField(max_length=50,unique=True)
    password = models.TextField()
