from django.db import models


class DefaultGetQuerysetMixin:
    model = models.Model
    order_by = []
    prefetch_related = []

    def get_queryset(self):
        queryset = self.model.objects.all().filter(confirmed=True)

        if self.prefetch_related:
            queryset.prefetch_related(*self.prefetch_related)

        if self.order_by:
            queryset = queryset.order_by(*self.order_by)
        return queryset
