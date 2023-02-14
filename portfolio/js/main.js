$(document).ready(function(){

    const toggleMenu = document.querySelector('.nav-icon');
    const mobMenu = document.querySelector('.nav__list-holder');
    const overlay = document.querySelector('#overlay');
    const body1 = document.body;
    const formItems = document.querySelectorAll('.form-field');
    



    const backTopBtn = document.querySelector('#backtop');
    backTopBtn.style.opacity = 0;
    document.addEventListener('scroll', function(){
        if(window.pageYOffset > 500){
            backTopBtn.style.opacity = 1;
        }else{
            backTopBtn.style.opacity = 0;
        }
    })


    let containerE1 = document.querySelector('#mix-cards');
    let mixer = mixitup(containerE1, {
        classNames: {
            block: ""
        }
    });

    //Параллакс эффект 
    let prxScene = document.querySelector('.contacts');
    let prxItem = document.querySelectorAll('.move-quot');
    prxScene.addEventListener('mousemove', function (e) {
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;
        for (let item of prxItem) {
            item.style.transform = 'translate( -' + x * 80 + 'px, -' + y * 80 + 'px)';
        }
    })




for (let item of formItems) {
    const thisParent = item.closest('.form-item');
    const thisPlaceholder = thisParent.querySelector('.fake-placeholder');
    //Если input в фокусе
    item.addEventListener('focus',function(){
        thisPlaceholder.classList.add('activity');
    });

    //Если input теряет фокус
    item.addEventListener('blur', function(){
        if(item.value.length > 0){
            thisPlaceholder.classList.add('activity');
        }
        else{
            thisPlaceholder.classList.remove('activity');
        }
    })
};


    //FORM VALIDATE
	$('.contact-form').validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			
			message: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Введите email',
				email: 'отсутсвует символ @'
			},
			
			message: {
				required: 'Поле не должно быть пустым'
			}
		},
		submitHandler: function (form) {
			ajaxFormSubmit();
		}

	});

	//*************************************************** */
	// Функция AJAX запрса на сервер

	function ajaxFormSubmit() {

		let string = $(".contact-form").serialize(); // Сохраняем данные введенные в форму в строку.

		//Формируем ajax запрос
		$.ajax({
			type: "POST", // Тип запроса - POST
			url: "php/mail.php", // Куда отправляем запрос
			data: string, // Какие даные отправляем, в данном случае отправляем переменную string

			// Функция если все прошло успешно
			success: function (html) {
				$(".contact-form").slideUp(800);
				$('#answer').html(html);
			}
		});
		// Чтобы по Submit больше ничего не выполнялось - делаем возврат false чтобы прервать цепчку срабатывания остальных функций
		return false;
	};

toggleMenu.addEventListener('click', function(){
    this.classList.toggle('nav-icon--active');
    mobMenu.classList.toggle('active-holder');
    overlay.classList.toggle('active-holder');
    body1.classList.toggle('noscroll');

});


const navLinks  = document.querySelectorAll('.nav__additional-list a');

navLinks.forEach(function(item){
    item.addEventListener('click', function(){
        toggleMenu.classList.remove('nav-icon--active');
        overlay.classList.remove('active-holder');
        mobMenu.classList.remove('active-holder');
    })
})







window.addEventListener('resize', function(){
    mobMenu.classList.remove('active-holder');
    toggleMenu.classList.remove('nav-icon--active');
    overlay.classList.remove('active-holder');
    body1.classList.remove('noscroll');
    
});





$('#header__menu').onePageNav({
    currentClass:'active',
    changeHash: false,
    scrollSpeed: 750,
    scrollThreshold: 0.5,
    filter: '',
    easing:'swing',
})


})





