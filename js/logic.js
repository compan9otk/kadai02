let deck = [1,2,3,4,5,6,7,8,9,10,11,12,13,
            15,16,17,18,19,20,21,22,23,24,25,26,27,
            29,30,31,32,33,34,35,36,37,38,39,40,41,
            43,44,45,46,47,48,49,50,51,52,53,54,55];
let dealerScore = 0;
let playerScore = 0;
let dealerAce = 0;
let playerAce = 0;

//山札をシャッフルする
const shuffleDeck = (array) => {
    const cloneArray = [...array]
    for (let i = cloneArray.length - 1; i >= 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1))
      let tmpStorage = cloneArray[i]
      cloneArray[i] = cloneArray[rand]
      cloneArray[rand] = tmpStorage
    }
    return cloneArray
  }
//山札からカードを1枚引く
const drawCard = (who='player')=>{
    let card = deck.shift();
    if(who === 'player'){
        $('#player').append(`<img class="card" src="image/torannpu-illust${card}.png" alt="トランプの画像">`);
        if((card % 14) === 1){
            playerScore += 11;
            playerAce ++;
        }else if((card % 14) < 10){
            playerScore += (card % 14);
        }else{
            playerScore += 10;
        }
        //Aがあるときにスコアが21を超えてしまったときの処理
        if(playerScore > 21 && playerAce >0){
            playerScore -= 10;
            playerAce --;
        }
        $('#player-score').html(`score: <span class="score"> ${playerScore}</span>`);
    }else{
        $('#dealer').append(`<img class="card" src="image/torannpu-illust${card}.png" alt="トランプの画像">`);
        if((card % 14) === 1){
            dealerScore += 11;
            dealerAce ++;
        }else if((card % 14) < 10){
            dealerScore += (card % 14);
        }else{
            dealerScore += 10;
        }
        //Aがあるときにスコアが21を超えてしまったときの処理
        if(dealerScore > 21 && dealerAce >0){
            dealerScore -= 10;
            dealerAce --;
        }
        $('#dealer-score').html(`score: <span class="score"> ${dealerScore}</span>`);
    }
}
//Startボタンを押す
$('#start').on('click',()=>{
    $('#start').hide();
    $('.btn').show();
    deck = shuffleDeck(deck);
    drawCard('dealer');
    $('#dealer').append(`<img class="card dummy" src="image/torannpu-illust.png" alt="トランプの画像">`);
    drawCard();
    drawCard();
})
//Hitボタンを押す
$('#hit').on('click',()=>{
    drawCard();
    if(playerScore > 21){
        $('#stand').hide();
        $('#hit').hide();
        $('#retry').show();
        $('.lose').show();
    }
})
//Standボタンを押す
$('#stand').on('click',()=>{
    $('.dummy').remove();
    while(dealerScore < 17){
        drawCard('dealer');
    }
    if(dealerScore > 21){
        $('.win').show();
    }else if(dealerScore === playerScore){
        $('.draw').show();
    }else if(dealerScore > playerScore){
        $('.lose').show();
    }else{
        $('.win').show();
    }
    $('#stand').hide();
    $('#hit').hide();
    $('#retry').show();
})
//Retryボタンを押す
$('#retry').on('click',()=>{
    $('.btn').show();
    $('.retry').hide();
    $('.lose').hide();
    $('.win').hide();
    $('.draw').hide();
    $('.card').remove();
    deck = [1,2,3,4,5,6,7,8,9,10,11,12,13,
            15,16,17,18,19,20,21,22,23,24,25,26,27,
            29,30,31,32,33,34,35,36,37,38,39,40,41,
            43,44,45,46,47,48,49,50,51,52,53,54,55];
    dealerScore = 0;
    playerScore = 0;
    dealerAce = 0;
    playerAce = 0;
    deck = shuffleDeck(deck);
    drawCard('dealer');
    $('#dealer').append(`<img class="card dummy" src="image/torannpu-illust.png" alt="トランプの画像">`);
    drawCard();
    drawCard();
})