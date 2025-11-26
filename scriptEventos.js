// 1. Dados dos Filmes (MANTIDOS)
const movies = [
    {
        id: 1,
        title: "Como eu era antes de você (2016)",
        day: "Segunda 19:30 12+",
        rating: 4.8,
        // 🛑 Usando placeholder para simular suas imagens. Substitua por seus caminhos: 
        // posterUrl: "./img/Como eu era antes de vc.png",
        posterUrl: "./imgEventos/Como eu era antes de vc.png",
        synopsis: "Louisa Clark é uma jovem otimista que aceita trabalhar como cuidadora de Will Traynor, um homem rico e bem-sucedido que ficou tetraplégico após um acidente. Apesar das personalidades opostas, eles desenvolvem uma conexão profunda que transforma a vida de ambos. Lou luta para mostrar a Will que ainda vale a pena viver, enquanto ele enfrenta sua dor e suas limitações. Uma história emocionante sobre amor, escolhas e dignidade."
    },
    {
        id: 2,
        title: "Nós (2019)",
        day: "Terça 19:30 16+",
        rating: 4.8,
        // posterUrl: "./img/Nós.png",
        posterUrl: "./imgEventos/Nós.png",
        synopsis: "Adelaide Wilson volta à casa de férias da infância com o marido e os filhos, mas uma inquietação a persegue desde um trauma antigo. A viagem se transforma em pesadelo quando uma família de doppelgängers — versões idênticas e sombrias deles mesmos — aparece para aterrorizá-los. O que começa como um ataque doméstico revela uma conspiração muito maior. Misturando terror e crítica social, o filme explora identidade, privilégios e a dualidade humana."
    },
    {
        id: 3,
        title: "Moonlight: Sob a Luz do Luar (2016)",
        day: "Quinta 19:30 16+",
        rating: 4.8,
        posterUrl: "./imgEventos/Moonlight.png",

        synopsis: "Acompanhando três fases da vida de Chiron — infância, adolescência e início da vida adulta — o filme retrata sua busca por identidade enquanto lida com a solidão, o bullying e a relação complicada com a mãe dependente química. Sob a influência inesperada de um mentor, Chiron tenta entender quem é e quem pode se tornar, especialmente quando o amor e a vulnerabilidade entram em conflito com o ambiente duro ao seu redor."
    },
    {
        id: 4,
        title: "Duna: Parte 2 (2024)",
        day: "Quarta 19:30 14+",
        rating: 4.5,
        posterUrl: "./imgEventos/Duna 2.png",
        synopsis: "Após unir forças com os Fremen, Paul Atreides embarca no caminho que pode transformá-lo no líder messiânico profetizado. Enquanto domina as tradições do deserto e enfrenta forças políticas implacáveis, Paul precisa decidir entre vingança e responsabilidade. A guerra pelo controle de Arrakis se intensifica, e o destino do planeta — e do próprio Paul — se aproxima de um ponto sem retorno."
    },
    {
        id: 5,
        title: "Filme Surpresa",
        day: "Sexta 20:00",
        rating: 0,
        posterUrl: "./imgEventos/Surpresa.png",
        synopsis: "Ninguém sabe qual filme será exibido nesta noite!"
    },
    {
        id: 6,
        title: "Corra (2017)",
        day: "Sábado 20:30 16+",
        rating: 4.5,
        posterUrl: "./imgEventos/Corra.png",
        synopsis: "Chris, um jovem fotógrafo negro, viaja para conhecer a família da namorada branca. Apesar da recepção aparentemente calorosa, comportamentos estranhos começam a revelar que algo muito sinistro está acontecendo na casa. Conforme Chris investiga, descobre um segredo perturbador envolvendo manipulação mental e práticas macabras. O filme mistura terror psicológico e crítica racial de forma afiada e impactante."
    },
];

// 2. Referência aos elementos do DOM
const movieGrid = document.getElementById('movie-grid');
const modal = document.getElementById('synopsis-modal');
const modalTitle = document.getElementById('modal-title');
const modalSynopsis = document.getElementById('modal-synopsis');

/**
 * Cria e retorna o HTML de um card de filme.
 * @param {Object} movie - Objeto do filme.
 * @returns {string} O HTML do card.
 */
function createMovieCardHTML(movie) {
    // Usamos classes do Tailwind no HTML gerado, mas adicionamos a classe 'rating-overlay' e 'synopsis-button'
    // que foram definidas no style.css
    return `
        <div class="bg-white rounded-xl shadow-lg w-96 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <div class="relative">
                <img 
                    src="${movie.posterUrl}" 
                    alt="Poster do filme ${movie.title}" 
                    class="w-full object-cover" 
                    onerror="this.onerror=null; this.src='https://placehold.co/360x230/4F4F4F/FFFFFF?text=POSTER+NÃO+DISPONÍVEL';"
                    style="aspect-ratio: 360/230; height: 230px;"
                >
                
                <div class="rating-overlay absolute top-0 left-0 px-3 py-2 flex items-center gap-1 text-white text-base font-semibold">
                    <i data-lucide="star" class="w-4 h-4 text-yellow-300 fill-yellow-300"></i>
                    ${movie.rating.toFixed(1)}
                </div>
            </div>

            <div class="p-6 flex flex-col justify-between flex-grow" style="height: 186px;">
                <div class="mb-6">
                    <h3 class="text-xl font-semibold text-[#2f2d2c] leading-snug mb-1">${movie.title}</h3>
                    <p class="text-base text-[#9b9b9b] font-normal">${movie.day}</p>
                </div>
                
                <button 
                    data-movie-id="${movie.id}"
                    class="synopsis-button font-semibold py-3 rounded-xl text-xl w-full"
                    aria-label="Ver sinopse do filme ${movie.title}"
                    onclick="openModal(${movie.id})"
                >
                    Sinopse
                </button>
            </div>
        </div>
    `;
}

/**
 * Renderiza todos os cards de filmes no grid principal.
 */
function renderMovieCards() {
    if (!movieGrid) {
        console.error("O elemento #movie-grid não foi encontrado no DOM.");
        return;
    }
    // Limpa o conteúdo e insere os cards gerados
    movieGrid.innerHTML = movies.map(createMovieCardHTML).join('');
    // Renderiza os ícones do Lucide após o HTML ser inserido
    lucide.createIcons();
}

/**
 * Abre o modal com a sinopse do filme.
 * @param {number} movieId - ID do filme.
 */
window.openModal = function (movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
        modalTitle.textContent = movie.title;
        modalSynopsis.innerHTML = movie.synopsis;
        // Torna visível (de 'hidden' para 'flex')
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    } else {
        console.error("Filme não encontrado com o ID:", movieId);
    }
}

/**
 * Fecha o modal.
 */
window.closeModal = function () {
    // Torna invisível (de 'flex' para 'hidden')
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}

// 3. Inicialização e Listeners
document.addEventListener('DOMContentLoaded', () => {
    // 1. Renderiza os cards quando a página carrega
    renderMovieCards();

    // 2. Adiciona listener para fechar o modal clicando na área escura (fundo)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // 3. Adiciona listener para fechar o modal com a tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closeModal();
            }
        });
    }
});