package com.mannue.algo;

import java.util.List;
import java.util.PriorityQueue;

public class Kruskal {
    int getParent(int[] table, int index) {
        if (table[index] != index) {
            table[index] = this.getParent(table, table[index]);
        }
        return table[index];
    }

    void find(PriorityQueue<Kruskal_Main.KruskalType>buffer, int[] table, List<Kruskal_Main.KruskalType> order) {
       while (!buffer.isEmpty()) {
           Kruskal_Main.KruskalType poll = buffer.poll();
           if (table[poll.getFirstLine()] == table[poll.getSecondLine()]) continue;
           int firstParent = getParent(table, poll.getFirstLine());
           int secondParent = getParent(table, poll.getSecondLine());
           if (firstParent == secondParent) continue;
           if (firstParent < secondParent) {
               table[secondParent] = firstParent;
           } else {
               table[firstParent] = secondParent;
           }
           order.add(poll);
       }
    }

}
