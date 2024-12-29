from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Task
from datetime import datetime

class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Task.objects.filter(author=user)

        timestamp = self.request.query_params.get('timestamp', None)
        if timestamp:
            try:
                date = datetime.fromtimestamp(int(timestamp)/1000)
                queryset = queryset.filter(task_date=date)
            except ValueError:
                # Handle invalid date format gracefully
                pass

        return queryset
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            timestamp = self.request.query_params.get('timestamp', None)
            if timestamp:
                date = datetime.fromtimestamp(int(timestamp)/1000)
            serializer.save(author=self.request.user, task_date=date)
        else:
            print(serializer.errors)

class TaskUpdate(generics.UpdateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(author=user)

class TaskDelete(generics.DestroyAPIView):
    seralizer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(author=user)
    
    

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


