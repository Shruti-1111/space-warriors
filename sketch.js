var bg,bgimg
var ss,ssimg
var alien, a1,a2,a3,a4,a5,a6,a7
var laser
var aliengrp,lasergrp
var score=0
var gamestate="play"
var edges
var potato
function preload(){
bgimg=loadImage('assets/black_bg.jpeg')
ssimg=loadImage('assets/ss2.png')
a1=loadImage('assets/alien1.png')
a2=loadImage('assets/alien2.png')
a3=loadImage('assets/alien3.png')
a4=loadImage('assets/alien4.png')
a5=loadImage('assets/alien5.png')
a6=loadImage('assets/alien6.png')
a7=loadImage('assets/alien7.png')
}

function setup(){
 createCanvas(1500,800) 
 ss=createSprite(80,400)
 ss.addImage(ssimg)
 ss.scale=0.8
 edges=createEdgeSprites()
 aliengrp=new Group()
 lasergrp=new Group()
 potato=createSprite(200,400,15,800)
 potato.visible=false
 
}

function draw(){
background(bgimg)
drawSprites()
fill(255)
textSize(30)
text(' S C O R E - '+Math.round(score),50,50)
textSize(20)
text('coded by Shruti',1200,750)
text('move ship using up and down arrow keys & fire lasers using spacebar to destroy alien ship',500,50)
if(gamestate==='play'){
    if(keyDown(UP_ARROW)){
        ss.y-=8
    }
    if(keyDown(DOWN_ARROW)){
        ss.y+=8
    }
    ss.collide(edges)
    spawnaliens()

    if(keyDown('space')){
        spawnlaser()
    }

lasergrp.isTouching(aliengrp,destroyalien)
if(aliengrp.isTouching(potato)){
score-=0.1
}

if(aliengrp.isTouching(ss)){
    gamestate='stop'
}


}

if(gamestate==='stop'){

    gameover()

    
}
}

function gameover(){
    aliengrp.destroyEach()
    swal({
        title:'G A M E  O V E R',
        text:'Y o u   L o s t',
        imageUrl:'assets/colourfulbg.jpeg',
        imageSize:'150x150',
        confirmButtonText:'Restart'
    },
function (isConfirm){
if(isConfirm){
location.reload()
}
}
)
}


function spawnaliens(){
    if(frameCount%60===0){
        var rand=random(100,700)
        alien=createSprite(1500,rand)
        randvel=random(10,20)
        alien.velocityX=-randvel
        var randimg=Math.round(random(1,7))
        switch(randimg){
           case 1:
            alien.addImage(a1) 
            alien.scale=0.5
            break
            case 2:
                alien.addImage(a2)
                alien.scale=0.5 
                break
                case 3:
                    alien.addImage(a3) 
                    alien.scale=0.5
                    break
                    case 4:
                        alien.addImage(a4) 
                        alien.scale=0.5
                        break
                        case 5:
                            alien.addImage(a5) 
                            alien.scale=0.5
                            break
                            case 6:
                                alien.addImage(a6) 
                                alien.scale=0.5
                                break
                                case 7:
                                    alien.addImage(a7) 
                                    alien.scale=0.5
                                    break
        }
        alien.lifetime=width/randvel
        aliengrp.add(alien)
    }
}

function spawnlaser(){
    laser=createSprite(220,ss.y,60,5)
    laser.shapeColor='lime'
    laser.velocityX=10
    laser.lifetime=width/10
    lasergrp.add(laser)
}

function destroyalien(laser,alien){
alien.destroy()
lasergrp.destroyEach()
score+=10

}



