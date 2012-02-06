// dummysan.js ver. 2012-02-07

// Namespace
var Dummysan = {};

// widthとheightを文字列から抽出する
Dummysan.parse = function (string) {
    // "320 200", "120,200", "240x80" などにマッチ
    // 所々に空白を許すやさしい仕様
    var re = /^(?:\u0020*)(\d+)(?:\u0020*[\u0020,x]\u0020*)(\d+)(?:\u0020*)$/;
    var result = [],
        parsed, i, l;

    // マッチしたら中身を普通の数値に変換
    if (re.test(string)) {
        var parsed = string.match(re).slice(1);
        for (i = 0, l = parsed.length; i < l; i++) {
            result[i] = parseInt(parsed[i], 10);
        }
    }
    return result;
}

// ダミー画像の描画
Dummysan.create = function (width, height) {

    // 不正な値ならさよなら
    if (!Dummysan._isNumber(width) || !Dummysan._isNumber(height)) {
        return;
    }

    // canvasをつくって幅と高さをセット
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    var ctx = canvas.getContext('2d');

    // 薄い灰色のグラデーションで塗りつぶす
    ctx.beginPath();
    var gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width/2);
    gradient.addColorStop(0, '#ccc');
    gradient.addColorStop(1, '#bbb');
    ctx.fillStyle = gradient;
    ctx.rect(0, 0, width, height);
    ctx.fill();

    // テキストの基本スタイル
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    ctx.shadowBlur = 5;
    ctx.shadowColor = '#666';
    ctx.font = 'bold 20px Trebuchet MS';

    // フォントの大きさは幅によって変える
    if (width < 36 || height < 19) {
        ctx.fillStyle = '#000'
        ctx.font = '11px Trebuchet MS';
        ctx.shadowBlur = 0;
    }
    if (width < 76) {
        ctx.font = 'bold 15px Trebuchet MS';
    }

    // テキストを描画する
    ctx.fillText(width + '×' + height, width/2, height/2);

    return canvas;
}

// 整数判定
// Good Partsからもってきた
Dummysan._isNumber = function (suspect) {
    return typeof suspect === 'number' && isFinite(suspect);
}

