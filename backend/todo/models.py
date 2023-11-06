from django.db import models

# Create your models here.


class Users(models.Model):
    username = models.CharField(max_length=50)
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    passwd = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.username}"


class Tasks(models.Model):
    task = models.CharField(max_length=50)
    priority = models.IntegerField()
    userId = models.IntegerField()

    def __str__(self):
        return f"Task: {self.task} Priority: {self.priority}"
