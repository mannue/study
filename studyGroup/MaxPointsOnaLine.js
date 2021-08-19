var maxPoints = function(points) {
    if (points.length <= 2) return points.length;
    let x_table = {};
    let y_table = {};
    let res = 0;
    for (let i=0; i < points.length; i++) {
        x_table[`${points[i][0]}`]  = x_table[`${points[i][0]}`] ? x_table[`${points[i][0]}`] + 1 : 1;
        y_table[`${points[i][1]}`]  = y_table[`${points[i][1]}`] ? y_table[`${points[i][1]}`] + 1 : 1;
        res = Math.max(res,x_table[`${points[i][0]}`],y_table[`${points[i][1]}`]);
    }
    let angle = 0;
    for (let i=0; i < points.length; i++) {
        let up_diagonal = {};
        let down_diagonal = {};
        let select = null;
        for (let j=i+1; j < points.length; j++) {
            let maxX = Math.max(points[i][0],points[j][0]);
            let maxY = Math.max(points[i][1],points[j][1]);
            let minX = Math.min(points[i][0],points[j][0]);
            let minY = Math.min(points[i][1],points[j][1]);
            let key = Math.atan2((maxY-minY),(maxX-minX));

            if ((points[i][0] > points[j][0] && points[i][1] > points[j][1]) || ((points[i][0] < points[j][0] && points[i][1] < points[j][1]))) {
                select = down_diagonal;
            } else {
                select = up_diagonal;
            }
            select[key] = select[key] ? select[key] + 1 : 2;
            angle = Math.max(angle,select[key])
        }
    }
    return Math.max(res,angle)
};

let res = maxPoints(
    [[-6,-1],[3,1],[12,3]])
console.log(res)
