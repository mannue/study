### 1. Context Menu - 기본 코드 
```javascript
const items = document.querySelectorAll('.item')
items.forEach((item) => {
    item.addEventListener('click',  (e) => {
        item.classList.toggle('open')
    });
});
```
- #### 코드 설명
    - querySelectorAll method 은 아래와 같으며, html 페이지 내 class 변명인 .item 를 가져온다  
        ```text
        Document 메소드 querySelectorAll() 는 지정된 셀렉터 그룹에 일치하는 다큐먼트의 엘리먼트 리스트를 나타내는 정적(살아 있지 않은) NodeList 를 반환합니다.
        ```
    - 가져온 리스트 에서 각각 element 에 click Event 를 추가한다.

- #### 문제점
    - item element 를 클릭 할때 마다 다 open 된다.

- #### 문제점 수정 
    ```javascript
        // Write Javascript code here!
    const items = document.querySelectorAll('.item')
    items.forEach((item) => {
        item.addEventListener('click',  (e) => {
            item.classList.toggle('open')
            items.forEach((elem) => {
                if (elem !== item) {
                    elem.classList.remove('open');
                }
            });
        });
    });
    ```
    - 클릭 이벤트 안에서 items 리스트를 순환 하면서 자신이 아닌 element 에서 open 을 삭제 해 준다.
    - __위 코드의 문제점은 요소마다 많은 이벤트를 추가 해야 되며, 성능 저하를 가지고 온다!!__ 

- #### 다시 문제점 수정
    ```javascript
      wrapper.addEventListener('click', (e) => {
        const targetElem = e.target;
        console.dir(e);
        e.stopPropagation();
        if (targetElem.classList.contains('item')) {
            targetElem.classList.toggle('open');
            items.forEach((elem) => {
                if (elem !== targetElem) {
                    elem.classList.remove('open')
                }
            });
        }
      });
    ```
    - 자바스크립트 의 버플링을 이용하여 상위 element 에 이벤트 를 추가 하여 처리하였다.
    - __이젠 완벽 하는가? 아니다... wrapper 영역 밖에서 클릭 시 context 가 닫히지 않는다!!__

- #### 또 다시 문제 수정 
    ```javascript
        const items = document.querySelectorAll('.item')
        const wrapper = document.querySelector('.wrapper');
        wrapper.addEventListener('click', (e) => {
          const targetElem = e.target;
          console.dir(e);
          e.stopPropagation();
          if (targetElem.classList.contains('item')) {
            targetElem.classList.toggle('open');
            items.forEach((elem) => {
              if (elem !== targetElem) {
                elem.classList.remove('open')
              }
            });
          }
        });
        
        document.body.addEventListener('click', (e) => {
          if (e.target.classList.contains('context')) return;
            items.forEach((elem) => {
                elem.classList.remove('open')
            });
        });
    ```
    - 이젠 Body 클릭 시 열려 있는 context 가 닫힌다!
    - 위 코드 에서 알아야 되는 부분 
    ```text
        e.stopPropagation()  
        - 부모 element 로 이벤트 전파를 중지하는 API
        e.preventDefault()
        - 브라우저 행동을 막는 API
    ```

