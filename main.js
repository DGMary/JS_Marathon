let playerFirst = {
  name: "Scorpion",
  hp: 10,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["gun"],
  attack: function(){
    console.log(this.name + 'Fight...');
  }
};
let playerSecond = {
  name: "Kitana",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: ["gun1"],
  attack: function(){
    console.log(this.name + 'Fight...');
  }
}
function createPlayer(player, name, hp){
  const $arena = document.querySelector('.arenas');
  const $player = document.createElement('div'),
        $progressbar  = document.createElement('div'),
        $character  = document.createElement('div'),
        $life   = document.createElement('div'),
        $name   = document.createElement('div'),
        $img = document.createElement('img');


      $player.classList.add(player);
      $progressbar.classList.add('progressbar');  
      $character.classList.add('character');  
      $life.classList.add('life');  
      $name.classList.add('name');
      $img.src = "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif";
      $life.style.width = '100%';
      $life.innerText = hp;
      $name.innerText = name;

      $player.appendChild($progressbar);
      $player.appendChild($character);
      $progressbar.appendChild($life);
      $progressbar.appendChild($name);
      $character.appendChild($img);
      $arena.appendChild($player);

}
createPlayer('player1', 'SCORPION', 50);
createPlayer('player2', 'SUB-ZERO', 80);