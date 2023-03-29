function salvar(){
    var storage = window.localStorage;

    //pego a foto, nome, idade, profissão e resumo
    var foto = document.getElementById('picture__input')
    var nome = document.getElementById('nome')
    var idade = document.getElementById('idade')
    var profissao = document.getElementById('profissao')
    var resumo = document.getElementById('resumo')
    var key = createKey();

    //cria um array para salvar a img, nome, idade, profissao e resumo
    var cardCadastro = [foto.value, nome.value, idade.value, profissao.value, resumo.value];

    //método para salvar os valores no localstorage
    // como o localStorage nao suporta arrays, é necessário transformar em String
    storage.setItem(key, JSON.stringify(cardCadastro));
    console.log("Cadastro"+ key + "(" + foto.value + ") Salvo" )

    //limpar os campos
    foto.value = '';
    nome.value = '';
    idade.value = '';
    profissao.value = '';
    resumo.value = '';

    //chama a funcao "listar" para exibir os cadastros atualizados
    listar();

    criarEventoLinkCadastros();

}

function listar (){
    //pegar todos os cards de cadastro pelas chaves do arrey no localStorage
    var storage = window.localStorage;

    var keys = Object.keys(storage);

    //pego o elento "listaCadastros"

    var listaCadastros = document.getElementById('listaCadastros');

    //antes de listar as notas, é preciso limpar a "ul" para evitar valor duplicado

    listaCadastros.innerHTML = '';


    //percorro as chaves do storage e pego as notas salvas

    for(var key of keys){
        //cardCadastro[0] -> foto
        //cardCadastro[1] -> nome    assim por diante....

        var cardCadastro = JSON.parse(storage.getItem(key));
        //crio um elemento "li" para inserir no "listaCadastros"

        var li = document.createElement('li');
        var a = document.createElement('a');

        //insiro o elemento "a" dentro do elemento "li"

        li.appendChild(a);
        a.href = '#pageDialog';
        a.classList.add("linkCadastros");

        //define o efeito "flip"

        a.setAttribute('data-transition', 'flip');

        //eu passo a jey do cadastro como propriedade para saber posteriormente qual foi clicada

        a.setAttribute('key', key);


        a.innerText = cardCadastro[1]; //inserindo o nome no titulo da lista

        //insiro o elemento "li" dentro do elemento "listaCadastros"

        listaCadastros.appendChild(li);

        //temos que chamar a função "jquery" listview par dar um refresh na div

        $('#listaCadastros').listview('refresh');
    }
}

//verifica o elemento da lista de cadast que foi clicado
// e recupera no localStorage as infos do cadastro
function abrirCadastro(){

    var storage = window.localStorage;

    //qual é a "key" do elemento clicado. O "this" refere-se ao elemento que 
    //executou a ação

    var key = this.getAttribute('key')

    //recupera as info do cadastro no localStorage

    var cadastro = JSON.parse(storage.getItem(key));

    //jogar as infos para a page dialog
    
    document.getElementById('tituloNome').innerText = cadastro[1];
    document.getElementById('fotoCadastro').innerText = cadastro[0];
    document.getElementById('nomeCadastro').innerText = cadastro[1];
    document.getElementById('idadeCadastro').innerText = cadastro[2];
    document.getElementById('profissaoCadastro').innerText = cadastro[3];
    document.getElementById('resumoCadastro').innerText = cadastro[4];
}



//criado uma função para gerar uma chave que será inserida junto com o objeto das informações

function createKey(){

    var date = new Date()
    return date.getFullYear().toString() + date.getMonth().toString() +
        +  date.getDate().toString() + date.getHours().toString() +
        + date.getMinutes().toString() + date.getSeconds().toString();

     //será retornado ex: 20232201110   
}
function criarEventoLinkCadastros(){
    //criar evento para os links criados dinamicamente
    // a funcao querySelectorAll retorna um array com todos os elementos 
    // que possuem a classe .linkCadastros
    var linkCadastros = document.querySelectorAll('.linkCadastros')

    for(var item of linkCadastros){
        item.addEventListener('click', abrirCadastro)
    }

}
window.onload = function(){
    //executar aqui quando todos os elementos da pagina forem carregados
    //quando executar já exibe os cadastros salvos anteriormente
    listar();
    //evento de click no btnCadastrar
    var btnCadastrar = document.getElementById('btnCadastrar');
    btnCadastrar.addEventListener('click', salvar);

    //chama a funcao para criar o eventListner do .linkcadastro

    criarEventoLinkCadastros();


}