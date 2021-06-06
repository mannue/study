# Auto complete

- 정리
    - 코드
    ```javascript
        displayWordList(selector, data) {
             // 구현 부분 
            let inputRect = this.textinputElement.getBoundingClientRect();
            selector.style.cssText = `
              top: ${inputRect.top + inputRect.height}px;
            `;
            return document.querySelectorAll('.auto-complete-item-box');
        }
    ```
    - document.querySelectorAll('.auto-complete-item-box') 를 return 한 이유는 향후 click 이벤트를 쉽게 추가하기 위함 
    - debounce 코드 작성
      - 정의 
        - 계속 발생하는 이벤트 처리시 성능 저하가 오기 때문에 마지막 완료시에만 이벤트를 처리하는 방법 
      - [참고 사이트](https://pks2974.medium.com/throttle-%EC%99%80-debounce-%EA%B0%9C%EB%85%90-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-2335a9c426ff)
    - 이벤트 
      - keyup 
        - 키를 놓을때 발생하는 이벤트 
        - [참고 사이트](https://developer.mozilla.org/ko/docs/Web/API/Document/keyup_event)
      - focusout
        - element 에서 focus 가 사라지면 발생하는 이벤트로 이와 유사한 이벤트로는 blur(블러) 가 있다.
        - blur 와의 차이점
          - focusout 의 bubble 인 반면에 blur 는 아니다
          - 즉 상위 부모 element 에서 처리하지 않고 자신이 해당 이벤트를 직접 처리하는 경우에는 blur 가 좋을것 같다.
      - focusin
        - focusout 과 반대로 focus 가 생기면 발생하는 이벤트 이다.
        - focusin 도 유사한 이벤트로는 focus 가 있다.
        - focus 와의 차이점
          - blur 와 focusout 간의 차이점과 마찬가지로 focusin 는 bubble 이지만, focus 는 아니다.
      - mouseover
        - pointing device 를 사용해서 해당 element 로 cursor 를 옮기면 발생하는 이벤트
      - mouseout
        - 해당 element 에서 cursor 가 떠날때 발생하는 이벤 
    ``` css
        .auto-complate-container {
             vertical-align: 수직 정렬 할때 사용 단 display 가 inline 이거나 inline-block 일때만 사용가능
         }
        .auto-complete-item-list-box {
              opacity: 투명도 (0~1) 사이의 값 지정
        }
    ```
