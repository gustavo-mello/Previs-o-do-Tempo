import { Previsao } from "./Previsao.js";
import descrisaoINEP from "./descricaoAPIINEP.js";

export class ControllerPrevisao {

    converteData(timestamp) {
        var data = new Date(timestamp * 1000);
        var hora = data.getHours();
        var min = data.getMinutes();

        hora = hora < 10 ? "0" + hora : hora;
        min = min < 10 ? "0" + min : min;

        var hora_formatada = hora + ':' + min;

        return hora_formatada;
    }

    criaData(qtd_dia) {
        var data = new Date();
        data.setDate(data.getDate() + qtd_dia);
        var dia = data.getDate();
        var mes = data.getMonth() + 1;
        var ano = data.getFullYear();

        dia = dia < 10 ? "0" + dia : dia;
        mes = mes < 10 ? "0" + mes : mes;

        return dia + "/" + mes + "/" + ano;
    }

    classPrevisao(previsao, dia) {
        console.log(previsao["daily"][dia]["temp"]["min"]);
        var clasePrevisao = new Previsao(
            previsao["daily"][dia]["weather"][0]["description"],
            previsao["daily"][dia]["weather"][0]["icon"],
            Math.round(previsao["daily"][dia]["pop"] * 100),
            Math.round(previsao["daily"][dia]["uvi"]),
            Math.round(previsao["daily"][dia]["temp"]["max"]),
            Math.round(previsao["daily"][dia]["temp"]["min"]),
            this.converteData(previsao["daily"][dia]['sunrise']),
            this.converteData(previsao["daily"][dia]['sunset']),
            previsao["daily"][dia]["rain"] ? previsao["daily"][dia]["rain"] : 0
        );
        return clasePrevisao;
    }

    classPrevisaoXML(previsao14, dia) {
        var classePrevisao = new Previsao('', '', 0, 0, 0, 0, 0, 0, 0);
        if (dia != undefined) {
            classePrevisao.setTemperaturaMax(previsao14[dia]["tempMax"]);
            classePrevisao.setTemperaturaMin(previsao14[dia]["tempMin"]);
            for (const inep of descrisaoINEP) {
                if (previsao14[dia]["sigla"] == inep["sigla"]) {
                    classePrevisao.setTempo(inep["descricao"]);
                    classePrevisao.setIcone(inep["icone"]);
                }
            }
            return classePrevisao;
        }
    }

    criaFavoritos(array, nome, lat, lon) {
        array.push({ "nome": nome, "lat": lat, "lon": lon });
        Cookies.set('favoritos', JSON.stringify(array));
        return Cookies.get('favoritos');
    }

    removeFavoritos(array, nome) {
        var array_novo = [];
        for (const favorito of array) {
            if (favorito['nome'] != nome) {
                array_novo.push({ "nome": favorito['nome'], "lat": favorito['lat'], "lon": favorito['lon'] });
            }
        }
        Cookies.set('favoritos', JSON.stringify(array_novo));
        return Cookies.get('favoritos');
    }

    verificaCookie(array) {
        if (Cookies.get('favoritos') != undefined) {
            array.push(JSON.parse(Cookies.get('favoritos')));
        }
        return array;
    }

    verificaCookieExistente(array, cidade) {
        for (const verifica_cidade of array) {
            if (verifica_cidade['lat'] == cidade.getLatitude() && verifica_cidade['lon'] == cidade.getLongitude()) {
                return true;
            }
        }
        return false;
    }

    alertChuva(array) {
        for (const favoritos of array) {
            var previsao = previsaoTempo(favoritos['lat'], favoritos['lon'])
            var alerta = verificaPrevisao(previsao);
            console.log(alerta);
            if (alerta['alerta'] == true) {
                alert('Alerta de CHUVAS INTENÇAS em ' + favoritos['nome'] + ' no dia ' + criaData(alerta['dia']));
            }
        }
    }

    verificaPrevisao(previsao) {
        for (let i = 0; i < 8; i++) {
            var classePrevisao = classPrevisao(previsao, i);
            console.log(classePrevisao);
            if (classePrevisao.getProbabilidade() > 50 && classePrevisao.getVolumeChuva() > 3) {
                return { 'alerta': true, 'dia': i };
            }
        }
        return { 'alerta': false, 'dia': i };
    }
}