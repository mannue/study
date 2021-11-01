function findIndex(buffer,size, start, k) {
    if (size <= 1) {
        return buffer.find((x,i) => x > 0 )
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
