# 4장 Dark Mode
## 테마를 right / dark 모드를 적용하기 
- 혼자 풀이
    ```javascript
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelector('.toggle-button').click();
            document.querySelector("Body").style.visibility = "visible";
        });
        
        document.querySelector('.toggle-button').onclick = () => {
            const theme = storage.getItem("theme");
            const value = Object.is(theme, "light") ? "dark" : "light";
            storage.setItem("theme", value);
        
            if (Object.is(value, "light")) {
                document.querySelector("Body").classList.remove("dark")
            } else {
                document.querySelector("Body").classList.add("dark")
            }
        };
    ```
    1. 우선 toggle-button 을 찾아서 storage 의 theme 값이 right 인지 여부를 확인했다.
    2. 확인 후 right 가 아니면 right 를 맞으면 dark 로 storage 값을 변경하였고 className 에도 dark 여부에 따라 별명을 제거하였다.
    3. DOMContentLoaded 에서 로딩 되면 toggle-button 을 click 하여 값을 변경해주고 visibility 를 visible 로 변경해줬다.
- 강의 풀이
  ```javascript
     - setTimeout(()=>document.body.style.visibility = "visible",300);
     - document.body.style.classList.toggle("dark",theme === 'dark')
  ```
  - 혼자 한 풀이와 다른점은 transition: left 0.3s; 이 부분을 놓쳤다.
  - transition: left 0.3s 으로 인하여 0.3 delay 를 준 다음에 visible 를 해야 된다.
    
- 풀이외 정리
    - html meta viewport 
        ```text
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ```
        - viewport 는 웹페이지의 크기를 결정
        - width=device-width 는 웹페이지의 크기가 스마트폰의 실제 액정 크기로 설정
        - initial-scale 는 보여주는 화면의 zoom up 정도를 1 배율로 설정
        - [참고사이트]("https://dreamaz.tistory.com/364")
    - html article
        - HTML <article> 요소는 독립적으로 구분해 배포하거나 재사용 할 수 있는 구획을 나타낸다.
        - [참고사이트]("https://developer.mozilla.org/ko/docs/Web/HTML/Element/article")
    - css 의 box-sizing: border-box
        - box-sizing : CSS 속성은 요소의 너비와 높이를 계산하는 방법
            - border-box : 테두리와 안쪽 여백의 크기도 요소의 크기로 고려한다.
            - content-box : 기본 CSS 박스 의 크기 결정을 사용하는 방법으로 요소의 너비를 100 px 로 설정하면 콘텐츠 영역이 100px 너비를 가지며 테두리와 안쪽 여백은 이에 더해 진다.
        - [참고사이트]("https://developer.mozilla.org/ko/docs/Web/CSS/box-sizing")
    - css 의 visibility 속성
        - 태그 의 가시성을 결정 
            - visible : 보임
            - hidden : 숨김
            - collapse : 겹치도록 지정 
            - inherit : 부모 요소의 값을 상속
    - html 의 i 태그
        - 글자를 기율여서 표시하는 태그
    - css 의 transition
        ```text
            transition: <property> <duration> <timing-function> <delay>;
        ``` 
        - [참고사이트]("https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions")
    
## window.matchMedia 사용하기
- 혼자 풀이
    ```javascript
      if (!theme)
        localStorage.setItem('theme', `${window.matchMedia("class: dark").matches ? "dark" : 'light'}`);
    ```
    - 완전 문제를 잘못 인식했다...
- 동영상 풀이
    ```javascript
          if (!theme) {
            console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);
            localStorage.setItem('theme', `${window.matchMedia("(prefers-scheme: dark)").matches ? "dark" : 'light'}`);
          }
    ```
    - window.matchMedia 를 이용하여 시스템의 모드를 가져올수 있다. 
    - 이를 바탕으로 dark 모드 인지 light 모드 인지를 적용한다.
- 풀이외 정리
    - window.matchMedia 
        ```text
            Window.matchMedia() 메서드는 주어진 미디어 쿼리 문자열의 분석 결과를 나타내는 MediaQueryList (en-US) 객체를 반환합니다.
        ```
        - [참고사이트1]("https://developer.mozilla.org/ko/docs/Web/API/Window/matchMedia")
        - [참고사이트2]("https://eunsukim.me/posts/how-to-use-media-query-with-javascript-matchmedia")
    - prefers-color-scheme
        ```text
            - css 에서 시스템의 모드를 아래와 같이 가져올수 있다.
              @media (prefers-color-scheme: dark)
            - js 에서 시스템의 모드를 가져오는 방법
               window.matchMedia('(prefers-color-scheme: dark)
        ```
        - [참고사이트]("https://velog.io/@yijaee/%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0")