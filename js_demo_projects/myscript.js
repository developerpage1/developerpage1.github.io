// code for stopwatch
const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const btnReset = document.getElementById('btnReset');
let numSec = 0;
let numMiliSec = 0;
const txtSec = document.getElementById('sec');
const txtMiliSec = document.getElementById('milisec');
let myTimer;

// start button
btnStart.onclick = ()=> {
    clearInterval(myTimer);
    // set to 10 miliseconds
    myTimer = setInterval(startTimer, 10);

}

// stop button
btnStop.onclick = () => {
    clearInterval(myTimer);
}

// reset button
btnReset.onclick = () => {
    numSec = 0;
    numMiliSec = 0;
    txtSec.innerHTML = '00';
    txtMiliSec.innerHTML = '00';
    clearInterval(myTimer);
}
function startTimer() {
    numMiliSec++;
    if (numMiliSec > 99) {
        numSec++;
        numMiliSec = 0;
    }

    if (numMiliSec < 10) {
        txtMiliSec.innerHTML = '0' + numMiliSec;
    } else {
        txtMiliSec.innerHTML = numMiliSec;
    }
    txtSec.innerHTML = numSec;
    
}

// ---------------------------------------------------
//  digital clock
// ---------------------------------------------------

const txtclock = document.getElementById('clock');
let myclock;

myclock = setInterval(() => {
    let mydate = new Date();
   
    let secTwoDigit = '';
    let minTwoDigit = '';

    if (mydate.getSeconds() < 10) {
        secTwoDigit = '0';
    }

    if (mydate.getMinutes() < 10) {
        minTwoDigit = '0';   
    }
    txtclock.innerHTML = mydate.getHours() + ':' + minTwoDigit +
        + mydate.getMinutes() + ':' + secTwoDigit +
        + mydate.getSeconds();
}, 1000);


// -----------------------------------------------
//  calculator
// -----------------------------------------------

const numbers = document.querySelectorAll('[data-num]');
const operators = document.querySelectorAll('[data-operator]');
const txtcalculator = document.getElementById('txtcalculator');
let stringToCalculate = '';
let firstOperand = 0;
let secondOperand = 0;
let mathOperation = '';
let haveDot = false;

// event listeners for number click
for (let i = 0; i < numbers.length; i++){
    numbers[i].addEventListener('click', function (e) {

        let key = e.target.getAttribute('data-num');
        /*
            at = i show the result and reset the stringToCalculate
            so... if i want to do more math, reset the txtcalculator(start from 0)
        */
        if (stringToCalculate.length != txtcalculator.innerText.length) {
            stringToCalculate = '';
            txtcalculator.innerText = '';
       }
        // allow only one decimal separator per number TODO
        // need to fix this
       if (key === '.' && !haveDot) {
           haveDot = true;
       } else if (key === '.' && haveDot) {
           return;
       }

        
        txtcalculator.innerText += key;
        stringToCalculate += key;
    });
}

function clearOperation() {
    stringToCalculate = '';
    firstOperand = 0;
    secondOperand = 0;
    mathOperation = '';
}

function findSecondOperand() {
    // get second operand from string 1+1
    let indexOfMath = stringToCalculate.indexOf(mathOperation);
    let stringLength = stringToCalculate.length + 1;
    secondOperand = stringToCalculate.slice(indexOfMath + 1, stringLength);


}

// event listeners for operators
for (let i = 0; i < operators.length; i++){
    operators[i].addEventListener('click', function (e) {
        let key = e.target.getAttribute('data-operator');
        
        // check if we start a new math operation
         if (stringToCalculate.length != txtcalculator.innerText.length) {
            stringToCalculate = '';
            txtcalculator.innerText = '';
       }
        // no numbers, no math
        if ((stringToCalculate.length < 1) && (mathOperation.length < 1)) {
            return;
        }

       
        switch (key) {
            case 'C':
                // clear
                txtcalculator.innerText = '';
                clearOperation();
                break;
            
            case '=':
                // do the math
                try {
                    // find second operand from stringToCalculate
                    findSecondOperand();
                    let result = 0;
                    switch (mathOperation) {
                        case '+':
                            result = parseFloat(firstOperand) + parseFloat(secondOperand);
                            break;
                        case '-':
                            result = parseFloat(firstOperand) - parseFloat(secondOperand);
                            break;
                        case '*':
                            result = parseFloat(firstOperand) * parseFloat(secondOperand);
                            break;
                        case '/':
                            result = parseFloat(firstOperand) / parseFloat(secondOperand);
                            break;
                        default:
                            break;
                    }
                    txtcalculator.innerText = result; 
                    clearOperation();

                } catch  {
                    txtcalculator.innerText = 'Error'; 
                    clearOperation();
                }
                break;
            case '+':
                // math with two numbers (simple calculator)
                 if (mathOperation.length == 1) {
                    return;
                 }
                 mathOperation = '+';
                 // save first operand
                firstOperand = stringToCalculate;
                txtcalculator.innerText += key;
                stringToCalculate += key;
                break;
            case '-':
                 if (mathOperation.length == 1) {
                     return;
                }
                mathOperation = '-';
                // save first operand
                firstOperand = stringToCalculate;
                txtcalculator.innerText += key;
                stringToCalculate += key;
                
                break;
            case '*':
                 if (mathOperation.length == 1) {
                  return;
                 }
                 mathOperation = '*';
                 // save first operand
                firstOperand = stringToCalculate;
                txtcalculator.innerText += key;
                stringToCalculate += key;
                break;
            case '/':
                 if (mathOperation.length == 1) {
                     return;
                 }
                 mathOperation = '/';
                 // save first operand
                firstOperand = stringToCalculate;
                txtcalculator.innerText += key;
                stringToCalculate += key;
                break;
            default:
                txtcalculator.innerText += key;
                stringToCalculate += key;
                break;
            }
            

        haveDot = false;
    } )
}


// --------------------------------------------
// page 5 random gradient color generator
// --------------------------------------------
const randomGradient = document.getElementById('randomGradient');
const btnRandomGradient = document.getElementById('btnRandomGradient');
const randomGradientTxt = document.getElementById('randomGradientTxt');

btnRandomGradient.onclick = () => {
    // generate random hex number and use it to style bgcolor
    let color1 = Math.floor(Math.random() * 0xffffff).toString(16);
    let color2 = Math.floor(Math.random() * 0xffffff).toString(16);
    let randomAngle = Math.floor(Math.random() * 360);

    randomGradient.style.background = `linear-gradient(${randomAngle}deg, #${color1}, #${color2})`;
    randomGradientTxt.innerText = `linear-gradient(${randomAngle}deg, #${color1}, #${color2})`;
}

// --------------------------------------------
// page 6 todo list
// --------------------------------------------

const myUl = document.getElementById('myUl');
let myTask = document.getElementById('myTask');
const btnAddTask = document.getElementById('btnAddTask');
// const myList = document.getElementsByTagName('li');
const myList = myUl.getElementsByTagName('li');
const deleteTask = document.getElementsByClassName('close');




// model section ------------------------

let myTodoList;
const getTodoJSON = JSON.parse(localStorage.getItem("todoList"));

if (Array.isArray(getTodoJSON)) {
    myTodoList = getTodoJSON;
} else {
    myTodoList = [
        "code, code, code",
        "learn new things",
        "dont forget to have fun"
    ];
}
renderMyTodo();

function saveTodoJSON() {
    localStorage.setItem("todoList", JSON.stringify(myTodoList));
}

function btnClose(newTask) {
    // add close button (X on the right side of the list)
    const btnX = document.createElement('span');
    btnX.className = 'close';
    const txtClose = document.createTextNode('\u00d7');
    btnX.appendChild(txtClose);
    newTask.appendChild(btnX);
}

// view section ------------

function renderMyTodo() {
    // get items from array and append them to UL
    myUl.innerHTML = '';
    for (let i = 0; i < myTodoList.length; i++) {
        let element = `<li>${myTodoList[i]}</li>`;
        myUl.innerHTML += element;
    }

    // create close button on list items
    for (let i = 0; i < myList.length; i++){
        btnClose(myList[i]);
    }
}

// controller section --------------------

// add task
btnAddTask.onclick = function () {
    // must write a task
    if (myTask.value === '') {
        alert('You must write something!');
        return;
    }
    // create new list and add text(task)
    const newTask = document.createElement('li');
    const newTaskTxt = document.createTextNode(myTask.value);
    myTodoList.push(myTask.value);
    newTask.appendChild(newTaskTxt);

    myUl.appendChild(newTask);
    myTask.value = '';
    btnClose(newTask);
    
    // save to JSON
    saveTodoJSON();
}

// toggle and remove from list
myUl.addEventListener('click', (ev) => {
    // toggle list
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
    // delete todo from list
    if (ev.target.tagName === 'SPAN') {
        if (confirm('Are you sure you want to remove this task?')) {
            // get content of li element
            let txtContent = ev.target.parentElement.textContent;
            // get only li text content and not span
            txtContent = txtContent.slice(0, txtContent.length - 1);
            myTodoList = myTodoList.filter(todo => todo !== txtContent);
            renderMyTodo();
            // save to JSON
            saveTodoJSON();
        }
      
    }
});

// --------------------------------------------
// page 7 analog clock
// --------------------------------------------
const clockHour = document.getElementsByClassName('clock-h')[0];
const clockMin = document.getElementsByClassName('clock-min')[0];
const clockSec = document.getElementsByClassName('clock-sec')[0];
let analogWatch;

analogWatch = setInterval(() => {
    let analogClock = new Date();
    let myseconds = (analogClock.getSeconds()/60)*360;
    let myminutes = (analogClock.getMinutes()/60)*360 + (analogClock.getSeconds()/60)*6;
    let myhour = (analogClock.getHours()/12)*360 + (analogClock.getMinutes()/60)*30;

    clockHour.style.transform = `rotate(${myhour}deg)`;
    clockMin.style.transform = `rotate(${myminutes}deg)`;
    clockSec.style.transform = `rotate(${myseconds}deg)`;
}, 1000);

// -------------------------------------------
// page 8 bouncing balls
// -------------------------------------------
// create drawing area
const mycanvas = document.getElementById('mycanvas');
// adjusting width and height of the canvas
mycanvas.width = window.innerWidth - 100;
mycanvas.height = window.innerHeight - 100;

// magic paint brush
let cb = mycanvas.getContext('2d');

// random numbers function
function randomNum(min, max) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (num == 0) ? 1 : num;
    }

// hex number for color 
function randomHexColor() {
    return (Math.floor(Math.random() * 0xffffff).toString(16));
}

// first we make a class Balls
class Balls{
    constructor(x, y, dx, dy, radius, color){
        this.x = x;
        this.y = y;
        // bouncing speed - velocity
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.color = color;
    }

    // method for update
    update() {

        // keep the balls inside canvas
        if (this.x + this.radius > mycanvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;   
        }
         if (this.y + this.radius > mycanvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;   
        }
        
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
     // method for drawing a circle
    draw(){
        cb.beginPath();
        cb.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        cb.fillStyle = `#${this.color}`;
        cb.fill();
    }
}

// create circle from class
let happyballs;

function init() {

    happyballs = [];
//  number of balls
while (happyballs.length < 50) {
    // size of the balls
    let radius = randomNum(5, 30);

    let newball = new Balls(
        // start position
        randomNum(radius, mycanvas.width - radius),
        randomNum(radius, mycanvas.height - radius),
        // velocity, higher values => more valocity
        randomNum(-3, 3),
        randomNum(-3, 3),
        radius,
        randomHexColor());
    
    happyballs.push(newball);
}
}


// draw balls on canvas
function loop() {
    // clear the canvas on each loop
    // balls jumping around
    // cb.clearRect(0, 0, mycanvas.width, mycanvas.height);

    // balls with effect jumping around
    // bg color of the canvas
    cb.fillStyle = "rgba(255, 99, 71, 0.25)";
    cb.fillRect(0, 0, mycanvas.width, mycanvas.height);

    for (let i = 0; i < happyballs.length; i++) {
        happyballs[i].update();
    }
    
    requestAnimationFrame(loop);
}
init();
loop();

window.addEventListener('resize', () => {
    // resize canvas on browser resize
    mycanvas.width = window.innerWidth - 100;
    mycanvas.height = window.innerHeight - 100;

    // redraw all balls on browser resize
    init();
})

// -------------------------------------------
// page 9 modal
// -------------------------------------------
// 
const btnModal = document.getElementById('btnmodal');
const modal = document.getElementsByClassName('modal')[0];

// when u click button, show modal
btnModal.onclick = function () {
    modal.style.display = "block";
}

// when u click outside modal-content, close modal
window.onclick = function (e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

//---------------------------------------------
// page 10 typeahead
//---------------------------------------------

const search = document.getElementById('search')
const searchList = document.getElementsByClassName('searchList')[0];

search.onkeyup = function (e) {
    // input word
    const word = e.target.value;

    if (word.length > 0) {  
        // get list of matches from json file
        fetch('../json/country.json')
            .then(res => res.json())
            .then(data => {
                // get matches based on input word
                const matches = data.filter(state => state.toLocaleLowerCase().startsWith(word.toLocaleLowerCase()));
                    if (matches.length > 0) {
                        // render results
                        renderMatches(matches)
                    }           
            })
    } else {
        searchList.innerHTML = '';
    }
}
// render matches in UL
const renderMatches = (match) => {
    const html = match.map(state =>
        `<li onclick="selectedMatch(this)">${state}</li>`
    ).join('');
    searchList.innerHTML = html;
}
// pick country from the list
function selectedMatch(el) {
    search.value = el.textContent; 
    searchList.innerHTML = '';

}


//--------------------------------
// page 11 - datepicker
//--------------------------------

// date picker demo

const picker = document.getElementsByClassName('date-input')[0];
const calendar = document.getElementsByClassName('calendar')[0];
const frame = document.getElementsByClassName('frame')[0];
const monthYear = document.getElementsByClassName('month-year')[0];
const week = document.getElementsByClassName('week')[0];
const monthDays = document.getElementsByClassName('days')[0];

// prev and next buttons for month picker
const btnPickMonth = document.getElementsByClassName('btnPickMonth');
const buttonsPickMonth = Array.from(btnPickMonth);


let currentMonthNum;
let currentYearNum;
const monthCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const dayCount = [1, 2, 3, 4, 5, 6, 7];

// ------------------------
// model
// ------------------------

function initCalendar() {
    // get data for display month and year
    const d = new Date()
    picker.innerHTML = d.getDate() + '-'
        + (d.getMonth() + 1) + '-'
        + d.getFullYear();
    currentMonthNum = d.getMonth();
    currentYearNum = d.getFullYear();
    monthYear.innerHTML = d.toLocaleString('default', { month: 'long' }).toUpperCase() + ', ' + d.toLocaleString('default', { year: 'numeric' });

    // names for days
    populateWeek();
    renderMonthDaysGrid();
}

// names for days in the week
function populateWeek() {
    // set to show named days from 0-6(sat-sun)
    const a = new Date(2022, 7, 21);
    let dayNames = []
    let txt = '';
    for (let i = 0; i < 7; i++){
        dayNames.push(a.toLocaleString('default', { weekday: 'short' }).toUpperCase());
        a.setDate(a.getDate() + 1);
     
    }
       txt = dayNames.map(day => `<div>${day.substring(0, 3)}</div>`).join('');
        // console.log(txt);
    week.innerHTML = txt;
}

// leap year
function isThisLeapYear(year) {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}

// btn logic for prev and next month
function btnMonthLogic(num) {
    if (num) {
        // if prev month
        currentMonthNum--;
        if (currentMonthNum < 0) {
            currentMonthNum = 11;
            currentYearNum--;
        }
    } else {
        // if next month
        currentMonthNum++;
        if (currentMonthNum == 12) {
            currentMonthNum = 0;
            currentYearNum++;
        }
    }
    renderMonthYear(currentMonthNum, currentYearNum);
    renderMonthDaysGrid();
}

// initial setup
initCalendar();

// --------------------------
// view
// --------------------------

// render month and year
function renderMonthYear(month, year) {
    const pickNewDate = new Date(year, month);
    monthYear.innerHTML = pickNewDate.toLocaleString('default', { month: 'long' }).toUpperCase() + ', ' + pickNewDate.toLocaleString('default', { year: 'numeric' });
}

// when u click on day, show date in date-input
function pickDate(year, month, day) {
    picker.innerHTML = `${day}-${month + 1}-${year}`;
    currentMonthNum = month;
    currentYearNum = year;
    renderMonthYear(month, year);
}

// render days of the month in right position in grid
function renderMonthDaysGrid() {

    let daysInMonth = 0; 
    let leapYear = 0;
    // if month = 1, check for leap year (29 days)
    if (currentMonthNum === 1) {
        leapYear = isThisLeapYear(currentYearNum) ? 1 : 0;
    }

    daysInMonth = monthCount[currentMonthNum] + leapYear;
    const firstDayOfTheMonth = new Date(currentYearNum, currentMonthNum, 1).getDay();
    const prevMonthDays = firstDayOfTheMonth ;
    const totalDays = daysInMonth + prevMonthDays ;
   
    // display days grid
    let txt = '';
    monthDays.innerHTML = '';
    for (let i = 0; i < totalDays; i++) {
        
        if (i >= prevMonthDays) {
            txt = `<div onclick="pickDate(${currentYearNum}, ${currentMonthNum},${i + 1 - prevMonthDays})">${i + 1 - prevMonthDays}</div>`;
            monthDays.innerHTML += txt; 
        } else {
            txt = `<div></div>`;
            monthDays.innerHTML += txt; 
        }
    }
}

// ------------------------------------------
// controller
// ------------------------------------------

buttonsPickMonth.forEach(btn => {
    btn.addEventListener('click', function(){
        const prev = (this.classList.contains('prev')) ? 1 : 0;
        btnMonthLogic(prev);
    })
})

// toggle calendar when you click on picker
picker.onclick = function () {
    calendar.classList.toggle('active');
}
document.addEventListener('click', function(e) {
    if (e.target == frame) {
        calendar.classList.remove('active')
    }
})