from news import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'articles', views.ArticleViewSet)
router.register(r'images', views.ImageViewSet)

urlpatterns = router.urls
