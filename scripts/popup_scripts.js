//Кнопка меню
$('.header--about__hidden-button').click(function(event){
    event.preventDefault();
});

$('.header--about__hidden-button').click(function(){
  $('.header--about__list').slideToggle()
});

$('.header--about__item').click(function(){
  if ($(window).width() < 1300) {
    $('.header--about__list').slideToggle()
  }
});

$(window).resize(function(){
  if ($(window).width() > 320) {
    $('.header--about__list').removeAttr('style');
  }
});

  //Скроллы
$('.header--about__item a, .footer--container__item a').click(function(event){
  event.preventDefault();

  let href = $(this).attr('href');
  let offset = $(href).offset().top;
    
  $('body, html').animate({
    scrollTop: offset
  }, 500);
});

    //Отмена скролла 

      // left: 37, up: 38, right: 39, down: 40,
      // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
      const keys = {37: 1, 38: 1, 39: 1, 40: 1};
  
      function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;  
      }
  
      function preventDefaultForScrollKeys(e) {
          if (keys[e.keyCode]) {
              preventDefault(e);
              return false;
          }
      }
  
      function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
  
        console.log('modernizr', Modernizr.passiveeventlisteners);
  
        window.addEventListener('wheel', preventDefault,
            Modernizr.passiveeventlisteners ? {passive: false} : false); // modern standard
        document.addEventListener('mousewheel', preventDefault,
            Modernizr.passiveeventlisteners ? {passive: false} : false); // older browsers, IE
        window.addEventListener('mousewheel', preventDefault,
            Modernizr.passiveeventlisteners ? {passive: false} : false); // older browsers, IE
        window.addEventListener('touchmove', preventDefault,
            Modernizr.passiveeventlisteners ? {passive: false} : false); // mobile
        document.onkeydown  = preventDefaultForScrollKeys;
      }
  
      function enableScroll() {
          if (window.removeEventListener)
              window.removeEventListener('DOMMouseScroll', preventDefault, false);
          document.removeEventListener('mousewheel', preventDefault, false);
          window.removeEventListener('mousewheel', preventDefault, false);
          window.removeEventListener('wheel', preventDefault, false);
          window.removeEventListener('touchmove', preventDefault, false);
          document.onkeydown = null;
      }

//Всплывающее окно      
      $('.common__button').click(function(){
        $('.popup--container').fadeToggle(disableScroll);
      });
  
      $('.popup--container').click(function(event){
        if(event.target == this) {
          $(this).hide(enableScroll);
        }
      });

      $('.popup--container__button').click(function(){
        $('.popup--container').fadeToggle(enableScroll);
        $('.popup--container__form').reset();
      });
//маска телефонной формы
  $('.popup--container__tel').inputmask({'mask' : '+7 999 999 99 99'});
//Ваидация
/*  $(form).each(function(){
    $(this).validate({
      errorPlacement(errorForm, element){
        return true;
      },
        focusInvalid: false,
        rules: {
          name: {
            required: true,
          },
          email: {
            required: true,
            email: true,
          },
          tel: {
            required: true,
            digits: true,
          },
        },
        submitHandler(form) {
          let th = $(form);
          let pop = $('.popup--container');
    
        $.ajax({
          type: "POST",
          url: "mail.php",
          data: th.serialize(),
          success: function (data) {
              th.reset;  
              setTimeout(function () {
                pop.fadeToggle(enableScroll)
              }, 400);
          }  
        });
      }
  });
});*/

//Форма      
  $('.popup--container__select').click(function(e){

    e.preventDefault();
    
    let th = $('form')
    let pop = $('.popup--container')
    
    $.ajax({
    type: "POST",
    url: "mail.php",
    data: th.serialize(),
    success: function (data) {
        th.reset;  
        setTimeout(function () {
          pop.fadeToggle(enableScroll)
        }, 400);
    }
    });
});  