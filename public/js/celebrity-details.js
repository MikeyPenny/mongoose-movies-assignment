
let allMovies = document.getElementById('movie-list');
let selected = document.getElementById('movie-select');
let allOptions = document.querySelectorAll(".celeb-details option")

for (let i = 0; i < allOptions.length; i++) {
    allOptions[i].addEventListener('click', function(ev) {
        let target  = ev.currentTarget
        if(allMovies.contains(target)) selected.appendChild(target)
        else if(selected.contains(target)) allMovies.appendChild(target);
    });
}
