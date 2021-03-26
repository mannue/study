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
            // ->
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

## 2. resize 에 무관하게 동작하게끔 기능 구현 
- 혼자 해결한 연습 문제
    ```javascript
        const getOffsetTops = (contentsElem.clientHeight / contentItems.length);
        const { scrollTop } = e.target.scrollingElement;
        const targetIndex = parseInt((scrollTop/getOffsetTops).toFixed(0))
        navItems.forEach((value,index) => {
            if (index !== targetIndex) value.classList.remove("on")
            else value.classList.add("on");
        });
    ```
    - 풀이 과정
        1. 우선 getOffsetTops 값이 사라져서 content 높이에서 contentItem 개수로 나눠야 겠다 라는 생각을 하게 되었으며, 그럼 개당 높이를 알수 있었다.
        2. 스크롤 값을 얻어서 offset 값으로 나눠서 해당 영역이면 클래스 on을 추가하고 삭제하도록 하였다.
        3. 결과적으로 는 잘 동작하였지만 풀이 와는 다른다...
    

- 동영상 정리 
    ```javascript
        const offsetTops = (() => {
            let ofst = 0;
            let res = [];
            return () => {
                if (ofst === window.innerHeight) return res;
                ofst = window.innerHeight;
                res = contentItems.map((elem) => {
                    const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
                    return [ofs - clh / 2, ofs + clh / 2];
                });
                return res;
            }
        })();
        
        window.addEventListener("scroll", e => {
            // fix here
            const { scrollTop } = e.target.scrollingElement;
            // do something
            const findIndex = offsetTops().findIndex((item) => {
                const [start , end] = item;
                return start <= scrollTop && scrollTop <= end
            });
        });
    ```
    - 차이점
        ```javascript
            const offsetTops = (() => {
            let ofst = 0;
            let res = [];
            return () => {
                    if (ofst === window.innerHeight) return res;
                    ofst = window.innerHeight;
                    res = contentItems.map((elem) => {
                        const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
                        return [ofs - clh / 2, ofs + clh / 2];
                    });
                    return res;
                }
            })();
        ```
        - 먼저 함수를 만들어서 실행 시키도록 하였지만 매번 계산으로 인해 클로저 를 사용하도록 하였다.
        - window 의 높이 값을 통해 다시 계산하도록 처리하였다.
        
    - 문제 풀이 외 정리
        - 클로저 
            - 우선 클로저를 이해 하기 전에 자바스크립트의 특징을 알아야 된다.
            - 자바 스크립트는 선언 한 시기가 중요하며 럭시컬 스코프 을 가지며, 메소드 나 객체를 참조 시에는 사라지지 않는다.
            - 결국 클로저는 외부에서는 참조 할수 없지만 내부에서만 참조 가능한 구조가 클로저 이다.
            
        - Window.innerHeight
        ```text
            The read-only innerHeight property of the Window interface returns the interior height of the window in pixels, including the height of the horizontal scroll bar, if present.
            읽기 전용 속성의 윈도우 인터페이스 이며 내부 윈도우 높이를 리턴한다 
            현재 수평 스크롤 바가 있다면 해당 높이 값도 포함된다. 
        ```

## 3. resize 이벤트를 이용한 방법
- 혼자 해결한 풀이
    ```javascript
        let offsetTops = [];
        const getOffsetTops = () => {
            offsetTops = contentItems.map((elem) => {
                const [ofs, clh] = [elem.offsetTop, elem.clientHeight];
                return [ofs - clh / 2, ofs + clh / 2];
            });
        };
        getOffsetTops();
    ```
    - 풀이 과정
        ```javascript
            window.addEventListener("resize", getOffsetTops);
        ```
        - 기존에는 이벤트 안에서 window.innerHeight 를 체크했지만 이벤트를 등록함으로써 size 변경이 해당 함수가 호출됩니다.
    
- 문제 풀이 외 정리
    - window.addEventListener 
        ```text
            Window.addEventListener(     type: string,     listener: EventListener | EventListenerObject,     options?: boolean | AddEventListenerOptions): void
            Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched.
            이벤트를 위해 이벤트 리스너를 추가하며 속성 값이 타입이며, 콜백을 등록 한다. 콜백은 이벤트가 발생하면 실행된다.
            
            addEventListener(type: K, listener: (this:Window, ev: WindowEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void`
        ```
        - 이벤트 리스너 안에서 this.innerHeight 값을 가져올수 있지만 해당 이벤트는 사이즈 변경시 발생함으로 해당 값이 필요없다.
    - JavaScript 의 Object 형식
        ```text
                interface DOMTokenList {
                /**
                * Returns the number of tokens.
                */
                readonly length: number;
                /**
                * Returns the associated set as string.
                *
                * Can be set, to change the associated attribute.
                */
                value: string;
                toString(): string;
                /**
                * Adds all arguments passed, except those already present.
                *
                * Throws a "SyntaxError" DOMException if one of the arguments is the empty string.
                *
                * Throws an "InvalidCharacterError" DOMException if one of the arguments contains any ASCII whitespace.
                */
                add(...tokens: string[]): void;
                /**
                * Returns true if token is present, and false otherwise.
                */
        ```
        - 자바 스크립트는 오브젝트도 key, value 쌍이다.
        ```javascript
            c.classList[i === targetIndex ? "add" : "remove"]("on");
        ```
        - 그래서 메소드도 위처럼 키 값을 이용해서 가져온 다음 함수 호출로 처리할 수있다.
            
