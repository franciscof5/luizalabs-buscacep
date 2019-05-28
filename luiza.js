angular.module('luizaApp', []).controller('buscaCep', function($scope, $http) {
    $scope.endereco = {
      "cep": "01251-140",
      "logradouro": "Rua Veríssimo Glória",
      "complemento": "",
      "bairro": "Sumaré",
      "localidade": "São Paulo",
      "uf": "SP",
      "unidade": "",
      "ibge": "3550308",
      "gia": "1004"
    }

    $scope.buscar = async function() {
      //$scope.endereco = await API.post("");
      if($scope.cep.toString().length<8)
        alert("CEP muito pequeno");
      $http.get('https://viacep.com.br/ws/'+$scope.cep+'/json/').then(function(resp) {
          $scope.endereco = resp.data;
          carregarNoMapa(resp.data.cep);
          console.log("cep", resp.data);
        }
      , function(resp) {
        alert("CEP inválido");
      });
    }
    var geocoder = new google.maps.Geocoder();
    var map;
    var marker 

    $scope.initMap = function() {
      // The location of Uluru
      var uluru = {lat: -25.344, lng: 131.036};
      // The map, centered at Uluru
      map = new google.maps.Map(document.getElementById('map'), {zoom: 4, center: uluru});
      // The marker, positioned at Uluru
      marker = new google.maps.Marker({position: uluru, map: map});
    }

     function carregarNoMapa(endereco) {
        geocoder.geocode({ 'address': endereco + ', Brasil', 'region': 'BR' }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                    
                    var location = new google.maps.LatLng(latitude, longitude);
                    marker.setPosition(location);
                    map.setCenter(location);
                    map.setZoom(16);
                }
            }
        });
    }

    $scope.initMap();
});

