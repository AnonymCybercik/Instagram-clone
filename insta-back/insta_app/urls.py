from django.urls import path,include
from .views import Posts,register,getuser,allPosts,delete
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/v1/posts/',Posts.as_view()),
    path('api/v1/posts/<int:key>/',delete),
    path('api/v1/get-user/',getuser),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('api/v1/accounts/signin/',register),
    path('api/v1/all-posts/',allPosts),

    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
