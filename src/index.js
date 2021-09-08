import * as API from "./requisicaoAPI2.js";
import { ControllerPrevisao } from "./controllerPrevisao.js";
import { ViewPrevisao } from "./viewPrevisao.js";
import { Cidade } from "./Cidade.js";

const controller = new ControllerPrevisao();
const view = new ViewPrevisao();
const array = [];

window.onload = function () {
  var array_favoritos = controller.verificaCookie(array);
  view.montaFavoritos(array_favoritos[0]);



  API.localizacao();
  API.mondaDataList();

  var cidade = new Cidade('', '');

  var btn = document.getElementById("buscar-cidade");
  var nome_cidade = document.getElementById("nome-cidade");
  var button_add = document.getElementById('button-add');
  var button_7d = document.getElementById('button-7d');
  var button_14d = document.getElementById('button-14d');

  var previsao;
  var previsao14;

  window.onclick = function () {
    var hora = new Date
    if (hora.getHours() == 13 && hora.getMinutes() == 0 && hora.getSeconds() < 30) {
      controller.alertChuva(array_favoritos[0])
    }
  }

  btn.addEventListener("click", function () {

    if (nome_cidade.value == '') {
      alert('Insira o Nome da Cidade');
    } else {
      let nome_split = nome_cidade.value.split("-");
      let nome = nome_split[0];
      let estado_sigla = nome_split[1];

      cidade.setNome(nome);
      cidade.setUF(estado_sigla);

      var lat_lon = API.pegaLatitudeELongitude(cidade.getNome() + cidade.getUF());

      cidade.setLatitude(lat_lon["lat"]);
      cidade.setLongitude(lat_lon["lon"]);


      previsao = API.previsaoTempo(cidade.getLatitude(), cidade.getLongitude());

      controller.classPrevisaoXML(previsao14);

      view.montaPrevisaoHojeAmanha(previsao, cidade);

      view.montaBaseGrafico();

      view.mostraDetalhada();

      var row = document.getElementById('row-7d');
      if (row != null) {
        row.innerText = '';
      }

      var row = document.getElementById('row-14d');
      if (row != null) {
        row.innerText = '';
      }
    }
  });

  button_7d.addEventListener('click', function () {
    previsao14 = undefined;
    view.montaBaseGrafico();
    var row = document.getElementById('row-14d');
    if (row != null) {
      row.innerText = '';
    }
    view.montaPrevisao7Dias(previsao);
    view.montaGraficoTemp(previsao, previsao14);
    view.montaGraficoProb(previsao, previsao14);
  })

  button_14d.addEventListener('click', function () {
    previsao14 = API.previsaoTempo14Dias(cidade.getLatitude(), cidade.getLongitude());

    view.montaBaseGrafico();

    var row = document.getElementById('row-7d');
    if (row != null) {
      row.innerText = '';
    }
    view.montaPrevisao14Dias(previsao, previsao14);

    view.montaGraficoTemp(previsao, previsao14);
    view.montaGraficoProb(previsao, previsao14);
  })

  button_add.addEventListener('click', function () {
    var array_verificado;
    var cookie_verificado

    if (array_favoritos[0] == undefined) {
      array_verificado = array_favoritos;
    } else {
      array_verificado = array_favoritos[0];
    }
    if (array_verificado.length == 5) {
      alert("Numero Máximo de Favoritos é 5");
    } else {
      cookie_verificado = controller.verificaCookieExistente(array_verificado, cidade);
      if (cookie_verificado == true) {
        alert("Cidade já Adicionada aos Favoritos!");
      } else {
        controller.criaFavoritos(array_verificado, cidade.getNome() + '-' + cidade.getUF(), cidade.getLatitude(), cidade.getLongitude());
      }
    }
    view.montaFavoritos(array_verificado);
  })

};
