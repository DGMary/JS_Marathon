import  {changeHP, elHP, renderHP}  from "./playerFunctions.js";

export const player1 = {
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

export const player2 = {
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
