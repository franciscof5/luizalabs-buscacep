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
          console.log("cep", resp.data);
        }
      , function(resp) {
        alert("CEP inválido");
      });
    }
});

