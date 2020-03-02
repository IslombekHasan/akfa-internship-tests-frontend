$("g").mouseenter(function() {
    // .position() uses position relative to the offset parent, 
    // so it supports position: relative parent elements
    var pos = $(this).position();

    // .outerWidth() takes into account border and padding.
    var width = $(this).outerWidth();
    var boxwidth = $('.adv-box').outerWidth();
    var boximg = $('.adv-box img');
    var boxtext = $('.adv-box p');
    //show the menu directly over the placeholder
    boximg.attr('src', $(this).attr('data-img'));
    boxtext.html($(this).attr('data-text'));
    if( screen.width < 600) {
        if ($(this).attr('id')== '4') {
            
            $(".adv-box").css({
                position: "absolute",
                top: (pos.top - 5) + "px",
                left: (pos.left + width - (boxwidth - 150 ) ) + "px"
            }).show();
        } else {
            $(".adv-box").css({
                position: "absolute",
                top: (pos.top - 5) + "px",
                left: (pos.left + width - (boxwidth -40 ) ) + "px"
            }).show();
        }
    } else {
        $(".adv-box").css({
            position: "absolute",
            top: (pos.top - 5) + "px",
            left: (pos.left + width - (boxwidth -40 ) ) + "px"
        }).show();
    }
    


});
$("#svg").mouseleave(function () {
    $(".adv-box").hide();
})

$(function(){
    
    $('.open-consult').click( function () {
        event.preventDefault();
        $("#consultation").iziModal({
            history: false,
            zindex: 99999,
            width: 671,
            fullscreen: true,
            headerColor: '#000000'
        });
        $("#consultation").iziModal('open');
    });

});


$('#consultation').submit(function () {
    event.preventDefault();
    var required_fields = document.getElementsByClassName('required');
    var error = false;
    for (let i = 0; i < required_fields.length; i++) {
      if (required_fields[i].value.length == 0) {
        required_fields[i].parentElement.classList.add('warning');
        error = true;
      } else if (error == false) {
        $.ajax({
            type: "POST",
            url: 'index.html',
            dataType: "json",
            data: $("#consultation").serialize(),
            contentType: 'application/json;charset=UTF-8',
            success: function(data) {
                $("#consultation").iziModal('close');
            }
        })
      }
      
    }
  
    (function(){
      setTimeout(function () {
        $('.warning').removeClass('warning');
      }, 5000)
    })();
});

function closeModal() {
    $("#consultation").iziModal('close');
}