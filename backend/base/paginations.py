from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class PaginationWithSize(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'size'
    max_page_size = 25

    def get_paginated_response(self, data):
        return Response({
            'total': self.page.paginator.count,
            'max_page_size': self.max_page_size,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })
