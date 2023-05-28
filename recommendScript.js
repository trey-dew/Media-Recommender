// // for loop of x genres

// const genreRetreiver = "https://online-movie-database.p.rapidapi.com/title/v2/get-popular-movies-by-genre?genre=adventure&limit=100";


// fetch(genreRetreiver, {
//     "method": "GET",
//     "headers": {
//         "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
//         "X-RapidAPI-Key": "5a7bc83a69mshf40020bb07e2016p127dd1jsn1036865972e7"
// }   
// })
// .then(response => response.json())
// .then(data => {
//     const list = data.d;
//     const movieList = [];
//     list.map((item) => {
//         const name = item.l;
//         const poster = item.i.imageUrl;
//         const gMovie = `<li><img src="${poster}"> <h2>${name}</h2></li>`;
//         movieList.push(gMovie);
//     })
//         document.querySelector('.Recommend').innerHTML = movieList.join('');

// })

// .catch (err => {
// console.error(err);
// });


const search = "https://online-movie-database.p.rapidapi.com/auto-complete?q=high" + value;
        fetch(search, {
            "method": "GET",
            "headers": {
                "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
                "X-RapidAPI-Key": "5a7bc83a69mshf40020bb07e2016p127dd1jsn1036865972e7"
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
    
        document.querySelector('.Recommend').innerHTML = movieList.join('');
    
    })