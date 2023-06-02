//for loop of x genres
const API_KEY = "1100556013mshe9132b97a7ca03fp18dfcejsnd84db29d9e19";
var genre = "adventure";
var limiter = 1;
var genresArray = [];
var buttonDisabled = false;
var genreMovieList = [];
var gatheredMovies = [];
var suggestedGenre = "adventure"
function genreRetreiverFunc()
{
    const genreRetreiver = "https://online-movie-database.p.rapidapi.com/title/v2/get-popular-movies-by-genre?genre=" + genre + "&limit=1";
    fetch(genreRetreiver, {
        "method": "GET",
        "headers": {
            "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
            "X-RapidAPI-Key": API_KEY
    }   
    })
    .then(response => response.json())
    .then(data => {
        var topInGenre;        
        var moviesList = [];
        moviesList = data;
        console.log(moviesList);
        for(var i =0; i < moviesList.length; i++)
        {
            topInGenre = data[i].toString().slice(1,-1);
        }

        const search = "https://online-movie-database.p.rapidapi.com/auto-complete?q=" + topInGenre;  
            fetch(search, {
                "method": "GET",
                "headers": {
                    "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
                    "X-RapidAPI-Key": API_KEY
            }   
            })
            .then(response => response.json())
            .then(data => {
                
                const list = data.d;
                var movieList = [];
                list.map((item) => {                   
                    const name = item.l;
                    const poster = item.i.imageUrl;
                    const movie = `<li><img src="${poster}"> <h2>${name} - ${genre}</h2></li>`;
                    movieList.push(movie);                           
                    
                })
                console.log(genre);
            console.log(movieList);
            document.querySelector('.Recommend').innerHTML = movieList.join('');
            })                
        }) 
}
genreRetreiverFunc();

function suggestions()
{
    console.log(genresArray)
    for(var i =0; i < 1;i++)
    {
            if(genresArray[0] == true){
                suggestedGenre = "adventure";
                genre = "adventure";
                //genresArray[0] = false;
                suggestThoseGenres();          
            } if(genresArray[1] == true){
                suggestedGenre = "action";
                genre = "action";
                //genresArray[1] = false;
                suggestThoseGenres();
            } if(genresArray[2] == true){
                suggestedGenre = "drama";
                genre = "drama";
                //genresArray[2] = false;
                suggestThoseGenres();
            } if(genresArray[3] == true){
                suggestedGenre = "comedy";
                genre = "comedy";
                //genresArray[3] = false;
                suggestThoseGenres();
            }if(genresArray[4] == true){
                suggestedGenre = "romance";
                genre = "romance";
                //genresArray[4] = false;
                suggestThoseGenres();
            }if(genresArray[5] == true){
                suggestedGenre = "fantasy";
                genre = "fantasy";
                //genresArray[5] = false;
                suggestThoseGenres();
            }if(genresArray[5] ==false && genresArray[4] ==false && genresArray[3] ==false && genresArray[2] ==false && genresArray[1] ==false && genresArray[0] ==false){
                console.log("all done");
            }
    }

    
    function suggestThoseGenres()
    {
        const genreRetreivers = "https://online-movie-database.p.rapidapi.com/title/v2/get-popular-movies-by-genre?genre=" + suggestedGenre + "&limit=5";
        fetch(genreRetreivers, {
            "method": "GET",
            "headers": {
                "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
                "X-RapidAPI-Key": API_KEY
        }   
        })
        .then(response => response.json())
        .then(data => {
            var topMoviesInGenre;        
            var moviesList = [];
            moviesList = data;

            //console.log(moviesList);
            
                for(var i =0; i < moviesList.length; i++)
                {
                    for(let j =0; j < 1000000; j++)
                    {
                        var coup = [];
                        coup[j] = j;
                    }
                    topMoviesInGenre = data[i].toString().slice(1,-1);
                    gatheredMovies[i] = topMoviesInGenre; 

                    const searchs = "https://online-movie-database.p.rapidapi.com/auto-complete?q=" + gatheredMovies[i];  
                                fetch(searchs, {
                                    "method": "GET",
                                    "headers": {
                                        "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
                                        "X-RapidAPI-Key": API_KEY
                                    }   
                                })
                                .then(response => response.json())
                                .then(data => {  
                                    console.log(data)                  
                                    const lists = data.d;                    
                                    lists.map((item) => {
                                        //console.log(item);
                                        const name = item.l;
                                        const poster = item.i.imageUrl;
                                        const movie = `<li><img src="${poster}"> <h2>${name}</h2></li>`;
                                        genreMovieList.push(movie);
                                    })

                                    document.querySelector('.Recommend').innerHTML = genreMovieList.join('');
                                    console.log("this happend");
                                })
                }
                             
        })    
    }
}


    
function addToArray(value, button){
    if(!buttonDisabled){
        genresArray.push(value);

        buttonDisabled = true;
        button.classList.add("disabled");
    
        setTimeout(function() {
          buttonDisabled = false;
          button.classList.remove("disabled");
        }, 2000);
    }
    console.log(genresArray.length);
    switch(genresArray.length > 0){
        case genresArray.length == 1:
            genre = "action";
            genreRetreiverFunc();
            break;
        case genresArray.length == 2:
            genre = "drama"; 
            genreRetreiverFunc();
            break; 
        case genresArray.length == 3:
            genre = "comedy"; 
            genreRetreiverFunc();
            break;
        case genresArray.length == 4:
            genre = "romance"; 
            genreRetreiverFunc();
            break;
        case genresArray.length == 5:
            genre = "fantasy"; 
            genreRetreiverFunc();
            break;
        case genresArray.length > 5:
             suggestions();
            break;     
    }

    
}