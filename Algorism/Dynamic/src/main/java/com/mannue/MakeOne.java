package com.mannue;

public class MakeOne {
    private int[] table;
    public MakeOne(int size) {
        table = new int[size+1];
    }
    public int findMin(final int data) {
        for (int i=2; i < data+1; i++) {
            table[i] = table[i-1] + 1;
            if (i % 2 == 0) table[i] = Math.min(table[i],table[i/2] + 1);
            if (i % 3 == 0) table[i] = Math.min(table[i],table[i/3] + 1);
            if (i % 5 == 0) table[i] = Math.min(table[i],table[i/5] + 1);
        }
        return table[data];
    }
}
