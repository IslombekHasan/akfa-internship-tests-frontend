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
  
  let educations = [{
    entry_date: 'YYYY-MM-DD',
    end_date: 'YYYY-MM-DD',
    institution: 'string',
    speciality: 'string',
    course: 'string'  
  }]
  
  let language_skills = [{
    language: 'string',
    skill: 'string'
  }]

  for (let [key, value] of formData.entries()) {
    console.log(key, ':', value);

  }

  formData.append('educations', educations)
  formData.append('language_skills', language_skills)

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

$('.add-education').click(function (e) {
  e.preventDefault();
  var lastRepeatingGroup = $('.edu-inputs').last();
  var cloned = lastRepeatingGroup.clone(true)
  cloned.insertAfter(lastRepeatingGroup);
  resetAttributeNames(cloned)
});