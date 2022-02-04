package com.mannue.search;

import java.sql.Time;

public class FindPart {

    public void isOk(int[] buffer, int[] s1) {
        this.sort(buffer, 0, buffer.length - 1);
        for (int item : s1) {
            System.out.print(find(buffer, 0, buffer.length, item) ? " yes" : " no");
        }
    }

    boolean find(final int[] buffer, final int start, final int end, final int target) {
        if (start > end) return false;
        int middle = (start + end) / 2;
        if (buffer[middle] > target) {
            return find(buffer, start, middle - 1, target);
        } else if (buffer[middle] < target) {
            return find(buffer, middle + 1, end, target);
        } else return true;
    }

    void sort(int[] buffer, int start, int end) {
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
            if (left > right) {
                int temp = buffer[right];
                buffer[right] = buffer[pivot];
                buffer[pivot] = temp;
            } else {
                int temp = buffer[left];
                buffer[left] = buffer[right];
                buffer[right] = temp;
            }
        }
        sort(buffer, 0, right - 1);
        sort(buffer, right + 1, end);
    }
}
