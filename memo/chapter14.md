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
###2.1 children prop 다루기 
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
####a. 컨테이너에 props 추가
- 콤포넌트는 부모로부터 받은 콘텐츠를 직접 조작 할수 없다.
- __따라서 children prop을 통해 받은 콘텐츠에 데이터나 함수를 추가하려면, React.Children.map 메서드와 React.cloneElement 메서드를 함께 사용해 자식 컴포넌트를 복제하고 추가 props 를 할당해야 한다.__
- props 는 읽기 전용이기 때문에 단순히 React.Children.forEach 메서드를 사용해 자식 컴포넌트들을 열거하고 그 컴포넌트들의 props 객체에 새 프로퍼티를 할당하는 일은 불가능하다.
- __따라서 그 대신 React.Children.amp 메서드를 사용해 자식들을 열거하고 React.cloneElement 메서드로 추가 prop과 함께 각 자식들을 복제했다.__
    ```text
       let modChildren = React.Children.map(this.props.children,
                  (c => React.cloneElement(c, { theme: this.state.theme})));
    ```
    - cloneElement 메서드는 자식 컴포넌트와 props 객체를 받는데, 이 props는 자식 컴포넌트의 기존 props에 병합된다.
    
####b. 컴포넌트의 재정렬과 부분 제거
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

## 4. 고차 컴포넌트 
- __고차 컴포넌트는 (HOC) 특성화 컴포넌트의 대안으로서, 컴포넌트에 공통 코드는 필요하지만 연관 콘텐츠의 렌더링은 필요 없는 경우에 유용하다.__
- HOC는 횡단관심사 의 구현에 자주 사용되는데, __횡단 관심사란 애플리케이션 전반을 가로지르는 공통의 작업을 말한다.__
- 횡단 관심사의 개념이 없다면 동일한 코드가 여러 곳에 구현될 여지가 많을 것이다.

```jsx
import React from 'react';

export function ProFeature(FeatureComponent) {
    return function (props) {
        if (props.pro) {
            let { pro, ...childProps} = props;
            return <FeatureComponent {...childProps} />
        } else {
            return <h5 className="bg-warning text-white text-center">
                This is a Pro Feature
            </h5>
        }
    }
}
```
- __HOC는 하나의 컴포넌트를 받아서 추가 기능을 입힌 새로운 하나의 컴포넌트를 리턴하는 함수다.__
- HOC는 ProFeature라는 함수인데, 이는 pro 라는 이름의 prop 값이 true 일 경우에만 사용자에게 보여야 할 컴포넌트 하나를 받는다.
- 즉 일종의 단순한 권한 관리 기능이다.
- 컴포넌트를 보여주기 위해 이 함수는 인자로 받은 컴포넌트를 사용해 pro를 제외한 모든 props를 전달한다.
    ```jsx
      let { pro, ...childProps} = props;
      return <FeatureComponent {...childProps} />
    ``` 

- HOC를 사용하려면 아래와 같이 해당 HOC 함수를 호출해 새 컴포넌트를 만들면 된다.
    ```jsx
      const ProList = ProFeature(SortedList);
    ```
    - HOC는 함수이므로 동작을 설정하기 위해 인자들을 더 추가 할 수 있다.
    - 함수의 결과는 ProList 라는 상수에 할당했으며, 이를 render 메서드 안에서 다른 컴포넌트들과 같은 방식으로 사용했다.
    ```jsx
      <ProList list={names} pro={proMode} />
    ```
    - pro prop 은 HOC 인 proList를 위해서, list prop은 ProList가 감싸고 있는 SortedList 컴포넌트를 위해 정의했다.
    
###4.1. 상태 유지 HOC
- HOC도 상태 유지 컴포넌트가 될수 있으며, 그렇게 함으로써 애플리케이션에 좀 더 복잡한 기능을 추가할 수 있다.
```jsx
    import React, {Component} from "react";
    import {ProFeature} from "./ProFeature";
    
    export function ProController(FeatureComponent) {
        const ProtectedFeature = ProFeature(FeatureComponent);
    
        return class extends Component {
            constructor(props) {
                super(props);
                this.state = {
                    proMode: false,
                }
            }
    
            toggleProMode = () => {
                this.setState({
                    proMode: !this.state.proMode,
                })
            }
    
            render() {
                return (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 text-center p-2">
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input"
                                           value={this.state.proMode}
                                           onChange={this.toggleProMode}/>
                                    <label className="form-check-label">Pro Mode</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <ProtectedFeature {...this.props}
                                                  pro={ this.state.proMode }/>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    }
```
- 이 HOC 함수는 클래스 기반의 상태 유지 컴포넌트를 리턴한다.
- 이 컴포넌트는 체크박스를 보여주며, 또한 래핑된 컴포넌트의 가시성을 제거하기 위해 ProFeature HOC 를 사용한다.


###4.2. HOC의 조합
- __HOC의 유용함 중 하나는 래핑된 컴포넌트 클래스를 생성하는 함수 호출만 변경함으로써 서로 조합할 수 있다는 점이다.__
```jsx
    import React from "react";
    
    export function LogToConsole(FeatureComponent, label, logMount, logRender, logUnmount) {
        return class extends Comment {
    
            componentDidMount() {
                if (logMount) {
                    console.log(`${label}: mount`);
                }
            }
    
            componentWillUnmount() {
                if (logUnmount) {
                    console.log(`${label}: unmount`);
                }
            }
    
            render() {
                if (logRender) {
                    console.log(`${label}: render`);
                }
                return <FeatureComponent { ...this.props }/>
            }
        }
    }
```
- 이 HOC 함수는 래핑될 컴포넌트와 자바스크립트 콘솔에 메시지를 출력할 label 인자를 받는다.


###4.3. 렌더링 prop
- __렌더링 prop 은 렌더링 돼야 할 콘텐츠를 컴포넌트에 제공하는 함수 prop 이며, 이는 한 컴포넌트가 다른 컴포넌트를 래핑하는 또 하나의 방법이다.__
- 렌더링 prop을 사용하는 컴포넌트도 일반적인 방법으로 정의하면 된다. 단지 다른점은 부모가 제공한 콘텐츠를 보여주기 위해 render라는 이름의 함수 prop을 호출한다는점이다.
    ```jsx
      return props.render();
    ```
- 부모 컴포넌트는 자식 컴포넌트를 적용할 때 렌더링 prop을 위한 함수를 제공해야 한다.
```text
비록 관례이긴 하지만 렌더링 prop의 이름이 반드시 render 일 필요는 없다. 
부모와 자식 컴포넌트에서 일관되게 사용하기만 한다면 어떤 이름이든 가능하다. 
```

```jsx
 <ProFeature
            pro={proMode}
            render={() => <SortedList list={names} />}
          />
```
- 리액트가 애플리케이션의 콘텐츠를 렌더링할때 ProFeature 컴포넌트의 render 메서드가 호출되며, 그다음에 render prop 함수가 호출돼 새 SortedList 컴포넌트가 생성된다.


###4.4. 인자 있는 렌더링 prop
- 렌더링 prop은 보통의 자바스크립트 함수이며, 따라서 인자도 받을 수 있다.
- 인자를 사용하면 렌더링 prop을 호출하는 컴포넌트가 자신을 래핑하는 콘텐츠에 props를 전달 할수 있다.


## 5. 전역 데이터를 위한 컨텍스트
- 애플리케이션 컴포지션과 관계없이 props 를 관리하는 일은 점점 힘들어 질수 있다.
- 애플리케이션의 복잡도가 증가함에 따라 연관되는 컴포넌트들의 수도 증가한다.
- __컴포넌트의 계층도가 커짐에 따라 상태 데이터는 애플리케이션 안에서 점점 더 높이 끌어 올려지며, 그 결과 모든 컴포넌트가 자신이 직접 사용하지도 않는 props 를 후손을 위해 전달하게 된다.__
- __이 문제의 해결을 위해 리액트는 컨텍스트(context) 기능을 제공한다.__
- __컨텍스트는 상태 데이터가 정의된 곳으로부터 필요로 하는 곳까지 중간 컴포넌트들을 거치지 않고 전달되게 해준다.__

- 코드 작성
    ```jsx
    import React, { Component } from "react";
    
    class ActionButton extends Component {
      render() {
        console.log(JSON.stringify(this.props))
        console.log(`Render ActionButton (${this.props.text}) Component`);
        return (
          <button className={ this.getClasses(this.props.proMode)} onClick={this.props.callback} disabled={ !this.props.proMode}>
            {this.props.text}
          </button>
        );
      }
    
      getClasses(proMode) {
        let col = proMode ? this.props.theme : "danger";
        return `btn btn-${col} m-2`;
      }
    }
    
    export default ActionButton;
    ```
    - ActionButton이 의존하는 proMode 프로퍼티는 App 컴포넌트의 상태 일부분으로 사용될것이다.
    - App 컴포넌트는 또한 proMode 값을 변경할 때 사용할 체크박스도 정의할 것이다.
    - 컴포넌트 사슬의 결과, 부모로부터 받은 proMode 프로퍼티를 자식에게 전달하게 된다.
    - SortedList 컴포넌트가 자신이 직접 사용하지 않음에도 불구하고 proMode를 전달해야 한다는 뜻이다.
    - __이를 prop 드릴링(prop drilling) 또는 prop 스레딩(prop threading)이라고 하는데, 데이터 값을 필요로 하는 곳으로 컴포넌트 계층도를 통해 prop이 전달되는 것을 말한다.__
    - 문제점
        - 후손이 필요로 하는 prop을 전달하는  것을 잊어버리기 쉬운일이다.
        - 복잡한 애플리케이션안에서 prop 스레딩의 빼먹는 단계를 찾는 일도 만만치 않다.
    
- __컨텍스트는 계층도 안의 중간 컴포넌트들을 거치는 prop 스레딩을 할 필요 없이, 상태 데이터를 사용하려는 곳에 직접 전달할 수 있게 한다.__

###5.1. 컨텍스트 정의
- 컨텍스트는 애플리케이션의 어느 곳에서든 정의할 수 있다.
 
 ```jsx
    import React from "react";
    
    export const ProModeContext = React.createContext({
        proMode: false
    })
```
- 새 컨텍스트를 만들 때엔 React.createContext 메서드를 사용하며, 컨텍스트의 기본값을 지정하기 위한 데이터 객체를 넣을 수 있다.

###5.2. 컨텍스트 소비자
- 다음 단계는 데이터 값이 필요한 곳에서 컨텍스트를 소비하는, 이른바 컨텍스트 소비자를 만드는 것이다.
```jsx
import React, { Component } from "react";
import {ProModeContext} from "./ProModeContext";

class ActionButton extends Component {
  render() {
    console.log(JSON.stringify(this.props))
    console.log(`Render ActionButton (${this.props.text}) Component`);
    return (
        <ProModeContext.Consumer>
          {
            contextData =>
                <button className={ this.getClasses(contextData.proMode)} onClick={this.props.callback} disabled={ !contextData.proMode}>
                  {this.props.text}
                </button>
          }
        </ProModeContext.Consumer>
    );
  }

  getClasses(proMode) {
    let col = proMode ? this.props.theme : "danger";
    return `btn btn-${col} m-2`;
  }
}

export default ActionButton;
```
- 컨텍스트를 소비하는 방법은 렌더링 prop 을 정의할 때와 비슷한데, 컨텍스트를 필요로 하는 커스텀 HTML 엘리먼트를 추가하면 된다.
- 우선 컨텍스트 이름에 해당하는 HTML 엘리먼트를 그다음엔 마침표를 마지막엔 Consumer를 적는다.
```text
    <ProModeContext.Consumer>
        // 컨텍스트가 소비되는 부분 
    </ProModeContext.Consumer>
```
- 컴포넌트는 여전히 컴포넌트의 상태와 prop 데이터에 접근할 수 있으며, 이를 컨텍스트가 제공한 데이터와 함께 자유롭게 혼용할수 있다.


###5.3. 컨텍스트 제공자
- 마지막 단계는 컨텍스트에 상태 데이터를 결부시키는 컨텍스트 제공자를 만드는 것이다.
- 컨텍스트 소비자에게 App 컴포넌트의 모든 상태 데이터를 노출하지 않기 위해 proMode 프로퍼티를 갖는 proContextData 상태 객체를 만들었다.
```jsx
import React, {Fragment, useState} from "react";

function App() {
    const [proContextData, setProContextData] = useState({proMode: false});
    
    const incrementCounter = (event) => {
        setCounter(counter + 1);
    };

    const toggleProMode = () => {
        setProContextData({
            proMode: !proContextData.proMode
        })
    };
    
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center p-2">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  value={proContextData.proMode}
                  onChange={toggleProMode}
                />
                <label className="form-check-label">Pro Mode</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <GeneralList list={names} theme="primary" />
            </div>
            <div className="col-6">
              <ProModeContext.Provider value={proContextData}>
                <SortedList list={names}/>
              </ProModeContext.Provider>
            </div>
          </div>
        </div>
    );
}
export default App;
```

- 컨텍스트를 적용하려면 또 다른 커스텀 HTML 엘리먼트를 사용해야 하는데, 먼저 컨텍스트 이름을 그다음엔 마침표를 마지막으로 Provider 를 적었다.
    ```text
       <ProModeContext.Provider value={proContextData}>
          <SortedList list={names}/>
        </ProModeContext.Provider>
    ```
- value 프로퍼티는 기본값을 덮어쓸 데이터, 즉 proContextData 상태 객체를 컨텍스트에 제공한다.
- ProModeContext.Provider 의 시작과 끝 태그 사이에 정의된 컴포넌트는 ProModeContext.Consumer 엘리먼트를 사용해 상태 데이터에 직접 접근할수 있다.

```text
             ------------------ 컨텍스트 -----------------
             |                                          |
         App 컴포넌트 ---> SortedList 컴포넌트 ----> ActionButton 컴포넌트
```
- App 컴포넌트의 proMode 상태 데이터 프로퍼티를 ActionBution 컴포넌트가 직접 사용함수 있다는 뜻이다. SortedList 컴포넌트를 거치치 않고도 말이다.

###5.4. 컨텍스트 데이터 변경
- 컨텍스트 안의 데이터는 읽기 전용이지만, 함수 prop을 컨텍스트 객체에 포함시켜 상태데이터를 갱신 할수 있다.
- 컨텍스트 공급업체가 value 프로퍼티를 사용하지 않고 콘텐츠를 적용할때 사용될수 있는 임시 역할의 함수를 추가
    ```jsx
      import React from "react";
      
      export const ProModeContext = React.createContext({
          proMode: false,
          toggleProMode: () => {}
      })
    ```
    - 이 함수는 빈 함수이며 오직 소비자로 부터 기본 데이터 객체를 받았을 경우의 에러를 방지한다.
    
    ```jsx
      import React, {Component} from 'react';
      import {ProModeContext} from "./ProModeContext";
      
      export class ProModeToggle extends Component {
          render() {
              return <ProModeContext.Consumer>
                  {
                      contextData => (
                          <div className="form-check">
                              <input type="checkbox" className="form-check-input"
                              value={ contextData.proMode}
                              onChange={ contextData.toggleProMode }/>
                              <label className="form-check-label">
                                  { this.props.label }
                              </label>
                          </div>
                      )
                  }
              </ProModeContext.Consumer>
          }
      }
    ```
    - 이 컴포넌트는 컨텍스트 소비자로서 proMode 프로퍼티를 사용해 체크박스의 값을 설정하고, 그 값이 바뀌면 toggleProMode 함수를 호출한다.
```text
컨텍스트 제공자의 render 메서드 안에 컨텍스트를 만들고 싶은 유혹에서 벗어나기 바란다.
그렇게 하면 내부에 포함시키는 상태 객체를 만들 필요도 없고, 상태 프로퍼티에 메서드를 할당한 필요도 없으므로 좋아 보인다.
그러나 매법 render 메서드 안에서 새 객체를 생성하는 일은 컨텍스트에 대한 리액트의 변경 처리 기능을 해치며, 불필요한 추가 업데이트를 유발할 수 있다.
```

- 코드
```text
      return (
          <div className="container-fluid">
            <ProModeContext.Provider value={ proContextData}>
              <div className="row">
                <div className="col-12 text-center p-2">
                  <ProModeToggle label="Pro Mode"/>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <GeneralList list={names} theme="primary" />
                </div>
                <div className="col-6">
                  <SortedList list={names}/>
                </div>
              </div>
            </ProModeContext.Provider>
          </div>
      );
```
- 객체에 상테 데이터와 함수 모두를 제공하기 위해 toggleProMode 메서드가 값인 프로퍼티 하나를 추가했다.
-  그렇게 함으로써 컨텍스트 소비자가 상태 데이터 프로퍼티의 값을 변경할 수 있게 했으며, 업데이트를 일으킬수 있게 했다.
- ProModeContext.Provider 엘리먼트를 끌어올림으로써 ProModeToggle 과 SortedList 컴포넌트 모두 범위 안에 포함되게 했다.
- 그러나 이는 value 속성에 동일한 객체가 사용될때 선택할 수 있는 사항이며, 실제로는 각 자식 컴포넌트에 각자의 컨텍스트를 줄수 있다.
- 그와 같은 방법은 각기 다른 컴포넌트들을 그룹화해 여러 컨텍스트 인스턴스, 즉 다중 컨텍스트를 사용해야 하는 경우에 유용하다.

```text
     return (
          <div className="container-fluid">
            <div className="row">
              <div className="col-6 text-center p-2">
                <ProModeContext.Provider value={ proContextData}>
                  <ProModeToggle label="Pro Mode"/>
                </ProModeContext.Provider>
              </div>
              <div className="col-6 text-center p-2">
                <ProModeContext.Provider value={ superProContextData}>
                  <ProModeToggle label="Super Pro Mode"/>
                </ProModeContext.Provider>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <ProModeContext.Provider value={ proContextData}>
                  <SortedList list={names}/>
                </ProModeContext.Provider>
              </div>
              <div className="col-6">
                <ProModeContext.Provider value={ superProContextData}>
                  <SortedList list={cities}/>
                </ProModeContext.Provider>
              </div>
            </div>
          </div>
      );
```
- 각 컨텍스트는 자신만의 데이터 객체를 가지며, 리액트는 각 컨텍스트의 제공자와 소비자를 파악할것 이다.

###5.5. 컨텍스트 API 사용
- 리액트는 렌더링 prop 함수 방식보다 더 쉽게 컨텍스트에 접근 할수 있게 또 다른 수단을 제공한다.
- 코드
    ```jsx
      import React, {Component} from 'react';
      import {ProModeContext} from "./ProModeContext";
      
      export class ProModeToggle extends Component {
          static contextType = ProModeContext
      
          render() {
              return (<div className="form-check">
                  <input type="checkbox" className="form-check-input"
                         value={ this.context.proMode}
                         onChange={ (e)=> this.context.toggleProMode(e,this.context.proMode) }/>
                  <label className="form-check-label">
                      { this.props.label }
                  </label>
              </div>)
          }
      }
    ```
    - __contextType 이라는 static 프로퍼티에 컨텍스트를 할당함으로써 컴포넌트 전반에서 this.context 로 접근이 가능해 졌다.__
    - __이는 리액트에 비교적 최근에 추가된 기능으로 특히 컴포넌트가 하나의 컨텍스트를 사용할 때 쉽게 사용할수 있다.__
    
####a. 훅을 사용한 컨텍스트 소비
- userContext 훅은 함수형 컴포넌트를 위해 앞 예제의 contextType 프로퍼티에 상응하는 결과를 제공한다.
    ```jsx
    import React, {useContext} from 'react';
    import {ProModeContext} from "./ProModeContext";
    
    export function ProModeToggle(props) {
    
      const context = useContext(ProModeContext);
    
      return (<div className="form-check">
          <input type="checkbox" className="form-check-input"
                 value={ context.proMode}
                 onChange={ (e)=> context.toggleProMode(e,context.proMode) }/>
          <label className="form-check-label">
              { props.label }
          </label>
      </div>)
    
    }
    ```
    - 보다시피 useContext 훅은 컨텍스트 객체를 리턴하며, 이를 통해 프로퍼티나 함수에 접근할 수 있다.

    
## 6. 에러 경계
- __컴포넌트의 렌더링 메서드나 생명주기 메서드에서 에러가 발생하면, 에러는 애플리케이션의 최상부에 도달할때까지 컴포넌트 계층도를 따라 전파하며, 그 시점에서 애플리케이션의 모든 컴포넌트는 언마운트된 상태가 된다.__
- 이는 어떤 에러든 사실상 애플리케이션을 종료시킬 수 있다는 뜻으로 결코 이상적이지 않다.
- 에러 메시지는 개발 단계에서만 나타나며, 배포된 애플리케이션에선 나타 나지 않는다.

###6.1. 에러 경계 컴포넌트
- __클래스 기반의 컴포넌트는 componentDidCatch 라는 생명주기 메서드를 구현할 수 있는데, 이 메서드는 자식 컴포넌트가 에러를 던지면 호출된다.__
- __리액트에선 이른바 에러 경계라는 컴포넌트에 에러 처리를 위임 할수 있다.__
- 이 컴포넌트는 던져진 에러를 가로채 애플리케이션이 계속 진행되게 하거나, 문제의 본딜을 나타내는 메시지를 사용자에게 보여줄수 있다.
- 코드
```jsx
    import React, {Component, Fragment} from 'react';
    
    class ErrorBoundary extends Component {
        constructor(props) {
            super(props);
            this.state = {
                errorThrown: false,
            }
        }
    
        componentDidCatch(error, info) {
            this.setState({
                errorThrown: true
            })
        }
    
        render() {
            return (
                <Fragment>
                    {
                        this.state.errorThrown &&
                            <h3 className="bg-danger text-white text-center m-2 p-2">
                                Error Detected
                            </h3>
                    }
                    {
                        this.props.children
                    }
                </Fragment>
            );
        }
    }
    
    export default ErrorBoundary;
```
- componentDidCatch 메서드는 문제의 컴포넌트가 던진 에러 객체를 받는다.
- 로딩에 유용하게 쓸수 있는, 컴포넌트의 스택 추적 내용이 담긴 추가 정보 객체도 받는다.
- __에러 경계 컴포넌트가 사용될 때 리액트는 componentDidCatch 메서드를 호출하고 그 다음에 render 메서드를 호출한다.__
- 에러 경계 컴포넌트가 렌더링한 콘텐츠 역시 컴포넌트의 마운트 단계에서 처리되며, 모든 컴포넌트의 인스턴스가 새로 생성된다.
- 이런 순서를 통해 에러 경계 컴포넌트는 문제를 회피할수 있는 콘텐츠 렌더링을 하거나, 애플리케이션의 상태를 변경해 에러가 다시 발생하지 않게 할수 있는 기회를 갖는다.
- 에러 경계 컴포넌트는 자신이 포함하는 모든 컴포넌트와 그 모든 자손에서 던진 어떤 에러라도 처리 할것이다.