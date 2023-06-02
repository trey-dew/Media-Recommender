const searchInput = document.querySelector("[data-search")

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
