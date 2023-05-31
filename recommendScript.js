//for loop of x genres
var genre = "adventure";
var limiter = 1;
var genresArray = [];
var buttonDisabled = false;
var genreMovieList = [];
var gatheredMovies = [];
function genreRetreiverFunc()
{
    const genreRetreiver = "https://online-movie-database.p.rapidapi.com/title/v2/get-popular-movies-by-genre?genre=" + genre + "&limit=1";
    fetch(genreRetreiver, {
        "method": "GET",
        "headers": {
            "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
            //"X-RapidAPI-Key": "5a7bc83a69mshf40020bb07e2016p127dd1jsn1036865972e7"

            "X-RapidAPI-Key": "dee2d52c57msh49ccc6c0a727840p13c396jsnb36a44149947"
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
                    //"X-RapidAPI-Key": "5a7bc83a69mshf40020bb07e2016p127dd1jsn1036865972e7"

                    "X-RapidAPI-Key": "dee2d52c57msh49ccc6c0a727840p13c396jsnb36a44149947"
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
    var suggestedGenre;
    switch(true == true){
        case genresArray[0] == true:
            suggestedGenre = "adventure";
            genre = "adventure";
            break;
        case genresArray[1] == true:
            suggestedGenre = "action";
            genre = "action";
            break;
        case genresArray[2] == true:
            suggestedGenre = "drama";
            genre = "drama";
            break;
        case genresArray[3] == true:
            suggestedGenre = "comedy";
            genre = "comedy";
            break;
        case genresArray[4] == true:
            suggestedGenre = "romance";
            genre = "romance";
            break;
        case genresArray[5] == true:
            suggestedGenre = "fantasy";
            genre = "fantasy";
            break;
    } 
    

    const genreRetreiver = "https://online-movie-database.p.rapidapi.com/title/v2/get-popular-movies-by-genre?genre=" + suggestedGenre + "&limit=5";
    fetch(genreRetreiver, {
        "method": "GET",
        "headers": {
            "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
            //"X-RapidAPI-Key": "5a7bc83a69mshf40020bb07e2016p127dd1jsn1036865972e7"

            "X-RapidAPI-Key": "dee2d52c57msh49ccc6c0a727840p13c396jsnb36a44149947"
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
            topMoviesInGenre = data[i].toString().slice(1,-1);
            gatheredMovies[i] = topMoviesInGenre;
        }
    })
        console.log(gatheredMovies);


        for(var i = 0; i < gatheredMovies.length; i++)
        {
            const search = "https://online-movie-database.p.rapidapi.com/auto-complete?q=" + gatheredMovies[i];  
                fetch(search, {
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
                        //"X-RapidAPI-Key": "5a7bc83a69mshf40020bb07e2016p127dd1jsn1036865972e7"

                        "X-RapidAPI-Key": "dee2d52c57msh49ccc6c0a727840p13c396jsnb36a44149947"
                    }   
                })
                .then(response => response.json())
                .then(data => {                    
                    const list = data.d;                    
                    list.map((item) => {
                        const name = item.l;
                        const poster = item.i.imageUrl;
                        const movie = `<li><img src="${poster}"> <h2>${name} - ${genre}</h2></li>`;
                        genreMovieList.push(movie);
                    })

                    document.querySelector('.Recommend').innerHTML = genreMovieList.join('');
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