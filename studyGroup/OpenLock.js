var openLock = function(deadends, target) {
    if (target === "0000") return 0
    if (deadends.includes("0000")) return -1
    let count = 0;
    let queue = [target]
    let check = []
    while(queue.length > 0) {
        let size = queue.length;
        count = count + 1
        for (let i=0; i < size; i++) {
            value = queue.shift()
            let res = find(value,check,deadends,queue)
            if (res.includes("0000")) return count
            check.push(value)
            queue = queue.concat(res)
        }
    }
    return -1;
};

function find(target,check, deadends, queue) {
    let res = []
    for (let j = 0; j < 4; j++) {
        let value = target
        let num = Number(value[j])
        let x = num+1 > 9 ? 0 : num+1
        let y = (num-1) < 0 ? 9 : num-1
        x = value.substring(-1,j)+x+value.substring(j+1,value.length)
        y = value.substring(-1,j)+y+value.substring(j+1,value.length)
        if (!res.includes(x) && !check.includes(x) && !deadends.includes(x) && !queue.includes(x)) res.push(x)
        if (!res.includes(y) && !check.includes(y) && !deadends.includes(y) && !queue.includes(y)) res.push(y)
    }
    return res
}


//
let res = openLock(["0201","0101","0102","1212","2002"],"0000")
console.log(res)


