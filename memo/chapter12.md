# 12장 이벤트 
- 이벤트는 대개 사용자의 행위에 대한 응답으로서 HTML 엘리먼트에 의해 생성된다.

## 1. 이벤트의 이해 
- 이벤트는 사용자가 버튼을 클릭하거나 텍스트를 입력하는 등의 중요한 변화를 알리기 위해 HTML 엘리먼트가 발생시킨다.
- 리액트에서 이벤트를 다루는 일은 DOM API를 사용하는 경우와 비슷한데, 다만 몇 가지 중요한 차이가 있다.
- 이벤트는 그에 대응하는 DOM API 프로퍼티를 카멜표기법으로 표현한 이름의 프로퍼티를 사용해 처리 할수 있다.
- DOM API의 onclick 프로퍼티는 리액트 애플리케이션에선 onClick 으로 표시 된다.
```jsx
    <div className="text-center">
        <button className="btn btn-primary"
                onClick={ ()=> this.setState({ message: "Clicked!"})}
        >Click me</button>
    </div>
```
- 위 예제는 인라인 함수의 예로, message 라는 상태 데이터 프로퍼티의 값을 변경하기 위해 setState 메서드를 호출한다.
    
1.이벤트 처리 메서드 사용
- 상태 유지 컴포넌트엔 메서드를 정의할 수 있으며, 이를 사용해 이벤트에 응답하게 할수 있다.
- 그렇게 하면 동일한 이벤트에 대해 동일한 방식으로 처리하는 여러 엘리먼트들이 있는 상황에서는 코드 중복을 방지 할수 있다.

2.이벤트 핸들러 안에서의 컴포넌트 기능 접근
- 이벤트를 처리하는 메서드, 즉 이벤트 핸들러 안에서 컴포넌트의 기능에 접근하려면 추가 작업이 필요하다.
- this 키워드의 값은 자바스크립트 클래스 메서드가 호출될때 기본으로 설정되는 것이 아니다.
- 즉 handleEvent 메서드 안에서 컴포넌트의 메서드나 프로퍼티에 접근 할 수 있는 방법이 없다는 뜻이다.

```jsx
export class App extends Component {
  handleEvent() {
      this.setState({
          message: "Clicked!"
      })
  }
}
  // this 가 정의되지 않아서 아래와 같은 에러가 발생
  // TypeError: Cannot read property 'setState' of undefined
```

- 위 문제를 해결하기 위해서는 자바스크립트의 클래스 필드 문법을 사용해 이벤트 핸들러를 표현하면 된다.

```jsx
export class App extends Component {
      handleEvent = () => {
          this.setState({
              message: "Clicked!"
          })
      } 
}
```

```text
일반 함수와 화살표 함수에서의 this 의 차이점 
- 일반 함수는 함수를 선언할때 this 에 바인딩할 객체가 정적으로 결정되는것이 아니고, 
  함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정

- 화살표 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정된다. 동적으로 결정되는 일반 함수와는 
  달리 화살표 함수의 this 는 언제나 상위 스코프의 this를 가리킨다. 
```

3.이벤트 객체의 이해 
- __리액트는 이벤트가 발생하면 그 이벤트를 기술하는 SyntheticEvent 라는 객체를 제공한다.__
- SyntheticEvent 는 DOM API 가 제공하는 __Event 객체의 래퍼로서__ , 각기 다른 브라우저에서도 일관되게 이벤트를 기술하기 위한 코드가 추가된 객체다.

- SyntheticEvent 객체에는 기본적인 프로퍼티와 메서드가 포함돼 있다.
    ```text
    |       이름        |     설명 
    | nativeEvent      | 이 프로퍼티는 DOM API가 제공하는 Event 객체를 리턴한다.
    | target           | 이 프로퍼티는 이벤트의 출처인 엘리먼트를 나타내는 객체를 리턴한다.
    | timeStamp        | 이 프로퍼티는 이벤트가 발생된 시각을 나타내는 타임스탬프를 리턴한다.
    | type             | 이 프로퍼티는 이벤트 타입을 나타내는 문자열을 리턴한다.
    | isTrusted        | 이 프로퍼티는 이벤트가 브라우저에 의해 촉발됐을 경우엔 true를, 그렇지 않고 코드안에서 생성된 이벤트라면 false를 리턴한다.
    | preventDefault() | 이 메서드는 이벤트의 기본 동작을 취소한다.
    | defaultPrevented | 이 프로퍼티는 해당 이벤트 객체에 대해 preventDefault 메서드가 호출됐으면 true를 그렇지 않으면 false를 리턴한다.
    | persist()        | 이 메서드는 이벤트 객체 재사용을 위해 사용되는데, 특히 비동기 작업에 있어서 중요하다.
    ```

```text
   리액트 이벤트와 DOM 이벤트의 차이

1. 리액트가 모든 이벤트를 지원하지는 않는다. 즉 리액트 컴포넌트가 사용할 수 있는 프로퍼티에 대응되지 않는 DOM API 이벤트들이 존재한다는 말이다.
2. 리액트는 컴포넌트가 커스텀 이벤트를 만들어 공개하는 기능을 지원하지 않는다. 컴포넌트 사이의 상호작용을 지원하는 리액트의 방식은 함수 props를 통하는 것이며,
   Event.dispatchEvent 메서드를 사용해도 커스텀 이벤트를 배포할 수는 없다.
3. 리액트는 DOM 이벤트 객체의 래퍼로서 커스텀 객체를 제공하는데 그 객체가 항상 DOM 이벤트와 동일한 방식으로 동작하는것은 아니다. 
   따라서 래퍼를 통해 DOM 이벤트를 접근할 때는 예상하지 못한 부작용이 야기될수 있으므로 주의를 기울여야 한다.
4. 리액트는 버블 단계에서 DOM 이벤트를 가로채 계층도에 있는 컴포넌트들에 공급함으로써 컴포넌트가 이벤트에 반응하고 콘텐츠를 갱신할 수 있는 기회를 준다.
   이는 이벤트 래퍼 객체가 제공하는, 특히 전파와 관련한 일부 기능들이 예상대로 작동하지 않을수 있다는 뜻이다. 
```

3.1.이벤트 타입의 구분
- __리액트는 이벤트 처리 함수를 호출할때 항상 syntheticEvent 객체를 제공__
```jsx
      handleEvent = (event) => {
          let value = event.type === "mousedown" ? "Down" : "Up";
          this.setState({
              message: value
          })
      }
```

3.2.이벤트 재사용의 함정
- 리액트는 일단 이벤트 하나를 처리하면 SyntheticEvent 객체를 재사용하며 모든 프로퍼티를 null 로 초기화 한다.
- 상태 데이터를 비동기식으로 갱신하는 경우에 문제를 일으킬 수 있다.

```jsx
      handleEvent = (event) => {
        this.setState(
          {
            counter: this.state.counter + 1,
          },
          () =>
            this.setState({
              message: `${event.type}: ${this.state.counter}`,
            })
        );
      };
```
- 위 문제점은 setState 콜백 함수가 호출되는 시점에 event 프로퍼티가 null로 초기화 된다는 점이다.
- __이벤트 객체의 초기화를 방지하기 위해, 즉 영속화하기 위해 persist 메서드를 사용하는 방법이 있다.__
```jsx
      handleEvent = (event) => {
        event.persist();
        this.setState(
          {
            counter: this.state.counter + 1,
          },
          () =>
            this.setState({
              message: `${event.type}: ${this.state.counter}`,
            })
        );
      };
```


4.이벤트 핸들러 호출에 커스텀 인자 사용
- 리액트가 기본적으로 제공하는 SyntheticEvent 객체 대신 커스텀 인자를 사용해 이벤트핸들러를 호출하는 방법이 더 유용한 경우가 종종 있다.
```jsx
import React, { Component } from "react";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Ready",
      counter: 0,
      theme: "secondary",
    };
  }

  handleEvent = (event) => {
    event.persist();
    this.setState(
      {
        counter: this.state.counter + 1,
        theme: event.target.innerText === "Normal" ? "primary" : "danger",
      },
      () =>
        this.setState({
          message: `${event.type}: ${this.state.counter}`,
        })
    );
  };

  render() {
    return (
      <div className="m-2">
        <div className={`h4 bg-${this.state.theme} text-white text-center p-2`}>
          {this.state.message}
        </div>
        <div className="text-center">
          <button className="btn btn-primary" onClick={this.handleEvent}>
            Normal
          </button>
          <button className="btn btn-danger m-1" onClick={this.handleEvent}>
            Danger
          </button>
        </div>
      </div>
    );
  }
}
```
- 위와 같은 방식의 문제점은 렌더링 되는 콘텐츠의 상당 부분을 이벤트 핸들러가 알아야 한다는 점이다.
- 이는 컴포넌트가 렌더링하는 콘텐츠가 변경되거나 동일한 결과를 만드는 여러 상호작용이 존재할 때 __관리의 어려움을 야기한다.__
- 이벤트 핸들러를 호출하는 이벤트 처리 프로퍼티에 인라인 표현식을 사용해 필요한 정보를 제공하는것이 좀 더 우아한 방식이다.
 
```jsx
export class App extends Component {
    handleEvent = (event, newTheme) => {
        event.persist();
        this.setState(
          {
            counter: this.state.counter + 1,
            theme: newTheme
          },
          () => this.setState({
              message: `${event.type}: ${this.state.counter}`,
            })
        );
    };
    
    render() {
        return (
          <div className="m-2">
            <div className={`h4 bg-${this.state.theme} text-white text-center p-2`}>
              {this.state.message}
            </div>
            <div className="text-center">
              <button className="btn btn-primary" onClick={ (e) => this.handleEvent(e, "primary")}>
                Normal
              </button>
              <button className="btn btn-danger m-1" onClick={ (e) => this.handleEvent(e, "danger")}>
                Danger
              </button>
            </div>
          </div>
        );
    }   
}
```
- 결과는 동일하지만, handleEvent 메서드가 theme 프로퍼티를 변경하기 위해 더 이상 이벤트를 발생시킨 엘리먼트를 조사하지 않아도 된다.


5.기본 동작 취소
- 일부 이벤트들은 브라우저가 기본으로 수행하는 동작이 적용된다. 예컨대 체크박스를 클릭하는 경우의 브라우저 기본 동작은 체크박스의 상태를 토글하는 것이다.
- preventDefault 메서드는 이벤트 객체를 기본 동작으로부터 보호 할수 있다.
```jsx
   export class App extends Component {
      toggleCheckBox = (event) => {
        if (this.state.counter === 0) event.preventDefault();
      };
    
      render() {
        return (
          <div className="m-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onClick={this.toggleCheckBox}
              />
              <label>This is a checkbox</label>
            </div>
            <div className={`h4 bg-${this.state.theme} text-white text-center p-2`}>
              {this.state.message}
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary"
                onClick={(e) => this.handleEvent(e, "primary")}
              >
                Normal
              </button>
              <button
                className="btn btn-danger m-1"
                onClick={(e) => this.handleEvent(e, "danger")}
              >
                Danger
              </button>
            </div>
          </div>
        );
      }
   }
```
- counter 상태 데이터 프로퍼티의 값이 0이면 클릭 이벤트에 대해 preventDefault 메서드가 호출되므로 체크박스가 토글 되지 않는다. 
 

## 2. 이벤트 전파
- 이벤트엔 생명주기라는 것이 있다. 이로 인해 엘리먼트의 조상이 후손이 일으킨 이벤트를 받을 수 있으며, 이벤트가 엘리먼트에 도착하기전에 가로채는 일도 가능하다.

- 이벤트 전파와 관련된 SyntheticEvent 의 프로퍼티와 메서드
```text
|      이름               |  설명
| eventPhase             | 이 프로퍼티는 현재의 이벤트 전파 단계를 리턴한다. 그러나 리액트가 이벤트를 다루는 방식으로 인해 이 프로퍼티는 유용하지 않다.
| bubbles                | 이 프로퍼티는 이벤트가 버블 단계에 진입할 상황이라면 true 를 리턴한다.
| currentTarget          | 이 프로퍼티는 이벤트 핸들러가 이벤트 처리를 할 대상 엘리먼트를 나타내는 개체를 리턴한다.
| stopPropagation()      | 이 메서드는 이벤트 전파를 중단시킬 때 호출된다.
| isPropagationStopped() | 이 메서드는 이벤트에 대해 stopPropagation이 호출됐다면 true를 리턴한다.
```

1.타깃 단계와 버블 단계
- 처음 촉발된 이벤트는 먼저 타깃 단계에 진입하며, 이는 이벤트의 원천인 엘리먼트에 이벤트 핸들러가 적용되는 단계다.
- 이벤트 핸들러의 실행이 완료된 다음엔 이벤트는 버블 단계 로 들어간다. 이는 이벤트가 조상 엘리먼트를 거슬러 올라가면서 해당 유형의 이벤트에 적용되는 모든 이벤트 핸들러가 호출되는 단계다.
```jsx
    import React, {Component } from 'react';
    
    
    export class ThemeButton extends Component {
    
        handleClick = (event) => {
            console.log(`ThemeButton: Type: ${event.type}`
                + `Target: ${event.target.tagName}`
                + `currentTarget: ${event.currentTarget.tagName}`);
            this.props.callback(this.props.theme);
        }
    
        render() {
            return <span className="m-1" onClick={ this.handleClick }>
                <button className={`btn btn-${this.props.theme}`}
                        onClick={ this.handleClick }>
                    Select { this.props.theme } Theme
                </button>
            </span>
        }
    }
```
- 위 코드의 버튼을 클릭하면 아래와 같은 두개의 메시지가 나타난다.
```text
ThemeButton: Type: click Target: BUTTON currentTarget: BUTTON
ThemeButton: Type: click Target: BUTTON currentTarget: SPAN
```
- ThemeButton 컴포넌트가 렌더링한 콘텐츠에 두개의 onClick 프로퍼티가 있기 때문이다.
- 처음 메시지는 button 엘리먼트의 이벤트 핸들러가 이벤트를 처리하는 타깃 단계에서 생성된것 이며, 그다음엔 이벤트가 버블 단계로 들어감으로써 엘리먼트의 조상으로 전파 되며, 그에 적용된 이벤트 핸들러를 호출한다.

```text
어떤 이벤트가 버블 단계를 거칠 것인지 여부는 이벤트 객체의 bubbles 프로퍼티를 읽으면 알수 있따.
```
- 버블 단계는 컴포넌트가 렌더링한 콘텐츠를 너머 확장돼, HTML 엘리먼트 계층도 전체에 전파된다.
- SyntheticEvent 객체는 currentTarget 이라는 프로퍼티를 제공한다.
- 이벤트를 발생시킨 엘리먼트를 리턴하는 target 프로퍼티와 대조적으로 currentTarget 프로퍼티는 이벤트 핸들러를 호출한 엘리먼트를 리턴한다.
```text
    ThemeButton: Type: click Target: BUTTON currentTarget: BUTTON
    ThemeButton: Type: click Target: BUTTON currentTarget: SPAN
    App: Type: click Target: BUTTON CurrentTarget: DIV
    App: Type: click Target: BUTTON CurrentTarget: DIV
```

- 컴포넌트에 적용되는 이벤트와 엘리먼트
```text
    이벤트 처리는 컴포넌트가 렌더링하는 HTML 엘리먼트가 수행하며, 여기서 커스텀 HTML 엘리먼트는 배제된다.
    ThemeButton 엘리먼트에 onClick 같은 이벤트 핸들러 프로퍼티를 추가해도 아무런 효과가 없다.
    에러가 발생하지는 않지만 해당 커스텀 엘리먼트가 배제되므로 그 이벤트 핸들러는 결코 호출되지 않는다.
```

2.캡처 단계
- 캡처 단계는 타깃 단계보다 먼저 엘리먼트가 이벤트를 처리할 수 있는 기회를 제공한다.
- 브라우저는 버블 단계의 경우와는 반대 방향으로 body 엘리먼트에서 시작해 이벤트를 엘리먼트 계층도를 따라 내려보내며 이벤트를 처리할 수 있게 한다.
```jsx
   import React, { Component } from "react";
   
   export class ThemeButton extends Component {
     handleClick = (event) => {
       console.log(
         `ThemeButton: Type: ${event.type} ` +
           `Target: ${event.target.tagName} ` +
           `currentTarget: ${event.currentTarget.tagName}`
       );
       this.props.callback(this.props.theme);
     };
   
     render() {
       return (
         <span
           className="m-1"
           onClick={this.handleClick}
           onClickCapture={this.handleClick}
         >
           <button
             className={`btn btn-${this.props.theme}`}
             onClick={this.handleClick}
           >
             Select {this.props.theme} Theme
           </button>
         </span>
       );
     }
   }
```
- 각 이벤트 핸들러 프로퍼티에 대응하는 캡처 프로퍼티가 있는데, 이 프로퍼티는 캡처 단계에서 이벤트를 받을 수 있다.
- 위에서는 onClick에 대응하는 캡처 프로퍼티가 onClickCapture이며, 이를 span 엘리먼트에 적용하고 그 표현식에 handleClick 메서드를 지정했다.

- span 엘리먼트는 이벤트가 HTML 엘리먼트 계층도를 따라 내려오고 올라감에 따라 켑처 단계와 버블 단계에서 모두 클릭 이벤트를 받을 수 있게 됐다.
```text
    ThemeButton: Type: click Target: BUTTON currentTarget: SPAN
    ThemeButton: Type: click Target: BUTTON currentTarget: BUTTON
    ThemeButton: Type: click Target: BUTTON currentTarget: SPAN
    App: Type: click Target: BUTTON CurrentTarget: DIV
```

3.이벤트 단계 판별
- ThemeButton 컴포넌트에서 정의한 handleClick 메서드는 하나의 클릭 이벤트가 캡처, 타깃, 버블 단계를 거침에 따라 여러 번의 이벤트 처리를 수행할것 이다.
- 실제 프로젝트에서 콜백을 반복 호출하는 일은 문제가 될수 있으며, 또한 자식 컴포넌트가 아무 문제없이 props를 호출 할 수 있다고 가정하는 것도 좋은 태도는 아니다.
- 리액트가 사용하는 SytheticEvent 객체엔 eventPhase 라는 프로퍼티가 정의돼 있는데, 이는 원래의 DOM API 이벤트 객체에서 사응하는 프로퍼티의 값을 리턴한다.
- __불행히도 eventphase 프로퍼티는 항상 버블 단계만을 리턴한다.__
- 리액트가 네이티브 이벤트를 가로채고 이를 사용해 세 전파 단계를 흉내 낼뿐 이기 때문이다.
- 각 이벤트 단계를 판별하기 위한 추가작업 
```text
캡처 단계를 판별하기 위해 별도의 핸들러 메서드를 사용하거나 기존 핸들러 메서드에 인자를 추가하는 방법
// 여기서는 후자의 방법을 사용한 코드 
handleClick = (event, capturePhase = false ) => {
    console.log(
      `ThemeButton: Type: ${event.type} ` +
        `Target: ${event.target.tagName} ` +
        `currentTarget: ${event.currentTarget.tagName}`
    );
    if (capturePhase) {
      console.log("Invoked function prop")
    } else {
      this.props.callback(this.props.theme);
    }
};

타깃 단계와 버블 단계를 구분하는 일은 좀 더 복잡한데, 두 단계 모두 onClick 프로퍼티가 처리하기 때문이다.
이 두 단계를 구분하는 가장 좋은 방법은 <target 과 currentTarget> 프로퍼티의 값이 다른지
그리고 bubbles 프로퍼티가 true 인지 확인하는 것이다.

currentTarget이 리턴한 객체가 target의 값과 다르면서 이벤트가 버블 단계를 갖는다면,
이벤트가 버블 단계에 있음을 확신할 수 있다.
```

4.이벤트 전파 중단
```jsx
import React, { Component } from "react";

export class ThemeButton extends Component {
  handleClick = (event, capturePhase = false ) => {
    console.log(
      `ThemeButton: Type: ${event.type} ` +
        `Target: ${event.target.tagName} ` +
        `currentTarget: ${event.currentTarget.tagName}`
    );
    if (capturePhase) {
      if (this.props.theme === "danger") {
        event.stopPropagation();
        console.log("Stopped event");
      } else {
        console.log("Skipped function prop: capture phase")
      }
    } else if(event.target !== event.currentTarget && event.bubbles) {
      console.log("Skipped function prop: bubble phase")
    } else {
      console.log("Invoked function prop")
      this.props.callback(this.props.theme);
    }
  };

  render() {
    return (
      <span
        className="m-1"
        onClick={this.handleClick}
        onClickCapture={ (e) => this.handleClick(e, true)}
      >
        <button
          className={`btn btn-${this.props.theme}`}
          onClick={this.handleClick}
        >
          Select {this.props.theme} Theme
        </button>
      </span>
    );
  }
}

```
- 위 코드 설명
    - span 엘리먼트의 onClickCapture 프로퍼티는 캡처 단계에서 클릭 이벤트를 받으면 handleClick 메서드를 호출 할것 이다.
    - theme prop의 값이 danger 라면 stopPropagation 메서드가 호출되는데, 이는 이벤트의 button 엘리먼트 도달을 막는다.
