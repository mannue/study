# 13장 재조정과 생명주기
- 재조정은 리액트가 컴포넌트에 제공하는 전체 생명주기의 일부이기도 하다.
- __재조정은 DOM의 변경을 최소화함으로써 컴포넌트가 만든 콘텐츠를 효과적으로 처리하기 위한 과정이다.__

## 1. 콘텐츠 렌더링에 대한 이해
- 렌더링 과정의 시작점은 index.js 파일 안에 있는 ReactDOM.render 메서드를 호출하는 구문이다.
    ```jsx
    ReactDOM.render(<App/>, document.getElementById('root'))
    ```
    - 이 메서드는 초기 렌더링 과정을 시작한다.
    - 리액트는 ReactDOM.render 메서드의 첫번쩨 인자로 지정된 App 컴포넌트의 새 인스턴스를 만들고, 인스턴스의 render 메서드를 호출한다.
- 리액트는 브라우저의 API를 사용해 HTML 엘리먼트들을 문서 객체 모델(DOM)에 추가한다.
- 브라우저는 컴포넌트에 대해 알지 못하며, 오직 DOM 안의 HTML 엘리먼트를 화면에 보여주는 일만 한다.
- 컴포넌트를 관리하고 랜더링된 콘텐츠를 다루는 책임은 __리액트__ 에게 있다.

1.1. 갱신 과정의 이해
- 애플리케이션이 처음 구동되면 리액트는 모든 컴포넌트가 자신의 콘텐츠를 렌더링해 사용자에게 보이도록 명령한다.
- 일단 콘텐츠가 화면에 나타나면 애플리케이션은 __재조정 상태__ 가 된다.
- 애플리케이션이 재조정 상태에 있을 때엔 리액트는 변경이 있을 때까지 대기한다.
- setState 메서드는 컴포넌트의 상태 데이터를 갱신한다.
- 그러나 또한 그 컴포넌트를 'stale' 컴포넌트로 표시하는데, 이는 사용자가 보고 있는 HTML 콘텐츠가 최신이 아닐 수 있다는 뜻이다.
- 하나의 이벤트는 여러 상태 데이터의 변경을 야기 할수 있으며, __모든 변경이 처리되면 리액트는 신선하지 못한 각 컴포넌트와 자식 컴포넌트의 render 메서드를 호출한다.__

- App은 이 애플리케이션의 최상위 컴포넌트이며, 이는 애플리케이션의 모든 컴포넌트의 render 메서드가 호출된다는 뜻이다.
    ```text
    Render App Component
    Render Message Component 
    Render ActionButton (Increment Counter) Component
    Render List Component
    Render ActionButton (Reverse Names) Component
    ```
- 리액트는 해당 변경에 의해 영향을 받는 컴포넌트만을 갱신한다. 
    - 이유: 애플리케이션이 재조정 상태로 들어가기 전에 해야 할 작업의 양을 최소화 하기 위해서다.

1.2. 재조정 과정의 이해
- 리액트는 진부하다고 표시된(stale) 모든 컴포넌트의 render 메서드를 호출하지만, 그 결과로 만들어진 콘텐츠를 항상 사용하는 것은 아니다.
- 리액트는 컴포넌트가 리턴한 콘텐츠를 이전 결과와 비교해 브라우저가 최소한의 작업만 수행하도록 요청한다.
- 리액트가 콘텐츠와 비교하는 대상은 효율적인 비교가 가능한 형태로 정의된 자체 캐시, 이른바 가상 DOM 이다.
- __리액트는 변경사항을 판별하기 위해 실제 DOM 안의 엘리먼트에 질의를 할 필요가 없다.__

```text
    리액트만의 특징인 가상 DOM을 새도 DOM(shadow DOM) 과 혼동하지 말기 바란다. 
    새도 DOM은 최근의 브라우저가 지원하는 콘텐츠를 HTML 문서의 특정 범위로 한정하는 기능이다.
```

- 리액트는 render 메서드의 결과와 이전 결과를 비교해 span 엘리먼트가 투입됐음을 감지한다.
- 리액트가 좀더 자세한 비교를 위해 이 새 span 엘리먼트의 콘텐츠를 조사하는것은 아니며, 단지 span 엘리먼트로 기존 div 엘리먼트를 대처할 뿐이다.

1.3 목록 재조정의 이해
- 리액트는 데이터의 배열을 보여주는 엘리먼트를 다룸에 있어 특별한 지원을 한다.
- 리액트가 최소한의 작업으로 변경사항을 반영할 수 있게 하려면, List 컴포넌트에 정의 했던 것처럼 엘리먼트에 key prop을 부여하면 된다.

```text
key의 값은 안정적이어야 한다. 그래야 배열에 대한 변경 작업이 끝난 후에도 여전히 동일한 객체를 참조할 수 있다.
흔한 실수 중 하나는 key 값으로 배열 안의 객체의 위치, 즉 안정적이지 않은 값을 사용하는 일이다.
배열에 대한 많은 작업이 객체의 순서에 영향을 주기 때문이다.
```

## 2. 명시적 재조정
- 리액트는 forceUpdate 라는 메서드를 제공하는데, 이 메서드은 명시적으로 재조정을 실행해 모든 변경사항이 사용자가 보는 콘텐츠에 반영됨을 보장한다.
```text
forceUpdate 메서드를 사용하고자 할 때엔 애플리케이션의 설계를 고려해야 한다.
```

```jsx
    import React, { Component } from 'react';
    import {ActionButton} from "./ActionButton";
    
    let externalCounter = 0;
    
    export class ExternalCounter extends Component {
    
        incrementCounter = () => {
            externalCounter++;
            this.forceUpdate();
        }
    
        render() {
            return (
                <div>
                   <ActionButton callback={this.incrementCounter}
                   text="External Counter"/>
                   <div className="h5 text-center p-2">
                       External: { externalCounter }
                   </div>
                </div>
            );
        }
    }
```
- 위 컴포넌트의 경우 리액트의 통제 밖에 있는 변수에 의존한다.
- 이는 변숫값의 변경이 컴포넌트를 '진부함'으로 표시하지 못하므로 재조정 과정이 시작 되지 않는다는 뜻이다.
- 그 대신 incrementCounter 메서드는 forceUpdate 메서드를 호출해 명시적으로 재조정 과정을 시작하고 콘텐츠에 새 값이 반영됨을 보장한다.

## 3. 컴포넌트 생명주기
- 생성자의 역할은 주로 부모로부터 props를 받는 일과 상태 데이터를 정의하는 일이다.
- render 메서드는 애플리케이션이 시작될때와 갱신 될때 콘텐츠를 생산하는 역할을 한다.

```text
|     메서드            |   설명    
| constructor          | 컴포넌트 클래스의 새 인스턴스가 생성 될때 호출되는 '생성자' 라고 하는 특별한 메서드다 
| render               | 리액트가 컴포넌트의 콘텐츠를 요구 할때 호출 된다. 
| componentDidMount    | 컴포넌트의 초기 렌더링 작업이 완료된 후 호출 된다.
| componentDidUpdate   | 컨텐츠 갱신을 위한 재조정 과정이 끝난 후에 호출 된다.
| componentWillUnmount | 컴포넌트가 제거되기 전에 호출된다.
| componentDidCatch    | 에러를 다룰때 사용되는 메서드
```

3.1 마운트 단계
- __리액트가 처음으로 컴포넌트를 생성하고 콘텐츠를 렌더링하는 단계를 마운트 단계 라고 한다.__
- 컴포넌트가 마운트 단계에서 참여하기 위해 일반적으로 구현하는 세개의 메서드가 있다.
    ```text
      생성자 -----> render  ----> componentDidMount
    ```
- 생성자는 리액트가 컴포넌트의 새 인스턴스를 생성하고자 할때 호출된다.
- 생성자에선 부모로부터 props를 받는 일, 상태 데이터를 정의하는 일, 그 밖의 준비 작업등을 수행 할수 있다.
- render 메서드는 컴포넌트가 리액트에게 DOM에 추가될 콘텐츠를 제공하고자 할때 호출된다.
- DOM 에 콘텐츠 추가가 마지막으로 완료되면 리액트는 componentDidMount 메서드를 호출한다.

- __ccomponentDidMount 메서드에선 일반적으로 웹 서비스로부터 데이터를 받기 위한 비동식 요청, 즉 에이잭스(Ajax) 요청을 수행한다.__

```text
    Render App Component
    Render Message Component 
    Render ActionButton (Increment Counter) Component
    Render List Component
    Render ActionButton (Reverse Names) Component
    Render ActionButton (External Counter) Component
    componentDidMount Message Component
```
- 위 처럼 componentDidMount 는 컴포넌트의 모든 render 메서드가 실행된 다음에 호출 된다.
- componentDidMount 메서드는 애플리케이션이 시작될 때 리액트가 컴포넌트의 새 인스턴스를 얻기 위해 호출된다.
- __어떤 콘텐츠가 조건에 따라 렌더링 되는 경우, 애플리케이션이 실행 중일 때도 컴포넌트의 인스턴스가 필요할 때엔 마운트 단계가 진행된다.__
    ```jsx
      import React, { useState } from "react";
      import { Message } from "./Message";
      import List from "./List";
      import { ExternalCounter } from "./ExternalCounter";
      
      function App() {
        const [counter, setCounter] = useState(0);
        const [showMessage, setShowMessage] = useState(true);
      
        const handleChange = (event) => {
          console.log(event);
          setShowMessage(!showMessage);
        };
      
        const incrementCounter = (event) => {
          setCounter(counter + 1);
        };
      
        console.log("Render App Component");
        return (
          <div className="container text-center">
            <div className="row p-2">
              <div className="col-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={showMessage}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Show</label>
                </div>
                {showMessage && (
                  <Message
                    message={`Counter: ${counter}`}
                    callback={incrementCounter}
                    text="Increment Counter"
                  />
                )}
              </div>
              <div className="col-4">
                <List />
              </div>
              <div className="col-4">
                <ExternalCounter />
              </div>
            </div>
          </div>
        );
      }
      
      export default App;
    ```
    - 체크박스가 토글될 때마다 리액트는 새 Message 객체를 생성하며, 차례로 생성자, render, componentDidMount 메서드를 호출하는 마운트 단계를 거친다.


3.2 업데이트 단계
- 리액트가 변경사항에 대해 응답해 재조정을 수행하는 과정을 업데이트 단계라고 한다.
- 업데이트 단계에선 컴포넌트로부터 콘텐츠를 얻기 위해 render 메서드가 호출되고, 재조정 과정이 끝나면 componentDidUpdate 메서드가 호출된다.
    ```text
      render ====> componentDidUpdate
    ```  
- __componentDidUpdate 메서드는 주로 리액트의 ref 라는 기능을 사용해 DOM 안의 HTML 엘리먼트를 직접 조작하는 일에 사용된다.__

```text
componentDidUpdate 메서드는 재조정 과정에서 컴포넌트가 만든 컨텐츠가 변경사항이 없다고 판단돼도 여전히 호출된다.
```

```jsx
import React, {Component} from 'react';
import {ActionButton} from "./ActionButton";

export class Message extends Component {
    componentDidMount() {
        console.log("componentDidMount Message Component");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("componentDidUpdate Message Component");
    }
}
```
- 마운트 단계를 통한 초기 렌더링 작업 이후의 어떤 render 메서드 호출이든, 리액트가 재조정 과정을 완료하고 DOM을 갱신하면 componentDidUpdate 메서드가 호출된다.

3.3 언마운트 단계
- 컴포넌트가 제거돼야 하는 시점인 언마운트 단계(unmounting phase) 에 왔을때 리액트는 componentWillUnmount 메서드를 호출한다.
- 이 메서드는 자원 반환, 네트워크 연결 종료, 비동기 작업 중단 등을 할수 있는 기회를 컴포넌트에 제공한다.
- 리액트는 App 컴포넌트가 렌더링한 새 콘텐츠를 재조정하면서 Message 컴포넌트가 더 이상 필요하지 않다고 판단하고, 객체를 제거하기 전에 componentWillUnmount 메서드를 호출한다.
- __리액트는 한번 언마운트된 컴포넌트는 재사용하지 않는다.__
- 다시 동일한 컴포넌트가 필요하다면 새 객체를 만들어 마운트 단계를 수행한다. 결코 컴포넌트 객체가 언마운트 단계로부터 다시 복구 될수 없다는 뜻이다.

## 4. 이펙트 훅
- 함수형 컴포넌트의 경우 생명주기 메서드를 구현할 수 없으며, class 와 같은 동일한 방식으로 생명주기에 참여 할수 없다.
- __이런 상황을 위해 제공되는 이펙트 훅 이라는 기능이 있는데, 이는 대략적으로 componentDidMount, componentDidUpdate, componentWillUnmount 메서드 와 비슷한 역할을 한다.__

- useEffect 사용 방법
    ```jsx
        import React, {useEffect, useState} from 'react';
        import {ActionButton} from "./ActionButton";
        
        const HooksMessage = (props) => {
            const [showSpan , setShowSpan ] = useState(false);
        
            useEffect(() => console.log("useEffect function invoked"));
        
            const handleClick = (event) => {
                setShowSpan(!showSpan);
                props.callback(event);
            }
        
            const getMessageElement = () => {
                let div = <div id="messageDiv" className="h5 text-center p-2">
                    { props.message }
                </div>
                return showSpan ? <span>{div}</span> : div;
            }
        
            return (
                <div>
                    <ActionButton theme="primary" {...props} callback={ handleClick }/>
                    { getMessageElement() }
                </div>
            );
        };
        
        export default HooksMessage;
    ```
- __useEffect 함수는 컴포넌트가 마운트, 업데이트, 언마운트될 때 호출되는 함수를 등록하기 위해 사용된다.__
- 세가지 상황에서 모두 동일 한 함수가 호출되는데, 이는 클래스 기반의 컴포넌트와는 달리 함수형 컴포넌트의 본질이 반영된 결과다.

```jsx
    useEffect(() => {
            console.log("useEffect function invoked")
            return () => {
                console.log("useEffec cleaup");
            }
    });
```
- __useEffect 에 전달된 함수는 컴포넌트가 언마운트될 때 호출될, 즉 componentWillmount 메서드와 비슷한 역할을 하는 정리 함수를 리턴할 수 있다.__


## 5. 고급 생명주기 메서드
- 리액트는 클래스 기반의 컴포넌트에서 사용할 수 있는 고급 생명주기 메서드를 제공한다.
```text
|     메서드               |  설명
| shouldComponentUpdate   | 컴포넌트가 업데이트 돼야 하는지 알려준다.
| getDerivedSateFromProps | 부모로부터 받은 props를 기준으로 상태 데이터를 갱신하다.
| getSnapshotBeforeUpdate | 재조정 과정에서 DOM이 갱신되기 전에 상태와 관련된 정보를 가져온다. 이는 ref 기능과 함께 사용된다.
```

5.1 불필요한 컴포넌트 업데이트의 방지
- 리액트는 기본적으로 상태 데이터가 변경될 때마다 컴포넌트를 '진부함(stale)' 으로 표시하고 그 콘텐츠를 렌더링 한다.
- 컴포넌트의 상태가 자식에게 prop로서 전달 될수 있으므로, 자식 컴포넌트들 역시 렌더링한다.
- __컴포넌트는 shouldComponentUpdate 메서드를 구현함으로써 그와 같은 리액트의 기본 동작 대신 새로운 동작을 정의할 수 있다.__
- __렌더링이 필요하지 않은 상황에서도 render 메서드를 호출하는 일을 방지함으로써 애플리케이션의 성능을 향상한다.__
- __shouldComponentUpdate 메서드는 업데이트 단계에서 호출되며, 컴포넌트의 새 콘텐츠를 렌더링할지 판단한다.__
- shouldComponentUpdate 메서드의 인자는 새 props 와 상태 객체인데, 이는 기존 값들과 비교 하기 위해서다.
- shouldComponentUpdate 메서드가 true를 리턴하면 리액트는 업데이트 단계를 계속 진행한다.
- shouldComponentUpdate 메서드가 false를 리턴하면 리액트는 업데이트 단계를 중단하며, render 와 componentDidUpdate 메서드는 호출되지 않는다.
    ```text
      shouldComponentUpdate ===> render ===> componentDidUpdate
    ```
```jsx
// App
function App() {
  const [counter, setCounter] = useState(0);
  const [showMessage, setShowMessage] = useState(true);
  const [counterLeft, setCounterLeft] = useState(0);
  const [counterRight, setCounterRight] = useState(0);

  const handleChange = (event) => {
    console.log(event);
    setShowMessage(!showMessage);
  };

  const incrementCounter = (event, counter) => {
    //setCounter(counter + 1);
    if (counter === "left") {
      setCounterLeft(counterLeft + 1);
    } else {
      setCounterRight(counterRight + 1);
    }
  };

  console.log("Render App Component");
  return (
    <div className="container text-center">
      <div className="row p-2">
        <div className="col-6">
          <Message
            message={`Left: ${counterLeft}`}
            callback={ (e) => incrementCounter(e,"left")}
            text="Increment Left Counter"/>
        </div>
        <div className="col-6">
          <Message
              message={`Right: ${counterRight}`}
              callback={ (e) => incrementCounter(e,"right")}
              text="Increment Right Counter"/>
        </div>
      </div>
    </div>
  );
}

export default App;

//Message

import React, { Component } from "react";
import { ActionButton } from "./ActionButton";

export class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpan: false,
    };
  }

  handleClick = (event) => {
    this.setState({
      showSpan: !this.state.showSpan,
    });

    this.props.callback(event);
  };

  getMessageElement() {
    let div = (
      <div id="messageDiv" className="h5 text-center p-2">
        {this.props.message}
      </div>
    );
    return this.state.showSpan ? <span>{div}</span> : div;
  }

  render() {
    console.log(`Render Message Component `);
    return (
      <div>
        <ActionButton
          theme="primary"
          {...this.props}
          callback={this.handleClick}
        />
        {this.getMessageElement()}
      </div>
    );
  }

  componentDidMount() {
    console.log("componentDidMount Message Component");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate Message Component");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount Message Component");
  }

  shouldComponentUpdate(nextProps, nextState) {
    let change = nextProps.message !== this.props.message;

    if (change) {
        console.log(`shouldComponentUpdate ${this.props.text}: Update Allowed`)
    } else {
        console.log(`shouldComponentUpdate ${this.props.text}: Update prevented`)
    }
    return change
  }
}

```
- 리액트의 기본 동작을 따르면 counterLeft 와 countRight 중 하나의 상태 데이터 값이 변경되면 두 Message 컴포넌트 모두 렌더링 된다.
- 두 컴포넌트 중 하나는 불필요한 랜더링 작업이 수행된다는 말이다.
- shouldComponenetUpdate 메서드를 구현함으로써 기본 동작을 막고 변경사항이 있는 컴포넌트만 업데이트 되게 했다.
```text
Render App Component
shouldComponentUpdate Increment Left Counter: Update Allowed
Render Message Component 
Render ActionButton (Increment Left Counter) Component
shouldComponentUpdate Increment Right Counter: Update prevented
componentDidUpdate Message Component
```

5.2. props 값으로부터 상태 데이터 갱신
- getDerivedStateFromProps 메서드는 마운트 단계에서는 render 메서드 호출 전에, 업데이트 단계에서는 shouldComponentUpdate 메서드 전에 호출된다.
- __getDerivedStateFromProps 메서드는 콘텐츠가 렌더링 되기 전에 prop 값을 사용해 상태 데이터를 갱신할 수 있는 기회를 제공하며, 특히 prop 값이 변경되면 그 동작에 영향을 받는 컴포넌트를 위해 고안됐다.__
- __getDerivedStateFromProps는 정적 메서드로서, 인스턴스 메서드나 프로퍼티에서 this 키워드를 사용해 접근할수 없다.__
- getDerivedStateFromProps 메서드는 props 와 state 객체를 인자로 받는데 props 는 부모 컴포넌트로부터 받은 prop 값들이, state 객체에는 현재의 상태 데이터가 포함돼 있다.

```jsx
import React, {Component, PropTypes} from 'react';

const propTypes = {};

export class DirectionDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            direction: "up",
            lastValue: 0
        }
    }

    getClasses() {
        return (this.state.direction === "up"? "bg-success" : "bg-danger") +
            " text-white text-center p-2 m-2";
    }

    render() {
        return <h5 className={ this.getClasses() }>{ this.props.value }</h5>
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value !== prevState.lastValue) {
            return {
                lastValue: nextProps.value,
                direction: prevState.lastValue > nextProps.value ? "down" : "up"
            }
        }
        return prevState;
    }

}
```
- 이 컴포넌트는 숫자 값을 보여주는데, 현재의 값이 직전 값보다 크거나 작음에 따라 각기 다른 배경색이 적용된다.

```text
오직 props 의 값이 다른 경우에만 새로운 상태 데이터 객체를 만들고 있음에 주목하자.
조상의 상태가 변경되면 컴포넌트가 업데이트 단계로 진입된다는 점을 기억하기 바란다.
이는 비록 현재 의존하는 props의 값은 변경되지 않았더라도 getDerivedStateFromProps 메서드가 호출될 수 있다는 뜻이다
```