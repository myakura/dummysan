/** Dummysan */

// window, documentをわたす関数オブジェクトをつくる
(function (window, document){
// どっちもなかったらアウト
if (!(window && document)) return;

// Canvasなかったらアウト
var canvas = document.createElement('canvas');
if (!(canvas.getContext && canvas.getContext('2d'))) return;

// ダミーさんです
var Dummysan = window.Dummysan = {
    version : '2012-06-20'
};

Dummysan.parseInput = function (string) {
    // "320 200", "120,200", "240x80" などにマッチ
    var re = /^(?:\u0020*)(\d+)(?:\u0020*[\u0020,x]\u0020*)(\d+)(?:\u0020*)$/;
    var result = [];

    // マッチしたら中身を普通の数値に変換
    if (re.test(string)) {
        var parsed = string.match(re).slice(1);
        for (var i = 0, l = parsed.length; i < l; i++) {
            result[i] = parseInt(parsed[i], 10);
        }
    }
    return result;
};

Dummysan.createDummyImageCanvas = function (width, height) {
    if (!(Number.isInteger(width) && Number.isInteger(height))) return;

    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');

    // 背景を塗る
    ctx.fillStyle = '#bbb';
    ctx.fillRect(0, 0, width, height);

    // テキストの基本スタイル
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px Trebuchet MS';

    // フォントの大きさは幅によって変える
    if (width < 36 || height < 19) {
        ctx.fillStyle = '#000'
        ctx.font = '11px Trebuchet MS';
    }
    if (width < 76) {
        ctx.font = 'bold 15px Trebuchet MS';
    }

    // テキストを描画する
    ctx.fillText(width + '×' + height, width / 2, height / 2);

    return canvas;
};

Dummysan.createDummyImage = function (width, height) {
    var dummyImageCanvas = Dummysan.createDummyImageCanvas(width, height);
    var img = new Image();
    img.src = dummyImageCanvas.toDataURL();
    return img;
}

}(this, this.document));