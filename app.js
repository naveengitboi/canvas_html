
function canvasManipulation(){
    let radius = document.getElementById("radius")
    let xspeed = document.getElementById("xspeed")
    let yspeed = document.getElementById("yspeed")
    let veX;
    let settings = [radius, xspeed, yspeed]
    



    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height= window.innerHeight;
    ctx.fillStyle = "white"
    let speedInX = xspeed.value;
    class Particle{
        constructor(effect){
            this.effect = effect;
            this.ptcRadius = Math.random()*30;
            this.x =this.ptcRadius+ Math.random()*(this.effect.widthCanvas-this.ptcRadius);
            this.y = this.ptcRadius + Math.random()*(this.effect.heightCanvas - this.ptcRadius)
            this.velocityX = speedInX;
            
        }

        draw(context){
            
            this.context = context;
            this.context.fillStyle = 'hsl('+ this.x*0.5+ ',100%,50%)'
            this.context.beginPath();
            this.context.arc(this.x, this.y, this.ptcRadius, 0, Math.PI*2)
            this.context.fill()
        }
        update(){
            this.x += this.velocityX;
            if(this.x > this.effect.widthCanvas || this.x <0){
                this.velocityX *= -1;
            }
        }

    }

    class Effect{
        constructor(canvas){
            this.canvas = canvas;
            this.widthCanvas = this.canvas.width;
            this.heightCanvas = this.canvas.height;
            this.particles = [];
            this.numberOfParticles = 200;
            this.createParticles()
        }

        createParticles(){
            for(let i =0; i<= this.numberOfParticles; i++){
                this.particles.push(new Particle(this))
            }
        }
        handleParticles(context){
            this.particles.forEach(particle => {
                particle.draw(context)
                particle.update();
            })
        }
        
    }

    const effect = new Effect(canvas);
    

    function animate(){
        ctx.clearRect(0,0,canvas.width, canvas.height)
        effect.handleParticles(ctx);
        requestAnimationFrame(animate)
    }
    animate();


}


window.addEventListener("DOMContentLoaded", canvasManipulation)
