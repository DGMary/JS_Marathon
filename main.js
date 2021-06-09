const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const ATTACK = ['head', 'body', 'foot'];
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}

let player1 = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["gun"],
  attack: function(name){
    console.log(name + 'Fight...');
  },
  changeHP,
  elHP,
  renderHP,
};

let player2 = {
  player: 2,
  name: "Kitana",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: ["gun1"],
  attack: function(name){
    console.log(name + 'Fight...');
  },
  changeHP,
  elHP,
  renderHP,
};


function createElement(tag, className){
  const $tag = document.createElement(tag);

  if(className) {
    $tag.classList.add(className);
  } 

  return $tag;
}

function createPlayer(playerObj){
  const $player = createElement('div', 'player'+playerObj.player),
        $progressbar  = createElement('div', 'progressbar'),
        $character  = createElement('div', 'character'),
        $life   = createElement('div', 'life'),
        $name   = createElement('div', 'name'),
        $img = createElement('img');

      $img.src = playerObj.img;
      $life.style.width = playerObj.hp+'%';
      $name.innerText = playerObj.name;

      $player.appendChild($progressbar);
      $player.appendChild($character);

      $progressbar.appendChild($life);
      $progressbar.appendChild($name);

      $character.appendChild($img);    
      
      return $player;
}
function changeHP(num){
  this.elHP();
  this.hp -= num; 

  if(this.hp <= 0) {
    this.hp = 0; 
  } 
  
  this.renderHP();
}

function elHP(){
  const $playerLife = document.querySelector('.player'+ this.player +' .life');
  return $playerLife;
}

function renderHP(){
  return (document.querySelector('.player'+ this.player +' .life').style.width = this.hp + '%');
}

function getRandom(num) {
  const result = Math.ceil(Math.random() * num);
  return result;  
}

function playerWins(name) {
  const $loseTitle = createElement('div', 'loseTitle');
  if(name) {
    $loseTitle.innerText = name + ' wins';
  } else {
    $loseTitle.innerText =  'drow';
  }

  return $loseTitle;
}


function  createReloadButton(){
  const $reloadButtonDiv = createElement('div', 'reloadWrap');  
  const $reloadButton = createElement('button', 'button');
  $reloadButton.innerText ="Reload";

  $reloadButtonDiv.appendChild($reloadButton);
  $arenas.appendChild($reloadButtonDiv);

  $reloadButton.addEventListener('click' , function(){
    window.location.reload();
  })
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack(){
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];
  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  }
}

$formFight.addEventListener('submit', function(e){
  e.preventDefault();

  const enemy = enemyAttack();
  const attack = {};

  for (let item of $formFight) {
    if(item.checked && item.name  === 'hit') {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }
    if(item.checked && item.name == 'defence') {
      attack.defence = item.value;
    }

    item.checked = false;
  }

  if(enemy.hit != attack.defence){
      player1.changeHP(attack.value);
  }
  if(attack.hit != enemy.defence){
    player2.changeHP(enemy.value);
  }


  if(player1.hp === 0 || player2.hp === 0) {
    $fightButton.disabled = true;
    createReloadButton();
  }

  if(player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name));
  } else if(player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
  }

})