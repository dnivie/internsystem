from rest_framework import serializers

from varer.models import *


class KontoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Konto
        depth = 2


class RåvareWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Råvare
        fields = ('kategori', 'navn', 'mengde', 'enhet', 'mengde_svinn', 'innkjopskonto', 'status', 'lenket_salgsvare')
        depth = 0


class RåvareReadSerializer(serializers.ModelSerializer):
    class Priser(serializers.ModelSerializer):
        class Meta:
            model = Råvarepris
            fields = ('id', 'bestillingskode', 'pris', 'pant', 'dato', 'leverandor')
            depth = 1

    class Salgsvare(serializers.ModelSerializer):
        class SalgsvarePriser(serializers.ModelSerializer):
            class Meta:
                model = SalgsvarePris
                depth = 0

        priser = SalgsvarePriser(many=True)

        class Meta:
            model = Salgsvare
            depth = 0

    priser = Priser(many=True, read_only=True)
    lenket_salgsvare = Salgsvare()

    class Meta:
        model = Råvare
        fields = ('id', 'kategori', 'navn', 'mengde', 'enhet', 'mengde_svinn', 'innkjopskonto', 'status', 'priser', 'lenket_salgsvare')
        depth = 1


class LeverandørSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leverandør

class RåvareprisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Råvarepris


class SalgsvareWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salgsvare
        fields = ('kategori', 'navn', 'salgskonto', 'status', 'raavarer')


class SalgsvareReadSerializer(serializers.ModelSerializer):
    class Råvarer(serializers.ModelSerializer):
        class Priser(serializers.ModelSerializer):
            class Meta:
                model = Råvarepris
                fields = ('id', 'bestillingskode', 'pris', 'pant', 'dato', 'leverandor')
                depth = 1

        priser = Priser(many=True)

        class Meta:
            model = Råvare
            fields = ('id', 'kategori', 'navn', 'mengde', 'enhet', 'mengde_svinn', 'innkjopskonto', 'status', 'priser')
            depth = 1

    raavarer = Råvarer(many=True)

    class Meta:
        model = Salgsvare
        depth = 1


class SalgsvareRåvareSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalgsvareRåvare

class SalgsvarePrisSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalgsvarePris

class SalgskalkyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salgskalkyle

class SalgskalkyleVareSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalgskalkyleVare

class VaretellingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Varetelling

class VaretellingVareSerializer(serializers.ModelSerializer):
    class Meta:
        model = VaretellingVare