"use strict";
// aseta seuraavan arvoksi true niin putsataan vanhoja viivoja
// voit tehdä konsolin kautta
var owls = 1;
window.onload = function() {
    //ensimmäisen pöllön animointi
    var owl = document.getElementById("owl");
    owl.className = "owl";
    this.CreateBars();
    //haetaan palkit
    let bar = document.querySelector('object');
    // käynnistää animaation palkeille
    bar.className = "bar";
    this.CreateOwlButton();
    this.initBunny();
    this.ScrollText();
    this.DrawSinusScroller();
    this.DrawSnowflake();
    HTMLInspector.inspect();
};
var i = 0;
function CreateBars() {
    //palit luodaan ajoitettuna, jolloin ne tulevat erikohtiin
    setTimeout(function() {
        let paikka = document.getElementById("bar").nextSibling;
        let bar = document.createElement("object");
        bar.setAttribute("id", "bar");
        bar.setAttribute("type", "image/svg+xml");
        bar.setAttribute("data", "grafiikka.svg");
        bar.setAttribute("class", "bar");
        document.body.insertBefore(bar, paikka);
        i++;
        //tämä määrittää monta palkkia luodaan
        if(i < 10) {
            CreateBars();
        }
    }, 100);
}

var headX = []; //x-koordinaatit talteen tänne
var BunnyImage = new Image();
function initBunny() {
    BunnyImage.src = 'http://appro.mit.jyu.fi/tiea2120/vt/vt4/bunny.png';
    BunnyImage.setAttribute("class", "bunny");
    //alustetaan headX myöhempää käyttöä varten 600 on kuvan korkeus
    for(let i = 0; i < 600 || headX[0] != headX[headX.length - 1]; i++) {
        let x = parseInt(((Math.sin(1.0 *i / 20)+1.0)* (30)).toFixed(0));
        headX.push(x);
    }
    window.requestAnimationFrame(DrawBunnyHead);
    window.requestAnimationFrame(DrawBunnyTorso);
    
}
var ykerran = 0;

//piirretään pupu
function DrawBunnyHead() {
    //nopeaus jolla aalto liikkuu
    
    let canvas = document.getElementById('canvas');
    let ctx = document.getElementById('canvas').getContext('2d');
    //tyhjennetään canvas piirtojen välissä
    ctx.clearRect(0,0, 500, 300); 
    ctx.save();
    let headcanvasLahde = 0;
    let headkork = 1;
    let headlahdeKork =0;
    headX.push(headX.shift());
    for(let i = 0; i < 600; i++) {
        ctx.drawImage(BunnyImage, 0, headlahdeKork, 383, headkork, headX[i], headcanvasLahde, 383, headkork);
    
        headcanvasLahde += 1;
        headlahdeKork += 1;
        
    } 
    
    ctx.restore();
    
  
    window.requestAnimationFrame(DrawBunnyHead);
}
       
    
 function DrawBunnyTorso()  {
    //nopeaus jolla aalto liikkuu
    
    let canvas = document.getElementById('canvas2');
    let ctx = document.getElementById('canvas2').getContext('2d');
    //tyhjennetään canvas piirtojen välissä
    ctx.clearRect(0,0, 500, 300); 
    ctx.save();
    let torsoCanvasSource = 0;
    let torsoHight = 1;
    let torsoSourceHight = 300;
    headX.push(headX.shift());
    
    for(let i = 0; i < 600; i++) {
        ctx.drawImage(BunnyImage, 0, torsoSourceHight, 383, torsoHight, headX[i], torsoCanvasSource, 383, torsoHight);
    
        torsoCanvasSource += 1;
        torsoSourceHight += 1;
        
    } 
    
    ctx.restore();
    
  
    window.requestAnimationFrame(DrawBunnyTorso);
}
//tehtävä 3 tästä alkaen
function CreateOwlButton() {
    let div = document.getElementById("owlButton");
    let owlButton = document.createElement("button");
    owlButton.setAttribute("class", "owlButton");
    owlButton.addEventListener("click", AddOwls);
    owlButton.textContent = "Lisää pöllö";
    div.appendChild(owlButton);
}

function AddOwls(e) {
    e.preventDefault();
    let owl = new Image();
    owl.setAttribute("alt", "owl");
    owl.setAttribute("id", "owl");
    if(owls % 2 == 0) {
        owl.setAttribute("class", "owl");
        
        
    } else {
        owl.setAttribute("class", "owl2");
       
        
    }
    let body = document.getElementById("body");
    owl.src = "http://appro.mit.jyu.fi/tiea2120/vt/vt4/owl.svg";
    body.appendChild(owl);
   
    owls++;
}


//pyhä skrolli tänne
var sacredText = "TIEA2120 Web-käyttöliittymien ohjelmointi -kurssin viikkotehtävä 4 taso 3 edellyttää skrollerin toteuttamista. Tämä skrolleri toimii tekstin määrästä riippumatta";
var letterCount = 0;
function ScrollText() {
    
     //selaimen leveys ja korkeus
    let windowWidth = document.documentElement.clientWidth;
    //luodaan canvas
    let canvas = document.getElementById("scrollTextCanvas");
    //canvas on ikkunan kokoinen
    canvas.width = windowWidth;
    
    let ctx = canvas.getContext('2d');
    //luodaan liukuväri
    let gradientColour = ctx.createLinearGradient(0,-10, 0,60);
    gradientColour.addColorStop(0, 'black');
    gradientColour.addColorStop(0.5, 'yellow');
    gradientColour.addColorStop(1.0, 'black');
    ctx.fillStyle = gradientColour;
    //kek
    ctx.font = "60px Comic Sans";
    
    //alustetaan canvas puhtaaksi piirtojen välisssä
    ctx.clearRect(0,0, canvas.width, canvas.height); 
    
    ctx.save();
    let WordLenght = ctx.measureText(sacredText).width;
    //kirjainten koko, keskittämistä varten
    let WordHeight = ctx.measureText(sacredText).actualBoundingBoxAscent;
    
    //console.log(WordHeight);
    ctx.translate(-(letterCount), 0);
    ctx.fillText(sacredText, canvas.width,WordHeight);
    //console.log(canvas.width);
    letterCount++;
    //aloittaa uuden tekstin kun edellisen viimeinen kirjain on saavuttanut vasemman laidan
    if(letterCount > (WordLenght + canvas.width)) {
        letterCount = 0;
    }
    
    ctx.restore();
    window.requestAnimationFrame(ScrollText);
}

//Taso 5
var sinusY = [];
var sinusLetters = sacredText.split('');
var sinusCount = 0;
//tämä säätää kuinka tiukassa kulmassa käyrä toimii.
// mitä suurempi sitä leveempi and vice versa
var sinusWave = 45;
//aallon nopeus, suurempi = hitaampi
var waiveSpeed = 5;
function DrawSinusScroller() {
    let canvas = document.getElementById("scrollSinusCanvas");
    canvas.height = 200;
    let ctx = canvas.getContext('2d');
    //mistä aloitetaan
    let yZero = canvas.height / 2;
    //kuinka korkealle käyrä menee
    let amplitude = canvas.height / 3;
    canvas.width = document.documentElement.clientWidth;
    canvas.height = canvas.height;
    ctx.font = "32px Verdana";
    ctx.fillStyle = "white";
    //paikka on aluksi aivan oikeassa reunassa
    var pos = canvas.width;
    // tehdään functiolla kirjaimista omat oliot, joilla kirjain, leveys ja paikka
    var units = sinusLetters.map(function (char) {
      var width = ctx.measureText(char).width;
      var unit = { char: char, width: width, pos: pos };
      //lisätään paikaan kirjaimen leveys, jotta piirretään oikeaan kohtaan ja tarpeeksi kauas
      pos += width;
      return unit;
    });

    
    let letterTime;
    let WordLenght = ctx.measureText(sacredText).width;
    function animate() {
        let currentTime = Date.now();
        //määrittää missä kirjainten pitäisi olla
        let letterPosition = (currentTime - letterTime) / waiveSpeed;
        letterTime = currentTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        units.forEach(function (unit) {
            //päivitetään kirjainten sijaintia. "-" koska halutaan menevan oikealta vasemmalle
            unit.pos -= letterPosition; 
            if (unit.pos < -unit.width) { 
            //sinus alkaa kun edellinen loppuu
            unit.pos += (canvas.width + WordLenght);
            }
            //määrittää sin function missä kulmassa mennään
            let y = Math.sin(unit.pos / sinusWave) * amplitude;
       
            ctx.fillText(unit.char, unit.pos, yZero + y);
        });
            window.requestAnimationFrame(animate);
        }

        letterTime = Date.now();
        requestAnimationFrame(animate);
  }
//hiutaleet listalle
var objFlakes = [];
var flakes = [];
var flakeCounter = 0;
var flakeTime;
//todo hiutaleille collision detector
function DrawSnowflake() {
    let width = document.documentElement.clientWidth;
    //arvotaan x koordinaatti näytön leveydeltä
    let snowPosition = Math.floor(Math.random() * (width));
    //joka x kerta tehdään lumihuotale
    if(snowPosition % 20 == 0) {
        let snowflake = new Image();
        snowflake.setAttribute("alt", "snowflake");
        snowflake.setAttribute("id", "snowflake" + flakeCounter);
        snowflake.className = "snowflake";
        snowflake.setAttribute("class", "snowflake");
        let body = document.getElementById("body");
        snowflake.src = "http://appro.mit.jyu.fi/tiea2120/vt/vt4/snowflake2.svg";
        let flakeObj = {id: ("snowflake"+flakeCounter), x: snowPosition, y: 0};
        objFlakes.push(flakeObj);
        //hiutaleen x koordinaation asetus
        snowflake.style.left = snowPosition + "px";
        flakes.push(snowflake);
        let snowMulti = 1;
        
        
        body.appendChild(snowflake);
        flakeCounter++;
        }
    let currentTime = Date.now();
    for(let i = 0; i < objFlakes.length; i++) {
            //varmistetaan ettei kyseessä ole juuri luotu hiutale
            //if(objFlakes[i].id != "snowflake"+flakeCounter) {
                for(let u = 0; u < objFlakes.length; u++) {
                    if(objFlakes[i].id != objFlakes[u].id && 
                        (objFlakes[i].x + 40 >= objFlakes[u].x && objFlakes[i].x < objFlakes[u].x) &&
                        (objFlakes[i].y >= objFlakes[u].y - 30 && objFlakes[i].y < objFlakes[u].y) ||
                        ((objFlakes[i].x == objFlakes[u].x) && (objFlakes[i].y >= objFlakes[u].y - 30 && objFlakes[i].y < objFlakes[u].y) && objFlakes[i].id != objFlakes[u].id)) {
                        for(let f = 0; f < flakes.length; f++) {
                            if(flakes[f].getAttribute("id") == objFlakes[i].id) {
                                flakes[f].style.animationPlayState = "paused";
                                flakes.splice(f, 1);
                                //objFlakes.splice(i, 1);
                            }
                        }
                    }
                }
           // }
        }
    //joka kierros päivitetään hiutaleiden y
    for(let i = 0; i < objFlakes.length; i++) {
        if(objFlakes[i].y < window.innerHeight) {
            objFlakes[i].y += 5;
        }
            
    }
    window.requestAnimationFrame(DrawSnowflake);
    }










