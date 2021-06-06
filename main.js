const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

let player1 = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["gun"],
  attack: function(name){
    console.log(name + 'Fight...');
  }
};
let player2 = {
  player: 2,
  name: "Kitana",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: ["gun1"],
  attack: function(name){
    console.log(name + 'Fight...');
  }
}

function createElement(tag, className){
  const $tag = document.createElement(tag);

  if(className) {
    $tag.classList.add(className);
  } 

  return $tag;
}

function createPlayer( playerObj){
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
function changeHP(player){
  const $playerLife = document.querySelector('.player'+ player.player +' .life');

  if(player.hp > 0) {
    player.hp -=rundomiser(20);    
  } else {    
    !($arenas.appendChild(playerLose(player.name))); 
    console.log(player.hp);
    player.hp = 0; 
    $randomButton.disabled = true;
  } 

  $playerLife.style.width = player.hp + '%';
  console.log(player.hp);
}

function rundomiser(num) {
  const result = Math.ceil(Math.random() * num);
  return result;  
}

function playerLose(name) {
  const $loseTitle = createElement('div', 'loseTitle');
  $loseTitle.innerText = name + ' lose';

  return $loseTitle;
}

$randomButton.addEventListener('click' , function() {
  changeHP(player1);
  changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));