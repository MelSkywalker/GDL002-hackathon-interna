const urlVideos = [
    ['tt0458339','https://www.youtube.com/embed/mGqYQog6biY'],
    ['tt4154664','https://www.youtube.com/embed/Z1BCujX3pw8'],
    ['tt0371746','https://www.youtube.com/embed/8hYlB38asDY'],
    ['tt1228705', ],
    ['tt0800080', ],
    ['tt0800369', ],
    ['tt0848228', ],
    ['tt1300854', ],
    ['tt1981115', ],
    ['tt1843866', ],
    ['tt2015381', ],
    ['tt3896198', ],
    ['tt2395427', ],
    ['tt0478970', ],
    ['tt3498820', ],
    ['tt2250912', ],
    ['tt1211837', ],
    ['tt1825683', ],
    ['tt3501632', ],
    ['tt5095030', ],
    ['tt4154756', ]
];

const createNode = (element) => {
    return document.createElement(element);
};
const appendNode = (parent, element) => {
    return parent.appendChild(element);
};
const displayMovies = (data) => {
    const mainDiv = document.getElementById("moviesDiv");
    let div = createNode("div");
    let img = createNode("img");
    let span = createNode("span");
    div.setAttribute('class', 'poster');
    img.src = data.Poster;
    img.setAttribute('id', data.imdbID);
    img.addEventListener('click', showInfoModal);
    span.innerHTML = data.Title;
    appendNode(div, img);
    appendNode(div, span);
    appendNode(mainDiv, div);
};
const removeChild = (parent) => {
    const parentElement = document.getElementById(parent);
    while(parentElement.firstChild){
        parentElement.removeChild(parentElement.firstChild);
    };
}
const url = "http://www.omdbapi.com/?apikey="
const apikey = "8f24c86a";
const movies = [
    "t=captain+america&y=2011",
    "t=captain+marvel",
    "t=iron+man",
    "t=iron+man+2",
    "t=the+incredible+hulk",
    "t=thor",
    "t=the+avengers",
    "t=iron+man+3",
    "t=Thor%3A+The+Dark+World",
    "t=Captain+America%3A+The+Winter+Soldier",
    "t=guardians+of+the+galaxy",
    "t=guardians+of+the+galaxy+vol.+2",
    "t=Avengers%3A+Age+of+Ultron",
    "t=Ant-Man",
    "t=Captain+America%3A+Civil+War",
    "t=Spider-man%3A+Homecoming",
    "t=Doctor+Strange",
    "t=Black+Panther",
    "t=Thor+Ragnarok",
    "t=Ant-man+and+the+wasp",
    "t=Avengers+infinity+war"
];

async function displayAllMovies() {
    removeChild("moviesDiv");
    for (let i = 0; i < movies.length; i++) {
        let resp = await fetch(url + apikey +'&'+ movies[i]);
        let data = await resp.json();
        displayMovies(data);
    }
};
displayAllMovies();

async function displayFilteredMovies(character) {
    removeChild("moviesDiv");
    for (let i = 0; i < movies.length; i++) {
        let resp = await fetch(url + apikey + '&' + movies[i]);
        let data = await resp.json();
        if(data.Actors.includes(character)){
            await displayMovies(data);
        }
    }
};
// displayFilteredMovies("Mark Ruffalo");
const selectActor = () => {
    let select = document.getElementById("actors");
    let selectedValue = select.value;
    displayFilteredMovies(selectedValue);
}

document.getElementById("actors").addEventListener("change", selectActor);


//Crear modal con info de pelis
const showInfoModal = () => {
    let id = this.event.target.id;
    fetch(url + apikey +"&i="+id)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let modal = document.getElementById('modal');
        modal.style.display = 'block';

        let modalContent = document.getElementById('modalContainer');
        //reiniciar la creación de elementos en modal
        while (modalContent.hasChildNodes()) {
            modalContent.removeChild(modalContent.firstChild);
        }

        //Agregar título de peli
        let createTitle = document.createElement('h2');
        let title = document.createTextNode(data.Title);
        createTitle.appendChild(title);
       
        

        //Agregar director
        let createDirector = document.createElement('p');
        let director = document.createTextNode('DIRECTOR: ' + data.Director);
        createDirector.appendChild(director);
        
        //Agregar plot
        let createPlot = document.createElement('p');
        let plot = document.createTextNode('PLOT: ' + data.Plot);
        createPlot.appendChild(plot);

        //Agregar puntuación
        let createRating = document.createElement('p');
        let rating = document.createTextNode('IMDB Rating: ' + data.imdbRating);
        createRating.appendChild(rating);

        //Orden de elementos en contenedor
        modalContent.appendChild(createTitle);

        //Agregar video
         urlVideos.map( videoSource =>{
            if(videoSource[0]===id){
                let createVideo = document.createElement('iframe');
                createVideo.setAttribute('width', '560');
                createVideo.setAttribute('height', '315');
                createVideo.setAttribute('src', videoSource[1]);
                createVideo.setAttribute('frameborder', '0');
                createVideo.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
                //createVideo.setAttribute('allowfullscreen');
                modalContent.appendChild(createVideo);
            }
        }, id, modalContent);

        modalContent.appendChild(createDirector);
        modalContent.appendChild(createPlot);
        modalContent.appendChild(createRating);  
     })
};

//cerrar modal
window.onclick = (event) => {
    let modal = document.getElementById('modal');
    if (event.target == modal) {
      modal.style.display = "none";
    }
};