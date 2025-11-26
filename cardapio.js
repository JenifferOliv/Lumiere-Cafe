// Novos produtos com preços formatados e categorias ajustadas
const rawProducts = [
    // --- BOLOS ---
    { id: 'PROD01', categoryId: 'CAT01', name: 'Bolo Cítrico Matinée', price: '9.00', description: 'Bolo de limão com cobertura de merengue suíço e raspas de laranja.', image: './images/Bolo de Limão no LUMIÈRE Café.png' },
    { id: 'PROD02', categoryId: 'CAT01', name: 'Bolo Ouro Negro', price: '30.30', description: 'Bolo de chocolate belga, caramelo salgado e uma pitada de flor de sal.', image: './images/ChatGPT Image 29 de out. de 2025, 11_53_54 (1) 2.png' },
    { id: 'PROD03', categoryId: 'CAT01', name: 'Bolo de Nozes Clássico', price: '19.50', description: 'Receita tradicional com massa fofinha e cobertura suave de doce de leite.', image: './images/Bolo de noz.png' },
    { id: 'PROD20', categoryId: 'CAT01', name: 'Petit Lumière', price: '25.00', description: 'Cupckae feito com cacau puro 70% em uma massa aveludada e finalizado com um swirl generoso de ganache suíça, sedosa e densa', image: './images/ChatGPT Image 29 de out. de 2025, 11_53_54 (1) 2.png' },
    // CORRIGIDO: Imagem de bolo de morango para Romance Escarlate
    { id: 'PROD11', categoryId: 'CAT01', name: 'Bolo Romance Escarlate', price: '18.00', description: 'Camadas generosas de massa branca intercaladas com creme suave e geleia artesanal de morango.', image: './images/ChatGPT Image 3 de nov. de 2025, 08_36_38 1.png' },
    // CORRIGIDO: Imagem de bolo de pistache para Esmeralda Gourmet
    { id: 'PROD12', categoryId: 'CAT01', name: 'Bolo Esmeralda Gourmet', price: '37.00', description: 'Um bolo macio e aromático, preparado com pistache selecionado e recheio cremoso. Sabor sofisticado e elegante em cada fatia.', image: './images/ChatGPT Image 3 de nov. de 2025, 08_34_35 1 (21).png' },
    { id: 'PROD22', categoryId: 'CAT01', name: 'Bolo Rubi de Hollywood', price: '35.00', description: 'Feito com cacau holandês em um tom vermelho-rubi profundo. Camadas recheadas com um exclusivo Cream Cheese Frosting, levemente aerado e com um toque cítrico de limão siciliano.', image: './images/Fatia de Red Velvet do LUMIÈRE.png' },

    // --- SALGADOS ---
    { id: 'PROD04', categoryId: 'CAT02', name: 'Quiche do Diretor', price: '15.90', description: 'Quiche de alho-poró e queijo Gruyère com fatias de tomate', image: './images/torta de queijo.png' },
    // CORRIGIDO: Imagem de pão de queijo para Pão de Queijo Gourmet
    { id: 'PROD05', categoryId: 'CAT02', name: 'Pão de Queijo Gourmet', price: '12.00', description: 'Três unidades de pão de queijo recheado com queijo minas curado.', image: './images/ChatGPT Image 12 de nov. de 2025, 09_52_14 1.png' },
    // CORRIGIDO: Imagem de croissant para Enredo Crocante
    { id: 'PROD13', categoryId: 'CAT02', name: 'Enredo Crocante', price: '12.90', description: 'Croissant folhado, leve e dourado, recheado com frango cremoso e tempero suave.', image: './images/ChatGPT Image 3 de nov. de 2025, 08_34_35 2.png' },
    // CORRIGIDO: Imagem de salgado genérico para Dengo Crocante
    { id: 'PROD15', categoryId: 'CAT02', name: 'Dengo Crocante', price: '7.90', description: 'Um salgado leve, macio e recheado com frango temperado.', image: './images/ChatGPT Image 3 de nov. de 2025, 08_36_38 2.png' },
    // CORRIGIDO: Imagem de sanduíche para Sanduíche Estrela
    { id: 'PROD17', categoryId: 'CAT02', name: 'Sanduíche Estrela', price: '12.90', description: 'Pão artesanal brioche, tostado em manteiga clarificada Ghee, recheado com Presunto Nobre e cremoso Queijo Emmental Suíço, derretidos sob pressão.', image: './images/image 2.png' },
    // CORRIGIDO: Imagem de coxinha para Coxinha de Frango
    { id: 'PROD21', categoryId: 'CAT02', name: 'Coxinha de Frango', price: '11.70', description: 'Coxinha recheada com lascas de peito de frango caipira, cozido em caldo de especiarias e envolvido por um coração cremoso de autêntico Catupiry Original', image: './images/ChatGPT Image 29 de out. de 2025, 12_03_25 2.png' },
    // CORRIGIDO: Imagem de torta de frango para Trama de Frango
    { id: 'PROD28', categoryId: 'CAT02', name: 'Trama de Frango', price: '18.90', description: 'Torta de frango cremosa, massa leve e dourada, recheio saboroso e bem temperado. Uma opção clássica, confortável e irresistível.', image: './images/ChatGPT Image 19 de nov. de 2025, 12_24_19.png' }, 

    // --- BEBIDAS ---
    // CORRIGIDO: Imagem de expresso para Café Expresso Estrela
    { id: 'PROD06', categoryId: 'CAT03', name: 'Café Expresso Estrela', price: '8.00', description: 'Shot intenso de café com grãos 100% arábica e torra média.', image: './images/ChatGPT Image 29 de out. de 2025, 12_03_25 3.png' },
    { id: 'PROD07', categoryId: 'CAT03', name: 'Cappuccino Lumière', price: '14.00', description: 'Clássico italiano com leite vaporizado, café e uma pitada de canela.', image: 'images/Fatia de Red Velvet do LUMIÈRE 3.png' },
    { id: 'PROD08', categoryId: 'CAT03', name: 'Chocolate Quente Trufado', price: '16.50', description: 'Chocolate belga derretido com creme de leite fresco e raspas de chocolate.', image: './images/Caneca de Chocolate Quente TUMIÈRE.png' },
    // CORRIGIDO: Imagem de Chocolate Quente para Mocha Noir (melhor genérico)
    { id: 'PROD14', categoryId: 'CAT03', name: 'Mocha Noir', price: '14.90', description: 'Café espresso encorpado combinado com chocolate suave e leite vaporizado. Finalização cremosa e sabor equilibrado entre o amargo do café e o doce do chocolate.', image: 'images/ChatGPT Image 3 de nov. de 2025, 08_34_35 3.png' },
    // CORRIGIDO: Imagem de Affogato para Affogato Mergulho de Vênus
    { id: 'PROD18', categoryId: 'CAT03', name: 'Affogato Mergulho de Vênus', price: '18.70', description: 'A opulência de duas bolas de Gelato Italiano artesanal envoltas pela intensidade quente de um Espresso 35mm de grãos raros', image: './images/a3d4a8ca-75f2-44e4-a0ed-02b9b1904387 1 (1).png' },
    // CORRIGIDO: Imagem de Latte para Latte Simples
    { id: 'PROD19', categoryId: 'CAT03', name: 'Latte Simples', price: '12.90', description: 'A fusão perfeita e minimalista do Espresso Estrela com o Leite Vaporizado Cremoso, finalizado com um toque de arte em espuma', image: './images/image 3.png' },
    // CORRIGIDO: Imagem de Matcha para Matcha Secreto
    { id: 'PROD23', categoryId: 'CAT03', name: 'Matcha Secreto', price: '22.80', description: 'Bebida de Matcha Japonês (grau cerimonial), combinada com Leite Vaporizado Sedoso. O preparo realça seu sabor umami e cor vibrante, sendo finalizado com arte em espuma.', image: './images/ChatGPT Image 3 de nov. de 2025, 08_36_38 3 (1).png' },
    // CORRIGIDO: Imagem de Suco de Laranja para Suco Golden Globe
    { id: 'PROD24', categoryId: 'CAT03', name: 'Suco Golden Globe', price: '13.97', description: 'Suco de Laranja Naturalmente Doce (100% in natura). Prensado na hora com as laranjas mais maduras e de safra selecionada, garantindo um sabor vibrante e puro.', image: './images/ChatGPT Image 19 de nov. de 2025, 11_59_09.png' },
    { id: 'PROD25', categoryId: 'CAT03', name: 'Suco Drama Púrpura', price: '13.97', description: 'Suco de Uva Integral Fino, 100% natural, sem adição de água ou açúcares. Utilizamos apenas uvas selecionadas da mais recente colheita, garantindo a concentração máxima de sabor, cor e antioxidantes', image: './images/Copo de suco de uva elegante.png' },
    { id: 'PROD26', categoryId: 'CAT03', name: 'Suco Cena de Amor', price: '13.97', description: 'Um suco de Morango Fresco, preparado apenas com frutas da safra mais recente, resultando em um sabor naturalmente doce, rico e envolvente', image: './images/Suco de morango no LUMIÈRE café.png' },
    { id: 'PROD27', categoryId: 'CAT03', name: 'Limonada Premium', price: '13.97', description: 'preparada com a acidez vibrante e aromática dos Limões Sicilianos recém-colhidos. Servida perfeitamente gelada, combina a pureza da água cristalina com um toque refinado de açúcar orgânico (ou adoçante opcional)', image: './images/Limonada Fresca e Elegante.png' },
    
    // --- DOCES ---
    { id: 'PROD09', categoryId: 'CAT04', name: 'Cookie do Set', price: '4.50', description: 'Cookie de baunilha e gotas de chocolate meio amargo, levemente crocante.', image: './images/Cookie Marmorizado com Tag LUMIÈRE.png' },
    { id: 'PROD10', categoryId: 'CAT04', name: 'Cookie de Chocolate Duplo', price: '7.00', description: 'Um cookie indulgente de chocolate com pedaços de chocolate branco e ao leite.', image: './images/Cookie de Chocolate com Tag Elegante.png' },
    { id: 'PROD16', categoryId: 'CAT04', name: 'Cookie Red Velvet', price: '9.00', description: 'Cookie macio de red velvet com pedaços de chocolate branco, textura aveludada e sabor marcante.', image: './images/ChatGPT Image 29 de out. de 2025, 11_53_54.png' },
];

// Mapeia os dados para o formato que o frontend espera (incluindo "R$ " e categorias em minúsculas)
const products = rawProducts.map(p => ({
    id: p.id,
    name: p.name,
    price: `R$ ${p.price.replace('.', ',')}`,
    image: p.image,
    category: p.categoryId === 'CAT01' ? 'bolos' : 
              (p.categoryId === 'CAT02' ? 'salgados' : 
              (p.categoryId === 'CAT03' ? 'bebidas' : 'doces')),
    description: p.description
}));

// ------------------------------------------------------------------
// ESTADO E ROTEAMENTO
// ------------------------------------------------------------------
let historyStack = [];
const app = document.getElementById('desktop-container');

function navigateTo(pageName, data = null) {
    const currentState = { page: pageName, data: data };
    if (historyStack.length === 0 || JSON.stringify(historyStack[historyStack.length - 1]) !== JSON.stringify(currentState)) {
        historyStack.push(currentState);
    }
    renderPage(pageName, data);
}

function goBack() {
    if (historyStack.length > 1) {
        historyStack.pop();
        const previousState = historyStack[historyStack.length - 1];
        renderPage(previousState.page, previousState.data);
    } else {
        navigateToIndex();
    }
}

function navigateToIndex() {
    window.location.href = 'index.html';
}

function renderPage(pageName, data) {
    switch (pageName) {
        case 'home':
            renderHome();
            break;
        case 'product':
            renderProductPage(data);
            break;
        case 'category':
            renderCategoryPage(data);
            break;
        default:
            renderHome();
    }
}

/**
 * Renderiza o cabeçalho sem o ícone do carrinho.
 */
function renderHeader() {
    const isFirstScreen = historyStack.length === 1 && historyStack[0].page === 'home';
    const showBackToIndex = isFirstScreen; 
    const showBackButton = historyStack.length > 1; 

    return `
        <div class="header">
            <button class="back-button back-to-page-button" onclick="goBack()" style="${showBackButton ? 'visibility: visible;' : 'visibility: hidden;'}">
                <span class="back-button-arrow">←</span>
                <span class="back-button-text">Voltar</span>
            </button>
            
            <button class="back-button back-to-index-button" onclick="navigateToIndex()" style="${showBackToIndex ? 'visibility: visible;' : 'visibility: hidden;'}">
                <span class="back-button-arrow">←</span>
                <span class="back-button-text">Voltar</span>
            </button>
            
            <button class="logo-button" onclick="navigateTo('home')">
                <img alt="Logo Lumière Café" src="https://c.animaapp.com/sqnQevmt/img/group@4x.png" />
            </button>
            </div>
    `;
}

/**
 * Adiciona a funcionalidade de "arrastar" para scrollar em um elemento.
 * @param {HTMLElement} element 
 */
function enableDragScroll(element) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Inicia o "arraste"
    element.addEventListener('mousedown', (e) => {
        isDown = true;
        element.classList.add('active-dragging'); 
        startX = e.pageX - element.offsetLeft;
        scrollLeft = element.scrollLeft;
    });

    // Sai da área ou solta o botão para parar
    element.addEventListener('mouseleave', () => {
        isDown = false;
        element.classList.remove('active-dragging');
    });

    element.addEventListener('mouseup', () => {
        isDown = false;
        element.classList.remove('active-dragging');
    });

    // Move o carrossel
    element.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - element.offsetLeft;
        const walk = (x - startX) * 1.5; 
        element.scrollLeft = scrollLeft - walk;
    });
}


// Renderiza a página inicial (Home) - Usando rolagem horizontal
function renderHome() {
    let categoriesHtml = ['bolos', 'salgados', 'bebidas', 'doces'].map(category => {
        const categoryProducts = products.filter(p => p.category === category);
        const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

        // Gera os itens para o carrossel horizontal
        let productsHtml = categoryProducts.map(product => `
            <div class="product-item" onclick="navigateTo('product', '${product.name}')">
                <img src="${product.image}" alt="${product.name}" />
                <p class="product-name">${product.name}</p>
                <p class="product-price">${product.price}</p>
            </div>
        `).join('');

        return `
            <div class="category-section">
                <h2 class="category-title-home" onclick="navigateTo('category', '${category}')">${categoryTitle} →</h2>
                <div class="product-grid"> 
                    ${productsHtml}
                </div>
            </div>
        `;
    }).join('');

    app.innerHTML = `
        <div class="home-layout">
            ${renderHeader()}
            <h1 class="title-cardapio">Cardápio</h1>
            ${categoriesHtml}
        </div>
    `;
    
    // Adiciona a funcionalidade de arrastar após a renderização
    const productGrids = document.querySelectorAll('.product-grid');
    productGrids.forEach(enableDragScroll);
}

// Renderiza a página do produto - Tela de Detalhe (AGORA SEM O BOTÃO ADICIONAR AO CARRINHO)
function renderProductPage(productName) {
    const product = products.find(p => p.name === productName);

    if (!product) {
        app.innerHTML = `
            <div class="home-layout">
                ${renderHeader()}
                <h1 class="page-title">Produto Não Encontrado</h1>
                <p style="text-align: center;">Desculpe, o item '${productName}' não está disponível.</p>
            </div>
        `;
        return;
    }

    app.innerHTML = `
        <div class="product-detail-page">
            ${renderHeader()}
            <div class="product-detail-content">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="detail-image" />
                </div>
                <div class="product-info-container">
                    <h1 class="detail-name">${product.name}</h1>
                    <p class="detail-price">${product.price}</p>
                    <p class="detail-description">
                        ${product.description}
                    </p>
                    
                    <div class="detail-actions">
                        </div>
                </div>
            </div>
        </div>
    `;
}

// Renderiza a página da categoria 
function renderCategoryPage(category) {
    const filteredProducts = products.filter(p => p.category === category);

    let productsHtml = filteredProducts.map(p => `
        <div class="category-product-item" onclick="navigateTo('product', '${p.name}')">
            <img src="${p.image}" alt="${p.name}" />
            <div class="category-product-info">
                <strong>${p.name}</strong><br>
                <span>${p.price}</span>
            </div>
        </div>
    `).join('');

    app.innerHTML = `
        <div class="home-layout">
            ${renderHeader()}
            <h1 class="page-title">${category.toUpperCase()}</h1>
            <div class="page-content">
                <div class="category-products-list">
                    ${productsHtml || '<p>Nenhum produto encontrado nesta categoria.</p>'}
                </div>
            </div>
        </div>
    `;
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', function() {
    if (historyStack.length === 0) {
        navigateTo('home');
    } else {
        const lastState = historyStack[historyStack.length - 1];
        renderPage(lastState.page, lastState.data);
    }
});