package com.mannue;

public class Fibonacci {
    private final int[] table;

    public Fibonacci(final int size) {
        this.table = new int[size+1];
    }

    public int getByTopDown(int m) {
        if (m == 1 || m == 2) return 1;
        if (table[m] > 0) return table[m];
        table[m] = getByTopDown(m-1) + getByTopDown(m-2);
        return table[m];
    }

    public int getByBottomUp(int m) {
        int [] dpTable = new int[m+1];
        dpTable[1] = 1;
        dpTable[2] = 1;
        if (m < 3) {
            return dpTable[m];
        }
        int result = 0;
        for (int i =3 ; i <= m; i++) {
            int item = dpTable[i-1] + dpTable[i-2];
            dpTable[i] = item;
            result += item;
        }
        return result;
    }
}
