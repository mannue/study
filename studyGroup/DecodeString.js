var decodeString = function(s) {
    let numberStack = [];
    let stringStack = [];
    let result = "";
    let numberValue = "";
    for (let value of s) {
        if (value > '/' && value < ':') {
            numberValue = numberValue + value
        }
        else {
            if (numberValue !== "") {
                numberStack.push(numberValue);
                numberValue = "";
            }
            switch (value) {
                case ']':
                    let res = getString(stringStack);
                    stringStack.push(res.repeat(numberStack.pop()));
                    break;
                default:
                    stringStack.push(value);
            }
        }
    }
    for (let item of stringStack) {
        result = result + item;
    }
    return result;
};

function getString(stack) {
    let res = "";
    let size = stack.length;
    for(let i=0; i < size; i++) {
        let s = stack.pop();
        if (s === '[') break;
        else res = s + res;
    }
    return res;
}
let rs = decodeString("2[abc]3[cd]ef")
console.assert(rs==="abcabccdcdcdef");

