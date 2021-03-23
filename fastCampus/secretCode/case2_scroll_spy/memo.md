# 2장  Scroll Spy
## 1. offsetTop, scrollTop, ClientHeight 의 상관관계
- 혼자 해결한 연습 문제
    ```javascript
    window.addEventListener("scroll", (e) => {
      const { scrollTop } = e.target.scrollingElement;
      // do something
      const findIndex = offsetTops.findIndex(([start , end]) => start <= scrollTop && scrollTop <= end);
    
      navItems.forEach((value,index) => {
        if (index !== findIndex) value.classList.remove("on")
        else {
          if(value.classList.contains("on")) return;
          value.classList.toggle("on");
        }
      });
    });
    ```
  - 풀이 과정
    1. 우선 자바스크립트의 비구조화 할당 문법 이 나오면 이를 먼저 알아야 된다. 
        - [비구조화 할당 문법 참고 사이트](https://learnjs.vlpt.us/basics/06-object.html#%EA%B0%9D%EC%B2%B4-%EB%B9%84%EA%B5%AC%EC%A1%B0%ED%99%94-%ED%95%A0%EB%8B%B9)
    2. 코드를 살펴 보니 스크롤 이벤트를 통해 scrollTop 값을 가져오는 이게 우선 어떤 값인지 확인이 필요했으며, 확인해 보니 스크롤에 대한 number 값이다.
    3. 자바스크립트 샘플 코드에 영역 끝과 다음 영역의 처음 사이를 배열로 가지고 있었다. 이를 통해 해당 영역안에 스크롤이 있을때 변경해 주면 될것 같다고 생각하였다.   
        ```javascript
         const findIndex = offsetTops.findIndex((item) => {
            const [start , end] = item;
           return start <= scrollTop && scrollTop <= end
         });
        ```
       - 위 코드 처럼 영역에 있으면 해당 index 값을 넘겨주도록 하였다.
    4. 찾은 index 값을 알수 있으니 이젠 navItems 를 순환 하면서 해당 값과 map 의 index 값을 비교해서 1장에서 배운 classList 를 사용하면 될것 같았다.
        ```javascript
            navItems.forEach((value,index) => {
                if (index !== findIndex) value.classList.remove("on")
                else {
                  if(value.classList.contains("on")) return;
                  value.classList.toggle("on");
                }
            });
        ```
        - 위 정리한것 처럼 순환하면서 index 를 비교하고 해당 영역이 아니면 class 에서 on 을 삭제하고 맞으면 on 을 추가한다.
        - 여기서 해당 영역이 맞은데 on 이 존재하면 return 해야 한다. 그 이유는 해당 영역에서 on 인데 계속 리랜더링 하기 때문이다.
    
- 동영상 정리
    - 차이점
        ```javascript
            if(value.classList.contains("on")) return;
            value.classList.toggle("on");
            -> 
            value.classList.add("on");
        ```
    - 풀이 과정
        - 위에 해결한 방법과 거의 일치 한다. 다만 위 코드처럼 toggle 이 아닌 add 로 변경하는게 효과적이다.

- 문제 풀이 외 정리 
    - Array.from() 
        ```text
           Array.from() 메서드는 유사 배열 객체(array-like object)나반복 가능한 객체(iterable object)를 얕게 복사해새로운Array 객체를 만듭니다.
        ```
        - [참고 사이트]("https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from")
    - Element.parentElement
        ```text
            The Node.parentElement read-only property returns the DOM node's parent Element, or null if the node either has no parent, or its parent isn't a DOM Element.
            parentElement 는 읽기 전용 속성이며, 부모 Element 가 있으면 Element 를 주고 없거나 부모 Element 가 DOM Element 가 아니면 null 를 리턴한다. 
        ```
        - [참고 사이트]("https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement")
    - Element.scrollIntoView
        ```text
            Element 인터페이스의 scrollIntoView() 메소드는 scrollIntoView()가 호출 된 요소가 사용자에게 보여지도록 요소의 상위 컨테이너를 스크롤합니다.
        ```
        - [참고 사이트]("https://developer.mozilla.org/ko/docs/Web/API/Element/scrollIntoView")
    