# 3. HTML, JSX, CSS
- JSX는 HTML과 코드의 조합을 가능하게 하는, 리액트 개발도구가 지원하는 자바스크립트의 상위 집합이다.

- HTML 과 DOM 엘리먼트의 이해
    - HTML은 사용자에게 보여줄 콘텐츠를 기술하는 언어
    - 리액트 애플리케이션에선 public 폴더 안에 index.html 파일에 있는 정적 콘텐츠와 리액트가 동적으로 만든 HTML 콘텐츠가 결합돼 브라우저를 통해 사용자에게 보여줄 HTML 문서가 생성
    - 하나의 HTML 엘리먼트는 HTML 문서에 포함된 각 개별 콘텐츠의 유형을 나타낸다.
        ```html
           <h4 class="bg-primary text-white text-center p-2 m-1">
               Static HTML Element
           </h4>
        ```
        - 엘리먼트는 시작 태그, 종료 태그, 속성, 컨텐츠로 구성
        - 엘리먼트의 이름은 h4이며, 브라우저가 태그사이의 컨텐츠를 헤더로 취급하라는 뜻
        - 헤더 엘리먼트는 h1 부터 h6까지 있으며, 보통은 가장 중요한 컨텐츠엔 h1을, 그다음 중요한 컨텐츠엔 h2를 사용하는 식

- 엘리먼트 콘텐츠의 제약사항
    - 어떤 엘리먼트는 자식으로 가질수 있는 엘리먼트의 유형에 제약이 있다.
    - div 엘리먼트는 HTML 문서에 구조를 추가할 수 있는 어떤 엘리먼트라도 자식으로 가질 수 있다.
    
- 속성의 이해
    - 엘리먼트에 속성(attribute)을 추가하면 브라우저에 추가 정보를 제공할 수 있다.
        ```xhtml
          <h4 class="bg-primary text-white text-center p-2 m-1">
              Static HTML Element
          </h4>
        ```
    - 속성은 항상 시작 태그 안에 포함돼 정의돼야 한다.
    - 속성엔 이름과 값이 있으며, 그 둘은 등호(=)로 구분
    - class 속성은 모양을 일관되게 관리 하기 위해 사용

- HTML 엘리먼트의 동적 생성
    - HTML 문서에 새로운 엘리먼트를 추가하기 위해 DOM API를 사용하는 자바스크립트를 작성 
        ```xhtml
        <body>
            <h4 class="bg-primary text-white text-center p-2 m-1">
              Static HTML Element
            </h4>
            <div class="text-center m-2">
              <div>This is a span element</div>
              <div>This is another span element</div>
            </div>
            <div id="domParent"></div>
            <div id="root"></div>
            <script>
              let element = document.createElement("h4");
              element.className = "bg-primary text-white- text-center p-2 m-1";
              element.textContent = "DOM API HTML Element";
              document.getElementById("domParent").appendChild(element);
            </script>
        </body>  
        ```
        - script 엘리먼트느 자바스크립트 코드 영역을 의미하며, 코드는 브라우저가 index.html 파일의 콘텐츠를 처리할때 실행된다.
        
- 리액트 컴포넌트를 사용한 엘리먼트의 동적 생성
    - 리액트는 render 메서드에서 지정한 HTML 엘리먼트를 만들기 위해 DOM API를 사용하여, 그 결과 지정된 프로퍼티를 통해 설정된 객체가 생성된다.
    - __JSX는 마치 속성을 사용해 설정된 엘리먼트로 보이게 하지만, 속성은 해당 프로퍼티에 값을 넣어주기 위한 수단__
    
- 리액트 엘리먼트에서의 표현식
    - __표현식은을 통해 엘리먼트를 설정하는 능력은 리액트와 JSX의 중요한 특징 중 하나다.__
    - 표현식은 중괄호({})로 감싸 표시하며 그 결과는 컴포넌트가 생성하는 콘텐츠에 삽입된다.
    ```jsx
      import React, { Component } from "react";
      
      const message = "This is a constant";
      
      export default class App extends Component {
      
        render = () => (
          <h4 className="bg-primary text-white text-center p-2 m-1">
              {message}
          </h4>
        );
      }
    ```
 
 - 표현식 안에서의 계산
    - 표현식은 단순히 콘텐츠에 값을 삽입하는 것뿐만 아니라 계산을 수행하는 일도 가능하다.
        ```jsx
           import React, { Component } from "react";
           
           const count = 4;
           
           export default class App extends Component {
           
             render = () => (
               <h4 className="bg-primary text-white text-center p-2 m-1">
                   Number of things: { count % 2 === 0 ? "Even": "Odd" }
               </h4>
             );
           }
        ```
    - 표현식은 간단한 연산 작업에 적합하며, 복잡한 작업은 별도의 함수를 정의하고 표현식에서 그 함수를 호출하게 하는 방법이 낫다.
        ```jsx
          import React, { Component } from "react";
          
          const count = 4;
          
          function isEven() {
              return count % 2 === 0 ? "Even" : "Odd";
          }
          
          export default class App extends Component {
            render = () => (
              <h4 className="bg-primary text-white text-center p-2 m-1">
                  {/*{message}*/}
                  {/*Number of things: { count }*/}
                  Number of things: { isEven() }
              </h4>
            );
          }
        ```
        - 표현식 안에서 함수를 호출할 때는 __반드시 소괄호를 사용해야 함수의 결과가 컴포넌트 콘텐츠에 포함__된다.
        
    - 컴포넌트 프로퍼티와 메서드 접근
        - 컴포넌트가 정의한 프로퍼티와 메서드에 접근하려면 this 라는 키워드를 사용해야 한다.
        ```jsx
        import React, { Component } from "react";
          
        export default class App extends Component {
          constructor(props) {
            super(props);
            this.state = {
              count: 4,
            };
          }
        
          isEven() {
            return this.state.count % 2 === 0 ? "Even" : "Odd";
          }
          render = () => (
            <h4 className="bg-primary text-white text-center p-2 m-1">
              Number of things: {this.isEven()}
            </h4>
          );
        }
        ```
        - 컴포넌트에 생성자를 정의했다.
        - 생성자는 컴포넌트의 초기 상태를 설정하는 수단
        - 여기서 this 키워드는 컴포넌트 인스턴스 자체를, state는 생성자에서 만든 state 프로퍼티를 , count는 계산에 사용될 값을 가르킨다.

- 표현식으로 프로퍼티 값 설정
    - 표현식으로 프로퍼티의 값을 설정할 수 있는데, 그렇게 함으로써 HTML 엘리먼트나 자식 컴포넌트의 설정을 바꿀수 있다.
    ```jsx
        import React, { Component } from "react";
        
        export default class App extends Component {
          constructor(props) {
            super(props);
            this.state = {
              count: 3,
            };
          };
        
          isEven(val) {
            return val % 2 === 0 ? "Even" : "Odd";
          };
        
          getClassName(val) {
            return val % 2 === 0
                ? "bg-primary text-white text-center p-2 m-1"
                : "bg-secondary text-white text-center p-2 m-1"
          };
          render = () => (
            <h4 className={this.getClassName(this.state.count)}>
              Number of things: {this.isEven(this.state.count)}
            </h4>
          );
        }
    ```