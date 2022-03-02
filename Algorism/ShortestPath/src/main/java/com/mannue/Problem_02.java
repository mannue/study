package com.mannue;

import java.util.Arrays;
import java.util.Comparator;
import java.util.Scanner;

public class Problem_02 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] input = Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        int N = input[0];
        int M = input[1];
        int C = input[2];
        int [][] table = new int[N+1][N+1];
        long [] visit = new long[N+1] ;
        for (int i = 1; i <= N; i ++) {
            visit[i] = Integer.MAX_VALUE;
        }
        for (int i=1; i <= M; i++) {
            int[] dist = Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            table[dist[0]][dist[1]] = dist[2];
        }
        ShortestPathProblem2 shortestPathProblem2 = new ShortestPathProblem2();
        shortestPathProblem2.find(table, visit, C);
        long[] res = Arrays.stream(visit).sorted().filter(i -> i > 0).toArray();
        System.out.println(res.length + " " + res[res.length-1]);
    }
}
