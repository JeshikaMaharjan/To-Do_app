from django.shortcuts import render
from .models import Tasks,Users
from .serializers import TaskSerializer, UserSerializer
from django.http import HttpResponse
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
import logging
# Create your views here.

@api_view(['POST'])
def userCreate(request):
    # print(request.data)
    userSerializer =  UserSerializer(data = request.data)
    if userSerializer.is_valid():
        userSerializer.save()
        return Response({'status':'ok' , 'message':'Registered successfully','data':userSerializer.data})
    return(userSerializer.errors)

@api_view(['POST'])
def userLogin(request):
    data = json.loads(request.body)
    print(data)
    username = data['username']
    password = data['password']
    try:
        user = Users.objects.get(username = username, passwd = password)
        print ('u', user)
        return Response({'status':'ok', 'data': {'id':user.id}})
    except:
        return Response({"status":'error',"message":"Invalid username or password"})

@api_view(['GET'])
def getUsers(request):    
    data = Users.objects.all()    
    serializer = UserSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addTask(request):
    serializer = TaskSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'status':'ok', 'message': 'Task added','data':serializer.data})
    return(serializer.errors)

@api_view(['GET'])
def viewTask(request, userId):
    print(userId)
    try:
        tasks = Tasks.objects.filter(userId = userId)
        print(tasks)
        serializer = TaskSerializer(tasks, many= True)
        return Response({'status':'ok', 'data':serializer.data})
    except:
        return Response({'status':'error'})
    
@api_view(['DELETE'])
# def deleteTask(request, userId):
#     data = json.loads(request.body)
#     taskId = data['taskId']
#     try:
#         tasks = Tasks.objects.filter(userId= userId, id = taskId)
#         print(tasks)
#         tasks.delete()
#         return Response({'status':'ok', "message":"Task deleted"})
#     except:
#         return Response({"status":"error"})
def deleteTask(request, userId,taskId):
    
    try:
        tasks = Tasks.objects.filter(userId= userId, id = taskId)
        print(tasks)
        tasks.delete()
        return Response({'status':'ok', "message":"Task deleted"})
    except:
        return Response({"status":"error"})
    
@api_view(['PUT'])
def editTask(request, userId):
    data = json.loads(request.body)
    taskId = data['taskId']
    newtask = data['newTask']
    priority = data['priority']
    try:
        tasks = Tasks.objects.get(userId = userId,id= taskId)
        # print(tasks)
        tasks.task = newtask
        tasks.priority = priority
        tasks.save(update_fields = ['task', 'priority'])
        return Response({"status":"ok", "message":"Task Edited"})
    except:
        return Response({"status":"error"})
