$(document).ready(function () {
    const owl = $('#clients-slider');
    owl.owlCarousel({
        items :1,
        loop : true
    });
    const prev = $('#sliderPrev');
    prev.click(function() {
        owl.trigger('prev.owl.carousel');
    });
    const next = $('#sliderNext');
    next.click(function() {
        owl.trigger('next.owl.carousel');
    })

});



