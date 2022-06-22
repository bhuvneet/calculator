// add event handler to the number buttons clicked.
let result = '';
let prevNum = '';
let currNum = '';
let newNum = '';

let num = document.getElementsByClassName("number");
for (let i = 0; i < num.length; i++)
{
    num[i].addEventListener("click", () => 
{
    console.log("clicked")
    // append number as number buttons are clicked + update display
    // store previous and new number clicked in variables
    if (result === '') // if there's no prior calculation done
    {
        if (whichOperation != 0)    // operator is clicked; don't append to currNum
        {   // second operand
            currNum += num[i].textContent;
            updateDisplay(currNum);   
        }

        else
        {   // first operand
            prevNum += num[i].textContent;
            updateDisplay(prevNum);
        }

        console.log('prevNum = ' + prevNum);
        console.log('currNum = ' + currNum);
    }
    else    // if prior calculation was done i.e. result != -1
    {
        prevNum = result;
        currNum += num[i].textContent;
        
        updateDisplay(currNum);  

        console.log('prevNum = ' + prevNum);
        console.log('currNum = ' + currNum);
    }
})};

document.addEventListener('keydown', (event) =>
{
    console.log("key down works");
    let keyName = event.key;
    console.log("keyCode = ", keyName);
    
    if (isFinite(keyName)) // number id pressed
    {
        console.log("its a number!");
        if (result === '') // if there's no prior calculation done
        {
            if (whichOperation != 0)    // operator is clicked; don't append to currNum
            {   // second operand
                currNum += keyName;
                updateDisplay(currNum);   
            }
    
            else
            {   // first operand
                prevNum += keyName;
                updateDisplay(prevNum);
            }
    
            console.log('prevNum = ' + prevNum);
            console.log('currNum = ' + currNum);
        }
        else    // if prior calculation was done i.e. result != -1
        {
            prevNum = result;
            currNum += keyName;
            
            updateDisplay(currNum);  
    
            console.log('prevNum = ' + prevNum);
            console.log('currNum = ' + currNum);
        }
    }

    else if (keyName === "+" || keyName === "-" || keyName === "/" 
    || keyName === "*" || keyName === "%") // operation is pressed
    {
        console.log("operation works")
        whichOperation = keyName;
        updateDisplay(whichOperation);
    }

    else if (keyName === "=" || keyName === "Enter")
    {
        operate();
    }

    else
    {
        return;
    }
});

// add event handler to operation buttons clicked
let whichOperation = 0;
let operation = document.getElementsByClassName("operation");
for (let i = 0; i < operation.length; i++)
{
    operation[i].addEventListener("click", () =>
{
    whichOperation = operation[i].textContent;
    updateDisplay(whichOperation);  // add operation to display
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
        else if (whichOperation === "x" || whichOperation === '*')
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

        currNum = '';   // clear currNum value to store new value after result is computed.
        whichOperation = '';
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
let clearPrev = document.getElementById("display");
function updateDisplay (value)
{
    document.getElementById("display").value = value;
    console.log('value in display:' + value);
}

let undo = document.getElementById("undo");
undo.addEventListener("click", () =>
{
    display.value = '';
    currNum = '';
    prevNum = '';
    newNum = '';
    result = '';
})

// clear last digit from display
let clear = document.getElementById("clear");
let valueInDisplay = document.getElementById("display");
clear.addEventListener("click", () =>
{
    valueInDisplay.value = valueInDisplay.value.slice(0, -1);
    this.value = valueInDisplay.value;
    //prevNum = valueInDisplay.value;
    //currNum = valueInDisplay.value;
    
    console.log('new value:' + this.value);
    if (currNum === '' && whichOperation === 0) // update first operand
    {
        prevNum = this.value;
        console.log('prevNum: ' + prevNum);
    }
    else if (currNum != '' && whichOperation != '')  // update second operand
    {
        currNum = this.value;
        console.log('currNum: ' + currNum);
    }
    else if (prevNum != '')
    {
        whichOperation = this.value;
        console.log('whichOperation: ' + whichOperation);
    }
    // update first or second operand 
    // depending upon if operation button has been clicke.
    /*if (isNaN(this)) // if the value being cleared is an operation
    {
        whichOperation = valueInDisplay.value;
    }
    else
    {
    if (prevNum != '' && prevNum != result)
    {
        prevNum = this.value;
        console.log('now prevNum is: ' + prevNum);
    }
    else if (currNum != '') //update second operand
    {
        currNum = this.value;
        console.log('now currNum is: ' + currNum);
    }
    else if (prevNum === result) // update previous result value
    {
        prevNum = this.value;
        console.log('now prevNum is: ' + prevNum);
    }
    else
    {
        whichOperation = this.value;
        console.log('now whichOperation is: ' + whichOperation);
    }*/
    
})  // clear operation symbol