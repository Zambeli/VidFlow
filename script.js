const containerVideos = document.querySelector('.videos__container')
const barraDePesquisa = document.querySelector('.pesquisar__input')

async function converterApi () {
    try{
    const busca = await fetch('http://localhost:3000/videos')
    const apiVideos = await busca.json()
    console.log(apiVideos)
    apiVideos.forEach((video) => {
        if(video.categoria == "") {
            throw new Error('Vídeo não tem categoria')
        }
        containerVideos.innerHTML += `
        <li class="videos__item">
            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class="descricao-video">
                <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p class="titulo-canal">${video.descricao}</p>
                <p class="categoria" hidden>${video.categoria}</p>
            </div>
        </li>
        `
    })
    } catch (error) {
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos ${error}</p>`
    }
}

barraDePesquisa.addEventListener('input', FiltrarPesquisa)

function FiltrarPesquisa () {
    const videos = document.querySelectorAll('.videos__item')

    if(barraDePesquisa.value != "") {
        videos.forEach((video) => {
            const titulo = video.querySelector('.titulo-video').textContent.toLowerCase()
            const pesquisa = barraDePesquisa.value.toLowerCase()

            // video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';

            if(!titulo.includes(pesquisa)) {
                video.style.display = 'none'
            } else {
                video.style.display = 'block'
            }
        })
    } else {
        videos.forEach((video) => {
            video.style.display = 'block'
        })
    }
    
    // if(barraDePesquisa.value != "") {
    //     for(let video of videos) {
    //         let titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
    //         let valorFiltro = barraDePesquisa.value.toLowerCase()

    //         if(!titulo.includes(valorFiltro)) {
    //             video.style.display = 'none'
    //         } else {
    //             video.style.display = 'block'
    //         }
    //     }
    // } else {
    //     video.style.display = 'block'
    // }
}

converterApi()

const botaoCategoria = document.querySelectorAll(".superior__item")

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute('name')
    botao.addEventListener('click', () => filtrarPorCategoria(nomeCategoria))
})

function filtrarPorCategoria (filtro) {
    const videos = document.querySelectorAll('.videos__item')
    videos.forEach((video) => {
        let categoria = video.querySelector('.categoria').textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if(!categoria.includes(valorFiltro) && valorFiltro != "tudo") {
            video.style.display = 'none'
        } else {
            video.style.display = 'block'
        }
    })
}