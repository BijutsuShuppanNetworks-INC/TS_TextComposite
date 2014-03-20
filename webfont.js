$(function(){
  var $textArea = $('#inputArea1'),
      $loading = $('#loading');
  var s = 1; //倍率
  var txtArea_x = parseInt($textArea.attr('data-txtLeft')), // テキスト入力位置(x軸)
      txtArea_y = parseInt($textArea.attr('data-txtTop')); // テキスト入力位置(y軸)
  var txt_align = $textArea.attr('data-txtAlign'), // 横方向のテキスト描画
      txt_baseline = $textArea.attr('data-txtBaseline'); // 横方向のテキスト描画
  var txt_font  = $textArea.attr('data-font'); // フォント

  $loading.css('display', 'block');



  /* webfont 読み込み判定
     ========================================================================== */
  $(function(){
   var cnt = 0;
   function tryDraw(){
     if(!loaded() && cnt<30){
       setTimeout(tryDraw, 100);
       cnt++;
      }else{
       drewImage();
      }
    }


    //webフォントのロード状況を確認する
     var c1 = document.createElement("canvas");
     var c2 = c1.cloneNode(false);
     var ctx1 = c1.getContext("2d");
     var ctx2 = c2.getContext("2d");
     //webフォントと代替フォントとを指定．
     //NOTE:monoscopeだとwebkitでリロード時に失敗する
     ctx1.font = "31px normal '" + txt_font +"'";
     ctx2.font = "31px normal serif";
     var text = "";

    function loaded(){
      //テキスト幅を比較する
      //webフォントが利用可能となると，フォント幅が一致する．
      var tm1 = ctx1.measureText(text);
      var tm2 = ctx2.measureText(text);
      return tm1.width != tm2.width;
    }
    tryDraw();
  });



  // canvasから画像合成
  // ==========================================================================
  var img = new Image();
  img.src = 'disney_img_03_320.gif';

  $textArea.change(function(){
    $loading.css('display', 'block');
    drewImage();
  });

  var drewImage = function(){

    // 画像作成
    var canvas = document.getElementById("c");
    canvas.width = 320;
    canvas.height = 320;
    var ctx = canvas.getContext("2d");

    // ベースとなる領域
    ctx.beginPath();
    var canvasPattern = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = canvasPattern;
    ctx.rect(0, 0, 320, 320);
    ctx.fill();
    ctx.scale(s,s); // retina対応用

    // テキスト
    ctx.fillStyle = "#000";
    ctx.font = "31px normal '" + txt_font +"'";
    ctx.textAlign = txt_align;
    ctx.textBaseline = txt_baseline;



    var text      = $textArea.val(),
        render_x  = txtArea_x *s,
        render_y  = txtArea_y *s;


    var _fillTextLine = function(ctx, text, x, y){
      var textList = text.split('\n');
      var lineHeight = ctx.measureText("あ").width;
      textList.forEach(function(text, i){
        ctx.fillText(text, x, y + lineHeight * i);
      });
    };

    _fillTextLine(ctx, text, render_x, render_y);
    $loading.css('display', 'none');

    var img_png_src = canvas.toDataURL();
    $('#add').attr('src', img_png_src);

  };

});
