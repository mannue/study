package com.mannue;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int M = sc.nextInt();
        Fibonacci fibonacci = new Fibonacci(M);
        System.out.printf("%d%n",fibonacci.get(M));
    }
}
