## 다이나믹 프로그래밍

1. 다이나믹 프로그래밍의 2가지 방식
   1. 탑다운
   2. 보텀업 

   
2. 다이나믹 프로래밍에서의 기법
   1. 메모이제이션
      1. 메모이제이션은 값을 저장하는 방법이므로 cache 이라고도 한다.
   
   
3. 다이나믹 프로그래밍의 조건
   1. 큰문제를 작은 문제로 나눌수 있다.
   2. 작은 문제에서 구한 정답은 그것을 포함하는 큰 문제에서도 동일하다.


4. 다이나믹 프로그래밍의 예
   1. 피보나치 수열
      1. 시간 복잡도 : O(2^n)
      2. 문제점 
         1. 동일한 값에 대해 중복 연산
         2. f(4) = f(3) + f(2) 이고 f(3) = f(2) + f(1)
      3. 문제점 해결 방안
         1. 메모이제이션 기법 사용
      4. 메모이제이션 기법 적용 전 코드
         ```java
         public class Fibonacci {
             public int get(int m) {
                 if (m == 1 || m == 2) return 1;
                 return get(m-1) + get(m-2);
             }
         }
         ```
      5. 메모이제이션 기법 적용 후 코드
         ```java
         public class Fibonacci {
             private final int[] table;
    
             public Fibonacci(final int size) {
                  this.table = new int[size+1];
             }
    
              public int get(int m) {
                  if (m == 1 || m == 2) return 1;
                  if (table[m] > 0) return table[m];
                  table[m] = get(m-1) + get(m-2);
                  return table[m];
              }
          }
         ```