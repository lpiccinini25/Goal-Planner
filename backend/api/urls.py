from django.urls import path
from . import views

urlpatterns = [
    path("tasks/", views.TaskListCreate.as_view(), name="task-list"),
    path("task/delete/<int:pk>/", views.TaskDelete.as_view(), name="delete-task"),
    path("tasks/update/<int:pk>/", views.TaskUpdate.as_view(), name="update-task"),
    path("tasks/thismonth/", views.RetrieveMonthlyTasks.as_view(), name="monthly-tasks"),
    path("task/<int:pk>/", views.TaskFromID.as_view(), name="task")
]