function findIndex(buffer,size, start, k) {
    if (size <= 2) {
        let filter = buffer.filter((x) => x > 0);
        return k % 2 === 0 ? filter[0] : filter[1]
    }
    let i = start;
    for (let count = 0; ; i = ((i +1 )% buffer.length)) {
        if (buffer[i] > 0) {
            count = count + 1;
        }
        if (count === k ) break;
    }
    buffer[i] = -1;
    return findIndex(buffer,size -1, ((i+1) % buffer.length), k);
}

var findTheWinner = function(n, k) {
    return findIndex(Array.from({length:n},(_,i)=> i+1),n,0,k);
};

let res = findTheWinner(5,2)
console.log(res)
