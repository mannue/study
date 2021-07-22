import java.util.Arrays;
import java.util.Objects;

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists.length < 1) return null;
        ListNode result = getMinIndex(lists);
        if (result != null) {
            for (ListNode list : lists) {
                if (list == null || list == result) continue;
                this.insert(result, list);
            }
        }
        return result;
    }

    private ListNode getMinIndex (ListNode[] lists) {
        try {
            return Arrays.stream(lists).filter(Objects::nonNull).sorted((first, second) -> first.val - second.val).findFirst().get();
        } catch (Exception e) {
            return null;
        }
    }

    public void insert(ListNode headerNode, ListNode inputNode) {
        ListNode node = inputNode;
        while(node != null) {
            if (headerNode.next == null) {
                headerNode.next = node;
                break;
            }
            if (headerNode.next.val > node.val) {
                ListNode item = headerNode.next;
                headerNode.next = new ListNode(node.val,item);
                node = node.next;
            }
            headerNode = headerNode.next;
        }
    }
}
