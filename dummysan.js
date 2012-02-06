// widthとheightを文字列から抽出する
var parseInput = function (argString) {
    // "320 200", "120,200", "240x80" などにマッチ
    // 所々に空白を許すやさしい仕様
    var regexInput = /^(?:\u0020*)(\d{1,3})(?:\u0020*[\u0020,x]\u0020*)(\d{1,3})(?:\u0020*)$/;
    var arrayResult = [];

    // マッチしたら中身を普通の数値に変換
    if (regexInput.test(argString)) {
        var arrayParsed = argString.match(regexInput).slice(1);
        var i = 0,
            l = arrayParsed.length;
        for (i; i < l; i++) {
            arrayResult[i] = parseInt(arrayParsed[i], 10);
        }
    }
    return arrayResult;
}

// ダミー画像の描画
var createDummy = function (width, height) {

    // 不正な値ならさよなら
    if (!_isNumber(width) || !_isNumber(height)) {
        return;
    }

    // canvas要素を生成
    var canvas = document.createElement('canvas');

    // 幅と高さをcanvasにセット
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    // ダミー画像を描画
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

    // canvas要素を返す
    return canvas;
}

// 整数判定
// Good Partsからもってきた
var _isNumber = function (suspect) {
    return typeof suspect === 'number' && isFinite(suspect);
}

