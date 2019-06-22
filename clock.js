function draw(){
    var canvas=document.querySelector("canvas");
    canvas.height=500;
    canvas.width=500;
    var ctx=canvas.getContext("2d");
    var alarm=document.querySelector("input");
    var sound=document.querySelector("audio");
    var btn=document.querySelector("#btn");
    var limit;
    btn.addEventListener("click",alarm_stop);
    clock();


//outline
    function clock(){
    
    ctx.save();
    ctx.clearRect(0,0,500,500);
    ctx.beginPath();
    ctx.arc(250,150,130,0,Math.PI*2,true);
    ctx.fill();
    ctx.translate(250,150);
    ctx.fillStyle="pink";
//hours,min,sec
    hour();
    arrow();
    function hour(){
        for(var i=0;i<12;i++){
            ctx.save();
            var angleHour=i*Math.PI/6;
            ctx.rotate(angleHour);
            ctx.fillRect(0,-127,2,12);
            for(var j=1;j<=4;j++){
                ctx.save();
                var angleMinute=Math.PI/30;
                ctx.rotate(angleMinute*j);
                ctx.fillRect(0,-127,1,6);
                ctx.restore();
            }
            ctx.restore();
    }
}
//arrows
    function arrow(){
        ctx.save();
        var time=new Date();
        if(alarm.value.substr(0,2)==time.getHours() && alarm.value.substr(3,2)==time.getMinutes() && time.getSeconds()==0){
        
            sound.play();
            sound.loop=true;
            limit=time.getMinutes();
            
        }
        if(time.getMinutes()==(limit+1)%60){
          alarm_stop();
        }
        
        //second
        ctx.rotate(time.getSeconds()*Math.PI/30 + time.getMilliseconds()*Math.PI/30000);
        ctx.fillRect(-0.4,-70,0.8,70);
        ctx.restore();
        
        //minute
        ctx.save();
        ctx.rotate(time.getMinutes()*Math.PI/30 + time.getSeconds()*Math.PI/1800);
        ctx.fillRect(-0.5,-60,1,60);
        ctx.restore();

        //hours
        ctx.save();
        ctx.rotate(time.getHours()*Math.PI/6 + (time.getMinutes()/60)*Math.PI/6 + (time.getSeconds()/3600)*Math.PI/6);
        ctx.fillRect(-0.7,-40,1.4,40);
        ctx.restore();
        ctx.stroke();
    }
    
    ctx.restore();
    requestAnimationFrame(clock);
}
    function alarm_stop(){
        sound.pause();
        sound.currentTime=0;
    }
}
