import { player1, player2 } from "./player.js";
import  random  from "./utils.js";

const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes(); 
const time = `${hours}:${minutes}`;

const ATTACK = ['head', 'body', 'foot'];
const HIT = {head: 30, body: 25, foot: 20};
const {head, body, foot} = HIT;
const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
      'Результат удара [playerWins]: [playerLose] - труп',
      '[playerLose] погиб от удара бойца [playerWins]',
      'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
      '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
      '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
      '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
      '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
      '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
      '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
      '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
      '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
      '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
      '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
      '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
      '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
      '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
      '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
      '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
      '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
      '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
      '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
      '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
      '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
      '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
      '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
      '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
      '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
      '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
  ],
  draw: 'Ничья - это тоже победа!'
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



const playerWins = (name) => {
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

const enemyAttack = (hit = ATTACK[random(3) - 1], defence = ATTACK[random(3) - 1]) => {
  return {
    value: random(HIT[hit]),
    hit,
    defence,
  }
}

function playerAttack() {
  const attack = {};

  for (let item of $formFight) {
    if (item.checked && item.name  === 'hit') {
        attack.value = random(HIT[item.value]);
        attack.hit = item.value;
    }

    if (item.checked && item.name == 'defence') {
        attack.defence = item.value;
    }

    item.checked = false;
  }

  return attack;
}

function showResult() {
  if(player1.hp === 0 || player2.hp === 0) {
    $fightButton.disabled = true;
    createReloadButton();
    generateLogs('end', player2, player1);
  }

  if(player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name));
  } else if(player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
  }
}

generateLogs('start', player1, player2);

function generateLogs(type, player1, player2){
  let text = "";
  switch (type) {
    case 'start':
      text = logs[type].replace('[time]', time).replace('[player1]', player1.name).replace('[player2]', player2.name);
      break;
    case 'hit':
      text = `${time} - `+logs[type][random(logs[type].length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name) + `${player2.hp-100} [${player2.hp}/100]`;
      break;
    case 'defence':
      text = `${time} - `+logs[type][random(logs[type].length) - 1].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name);
      break;
    case 'end':
      text = logs[type][random(logs[type].length) - 1].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
      break;
    case 'draw':
      text = logs[type];
      break;
    default:
      text =  "Нет таких значений" ;
  }

  const el =  `<p>${text}</p>`;
  $chat.insertAdjacentHTML('afterbegin' , el);
}

$formFight.addEventListener('submit', function(e){
  e.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();


  if(enemy.hit !== player.defence){
      player1.changeHP(player.value);
      player1.renderHP();
      generateLogs('hit', player2, player1);
  } else {
    generateLogs('defence', player1, player2);
  }
  if(player.hit !== enemy.defence){
    player2.changeHP(enemy.value);
    player2.renderHP();
    generateLogs('hit', player1, player2);
  } else {
    generateLogs('defence', player2, player1);
  }



  showResult();

})