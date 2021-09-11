/**
 * @param {number[]} nums
 * @param {number[][]} edges
 * @return {number[]}
 */



function gcd(minNum, maxNum) {
    return (minNum % maxNum) === 0 ? maxNum : gcd(maxNum, minNum % maxNum);
}

var getCoprimes = function(nums, edges) {
    if (nums.length <= 1) return [-1]
    let res = Array.from({length: nums.length}, (_)=> -1);
    let checkTable = Array.from(new Set(nums.slice(1)))
    let table = [-1]
    let reverse = edges[0][0] > edges[0][1];
    for (let i = 0; i < edges.length; i++) {
        let [ parent , child ] = edges[i];
        if (reverse) {
            let item = child;
            child = parent;
            parent = item;
        }
        table[child] = parent;
        if (nums[parent] ===1 || nums[child]  === 1) {
            res[child] = parent;
        }
        else {
            let items = table[child];
            if (checkTable.length <= 2 &&  (gcd(Math.min(checkTable[0], checkTable[1]), Math.max(checkTable[0], checkTable[1])) !== 1)) {
                items = 0;
            }
            while (true) {
                if (items < 0) break;
                let value = gcd(Math.min(nums[items], nums[child]), Math.max(nums[items], nums[child]));
                if (value === 1) {
                    res[child] = items;
                    break;
                } else {
                    items = table[items]
                }
            }
        }
    }
    return res;
};
res = getCoprimes([2,3,3,2]
    ,[[0,1],[1,2],[1,3]]);
console.log(res)
console.assert(res === [-1,21,17,43,10,42,7,13,29,44,17,31,39,10,10,29,32,0,40,23,12,39,12,40,25,35,15,38,40,40,17,24,5,1,19,14,17,21,25,24,14,17,40,25,37,17,10]);


