# 10장 컴포넌트와 props
- 10장에선 무상태 컴포넌트(stateless component)에 초점을 맞출 것이다.
- 하나의 컴포넌트에서 다른 컴포넌트로 콘텐츠를 렌더링하기 위한 데이터나 중요한 일이 생겼을때 호출 할 수 있는 함수를 전달하는 수단인 props도 설명

1. 컴포넌트의 이해
    1. HTML 콘텐츠 렌더링
    2. 다른 컴포넌트의 렌더링
        - __한 컴포넌트가 다른 컴포넌트를 사용하면 둘 사이에 부모 자식 관계가 형성된다.__
        _ 동일한 자식 컴포넌트에 해당하는 엘리먼트를 여러 번 사용할 수 도 있다.
        ```jsx
        import React from 'react';
        import {Message} from "./Message";
        
        export default function App() {
          return (
              <div>
                <h1 className="bg-primary text-white text-center p-2">
                  Hello Adam
                </h1>
                <Message/>
                <Message/>
                <Message/>
              </div>
          );
        }
        ```
       - 리액트는 Message 엘리먼트를 만날 때마다 Message 컴포넌트를 호출하고, 그 콘텐츠를 렌더링한 결과로 Message 엘리먼트를 대체한다.
       - 한 컴포넌트는 각기 다른 자식 컴포넌트들을 가질 수 있으므로 자식 컴포넌트들이 제시한 기능을 조합해 사용할 수 있다.
       
2. Props의 이해
    - 리액트는 자식 컴포넌트가 자신의 콘텐츠를 렌더링 할때 사용할 데이터를 부모로부터 받을 수 있는 props 를 제공한다.
    1.  부모 컴포넌트 에서 props 정의
        - props는 컴포넌트에 적용된 커스텀 HTML 엘리먼트에 프로퍼티를 추가하는 방식으로 정의한다.
        - 프로퍼티의 이름이 곧 prop 의 이름이며, 그 값은 고정된 값이거나 표현식이 될수 있다.
    
    2. 자식 컴포넌트에서 props 받기
        - 자식 컴포넌트는 props를 props 라는 이름의 파라미터로 받을수 있다.
        ```html
           <Message greeting="Hello" name="Bob"/>
        ```
        - 위 코드는 아래 와 같은 props 객체로 해석 될것이다.
        ```text
        {
           greeting: "Hello",
           name: "Bob" 
        }   
        ```

3. 자바스크립트와 props의 조합
    1. 콘텐츠의 조건부 렌더링
        - 컴포넌트는 자바스크립트의 if 키워드를 사용해 prop을 조사할 수 있으며, 그 값을 기초로 각기 다른 콘텐츠를 렌더링 할수 있다.
        ```jsx
           import React from 'react';
           
           export function Message(props) {
               if (props.name === "Bob") {
                   return <h4 className="bg-warning p-2">{props.greeting}, {props.name}</h4>
               } else {
                   return <h4 className="bg-success text-white text-center p-2"> {props.greeting}, {props.name}</h4>
               }
           }
        ```
        - 오직 prop의 값만 바뀌는 이런 종류의 조건부 렌더링은 프로퍼티의 값을 HTML로 부터 분리함으로써 코드 중복을 줄일수 있다.
        ```jsx
           import React from 'react';
           
           export function Message(props) {
               let classes = props.name === "Bob" ? "bg-warning p-2" : "bg-success text-white text-center p-2";
               return <h4 className={classes}>{props.greeting}, {props.name}</h4>
           }
        ```
    
    2. 배열 렌더링
        - 컴포넌트가 리스트의 아이템이나 테이블의 로우 등과 같이 배열에 있는 각 엘리먼트를 위한 HTML을 만들어야 하는 경우도 자주 있다.
        ```jsx
        import React from "react";
        
        function createInnerElements(names) {
            let arrayElems = [];
            for (let i=0; i < names.length; i++) {
                arrayElems.push(
                    <div>
                        {`${names[i]} contains ${names[i].length} letters`}
                    </div>
                )
            }
            return arrayElems;
        }
        
        export function Summary(props) {
            return <h4 className="bg-info text-white text-center p-2">
                { createInnerElements(props.name)}
            </h4>
        }
        ```
       
        1. 배열에 map 메서드 사용하기
            ```jsx
               function createInnerElements(names) {
                   return names.map(name =>
                       <div>
                           {`${name} contains ${name.length} letters`}
                       </div>
                   );
               }   
            ``` 
            - map 메서드의 인자는 배열의 각 객체를 위해 호출되는 하나의 함수다.
       
        2. key prop 추가
            - __리액트에선 배열 안의 아이템을 효율적으로 다루기 위해 엘리먼트에 key prop를 추가해야 한다.__
            - __key prop의 값은 표현식이어야 하며 그값은 배열 안에서 유일해야 한다.__
            ```jsx
               export function Summary(props) {
                   return <h4 className="bg-info text-white text-center p-2">
                       { props.names.map((name , index, arrays) =>
                               <div key={ name }>
                                   {`${name} contains ${name.length} letters`}
                                   { `${index} , ${arrays}`}
                               </div>
                           )
                       }
                   </h4>
               }
            ```
            - 여기선 map 메서드로 전달된 함수가 호출 될때 배열의 각 객체에 할당될 name 변수의 값을 사용했다.
            - __리액트는 배열 객체로부터 생성된 엘리먼트들을 구별 할 수 있게 된다.__
    
    3. 복수의 엘리먼트 렌더링
        - __리액트 컴포넌트는 반드시 최상위 엘리먼트 하나만 리턴해야 한다.__
        - 최상위 엘리먼트 하나만 리턴해야 한다는 점이 문제가 되는 경우들이 있다.
        - HTML 표준 명세는 엘리먼트의 조합 방식을 규정하는데, 이게 하나의 엘리먼트만 리턴해야 하는 리액트와 충돌 할수 있는 부분이다.
        ```text
            Line 6:7:  Parsing error: Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?
            
            4 |   return (
            5 |       <td>{props.index + 1}</td>
            > 6 |       <td>{props.name}</td>
            |       ^
            7 |       <td>{props.name.length}</td>
            8 |   );
            9 | }
        ```
        - 위 에러 메시지는 컴포넌트가 렌더링하는 콘텐츠가 단일한 최상위 엘리먼트를 리턴해야 한다는 리액트의 규칙에 맞지 않는다고 지적한다.
        - 즉 이 td 엘리먼트들을 감싸면서도 테이블에 적법하게 추가 될수 있는 HTML 엘리먼트가 필요하다는 말이다.
        
        - 에러 수정 
        ```jsx
           export function Summary(props) {
             return <React.Fragment>
                 <td>{props.index + 1}</td>
                 <td>{props.name}</td>
                 <td>{props.name.length}</td>
             </React.Fragment>
           }
        ```
        - 리액트는 이 코드를 처리할 때, React.Fragment 엘리먼트를 제외한 나머지 콘텐츠로 컴포넌트에 적용된 Summary 엘리먼트를 대체한다.
        
        - 또 다른 방법 으로는 빈 태그를 사용하는 방법이 있다.
        ```jsx
           export function Summary(props) {
             return <>
                 <td>{props.index + 1}</td>
                 <td>{props.name}</td>
                 <td>{props.name.length}</td>
               </>
           }
        ```
    
    4. 렌더링 하지 않기
        - 화면에 보여줄 콘텐츠가 없을 경우 컴포넌트 함수가 null를 리턴하면 된다.
        ```jsx
           export function Summary(props) {
               if (props.name.length >= 4) {
                   return <>
                       <td>{props.index + 1}</td>
                       <td>{props.name}</td>
                       <td>{props.name.length}</td>
                   </>
               } else {
                   return null;
               }
           }
        ```
       
    5. props 변경 시도
        - __props는 읽기 전용으로 컴포넌트에 의해 변경 될 수 없다.__
        - 리액트는 props 객체를 만들때, 추후 변경이 시도되면 에러를 발생시키도록 설정한다.
        
4. 함수 props 
    - 지금까지 사용했던 props는 자식 컴포넌트에게 읽기 전용의 데이터 값을 제공하는 데이터 props 였다.
    - 리액트는 데이터 props 외에 함수 props 도 지원한다.
    - 함수 props는 부모 컴포넌트가 자식에게 제공하는 함수이며, 이 함수로 호출되면 뭔가 중요한 일이 생겼음이 부모에게 통지된다.
    - 부모 컴포넌트는 데이터 props를 변경함으로써 응답할 수 있으며, 이는 자식 컴포넌트가 사용자에게 보여줄 컨텐츠를 갱신할 수 있게 한다.
    
   ```text
       콘텐츠 갱신을 위한 render 구문
       
       render는 컴포넌트의 콘텐츠를 브라우저의 DOM에 추가하는 메서드로서, 애플리케이션을 시작시키는 index.js 파일에서 사용된다.
       콘텐츠를 갱신하는 일반적인 방법은 render 메서드를 호출함으로써 prop에 사용되는 데이터의 변경사항이 반영돼
       사용자에게 보일 HTML 엘리먼트가 갱신됐다는 점만 알아두기 바란다. 
    ```
   
   1. 함수 prop에 인자 사용
        - 이벤트 객체는 이벤트를 발생시킨 HTML 엘리먼트의 자세한 정보를 알수 있는 함수를 제공한다.
        ```text
          성급한 호출의 위험
          인자를 사용해 함수 prop를 호출 할때는 항상 화살표 함수를 지정해야 한다.
      
          <button className="btn btn-info btn-sm m-1" onClick={ () => props.promoteCallback(props.name)}>
          
          그러나 적어도 한 번은 이를 잊어버리고 다음과 같이 표현식 안에 함수 prop를 직접 호출하는 경우가 있다.
      
          <button className="btn btn-info btn-sm m-1" onClick={props.promoteCallback(props.name)}>
      
          리액트는 컴포넌트가 콘텐츠를 렌더링 할때 표현식을 평가하므로, 사용자가 버튼을 클릭하기 전에 이미 함수 prop를 호출하는 결과가 나타난다.
          이는 함수 prop이 어떤 일을 하는지에 따라 예상 할 수 없는 동작이나 에러를 야기한다.
        ```
      
5. 자식 컴포넌트에 props 전달
    - 리액트 애플리케이션은 컴포넌트들의 조합으로 만들어지며, 그 사이에 부모 자식 관계들이 형성된다.
    ```jsx
       import React from 'react';
       
       export function CallbackButton(props) {
           return <button className={ `btn btn-${props.theme} btn-sm m-1`} onClick={ props.callback }>
               { props.text }
           </button>
       }
    ```
    - 이 컴포넌트는 text prop 값을  사용한 텍스트 콘텐츠를 갖는 버튼 엘리먼트 하나를 렌더링하며, 버튼이 클릭될때 callback prop를 통해 함수 하나를 호출한다.
    
    1. props 일괄 전달
        - __부모 컴포넌트가 제공한 props의 이름과 자식 컴포넌트가 원하는 props의 이름이 동일한 경우엔 비구조화 연산자(또는 스프레드 연산자)를 사용할 수 있다.__
        
         
        
