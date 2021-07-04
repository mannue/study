# Model Windows
## case 1 : js 를 이용해서 구현해라
- 구현 내용
    ```text

    ```
- 셀프 구현 코드
    ```javascript
        document.querySelector('.popup-trigger').addEventListener('click', function () {
        // 팝업 열기를 클릭했을 때 모달을 띄우도록 구현하세요.onSetIsVisible
            bodyBlackout.classList.add('is-blacked-out')
            popupModal.classList.add('is--visible')
        
        });
        
        popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {
        // 닫기 버튼을 눌렀을 때 작동하도록 구현하세요.
            close_popup()
        })
        
        bodyBlackout.addEventListener('click', () => {
        // 모달 바탕을 클릭 했을 때 작동하도록 구현하세요.
            close_popup()
        })
        
        let close_popup = () => {
            bodyBlackout.classList.remove('is-blacked-out')
            popupModal.classList.remove('is--visible')
        }
    ```
- 코드 설명
    - popup-modal 은 현재 css 의 opacity 를 0 을 가짐으로써 눈에 안보이는 상태지만 html에 자리를 잡고 있는 상태이다.
    - 버튼 클릭시 blacked-out 을 해주고 눈에 안보이는 pop-modal 를 보여주면 된다.
  
- 모르는 부분 정리
  - vh (viewport height)
    - 전체 스크린 크기의 1 / 100 를 뜻한다 
    - ex) 스크린 크기가 height = 1000px 이면 1vh 는 10px 이다.
    - [참고사이트](https://programming119.tistory.com/93)
  - text-decoration 
    - 글씨의 장식(선)색을 지정
    - [참고사이트](https://developer.mozilla.org/ko/docs/Web/CSS/text-decoration)
  - inherit
    -  부모의 값을 사용
