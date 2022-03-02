package com.mannue;

import java.util.PriorityQueue;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[][] table = new int[7][7];
        makeTable(table);
        find(table, 6,1);
    }


    // TODO priorityQueue 로 작업
    private static void find(int[][] table, int size, int start) {
        int[] check = new int[size + 1];
        PriorityQueue<ShortestPathType> priorityQueue = new PriorityQueue<>();
        priorityQueue.add(new ShortestPathType(start,0));
        while (!priorityQueue.isEmpty()) {
            ShortestPathType item = priorityQueue.poll();
            if (check[item.getNode()] == 1) {
                continue;
            }
            System.out.println("item :: "+item);
            for (int j = 1; j <= size; j++) {
                if (table[item.getNode()][j] != 0) {
                    int minDistance = item.getDistance() + table[item.getNode()][j];
                    priorityQueue.offer(new ShortestPathType(j, minDistance));
                }
            }
            check[item.getNode()] = 1;
        }
    }

    private static void makeTable(int[][] table) {
        table[1][2] = 2;
        table[1][3] = 5;
        table[1][4] = 1;
        table[2][4] = 2;
        table[2][3] = 3;
        table[3][2] = 3;
        table[3][6] = 5;
        table[4][3] = 3;
        table[4][5] = 1;
        table[5][3] = 1;
        table[5][6] = 2;
    }
}
