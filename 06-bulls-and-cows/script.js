const first = document.querySelector("#first")
const second = document.querySelector("#second")
const third = document.querySelector("#third")
const fourth = document.querySelector("#fourth")
const result = document.querySelector("#result")

var wish = '';



function makeNum() {
    var a = '';
   
    for (var i = 0; i < 4;) {
        var n = '';
        n = String(Math.round(Math.random() * 9));
        if (a.indexOf(n)==-1 ){
        a += n;
        i++;
        }
}
    return a;
}

const Num = makeNum();
console.log(Num)

btm = document.querySelector(' input[type="button"]')
btm.addEventListener('click', handleCount)

function handleCount() {
    let message;
    wish += first.value;

    if(wish.indexOf(second.value)==-1){
    wish += second.value;
    }

    if(wish.indexOf(third.value)==-1){
         wish += third.value;
         }

    if(wish.indexOf(fourth.value)==-1){
     wish += fourth.value;
     }

     if(wish.indexOf('-')!=-1){
        wish ='';}

    console.log(wish)

    if (wish.length !== 4) {
        message = `<div>введите неповторяющееся цифры от 0 до 9 </div>`;
        result.innerHTML += message;
        wish ='';
    }
    else if (wish == Num) {
        message = 'Вы выиграли!';
        result.innerHTML += message;
        wish ='';
    } else {

        let bulls = 0;
        let cows = 0;

        for (let i = 0; i < wish.length; i++) {
            const index = Num.indexOf(wish[i]);
            if (index === i) {
                bulls++;
            }
            else if (index > -1) {
                cows++;
            }
        }
        result.innerHTML += `<div>${wish} - ${bulls} быков,  ${cows} коров </div>`;
        wish ='';
    }
}