const area = document.querySelector('.area');
const boxes = document.querySelectorAll('.box');
let move = 0;
let usedBoxes = 0;
let result ;
const contentWrapper = document.querySelector('.content');
const moduleResult = document.querySelector('.result-wrapper');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.btn-close');
const btnReset = document.querySelector('.btn-reset');
let xMark = '<img src="./assets/svg/X.png" alt="X" class="XO">';
let oMark = '<img src="./assets/svg/O.png" alt="O" class="XO">';
let xWins = document.querySelector('.x-wins');
let oWins = document.querySelector('.o-wins');
let draws = document.querySelector('.draws');
let xScore = 0;
let oScore = 0;
let drawScore = 0;

area.addEventListener('click', e => {
    if (e.target.className === 'box') {
        move % 2 === 0 ? e.target.innerHTML = xMark : e.target.innerHTML = oMark;
        move++;
        e.target.classList.add('active');
        check();
    }
})

const check = () => {
    const arr = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    

    for(i = 0; i < arr.length; i++) {
        if (boxes[arr[i][0]].innerHTML == xMark && boxes[arr[i][1]].innerHTML == xMark && boxes[arr[i][2]].innerHTML == xMark) {
            result = 'Xs';
            prepareResult1(result);
        } else if (boxes[arr[i][0]].innerHTML == oMark && boxes[arr[i][1]].innerHTML == oMark && boxes[arr[i][2]].innerHTML == oMark) {
            result = 'Os';
            prepareResult2(result);
        } 
    }
    if (move == 9 && result === undefined) {
        result = 'Draw';
        prepareResult3(result);
    }
}

const prepareResult1 = winner => {
    contentWrapper.innerHTML = `${winner} won in ${move} moves`;
    xScore++;
    xWins.innerHTML = `${winner}: ${xScore}`;
    moduleResult.style.display = 'block';
}

const prepareResult2 = winner => {
    contentWrapper.innerHTML = `${winner} won in ${move} moves`;
    oScore++;
    oWins.innerHTML = `${winner}: ${oScore}`;
    moduleResult.style.display = 'block';
}

const prepareResult3 = winner => {
    contentWrapper.innerHTML = `${winner}`;
    drawScore++;
    draws.innerHTML = `${winner}s: ${drawScore}`;
    moduleResult.style.display = 'block';
}

const closeModule = () => {
    moduleResult.style.display = 'none';
    boxes.forEach(square => {
        square.innerHTML = '';
        square.classList.remove('active');
    });
    result = undefined;
    move = 0;
}

const reloadPage = () => {
    location.reload();
}

overlay.addEventListener('click', closeModule);
btnClose.addEventListener('click', closeModule);
btnReset.addEventListener('click', reloadPage);
