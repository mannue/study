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
    
          
       
