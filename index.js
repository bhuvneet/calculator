let addNums = document.getElementById("add");
addNums.addEventListener("click", operate());

let subtractNums = document.getElementById("subtract");
subtractNums.addEventListener("click", operate());

let divideNums = document.getElementById("divide");
divideNums.addEventListener("click", operate());

let multiplyNums = document.getElementById("multiply");
multiplyNums.addEventListener("click", operate());

let modNums = document.getElementById("mod");
modNums.addEventListener("click", operate());

let equalsNums = document.getElementById("equals");
equalsNums.addEventListener("click", operate());

let num = document.getElementsByClassName("number");
for (let i = 0; i < num.length; i++)
{
    num[i].addEventListener("click", operator(num[i]));
}

function whichNum (num)
{
    console.log(num.textContent);
}

function add (num1, num2)
{
    return num1 + num2;
};

function subtract (num1, num2)
{
    return num1 - num2;
};

function divide (num1, num2)
{
    return num1 / num2;
};

function multiply (num1, num2)
{
    return num1 * num2;
};

function mod (num1, num2)
{
    return num1 % num2;
};

// check if button clicked is a number
function operator (num1)
{
    if (typeof num1 === 'number')
    {
        operate(num1);
    }
}

// operate on the numbers
function operate (num1, num2, whichOperation)
{
    //let num1 = temp;    // store value of argument in a temp variable
    //let num2 = temp;    // assign the value of temp to a new variable

    if (whichOperation === "add")
    {
        add(num1, num2);
    }
    else if (whichOperation === "subtract")
    {
        subtract(num1, num2);
    }
    else if (whichOperation === "multiply")
    {
        multiply(num1, num2);
    }
    else if (whichOperation === "divide")
    {
        divide(num1, num2);
    }
    else if (whichOperation === "mod")
    {
        mod(num1, num2);
    }
}
