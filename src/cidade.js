export class Cidade {
    constructor( nome, uf){
        this.nome = nome;
        this.uf = uf;
    }

    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }

    getUF() {
        return this.uf;
    }
    setUF(uf) {
        this.uf = uf;
    }

    getLatitude() {
        return this.latitude;
    }
    setLatitude(latitude) {
        this.latitude = latitude;
    }

    getLongitude() {
        return this.longitude;
    }
    setLongitude(longitude) {
        this.longitude = longitude;
    }

}
