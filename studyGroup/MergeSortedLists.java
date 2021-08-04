class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists.length < 1) return null;
        ListNode result = new ListNode(-1,null);
        for (ListNode list : lists) {
            if (list == null) continue;
            this.insert(result, list);
        }
        return result.next;
    }

    public void insert(ListNode headerNode, ListNode inputNode) {
        ListNode node = inputNode;
        while(node != null) {
            if (headerNode.next == null) {
                headerNode.next = node;
                break;
            } else {
                if (headerNode.next.val > node.val) {
                    ListNode item = headerNode.next;
                    headerNode.next = new ListNode(node.val,item);
                    node = node.next;
                }
                headerNode = headerNode.next;
            }
        }
    }
}
