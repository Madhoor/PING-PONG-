class Ball {
    constructor(){
        this.xPosition = innerWidth/2;
        this.yPosition = innerHeight/2;
        this.side = 50;
        this.xVel = 0;
        this.yVel = 0;
        // Math.random()*10+1
        // Math.random()*10+1

    }


    
    move(){
        
        this.xPosition += this.xVel;
        this.yPosition += this.yVel;
    }
    
    freeze(){
        this.xVel = 0;
        this.yVel = 0;
        // this.xPosition =  
        // this.yPosition = 


    }
display(){
        rectMode(CENTER);
        square(this.xPosition,this.yPosition,this.side);
    }






}