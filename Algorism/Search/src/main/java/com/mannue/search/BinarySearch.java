package com.mannue.search;

public class BinarySearch {
    public int find(int[] buffer, int start, int end, int target) {
        if (start > end) return -1;
        int middle = (start + end) / 2;
        if (buffer[middle] == target) return middle;
        else {
            if (buffer[middle] > target) {
                return this.find(buffer, start, middle - 1, target);
            } else {
                return this.find(buffer, middle+1, end, target);
            }
        }
    }
}
