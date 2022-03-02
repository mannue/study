package com.mannue;

public class RelativelyPrime {
    int findParent(final int[] parent, final int child) {
        if (parent[child] != child) {
            parent[child] = findParent(parent, parent[child]);
        }
        return parent[child];
    }

    void unionParent(final int[] parent, int first, int second) {
        int a = findParent(parent, first);
        int b = findParent(parent, second);
        if (a < b) {
            parent[second] = a;
        } else {
            parent[first] = b;
        }
    }
}
