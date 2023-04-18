'use strict';

let arrayOfPairs = [
  ['Hello', 'World'],
  ['Happy', 'Coding']
];

const addButton = document.querySelector('.button-add');

addButton.addEventListener('click', addPair);


const newPair = document.querySelector('.new-pair');
const listOfPairs = document.querySelector('.list-of-pairs');
const error = document.querySelector('.error');

newPair.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addPair();
  }
});

function addPair() {
  const alphnumeric = /[a-zA-Z0-9]+=[a-zA-Z0-9]/;
  
  error.innerHTML = '';

  if (newPair.value.match(alphnumeric)) {
    const inputPair = newPair.value.split('=');
    
    arrayOfPairs.push([inputPair[0], inputPair[1]]);

  console.log(arrayOfPairs)
    listOfPairs.insertAdjacentHTML('beforeend', 
      `<li class="pair">
        ${newPair.value}
      </li>`
    );

  } else {
    error.innerHTML = 
      `Please, check your syntax. 
      The correct one is <i> Name = Value </i>`;
  }

  newPair.value = '';
}

function updateList() {
  while (listOfPairs.hasChildNodes()) {
    listOfPairs.removeChild(listOfPairs.childNodes[0]);
  }

  for (let i = 0; i < arrayOfPairs.length; i++) {
    listOfPairs.insertAdjacentHTML('beforeend', 
      `<li class="pair">
        ${arrayOfPairs[i][0]}=${arrayOfPairs[i][1]}
      </li>`
    );
  }
}


const sortNameButton = document.querySelector('.button-sort-name');

sortNameButton.addEventListener('click', () => {
  arrayOfPairs.sort((a, b) => a[0].localeCompare(b[0]));

  updateList();
});


const sortValueButton = document.querySelector('.button-sort-value');

sortValueButton.addEventListener('click', () => {
  arrayOfPairs.sort((a, b) => a[1].localeCompare(b[1]));
  
  updateList();
});

listOfPairs.addEventListener('click', (event) => {
  const pairClassList = event.target.classList;

  if(pairClassList.contains('pair')) {

    if(pairClassList.contains('highlight')) {
      pairClassList.remove('highlight');
    } else {
      pairClassList.add('highlight');
    }
    
  }
});


const deleteButton = document.querySelector('.button-delete');

deleteButton.addEventListener('click', () => {
  const highlightedPair = document.querySelectorAll('.highlight');

  for (let i = 0; i < highlightedPair.length; i++) {
    const currentPair = highlightedPair[i].innerText;
    const index = arrayOfPairs.findIndex(
      pair => currentPair === `${pair[0]}=${pair[1]}`
    );

    arrayOfPairs.splice(index, 1);
    console.log(arrayOfPairs)
    listOfPairs.removeChild(highlightedPair[i]);
  }
});

const xmlButton = document.querySelector('.button-xml');

xmlButton.addEventListener('click', () => {
  const myWindow = window.open("", "", "width=200,height=100");

  for (const pair of arrayOfPairs) {
    myWindow.document.body.textContent += 
    `<${pair[0]}>${pair[1]}</${pair[0]}>
    \n`;
  }
});

