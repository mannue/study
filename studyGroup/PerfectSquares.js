class Value {
    constructor(count,total) {
        this.count = count;
        this.total = total;
    }
}

function getSquareList(n) {
    let res = [];
    for (let i=Math.sqrt(n).toFixed(0); i > 0; i--) {
         res.push(i * i)
    }
    return res;
}

var numSquares = function(n) {
    let squareList = getSquareList(n);
    let queue = [new Value(0,n)];
    while (queue.length > 0) {
        let data = queue.shift();
        let limit = data.total;
        for (let i=0; i < squareList.length; i++) {
            let result = limit-squareList[i]
            if (result < 0) continue;
            if (result === 0) return data.count+1;
            queue.push(new Value(data.count+1,result))
        }
    }
};

let res = numSquares(7168)
console.log(res)
