$(function(){//jQuery start

    let cnvs = document.getElementById("canvas"); // htnlからidを元にcanvas要素を取得
    let ctx = cnvs.getContext("2d");//２dで線やボックスを描画できるメソッド

    //変数と定数を事前に宣言、初期値を定義
    const cnvWidth = 500;//canvas自体の横幅
    const cnvHeight = 300;//canvas自体の高さ
    let lineColor = "red";//デフォルトのペンの色
    let lineWeight = 5;//デフォルトのペンの太さ
    let clickFlag = 0;//デフォルトのクリック判定値
    let bgColor = "white";//canvasの背景色

    // 背景色を設定
    function setBgColor(){
        ctx.fillStyle = bgColor;//塗りつぶしの色を変数bgColorの値にセット
        ctx.fillRect(0,0,cnvWidth,cnvHeight);//四角形で塗りつぶし
    }
    setBgColor();

    // クリック判定をする
    $("#canvas").on("mousedown",function(){//マウス押下されたとき
        clickFlag = 1;
    }).on("mouseup",function(){
        clickFlag = 0;
    }).on("mousemove",function(e){
        if(!clickFlag) return false;
        draw(e.offsetX,e.offsetY);
    })

    // お絵描きをする
    function draw(x,y){
        ctx.lineWidth = lineWeight;
        ctx.strokeStyle =lineColor;
        if(clickFlag=="1"){
            clickFlag = 2;
            ctx.beginPath();//最初のパスを打つために前のパスをリセット(最後のパスをリセット)
            ctx.lineCap = "round";
            ctx.moveTo(x,y);//最初のパスを打つ
        }else{
            ctx.lineTo(x,y);//パスの輪郭を作る
        }
        ctx.stroke();//線を描画する
    }

    // ペンの色を変更
    $(".color a").on("click",function(){
        lineColor = $(this).data("color");
        return false;
    })

    // ペンの太さを変更
    $(".weight a").on("click",function(){
        lineWeight = $(this).data("weight");
        return false;
    })    
        // 全部消す
        $("#clear").click(function(){
            ctx.clearRect(0,0,cnvWidth,cnvHeight);
            setBgColor();
        });

        // canvasを画像として保存
        $("#download").click(function(){
            var canvas = document.getElementById("canvas");
            var base64 = canvas.toDataURL("image/jpag");
            document.getElementById("download").href = base64;
        });



})//jQuery end


function twitText() {
    var s, url;
    s = "jsでついったーを開いて投稿しているよ!%23sunabaco %23復習講座 %23canvas講座";
    url = document.location.href;
    
    if (s != "") {
        if (s.length > 140) {
            //文字数制限
            alert("テキストが140字を超えています");
        } else {
            //投稿画面を開く
            url = "http://twitter.com/share?url=" + escape(url) + "&text=" + s;
            window.open(url,"_blank","width=600,height=300");
        }
    }
}