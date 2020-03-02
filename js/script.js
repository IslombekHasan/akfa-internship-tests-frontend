$(function(){
    
    $('.video-icon').click( function () {
        event.preventDefault();
        $("#video").iziModal({
            history: false,
            zindex: 99999,
            iframe : true,
            iframeHeight: 600,
            width: 1000,
            fullscreen: true,
            headerColor: '#000000'
        });
        $("#video").iziModal('open');
    });
    
    
});

$(document).ready(function() {
  $('.test-wrapper').slick({
    dots: false,
    arrows: false,
    autoplay: false,
    infinite: false,
    speed: 300,
    draggable: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: false
  });

  

  function innercounts() {
    var total_slides = $('.slick-slide').length;
    var active_slides = $('.slick-active').length;

    $('#total-num').html(total_slides);
    $('#current-num').html(active_slides);
    var active_index = $('.slick-active').index();
    var current_indicator = ((active_index + 1)  / total_slides) * 100;
    
    $('#completed').css('width', current_indicator + '%');
  }

  innercounts();

  $('.answer-radio').click(function () {
    $('.test-wrapper').slick('slickNext');
    innercounts();
  });



  $('#thanks-modal').iziModal({
      headerColor: 'rgba(0, 0, 0, .05)',
      width: 671,
      // timeout: 10000,
      zindex: 9999999,
      transitionIn: 'fadeIn',
      transitionOut: 'fadeOut',
      overlayColor: 'rgba(0,0,0,.5)',    
      onClosed: function(){
        window.location.href = "index.html";
      },  
      attached: 'bottom' 
  });
  
  $('#finish-test').click(function () {
    $('#thanks-modal').iziModal('open');
  })
  
});


