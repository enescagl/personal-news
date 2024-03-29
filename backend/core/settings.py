import os
from datetime import timedelta
from pathlib import Path

import dotenv

dotenv.load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get(
    "DJANGO_SECRET",
    default="django-insecure-(r-my4bolc!oyc(a!yel16wld%f80gz_16(q$fye2!ymarg0=2",
)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DEBUG", "false").lower() == "true"
IS_DOCKER = os.getenv("IS_DOCKER", "false").lower() == "true"

allowed_hosts_environment = os.environ.get("ALLOWED_HOSTS", None)
# if allowed_hosts_environment:
#     ALLOWED_HOSTS = list(map(lambda host: host.strip(), allowed_hosts_environment.split(',')))
# else:
ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "django_filters",
    "core",
    "authentication",
    "news",
    "drf_spectacular",
    "corsheaders",
    "rest_framework_simplejwt",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "django.middleware.locale.LocaleMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.environ.get("POSTGRES_DB", "personal_news"),
        "HOST": os.environ.get("POSTGRES_HOST", "db" if IS_DOCKER else "localhost"),
        "USER": os.environ.get("POSTGRES_USER", "author"),
        "PASSWORD": os.environ.get("POSTGRES_PASSWORD", "123456789a"),
    }
}

if DEBUG and not IS_DOCKER:
    DATABASES["default"] = {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }

REST_FRAMEWORK = {
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PAGINATION_CLASS": "base.paginations.PaginationWithSize",
    "PAGE_SIZE": 10,
}

if not DEBUG:
    REST_FRAMEWORK.update(
        {"DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"]}
    )

SPECTACULAR_SETTINGS = {
    "TITLE": "Personal Articles API",
    "DESCRIPTION": "An API for showing and entering personal news.",
    "VERSION": "1.0.0",
    "SCHEMA_PATH_PREFIX": "/api",
    "SERVE_INCLUDE_SCHEMA": False,
    "COMPONENT_SPLIT_REQUEST": True,
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1) if DEBUG else timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=10) if DEBUG else timedelta(days=1),
}

CORS_ALLOWED_ORIGINS = []
CORS_ORIGIN_ALLOW_ALL = DEBUG
if DEBUG:
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:8080",
    ]

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

AUTH_USER_MODEL = "authentication.User"

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
