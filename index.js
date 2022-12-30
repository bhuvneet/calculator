// add event handler to the number buttons clicked.
let result          = '';
let prevNum         = '';
let currNum         = '';
let isEquals        = false;
let findOperator    = '';
let firstOp         = null;
let secondOp        = null;
let firstOperation  = null;
const expressions   = [];
const mathExp       = [];
let stringOperation = '';
let strExp          = '';
let expression      = '';
let operators       = /[/+x*%-]/;
let prevOperatorIndex   = '';
let prevOperator        = '';
let prevScndOpIndex = '';
let prevScndOp      = '';

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
        if (whichOperation === '')
        {
            // user overwrote a number, so clear the prevNum
            // start new calculation
            prevNum += num[i].textContent;

            updateDisplay(prevNum, 'prevNum');

        }
        else
        {
            // when user has entered a number, an operator and another number
            // this is the second oparand
            if (prevNum === '')
            {
                prevNum = result;   // assign result to prevNum
            }
            currNum += num[i].textContent;
            
            updateDisplay(currNum, 'currNum');  
        }
        
    }

})};

document.addEventListener('keydown', (event) =>
{
    let keyName = event.key;
    
    if (isFinite(keyName) || keyName === ".") // number id pressed
    {
        if (result === '') // if there's no prior calculation done
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
        }
    }

    else if (keyName === "+" || keyName === "-" || keyName === "/" 
    || keyName === "*" || keyName === "%") // operation is pressed
    {
        whichOperation = keyName;
        updateDisplay(whichOperation, 'operator');
    }

    else if (keyName === "=" || keyName === "Enter")
    {
        isEquals = true;
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
            // for displaying purposes
            if (mathExp.length < 1)
            {
                // if there no entry in the array, 
                // i.e. this is the first complete expression
                expression = prevNum; // first operand
                mathExp.push(expression);
                
                expression = ' ' + whichOperation + ' ' + currNum;    // second operand
                mathExp.push(expression);
            }
            else
            {
                expression = ' ' + whichOperation + ' ' + currNum;
                mathExp.push(expression);
            }

            // if we have two operands and an operator, add them to the array
            // before updating the operator to the new input
            expression = prevNum + ' ' 
                            + whichOperation + ' ' 
                            + currNum;

            // for mathematical operation
            expressions.push(expression);

            prevNum = currNum;
            currNum = '';

        }

        whichOperation = operation[i].textContent;
        updateDisplay(whichOperation, 'operator');  // display operator
    })
}

// once equals button is clicked, invoke operate()
let equals = document.getElementById("equals");
equals.addEventListener("click", function()
{
    

    // when enter is pressed/clicked, push expression to array
    if (mathExp.length > 1 || mathExp.length === 1)
    {
        expression = prevNum + ' ' + whichOperation + ' ' + currNum;
        expressions.push(expression);

        expression = ' ' + whichOperation + ' ' + currNum;
        mathExp.push(expression);
        
        // calculation will be a string of operations
        // first extract the entries from expressions array
        mathExp.forEach(element => 
            stringOperation += element
            );

        // extract operands and operators from the string
        stringOperation = stringOperation.split(" ").join("");

        // find first operator
/*         findOperator = stringOperation.indexOf("/");
        if (findOperator != -1)
        {
            // division operator found
            // evaluate expression before moving on to others
            let firstOperand    = stringOperation.indexOf(findOperator - 1);
            let secondOperand   = stringOperation.indexOf(findOperator + 1);
        } */

        // find operator in array elements, and evaluate the expression based on precedence
        let i = 0;
        expressions.forEach(element => {
            
            // remove spaces from elements first
            element = element.split(" ").join("");

            // find division
            let whichIndex = expressions[i].indexOf('/');

            // keep track of previous second operand and operator
            if (whichIndex == -1)
            {
                if(operators.test(element))
                { 
                    expression = element;

                    prevOperatorIndex   = expression.search(operators);

                    prevOperator        = expression.substring(prevOperatorIndex, prevOperatorIndex + 1);
                
                    prevScndOp          = expression.substring(prevOperatorIndex+1);
                
                } 
            }                  

            if (whichIndex != -1)
            {
                prevNum = element.substring(0, whichIndex - 1);  // extract 1st op until division operator
                currNum = element.substring(whichIndex);    // extract 2nd op from division op until end of string
                whichOperation = element.substring(whichIndex-1, whichIndex);

                operate();
                
                expressions[i] = result;    // update the element to result of calculation       

                console.log("division found");

                if (i > 0)
                {
                    // find second operand in previous element in array
                    // and replace it with the result calculated
                    element     = expressions[i - 1];
                    element     = element.split(" ").join("");

                    let splitStr    = [element.slice(0, prevOperatorIndex + 1), result].join('');

                    expressions[i - 1] = splitStr; 

                }
            }
            i++;
        });

        // find multiplication
        i = 0;
        expressions.forEach(element => {

            // remove spaces from elements first
            element = element.split(" ").join("");

            let whichIndex = expressions[i].indexOf('x');

            if (whichIndex != -1)
            {
                prevNum = element.substring(0, whichIndex - 1);  // extract 1st op until division operator
                currNum = element.substring(whichIndex);    // extract 2nd op from division op until end of string
                whichOperation = element.substring(whichIndex-1, whichIndex);

                operate();
                
                expressions[i] = result;    // update the element to result of calculation

                console.log("multiplication found");
            }
            i++;
        });

        // find modulo
        i = 0;
        expressions.forEach(element => {

            // remove spaces from elements first
            element = element.split(" ").join("");

            let whichIndex = expressions[i].indexOf('%');

            if (whichIndex != -1)
            {
                prevNum = element.substring(0, whichIndex - 1);  // extract 1st op until division operator
                currNum = element.substring(whichIndex);    // extract 2nd op from division op until end of string
                whichOperation = element.substring(whichIndex-1, whichIndex);

                operate();
                
                expressions[i] = result;    // update the element to result of calculation

                console.log("modulo found");
            }
            i++;
        });

        // once division, multiplication and modulo have been dealt with
        // find additions and subtractions
        // find multiplication
        i = 0;
        expressions.forEach(element => {

            // remove spaces from elements first
            element = element.split(" ").join("");

            let whichIndex = expressions[i].indexOf('+');

            if (whichIndex != -1)
            {
                prevNum = element.substring(0, whichIndex - 1);  // extract 1st op until division operator
                currNum = element.substring(whichIndex);    // extract 2nd op from division op until end of string
                whichOperation = element.substring(whichIndex-1, whichIndex);

                operate();
                
                expressions[i] = result;    // update the element to result of calculation

                console.log("addition found");
            }
            i++;
        });

        // find multiplication
        i = 0;
        expressions.forEach(element => {

            // remove spaces from elements first
            element = element.split(" ").join("");

            let whichIndex = expressions[i].indexOf('-');

            if (whichIndex != -1)
            {
                prevNum = element.substring(0, whichIndex - 1);  // extract 1st op until division operator
                currNum = element.substring(whichIndex);    // extract 2nd op from division op until end of string
                whichOperation = element.substring(whichIndex-1, whichIndex);

                operate();
                
                expressions[i] = result;    // update the element to result of calculation

                console.log("subtraction found");
            }
            i++;
        });

    }

    isEquals = true;
    // display result after this
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
                updateDisplay("n/0 !allowed in math world", 'error');
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
            mod(prevNum, currNum);
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
    result = (Math.round(result * 10000) / 10000).toFixed(4);
    // display result only when equals to is clicked/pressed
    if (isEquals)
    {
        updateDisplay(result, 'result');
    }   
};

function subtract (prevNum, currNum)
{
    result = +prevNum - +currNum;
    result = (Math.round(result * 10000) / 10000).toFixed(4);
    if (isEquals)
    {
        updateDisplay(result, 'result');
    } 
};

function divide (prevNum, currNum)
{
    result = +prevNum / +currNum;
    result = (Math.round(result * 10000) / 10000).toFixed(4);
    if (isEquals)
    {
        updateDisplay(result, 'result');
    } 
};

function multiply (prevNum, currNum)
{
    result = +prevNum * +currNum;
    result = (Math.round(result * 10000) / 10000).toFixed(4);
    if (isEquals)
    {
        updateDisplay(result, 'result');
    } 
};

function mod (prevNum, currNum)
{
    result = ((+prevNum) % (+currNum));
    result = (Math.round(result * 10000) / 10000).toFixed(4);
    if (isEquals)
    {
        updateDisplay(result, 'result');
    } 
};

let display1 = document.getElementById("display1");
let display2 = document.getElementById("display2");

let prevValue = document.getElementById("display1");

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
                    if (mathExp.length === 1 || mathExp.length > 1)
                    {   
                        // display elements from the array 
                        // and append new value to display updated value
                        if (expressions.length > 1)
                        {
                            mathExp.forEach(elem => strExp += elem);
                            display1.value = strExp + ' ' + whichOperation + ' ' 
                            + newValue;
                            strExp = '';    // empty the string again for next time
                        }
                        else
                        {
                            // for first complete operation
                            expressions.forEach(elem => strExp += elem);
                            display1.value = strExp + ' ' + whichOperation + ' ' 
                            + newValue;
                            strExp = '';    // empty the string again for next time
                        }
                    }
                    else
                    {
                        display1.value = prevNum + ' ' 
                            + whichOperation + ' '
                            + currNum;
                    }
                    

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
                display1.value = result + ' ' + newValue + ' ';
                display2.value = newValue;
            }
            else if (prevNum != '' && result === '')
            {
                // we have first operand
                if (display1.value === '')
                {
                    // if display 1 is empty
                    display1.value = display2.value + ' ' + newValue + ' ';
                    display2.value = newValue;
                }
                else
                {
                    display1.value += ' ' + newValue + ' ';
                    display2.value = newValue;
                }         
            }
            else
            {
                display1.value = display2.value + ' ' + newValue + ' ';
                display2.value = newValue;
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
})

// clear last digit from display
let clear           = document.getElementById("clear");
let valueInDisplay  = document.getElementById("display2");

clear.addEventListener("click", () =>
{
    valueInDisplay.value = valueInDisplay.value.slice(0, -1);
    this.value = valueInDisplay.value;
    
    if (currNum === '' && whichOperation === 0) // update first operand
    {
        prevNum = this.value;
    }
    else if (currNum != '' && whichOperation != '')  // update second operand
    {
        currNum = this.value;
    }
    else if (prevNum != '')
    {
        whichOperation = this.value;
    }
    else if (prevNum === '' && currNum === '' 
    && whichOperation === '' && result != '')
    {
        result = this.value;
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
