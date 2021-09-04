from rest_framework.serializers import ModelSerializer
from .models import Post


class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = ["id",'post_user','post_image','post_description','uploaded_date']