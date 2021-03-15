class Form{
    constructor(){
   
       this.input = createInput("Name");
       this.button = createButton('Play');
       this.greeting = createElement('h2');
       this.greeting1 = createElement('h3');
       this.greeting2 = createElement('h3');
       this.title = createElement('h2');
       this.title1 = createElement('h1');

       this.reset = createButton('Reset');
     
    }
    hide() {
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
        this.title.hide();

    }
    display() {
        this.title.html(" Trivia in the Sky");
        this.title.position(400, -50);
        this.title.style('font-size', '70px');
        this.title.style('font-family','cursive')
        this.title.style('color', 'darkblue');
        this.input.position(700,400);
        this.input.style('width', '200px');
        this.input.style('height', '20px');
        this.input.style('background', 'lavender');
        this.button.position(700,500);
        this.button.style('width', '200px');
        this.button.style('height', '40px');
        this.button.style('background', 'lightblue');
        this.reset.position(displayWidth-200, 840);
        this.reset.style('width', '100px');
        this.reset.style('height', '30px');
        this.reset.style('background', 'lightblue');
        

        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount += 1;
            player.index = playerCount;
            player.playerGameState=1

            player.update();
            player.updateCount(playerCount);
            this.greeting.html("Hello " + player.name)
            this.greeting.position(400,250);
            this.greeting.style('color', 'black');
            this.greeting.style('font-size', '100px');
            count=1
        });

        this.reset.mousePressed(() => {
            player.updateCount(0);
            game.update(0);
            player.playerGameState=0

       
        });

    }

    display1(){
        
        this.title1.position(400, -50);
        this.title1.style('font-size', '70px');
        this.title1.style('font-family','cursive')
        this.title1.style('color', 'darkblue');

    }

   
}