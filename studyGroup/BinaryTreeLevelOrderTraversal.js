function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}
var levelOrder = function(root) {
    let res = [];
   if (!root) return res;
   let queue = [];
   queue.push(root);
   while(queue.length > 0) {
       let size = queue.length;
       let input = [];
       for (let i=0; i < size; i++) {
           let item = queue.shift();
           if (item.left) queue.push(item.left)
           if (item.right) queue.push(item.right)
           input.push(item.val);
       }
       res.push(input);
   }
   return res;
}

let res = levelOrder(new TreeNode(3,new TreeNode(9),new TreeNode(20,new TreeNode(15),new TreeNode(7))))
console.log(res)
console.assert(res === [[3],[9,20],[15,7]]);
