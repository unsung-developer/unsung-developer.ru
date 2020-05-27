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
        $('.popup--container__form')[0].reset();
        $('.popup--container').fadeToggle(disableScroll);
      });
  
      $('.popup--container').click(function(event){
        if(event.target == this) {
          $(this).hide(enableScroll);
        }
      });

      $('.popup--container__button').click(function(){
        $('.popup--container').fadeToggle(enableScroll);
      });
//маска телефонной формы
  $('.popup--container__tel').inputmask({'mask' : '+7 999 999 99 99'});

$('.popup--container__select').click(function () {
  let name = $(this).parent().find('input[name="name"]').val();
  let email = $(this).parent().find('input[name="email"]').val();
  let phone = $(this).parent().find('input[name="tel"]').val();
  send(email, name, phone);

});

function emailValidate(email, name, phone) {
  if (email != '') {
      var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
      if (pattern.test(email)) {
          if (name == '')
              alert('Поле имя не должно быть пустым!');
          else if (phone != '') {
              return true;
          } else
              alert('Поле телефон не должно быть пустым!');
      } else {
          alert("Введите корректный e-mail!")
      }
  } else {
      alert('Поле e-mail не должно быть пустым!');
  }
  return false;
}

function send(email, name, phone) {
  if (emailValidate(email, name, phone)) {
      $.ajax({
          type: "POST",
          url: "mail.php",
          data: {email: email, name: name, phone: phone},
          success: function (req) {
              location.href = "http://unsung-developer.ru/";
          }
      });

  }
}