var listaVazia;

function adicionar() {

    const formularioCarrinho = document.querySelector('.formulario');

    const dadosDoFormulario = new FormData(formularioCarrinho);

    let quantidade = document.getElementById('quantidade');

    dadosDoFormulario.append('quantidade', quantidade.value);
    quantidade = dadosDoFormulario.get('quantidade');

    let produto = dadosDoFormulario.get('produto');

    let stringNomeProduto = produto.split(' - R$');
    let nomeProduto = stringNomeProduto[0];
    let precoPreoduto = stringNomeProduto[1];

    montarCarrinho(quantidade, nomeProduto, precoPreoduto);
}

function montarCarrinho(quantidade, nomeProduto, precoPreoduto) {
    let secaoProdutos = document.querySelector('.carrinho__produtos__produto');

    if (!secaoProdutos) {
        console.error('Seção de produtos do carrinho não foi encontrada. Verifque a classe "carrinho__produtos_produto"');
        return;
    } else if (listaVazia == true) {
        secaoProdutos.innerHTML = '';
        listaVazia = false;
    }
    // 2. Criar o elemento que vai encapsular a linha do produto (Ex: um <p>)

    const paragrafoProduto = document.createElement('p');

    // 3. Criar o primeiro <span> para a quantidade (ex: "1x")

    const spanQuantidade = document.createElement('span');
    spanQuantidade.classList.add('texto-azul');
    spanQuantidade.textContent = `${quantidade}x`;

    // 4. Criar o nó de texto para o nome do produto (ex: "Celular")
    // Note que isso não é um <span>, é apenas texto.
    
    const textoNomeProduto = document.createTextNode(` ${nomeProduto}`);
    
    // 5. Criar o segundo <span> para o preço (ex: "R$1400")

    const spanPreco = document.createElement('span');
    spanPreco.classList.add('texto-azul');
    // Formata o preço com R$ e duas casas decimais (opcional, mas boa prática)
    spanPreco.textContent = ` R$${parseFloat(precoPreoduto).toFixed(2)}`;

    // 6. Anexar todos esses elementos filhos ao <p> do produto
    paragrafoProduto.appendChild(spanQuantidade);
    paragrafoProduto.appendChild(textoNomeProduto);
    paragrafoProduto.appendChild(spanPreco);

    // 7. Anexar o <p> completo do produto à <section> do carrinho
    secaoProdutos.appendChild(paragrafoProduto);
    

    calcularTotal(quantidade, precoPreoduto);
}

function calcularTotal(quantidade, precoPreoduto) {
    let valorTotal = document.getElementById('valor-total');
    const totalString = valorTotal.textContent;
    const totalNumeroString = totalString.replace('R$', ''); // Substitui "R$" por nada
    const totalNumero = parseFloat(totalNumeroString);

    somaTotal = (quantidade * precoPreoduto) + totalNumero;
    valorTotal.textContent = `R$${somaTotal}`;
}

function limpar(){
    let secaoProdutos = document.querySelector('.carrinho__produtos__produto');
    secaoProdutos.innerHTML = '';

    const mensagemVazio = document.createElement('p');
    mensagemVazio.textContent = 'Adicione itens ao carrinho.';
    secaoProdutos.appendChild(mensagemVazio);
    
    document.getElementById('valor-total').textContent = 'R$0';

    listaVazia = true;
}