var timer;//监听器吧
var timer1,timer2;//也是监听器吧
var flag = 0;//图片旋转
var flag1 = 0;//开始和暂停的判断
var num = 0;//数组
var lenth
var play = ["一程山路.mp3","空心.mp3","起风了.mp3","有一种悲伤.mp3"];
var deg=0;//旋转角度
var pho = document.getElementById("pho");
var barvader = document.getElementById("barvader");
var audio = document.getElementById("audio");
var title = document.getElementById("title");
var musicBar = document.getElementsByClassName("bar").item(0);
var start_time = document.getElementById("start_time");
var total_time = document.getElementById("total_time");
if (audio != null) {
    audio.src = "auto/"+play[num];
}

//显示时间
function curtime(){
    // console.log(audio.currentTime);
    lenth= audio.duration;
    //当前播放时长
    if(audio.currentTime == "NaN"){
        start_time.innerHTML="00:00";
    }
    else{
        if(audio.currentTime<10){
            start_time.innerHTML="0:0"+Math.floor(audio.currentTime);
        }
        else{
            if(audio.currentTime<60){
                start_time.innerHTML="0:"+Math.floor(audio.currentTime);
            }
            else{
                var minet = parseInt(audio.currentTime/60);
                var sec = audio.currentTime-minet*60;
                if(sec<10){
                    start_time.innerHTML="0"+minet+":"+"0"+parseInt(sec);
                }
                else{
                    start_time.innerHTML="0"+minet+":"+parseInt(sec);
                }
            }
        }
    }

    //总时长
    if(lenth == "NaN"){
        total_time.innerHTML="00:00";
    }
    else{
        if(lenth<10){
            total_time.innerHTML="0:0"+Math.floor(lenth);
        }
        else{
            if(lenth<60){
                total_time.innerHTML="0:"+Math.floor(lenth);
            }
            else{
                var Minet = parseInt(lenth/60);
                var Sec = lenth-Minet*60;
                if(Sec<10){
                    total_time.innerHTML="0"+Minet+":"+"0"+parseInt(Sec);
                }
                else{
                    total_time.innerHTML="0"+Minet+":"+parseInt(Sec);
                }
            }
        }
    }
    // console.log(lenth);
}

//图片旋转
function rotate(){

    if(flag == 0){
        flag = 1;
        timer = setInterval(function(){
            pho.style.transform = "rotate("+deg+"deg)";
            deg += 1 ;
            if(deg>360){
                deg = 0;
            }
        },10);
        console.log("旋转");
    }
    else{
        clearInterval(timer);
        flag = 0;
        console.log("不旋转");
    }
    
}

//开始
function openAudio(){
    
    if(flag1 == 0){
        audio.play();
        title.innerHTML =play[num];
        bar();
        rotate();
        flag1 = 1;
        console.log("开始");
    }
    else{
        audio.pause();
        rotate();
        flag1 = 0;
        clearInterval(timer1)
        console.log("暂停");
    }

    
}

//歌长
function bar(){
    timer1 = setInterval(function(){
        var cur = audio.currentTime;
        lenth= audio.duration;//总时长
        if(cur/lenth==1){
            barvader.style.width = ""+0+"px";
            deg = 0;
            pho.style.transform = "rotate("+deg+"deg)";
            clearInterval(timer);
            flag1 = 0;
            flag = 0;
        }
        else{
            barvader.style.width = ""+parseFloat(cur/lenth)*288+"px";
        }
        curtime();
    },500);


}

//上一首
function backAudio(){
    if(num == 0){
        num = 4;  
    }
    num--;
    audio.src = "auto/"+play[num];
    clearInterval(timer1);
    audio.play();
    setTimeout(() => {
        bar();
    }, 80);
    console.log("上一首");
    title.innerHTML =play[num];
    flag1 = 1;
    if (flag == 0) {
        rotate();
    }
}

//下一首
function nextAudio(){
    if(num == 3){
        num = 0;  
    }
    num++;
    audio.src = "auto/"+play[num];
    audio.play();
    setTimeout(() => {
        clearInterval(timer1);
        bar();
    }, 80);
    console.log("下一首");
    title.innerHTML =play[num];
    flag1 = 1;
    if (flag == 0) {
        rotate();
    }
}

//点击拉动进度条
musicBar.onclick = function(MouseEvent){
    var lenth = audio.duration;
    var x = MouseEvent.offsetX;
    barvader.style.width = x+"px";
    audio.currentTime =""+parseInt(x*lenth/288)+"";
    audio.play();
    if(flag==0){
        rotate();
    }
    bar();
    flag1 = 1;
}

