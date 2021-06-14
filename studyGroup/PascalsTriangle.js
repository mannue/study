var generate = function(numRows) {
    let result = [[1]]
    if (numRows <= 1) return result
    result.push([1,1])
    if (numRows <= 2) return result
    for (let i=1; i<numRows-1; i++) {
        let input = [1] // 처음 들어가는 값
        let parentIndexList = result[i] //부모 의 값을 가져온다
        let parentSize = parentIndexList.length // 부모의 길이를 알아옴
        for (let j=1; j <= parseInt(parentSize/2); j++) {  // 부모의 길이의 반만 사용
            let sum = parentIndexList[j-1]+parentIndexList[j] // 부모의 값에서 앞 index 와 해당 index 값을 구하고
            input[j] = sum // 해당 index에 넣는다
            let matchIndex = (parentSize+1)-(1+j) // 자신의 길이에서 마지막 끝을 제외한 자신과 대칭이 index를 구한다
            if (matchIndex > j) { // 대칭한 index 가 자신의 index 보다 크면 삽입
                input[matchIndex] = sum
            }
        }
        input[parentSize] = 1 // 마지막값 삽입
        result.push(input)
    }
    return result
};

let result = generate(6)
console.log(result)

