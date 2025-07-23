class Paddle {
  
  constructor(){
    this.width = 30;
    this.height = 230;
    this.xPosition = 0;
    this.yPosition= 0;
  }
  
  
  display(){
    rectMode(CENTER);
    rect(this.xPosition, this.yPosition, this.width, this.height);
  }
  freeze(){
        this.xVel = 0;
        this.yVel = 0;
        // this.xPosition =  
        // this.yPosition = 


    }

}