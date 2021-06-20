import { createElement } from '../utils/index.js'

class Player {
    constructor(props) {
        this.name = props.name;
        this.hp = props.hp;
        this. img = props.img;
        this. player = props.player;
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector;
    }

    changeHP = (num) => {
        this.elHP();
        this.hp -= num; 
      
        if(this.hp <= 0) {
          this.hp = 0; 
        } 
      }
      
    elHP = () => {
        return document.querySelector(`${this.selector} .life`);
      }
      
    renderHP = () => {
        return (document.querySelector('.player'+ this.player +' .life').style.width = this.hp + '%');
    }

    createPlayer = () => {
        const $player = createElement('div', this.selector),
            $progressbar  = createElement('div', 'progressbar'),
            $character  = createElement('div', 'character'),
            $life   = createElement('div', 'life'),
            $name   = createElement('div', 'name'),
            $img = createElement('img');
    
        $img.src = this.img;
        $life.style.width = this.hp+'%';
        $name.innerText = this.name;
    
        $player.appendChild($progressbar);
        $player.appendChild($character);
    
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
    
        $character.appendChild($img);  
        
        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($player);        
        return $player;
    }
}

export default Player;