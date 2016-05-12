//定义canvas
var canvas =document.getElementById("canvas"),
  context =canvas.getContext("2d");
var canvas1 =document.getElementById("canvas1"),
  context1 =canvas1.getContext("2d");
var canvas2 =document.getElementById("canvas2"),
  context2 =canvas2.getContext("2d");

//定义乐谱
var dream=document.getElementById("d"),
    sky=document.getElementById("s"),
    elise=document.getElementById("f"),
    canon=document.getElementById("k"),
    Croatian=document.getElementById("croatian"),
    notturno=document.getElementById("notturno");
//定义背景图片
var pic1=document.getElementById("pic1"),
    pic2=document.getElementById("pic2"),
    pic3=document.getElementById("pic3"),
    pic4=document.getElementById("pic4");
//定义其他按钮
var reset=document.getElementById("reset"),
    kc=document.getElementById("keycolor");
var tip=document.getElementById("tip");
//特效按钮
var effect1=document.getElementById("effect1"),
    effect2=document.getElementById("effect2"),
    effect3=document.getElementById("effect3");
//纯音乐按钮
var dream1=document.getElementById("dream"),
    sky1=document.getElementById("sky"),
    elise1=document.getElementById("for"),
    canon1=document.getElementById("ka"),
    Croatian1=document.getElementById("kl"),
    notturno1=document.getElementById("y");

var keysound=document.getElementById('key');
var music=document.getElementById('music'),m1=0,m2=0,m3=0,m4=0,m5=0,m6=0;
var s=0,y=0,y2=0,w=190,w2=190,w3=200,range,color=10,effects=1,gradient,a=1,w3,h=150,cc=0;
var drawingSurfaceImageData,
    mousedown = {};
var fire =new Array("yellow","green","blue","red","purple","orange","pink","coral","brown","lightgreen");
var word =new Array("Great","Not bad","Keep going","Perfect","Good");

//----------------乐谱canvas--------------
var lastTime=0,fps;
var bg,bgPps=50,bgPpf,bgOffset=0;
var ly,lyPps=30,lyPpf,lyOffset=0;

function calculateFps() {
    var now = new Date;
    fps = 1000 / (now - lastTime); // f=1/T
    fps = Math.round(fps);
    lastTime = now;
    return fps;
}
function calculatePpf(pps) {
   return pps/fps;
}

//背景
function bg(){
 fps=calculateFps();
 bgPpf=calculatePpf(bgPps);
 bgOffset=(bgOffset>-1*canvas1.height)?bgOffset-0.5*bgPpf:0;
 context1.save();
 context1.translate(0,bgOffset);
 context1.drawImage(image1,0,0,canvas1.width,canvas1.height);
 context1.drawImage(image1,0,canvas1.height,canvas1.width,canvas1.height);
 context1.restore();
}
//乐谱
function sheet(){
fps=calculateFps();
lyPpf=calculatePpf(lyPps);
lyOffset-=0.1;
context1.save();
context1.translate(0,lyOffset);
context1.drawImage(image2,0,10,image2.width,image2.height);
context1.drawImage(image2,0,image2.height+10,image2.width,image2.height);
context1.restore();  
}

function draw(){
    bg();
    sheet();
}
//滚动实现
function animation(){
	draw();
	animationFrame=requestAnimationFrame(animation);
}

//-------------------钢琴键canvas-----------------
//窗口坐标
function windowToCanvas(x, y) {
   var bbox = canvas.getBoundingClientRect();//获取
   return { x: x - bbox.left * (canvas.width  / bbox.width),
            y: y - bbox.top  * (canvas.height / bbox.height) };
}
function saveDrawingSurface() {//保存绘制了的对象
   drawingSurfaceImageData = context.getImageData(0, 0,canvas.width,canvas.height);
}

function restoreDrawingSurface() {//恢复
   context.putImageData(drawingSurfaceImageData, 0, 0);
}

//绘制钢琴键
function drawPiano(){
    context.drawImage(imagea,0,130,imagea.width,imagea.height);
    context.drawImage(imageb,600,130,imageb.width,imageb.height);
    var i=200;
    context.beginPath();
    for(i;i<600;i+=50){
    context.rect(i,canvas.height/2,50,canvas.height/2+1);
    colorkey(color);
    context.fill();
    context.stroke();
    }
    //black key
    context.fillStyle='black';
    context.fillRect(235,canvas.height/2,30,canvas.height/2-50);
    context.fillRect(285,canvas.height/2,30,canvas.height/2-50);
    context.fillRect(385,canvas.height/2,30,canvas.height/2-50);
    context.fillRect(435,canvas.height/2,30,canvas.height/2-50);
    context.fillRect(485,canvas.height/2,30,canvas.height/2-50);
    context.closePath();
}
//重画黑键
function blackkey(){
    context.beginPath();  
    context.fillStyle='black';
    context.fillRect(235,canvas.height/2,30,canvas.height/2-50);
    context.fillRect(285,canvas.height/2,30,canvas.height/2-50);
    context.fillRect(385,canvas.height/2,30,canvas.height/2-50);
    context.fillRect(435,canvas.height/2,30,canvas.height/2-50);
    context.fillRect(485,canvas.height/2,30,canvas.height/2-50);
    context.closePath();
}
//琴键的颜色
function colorkey(color){
    if(color==10)
    context.fillStyle='white';
    else 
    context.fillStyle=fire[color];
    }
//whitekey点击的颜色变化
function keycolor(range){
    var ww=w;
    //三种按键效果的不同位置
    if(effects==1)
        ww=w;
    else if(effects==2)
        ww=w2;
    else 
        ww=w3-23;
    context.beginPath();
    context.fillStyle='lightgray';
    context.fillRect(ww,150,50,151);
    context.closePath();
}
//颜色恢复
function rekeycolor(range){
    var ww=w;
    if(effects==1)
        ww=w;
    else if(effects==2)
        ww=w2;
    else 
        ww=w3-23;
//    var left=200+50*(range-1);
    context.beginPath();
//    context.fillStyle='white';
    colorkey(color);
    context.rect(ww,150,50,151);
    context.stroke();
    context.fill();
    context.closePath();    
}
//blackkey点击的颜色变化
function blackcolor(range){
    context.beginPath();  
    context.fillStyle='lightgray';
    switch(range){
        case 9:context.fillRect(235,canvas.height/2,30,canvas.height/2-50);
               break;
        case 10:context.fillRect(285,canvas.height/2,30,canvas.height/2-50);
               break;
        case 11:context.fillRect(385,canvas.height/2,30,canvas.height/2-50);
               break;
        case 12:context.fillRect(435,canvas.height/2,30,canvas.height/2-50);
               break;
        case 13:context.fillRect(485,canvas.height/2,30,canvas.height/2-50);
               break;
    }
    context.closePath();
}
//键音
function autoplay(range){
    switch(range){
            case 1:keysound.src='1.mp3';
               break;
            case 2:keysound.src='2.mp3';
               break;
            case 3:keysound.src='3.mp3';
               break;
            case 4:keysound.src='4.mp3';
               break;
            case 5:keysound.src='5.mp3';
               break;
            case 6:keysound.src='6.mp3';
               break;
            case 7:keysound.src='7.mp3';
               break;
            case 8:keysound.src='1+.mp3';
               break;
            case 9:keysound.src='1.5.mp3';
               break;
            case 10:keysound.src='2.5.mp3';
               break;
            case 11:keysound.src='4.5.mp3';
               break;
            case 12:keysound.src='5.5.mp3';
               break;
            case 13:keysound.src='6.5.mp3';
               break;
            
    }
    if(range>=1&&range<=13)
    keysound.play();
}

//-----钢琴键特效------

//音符显示
function key(range){
    switch(range){
            case 1:image3.src='1+.png';
               break;
            case 2:image3.src='2+.png';
               break;
            case 3:image3.src='3+.png';
               break;
            case 4:image3.src='4+.png';
               break;
            case 5:image3.src='5+.png';
               break;
            case 6:image3.src='6+.png';
               break;
            case 7:image3.src='7+.png';
               break;
            case 8:image3.src='1++.png';
               break;
            case 9:image3.src='9+.png';
               break;
            case 10:image3.src='10+.png';
               break;
            case 11:image3.src='11+.png';
               break;
            case 12:image3.src='12+.png';
               break;
            case 13:image3.src='13+.png';
               break;
            
    }
}
//音符和key的效果实现
function effect(){
    if(y<100)
    y-=2.5;
    else 
    y+=2.5;
    context.save();
    context.translate(0,y);
    key(range);
    if(range>=1&&range<=8){
    w=200+50*(range-1);
    context.drawImage(image3,w,100,image3.width,image3.height);
    }
    else{
    switch(range){
        case 9:context.drawImage(image3,225,100,image3.width,image3.height);
               break;
        case 10:context.drawImage(image3,285,100,image3.width,image3.height);
                break;
        case 11:context.drawImage(image3,380,100,image3.width,image3.height);
                break;
        case 12:context.drawImage(image3,435,100,image3.width,image3.height);
                break;
        case 13:context.drawImage(image3,485,100,image3.width,image3.height);
                break;
    }
    }
    context.restore();
}
//音符滚动实现
function animate(){
	effect();
	animationFrame=requestAnimationFrame(animate);
}

//彩条
function blockcolor(range){
switch(range){
        case 0:context.fillStyle="rgba(255,255,255,1)";
//               gradient.addColorStop("0","yellow");
               break;
        case 1:context.fillStyle="rgba(187,255,255,0.5)";
//               gradient.addColorStop("0","yellow");
               break;
        case 2:context.fillStyle="rgba(124,252,0,0.5)";
        //gradient.addColorStop("0","pink");
               break;
        case 3:context.fillStyle="rgba(141,150,52,0.3)";
        //gradient.addColorStop("0","lightgreen");
               break;
        case 4:context.fillStyle="rgba(205,92,92,0.4)";
        //gradient.addColorStop("0","coral");
               break;
        case 5:context.fillStyle="rgba(187,85,211,0.5)";
        //gradient.addColorStop("0","blue");
               break;
        case 6:context.fillStyle="rgba(255,48,48,0.4)";
        //gradient.addColorStop("0","brown");
               break;
        case 7:context.fillStyle="rgba(30,145,204,0.6)";
        //gradient.addColorStop("0","tan");
               break;
        case 8:context.fillStyle="rgba(255,165,0,0.5)";
        //gradient.addColorStop("0","plum");
               break;
        case 9:context.fillStyle="rgba(127,232,25,0.2)";
        //gradient.addColorStop("0","orange");
               break;
        case 10:context.fillStyle="rgba(205,49,92,0.2)";
        //gradient.addColorStop("0","tomato");
               break;
        case 11:context.fillStyle="rgba(32,64,195,0.2)";
        //gradient.addColorStop("0","gold");
               break;
        case 12:context.fillStyle="rgba(100,154,39,0.2)";
        //gradient.addColorStop("0","green");
               break;
        case 13:context.fillStyle="rgba(66,66,66,0.3)";
        //gradient.addColorStop("0","khaki");
               break;
            
    }    
}
function rect(range){
y2-=1.5;
gradient=context.createLinearGradient(0,0,0,y2);
blockcolor(range);
context.save();
if(range>=1&&range<=8){
w2=200+50*(range-1);
w3=w2+15;
context.translate(0,y2);
context.fillRect(w3,151,20,y2);
}
else {
switch(range){
    case 9:context.fillRect(243,151,15,y2);
           break;
    case 10:context.fillRect(290,151,15,y2);
           break;
    case 11:context.fillRect(389,151,15,y2);
           break;
    case 12:context.fillRect(440,151,15,y2);
           break;
    case 13:context.fillRect(490,151,15,y2);
           break;
}
}
context.restore();
}
function animate2(){
rect(range);
animationFrame=requestAnimationFrame(animate2);
}
function colorblock(range){
 context.beginPath();
 animate2();
 context.closePath();
}

//波形彩色星星
function firework(){
var fc=Math.round(Math.random()*9);
h-=5;
w3=200+50*(range-1)+23;
context.fillStyle=fire[fc];
context.font="20px Calibri";
if(range>=1&&range<=8)
context.fillText("*",w3-fc+10,h+fc-10);
else {
switch(range){
    case 9:context.fillText("*",240-fc+10,h+fc-10);
           break;
    case 10:context.fillText("*",290-fc+10,h+fc-10);
           break;
    case 11:context.fillText("*",385-fc+10,h+fc-10);
           break;
    case 12:context.fillText("*",440-fc+10,h+fc-10);
           break;
    case 13:context.fillText("*",490-fc+10,h+fc-10);
           break;
}   
}
}
function star(){
context.beginPath();
context.save();
var rad1 = Math.sin(0.4*Math.PI);     //sin(72)  
        var rad2 = Math.cos(0.4*Math.PI);     //cos(72)  
        var rad3 = Math.sin(0.2*Math.PI);     //sin(36)  
        var rad4 = Math.cos(0.2*Math.PI);     //cos(36) 
var l=50;
if(range>=1&&range<=8)
context.translate(w3+2,h-5);
else {
var s;
switch(range){
    case 9:s=240;
           break;
    case 10:s=290;
           break;
    case 11:s=385;
           break;
    case 12:s=440;
           break;
    case 13:s=490;
           break;
}  
context.translate(s+2,h-5);
}
context.scale(0.2,0.2);
context.moveTo(0,-l*rad1);  
context.lineTo(l*rad2,0);  
context.lineTo(l+l*rad2,0);  
context.lineTo(l*rad2+2*l*rad2*rad2,l*rad3);  
context.lineTo(l*rad4,2*l*rad1*rad1-l*rad1+l*rad3);  
context.lineTo(0,2*l*rad1*rad1-l*rad1);  
context.lineTo(-l*rad4,2*l*rad1*rad1-l*rad1+l*rad3);  
context.lineTo(-l*rad2-2*l*rad2*rad2,l*rad3);  
context.lineTo(-l-l*rad2,0);  
context.lineTo(-l*rad2,0);  
context.lineTo(0,-l*rad1);  
context.fill();
context.restore();
context.closePath();
}
function animate3(){
	firework();
	animationFrame=requestAnimationFrame(animate3);
}

//评价
function words(cornerx,cornery,width,height,cornerRadius){
context.beginPath();
context.fillStyle="lightgreen";
context.moveTo(cornerx+cornerRadius,cornery);              context.arcTo(cornerx+width,cornery,cornerx+width,cornery+height,cornerRadius);
context.arcTo(cornerx+width,cornery+height,cornerx,cornery+height,cornerRadius);
context.arcTo(cornerx,cornery+height,cornerx,cornery,cornerRadius);
context.arcTo(cornerx,cornery,cornerx+cornerRadius,cornery,cornerRadius);
context.closePath();
context.fill();
context.beginPath();
context.moveTo(cornerx,cornery+cornerRadius);
context.lineTo(cornerx+cornerRadius+cornerx/3,cornery+height);
context.lineTo(cornerx-10,cornery+height+10);
context.lineTo(cornerx,cornery+height);
context.closePath();
context.fill();
var fc=Math.round(Math.random()*9);
var wd=Math.round(Math.random()*4);
context.fillStyle=fire[fc];
context.font="30px Calibri";
context.fillText(word[wd],cornerx+5,cornery+35);
if(word[wd]=="Keep going"||word[wd]=="Not bad"){
context.fillText("23333",cornerx+600,cornery+25);
}
else
context.fillText("Oh~Wooo~",cornerx+595,cornery+25);
context.fillText("V",cornerx+630,cornery+50);
}

//--------------tip canvas-----------
function Tip(){
 context2.font="40px Calibri";
 var g= context2.createLinearGradient(0,0,canvas2.width,0);
 context2.fillText("1:a i q ",0,50);
 context2.fillText("2:b j r ",0,80);
 context2.fillText("3:c k s ",0,110);
 context2.fillText("4:d l t ",0,140);
 context2.fillText("5:e m u ",0,170);
 context2.fillText("6:f n v ",0,200);
 context2.fillText("7:g o w ",0,230);
 context2.fillText("i:h p x ",0,260);
 context2.fillText("#1: y   ",0,290);
 context2.fillText("#2:←    ",0,320);
 context2.fillText("#4:↑    ",0,350);
 context2.fillText("#5:→    ",0,380);
 context2.fillText("#6:↓    ",0,410);
}
function resetT(){
context2.clearRect(0,0,canvas2.width,canvas2.height);
}

//----------------触发---------------
//重置画面
reset.onclick=function(e){
    context.clearRect(0,0,canvas.width,canvas.height);
    context1.clearRect(0,0,canvas1.width,canvas1.height);
    y=0;y2=0;color=10;effects=1;
    drawPiano();
    image1.src='1.jpg';
    cancelAnimationFrame(animationFrame);
    context1.drawImage(image1,0,0,canvas1.width,canvas1.height);
    music.pause();
}
//key改变颜色
kc.onclick=function(e){
    color=Math.round(Math.random()*10);
    drawPiano();
}
//换乐谱
dream.onclick=function(e){
	image2.src="d.png";
    lyOffset=0;
	context1.clearRect(0,0,canvas1.width,canvas1.height);
	animation();
}
sky.onclick=function(e){
	image2.src="s.png";
    lyOffset=0;
	context1.clearRect(0,0,canvas1.width,canvas1.height);
	animation();
}
elise.onclick=function(e){
	image2.src="f.png";
    lyOffset=0;
	context1.clearRect(0,0,canvas1.width,canvas1.height);
	animation();
}
canon.onclick=function(e){
	image2.src="k.png";
    lyOffset=0;
	context1.clearRect(0,0,canvas1.width,canvas1.height);
	animation();
}
Croatian.onclick=function(e){
	image2.src="kl.png";
    lyOffset=0;
	context1.clearRect(0,0,canvas1.width,canvas1.height);
	animation();
}
notturno.onclick=function(e){
	image2.src="y.png";
    lyOffset=0;
	context1.clearRect(0,0,canvas1.width,canvas1.height);
	animation();
}
//播放钢琴曲
dream1.onclick=function(e){
	if(m1==0){
	music.src="d.mp3";
    music.play();
    m1=1;
    image2.src="d.png";
    lyOffset=0;
	context1.clearRect(0,0,canvas1.width,canvas1.height);
	animation();
    }
    else {
    music.pause();
    m1=0;
    cancelAnimationFrame(animationFrame);
    }
}
sky1.onclick=function(e){
    if(m2==0){
	music.src="s.mp3";
    music.play();
    m2=1;
    image2.src="s.png";
    lyOffset=0;
	context1.clearRect(0,0,canvas1.width,canvas1.height);
	animation();
    }
    else {
    music.pause();
    m2=0;
    cancelAnimationFrame(animationFrame);
    }
}
elise1.onclick=function(e){
	if(m3==0){
	music.src="f.mp3";
    music.play();
    m3=1;
    image2.src="f.png";
    lyOffset=0;
	context1.clearRect(0,0,canvas1.width,canvas1.height);
	animation();
    }
    else {
    music.pause();
    m3=0;
    cancelAnimationFrame(animationFrame);
    }
}
canon1.onclick=function(e){
	if(m4==0){
	music.src="k.mp3";
    music.play();
    m4=1;
    image2.src="k.png";
    lyOffset=0;
	context1.clearRect(0,0,canvas1.width,canvas1.height);
	animation();
    }
    else {
    music.pause();
    m4=0;
    cancelAnimationFrame(animationFrame);
    }
}
Croatian1.onclick=function(e){
	if(m5==0){
	music.src="kl.mp3";
    music.play();
    m5=1;
    image2.src="kl.png";
    lyOffset=0;
	context1.clearRect(0,0,canvas1.width,canvas1.height);
	animation();
    }
    else {
    music.pause();
    m5=0;
    cancelAnimationFrame(animationFrame);
    }
}
notturno1.onclick=function(e){
	if(m6==0){
	music.src="y.mp3";
    music.play();
    m6=1;
    image2.src="y.png";
    lyOffset=0;
	context1.clearRect(0,0,canvas1.width,canvas1.height);
	animation();
    }
    else {
    music.pause();
    m6=0;
    cancelAnimationFrame(animationFrame);
    }
}
//换背景
pic1.onclick=function(e){
	image1.src="1.jpg";
	context1.resetTransform();
}
pic2.onclick=function(e){
	image1.src="2.jpg";
	context1.resetTransform();
}
pic3.onclick=function(e){
	image1.src="3.jpg";
	context1.resetTransform();
}
pic4.onclick=function(e){
	image1.src="4.jpg";
	context1.resetTransform();
}

//tip
tip.onclick=function(e){
Tip();
setTimeout("resetT()",10000);
}

//effect
effect1.onclick=function(e){
    effects=1;
}
effect2.onclick=function(e){
    effects=2;
}
effect3.onclick=function(e){
effects=3;
}

//鼠标按键
canvas.onmousedown = function (e) {
    context.clearRect(200,0,600,canvas.height/2);
    drawPiano();
   var loc = windowToCanvas(e.clientX, e.clientY);
   
   e.preventDefault(); // prevent cursor change

//   saveDrawingSurface();
   mousedown.x = loc.x;
   mousedown.y = loc.y;
 //判断鼠标点击位置
 if(mousedown.y>=150&&mousedown.y<=250&&mousedown.x>=200&&mousedown.x<=600){
 if(mousedown.x>=200&&mousedown.x<=235)
     range=1;
 if(mousedown.x>=235&&mousedown.x<=265)
     range=9;
 if(mousedown.x>265&&mousedown.x<=285)
     range=2;
 if(mousedown.x>285&&mousedown.x<=315)
     range=10;
 if(mousedown.x>315&&mousedown.x<=350)
     range=3;
 if(mousedown.x>350&&mousedown.x<=385)
     range=4;
 if(mousedown.x>385&&mousedown.x<=415)
     range=11;
 if(mousedown.x>415&&mousedown.x<=435)
     range=5;
 if(mousedown.x>435&&mousedown.x<=465)
     range=12;
 if(mousedown.x>465&&mousedown.x<=485)
     range=6;
 if(mousedown.x>485&&mousedown.x<=515)
     range=13;
 if(mousedown.x>515&&mousedown.x<=550)
     range=7;
 if(mousedown.x>550&&mousedown.x<=600)
     range=8;
}
else {
 if(mousedown.y>=250&&mousedown.y<=300&&mousedown.x>=200&&mousedown.x<=600){
 if(mousedown.x>=200&&mousedown.x<=250)
     range=1;
 if(mousedown.x>250&&mousedown.x<=300)
     range=2;
 if(mousedown.x>300&&mousedown.x<=350)
     range=3;
 if(mousedown.x>350&&mousedown.x<=400)
     range=4;
 if(mousedown.x>400&&mousedown.x<=450)
     range=5;
 if(mousedown.x>450&&mousedown.x<=500)
     range=6;
 if(mousedown.x>500&&mousedown.x<=550)
     range=7;
 if(mousedown.x>550&&mousedown.x<=600)
     range=8;  
}
   else range=1500;
}
   y=0;y2=0;h=150;
   if(effects==1)
   animate();
   else if(effects==2){
   colorblock(range);
   }
   else
   animate3();
   if(range>=1&&range<=8){
   keycolor(range);
   blackkey(); 
   }
   else
   blackcolor(range);
   autoplay(range);
   if(range>=1&&range<=13)
   words(50,70,150,50,10);
};
canvas.onmouseup = function (e){
    cancelAnimationFrame(animationFrame);
    if(effects==3&&range>=1&&range<=13)
    star();
    if(range>=1&&range<=8)
    rekeycolor(range);
    blackkey();
    keysound.pause();
    y=0;y2=0;h=150;
}

//键盘按键
document.onkeydown=function(e){
    context.clearRect(0,0,canvas.width,canvas.height);
    drawPiano();
    var keyId=e.keyCode?e.keyCode:e.which;
    if((keyId>=65&&keyId<=89)||(keyId>=37&&keyId<=40)){
    if(keyId===65||keyId===73||keyId===81)
        range=1;
    if(keyId===66||keyId===74||keyId===82)
        range=2;
    if(keyId===67||keyId===75||keyId===83)
        range=3;
    if(keyId===68||keyId===76||keyId===84)
        range=4;
    if(keyId===69||keyId===77||keyId===85)
        range=5;
    if(keyId===70||keyId===78||keyId===86)
        range=6;
    if(keyId===71||keyId===79||keyId===87)
        range=7;
    if(keyId===72||keyId===80||keyId===88)
        range=8;
    if(keyId==89)
        range=9;
    if(keyId==37)
        range=10;
    if(keyId==38)
        range=11; 
    if(keyId==39)
        range=12; 
    if(keyId==40)
        range=13; 
              
    }
    else range=100;
   y=0;y2=0;h=150;
   if(effects==1)
   animate();
   else if(effects==2)
   colorblock(range);
   else
   animate3();
   if(range>=1&&range<=8){
   keycolor(range);
   blackkey(); 
   }
   else
   blackcolor(range);
   autoplay(range);
   if(range>=1&&range<=13)
   words(50,70,150,50,10);
}
document.onkeyup=function(e){
    cancelAnimationFrame(animationFrame);
    if(effects==3&&range>=1&&range<=13)
    star();
    if(range>=1&&range<=8)
    rekeycolor(range);
    blackkey();
    keysound.pause();
    y=0;y2=0;h=150;
}
document.onkeypress=function(e){
//    console.log('3');
}

//乐谱开始暂停
canvas1.onmousedown = function(e){
 if(cc==0){
 cancelAnimationFrame(animationFrame); 
 cc=1;
 }
 else{
 animation();
 cc=0;
 } 
}

//--------------初始化-----------------
//图片加载
var image1 = new Image();
    image1.src = '1.jpg';
image1.onload=function() {
context1.drawImage(image1,0,0,canvas1.width,canvas1.height);
};

var image2 = new Image();
//----音符图片初始化------
var image3 = new Image();
image3.src = '1+.png';

//设置背景
var imagea =new Image();
imagea.src='yo1.jpg';
imagea.onload=function(){
context.drawImage(imagea,0,130,imagea.width,imagea.height);    
};
var imageb =new Image();
imageb.src='yoo.jpg';
imageb.onload=function(){
context.drawImage(imageb,600,130,imageb.width,imageb.height);    
};
//绘制钢琴键
drawPiano();
//autoplay(0);