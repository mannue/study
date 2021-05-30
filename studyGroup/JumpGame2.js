/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    if(nums < 2) return 0;
    return jumpData(nums,0,nums[0],0,0);
};

function jumpData(numList, startIndex, jump,keep, count) {
    // index 와 점프 값이 배열 길이보다 크거나 같으면 종료한다.
    if (numList.length-1 <= (startIndex + jump)) {
        return count + 1;
    } else {
        let maxIndex = 0;
        let max = 0;
        // keep 은 그전 계산된 범위에 있었다면 해당 범위는 무시하고 그 다음 범위를 계산한다.
        for (let i=1+keep; i <= jump; i++) {
            let value = numList[startIndex+i] + startIndex+i;
            if (value > max) {  // 점프 범위 안에서 인덱스와 점프 값을 더해서 최대값을 구한다.
                max = value;
                maxIndex = startIndex + i;
            }
        }
        return jumpData(numList,maxIndex,numList[maxIndex],jump-maxIndex,count+1)
    }
}

let result = jump([2,3,0,1,4])
console.log(result)
