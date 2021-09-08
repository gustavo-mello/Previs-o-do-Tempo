const {soma, subitracao} = require('../src/calculo.js');

describe('soma', () => {
    it(' soma 2 + 1 = 3', () => {
        const r = soma(2, 1);
        expect(r).toEqual(3);
    });

    it('subitrai 3 - 1 = 2', () => {
        const t = subitracao(3,1);
        expect(t).toEqual(2);
    })
    
})
