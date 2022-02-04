package com.mannue.search;

public class MakeRiceCake {
    int findHeight(final int[] buffer, final int findSize) {
        this.sort(buffer,0, buffer.length-1);
        int max = buffer[buffer.length-1];
        return find(buffer,0, max, findSize);
    }
    int find(final int[] buffer, int start, int end, int target) {
        if (start > end) return -1;
        int middle= (start + end) / 2;
        int sum = 0;
        for (int data: buffer) {
            sum += Math.max(data - middle, 0);
            if (sum > target) break;
        }
        if (sum == target) {
            return middle;
        }
        return sum > target ? this.find(buffer, middle, end, target) : this.find(buffer,start, middle, target);
    }
    void sort(final int[] buffer, int start, int end) {
        if (start > end) return;
        final int pivot = start;
        int left = start + 1;
        int right = end;

        while (left < right) {
            while (left < end && buffer[pivot] >= buffer[left]) {
                left += 1;
            }
            while (right > pivot && buffer[pivot] <= buffer[right]) {
                right -= 1;
            }
            if (left < right) {
                int temp = buffer[left];
                buffer[left] = buffer[right];
                buffer[right] = temp;
            } else {
                int temp = buffer[right];
                buffer[right] = buffer[pivot];
                buffer[pivot] = temp;
            }
            this.sort(buffer,start,right - 1);
            this.sort(buffer, right + 1, end);
        }
    }
}
