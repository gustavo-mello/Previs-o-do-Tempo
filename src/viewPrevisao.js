import { ControllerPrevisao } from "./controllerPrevisao.js";
const controller = new ControllerPrevisao();

export class ViewPrevisao {

    montaFavoritos(array) {
        var div_favoritos = document.getElementById('favoritos');
        if (div_favoritos != null) {
            div_favoritos.innerText = '';
        }
        if (array != undefined) {
            for (const favorito of array) {
                var div_favorito = document.createElement('div');
                div_favorito.className = 'div-favorito';

                var a_nome = document.createElement('a');
                a_nome.innerHTML = favorito['nome'] + ' - ';
                a_nome.onclick = function () {
                    var nome_cidade = document.getElementById("nome-cidade");
                    var btn = document.getElementById("buscar-cidade");

                    nome_cidade.value = favorito['nome'];
                    btn.click();
                    nome_cidade.value = '';
                };
                var a_lixeira = document.createElement('a');
                a_lixeira.className = 'lixeira';
                a_lixeira.onclick = function () {
                    var view = new ViewPrevisao();
                    controller.removeFavoritos(array, favorito['nome']);
                    var array_novo = [];

                    array_novo = controller.verificaCookie(array_novo);

                    view.montaFavoritos(array_novo[0]);
                };
                var icone = document.createElement('i');
                icone.className = 'fas fa-trash-alt';

                a_lixeira.appendChild(icone);
                div_favorito.appendChild(a_nome);
                div_favorito.appendChild(a_lixeira);
                div_favoritos.appendChild(div_favorito);
            }
        }
    }

    montaPrevisaoHojeAmanha(previsao, classeCidade) {
        var button_add = document.getElementById('button-add');
        button_add.style.display = 'block';
        var button_7d = document.getElementById('button-7d');
        button_7d.style.display = 'block';
        var button_7d = document.getElementById('button-14d');
        button_7d.style.display = 'block';
        var row = document.getElementById('row');
        if (row != null) {
            row.innerText = '';
        }
        for (let i = 0; i < 2; i++) {
            var classePrevisao = controller.classPrevisao(previsao, i);

            // Cria a div e seus filhos
            var div_data_previsao = document.createElement('div');
            div_data_previsao.className = 'data-previsao';
            div_data_previsao.id = 'data-previsao';
            var spam_data = document.createElement('span');
            spam_data.className = 'data';
            spam_data.innerHTML = controller.criaData(i);
            div_data_previsao.appendChild(spam_data);

            var div_previsao = document.createElement('div');
            div_previsao.className = 'previsao';

            var div_caracteristicas = document.createElement('div');
            div_caracteristicas.className = 'caracteristicas';

            var div_tempMax = document.createElement('div');
            div_tempMax.className = 'tempMax';
            var icon_tempMax = document.createElement('i');
            icon_tempMax.className = 'fas fa-2x fa-thermometer-three-quarters';
            var spam_tempMax = document.createElement('span');
            spam_tempMax.innerHTML = classePrevisao.getTemperaturaMax() + 'º';
            div_tempMax.appendChild(icon_tempMax);
            div_tempMax.appendChild(spam_tempMax);

            var div_tempMin = document.createElement('div');
            div_tempMin.className = 'tempMin';
            var icon_tempMin = document.createElement('i');
            icon_tempMin.className = 'fas fa-2x fa-thermometer-quarter';
            var spam_tempMin = document.createElement('span');
            spam_tempMin.innerHTML = classePrevisao.getTemperaturaMin() + 'º';
            div_tempMin.appendChild(icon_tempMin);
            div_tempMin.appendChild(spam_tempMin);

            var div_prob = document.createElement('div');
            div_prob.className = 'prob';
            var icon_prob = document.createElement('i');
            icon_prob.className = 'fas fa-2x fa-cloud-rain';
            var spam_prob = document.createElement('span');
            spam_prob.innerHTML = classePrevisao.getProbabilidade() + '%';
            div_prob.appendChild(icon_prob);
            div_prob.appendChild(spam_prob);

            div_caracteristicas.appendChild(div_tempMax);
            div_caracteristicas.appendChild(div_tempMin);
            div_caracteristicas.appendChild(div_prob);

            div_previsao.appendChild(div_caracteristicas);
            //---------------------------

            //---------------------------
            var div_temp_nome = document.createElement('div');
            div_temp_nome.className = 'temp-nome';

            var p_temp = document.createElement('p');
            p_temp.className = 'temperatura';
            p_temp.innerHTML = classePrevisao.getTempo();
            var p_cidade = document.createElement('p');
            p_cidade.className = 'cidade';
            p_cidade.innerHTML = classeCidade.getNome() + ' - ' + classeCidade.getUF();

            var previsao_detalhada = document.createElement('button');
            previsao_detalhada.innerText = 'Previsão Detalhada';
            previsao_detalhada.className = 'previsao-detalhada button';
            previsao_detalhada.id = 'previsao-detalhada' + i;
            div_temp_nome.appendChild(p_temp);
            div_temp_nome.appendChild(p_cidade);
            div_temp_nome.appendChild(previsao_detalhada);

            div_previsao.appendChild(div_temp_nome);

            //---------------------------

            var div_detalhada = document.createElement('div');
            div_detalhada.id = 'div-detalhada' + i;
            div_detalhada.className = 'div-detalhada';

            var div_nascer = document.createElement('div');
            div_nascer.className = 'nascer-sol';
            var icon_nascer = document.createElement('i');
            icon_nascer.className = 'fas fa-2x fa-sun';
            var span_nascer = document.createElement('span');
            span_nascer.innerHTML = classePrevisao.getNascerSol() + " - Nascer do Sol";

            div_nascer.append(icon_nascer);
            div_nascer.append(span_nascer);


            var div_por = document.createElement('div');
            div_por.className = 'por-sol';
            var icon_por = document.createElement('i');
            icon_por.className = 'fas fa-2x fa-cloud-sun';
            var span_por = document.createElement('span');
            span_por.innerHTML = classePrevisao.getPorSol() + " - Por do Sol";

            div_por.appendChild(icon_por);
            div_por.appendChild(span_por);

            var div_uv = document.createElement('div');
            var icon_uv = document.createElement('i');
            icon_uv.className = 'fas fa-2x fa-tachometer-alt';
            var span_uv = document.createElement('span');
            if (classePrevisao.getIndiceUV() > 0 && classePrevisao.getIndiceUV() <= 2) {
                span_uv.innerHTML = classePrevisao.getIndiceUV() + ' - Indice UV Baixa';
                div_uv.className = 'uv-sol-baixo';
            } else if (classePrevisao.getIndiceUV() > 2 && classePrevisao.getIndiceUV() <= 5) {
                span_uv.innerHTML = classePrevisao.getIndiceUV() + ' - Indice UV Moderado';
                div_uv.className = 'uv-sol-moderado';
            } else if (classePrevisao.getIndiceUV() > 5 && classePrevisao.getIndiceUV() <= 7) {
                span_uv.innerHTML = classePrevisao.getIndiceUV() + ' - Indice UV Alto';
                div_uv.className = 'uv-sol-alto';
            } else if (classePrevisao.getIndiceUV() > 7 && classePrevisao.getIndiceUV() <= 10) {
                span_uv.innerHTML = classePrevisao.getIndiceUV() + ' - Indice UV Muito Alto';
                div_uv.className = 'uv-sol-muito-alto';
            } else if (classePrevisao.getIndiceUV() >= 11) {
                span_uv.innerHTML = classePrevisao.getIndiceUV() + ' - Indice UV Extremo';
                div_uv.className = 'uv-sol-extremo';
            }

            div_uv.appendChild(icon_uv);
            div_uv.appendChild(span_uv);

            var div_volume = document.createElement('div');
            div_volume.className = 'volume-chuva';
            var icon_volume = document.createElement('i');
            icon_volume.className = 'fas fa-2x fa-cloud-rain';
            var span_volume = document.createElement('span');
            span_volume.innerHTML = classePrevisao.getVolumeChuva() + "mm - Volume de Chuva";

            div_volume.appendChild(icon_volume);
            div_volume.appendChild(span_volume);

            div_detalhada.appendChild(div_nascer);
            div_detalhada.appendChild(div_por);
            div_detalhada.appendChild(div_uv);
            div_detalhada.appendChild(div_volume);


            div_detalhada.style.display = 'none';

            //---------------------------

            //---------------------------
            var div_icon_status = document.createElement('div');
            div_icon_status.className = 'icon-status';
            var img_previsao = document.createElement('img');
            img_previsao.src = "http://openweathermap.org/img/wn/" +
                classePrevisao.getIcone() +
                "@2x.png";
            div_icon_status.appendChild(img_previsao);
            div_previsao.appendChild(div_icon_status);
            //---------------------------
            div_data_previsao.appendChild(div_previsao);
            div_data_previsao.appendChild(div_detalhada);



            //----------------------------
            row.appendChild(div_data_previsao);
        }

    }

    montaPrevisao7Dias(previsao) {
        var row = document.getElementById('row-7d');
        if (row != null) {
            row.className = 'row-7d';
            row.innerText = '';
        }
        for (let i = 1; i < 8; i++) {
            var classePrevisao = controller.classPrevisao(previsao, i);

            // Cria a div e seus filhos
            var div_data_previsao = document.createElement('div');
            div_data_previsao.className = 'data-previsao';
            div_data_previsao.id = 'data-previsao';
            var spam_data = document.createElement('span');
            spam_data.className = 'data';
            spam_data.innerHTML = controller.criaData(i).substring(0, 5);
            div_data_previsao.appendChild(spam_data);

            var div_previsao = document.createElement('div');
            div_previsao.className = 'previsao-7d';

            var div_caracteristicas = document.createElement('div');
            div_caracteristicas.className = 'caracteristicas';

            //---------------------------
            var div_icon_status = document.createElement('div');
            div_icon_status.className = 'icon-status';
            var img_previsao = document.createElement('img');
            img_previsao.src = "http://openweathermap.org/img/wn/" +
                classePrevisao.getIcone() +
                ".png";

            img_previsao.title = classePrevisao.getTempo();
            div_icon_status.appendChild(img_previsao);

            div_previsao.appendChild(div_icon_status);

            //---------------------------

            var div_tempMax = document.createElement('div');
            div_tempMax.className = 'tempMax';
            var spam_tempMax = document.createElement('span');
            spam_tempMax.innerHTML = classePrevisao.getTemperaturaMax() + 'º';
            div_tempMax.appendChild(spam_tempMax);

            var div_tempMin = document.createElement('div');
            div_tempMin.className = 'tempMin';
            var spam_tempMin = document.createElement('span');
            spam_tempMin.innerHTML = classePrevisao.getTemperaturaMin() + 'º';
            div_tempMin.appendChild(spam_tempMin);

            var div_prob = document.createElement('div');
            div_prob.className = 'prob';
            var icon_prob = document.createElement('i');
            var spam_prob = document.createElement('span');
            spam_prob.innerHTML = classePrevisao.getProbabilidade() + '%';
            div_prob.appendChild(spam_prob);

            div_caracteristicas.appendChild(div_tempMax);
            div_caracteristicas.appendChild(div_tempMin);
            div_caracteristicas.appendChild(div_prob);

            div_previsao.appendChild(div_caracteristicas);
            //---------------------------



            //---------------------------
            div_data_previsao.appendChild(div_previsao);



            //----------------------------
            row.appendChild(div_data_previsao);
        }

        $('.row-7d').slick({
            dots: true,
            infinite: false,
            slidesToShow: 7,
            slidesToScroll: 7,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }
            ]
        })

    }

    montaPrevisao14Dias(previsao, previsao14) {
        var row = document.getElementById('row-14d');
        if (row != null) {
            row.className = 'row-14d';
            row.innerText = '';
        }
        for (let i = 1; i < 15; i++) {
            var classePrevisao;
            if (i < 8) {
                classePrevisao = controller.classPrevisao(previsao, i);
            } else {
                classePrevisao = controller.classPrevisaoXML(previsao14, i - 8);
            }

            // Cria a div e seus filhos
            var div_data_previsao = document.createElement('div');
            div_data_previsao.className = 'data-previsao';
            div_data_previsao.id = 'data-previsao';

            var div_previsao = document.createElement('div');
            div_previsao.className = 'previsao-14d';

            var spam_data = document.createElement('span');
            spam_data.className = 'data';
            spam_data.innerHTML = controller.criaData(i).substring(0, 5);
            div_previsao.appendChild(spam_data);

            var div_caracteristicas = document.createElement('div');
            div_caracteristicas.className = 'caracteristicas';

            //---------------------------
            var div_icon_status = document.createElement('div');
            div_icon_status.className = 'icon-status';
            var img_previsao = document.createElement('img');
            img_previsao.src = "http://openweathermap.org/img/wn/" +
                classePrevisao.getIcone() +
                ".png";

            img_previsao.title = classePrevisao.getTempo();
            div_icon_status.appendChild(img_previsao);

            div_previsao.appendChild(div_icon_status);

            //---------------------------

            var div_tempMax = document.createElement('div');
            div_tempMax.className = 'tempMax';
            var spam_tempMax = document.createElement('span');
            spam_tempMax.innerHTML = classePrevisao.getTemperaturaMax() + 'º';
            div_tempMax.appendChild(spam_tempMax);

            var div_tempMin = document.createElement('div');
            div_tempMin.className = 'tempMin';
            var spam_tempMin = document.createElement('span');
            spam_tempMin.innerHTML = classePrevisao.getTemperaturaMin() + 'º';
            div_tempMin.appendChild(spam_tempMin);

            var div_prob = document.createElement('div');
            div_prob.className = 'prob';
            var spam_prob = document.createElement('span');
            spam_prob.innerHTML = classePrevisao.getProbabilidade() + '%';
            div_prob.appendChild(spam_prob);

            div_caracteristicas.appendChild(div_tempMax);
            div_caracteristicas.appendChild(div_tempMin);
            div_caracteristicas.appendChild(div_prob);

            div_previsao.appendChild(div_caracteristicas);
            //---------------------------



            //---------------------------
            div_data_previsao.appendChild(div_previsao);



            //----------------------------
            row.appendChild(div_data_previsao);
        }

        $('.row-14d').slick({
            dots: true,
            infinite: false,
            slidesToShow: 7,
            slidesToScroll: 7,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }
            ]
        })

    }

    mostraDetalhada() {
        var previsao_detalhada0 = document.getElementById('previsao-detalhada0');
        var previsao_detalhada1 = document.getElementById('previsao-detalhada1');


        previsao_detalhada0.addEventListener('click', function () {

            var div_detalhada = document.getElementById('div-detalhada0');

            var resultado = div_detalhada.toggleAttribute('abre');

            if (resultado) {
                div_detalhada.style.display = "block";
            } else {
                div_detalhada.style.display = "none";
            }
        })


        previsao_detalhada1.addEventListener('click', function () {
            var div_detalhada = document.getElementById('div-detalhada1');

            var resultado = div_detalhada.toggleAttribute('abre');

            if (resultado) {
                div_detalhada.style.display = "block";
            } else {
                div_detalhada.style.display = "none";
            }
        })

    }

    montaBaseGrafico() {
        var div_grafico_temp = document.getElementById('grafico-temp-cont');
        var div_grafico_prob = document.getElementById('grafico-prob-cont');

        div_grafico_temp.innerText = '';
        div_grafico_prob.innerText = '';

        var grafico_temp = document.createElement('CANVAS');
        grafico_temp.id = 'grafico-temp';
        grafico_temp.responsive = true;
        div_grafico_temp.appendChild(grafico_temp);

        var grafico_prob = document.createElement('CANVAS');
        grafico_prob.id = 'grafico-prob';
        grafico_prob.responsive = true;
        div_grafico_prob.appendChild(grafico_prob);

    }

    montaGraficoTemp(previsao, previsao14) {
        var dia = 0;
        var datas = [];
        var tempMax = [];
        var tempMin = [];
        for (const data_previsao of previsao['daily']) {
            datas[dia] = controller.criaData(dia);
            tempMax[dia] = Math.round(data_previsao['temp']['max']);
            tempMin[dia] = Math.round(data_previsao['temp']['min']);

            dia++;
        }
        if (previsao14 != undefined) {
            for (const data_previsao of previsao14) {
                datas[dia] = controller.criaData(dia);
                tempMax[dia] = data_previsao['tempMax'];
                tempMin[dia] = data_previsao['tempMin'];

                dia++;
            }
        }
        var grafico = document.getElementById('grafico-temp');
        var monta_grafico = new Chart(grafico, {
            type: 'line',
            data: {
                labels: datas,
                datasets: [{
                    label: 'Temperatura Maxima (º)',
                    data: tempMax,
                    fill: false,
                    borderColor: 'rgb(255, 0, 0)',
                    tension: 0.1
                }, {
                    label: 'Temperatura Minima (º)',
                    data: tempMin,
                    fill: false,
                    borderColor: 'rgb(0, 0, 255)',
                    tension: 0.1
                }]
            }
        });
    }

    montaGraficoProb(previsao, previsao14) {
        var dia = 0;
        var datas = [];
        var prob = [];

        for (const data_previsao of previsao['daily']) {
            datas[dia] = controller.criaData(dia);
            prob[dia] = Math.round(data_previsao['pop'] * 100);
            dia++;
        }

        if (previsao14 != undefined) {
            for (const data_previsao of previsao14) {
                datas[dia] = controller.criaData(dia);
                prob[dia] = '';

                dia++;
            }
        }
        var grafico = document.getElementById('grafico-prob');
        var monta_grafico = new Chart(grafico, {
            type: 'line',
            data: {
                labels: datas,
                datasets: [{
                    label: 'Probabilidade de Chuva (%)',
                    data: prob,
                    fill: false,
                    borderColor: 'rgb(128, 128, 128)',
                    tension: 0.1
                }]
            }
        });


    }
}