var rand = function(start, end) {
    var n = end - start + 1;
    var r = Math.random() * n;
    var f = Math.floor(r);
    return f + start;
}

var card = [];


var CardOutput = function(i) {
    var cardname = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    return cardname[i];
}

var testCard = function() {
    // 宣告花色計數器
    var CardColorCount = [];
    for (var i = 0; i < 4; i++) {
        CardColorCount[i] = 0;
    }

    // 宣告點數計數器
    var CardIndex = [];

    var CardPointCount = [];
    for (var i = 0; i < 13; i++) {
        CardIndex[i] = i;
        CardPointCount[i] = 0;
    }

    // 統計出現花色和點數的次數
    for (var i = 0; i < 5; i++) {
        var c = card[i] - 1;
        color = c % 4;
        CardColorCount[color]++;
        point = Math.floor(c / 4);
        CardPointCount[point]++;
    }



    // 對 point 出現的次數排序
    for (var i = 0; i < 13; i++) {
        var max = CardPointCount[i];
        var max_i = i;
        for (var j = i + 1; j < 13; j++) {
            if (CardPointCount[j] > max) {
                max = CardPointCount[j];
                max_i = j;
            }
        }

        var tmp = CardPointCount[max_i]
        CardPointCount[max_i] = CardPointCount[i]
        CardPointCount[i] = tmp

        var tmp2 = CardIndex[max_i]
        CardIndex[max_i] = CardIndex[i]
        CardIndex[i] = tmp2

    }



    // 判斷是否為同花
    var isSameColor = false;
    for (var i = 0; i < 4; i++) {
        if (CardColorCount[i] == 5) {
            isSameColor = true;
            break;
        }
    }


    //判斷是否為順子
    var isStroing = true;
    for (var i = 0; i < 5; i++) {
        if (CardPointCount[i] != 1) {
            isStroing = false;
            break;
        }
    }


    var CheckStoring = function(bigger) {
        // 將牌號 A 找出來，若 bigger 為 true 則 A 當 13，否則 A 當 0

        var index = [];
        for (var i = 0; i < CardIndex.length; i++) {
            index[i] = CardIndex[i];
        }

        for (var i = 0; i < 13; i++) {
            if (index[i] == 0) {
                if (bigger == true)
                    index[i] = 13
                else
                    index[i] = 0
                break;
            }
        }

        // 清掉沒有牌的牌號
        for (var i = 0; i < 13; i++) {
            if (CardPointCount[i] == 0) {
                index[i] = 0
            }
        }


        index.sort((a, b) => {
            return (a - b)
        });
        index.reverse();

        isStroing = true;
        for (var i = 0; i < 4; i++) {
            if (index[i] - index[i + 1] != 1) {
                isStroing = false;
                break;
            }
        }
        return isStroing
    };


    var isStroing1 = false //用來將 A 當做是  1 的時候是否為順子
    var isStroing2 = false //用來將 A 當做是 14 的時候是否為順子
    if (isStroing) {
        isStroing1 = CheckStoring(false)
        isStroing2 = CheckStoring(true)
    }

    // 若是大順又是同花
    if (isSameColor && isStroing2) {
        $('#result').val('同花大順');
        return;
    }

    // 若是同花順
    if (isSameColor && isStroing1) {
        $('#result').val('同花順');
        return;
    }

    // 若是同花
    if (isSameColor) {
        $('#result').val('同花');
        return;
    }

    // 若是順子
    if (isStroing1 || isStroing2) {
        $('#result').val('順子');
        return;
    }


    // 判斷是否為鐵支
    if (CardPointCount[0] == 4) {
        $('#result').val(CardOutput(CardIndex[0]) + " 鐵支")
        return;
    }

    // 判斷是否為葫蘆
    if (CardPointCount[0] == 3 && CardPointCount[1] == 2) {
        $('#result').val(CardOutput(CardIndex[0]) + " " + CardOutput(CardIndex[1]) + " 葫蘆")
        return;
    }

    // 判斷是否為三條
    if (CardPointCount[0] == 3) {
        $('#result').val(CardOutput(CardIndex[0]) + " 三條")
        return;
    }

    // 判斷是否為二對
    if (CardPointCount[0] == 2 && CardPointCount[1] == 2) {
        $('#result').val(CardOutput(CardIndex[0]) + " " + CardOutput(CardIndex[1]) + " 兩對")
        return;
    }

    // 判斷是否為一對
    if (CardPointCount[0] == 2 && CardPointCount[1] == 1) {
        $('#result').val(CardOutput(CardIndex[0]) + " 一對")
        return;
    }

    $('#result').val("沒牌型");
}

$('#deal').on('click', function() {
    $('#data').empty();
    card = [];
    var poker = [];
    for (var i = 1; i <= 52; i++) {
        poker.push(i);
    }

    // 洗牌
    for (var i = 1; i <= 520; i++) {
        var r = rand(1, 52) - 1;
        var t = poker[0];
        poker[0] = poker[r];
        poker[r] = t;
    }

    // 取前五張
    for (var i = 0; i < 5; i++) {
        card.push(poker[i]);
    }

    // 將撲克牌顯示在螢幕上
    for (var i = 0; i < card.length; i++) {
        $img = $('<img>').attr('src', './poker/pic' + card[i] + '.png');
        $col = $('<div>').attr('class', 'col-2 text-center').append($img);
        $('#data').append($col);
    }

});

$('#test').on('click', testCard);