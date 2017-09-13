// ===== ===== =====
// SETUP DATA
// ===== ===== =====
//  align items - make one of the divs have a large font-size
// flex-wrap - add extra width to the child divs

var properties = {
  'flex-direction':{
    description: 'Defines the direction flex items are placed in the flex container (either horizontal rows or vertical columns)',
    options: ['row', 'row-reverse', 'column', 'column-reverse']
  },
  'flex-wrap': {
    description: 'By default, flex items will all try to fit onto one line, you can change this and allow the items to wrap with this property',
    options: ['no wrap', 'wrap', 'wrap-reverse'],
    child_class: 'wide'
  },
  'justify-content  ': {
    description: 'Defines alignment along the main access',
    options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']
  },
  'align-items': {
    description: 'defines the default behaviour for how flex items are laid out along the cross axis on the current line',
    options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
    child_class: 'vary-font-sizes'
   },
  'align-content': {
    description: 'Aligns a flex containers lines within when there is extra space in the cross axis (only works when more than one line of flex items). Requires flex-wrap',
    options: ['flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around'],
    child_class: 'wide',
    parent_class: 'wrapped'
  }
}


var setProperty, setValue;

// ==========
// HELPERS
// ==========
function showValueOptions(propertyName) {
  var values = properties[propertyName].options;
  $('.value-options').html('');
  values.forEach(function(val){
    $('.value-options').append(createListItem(val));
  })
}

function createListItem(valueName) {
  return '<li>' + valueName + '</li>'
}

function addPropertyToParent() {
  removeChildClass();
  removeParentClass();
  $('.parent').attr('style', '');
  $('.parent').css(setProperty, setValue);
  prop = properties[setProperty]
  if (prop.child_class) {
    $('.parent div').addClass(prop.child_class)
  }

  if (prop.parent_class) {
    $('.parent').addClass(prop.parent_class)
  }
  updateCodeSnippet();
}

function setPropertySelected(ele) {
  $('.parent-properties li').removeClass('selected')
  $(ele).addClass('selected')
  setProperty = ele.id
}


function setValueSelected(ele) {
  $('.value-options li').removeClass('selected')
  $(ele).addClass('selected')
  setValue = $(ele).html();
}

function removeParentClass() {
  $('.parent').attr('class', 'parent');
}

function removeChildClass() {
  $('.parent div').attr('class', '')
}

function updateCodeSnippet() {
  var text = "\n.parent { \n &nbsp; &nbsp; display: flex; \n "
  text += '&nbsp; &nbsp; ' +setProperty + ': ' + setValue + ';'
  text += '\n}'
  $('.code-samples code').html(text);
//   $.getScript( "./pre.js", function( data, textStatus, jqxhr ) {
//   console.log( data ); // Data returned
//   console.log( textStatus ); // Success
//   console.log( jqxhr.status ); // 200
//   console.log( "Load was performed." );
// });
  (function(document, tag) {
      var scriptTag = document.createElement(tag), // create a script tag
          prismEle = document.getElementsByClassName('prismz')[0];
      scriptTag.src = './pre.js'; // set the source of the script to your script
      prismEle.parentNode.insertBefore(scriptTag, prismEle); // append the script to the DOM
  }(document, 'script'));
}

function updateDescription(description) {
  $('.description').html(description);
}

// ==========
// LISTENERS
// ==========
$(document).on('click', '.parent-properties li', function(ele) {
  showValueOptions(this.id);
  setPropertySelected(this);
})

$(document).on('click', '.value-options li', function() {
  setValueSelected(this);
  addPropertyToParent();
})
