package com.mannue;

import java.util.Arrays;
import java.util.Scanner;

public class Problem_01 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] input = Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        int city = input[0];
        int line = input[1];
        long [][] city_table = new long[city+1][city+1];
        for (int i=1; i <= city; i++) {
            Arrays.fill(city_table[i], Integer.MAX_VALUE);
        }
        for (int i=1; i <= city; i++) {
            city_table[i][i] = 0;
        }
        initTable(scanner, city_table, line);
        int[] endInput = Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        int X = endInput[0];
        int K = endInput[1];
        ShortestPathProblem shortestPathProblem = new ShortestPathProblem();
        shortestPathProblem.find(city_table,city);
        if(city_table[1][K]== Integer.MAX_VALUE || city_table[K][X] == Integer.MAX_VALUE) {
            System.out.println(-1);
        } else {
            System.out.println(city_table[1][K] + city_table[K][X]);
        }
    }

    private static void initTable(Scanner scanner ,long[][] city_table, int line) {
        for (int i =1; i<= line; i++) {
            int[] s = Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            city_table[s[0]][s[1]] = 1;
            city_table[s[1]][s[0]] = 1;
        }
    }
}
