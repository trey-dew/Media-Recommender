const searchInput = document.querySelector("[data-search")

searchInput.addEventListener("input", (e) => {
    const value = e.target.value
    const search = "https://online-movie-database.p.rapidapi.com/auto-complete?q=" + value;
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
