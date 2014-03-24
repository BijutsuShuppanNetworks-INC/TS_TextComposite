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


  //画像を読み込ませる為の時間
  $(function(){
      setTimeout(drewImage, 200);
  });

  // canvasから画像合成
  // ==========================================================================
  var img = new Image();
  img.src = 'disney_img_03_320.gif';

  $textArea.change(function(){
    $loading.css('display', 'block');
    drewImage();
  });

  //座標、角度、寄せ変更時も画像合成
  $('[name=x], [name=y], [name=angle], [name=align]').change(function(){
    $loading.css('display', 'block');
    drewImage();
  });



  var drewImage = function(){

	//選択値を取得
    var txtArea_x = parseInt($('[name=x]').val()); // テキスト入力位置(x軸)
        txtArea_y = parseInt($('[name=y]').val()); // テキスト入力位置(y軸)
    var select_angle = parseInt($('[name=angle]').val()); //角度
    var select_align = $('[name=align]').val(); //寄せ

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
//    ctx.textAlign = txt_align;
    ctx.textAlign = select_align;
    ctx.textBaseline = txt_baseline;


    var text      = $textArea.val(),
        render_x  = txtArea_x *s,
        render_y  = txtArea_y *s;


    var _fillTextLine = function(ctx, text, x, y){
      var textList = text.split('\n');
      var lineHeight = ctx.measureText("あ").width;
      textList.forEach(function(text, i){

//          ctx.fillText(text, x, y + lineHeight * i);

    	//保存
		ctx.save();

		  //原点をテキスト挿入位置に変更
          ctx.translate(x, y);

          //回転
          ctx.rotate(select_angle * Math.PI / 180);

          //テキスト挿入
          ctx.fillText(text, 0, 0 + lineHeight * i);

        //保存状態に戻す
		ctx.restore();

      });
    };

    _fillTextLine(ctx, text, render_x, render_y);
    $loading.css('display', 'none');

//    var img_png_src = canvas.toDataURL();
//    $('#add').attr('src', img_png_src);

  };

});
