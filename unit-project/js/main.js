const toggleMenu = document.querySelector('.nav-icon');
const nav = document.querySelector('.nav');

toggleMenu.addEventListener('click', function(){
    this.classList.toggle('nav-icon--active');
    nav.classList.toggle('nav--active');

});

const navLinks  = document.querySelectorAll('.nav a');

navLinks.forEach(function(item){
    item.addEventListener('click', function(){
        toggleMenu.classList.remove('nav-icon--active');
        nav.classList.remove('nav--active');
    })
})

const searchForm = document.querySelector('.search');
const searchButton = document.querySelector('.search__button');

searchButton.addEventListener('click', function (e) {
    if (!searchForm.classList.contains('search--visible')) {
        e.preventDefault();
        searchForm.classList.toggle('search--visible');
    }
})

// mobMenu.addEventListener('click', function(){
//     this.classList.remove('active-holder');
//     mobMenu.classList.remove('active-holder');
//     overlay.classList.remove('active-holder');
//     body1.classList.remove('noscroll');
//     toggleMenu.classList.remove('nav-icon--active');
// });