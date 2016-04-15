$(document).foundation();

function changeLuigi(oldImageUrl,newImageUrl){
  var oldimg = $("#luigi-container img");
  var img = new Image();
  if (oldimg[0].src.indexOf(oldImageUrl)> -1){
    img.src = newImageUrl;
    img.style.zIndex = 9999999999999999;
    img.style.position = "absolute";
  } else {
    img.src = oldImageUrl;
    img.style.zIndex = 9999999999999999;
    img.style.position = "absolute";
  }

  $("#luigi-container img").css({ "height": oldimg[0].height});
  var newImg = $(img).hide();
  $("#luigi-container").append(newImg);
  oldimg.stop(true).fadeOut(400, function() {
    $(this).remove();
  });
  newImg.fadeIn(400);
}

function changeTeam(oldImageUrl,newImageUrl, container){
  var oldimg = $(container + " img");
  var img = new Image();
  if (oldimg[0].src.indexOf(oldImageUrl)> -1){
    img.src = newImageUrl;
    } else {
      img.src = oldImageUrl;
    }
  var newImg = $(img).hide();
  $(container).append(newImg);
  oldimg.stop(true).fadeOut(400, function() {
    $(this).remove();
  });
  newImg.fadeIn(400);
}

function changeLuigiText(oldID, newID, direction) {
  $(".text-ballon").fadeOut(200);
  var selector;
  if (direction == "FORWARD"){
    selector = newID;
  } else {
    selector = oldID;
  }
  $(".text-ballon").promise().done(
    function(){$(selector).fadeIn(200);}
  );
};

var controller = new ScrollMagic.Controller();

$(function () { // wait for document ready
  $('body').on('replace', function (e, new_path, original_path) {
    $('body').waitForImages({
      finished: function(){
        var window_h = $(window).height();
        var barbottom_h = $("#bar").height()  + window_h * 4;
        var barbottom2_h = barbottom_h  + window_h * 0.5;
        var moleskine_h =  barbottom2_h + window_h * 1.5 ;
        var shop_h = moleskine_h + window_h + $('#moleskine-img').height();
        var team_h = shop_h + window_h*1.5 + $('#shop').height() + $('#shop-img').height();
        var footer_h = team_h + $("#team").height();
        var total_h = footer_h + $("#footer").height();

        $('#backtile').height(total_h);

        $('#barbottom').css({
          'top': function () {
            return barbottom_h
          }
        });

        $('#footer').css({
          'top': function () {
            return footer_h
          }
        });

        $('#barbottom2').css({
          'top': function () {
            return barbottom2_h
          }
        });

        $('#moleskine').css({
          'top': function () {
            return moleskine_h
          }
        });

        $('#shop').css({
          'top': function () {
            return shop_h
          }
        });

        $('#team').css({
          'top': function () {
            return team_h
          }
        });

        $("#francesconokia").css({
          'top': function() {
            var bartop = $(window).height() * 4;
            var barheight = $("#bar").height();
            var divider = 3 * barheight /4;
            var fraheight = $("#francesco").height();
            return Math.round(bartop - fraheight + divider);   }

          });
          console.log('css done')
        }, waitForAll: true
      });
    });
  });

  $('#luigi-move').height($('#luigi-container img').height());
  var scene1 = new ScrollMagic.Scene({
    triggerElement: "#", // point of execution
    triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
    reverse: true // allows the effect to trigger when scrolled in the reverse direction
  })
  .setPin("#luigi-move") // the element we want to pin
  .addTo(controller);

  var logo_scene = new ScrollMagic.Scene({
    triggerElement: "#",
    offset: $(window).height() / 2 })
    .on('start', function () {
      $('#luigi-text').height($('#luigi-container').outerHeight());
      var direction = controller.info("scrollDirection");
      changeLuigiText("#logo", "#luigi-text-followme", direction);
      changeLuigi("images/luigi-like.png","images/luigi-speaking.png");
       })
       .addTo(controller);

  var luigiphoto = new ScrollMagic.Scene({
    triggerElement: "#",
    offset: $(window).height()*1.5 })
    .on('start', function () {
      var direction = controller.info("scrollDirection");
      changeLuigi("images/luigi-speaking.png","images/luigi-camera.png");
      changeLuigiText("#luigi-text-followme","#luigi-text-picture", direction);
      $('#flash').delay(300).fadeIn(300).fadeOut(500);
    })
    .addTo(controller);

  var luigiphoto_flash = new ScrollMagic.Scene({
    triggerElement: "#",
    offset: $(window).height() * 2.5})
    .on('start', function () {
      var direction = controller.info("scrollDirection");
      changeLuigi("images/luigi-camera.png","images/luigi-speaking.png");
      changeLuigiText("#luigi-text-picture", "#luigi-text-faces", direction);
    })
    .addTo(controller);

  var luigiphoto_flash = new ScrollMagic.Scene({
    triggerElement: "#bar" })
    .on('start', function () {
      changeLuigi("images/luigi-speaking.png","images/luigi-hello.png");
      var direction = controller.info("scrollDirection");
      changeLuigiText("#luigi-text-faces", "#luigi-text-bar", direction);
    })
    .addTo(controller);

  var tween = TweenMax.from("#francesconokia", 1, {x: '-=400px', autoAlpha: 1});

  var francesconokia = new ScrollMagic.Scene({
    triggerElement: "#francesconokia", duration: 200})
    .setTween(tween)
    .on('start', function(){
      changeLuigi("images/luigi-speaking.png","images/luigi-like.png");
    })
    .addTo(controller);

  var sketchballon = new ScrollMagic.Scene({
    triggerElement: "#barbottom"})
    .on('start', function() {
      $(".text-ballon").fadeOut(200);
      changeLuigi("images/luigi-like.png","images/luigi-speaking.png");
      if(controller.info("scrollDirection")=="FORWARD"){
        $(".sketch-ballon").fadeIn(300);
      } else {
        $(".sketch-ballon").fadeOut(300);
      }
    })
    .addTo(controller);

  var customizabletext = new ScrollMagic.Scene({
    triggerElement: "#barbottom2" })
    .on('start', function() {
      $(".text-ballon").fadeOut(200);
      changeLuigi("images/luigi-speaking.png","images/luigi-hello.png");
      if(controller.info("scrollDirection")=="FORWARD"){
        $("#luigi-text-customizable").fadeIn(300);
      } else {
        $("#luigi-text-customizable").fadeOut(300);
      }
    } )
    .addTo(controller);

  var moleskine = new ScrollMagic.Scene({
    triggerElement: "#moleskine"})
    .on('start', function() {
      if(controller.info("scrollDirection")=="FORWARD"){
        $(".text-ballon").fadeOut(300);
      } else {
        $("#luigi-text-customizable").fadeIn(300);
      }
      changeLuigi("images/luigi-hello.png","images/luigi-speaking.png");
    } )
    .addTo(controller);

  var shop = new ScrollMagic.Scene({
    triggerElement: "#shop"})
    .on('start', function() {
      $(".text-ballon").fadeOut(200);
      $(".sketch-ballon").fadeOut(200);
      changeLuigi("images/luigi-speaking.png","images/luigi-buy.png");
    } )
    .addTo(controller);

  var team = new ScrollMagic.Scene({
    triggerElement: "#team", offset: $(window).height() /4 })
    .on('start', function() {
      $(".text-ballon").fadeOut(200);
      $(".sketch-ballon").fadeOut(200);
      var luigi_img_src = $('#luigi-container img')[0].src
      var direction = controller.info("scrollDirection");
      if($("#mobile-team-container").is(":visible")) {
        if (direction=="FORWARD"){
          $("#luigi-container").hide();
          changeTeam("images/team-mobile.png","images/team-mobile-real.png", "#mobile-team-container");

        } else {
          $("#luigi-container").show();
          changeTeam("images/team-mobile-real.png","images/team-mobile.png", "#mobile-team-container");
        }

      } else {
        if (direction=="FORWARD"){
          if(luigi_img_src.indexOf("luigi-buy.png") >-1 ){
            changeLuigi("images/luigi-buy.png","images/luigi-team-real.png");
          } else if (luigi_img_src.indexOf("luigi-speaking.png") >-1 ) {
            changeLuigi("images/luigi-speaking.png","images/luigi-team-real.png");
          }

        } else {

          if(luigi_img_src.indexOf("luigi-buy.png") >-1 ){
            changeLuigi("images/luigi-buy.png","images/luigi-buy.png");
          } else if (luigi_img_src.indexOf("luigi-speaking.png") >-1 ) {
            changeLuigi("images/luigi-speaking.png","images/luigi-buy.png");
          } else if (luigi_img_src.indexOf("luigi-team-real.png") > -1) {
            changeLuigi("images/luigi-team-real.png","images/luigi-buy.png");
          }

        }

        changeTeam("images/team-francesco.png","images/team-francesco-real.png", "#francesco-container-team");
        changeTeam("images/team-pinja.png","images/team-pinja-real.png", "#pinja-container");



      }



    } )
    .addTo(controller);
