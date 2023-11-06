from django.urls import path, include
from . import views

urlpatterns = [
    path("users", views.userCreate, name="Register"),
    path("login", views.userLogin, name="Login"),
    path("getallUsers", views.getUsers, name="getAllUsersList"),
    path("addtask", views.addTask, name="addTask"),
    path("viewtask/<int:userId>", views.viewTask, name="getTaskFromUserId"),
    path("delete/<str:userId>/<int:taskId>", views.deleteTask),
    path("edittask/<int:userId>", views.editTask),
]
