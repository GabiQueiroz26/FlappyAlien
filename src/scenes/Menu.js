import { Scene } from "phaser";

export default class Menu extends Scene {

    constructor() {
        super('menu-principal');
    }

    preload() {
        this.load.image('background2', 'assets/fundo2.jpg' );
        this.load.image('galaxia', 'assets/galaxia1.jpg' );
    }


    create() {
        let width = this.scale.width;
        let height = this.scale.height;

        this.add.image(400, 290, 'background2')
        .setScale(2);

        this.add.image(920, 620, 'gato')
        .setOrigin(1);

    

        this.add.text(width/2, height/6, 'FLappy Alien', {
            fontSize: 48, color: '#ffff'
        }).setOrigin(0.5);

        this.add.text(width/2, height/1.7, 'Aperte qualquer tecla para JOGAR', {
            fontSize: 18, color: '#ffff'
        }).setOrigin(0.5);




        this.input.keyboard.once('keydown', () => {
            this.scene.start('level');
        })
    }

}


