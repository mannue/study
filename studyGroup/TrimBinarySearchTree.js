function TreeNode(val, left, right) {
     this.val = (val===undefined ? 0 : val)
     this.left = (left===undefined ? null : left)
     this.right = (right===undefined ? null : right)
}
var trimBST = function(root, low, high) {
    if ((root.val < low || root.val > high) && root.left === null && root.right == null) return null;
    let queue = [];
    root = new TreeNode(-1,root);
    queue.push(root);
    let head = null;
    while (queue.length > 0) {
        let size = queue.length;
        for (let i =0; i < size; i++) {
            let tail = queue.shift();
            if (head === null && tail.val >= low && tail.val <= high ) head = tail;
            if (tail.left != null) {
                let isChange = false;
                if (tail.left.val === low) tail.left.left = null;
                if (tail.left.val === high) tail.left.right = null;
                if (tail.left.val > high) {
                    tail.left.right = null;
                    tail.left = tail.left.left;
                    isChange = true;
                }
                else if (tail.left.val < low) {
                    tail.left.left = null;
                    tail.left = tail.left.right;
                    isChange = true;
                }
                queue.push(isChange ? tail : tail.left);
            }
            if(tail.right != null) {
                let isChange = false;
                if (tail.right.val === low) tail.right.left = null;
                if (tail.right.val === high) tail.right.right = null;
                if (tail.right.val > high) {
                    tail.right.right = null;
                    tail.right = tail.right.left;
                    isChange = true;
                }
                else if (tail.right.val < low) {
                    tail.right.left = null;
                    tail.right = tail.right.right;
                    isChange = true;
                }
                queue.push(isChange ? tail : tail.right);
            }
        }
    }
    return head;
};
//var res = trimBST(new TreeNode(3,new TreeNode(2,new TreeNode(1)),new TreeNode(4)),1,1)
var res = trimBST(new TreeNode(3,new TreeNode(1,null,new TreeNode(2)),new TreeNode(4)),3,4)
//var res = trimBST(new TreeNode(1,null,new TreeNode(2)),2,4)
console.log(res);
console.assert(res === [3,2,null,1])
