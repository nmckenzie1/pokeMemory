const cardsArray = [{
    'name': 'bulbasaur',
    'img': '../img/pokemon/bulbasaur.png'
}, {
    'name': 'ivysaur',
    'img': '../img/pokemon/ivysaur.png'
}, {
    'name': 'venusaur',
    'img': '../img/pokemon/venusaur.png'
}, {
    'name': 'charmander',
    'img': '../img/pokemon/charmander.png'
}, {
    'name': 'charmeleon',
    'img': '../img/pokemon/charmeleon.png'
}, {
    'name': 'charizard',
    'img': '../img/pokemon/charizard.png'
}, {
    'name': 'squirtle',
    'img': '../img/pokemon/squirtle.png'
}, {
    'name': 'wartortle',
    'img': '../img/pokemon/wartortle.png'
}, {
    'name': 'blastoise',
    'img': '../img/pokemon/blastoise.png'
}, {
    'name': 'caterpie',
    'img': '../img/pokemon/caterpie.png'
}, {
    'name': 'metapod',
    'img': '../img/pokemon/metapod.png'
}, {
    'name': 'butterfree',
    'img': '../img/pokemon/butterfree.png'
},];



const startBtn = document.getElementById("start-btn")
const gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});

function startTimer(duration, display) {
    var timer = duration, seconds;
    setInterval(function () {
        
        seconds = parseInt(timer % 60, 10);
        
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = seconds;
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
  }

  startBtn.onclick = function () {
    console.log("you clicked me bitch")
    var oneMinute = 60 * 1,
        display = document.querySelector('#time');
    startTimer(oneMinute, display);
  };
 
