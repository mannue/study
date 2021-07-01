var trap = function(height) {
    if (height.length <= 2) return 0;
    let top = -1;
    let result = 0;
    for(let i=0; i <= height.length-1; i++) {
        if (height[i] === 0 || !isTop(height,i)) continue;
        if (top < 0) top = i;
        else {
            if (height[top] < height[i]) {
                result += getWater(height,top,i,height[top])
                top = i;
            } else {
                result += getWater(height, top, i, height[i])
            }
        }
    }
    return result;
}
// 배열의 작은 값으로 채우고 해당 채운 값을 return 해 주는 함수
function getWater(height,start,end, size) {
    console.log("start :: "+start+", end:: "+end+", size :: "+size);
    let count = 0;
    // 왼쪽이 더 크면 오른쪽에서 왼쪽으로 이동
    if (height[start] > height[end]) {
        for (let i=end-1; i > start; i--) {
            if (height[i] > size) break;
            count += size - height[i]
            height[i] = size;
        }
    } else {
        // 오른쪽이 더 크면 왼쪽에서 오른쪽으로 이동
        for (let i=start+1; i < end; i++) {
            if (height[i] > size) break;
            count += size - height[i];
            height[i] = size;
        }
    }
    console.log(height);
    return count;
}
// 현재 index 가 top 인지 구별하는 함수
function isTop(height, index) {
    let left = index === 0 ? 1 : height[index] - height[index-1];
    let right = index === height.length-1 ? 1 : height[index]-height[index+1]
    let res = !(left < 0 || right <= 0)
    console.log("isTop index :: "+index+" , result ::"+res);
    return res;
}
let res = trap([0,1,0,2,1,0,1,3,2,1,2,1])
console.log(res)
