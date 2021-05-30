/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    if(nums < 2) return 0;
    return jumpData(nums,0,nums[0],0,0);
};

function jumpData(numList, startIndex, jump,keep, count) {
    if (numList.length-1 <= (startIndex + jump)) {
        return count + 1;
    } else {
        let maxIndex = 0;
        let max = 0;
        for (let i=1+keep; i <= jump; i++) {
            let value = numList[startIndex+i] + startIndex+i;
            if (value > max) {
                max = value;
                maxIndex = startIndex + i;
            }
        }
        return jumpData(numList,maxIndex,numList[maxIndex],jump-maxIndex,count+1)
    }
}

let result = jump([2,3,0,1,4])
console.log(result)
