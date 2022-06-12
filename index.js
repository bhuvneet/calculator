// add event handler to the number buttons clicked.
let prevNum = -1;
let currNum = -1;
let num = document.getElementsByClassName("number");
for (let i = 0; i < num.length; i++)
{
    num[i].addEventListener("click", () =>
{
    // store previous and new number clicked in variables
    prevNum = currNum;
    currNum = num[i].textContent;
    console.log('prev num= ' + prevNum);
    console.log('curr Num= ' + currNum);
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
        else if (whichOperation === "*")
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
    return (prevNum + currNum);
};

function subtract (prevNum, currNum)
{
    return (prevNum - currNum);
};

function divide (prevNum, currNum)
{
    return (prevNum / currNum);
};

function multiply (prevNum, currNum)
{
    return (prevNum * currNum);
};

function mod (prevNum, currNum)
{
    return (prevNum % currNum);
};