    const toggleMenu = document.querySelector('.nav-icon');
    const nav = document.querySelector('.nav');
    const navLinks  = document.querySelectorAll('.nav a');

    toggleMenu.addEventListener('click', function(){
    this.classList.toggle('nav-icon--active');
    nav.classList.toggle('nav--active');
    


        navLinks.forEach(function(item){
        item.addEventListener('click', function(){
            toggleMenu.classList.remove('nav-icon--active');
            nav.classList.remove('nav--active');
            
        })
        

    })

    })


