package com.mannue;

public class QuickSort {

    public void sort(int[] buffer, final int start, final int end) {
        if (buffer.length <= 0 || start >= end) {
            return;
        }
        final int pivot = start;
        int left = start + 1;
        int right = end;

        while (left < right) {
            while (left <= end && buffer[pivot] >= buffer[left]) {
                left += 1;
            }
            while (right > start && buffer[pivot] <= buffer[right]) {
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
        }

        sort(buffer, start, right - 1);
        sort(buffer, right + 1, end);
    }
}
