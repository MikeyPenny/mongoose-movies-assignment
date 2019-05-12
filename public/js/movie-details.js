
let allCelebrities = document.getElementById('celeb-list');
let selected = document.getElementById('celeb-starring');
let allOptions = document.querySelectorAll(".details option");

for (let i = 0; i < allOptions.length; i++) {
    allOptions[i].addEventListener('click', function(ev) {
        let target  = ev.currentTarget
        if(allCelebrities.contains(target)) selected.appendChild(target)
        else if(selected.contains(target)) allCelebrities.appendChild(target);
    });
}
