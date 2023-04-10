import { Scene } from "phaser";

export default class GameOver extends Scene {

    constructor() {
        super('game-over');
    }

    preload() {
        this.load.image('gato', 'assets/gato.png' );
        this.load.image('galaxia', 'assets/galaxia1.jpg' );
    }

    create() {
        let width = this.scale.width;
        let height = this.scale.height;

        this.add.image(690, 570, 'galaxia')
        .setOrigin(1);

        this.add.image(920, 620, 'gato')
        .setOrigin(1);

    

        this.add.text(width/2, height/3, 'GAME OVER', {
            fontSize: 48, color: '#ffff'
        }).setOrigin(0.5);

        this.add.text(width/2, height/2.3, 'ESPAÇO para jogar novamente', {
            fontSize: 20, color: '#ffff'
        }).setOrigin(0.5);



        // Jogar de novo
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('level');
        })

    
    }
}