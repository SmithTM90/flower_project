'use strict'

  $(document).ready(function(){
    if (window.location.href.indexOf("index_p3")>(-1)){
      var activeFlower = window.location.hash.replace('#', '');
      if (activeFlower){
        $('.petunia').addClass('hide')
      };

      //Show the selected flower's HTML
      $('.'+activeFlower).css("display", "initial"); //Show the selected flower's HTML

      //Add event listener to button, save selected flower into flowerBoxList local storage
      $('.bttn').on('click', function(){
        var flowerBoxArray = [];
        if (localStorage.getItem('flowerBoxList')) {
          flowerBoxArray = JSON.parse(localStorage.getItem('flowerBoxList'));
        }
        if ((flowerBoxArray.indexOf(activeFlower)<0)) {
          flowerBoxArray.push(activeFlower);
          var flowerBoxStringInsert = JSON.stringify(flowerBoxArray);
          localStorage.setItem('flowerBoxList', flowerBoxStringInsert);
        }
        window.location.href = "index_p2.html";
      });
    }
    if (window.location.href.indexOf("index_p2")>(-1)){
      if (localStorage.getItem('flowerBoxList')) {
        var flowerBoxArray = JSON.parse(localStorage.getItem('flowerBoxList'));
        for (var i = 0; i < flowerBoxArray.length; i++){
          $('.'+flowerBoxArray[i]).css("display", "block");
        }
      }
      $('.emptyBox').on('click', function(){
        localStorage.setItem('flowerBoxList', '');
        window.location.href = "index_p2.html";
      });
    }
  });
