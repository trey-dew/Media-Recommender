//for loop of x genres
const API_KEY = "";
var genre = "adventure";
var limiter = 1;
var genresArray = [];
var buttonDisabled = false;
var genreMovieList = [];
var gatheredMovies = [];
var suggestedGenre = "adventure"
var delay = 5000;

// function sleeps for 5 seconds to allow time for the api
// to not be queried to fast
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}
// main function that runs when the reccomender html is called
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
        // converts the data to a map gathers the top movie in the genre from imdb
        var topInGenre;        
        var moviesList = [];
        moviesList = data;
        console.log(moviesList);
        // cuts of the first and last character of the string so that 
        // the movie can be searched
        for(var i =0; i < moviesList.length; i++)
        {
            topInGenre = data[i].toString().slice(1,-1);
        }
        // searched the api for the specified movie
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
                // converts to map
                const list = data.d;
                var movieList = [];
                list.map((item) => {                   
                    const name = item.l;
                    const poster = item.i.imageUrl;
                    const movie = `<li><img src="${poster}"> <h2>${name} - ${genre}</h2></li>`;
                    movieList.push(movie);                                              
                })
            document.querySelector('.Recommend').innerHTML = movieList.join('');
            })                
        }) 
}
genreRetreiverFunc();

function suggestions()
{
    // called when all the genres have been looped threw 
    // and calls the final function based off what the user preferred
    console.log(genresArray)
    for(var i =0; i < 1;i++)
    {
            if(genresArray[0] == true){
                suggestedGenre = "adventure";
                genre = "adventure";
                suggestThoseGenres();          
            } if(genresArray[1] == true){
                suggestedGenre = "action";
                genre = "action";
                suggestThoseGenres();
            } if(genresArray[2] == true){
                suggestedGenre = "drama";
                genre = "drama";
                suggestThoseGenres();
            } if(genresArray[3] == true){
                suggestedGenre = "comedy";
                genre = "comedy";
                suggestThoseGenres();
            }if(genresArray[4] == true){
                suggestedGenre = "romance";
                genre = "romance";
                suggestThoseGenres();
            }if(genresArray[5] == true){
                suggestedGenre = "fantasy";
                genre = "fantasy";
                suggestThoseGenres();
            }if(genresArray[5] ==false && genresArray[4] ==false && genresArray[3] ==false && genresArray[2] ==false && genresArray[1] ==false && genresArray[0] ==false){
                suggestedGenre = "animation";
                genre = "animation";
                suggestThoseGenres();
            }
    }
   
    async function suggestThoseGenres()
    {
        // function that takes all the previous data from the users prefrences find the top 5 currently popular movies in the genre
        // converts it to a readable format and adds them to the list function should only be called by suggestions function
        // has a sleep method at the bottom to prevent the api from limiting the amount of times you can call it per second
        const genreRetreivers = "https://online-movie-database.p.rapidapi.com/title/v2/get-popular-movies-by-genre?genre=" + suggestedGenre + "&limit=5";
        fetch(genreRetreivers, {
            "method": "GET",
            "headers": {
                "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
                "X-RapidAPI-Key": API_KEY
        }   
        })
        .then(response => response.json())
        .then(async data => {
            var topMoviesInGenre;        
            var moviesList = [];
            moviesList = data;
            for(var i =0; i < moviesList.length; i++)
            {
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
                            const name = item.l;
                            const poster = item.i.imageUrl;
                            const movie = `<li><img src="${poster}"> <h2>${name}</h2></li>`;
                            genreMovieList.push(movie);
                        })
                        document.querySelector('.Recommend').innerHTML = genreMovieList.join('');
                        console.log(genre);
                    })
                    await sleep(delay);
            }                            
        })    
    }
}
    
function addToArray(value, button){
    // fucntion is called when one of the buttons is pressed
    // it adds the result to an array that is used to figure out the users prefrences
    // then times out the button for 2 seconds while it waits for the api to be called again
    // then changes the genre and calls genreretrevierfunc that will start over witha new movie in a different genre
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