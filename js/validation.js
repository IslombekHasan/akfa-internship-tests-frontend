var date = new Date();
var currentyear = date.getFullYear();

$('#from').yearselect({
  start: 2000,
  order: 'desc',
  end: currentyear
});
$('#to').yearselect({
  start: 2000,
  order: 'desc',
  end: currentyear
});
setTimeout(function () {
  var x, i, j, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  document.addEventListener("click", closeAllSelect);
}, 100);

/* If the user clicks anywhere outside the select box,
then close all select boxes: */


var element = document.getElementById('number');
var maskOptions = {
  mask: '+{998}(90) 000-00-00'
};
var mask = IMask(element, maskOptions);



$('#info-form').submit(function () {

  event.preventDefault();
  var required_fields = document.getElementsByClassName('required');
  var error = false;

  for (let i = 0; i < required_fields.length; i++) {
    if (required_fields[i].value.length == 0) {
      error = true;
      required_fields[i].parentElement.classList.add('warning');
    }
  }

  // if (!error) {
  let formData = new FormData(document.getElementById('info-form'));

  let educations = []
  let language_skills = [{
    language: 'string',
    skill: 'string'
  }]

  let index = 0
  for (let [key, value] of formData.entries()) {
    console.log(key, ':', value);

    let institution = key.match(/institution\d*/)
    if (institution) {
      index = parseInt(institution[0].slice(-1)) || 0
      if (!educations[index]) educations[index] = {}
      educations[index].institution = value
    }

    if (key.match(/from\d*/)) educations[index].entry_date = `${value}-01-01`
    if (key.match(/to\d*/)) educations[index].end_date = `${value}-01-01`
    if (key.match(/speciality\d*/)) educations[index].speciality = value
    if (key.match(/course\d*/)) educations[index].course = value
  }

  formData.append('educations', educations);
  formData.append('language_skills', language_skills);

  // }

  (function () {
    setTimeout(function () {
      $('.warning').removeClass('warning');
    }, 5000)
  })();
});


var $fileInput = $('#file');
var $droparea = $('#dragZone');

// highlight drag area
$fileInput.on('dragenter focus click', function () {
  $droparea.addClass('is-active');
});

// back to normal state
$fileInput.on('dragleave blur drop', function () {
  $droparea.removeClass('is-active');
});

// change inner text
$fileInput.on('change', function () {
  var filesCount = $(this)[0].files.length;
  var $valueHeader = $('#value-header');
  var $textContainer = $('#file-value');

  if (filesCount === 1) {
    // if single file is selected, show file name
    var fileName = $(this).val().split('\\').pop();
    $valueHeader.text('Выбранный вами файл:')
    $textContainer.text(fileName);
  } else {
    // otherwise show number of files
    $textContainer.text(filesCount + ' files selected');
  }
});

var attrs = ['for', 'id', 'name'];

function resetAttributeNames(section) {
  var tags = section.find('input, label'),
    idx = section.index();
  tags.each(function () {
    var $this = $(this);
    $.each(attrs, function (i, attr) {
      var attr_val = $this.attr(attr);
      if (attr_val) {
        $this.attr(attr, attr_val.replace(/_\d+$/, '_' + (idx + 1)))
      }
    })
  })
}

var suffix = 0;

$(".add-education").click(function (e) {
  e.preventDefault();

  var lastRepeatingGroup = $(".edu-inputs").last();
  var cloned = lastRepeatingGroup.clone(true);

  suffix++;

  cloned[0].querySelectorAll("input, select").forEach(input => {
    let id = input.getAttribute("id");
    let name = input.getAttribute("name");
    id ? input.setAttribute("id", id + suffix) : "";
    name ? input.setAttribute("name", name + suffix) : "";
  });

  cloned.insertAfter(lastRepeatingGroup);
  resetAttributeNames(cloned);
});

langamount = 3;
$(".add-lang").click(function(e) {
  e.preventDefault();

  var lastRepeatingGroup = $(".language-table");
  
  langamount++;

  lastRepeatingGroup.append(`
  <tr>
    <th><input class="input required no-padding" placeholder="Название языка" name="lang-`+ langamount + `"></th>
    <td>
        <input type="radio" class="language-radio" name="lang-`+ langamount + `" id="eng-starter" value="starter" checked>
        <label for="eng-starter">Начальный</label> 
    </td>
    <td>
        <input type="radio" class="language-radio" name="lang-`+ langamount + `" id="eng-intermediate" value="intermediate">
        <label for="eng-intermediate">Средний</label> 
    </td>
    <td>
        <input type="radio" class="language-radio" name="lang-`+ langamount + `" id="eng-advanced" value="advanced">
        <label for="eng-advanced">Отличный</label> 
    </td>
  </tr>
  `);
  // cloned.insertAfter(lastRepeatingGroup);

});

$('.remove').click(function(e) {
  e.preventDefault();
  $(this).parent().parent().parent().remove();
  suffix--;
});


$('#language-choice').iziModal({
  headerColor: 'rgba(0, 0, 0, .05)',
  width: 671,
  // timeout: 10000,
  zindex: 9999999,
  background: '#f4f4f4',
  overlayClose: false,
  transitionIn: 'fadeIn',
  transitionOut: 'fadeOut',
  overlayColor: 'rgba(0,0,0,.5)',
});

/* use this when you submit form to the server 
$('#language-choice').iziModal('open');

*/