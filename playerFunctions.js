function changeHP(num){
    this.elHP();
    this.hp -= num; 
  
    if(this.hp <= 0) {
      this.hp = 0; 
    } 
  }
  
  function elHP(){
    const $playerLife = document.querySelector('.player'+ this.player +' .life');
    return $playerLife;
  }
  
  function renderHP(){
    return (document.querySelector('.player'+ this.player +' .life').style.width = this.hp + '%');
  }

export {changeHP, elHP, renderHP};

