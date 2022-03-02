package com.mannue;

import java.util.Comparator;

public class ShortestPathType implements Comparable<ShortestPathType> {
    private int node;
    private int distance;

    public ShortestPathType(int node, int distance) {
        this.node = node;
        this.distance = distance;
    }

    public int getNode() {
        return node;
    }

    public int getDistance() {
        return distance;
    }

    @Override
    public String toString() {
        return "ShortestPathType{" +
                "node=" + node +
                ", distance=" + distance +
                '}';
    }

    @Override
    public int compareTo(ShortestPathType target) {
        return this.distance - target.distance;
    }
}
