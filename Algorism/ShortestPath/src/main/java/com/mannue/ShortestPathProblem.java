package com.mannue;

public class ShortestPathProblem {
    public void find(long[][] table, int n) {
        for (int i=1; i < n+1; i++)
            for (int j=1; j < n+1; j++)
                for (int k=1; k < n+1; k++) {
                    table[j][k] = Math.min(table[j][k], table[j][i]+table[i][k] > Integer.MAX_VALUE ? Integer.MAX_VALUE : table[j][i]+table[i][k]);
                }
    }
}
