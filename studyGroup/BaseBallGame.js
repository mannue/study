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
                stack.pop();
                break;
            case "D":
                if (stack.length < -1) return -1;
                let doubleItem = stack.pop()
                stack.push(doubleItem);
                stack.push(doubleItem * 2);
                break;
            case "+":
                if (stack.length < -1) return -1;
                let rightItem = stack.pop();
                if (stack.length < -1) return -1;
                let leftItem = stack.pop();
                stack.push(leftItem);
                stack.push(rightItem);
                stack.push(leftItem + rightItem);
                break;
            default:
                stack.push(Number(value));
        }
    }
    for (let i of stack) sum += i;
    return sum;
};
let res = calPoints(["5","2","C","D","+"])
console.log(res)
console.assert(res, 30)
