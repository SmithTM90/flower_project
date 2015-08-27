/**
 * js404
 * Created by dcorns on 8/26/15
 * Copyright © 2015 Dale Corns
 */
'use strict';
var obj404 = {};

obj404.imgSize = 1200;
obj404.fntSize = -720;

var bkImg = document.getElementById('main');
var msg = document.getElementById('h');
var pg = document.getElementById('pg');
var ana = setInterval(function(){
  if(obj404.imgSize > 0){
    obj404.imgSize--;
    obj404.fntSize++;
    var ss = obj404.imgSize.toString() + 'px';
    var fs = obj404.fntSize.toString() + 'px';
    bkImg.style.backgroundSize = ss;
    msg.style.marginTop = ss;
    pg.style.fontSize = fs;
  }
  else {
    clearInterval(ana);
  }
}, 5);