import { Math, Scene } from "phaser";
import GameOver from "./GameOver";


export default class Level extends Scene {

    
     /** @type {Phaser.Physics.Arcade.Sprite} */
     player;

     /** @type {Phaser.Physics.Arcade.StaticGroup} */
     obstaculos1;

     /** @type {Phaser.Physics.Arcade.StaticGroup} */
     obstaculos2;

      /** @type {Phaser.Physics.Arcade.StaticGroup} */
      linhas;

     /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
     cursors;

     /** @type {Phaser.Physics.Arcade.Sprite} */
     chao1;

     /** @type {Phaser.Physics.Arcade.Group} */
     gemas;

     points;

      /** @type {Phaser.GameObjects.Text} */
     pointsText;

     

    constructor() {
       
        super('level');
    }

    preload() {
        this.load.image('background', 'assets/espaço.png' );
        this.load.image('chao', 'assets/chão.png');
        this.load.image('player', 'assets/alienPink.png');
        this.load.image('playerDead', 'assets/alienPink2.png')
        this.load.image('obstaculo1', 'assets/cano.png');
        this.load.image('obstaculo2', 'assets/cano2.png');
        this.load.image('linha', 'assets/linha.jpg');

    }

    create() {

        this.points = 0

        this.add.image(400, 270, 'background')
        .setScrollFactor(0,0);

        this.obstaculos1 = this.physics.add.staticGroup();

        this.obstaculos2 = this.physics.add.staticGroup();

        this.linhas = this.physics.add.staticGroup();


        for(let i = 0; i < 5; i++) {
            const x = 150 + (260 * i);
            const y = Math.Between(150,  250);

        
            const obstaculo1 = this.obstaculos1.create(x, y, 'obstaculo1');
            obstaculo1.setScale(0.7);
            obstaculo1.setOrigin(0, 0);
            obstaculo1.body.updateFromGameObject();
        
    
            const obstaculo2 = this.obstaculos2.create(x, y-200, 'obstaculo2');
            obstaculo2.setScale(0.7);
            obstaculo2.setOrigin(0, 0.75);
            obstaculo2.body.updateFromGameObject();

            const linha = this.linhas.create(x+30 , y, 'linha');
            linha.setScale(1);
            linha.setOrigin(1, 1);
            linha.body.updateFromGameObject();
            linha.setVisible(false);
        

        
          
        }


       this.chao1 = this.physics.add.staticGroup();


       for(let i = 0; i < 10; i++) {

        const x = 1 + (800 * i);
        const y = Math.Between(30, 30);

        const chao = this.chao1.create(x , y, 'chao')
        chao.setScale(0.2);
        chao.setOrigin(0.5, -6.7);
        chao.body.updateFromGameObject();
    }
    

       this.player = this.physics.add.image(-200, 200, 'player')
       .setScale(0.25);


       this.cursors = this.input.keyboard.createCursorKeys();


       this.cameras.main.startFollow(this.player);
       this.cameras.main.setDeadzone(undefined, this.scale.x-200);
       this.cameras.main.setLerp(1,0);



       this.physics.add.collider(this.player, this.chao1, this.gameOver, null, this);
       this.physics.add.collider(this.player, this.obstaculos1, this.gameOver, null, this);
       this.physics.add.collider(this.player, this.obstaculos2, this.gameOver, null, this);
    

       this.physics.add.overlap(this.player, this.linhas, this.handleCollectLinha, undefined, this); // só encosta

     

       const style = { color: '#ffff', frontSize: 24};
       this.pointsText = this.add.text(240, 10, 'Pontos: 0', style);
       this.pointsText.setScrollFactor(0);
       this.pointsText.setOrigin(0.5, 0);
       

    } 

    update() {

        if (this.cursors.space.isDown)
    {
         this.player.setVelocityX(70);
         this.player.setVelocityY(-90);
         this.player.setTexture('player');
    } else {
        this.player.setTexture('playerDead')
    }

    this.obstaculos1.children.iterate(child => {
        /** @type {Phaser.Physics.Arcade.Sprite} */
        const obstaculo1 = child;

        
        const scrollX = this.cameras.main.scrollX;
        if (obstaculo1.x + 480 <= scrollX) {
            obstaculo1.x = scrollX + 850;
            obstaculo1.y + 150 <= Math.Between(150,250);
            obstaculo1.body.updateFromGameObject();
    
        
        }
    })

    this.obstaculos2.children.iterate(child => {
        /** @type {Phaser.Physics.Arcade.Sprite} */
        const obstaculo2 = child; 

        
        const scrollX = this.cameras.main.scrollX;
        if (obstaculo2.x + 480 <= scrollX ) {
            obstaculo2.x = scrollX + 850;
            obstaculo2.y - 150 <= Math.Between(150,250);
            obstaculo2.body.updateFromGameObject( );
            

            
        }
    })

    this.linhas.children.iterate(child => {
        /** @type {Phaser.Physics.Arcade.Sprite} */
        const linha = child;

        
        const scrollX = this.cameras.main.scrollX;
        if (linha.x + 1000 <= scrollX) {
            linha.x = scrollX + 850;
            linha.y + 150 <= Math.Between(150,250);
            linha.body.updateFromGameObject();
            
            this.handleCollectLinha( this.player, linha);

        }
    })



}
  

handleCollectLinha(player, linha) {
    this.linhas.killAndHide(linha); // desabilita e tira da tela

    this.physics.world.disableBody(linha.body);

    this.points++; 
    this.pointsText.text = 'Pontos: ' + this.points;
}
 

gameOver() {
        this.scene.start('game-over');
}

}