from rest_framework.decorators import APIView,api_view
from rest_framework.response import Response
from .serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated
from .models import User
from .models import Post

class Posts(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self,request):
        user = request.user

        posts = user.post_set.order_by('id')

        serializer = PostSerializer(posts,many=True)

        return Response(serializer.data)

    def post(self,request):
        user = request.user

        image = request.data.get('image')
        description = request.data.get('description')

        post = user.post_set.create(post_image = image, post_description = description)

        serializer = PostSerializer(post, many = False)

        return Response(serializer.data)
    

@api_view(['POST'])
def register(request):
    username = request.data['username']
    password = request.data['password']
    a = User.objects.create_user(username= username ,password = password)
    a.save()

    return Response("User Created")

@api_view(['GET'])
def getuser(request):
    try:
        user = request.user
        data = {
            "user":user.id
        }
        return Response(data)
    except:
        return Response({"user":None})

@api_view(['GET'])
def allPosts(request):
    posts = Post.objects.all()

    serializer = PostSerializer(posts,many=True)

    return Response(serializer.data)

@api_view(['DELETE'])
def delete(request,key):
        Post.objects.get(id = key).delete()
        return Response("post successfully deleted")