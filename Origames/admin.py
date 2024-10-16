from django.contrib import admin
from .models import Player, Athlete, Runner, Activity, Game
from datetime import timedelta


@admin.register(Player)
class PlayerAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')
    search_fields = ('name', 'email')


@admin.register(Athlete)
class AthleteAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'club', 'cost', 'gender')
    search_fields = ('name', 'email', 'club')
    list_filter = ('club', 'gender')


# Inline for adding multiple Runners within a Game
class RunnerInline(admin.TabularInline):
    model = Runner
    # all_athletes = Athlete.objects.all()

    # for athlete in all_athletes:
    #     Runner.objects.get_or_create(athlete=athlete)
    extra = 0


@admin.register(Runner)
class RunnerAdmin(admin.ModelAdmin):
    list_display = ('athlete_name', 'time', 'point', 'game')
    search_fields = ('athlete__name', 'game__name')
    list_filter = ('point', 'game')
    raw_id_fields = ('athlete',)  # Use raw_id_fields for large datasets

    def athlete_name(self, obj):
        return obj.athlete.name
    athlete_name.short_description = 'Athlete Name'  # Label for the column


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('name', 'date')
    search_fields = ('name',)
    list_filter = ('date',)


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    inlines = [RunnerInline]
    list_display = ('name', 'creator', 'date', 'max_coin', 'status')
    search_fields = ('name', 'description')
    list_filter = ('date', 'status')
    raw_id_fields = ('creator', 'activity')

    def save_model(self, request, obj, form, change):
        # Objeyi kaydediyoruz
        super().save_model(request, obj, form, change)

        # Eğer objeyi ilk defa kaydediyorsak (yani yeni bir obje ise)
        if not change:
            # Tüm Athlete objelerini alıyoruz
            all_athletes = Athlete.objects.all()

            # Her Athlete için bir Runner objesi oluşturuyoruz
            for athlete in all_athletes:
                Runner.objects.create(
                    athlete=athlete,
                    game=obj,
                    time=timedelta(seconds=0),  # Varsayılan süre
                    point=0                     # Varsayılan puan
                )
