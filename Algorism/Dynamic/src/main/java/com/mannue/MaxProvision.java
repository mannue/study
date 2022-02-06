package com.mannue;

public class MaxProvision {
    int [] dpTable;

    public MaxProvision(final int size) {
        this.dpTable = new int[size+1];
    }

    int get(int[] buffer) {
        dpTable[0] = buffer[0];
        dpTable[1] = Math.max(buffer[0],buffer[1]);

        for(int i =2; i < buffer.length; i++) {
            dpTable[i] = Math.max(dpTable[i-1], dpTable[i-2] + buffer[i]);
        }

        return dpTable[dpTable.length-1];
    }
}
