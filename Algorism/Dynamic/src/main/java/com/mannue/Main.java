package com.mannue;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
//        int M = sc.nextInt();
//        Fibonacci fibonacci = new Fibonacci(M);
//        long now = System.currentTimeMillis();
//        System.out.printf("result >> %d%n",fibonacci.getByTopDown(M));
//        System.out.println(System.currentTimeMillis() - now);
//        now = System.currentTimeMillis();
//        System.out.printf("result >> %d%n",fibonacci.getByTopDown(M));
//        System.out.println(System.currentTimeMillis() - now);
//        MakeOne makeOne = new MakeOne(M);
//        System.out.println(makeOne.findMin(M));
        int[] s = Arrays.stream(sc.nextLine().split(" ")).mapToInt(Integer::parseInt).toArray();
        MaxProvision maxProvision = new MaxProvision(s.length-1);
        int i = maxProvision.get(s);
        System.out.printf("%d%n",i);
    }
}
