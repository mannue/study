# 11장 상태 유지 컴포넌트 

- 상태 유지 컴포넌트란 무상태 컴포넌트에 상태 데이터를 추가한 것으로, 상태 데이터를 사용해 렌더링 결과를 바꿀 수 있다.
- 상태 유지 컴포넌트는 컴포넌트가 렌더링하는 콘텐츠를 변경할 때 사용되는 자신만의 데이터를 갖는다.
- 상태 유지 컴포넌트는 애플리케이션의 상태 추적을 쉽게 해주며, 데이터 값을 변경하고 그 변경사항을 콘텐츠에 반영하는 수단을 제공한다.

## 1. 컴포넌트 유형의 이해
1. 무상태 컴포넌트의 이해 
    - 무상태 컴포넌트는 함수가 얼마나 자주 호출되는지와 관계없이 항상 주어진 prop 값들과 동일하게 HTML 엘리먼트를 렌더링한다.
    - 콘텐츠를 렌더링하기 위해 온전히 부모 컴포넌트가 제공한 prop 값들에만 의존한다.
    
2. 상태 유지 컴포넌트의 이해
    - 상태 유지 컴포넌트는 컴포넌트가 렌더링하는 콘텐츠에 영향을 주는 자신만의 데이터를 갖는다.
    - 이 데이터를 상태 데이터 라고 하며 부모 컴포넌트가 제공하는 prop 와는 별개다.
    - 상태 유지 컴포넌트는 자바스크립트 객체로서, SimpleButton 엘리먼트와 컴포넌트 객체 사이에 일대일 관계가 성립된다.
    - 각 상태 유지 컴포넌트는 자신만의 상태 데이터를 갖는 하나의 자바스크립트 객체이며, 또한 각 상태 유지 컴포넌트가 하나의 커스텀 HTML 엘리먼트와 연관된다는 사실
    
## 2. 상태 유지 컴포넌트 제작
1. 컴포넌트 클래스의 이해
2. import 구문의 이해
    - react 패키지에서 기본 내보내기를  한 컴포넌트에 React 라는 이름을 할당하는 방식
    - react 패키지가 명명된 내보내기를 한 Component를 중괄호를 사용해 가져오는 방식

3. render 메서드의 이해
    - 상태 유지 컴포넌트의 주된 목적은 화면에 보여줄 콘텐츠의 렌더링이다.
    - render 메서드는 반드시 리액트 엘리먼트를 리턴해야 하는데, 이는 React.createElement 메서드를 사용해 만들 수 도 있지만 일반적으로 HTML 코드 조작으로 만들 수 있다.

4. 상태 유지 컴포넌트 props의 이해
    - this 키워드는 현재 컴포넌트의 자바스크립트 객체를 가르킨다.
    - 상태 유지 컴포넌트를 사용 할땐 반드시 this 키워드를 사용해 props 프로퍼티에 접근해야 한다.

## 3. 상태 데이터 추가
- 상태 유지 컴포넌트의 가장 큰 특징은 __컴포넌트의 각 인스턴스가 자신만의 데이터, 즉 상태 데이터를 갖는다__
    ```jsx
       import React, {Component} from 'react';
       
       export class SimpleButton extends Component {
           constructor(props) {
               super(props);
               this.state = {
                   counter: 0,
                   hasButtonBeenClicked: false,
               }
           }
       
           render() {
               return <button onClick={this.props.callback}
                              className={ this.props.className}
               disabled={ this.props.disabled === "true" || this.props.disabled === true }>
                   { this.props.text }
                   { this.state.hasButtonBeenClicked &&
                       <div>Button Clicked!</div>
                   }
               </button>
           }
       }
    ```
- 상태 데이터는 생성자에서 정의되는데, 생성자는 클래스를 사용해 새 객체를 만들 때 호출되는 특별한 메서드다.
- 생성자의 첫 구문은 props 객체를 인자로 하는 super 메서드의 호출이어야 하는데, 이는 곧 Component 클래스의 생성자 호출이며 현재의 상태 유지 컴포넌트에 필요한 기능들을 구성하게 한다.

## 4. 상태 데이터 변경
- 리액트는 state 프로퍼티에 새로운 값을 직접 할당하는 방식을 허용하지 않으며, 그렇게 할 경우 에러를 발생시킨다.
- 그 대신 Component 클래스로부터 물려받은 setState 메서드를 통해 상태 데이터를 변경해야 한다.
- setState 메서드의 인자는 상태 데이터를 갱신하는 프로퍼티를 갖는 객체다.
```text
setState 메서드를 사용할 땐 변경하고자 하는 값에 대한 프로퍼티로 정의 해야한다.  
리액트는 변경된 프로퍼치는 나머지 상태 데이터와 합치는 반면에, 값을 지정하지 않은 프로퍼티는 그대로 두기 때문이다.    
```

1. 상태 데이터 변경의 함정
    - 리액트는 상태 데이터의 변경을 비동기적으로 수행하며, 성능 향상을 위해 여러 갱신사항들을 묶기도 한다.
    
    1. 종속 값의 함정
        - 리액트는 효율설을 위해 이들 갱신 작업을 일괄로 처리한다.
        - 종속 관계에 있는 변경사항을 순서대로 반영하려면, 상태 데이터가 변경되면 호출될 함수를 setState 메서드에 넘겨야 한다.
        ```jsx
               handleClick = ()=> {
                   this.setState({
                       counter: this.state.counter + 1,
                   }, () => {
                       this.setState({
                           hasButtonBeenClicked: this.state.counter > 0
                       })
                   });
                   this.props.callback()
               }
        ```
    2. 갱신 누락의 함정
        - __리액트는 동일한 상태 데이터 프로퍼티에 여러 번의 변경이 시도되면, 오직 가장 최근의 값만 적용한다.__
        - 만약 동일한 프로퍼티에 여러 번의 변경사항을 순서대로 반영하고 싶다면, 첫 번째 인자를 함수로 받는 형태의 setState 메서드를 사용하면 된다.
        ```jsx
           handleClick = ()=> {
               for (let i=0; i < 5; i++) {
                   this.setState((state, props) => { return { counter: state.counter + 1}});
               }
               this.setState({
                   hasButtonBeenClicked: true })
               this.props.callback()
           }
        ```

2. 훅을 사용한 상태 유지 컴포넌트
    - 모든 개발자가 상태 유지 컴포넌트를 정의할때 클래스를 사용하는 것은 아니다.
    - 리액트는  함수형 컴포넌트에서 상태 데이터를 정의할 수 있는 훅(Hook) 이라고 하는 또 다른 방법을 제공한다.
    ```jsx
       import React, { useState } from 'react';
       
       export function HookButton(props) {
           const [counter, setCounter] = useState(0);
           const [hasButtonBeeClicked, setHasButtonBeenClicked] = useState(false);
       
           const handleClick = () => {
               setCounter( counter + 5);
               setHasButtonBeenClicked(true);
               props.callback();
           }
       
           return <button onClick={handleClick}
                          className={props.className}
                          disabled={ props.disabled === "true" || props.disabled === true}>
               { props.text } { counter }
               { hasButtonBeeClicked && <div>Button Clicked!</div>}
           </button>
       }
    ```
   - useState 함수는 상태 데이터를 만들 때 사용된다.
   - useState 함수는 상태 데이터 프로퍼티의 초깃값을 인자로 받으며, 현재 값을 나타내는 프로퍼티 하나와 갱신을 수행할 함수 하나를 리턴한다.
   - 프로퍼티와 함수는 배열의 형태로 리턴되는데, 이를 배열 비구조화 라고 한다.
   ```jsx
       const [counter, setCounter] = useState(0); 
   ```
    
## 5. 상태 데이터 끌어 올리기
- 컴포넌트들이 동일한 데이터에 접근해야 한다면 바로 상태 데이터의 끌어올리기 를 사용할 필요가 있다.
- __끌어 올리기란 상태 데이터를 최소 공통 조상 콤포넌트 (lowest common ancestor)로 올리고 props 를 사용해 자식 컴포넌트에게 다시 내리는 방법을 말한다.__

## 6. 상태 데이터 더 끌어 올리기
- 상태 데이터를 부모 컴포넌트 보다 더 위로 끌어올리는 일도 가능하다.
- 상태 유지 컴포넌트가 상태 데이터를 갖지 않는 경우엔 생성자가 필요하지 않다.

## 7. prop 타입과 기본값 정의
```jsx
SimpleButton.defaultProps = {
    disabled: false
}

SimpleButton.propTypes = {
    text: PropTypes.string,
    theme: PropTypes.string,
    callback: PropTypes.func,
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
} 
```
- prop 의 타입과 기본값을 static 키워드를 사용해 클래스의 프로퍼티로서 정의하는 방법도 있다.
```jsx
    // 클래스 내부안에 선언해야 한다.
    static defaultProps = {
        disabled: false
    }
    
    static propTypes = {
        text: PropTypes.string,
        theme: PropTypes.string,
        callback: PropTypes.func,
        disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    }
```
   
       