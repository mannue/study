package com.mannue;

public class Fibonacci {
    private final int[] table;

    public Fibonacci(final int size) {
        this.table = new int[size+1];
    }

    public int get(int m) {
        if (m == 1 || m == 2) return 1;
        if (table[m] > 0) return table[m];
        table[m] = get(m-1) + get(m-2);
        return table[m];
    }
}
