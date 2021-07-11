var calPoints = function(ops) {
    // C : cancel last input
    // D : double last input * 2
    // + : pop 2
    let stack = [];
    let sum = 0;
    for (let value of ops) {
        switch (value) {
            case "C":
                if(stack.length < -1) return -1;
                sum -= stack.pop();
                break;
            case "D":
                if (stack.length < -1) return -1;
                let doubleItem = stack[stack.length -1] * 2
                sum += doubleItem;
                stack.push(doubleItem);
                break;
            case "+":
                if (stack.length < 2) return -1;
                let addItem = stack[stack.length -1] + stack[stack.length -2]
                sum += addItem;
                stack.push(addItem);
                break;
            default:
                sum += Number(value);
                stack.push(Number(value));
        }
    }
    return sum;
};
let res = calPoints(["5","2","C","D","+"])
console.log(res)
console.assert(res, 30)
