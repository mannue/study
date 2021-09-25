var nthUglyNumber = function(n) {
    const MAX = 1691;
    if (n === 1) return 1;
    else {
        let buffer = new Set();
        buffer.add(1);
        let res = [];
        while (true) {
            let min = Math.min(...buffer.values());
            if (!res.includes(min)) {
                res.push(min);
                if (res.length >= n) return min;
                buffer.delete(min);
                buffer.add(2*min);
                buffer.add(3*min);
                buffer.add(5*min);
            }
        }
    }
};

let res = nthUglyNumber(19)
console.log(res);
console.assert(res === 12);
