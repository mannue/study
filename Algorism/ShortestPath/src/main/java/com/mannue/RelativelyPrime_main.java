package com.mannue;

import java.util.Arrays;
import java.util.Scanner;

public class RelativelyPrime_main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        final int[] input = Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        final int size = input[0];
        final int edgeSize = input[1];
        final int[] buffer = new int[size+1];
        for (int i =1; i <= size; i++) {
            buffer[i] = i;
        }
        RelativelyPrime relativelyPrime = new RelativelyPrime();
        for (int i=1; i <= edgeSize; i++) {
            int[] s = Arrays.stream(scanner.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            relativelyPrime.unionParent(buffer,s[0],s[1]);
        }
        System.out.print("각 원소가 속한 집합:");
        for (int i = 1; i <= size; i++) {
            System.out.print(" "+relativelyPrime.findParent(buffer,i));
        }
        System.out.println();
        System.out.print("부모 테이블:");
        for (int i = 1; i <= size; i++) {
            System.out.print(" "+buffer[i]);
        }
        System.out.println();
    }
}
