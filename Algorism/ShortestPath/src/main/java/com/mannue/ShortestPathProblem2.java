package com.mannue;

import java.util.PriorityQueue;

public class ShortestPathProblem2 {
    class VisitType implements Comparable<VisitType> {
        private int city;
        private int dist;

        public VisitType(int city, int dist) {
            this.city = city;
            this.dist = dist;
        }

        public int getCity() {
            return city;
        }

        public int getDist() {
            return dist;
        }

        @Override
        public int compareTo(VisitType visitType) {
            return this.dist - visitType.dist;
        }
    }

    void find(final int[][] table, final long[] visit, final int start) {
        PriorityQueue<VisitType> queue = new PriorityQueue<>();
        queue.add(new VisitType(start, table[start][start]));
        while (!queue.isEmpty()) {
            VisitType poll = queue.poll();
            if (visit[poll.city] < poll.dist) continue;
            visit[poll.city] = poll.dist;
            for (int i = 1; i < table[poll.city].length; i++) {
                if (table[poll.city][i] > 0) {
                    queue.add(new VisitType(i, poll.dist + table[poll.city][i]));
                }
            }
        }
    }
}
