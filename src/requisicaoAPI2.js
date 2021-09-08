export function localizacao() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      $.ajax({
        url:
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position["coords"]["latitude"] + "," + position["coords"]["longitude"] + "&result_type=street_address&key=AIzaSyBQixy4C0bsWppEfD912hIECmaZvbblFKQ",
        type: "GET",
        dataType: "json",
        async: false,
      }).done(function (resultado) {
        var nome = resultado['results'][0]['address_components'][3]['long_name'];
        var uf = resultado['results'][0]['address_components'][4]['short_name'];

        var nome_cidade = document.getElementById("nome-cidade");
        var btn = document.getElementById("buscar-cidade");

        nome_cidade.value = nome + '-' + uf;

        btn.click();
        nome_cidade.value = '';

      });
    }, function () {
    });
  } else {
    alert("Ops, Não foi possível pegar licalização");
  }
}

export function mondaDataList() {
  var nomes_cidades = document.getElementById("nomes-cidades");
  $.get(
    "https://servicodados.ibge.gov.br/api/v1/localidades/municipios",
    function (resultado) {
      for (const cidade of resultado) {
        var option = document.createElement("option");
        option.value =
          cidade["nome"] +
          "-" +
          cidade["microrregiao"]["mesorregiao"]["UF"]["sigla"];
        nomes_cidades.appendChild(option);
      }
    }
  );
}

export function pegaLatitudeELongitude(nome) {
  var lat;
  var lon;
  $.ajax({
    url:
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      nome +
      "&key=",
    type: "GET",
    dataType: "json",
    async: false,
  }).done(function (resultado) {
    lat = resultado["results"][0]["geometry"]["location"]["lat"];
    lon = resultado["results"][0]["geometry"]["location"]["lng"];
  });
  return { lat: lat, lon: lon };
}

export function previsaoTempo(lat, lon) {
  var previsao = [];
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=hourly,minutely&units=metric&lang=pt_br&appid=",
    type: "GET",
    dataType: "json",
    async: false,
  }).done(function (resultado) {
    previsao = resultado;
  });
  return previsao;
}

export function previsaoTempo14Dias(lat, lon) {
  var previsao = [];
  $.ajax({
    url:
      "http://servicos.cptec.inpe.br/XML/cidade/" +
      lat +
      "/" +
      lon +
      "/estendidaLatLon.xml",
    type: "GET",
    dataType: "xml",
    async: false,
  }).done(function (resultado) {
    $(resultado).find('cidade').each(function () {
      $(this).find('previsao').each(function () {
        previsao.push({
          'sigla': $(this).find('tempo').text().replace(' ', ''),
          'tempMax': $(this).find('maxima').text(),
          'tempMin': $(this).find('minima').text()
        })
      })
    })
  });
  return previsao;
}