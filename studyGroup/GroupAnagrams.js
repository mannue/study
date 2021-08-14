function makeHashTable(data) {
   let res = {};
   for (let i=0; i < data.length; i++) {
       res[`${data[i]}`] = res[`${data[i]}`] ? res[`${data[i]}`] + 1 : 1;
   }
   return res;
}

function isHit(tablelist, inputTable, length) {
    for (let i=0; i < tablelist.length; i++) {
        if (tablelist[i].length !== length) continue;
        compareTable = tablelist[i].hash
        let tableKeys = Object.keys(compareTable);
        let hit = false;
        for (key of tableKeys) {
            if (inputTable[key] !== compareTable[key]) {
                hit = false;
                break;
            }
            hit = true;
        }
        if (hit) return tablelist[i].index;
    }
    return -1;
}
function getStrtoNumber(str) {
    let res = 0;
    for (let i=0; i < str.length; i++) {
        res += str.charCodeAt(i);
    }
    return res;
}

var groupAnagrams = function(strs) {
    let res = [];
    let tables = {};
    if (strs.length < 1) return [];
    if (strs.length < 2) return [strs];
    for (let i=0; i<strs.length; i++) {
        const hashKey = getStrtoNumber(strs[i])
        if (!tables[hashKey]) {
            tables[hashKey] = [{ length:strs[i].length, index: res.length, hash: makeHashTable(strs[i])}];
            res[res.length] = [strs[i]];
        } else {
            if (strs[i].length === 0) {
                res[(tables[0][0].index)].push(strs[i])
            } else {
                let inputTable = makeHashTable(strs[i]);
                let index = isHit(tables[hashKey], inputTable, strs[i].length);
                if (index > -1) {
                    res[index].push(strs[i]);
                } else {
                    tables[hashKey].push({length:strs[i].length, index: res.length, hash: inputTable});
                    res[res.length] = [strs[i]];
                }
            }
        }
    }
    return res;
};

let res = groupAnagrams(["eat","tea","tan","ate","nat","bat"])
console.log(res);
