var maxEnvelopes = function(envelopes) {
    let max = 1;
    let sorted = envelopes.sort(([a,b],[c,d]) => a !== c ? a-c : b-d);
    let buffer = [];
    for (let i=0; i< sorted.length; i++) {
        buffer[i] = 1;
        for (let j=i-1; j>=0; j--) {
            if (sorted[i][0] > sorted[j][0] && sorted[i][1] > sorted[j][1]) {
                buffer[i] = Math.max(buffer[i], buffer[j]+1)
            }
        }
        max = Math.max(max, buffer[i])
    }
    return max;
};

let res = maxEnvelopes(
    [[5,4],[6,4],[6,7],[2,3]])
console.log(res);
