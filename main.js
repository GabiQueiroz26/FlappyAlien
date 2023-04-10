import { AUTO, Game, Physics } from "phaser";
import Level from "./src/scenes/Level";
import Menu from  "./src/scenes/Menu";
import GameOver from "./src/scenes/GameOver";

const config = {
  width: 700, // largura
  height: 580, // altura
  type: AUTO, // renderizador 
  scene: [Menu, Level, GameOver],
  physics: {
    default: 'arcade',
    arcade: {
        gravity:{
            y: 200
        },
        debug: false
    }
  }
}

new Game(config);