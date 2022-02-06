package com.mannue;

import java.time.LocalDate;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int M = sc.nextInt();
        Fibonacci fibonacci = new Fibonacci(M);
        long now = System.currentTimeMillis();
        System.out.printf("result >> %d%n",fibonacci.getByTopDown(M));
        System.out.println(System.currentTimeMillis() - now);
        now = System.currentTimeMillis();
        System.out.printf("result >> %d%n",fibonacci.getByTopDown(M));
        System.out.println(System.currentTimeMillis() - now);
    }
}
