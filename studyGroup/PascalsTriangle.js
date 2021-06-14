var generate = function(numRows) {
    let result = [[1]]
    if (numRows <= 1) return result
    result.push([1,1])
    if (numRows <= 2) return result
    for (let i=1; i<numRows-1; i++) {
        let input = [1]
        let indexItemList = result[i]
        let parentSize = indexItemList.length
        for (let j=1; j <= parseInt(parentSize/2); j++) {
            let sum = indexItemList[j-1]+indexItemList[j]
            input[j] = sum
            let lastIndex = (parentSize+1)-(1+j)
            if (lastIndex > j) {
                input[lastIndex] = sum
            }
        }
        input[parentSize] = 1
        result.push(input)
    }
    return result
};

let result = generate(6)
console.log(result)

