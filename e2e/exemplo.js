Feature( 'Pesquisa no Google' );

Scenario( 'Pesquisa acessando opção de IU', ({I}) => {
    I.amOnPage('https://www.google.com.br/');
    I.fillField('q', 'Bom Jardim');
    I.click('Pesquisa Google');
    I.see('Prefeitura Municipal De Bom Jardim');
} )