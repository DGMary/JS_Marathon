import { getRandom, createElement, getTime } from '../utils/index.js';
import { HIT, LOGS, ATTACK } from '../constants/index.js';
import Player from '../Player/index.js';

class Game {
    constructor(props) {
      this.$arenas = document.querySelector('.arenas');
      this.$fightButton = document.querySelector('.button');
      this.$formFight = document.querySelector('.control');
      this.$chat = document.querySelector('.chat');

      this.player1 = new Player({
        player: 1,
        name: "Scorpion",
        hp: 100,
        img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
        rootSelector: 'arenas',
      });
        
      this.player2 = new Player({
        player: 2,
        name: "Kitana",
        hp: 100,
        img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
        rootSelector: 'arenas'
      });
    }

    playerWins = (name) => {
        const $loseTitle = createElement('div', 'loseTitle');
        if(name) {
          $loseTitle.innerText = name + ' wins';
        } else {
          $loseTitle.innerText =  'draw';
        }
      
        return $loseTitle;
      }
      
    createReloadButton = () => {
        const $reloadButtonDiv = createElement('div', 'reloadWrap');  
        const $reloadButton = createElement('button', 'button');
        $reloadButton.innerText ="Reload";
      
        $reloadButtonDiv.appendChild($reloadButton);
        this.$arenas.appendChild($reloadButtonDiv);
        $reloadButton.addEventListener('click' , function(){
          window.location.reload();
        })
      }
      
      enemyAttack = () => {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];
        return {
          value: getRandom(HIT[hit]),
          hit,
          defence,
        }
      };
      
      playerAttack = () => {
        const attack = {};
      
        for (let item of this.$formFight) {
          if (item.checked && item.name  === 'hit') {
              attack.value = getRandom(HIT[item.value]);
              attack.hit = item.value;
          }
      
          if (item.checked && item.name == 'defence') {
              attack.defence = item.value;
          }
      
          item.checked = false;
        }
      
        return attack;
      }
      
      showResult = () => {
        if(this.player1.hp === 0 || this.player2.hp === 0) {
          this.$fightButton.disabled = true;
          this.createReloadButton();
        }
      
        if(this.player1.hp === 0 && this.player1.hp < this.player2.hp) {
          this.$arenas.appendChild(this.playerWins(this.player2.name));
          this.generateLogs('end', this.player2, this.player1);
        } else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp) {
          this.$arenas.appendChild(this.playerWins(this.player1.name));
          this.generateLogs('end', this.player1, this.player2);
        } else if(this.player1.hp === 0 && this.player1.hp < this.player2.hp) {
          this.$arenas.appendChild(this.playerWins(this.player2.name));
          this.generateLogs('draw');      
        }
      }
      
      getTextLog = (type, playerName1, playerName2) => {
        switch (type) {
          case 'start':
            return LOGS[type]
            .replace('[player1]', playerName1)
            .replace('[player2]', playerName2)
            .replace('[time]', getTime());
            break;
          case 'hit':
            return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
              .replace('[playerKick]', playerName1)
              .replace('[playerDefence]', playerName2);
            break;
          case 'defence':
            return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
              .replace('[playerKick]', playerName1)
              .replace('[playerDefence]', playerName2);
            break;
          case 'end':
            return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
              .replace('[playerWins]', playerName1)
              .replace('[playerLose]', playerName2);
            break;
          case 'draw':
            return LOGS[type];
            break;
        }
      }
      
      generateLogs = (type, {name} = {}, { name: playerName2, hp } = {}, valueAttack) => {
        // const text = LOGS[type][0].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
        let text = this.getTextLog(type, name, playerName2);
        switch (type) {
          case 'hit': 
            text = `${getTime()} ${text} -${valueAttack} [${hp}/100]`;
            break;
          case 'defence':
          case 'end':
          case 'draw':
            text = `${getTime()} ${text}`;
            break;
        }
      
        console.log(text);
        const el =  `<p>${text}</p>`;
        this.$chat.insertAdjacentHTML('afterbegin' , el);
      }

      start = () => {
        this.player1.createPlayer();
        this.player2.createPlayer();
      
        this.generateLogs('start', this.player1, this.player2);

        this.$formFight.addEventListener('submit', (e) => {
          e.preventDefault();
          const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = this.enemyAttack();
          const {hit, defence, value} = this.playerAttack();
        
          if (hitEnemy !== defence) {
              this.player1.changeHP(value);
              this.player1.renderHP();
              this.generateLogs('hit', this.player2, this.player1, value);
          } else {
            this.generateLogs('defence', this.player2, this.player1);
          }
        
          if (hit !== defenceEnemy) {
            this.player2.changeHP(valueEnemy);
            this.player2.renderHP();
            this.generateLogs('hit', this.player1, this.player2, valueEnemy);
          } else {
            this.generateLogs('defence', this.player1, this.player2);
          }
        
          this.showResult();
        })
    };
}

export default Game;