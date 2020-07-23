# 14장 애플리케이션 컴포지션
- 애플리케이션 컴포지션이란 복잡한 기능을 만들기 위한 컴포넌트의 조합을 말한다.
- 컴포지션은 작고 간단한 컴포넌트들을 작성해 그들을 조합하기 전에 개별적으로 테스트하게 함으로써 애플리케이션 개발을 쉽게 해준다.

## 1. 기본 컴포넌트 관계
- 컴포넌트들은 리액트 개발에 있어서의 기본적인 관계를 보여준다.
- 부모 컴포넌트는 데이터 props로 자식 컴포넌트를 설정한다.
- 함수 props를 통해 알림을 받아 상태 데이터를 변경하고 업데이트 단계를 시작한다.
```text
App ====================> Message
 ^         || 데이터 props
 |         ||============> ActionButton
 |         함수 props           ||
  =============================||         
```
- 이런 관계는 리액트 개발에 있어서의 근간이자, 애플리케이션의 기능을 분배하는 기본 패턴이다.

## 2. children prop 사용하기
- 리액트는 부모가 제공한 콘텐츠를 보여줘야 하지만 그 콘텐츠가 뭔지 미리 알수 없는 경우에 사용할 수 있는 children 이라는 특별한 prop 을 제공한다.
- __이는 애플리케이션 전반에 걸쳐 재사용할 수 있는 기능을 컨테이너 안에 표준화 함으로써 코드 중복을 줄일 수 있는 유용한 방법이다.__
```jsx
    import React, {Component} from 'react';
    
    export class ThemeSelector extends Component {
        render() {
            return (
                <div className="bg-dark p-2">
                    <div className="bg-info p-2">
                        { this.props.children }
                    </div>
                </div>
            );
        }
    }
```
- 이 컨테이너 컴포넌트는 children prop 값을 갖는 표현식을 포함하는 두개의 div 엘리먼트를 렌더링 한다.
- 리액트는 App 컴포넌트가 렌더링 하는 콘텐츠를 처리할때 ThemeSelector 태그 사이의 콘텐츠를 props.children 프로퍼티에 할당해 결과를 보여줄것이다.
```jsx
import React, { useState } from "react";
import Message from "./Message";
import ActionButton from "./ActionButton";
import { ThemeSelector } from "./ThemeSelector";

function App() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = (event) => {
    setCounter(counter + 1);
  };
  return (
    <div className="m-2 text-center">
      <ThemeSelector>
        <Message theme="primary" message={`Counter: ${counter}`} />
        <ActionButton
          theme="secondary"
          text="Increment"
          callback={incrementCounter}
        />
      </ThemeSelector>
    </div>
  );
}

export default App;
```
2.1 children prop 다루기 
- children prop은 컴포넌트가 자식에게 서비스를 제공할 수 있을때 유용하지만, 자식이 제공하는 것에 대해 알지 못하는 경우엔 사용하기 어렵다.
- 리액트는 그런 제약을 극복할 수 있도록 컨텐이너가 자식을 다룰때 사용할 수 있는 메서드를 제공한다.
```text
|        메서드           |    서명
| React.Children.map     | 각 자식에 대해 함수를 호출하고, 그결과들을 배열로 리턴한다 
| React.Children.forEach | 각 자식에 대해 함수를 호출하지만 배열을 리턴하지 않는다.
| React.Children.count   | 자식의 개수를 리턴한다.
| React.Children.only    | 단 하나의 자식이 아닐 경우 오류를 발생시킨다.
| React.Children.toArray | 이 메서드는 자식의 배열을 리턴하는데, 엘리먼트를 재정렬하거나 부분 제거할때 유용하다.
| React.cloneElement     | 자식 엘리먼트를 복제하며, 새 props 의 추가도 가능하다.
```
a. 컨테이너에 props 추가
- 콤포넌트는 부모로부터 받은 콘텐츠를 직접 조작 할수 없다.
- __따라서 children prop을 통해 받은 콘텐츠에 데이터나 함수를 추가하려면, React.Children.map 메서드와 React.cloneElement 메서드를 함께 사용해 자식 컴포넌트를 복제하고 추가 props 를 할당해야 한다.__
- props 는 읽기 전용이기 때문에 단순히 React.Children.forEach 메서드를 사용해 자식 컴포넌트들을 열거하고 그 컴포넌트들의 props 객체에 새 프로퍼티를 할당하는 일은 불가능하다.
- __따라서 그 대신 React.Children.amp 메서드를 사용해 자식들을 열거하고 React.cloneElement 메서드로 추가 prop과 함께 각 자식들을 복제했다.__
    ```text
       let modChildren = React.Children.map(this.props.children,
                  (c => React.cloneElement(c, { theme: this.state.theme})));
    ```
    - cloneElement 메서드는 자식 컴포넌트와 props 객체를 받는데, 이 props는 자식 컴포넌트의 기존 props에 병합된다.
    
b. 컴포넌트의 재정렬과 부분 제거
- 비록 컨테이너가 자식에 대한 자세한 정보를 모른다 하더라도 toArray 메서드를 사용해 자식을 배열로 변환하면 아이템의 추가,제거,정렬 등 표준 자바스크립트 기능을 사용한 조작이 가능하다.
- 위와 같은 작업은 React.Children.map 메서드가 리턴하는 배열에 대해서도 가능하다.
```jsx
        let modChildren = React.Children.map(this.props.children,
            (c => React.cloneElement(c, { theme: this.state.theme})));

        if (this.state.reverseChildren) {
            modChildren.reverse()
        }
```
- 이와 같은 방식은 예컨대 온라인 쇼핑몰에서의 상품과 같은 유사한 객체의 목록을 다를때 주로 사용되지만, 어떤 자식 컴포넌트라도 적용이 가능하다.

## 3. 특성화 컴포넌트 
- 어떤 컴포넌트는 다른 평범한 컴포넌트가 제공하는 기능의 특성화된 버전을 제공할수있다.
- 일부 프레임워크의 경우 클래스 상속 같은 기능을 사용해 특성화를 하지만, 리액트의 경우 평범한 컴포넌트를 렌더링하면서 props 를 사용해 관리하는 특성화 컴포넌트(specialized component)를 사용한다.
```jsx
import React, {Component} from 'react';

class GeneralList extends Component {
    render() {
        return (
            <div className={`bg-${this.props.theme} text-white p-2`}>
                {this.props.list.map((item,index) =>
                    <div key={item}>{ index + 1}: { item }</div>    
                )}
            </div>
        );
    }
}

export default GeneralList;
```
- 이 컴포넌트는 list라는 이름의 prop를 받고 그 map 메서드를 사용해 일련의 div 엘리먼트를 렌더링한다.
- 컴포넌트가 list 를 받아 정렬하게 하려면 GeneralList 가 제공하는 기능을 기반으로 좀 더 특성화된 컴포넌트를 만들면 된다.

