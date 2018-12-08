////-------------------start Tri code---------------///////////////
/**
 * return an array of accepted answer IDs
 * @param {a string} queryString 
 */
const getResults = function(queryString,language) {
  queryString = queryString.toLowerCase() + ' ' + language;
  const encodedQueryString = encodeURI(queryString);
  const numberOfResults = 3;
  const queryURL = `https://api.stackexchange.com/2.2/search/advanced?pagesize=${numberOfResults}&order=desc&sort=relevance&accepted=True&title=${encodedQueryString}&site=stackoverflow`;
  $.get(queryURL).then(results => {
    const answerList = results.items.map(e => e.accepted_answer_id);
    getAnswerBody(answerList);
  });
};

/**
 * return an array of answer bodies
 * @param {an array of answer IDs} answerList
 */
const getAnswerBody = function(answerList) {
  let encodedQueryString = "";
  answerList.forEach(e => {
    encodedQueryString += `${e.toString()}%3B`;
  });
  encodedQueryString = encodedQueryString.slice(0, -3);

    const queryURL = `https://api.stackexchange.com/2.2/answers/${encodedQueryString}?&site=stackoverflow&filter=withbody`;
    $.get(queryURL).then(results => {
        const answerBodyList = results.items.map(e => e.body);
        renderResults(answerBodyList);
    });
};

/**
 * render a list of answer bodies to code-suggestions pane
 * @param {a list of answer bodies} answerBodyList
 */
const renderResults = function(answerBodyList){
    answerBodyList.forEach(e => {
        $('#content').append(`<div class='answer'>${e}</div>`);
    });
    $('code').wrap("<div class='code'></div>");
    $('.code').append(`<span class='tooltiptext'>Click to place code in editor</span>`);
};


$(document).on('click', 'code', function(){
  $('.code-editor').append(`${$(this).text()}<br />`);
});
////-------------------end Tri code---------------///////////////

const addCode = function(event) {
  event.preventDefault();
  $("#response").empty();
  $.get(`/api/search`, function(data) {
    $("#response").text(data.excerpt);
  });
};
$("#response").on("click", addCode);

$("#response").on("click", function() {
  $("#response").addClass("active");
});

//functions for the drop-down menu
var x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
      /*when an item is clicked, update the original select box,
        and the selected item:*/
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
  a.addEventListener("click", function(e) {
    /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x,
    y,
    i,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
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
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);
