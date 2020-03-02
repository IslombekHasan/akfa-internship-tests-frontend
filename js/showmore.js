$('.showmore').click(function () {
    displayMore();
})
var limit = 6;

window.onload = displayMore();

function displayMore() {
    var vacancy = document.getElementsByClassName('vacancy');

    if (vacancy.length < limit) {
        $('.showmore').hide(); 
    }

    for (let i = 0; i < limit; i++) {
        vacancy[i].classList.add('is-active');   
    }
    limit = limit + 6;
}