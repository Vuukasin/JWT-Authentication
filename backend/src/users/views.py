from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView

from .serializers import UserCreateSerializer, UserSerializer

from django.contrib.auth import get_user_model
User = get_user_model()


class RegisterView(APIView):
    def post(data, request):
        data = request.data
        serializer = UserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)

        return Response({"message": "SUCCESS"}, status=status.HTTP_201_CREATED)


