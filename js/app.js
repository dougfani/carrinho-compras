// declarar função
function adicionar() {

    // seleciona a tag select e busca o valor contido nela
    let produtoSelect = document.getElementById('produto');
    let produto = produtoSelect.value;
    
    // seleciona a tag input cujo id é quantidade
    let campoQuantidade = document.getElementById('quantidade');
        
    // pega o valor presente no imput
    let quantidade = campoQuantidade.value;

    // verifica se o usuário inseriu uma quantidade para prosseguir
    if(campoQuantidade.value == '' || campoQuantidade.value == 0) {
        alert('Por favor, insira a quantidade antes de adicionar o produto.');
        return;
    }

    // divide a string contida na variável em um array de substrings. A divisão ocorre sempre que a sequência de caracteres ' - R$' é encontrada. Isso resulta num array armazenado na nova variável. Ex: ['Fone de ouvido', '100']
    let stringNomeProduto = produto.split(' - R$');
    // atribuo o valor da primeira string do array que contém o nome do produto
    let nomeProduto = stringNomeProduto[0];
    // atribuo o valor da segunda string do array que contém o nome do produto
    let precoProduto = stringNomeProduto[1];

    // chama a função que será responsável por montar a lista de produtos no carrinho, passando os parametros que ela utilizará.
    montarCarrinho(quantidade, nomeProduto, precoProduto);

    // Define o valor do campo de quantidade para 1 por padrão após o usuário ter clicado em adicionar.
    campoQuantidade.value = 1;
}

// declara a função que irá montar o html do carrinho
function montarCarrinho(quantidade, nomeProduto, precoProduto) {
    // obtém a referência do elemento html
    let listaProdutos = document.getElementById('lista-produtos');

    // identifia por segurança se o elemento está presente
    if (!listaProdutos) {
        console.error('Seção de produtos do carrinho não foi encontrada. Verifque o elemento com id "lista-produtos"');
        // return para encerrar execução da função
        return;
        // verifica se a lista está populada com a mensagem de carrinho vazio
    } else if (listaProdutos.firstElementChild && listaProdutos.firstElementChild.textContent === 'Adicione itens ao carrinho.') {
        // se estiver populada, irá limpar para ser montada uma nova lista
        // innterHTML permite obter ou definir o contéudo html (incluindo tags texto) de um elemento
        listaProdutos.innerHTML = '';
    }
    // 2. Criar o elemento que vai encapsular a linha do produto (Ex: um <section>)

    // cria um elemento section na memória do navegador
    const paragrafoProduto = document.createElement('section');

    // adiciona a classe para estilização 
    paragrafoProduto.classList.add('carrinho__produtos__produto');

    // 3. Criar o primeiro <span> para a quantidade (ex: "1x")

    // novamente cra u melemento na memória do navegador    
    const spanQuantidade = document.createElement('span');

    // adiciona classe para etilização
    spanQuantidade.classList.add('texto-azul');
    //  textContent é uma propriedade do elemento do DOM que permite definir ou obter o conteúdo de texto puro de um elemento. Diferente do innerHTML, o textContent não interpreta tags HTML.
    spanQuantidade.textContent = `${quantidade}x`;

    // 4. Criar o nó de texto para o nome do produto (ex: "Celular")
    // Note que isso não é um <span>, é apenas texto.
    
    // cria um novo nó de texto. Diferente do createElement(), que cria uma tag, o createTextNode() cria apenas um pedaço de texto que pode ser inserido em outros elementos.
    const textoNomeProduto = document.createTextNode(` ${nomeProduto}`);
    
    // 5. Criar o segundo <span> para o preço (ex: "R$1400")

    const spanPreco = document.createElement('span');
    spanPreco.classList.add('texto-azul');
    // Formata o preço com R$ e duas casas decimais (opcional, mas boa prática)
    spanPreco.textContent = ` R$${parseFloat(precoProduto).toFixed(2)}`;

    // 6. Anexar todos esses elementos filhos a a section do produto
    // O método appendChild() anexa o spanQuantidade como um último elemento filho dentro do paragrafoProduto
    paragrafoProduto.appendChild(spanQuantidade);
    paragrafoProduto.appendChild(textoNomeProduto);
    paragrafoProduto.appendChild(spanPreco);

    // 7. Anexar o <section> completo do produto à <section> do carrinho
    listaProdutos.appendChild(paragrafoProduto);
    

    calcularTotal(quantidade, precoProduto);
}

function calcularTotal(quantidade, precoProduto) {
    let valorTotal = document.getElementById('valor-total');
    let totalString = valorTotal.textContent;
    //  É um método nativo de JavaScript para strings. Ele procura por um padrão (o primeiro argumento) dentro de uma string e o substitui por um novo valor (o segundo argumento).
    // . /R\$/g = Este é o primeiro argumento do método .replace(), que define o padrão a ser procurado. É uma expressão regular (RegExp). Vamos dividi-la: / ... /: As barras (/) no início e no fim indicam que o que está entre elas é uma expressão regular. R: Este caractere corresponde à letra R exatamente como está. \$: O cifrão $ é um caractere especial em expressões regulares. Ele significa "final da string". Para que ele seja interpretado como o caractere literal $, ele precisa ser "escapado" com uma barra invertida (\). Portanto, R\$ corresponde à sequência de caracteres "R$". g: É um "flag" (ou modificador) da expressão regular que significa "global". Sem esse flag, o método .replace() substituiria apenas a primeira ocorrência do padrão que ele encontrasse. Com o g, ele substitui todas as ocorrências do padrão na string. No seu caso, garante que se por algum motivo houver "R$" mais de uma vez na string, todas sejam removidas.
    let totalNumeroString = totalString.replace(/R\$/g, ''); // Substitui "R$" por nada
    let totalNumero = parseFloat(totalNumeroString);

    let somaTotal = (quantidade * precoProduto) + totalNumero;
    valorTotal.textContent = `R$${somaTotal}`;
}

function limpar(){

    let listaProdutos = document.getElementById('lista-produtos');
    listaProdutos.innerHTML = ''; // Limpa todo o conteúdo da lista

    // Adiciona a mensagem inicial ao carrinho vazio
    const mensagemVazio = document.createElement('section');
    mensagemVazio.classList.add('carrinho__produtos__produto');
    mensagemVazio.textContent = 'Adicione itens ao carrinho.';
    listaProdutos.appendChild(mensagemVazio);

    // Reseta o valor total para R$ 0
    document.getElementById('valor-total').textContent = 'R$0';

}