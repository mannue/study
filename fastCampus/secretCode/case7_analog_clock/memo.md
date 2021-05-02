# Analog Clock
- JS
    - 혼자 풀이 
      ```javascript
            let today = new Date();
            let second = today.getSeconds();
            let minute = today.getMinutes();
            let hour = today.getHours();
            function setTime(hour,minute,second) {
                $secondHand.style.transform = `rotate(${second * 6}deg)`;
                $minuteHand.style.transform = `rotate(${minute * 6}deg)`;
                $hourHand.style.transform = `rotate(${hour * 30 + ((minute % 60) * 0.5)}deg)`;
            }
            setTime(hour,minute,second);
            return () => {
                setInterval(()=>{
                    second = second + 1;
                    minute = minute + parseInt(second / 60);
                    hour = (hour + parseInt(minute / 60) % 12);
                    minute = minute % 60;
                    second = second % 60;
                    setTime(hour,minute,second);
                },1000);
            }
      ```
      - SetInterval 를 통해서 1초 단위로 발생 해당 function 안에서 시간을 구하고 setTime을 통해서 각도를 조절 하도록 작성
    
    - 동영상 풀이
      ```javascript
        const $hourHand = document.querySelector('.hand.hour');
        const $minuteHand = document.querySelector('.hand.minute');
        const $secondHand = document.querySelector('.hand.second');
        
        return () => {
        const now = new Date();
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();
        

        $secondHand.style.setProperty('--deg', seconds * 6);
        $minuteHand.style.setProperty('--deg', minutes * 6 + seconds * 0.1);
        $hourHand.style.setProperty('--deg', hours * 30 + minutes * 0.5 + seconds * (0.5 / 60));
        };
      ```
      - 차이점
        1. 혼자 풀이를 했을 때는 interval 에서 count 를 통해서 시,분,초 를 계산했지만 동영상에서는 그냥 그때그때 Date object 를 생성하였다.
        2. style 의 값을 혼자 풀이 할때는 rotate 값을 지정 사용했지만 동영상에서는 --deg 라는 변수를 control 하여 회전 시켰다.
    
    - 풀이외 정리
        ```text
            - DOMContentLoaded
              초기 HTML 문서를 불러오고 분석했을 때 발생하는 이벤트 로서 css 나 이미지, 하위 프레임의 로딩은 기다리지 않는다.
        ```
        ```text
            - CSS 
              calc() : CSS 속성의 값으로 계산식을 지정할수 있다.
              var()  : 사용자 지정속성 또는 "CSS 변수"의 값을 다른 속성 값으로 지정할때 사용
        ```
        - 참고 사이트
            - [DOMContentLoaded](https://developer.mozilla.org/ko/docs/Web/API/Window/DOMContentLoaded_event)
            - [CSS](https://developer.mozilla.org/ko/docs/Web/CSS/calc())
    
- React 
    - 풀이외 정리
        ```text
            - css 
              & : 부모 참조 선택자 를 대신하는 기호 
        ```
        - 참고 사이트
            - [css](https://radan.tistory.com/23) 
