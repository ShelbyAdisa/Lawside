from rest_framework.decorators import api_view
from rest_framework.response import Response
from lawyers.models import Lawyer
from lawyers.serializers import LawyerSerializer

@api_view(['GET'])
def get_lawyers(request):
    lawyers = Lawyer.objects.select_related('user').prefetch_related('practice_areas').all()


    is_available = request.GET.get('available')
    if is_available == 'true':
        lawyers = lawyers.filter(is_available=True)


    practice_area_id = request.GET.get('practice_area')
    if practice_area_id:
        lawyers = lawyers.filter(practice_areas__id=practice_area_id)


    max_price = request.GET.get('max_price')
    if max_price:
        try:
            max_price = float(max_price)
            lawyers = lawyers.filter(hourly_rate__lte=max_price)
        except ValueError:
            pass  # Ignore invalid values

    serializer = LawyerSerializer(lawyers, many=True)
    return Response(serializer.data)