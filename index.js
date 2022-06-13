// add event handler to the number buttons clicked.
let result = -1;
let prevNum = -1;
let currNum = -1;
let num = document.getElementsByClassName("number");
for (let i = 0; i < num.length; i++)
{
    num[i].addEventListener("click", () =>
{
    // append number as number buttons are clicked + update display
    // store previous and new number clicked in variables
    if (result === -1) // if there's no prior calculation done
    {
        // to be able to add more than 1 digit number
        prevNum = currNum;
        currNum = num[i].textContent;
        updateDisplay(currNum);
        console.log('prev num= ' + prevNum);
        console.log('curr Num= ' + currNum);
    }
    else
    {
        prevNum = result;
        currNum = num[i].textContent;
        updateDisplay(currNum);
        console.log('prev num= ' + prevNum);
        console.log('curr Num= ' + currNum);
    }
})}


// add event handler to operation buttons clicked
let whichOperation = 0;
let operation = document.getElementsByClassName("operation");
for (let i = 0; i < operation.length; i++)
{
    operation[i].addEventListener("click", () =>
{
    whichOperation = operation[i].textContent;
    console.log(whichOperation);
})}

// once equals button is clicked, invoke operate()
let equals = document.getElementById("equals");
equals.addEventListener("click", operate); 

// store 1st num when user presses operator
// save which operation
// operate on the numbers
function operate ()
{
    //console.log(prevNum, currNum, whichOperation);
    //let num1 = temp;    // store value of argument in a temp variable
    //let num2 = temp;    // assign the value of temp to a new variable
    if (prevNum === -1 && currNum === -1 && whichOperation === 0)
    {
        return;
    }
    else
    {
        if (whichOperation === "+")
        {
            add(prevNum, currNum);
        }
        else if (whichOperation === "-")
        {
            subtract(prevNum, currNum);
        }
        else if (whichOperation === "x")
        {
            multiply(prevNum, currNum);
        }
        else if (whichOperation === "/")
        {
            divide(prevNum, currNum);
        }
        else if (whichOperation === "%")
        {
            mod(prevNum, currNum);
        }
    }
}

// operate on nums
function add (prevNum, currNum)
{
    result = +prevNum + +currNum;
    updateDisplay(result);
};

function subtract (prevNum, currNum)
{
    result = +prevNum - +currNum;
    updateDisplay(result);
};

function divide (prevNum, currNum)
{
    result = +prevNum / +currNum;
    updateDisplay(result);
};

function multiply (prevNum, currNum)
{
    result = +prevNum * +currNum;
    updateDisplay(result);
};

function mod (prevNum, currNum)
{
    result = ((+prevNum) % (+currNum));
    updateDisplay(result);
};

let display = document.getElementById("display");
function updateDisplay (result)
{
    document.getElementById("display").value = result;
}

let undo = document.getElementById("undo");
undo.addEventListener("click", () =>
{
    display.value = '';
})

/*
let clear = document.getElementById("clear");
let valueInDisplay = document.getElementById("display");
clear.addEventListener("click", () =>
{
    let len = valueInDisplay.length;
    valueInDisplay.length = len - 1;
})*/