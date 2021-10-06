let order = [];
let clickedOrder = [];
let score = 0;


//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
let pontosView = document.querySelector('.pontuacao_score');
const genius = document.querySelector('.genius');
const pontuacao = document.querySelector('.pontuacao');
const button = document.querySelector('button');
const audio_red = document.querySelector('.audio_red');
const audio_blue = document.querySelector('.audio_blue');
const audio_green = document.querySelector('.audio_green');
const audio_yellow = document.querySelector('.audio_yellow');
const audio_gameover = document.querySelector('.audio_gameover');

//cria ordem aletoria de cores
let shuffleOrder = () => {
    //console.log(`shuffleorder`)
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];
    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende a proxima cor
let lightColor = (element, number) => {
    const timers = timeForScore(number);
    //console.log(timers)
     setTimeout(() => {
         document.querySelector(`.audio_${element.classList}`).play();
         element.classList.add('selected');
    },  timers[0]);
    setTimeout(() => {
        element.classList.remove('selected');
    }, timers[1]);
}

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
     //console.log(clickedOrder,order)
    for(let i in clickedOrder) {
        if (clickedOrder[i] !== order[i]) {
            
            //console.log("error")
            gameOver();
            return false
            break;

        }
    }
    
    if(clickedOrder.length === order.length) {
        //alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        //console.log("acertou")
        nextLevel();
    }
}

//funcao para o clique do usuario
let click = (color) => {
    
    
    let gameovers = genius.classList.contains('gameover')

    if (!gameovers) { 
    //console.log(`click${color}${genius.classList.contains('gameover')}`)
    clickedOrder[clickedOrder.length] = color;
        console.log(`.audio_${createColorElement(color).classList}`)
        document.querySelector(`.audio_${createColorElement(color).classList}`).play();
        createColorElement(color).classList.add('selected');
   
    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}   
    
    
}

//funcao que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    //console.log(`nextleveu - ${score}`)
    score++;
    pontosView.innerText = score;
    shuffleOrder();
}

//funcao para game over
let gameOver = () => {
    audio_gameover.play();
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];
    //console.log(`score:${score}`)
    pontosView.innerText = '0';
    genius.classList.add('gameover');
    pontuacao.classList.add('gameover');
    button.style.display = 'block';
    
    green.classList.remove('selected');
    red.classList.remove('selected');
    yellow.classList.remove('selected');
    blue.classList.remove('selected');
    //playGame();
}


//função pra diminuir o tempo ao nivel do score
const timeForScore = (number) => {
    console.log("score",score)
    if (score <= 10)
        return [number*1000,(number*1000)+1000]
    if (score > 10 && score <=20)
        return [number*1000,(number*1000)+500]
    if (score > 20 && score <=30)
        return [number*500,(number*500)+500]
    if (score > 30 )
        return [number*500,(number*500)+250]
    
}

//funcao de inicio do jogo
let playGame = () => {
    //alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    genius.classList.remove('gameover');
    pontuacao.classList.remove('gameover');
    button.style.display='none';
    score = -1;
    nextLevel();
   
}

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


//inicio do jogo
//playGame();