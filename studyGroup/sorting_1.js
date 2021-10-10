let sorted = function (dataList, max) {
    dataList.sort((a, b) => b-a);
    let res = [];
    for (let i=0; i < max-1; i++) {
        res.push([dataList.shift()])
    }
    res.push(dataList);
    return res;
}

let res = sorted([3,5,3,4], 4)
console.log(res.length, res)
