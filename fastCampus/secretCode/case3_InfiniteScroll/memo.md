# 3장  InfiniteScroll

- 풀이 코드 
    ```javascript
          // do something (hint: e.target.scrollingElement)
          const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement
          if (scrollTop + clientHeight >= scrollHeight) loadMore();
    ```
    - 풀이 과정
      - scrollTop 과 clientHeight 의 더한 값이 scrollHeight 보다 크거나 같으면 데이터를 불러오면 된다.
  
- 풀이 외 정리
  - scrollTop 과 clientHeight 그리고 scrollHeight 에 정리 [
    - [참고사이트]("https://ko.javascript.info/size-and-scroll#ref-741")
  - transform: translate(-50%, -50%);
    - tanslate : 요소의 위치를 x 축으로 x 만큼 y 축으로 y 만큼 이동
  - Math.random : 0부터 1 까지 소수점 값을 준다.
  - Element.insertAdjacentHTML()
    ```text
      insertAdjacentHTML() 메서드는 HTML or XML 같은 특정 텍스트를 파싱하고, 특정 위치에 DOM tree 안에 원하는 node들을 추가 한다.
    ```
    - [MDN 참조사이트]("https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML")