package com.mannue.search;

import java.util.Arrays;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("입력!!");
        int[] s = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        int N = s[0];
        int M = s[1];
        int[] s1 = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        MakeRiceCake makeRiceCake = new MakeRiceCake();
        int result = makeRiceCake.findHeight(s1,M);
        System.out.printf("result :: %d%n", result);
    }
}
