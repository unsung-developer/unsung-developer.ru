$(document).ready(function(){
    $('.first-element').addClass('first-element__animated');
    $('.second-element').addClass('second-element__animated');
    $('.third-element').addClass('third-element__animated');
    $('.fourth-element').addClass('fourth-element__animated');
    $('.fifth-element').addClass('fifth-element__animated');

    var owl = $(".owl-carousel");

    owl.owlCarousel({
      loop: true,
      smartSpeed: 900,
      margin: 20,
      dots: true,
      responsive:{
        0:{
          items:1,
        },
        768:{
          items:2,
        },
        1299:{
          items:3
        }
      }
    });
    $(".left--arrow__button").click(function(){
       owl.trigger("prev.owl.carousel");
    });
    $(".right--arrow__button").click(function(){
      owl.trigger("next.owl.carousel");
    });
});