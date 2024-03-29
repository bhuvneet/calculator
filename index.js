

// add event handler to the number buttons clicked.
let result          = '';
let prevNum         = '';
let currNum         = '';
let isEquals        = false;
let findOperator    = '';
const expressions   = [];
const mathExp       = [];
let stringOperation = '';
let strExp          = '';
let expression      = '';
let operators       = /[/+x*%-]/;
let prevOperatorIndex   = '';
let prevOperator        = '';
let prevScndOp      = '';
let foundAt         = '';
let myArray = '';
let computedVal = [];
let m = 0;
let count = 0;
let index = 0;
let isCalculated = false;

// if a number is clicked
let num = document.getElementsByClassName("number");
for (let i = 0; i < num.length; i++)
{
    num[i].addEventListener("click", () => 
{
    // append number as number buttons are clicked + update display
    // store previous and new number clicked in variables
    if (result === '') // if there's no prior calculation done
    {
        isEquals = false;

        if (whichOperation != 0) // operator is clicked; don't append to prevNum
        {   
            // second operand
            if (num[i].textContent === "." && currNum.includes(".")) // return if number already has a decimal.
            {
                return;
            }
            else
            {
                // we don't have any result
                // this is second operand
                currNum += num[i].textContent;
                updateDisplay(currNum, 'currNum'); 
            }  
        }
        else
        {   // first operand
            if (num[i].textContent === "." && prevNum.includes(".")) // return if number already has a decimal.
            {
                return;
            }
            else
            {
                prevNum += num[i].textContent;  // keep appending to prevNum
                updateDisplay(prevNum, 'prevNum');
            }
        }
    }
    else    // we have a result from prior calculation
    {
        isEquals = false;
        if (num[i].textContent === "." && currNum.includes(".")) // return if number already has a decimal.
        {
            return;
        }

        if (isCalculated === true)
        {
            // we have compued result of an expression
            // so start this expression from the beginning
            // by erasing all previous values
            result = '';
            isCalculated = false;

            if (prevNum === '')
            {
                prevNum += num[i].textContent;
                updateDisplay(prevNum, 'prevNum');
            }
            else
            {
                currNum += num[i].textContent;
                updateDisplay(currNum, 'currNum'); 
            }
        }
        else
        {   
            // isCalculated is false
            // when user has entered a number, an operator and another number
            // this is the second oparand
            if (prevNum === '')
            {
                prevNum = result;   // assign result to prevNum
            }
            if (whichOperation === '')
            {
                prevNum += num[i].textContent;
                updateDisplay(prevNum, 'prevNum'); 
            }
            else
            {
                currNum += num[i].textContent;
                updateDisplay(currNum, 'currNum'); 
            }
            
            updateDisplay(currNum, 'currNum');  
        }
    }
})};

document.addEventListener('keydown', (event) =>
{
    let keyName = event.key;
    
    if (isFinite(keyName) || keyName === ".") // number id pressed
    {
        isCalculated = false;
        if (result === '') // if there's no prior calculation done
        {
            isEquals = false;

            if (whichOperation != 0) // operator is clicked; don't append to prevNum
            {   
                // second operand
                if (keyName === "." && currNum.includes(".")) // return if number already has a decimal.
                {
                    return;
                }
                else
                {
                    // we don't have any result
                    // this is second operand
                    currNum += keyName;
                    updateDisplay(currNum, 'currNum'); 
                }  
            }
            else
            {   // first operand
                if (keyName === "." && prevNum.includes(".")) // return if number already has a decimal.
                {
                    return;
                }
                else
                {
                    prevNum += keyName;  // keep appending to prevNum
                    updateDisplay(prevNum, 'prevNum');
                }
            }
        }
        else    // we have a result from prior calculation
        {
            isEquals = false;
            if (keyName === "." && currNum.includes(".")) // return if number already has a decimal.
            {
                return;
            }

            if (isCalculated === true)
            {
                // we have compued result of an expression
                // so start this expression from the beginning
                // by erasing all previous values
                result = '';
                isCalculated = false;

                if (prevNum === '')
                {
                    prevNum += keyName;
                    updateDisplay(prevNum, 'prevNum');
                }
                else
                {
                    currNum += keyName;
                    updateDisplay(currNum, 'currNum'); 
                }
            }
            else
            {   
                // isCalculated is false
                // when user has entered a number, an operator and another number
                // this is the second oparand
                if (prevNum === '')
                {
                    prevNum = result;   // assign result to prevNum
                }
                currNum += keyName;
                
                updateDisplay(currNum, 'currNum');  
            }
        }
        /* if (result === '') // if there's no prior calculation done
        {
            if (keyName === "." && currNum.includes(".")) // return if number already has a decimal.
            {
                return;
            }
            else if (whichOperation != 0)    // operator is clicked; don't append to currNum
            {   // second operand
                currNum += keyName;
                updateDisplay(currNum, 'currNum');   
            }
    
            else
            {   // first operand
                prevNum += keyName;
                updateDisplay(prevNum, 'prevNum');
            }
        }
        else    // if prior calculation was done i.e. result != -1
        {

            if (keyName === "." && currNum.includes(".")) // return if number already has a decimal.
            {
                return;
            }
            else
            {
                prevNum = result;
                currNum += keyName;
                updateDisplay(currNum, 'currNum');  
            }
        } */
    }

    else if (keyName === "+" || keyName === "-" || keyName === "/" 
    || keyName === "*" || keyName === "%") // operation is pressed
    {
        /* whichOperation = keyName;
        updateDisplay(whichOperation, 'operator'); */
        
        if (prevNum != '' && currNum != '' && whichOperation != '')
        {
            if (keyName === "%")
            {
                currNum = currNum / 100;
            }
            operate();
            prevNum = result;
            currNum = '';
        }
        if (whichOperation == '' && keyName != "%")
        {
            // replace operation with new value
            whichOperation = keyName;
        }

        if (isCalculated)
        {
            prevNum = result;
        }

        whichOperation = keyName;
        updateDisplay(whichOperation, 'operator');  // display operator

    }

    else if (keyName === "=" || keyName === "Enter")
    {
        if (prevNum != '' && whichOperation != '' && whichOperation === "%")
        {
            operate();
        }
        else if (prevNum == '' && currNum != '' && whichOperation != '' )
        {
            // prevNum is empty and currNum and operator have value
            if (whichOperation == "+" || whichOperation == "-")
            {
                prevNum = 0;
            }
            else
            {
                prevNum = 1;
            }
                operate();
        }
        else if (prevNum != '' && whichOperation != '' && currNum == '')
        {
            if (whichOperation == "+" || whichOperation == "-")
            {
                currNum = 0;
            }
            else
            {
                currNum = 1;
            }
            operate();
        }
        else if (prevNum != '' && (whichOperation === '' || whichOperation === 0) && currNum == '')
        {
            // first operand is entered, while operator and second operand are empty
            result = prevNum;
        }

        isEquals = true;
        isCalculated = true;
        operate();      
    }

    else // if a key other than valid keys, is pressed.
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
        if (prevNum != '' && currNum != '' && whichOperation != '')
        {
            if (operation[i].textContent === "%")
            {
                currNum = currNum / 100;
            }
            operate();
            prevNum = result;
        }
        if (prevNum != '' && currNum == '' && operation[i].textContent == "%" 
        && (whichOperation === 0 || whichOperation === '' && result === ''))
        {
            // calculate percentage first
            whichOperation = operation[i].textContent;
            operate();

        }
        if ((whichOperation != '' || whichOperation != 0) && operation[i].textContent != "%")
        {
            // replace operation with new value
            whichOperation = operation[i].textContent;
        }
        if(whichOperation === 0 && operation[i].textContent != "%")
        {
            // replace operation with new value 
            // when this the first operation
            whichOperation = operation[i].textContent;
        }
        if (isCalculated)
        {
            prevNum = result;
        }
        if (prevNum != '' && currNum == '' && operation[i].textContent != "%" 
        && (whichOperation === 0 || whichOperation === '' && result != ''))
        {
            // result has been computed
            // assign new operator
            whichOperation = operation[i].textContent;
        }
        if (prevNum != '' && currNum == ''
        && (whichOperation === 0 || whichOperation === '') && result === '')
        {
            // after undo
            if (operation[i].textContent === "%")
            {
                currNum = currNum / 100;
                operate();
                prevNum = result;
            }
            else
            {
                whichOperation = operation[i].textContent;
            } 
        }
        if (prevNum === '' && currNum === ''
        && whichOperation === '' && result != '')
        {
            whichOperation = operation[i].textContent;
        }

        updateDisplay(operation[i].textContent, 'operator');  // display operator
    })
}

// once equals button is clicked, invoke operate()
let equals = document.getElementById("equals");
equals.addEventListener("click", function()
{
    if (prevNum != '' && currNum != '' && whichOperation != '')
    {
        operate();
    }
    else if (prevNum != '' && whichOperation != '' && whichOperation === "%")
    {
        operate();
    }
    else if (prevNum == '' && currNum != '' && whichOperation != '' )
    {
        // prevNum is empty and currNum and operator have value
        if (whichOperation == "+" || whichOperation == "-")
        {
            prevNum = 0;
        }
        else
        {
            prevNum = 1;
        }
        operate();
    }
    else if (prevNum != '' && whichOperation != '' && currNum == '')
    {
        if (whichOperation == "+" || whichOperation == "-")
        {
            currNum = 0;
        }
        else
        {
            currNum = 1;
        }
        operate();
    }
    else if (prevNum != '' && (whichOperation === '' || whichOperation === 0) && currNum == '')
    {
        // first operand is entered, while operator and second operand are empty
        result = prevNum;
    }

    isEquals = true;
    // display result after this
    updateDisplay(result, 'result');
    isCalculated = true;    // we have computed and displayed result of one expression
}); 


// store 1st num when user presses operator
// save which operation
// operate on the numbers
function operate ()
{
    // this function is called when equals operator is pressed/clicked
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
            if (currNum === "0")
            {
                result = "n/0 !allowed";
                prevNum = '';
                currNum = '';
            }
            else
            {
                divide(prevNum, currNum);
            }
        }
        else if (whichOperation === "%")
        {
            percentage(prevNum, currNum);
        }

        prevNum = '';
        currNum = '';   // clear currNum value, operation type and result to store new value after result is computed.
        whichOperation = '';
    }
}

// operate on nums
function add (prevNum, currNum)
{
    result = +prevNum + +currNum;
    if (result % 1 != 0)
    {
        // has decimal places
        result = (Math.round(result * 100) / 100).toFixed(2);
    }
    
    // display result only when equals to is clicked/pressed
    if (isEquals)
    {
        updateDisplay(result, 'result');
    }   
};

function subtract (prevNum, currNum)
{
    result = +prevNum - +currNum;
    if (result % 1 != 0)
    {
        // has decimal places
        result = (Math.round(result * 100) / 100).toFixed(2);
    }

    if (isEquals)
    {
        updateDisplay(result, 'result');
    } 
};

function divide (prevNum, currNum)
{
    result = +prevNum / +currNum;
    if (result % 1 != 0)
    {
        // has decimal places
        result = (Math.round(result * 100) / 100).toFixed(2);
    }

    if (isEquals)
    {
        updateDisplay(result, 'result');;
    } 
};

function multiply (prevNum, currNum)
{
    result = +prevNum * +currNum;
    if (result % 1 != 0)
    {
        // has decimal places
        result = (Math.round(result * 100) / 100).toFixed(2);
    }

    if (isEquals)
    {
        updateDisplay(result, 'result');
    } 
};

function percentage (prevNum, currNum)
{
    
    if (currNum === '')
    {
        result = (prevNum / 100);
    }
    else
    {
        result = ((+prevNum) % (+currNum));
    }
    if (result % 1 != 0)
    {
        // has decimal places
        result = (Math.round(result * 100) / 100).toFixed(2);
    }

    if (isEquals)
    {
        updateDisplay(result, 'result');
    } 
};

let display1 = document.getElementById("display1");
let display2 = document.getElementById("display2");


function updateDisplay (newValue, type)
{
    // if type == error, display the error message
    if (type === 'error')
    {
        display2.value = newValue;
    }
    if (type === 'currNum')
    {
        if (whichOperation === '')
        {
            // user overwrote the previous calculation
            display1.value = '';
            display2.value = newValue;
        }
        else
        {
            // if the operation is being done on previous result
            if (result != '')
            {
                // do operation with previous result, so prev result is first operand
                // if the string already has an operator, don't update the display to result plus new currNum
                // instead display the complete string
                if (findOperator = display1.value.includes(whichOperation))
                {
                    display1.value = prevNum + ' ' + whichOperation + ' ' + currNum;
                    display2.value = newValue;
                }
                else
                {
                    // concatenante the new input with the previous result
                    display1.value = result + ' ' + whichOperation + ' ' + currNum;
                    display2.value = newValue;
                }              
            }
            else
            {
                // no prev result is available
                // expression is a string of various operations
                if (prevNum != '')
                {

                    display1.value = prevNum + ' ' 
                        + whichOperation + ' '
                        + currNum;
                    
                    display2.value = newValue;
                }
                else
                {
                    display1.value += currNum;

                    display2.value = newValue;
                }
            }
            
        }
    }
    if (type === 'prevNum')
    {
        // first operand
        display2.value = newValue;
        if (isCalculated == false)
        {
            display1.value = '';
            isEquals = false;
        }
    }
    if (type === 'result')
    {
        display2.value = 'result = ' + newValue;
    }
    if (type === 'operator')
    {
        // if there is no second operand
        if (currNum === '')
        {
            if (prevNum === '')
            {
                // if prevNum is null -- this will happen when a second operation is being performed, 
                // and calculation has been performed on previous two operands.
                if (newValue === "%")
                {
                    display1.value = result;
                    display2.value = result;
                }
                else
                {
                    display1.value = result + ' ' + newValue + ' ';
                    display2.value = newValue;
                }
                
            }
            else if (prevNum != '' && result === '')
            {
                // we have first operand
                // after undo or first calc
                if (display1.value === '')
                {
                    // if display 1 is empty
                    display1.value = display2.value + ' ' + newValue + ' ';
                    display2.value = newValue;
                }
                else
                {
                    if (operators.test(display1.value))
                    {
                        let str = display1.value;
                        let position = str.search(operators);
                        let newStr = str.slice(0, position);
                        display1.value = newStr + whichOperation;
                        display2.value = newValue;
                    }
                    else
                    {
                        display1.value += ' ' + newValue + ' ';
                        display2.value = newValue;
                    } 
                }         
            }
            else
            {
                if (isCalculated)
                {
                    // when equals to is clicked /pressed
                    display1.value = prevNum + ' ' + newValue;
                    display2.value = newValue;
                }
                else
                {
                    if (newValue === "%")
                    {
                        display1.value = prevNum;
                        display2.value = '';
                    }
                    else
                    {
                        display1.value = prevNum + ' ' + whichOperation + ' ';
                        display2.value = newValue;
                    }  
                }
            }
            
        }
        else if (prevNum != '' && currNum != '')
        {
            // a second operation is being performed 
            // when two operands are already available.
            display1.value += ' ' + newValue + ' ';
            display2.value = newValue;
        }
        
    }
}

// erase all stored values from the variables.
let undo = document.getElementById("undo");
undo.addEventListener("click", () =>
{
    display1.value = '';
    display2.value = '';
    currNum = '';
    prevNum = '';
    result = '';
    whichOperation = '';
    isCalculated = false;
    isEquals = false;
})

// clear last digit from display
let clear           = document.getElementById("clear");
let valueInDisplay  = document.getElementById("display2");

clear.addEventListener("click", () =>
{
    valueInDisplay.value = valueInDisplay.value.slice(0, -1);
    this.value = valueInDisplay.value;
    
    if (currNum === '' && (whichOperation == 0 || whichOperation == '') && isCalculated != true) // update first operand
    {
        prevNum = this.value;
    }
    else if (currNum != '' && whichOperation != '')  // update second operand
    {
        currNum = this.value;
        updateDisplay(currNum, "currNum");
    }
    else if (prevNum != '' && whichOperation != '' && currNum == '')
    {
        whichOperation = this.value;
        updateDisplay(whichOperation, "operator");
    }
    else if (isCalculated)
    {
        result = result.slice(0, -1);
    }
})  

// change color when mouse is over buttons
let equalSign = document.getElementById("equals");
equalSign.addEventListener("mouseover", colorWhenHovered);

let undoSign = document.getElementById("undo");
undoSign.addEventListener("mouseover", colorWhenHovered);

let clearSign = document.getElementById("clear");
clearSign.addEventListener("mouseover", colorWhenHovered);

function colorWhenHovered (e)
{
    function randomColor()
    {
        return Math.floor((1 + Math.random()) * 256 / 2);
    }
    x = e.offsetX;
    y = e.offsetY;
    
    this.style.backgroundColor = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;
}
