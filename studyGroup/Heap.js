function heapInsert(buffer,table,inputs, items) {
    for (let i=0; i < items.length; i++) {
        if(table[items[i]] === 1) continue;
        table[items[i]] = 1;
        inputs.push(items[i])
        let size = buffer.length;
        while (size !== 1 && items[i] < buffer[Math.floor(size/2)]) {
            buffer[size] = buffer[Math.floor(size/2)];
            size = Math.floor(size/2);
        }
        buffer[size] = items[i];
    }
}
function heapDelete(buffer) {
    const ROOT = 1;
    let index = buffer.length-1;
    let res = buffer[ROOT];
    if (index > 1) {
        buffer[ROOT] = buffer.pop();
        let child = 0;
        let parent = ROOT;
        while (true) {
            child = parent * 2;
            if (child + 1 < buffer.length  && buffer[child] > buffer[child + 1])
            child++;
            if ((child >= buffer.length-1) || buffer[parent] < buffer[child]) break;
            let item = buffer[parent];
            buffer[parent] = buffer[child];
            buffer[child] = item;
            parent = child;
        }
    }
    return res;
}

var nthUglyNumber = function(n) {
    let res = [0,1];
    let inputs = [0,1];
    let checkTable = [1,1];
    for (let i=1; i <= n*3; i++) {
        let input = inputs[i];
        heapInsert(res,checkTable,inputs,[2*input, 3*input, 5*input]);
    }
    let result = 0;
    for (let j=1; j<=n; j++) {
        result = heapDelete(res);
    }
    return result;
};

let res = nthUglyNumber(110)
console.log(res);
console.assert(res === 32);
