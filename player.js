import {changeHP, elHP, renderHP , attack} from "./playerFunctions.js";

const player1 = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",  
  elHP,
  changeHP,
  renderHP,
  attack,
};

const player2 = {
  player: 2,
  name: "Kitana",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  changeHP,
  elHP,
  renderHP,
  attack,
};

export {player1, player2};
