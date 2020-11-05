



const startBtn = document.getElementById("start-btn")
function startGame(){
  document.getElementById("start-btn").disabled = true;
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffleArray(pokemon)
  cardsArray = [];
  for (let i = 0; i < 12; i++) {
  cardsArray.push({
  name: `${pokemon[i]['name']}`,
  img: `img/pokemon/${pokemon[i]['name']}.png`
            });
          }
         
      console.log(cardsArray)
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
game.innerHTML = "";
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
let score = 0
let moves = 0
let movesSpan = document.getElementById("moves")
movesSpan.innerText = moves
let scoreSpan = document.getElementById("score")
    scoreSpan.innerText = score
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
      ++moves
      movesSpan.innerText = moves
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        score++
        scoreSpan.innerText = score
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});
var oneMinute = 60 * 1,
display = document.querySelector('#time');
startTimer(oneMinute, display);
function startTimer(duration, display) {
    var timer = duration, seconds;
    let bob = setInterval(function () {
        
        seconds = parseInt(timer % 60, 10);
        
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = seconds;
        if (--timer < 0) {
            timer = duration;
        }
        if (timer === 0){
          endGame(score)
          display.innerText = "TIMES UP"
          clearInterval(bob)
         
        }
    }, 1000);
  }
   
 function endGame(score) {
  $.get("/api/user_data", function(data) {
    let game = document.getElementById("game");
    game.innerHTML = "";
    const card = document.createElement('h2');
    card.innerText = "GAME OVER"
    card.classList.add('endgame');
    card.classList.add('flash');
    game.appendChild(card)
    document.getElementById("start-btn").disabled = false;
    if(data.hiscore === null){
      updatescore(score)
      let hstext = document.createElement('h2');
      hstext.innerText = "NEW HISCORE!!"
      hstext.classList.add('endgame');
      hstext.classList.add('flash');
      game.appendChild(hstext)
    }
    else if (parseInt(score) > parseInt(data.hiscore)){
      updatescore(score)
      let hstext = document.createElement('h2');
      hstext.innerText = "NEW HISCORE!!"
      hstext.classList.add('endgame');
      hstext.classList.add('flash');
      game.appendChild(hstext)
    }else{
      
    }
    })
   };
}
function updatescore(score){
  console.log("YOU HIT ME")
  $.ajax({
    method: "PUT",
    url: "/api/user_data",
    data: {hiscore: score}
  }).then(function(res){
     console.log(res)
     game.empty()
   });
}

startBtn.addEventListener('click', () =>{startGame()})
   