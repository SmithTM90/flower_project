/**
 * js404
 * Created by dcorns on 8/26/15
 * Copyright © 2015 Dale Corns
 */
'use strict';
var obj404 = {};

obj404.imgAry = ['giphy.gif', 'giphy2.gif', 'giphy3.gif', 'giphy4.gif', 'giphy5.gif', 'giphy6.gif', 'giphy7.gif', 'giphy8.gif', 'giphy9.gif', 'giphy10.gif',, 'giphy11.gif', 'giphy12.gif', 'giphy13.gif'];
obj404.imgContainers = document.getElementsByClassName('crazy');
obj404.path = 'image/';

console.log(obj404.imgContainers);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function showImages(ary){
  var count = 0, len = ary.length;
  for(count; count < len; count++){
      ary[count].attributes[1].value = obj404.path + loadImage(obj404.imgAry);
  }
}

function loadImage(ary){
  var idx = getRandomInt(0, ary.length);
  return ary[idx];
}

var s = 1200;

setInterval(function(){
  s--;
  var ss = s.toString() + 'px';
  document.getElementById('main').style.backgroundSize = ss;
}, 5);