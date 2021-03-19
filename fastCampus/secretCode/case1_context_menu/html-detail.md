### 1. Context Menu - html-detail TAG
- ### detail ??
  ```text
    detail tag 는 사용자가 직접 조작하여 보거나 숨길 수 있는 부가적인 세부사항을 명시할때 사용
  ```
  [참고한 사이트](http://www.tcpschool.com/html-tags/details)

- ### 코드 분석
  ```javascript
  // Write Javascript code here!
  const items = document.querySelectorAll('details');
  
  document.body.addEventListener('click', event => {
      if (event.target.nodeName !== 'SUMMARY' && event.target.nodeName !== 'P') {
          items.forEach((item) => {
              item.removeAttribute('open')
          });
      }
    items.forEach((item) => {
        if (item !== event.target.parentElement) {
            item.removeAttribute('open')
        }
    });
  });
  ```
  - e.target.nodeName 은 요소의 