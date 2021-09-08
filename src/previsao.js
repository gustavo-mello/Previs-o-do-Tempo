export class Previsao {
  constructor(tempo, icone, probabilidade, indiceUV, temperaturaMax, temperaturaMin, nascerSol, porSol, volumeChuva) {
    this.tempo = tempo;
    this.icone = icone
    this.probabilidade = probabilidade;
    this.indiceUV = indiceUV;
    this.temperaturaMax = temperaturaMax;
    this.temperaturaMin = temperaturaMin;
    this.nascerSol = nascerSol;
    this.porSol = porSol;
    this.volumeChuva = volumeChuva;
  }


  setTempo(tempo) {
    this.tempo = tempo;
  }
  getTempo() {
    return this.tempo;
  }

  setIcone(icone) {
    this.icone = icone;
  }
  getIcone() {
    return this.icone;
  }

  setProbabilidade(probabilidade) {
    this.probabilidade = probabilidade;
  }
  getProbabilidade() {
    return this.probabilidade;
  }

  setIndiceUV(indiceUV) {
    this.indiceUV = indiceUV;
  }
  getIndiceUV() {
    return this.indiceUV;
  }

  setTemperaturaMax(temperaturaMax) {
    this.temperaturaMax = temperaturaMax;
  }
  getTemperaturaMax() {
    return this.temperaturaMax;
  }
  
  setTemperaturaMin(temperaturaMin) {
    this.temperaturaMin = temperaturaMin;
  }
  getTemperaturaMin() {
    return this.temperaturaMin;
  }

  setNascerSol(nascerSol) {
    this.nascerSol = nascerSol;
  }
  getNascerSol() {
    return this.nascerSol;
  }

  setPorSol(porSol) {
    this.porSol = porSol;
  }
  getPorSol() {
    return this.porSol;
  }

  setVolumeChuva(volumeChuva) {
    this.volumeChuva = volumeChuva;
  }
  getVolumeChuva() {
    return this.volumeChuva;
  }
}