var deleteDuplicates = function (head) {
    if (!head || !head.next) return head;
    var _head = undefined;
    var _tail = head;
    for (let node = head; node != null; node = node.next) {
        if (node.next && (node.val !== node.next.val)) {
           if (!_head) {
               _head  = node;
               _tail  = node.next;
           }
           else {
               _tail.next = node.next;
               _tail = _tail.next;
           }
        }
    }
    _tail.next = null;
    if (!_head) _head = _tail;
    return _head;
};


function ListNode(val, next) {
    this.val = (val ===  undefined ? 0 : val);
    this.next = (next === undefined ? null: next)
}

var res = deleteDuplicates(new ListNode(1,new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3))))))


for (let node = res; node != null; node =node.next) {
    console.log(node.val)
}
