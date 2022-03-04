package com.mannue.algo;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

public class Kruskal_Main {
    static class KruskalType implements Comparable<KruskalType> {
        int firstLine;
        int secondLine;
        int cost;

        public int getFirstLine() {
            return firstLine;
        }

        public int getSecondLine() {
            return secondLine;
        }

        public int getCost() {
            return cost;
        }

        public KruskalType(int firstLine, int secondLine, int cost) {
            this.firstLine = firstLine;
            this.secondLine = secondLine;
            this.cost = cost;
        }

        @Override
        public int compareTo(KruskalType kruskalType) {
            return this.cost - kruskalType.cost;
        }

        @Override
        public String toString() {
            return "KruskalType{" +
                    "firstLine=" + firstLine +
                    ", secondLine=" + secondLine +
                    ", cost=" + cost +
                    '}';
        }
    }

    public static void main(String[] args) {
        PriorityQueue<KruskalType> queue = new PriorityQueue<KruskalType>();
        init(queue);
        int[] table = new int[8];
        for (int i = 1; i <= 7; i++) {
            table[i] = i;
        }
        List<KruskalType> order = new ArrayList<>();
        Kruskal kruskal = new Kruskal();
        kruskal.find(queue, table, order);

        order.stream().forEach(System.out::println);
    }

    public static void init(final PriorityQueue<KruskalType> queue) {
        queue.add(new KruskalType(1, 2, 29));
        queue.add(new KruskalType(1, 5, 75));
        queue.add(new KruskalType(2, 3, 35));
        queue.add(new KruskalType(2, 6, 34));
        queue.add(new KruskalType(3, 4, 7));
        queue.add(new KruskalType(4, 6, 23));
        queue.add(new KruskalType(4, 7, 13));
        queue.add(new KruskalType(5, 6, 53));
        queue.add(new KruskalType(6, 7, 25));
    }
}
