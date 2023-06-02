const searchInput = document.querySelector("[data-search")
// takes values that the user inputs and searches the imdb api and returns movies based off the results
searchInput.addEventListener("input", (e) => {
    const value = e.target.value
    const search = "https://online-movie-database.p.rapidapi.com/auto-complete?q=" + value;
        fetch(search, {
            "method": "GET",
            "headers": {
                "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
                "X-RapidAPI-Key": ""
        }   
        })
    .then(response => response.json())
    .then(data => {
        // converts the data to a map gathers the the name and poster and combines them into one
        // pushes that to the front end html with the list of movies in the correct format
        const list = data.d;
        const movieList = [];
        list.map((item) => {
            const name = item.l;
            const poster = item.i.imageUrl;
            const movie = `<li><img src="${poster}"> <h2>${name}</h2></li>`;
            movieList.push(movie);
        })    
        document.querySelector('.movies').innerHTML = movieList.join('');    
    })
    .catch (err => {
	    console.error(err);
    });
})
