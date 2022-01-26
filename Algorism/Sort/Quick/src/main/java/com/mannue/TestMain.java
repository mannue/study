package com.mannue;

import java.util.Arrays;

public class TestMain {
    public static void main(String[] args) {
        int [] buffer = new int[] { 5,4,2,3,1,10,23,3,4,5,9,11,-9,3};
        QuickSort quickSort = new QuickSort();
        quickSort.sort(buffer,0, buffer.length-1);
        Arrays.stream(buffer).forEach(System.out::println);
    }
}
