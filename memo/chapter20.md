# 데이터 스토어 API
- 리덕스 API 는 데이터 스토어 객체에 직접 사용한다.
- 리액트 API 는 connect 함수를 사용하거나 또는 좀 더 유연한 connectAdvanced 함수를 사용해 컴포넌트를 데이터 스토어에 연결할 때 사용한다.

## 1. 리덕스 데이터 스토어 API
- 대부분의 리액트 애플리케이션에 있어 리덕스 데이터 스토어로의 접근은 데이터 스토어 기능을 props 에 매핑해주는 리액트 리덕스 패키지가 중재한다.
- createStore 함수가 리턴하는 객체는 정리한 4개의 메서드를 통해 직접 사용할 수도 있다.
```text
|     메서드             |     설명
| getState()            | 데이터 스토어의 데이터를 리턴한다. 
| subscribe(listener)   | 데이터 스토어에 변경이 일어날 때마다 호출될 함수를 등록한다.
| dispatch(action)      | 액션 생성자가 생성 시킨 액션을 받아 데이터 스토어에 전달해 리듀서에 의해 처리되게 한다.
| replaceReducer(next)  | 액션을 처리하기 위해 데이터 스토어가 사용하는 리듀서를 교체한다.
```
### 1.1 데이터 스토어 상태 취득
- getState 메서드는 데이터 스토어 안의 데이터를 리턴함으로써 스토어의 콘텐츠를 읽을수 있게 한다.
- 코드
    ```jsx
      import React, {Component} from 'react';
      
      export class StoreAccess extends Component {
          render() {
              return <div className="bg-info">
                  <pre className="text-white">
                      { JSON.stringify(this.props.store.getState(), null, 2)}
                  </pre>
              </div>
          }
      }
    ```
    - 리듀서에 적용된 분할은 getState 메서드가 리턴한 데이터에 아무런 영향을 주지 못하며, 데이터 스토어의 모든 데이터에 접근 할수 있다.

#### a.특정 데이터로 초점 좁히기
- 코드
    ```jsx
    import React, {Component} from 'react';
    
    export class StoreAccess extends Component {
        constructor(props) {
            super(props);
            this.selectors = {
                product: (storeState) => storeState.modelData.products[0],
                state: (storeState) => storeState.stateData
            }
        }
    
        selectData() {
            let storeState = this.props.store.getState();
            return Object.entries(this.selectors).map(([k,v]) => [k, v(storeState)])
                .reduce((result, [k,v]) => ({...result,[k]: v}), {});
        }
    
        render() {
            return <div className="bg-info">
                <pre className="text-white">
                    { JSON.stringify(this.selectData(), null, 2)}
                </pre>
            </div>
        }
    }
    ```
### 1.2 데이터 스토어의 변경 감시
- getState 메서드가 리턴한 객체는 곧 스토어 데이터의 스냅샷이며, 스토어가 변경될 때 자동으로 갱신 되지 않는다.
- 평상시 리액트의 변경 탐지 기능은 스토어에 대해 작동하지 못하는데, 이는 데이터 스토어가 컴포넌트 상태 데이터의 일부가 아니기 때문이다.
- __리덕스는 데이터 스토어에 변경이 일어났을 때 알림을 받을 수 있게 하는 subscribe 라는 구독 메서드를 제공한다.__
- 이를 이용하면 getState 메서드를 다시 호출 해 새로운 데이터 스냅샷을 얻을 수 있다.
- 코드
    ```jsx
      import React, {Component} from 'react';
      
      export class StoreAccess extends Component {
          constructor(props) {
              super(props);
              this.selectors = {
                  product: (storeState) => storeState.modelData.products[0],
                  state: (storeState) => storeState.stateData
              }
              this.state = this.selectData();
          }
      
          selectData() {
              let storeState = this.props.store.getState();
              return Object.entries(this.selectors).map(([k,v]) => [k, v(storeState)])
                  .reduce((result, [k,v]) => ({...result,[k]: v}), {});
          }
      
          handleDataStoreChange() {
              let newData = this.selectData();
              Object.keys(this.selectors).filter(key => this.state[key] !== newData[key]).forEach(key => this.setState({
                  [key]: newData[key]
              }))
          }
      
          componentDidMount() {
              this.unsubscriber = this.props.store.subscribe(() => this.handleDataStoreChange());
          }
      
          componentWillUnmount() {
              this.unsubscriber();
          }
      
          render() {
              return <div className="bg-info">
                  <pre className="text-white">
                      { JSON.stringify(this.state , null, 2)}
                  </pre>
              </div>
          }
      }
    ```
    - subscribe 메서드는 구독을 취소할 때 사용할 수 있는 함수를 리턴하며, 이를 componentWillUnmount 메서드 안에서 호출하게 했다.
    - subscribe 메서드의 인자는 데이터 스토어에 변경이 일어나면 호출될 함수다.
    - 리덕스 자체가 변경된 데이터의 정보를 제공하지는 않는다. 따라서 어떤 데이터가 변경됐는지 확인하기 위해 셀렉터 함수로 얻는 데이터를 조사하는 handleDataStoreChange 메서드를 정의했다.
    - 이 메서드에선 보이는 데이터를 추적하기 위해 상태 데이터를 사용했으며, 갱신을 유발하기 위해 setState 메서드를 사용했다.
    - __컴포넌트가 보여주는 데이터에 변경이 일어 났을때만 상태 변경을 수행하는 것이 중요하다.__

### 1.3 액션 디스패치
- 액션은 dispatch 메서드를 사용해 디스패치 할수 있다.
- 코드
    ```text
          render() {
              return <Fragment>
                  <div className="text-center">
                      <button className="btn btn-primary m-1"
                      onClick={ this.dispatchAction }>
                          Dispatch Action
                      </button>
                  </div>
                  <div className="bg-info">
                      <pre className="text-white">
                          { JSON.stringify(this.state , null, 2)}
                      </pre>
                  </div>
              </Fragment>
          }
      
          dispatchAction = () => {
              this.props.store.dispatch(startCreatingProduct())
          }
    ```
 
### 1.4 커넥터 컴포넌트 제작
- 컨텍스트 API 를 사용해 CustomConnectorProvider 컴포넌트에서 데이터 스토어를 사용할 수 있게 했으며, 셀렉터 와 액션 생성자를 받는 CustomConnector 컴포넌트를 만들었다.
- 셀렉터는 컴포넌트의 상태를 설정해 변경사항이 감지되고 처리될 수 있게 하며, 액션 생성자는 dispatch 메서드에 래핑돼 자식 컴포넌트에서 함수 prop 으로 호출될 수  있게 했다.
- 코드
    ```jsx
    import React, {Component} from 'react';
    
    export class CustomConnectorProvider extends Component {
        render() {
            return <CustomConnector.Provider value={this.props.dataStore}>
                { this.props.children }
            </CustomConnector.Provider>
        }
    }
    
    export class CustomConnector extends Component {
        static contextType = CustomConnectorContext;
    
        constructor(props, context) {
            super(props, context);
            this.state = this.selectData();
            this.functionProps = Object.entries(this.props.dispatchers).map(([k,v]) => [k, (...args) => this.context.dispatch(v(...args))])
                .reduce((result,[k, v])=> ({...result, [k]:v }))
        }
    
        render() {
            return React.Children.map(this.props.children, c => React.cloneElement(c, {...this.state, ...this.functionProps }))
        }
    
        selectData() {
            let storeState = this.props.store.getState();
            return Object.entries(this.selectors).map(([k,v]) => [k, v(storeState)])
                .reduce((result, [k,v]) => ({...result,[k]: v}), {});
        }
    
        handleDataStoreChange() {
            let newData = this.selectData();
            Object.keys(this.selectors).filter(key => this.state[key] !== newData[key]).forEach(key => this.setState({
                [key]: newData[key]
            }))
        }
    
        componentDidMount() {
            this.unsubscriber = this.props.store.subscribe(() => this.handleDataStoreChange());
        }
    
        componentWillUnmount() {
            this.unsubscriber();
        }
    }
    ```
    - 여기서 생성자에 props 와 context 를 부모 컴포넌트에 넘겨주는 이유는 생성자에서 this 를 사용하기 위해서다.
    ```text
       constructor(props, context) {
           super(props, context);
           this.state = this.selectData();
           this.functionProps = Object.entries(this.props.dispatchers).map(([k,v]) => [k, (...args) => this.context.dispatch(v(...args))])
               .reduce((result,[k, v])=> ({...result, [k]:v }),{})
       }
    // 참고 사이트 : https://velog.io/@honeysuckle/%EB%B2%88%EC%97%AD-Dan-Abramov-%EC%99%9C-superprops-%EB%A5%BC-%EC%9E%91%EC%84%B1%ED%95%B4%EC%95%BC-%ED%95%98%EB%8A%94%EA%B0%80
    ```

## 2. 리듀서 개선
- 리듀서는 액션을 처리해 데이터 스토어를 갱신하는 함수다. 
- __하나 이상의 리듀서를 받아 데이터 스토어에 추가 기능을 부여하는 함수를 리듀서 개선자(redux enhancer)  라고 한다.__
```jsx
export default createStore(combineReducers(
    {
        modelData: modelReducer,
        stateData: stateReducer
    }
));
```
- __combineReducers 함수는 리덕스가 제공하는 리듀서 개선자다.__
- 리듀서 개선자는 처리되기 전의 액션을 받기 때문에 유용하다. __이는 리듀서 개선자가 액션을 변경하거나 거부 , 또는 특별한 방법으로 처리할 수 있다는 뜻이다.__
- combineReducers 함수는 복수의 리듀서를 사용할 수 있게 액션을 처리한다.

```jsx
    import { initialData } from "./initialData"
    
    export const STORE_RESET = "store_clear";
    
    export const resetStore = () => ({ type: STORE_RESET })
    
    export function CustomReducerEnhancer(originalReducer)  {
        let initialState = null;
    
        return (storeData, action) => {
            if (action.type === STORE_RESET && initialData != null) {
                return initialState;
            } else {
                const result = originalReducer(storeData, action);
                if (initialState == null) {
                    initialState = result
                }
                return result
            }
        }
    }
```
- CustomReducerEnhancer 함수는 하나의 리듀서를 인자로 받으며, 데이터 스토어가 사용할 수 있는 새 리듀서 함수를 리턴한다.
- 개선자 함수는 리듀서에 전달된 첫 번째 액션을 통해 획득한 데이터 스토어의 초기 상태를 기록한다.
- 새 액션 타입인 STORE_RESET 은 개선자 함수가 데이터 스토어의 초기 상태를 리턴해 데이터 스토어를 초기화 하게 한다.


## 3. 데이터 스토어 미들웨어 
- 리덕스는 데이터 스토어 미들웨어 를 지원한다. __미들웨어는 dispatch 메서드와 리듀서의 사이에서 액션을 받음으로써 액션을 가로채 변형하거나 다른 어떤 방식으로 처리하는 함수다.__
- __미들웨어를 사용하는 가장 흔한 경우는 액션에 비동기 작업을 추가하거나 액션을 함수에 래핑하여 조건적으로 디스패치되게 하는 경우다.__

```text
커스텀 코드를 작성하는 대신 반드시 고려해야 할, 일반적인 프로젝트의 요구사항을 충족시키는 여러 미들웨어 패키지들이 있다.
redux-promise 패키지는 비동기 작업을 지원하며, Redux Thunk 패키지는 함수를 리턴하는 액션 생성자를 지원한다.
```
```jsx
    import React, { Component } from "react";
    
    export function multiActions({ dispatch, getState }) {
        return function receiveNext(next) {
            return function processAction(action) {
                if (Array.isArray(action)) {
                    action.forEach(a => next(a))
                } else {
                    next(action)
                }
            }
        }
    }
```
- 미들 웨어는 다른 함수를 리턴하는 함수들의 집합으로 표현된다.
- 가장 바깥의 multiActions 함수는 미들웨어가 데이터 스토어에 등록될 때 호출되며, 데이터 스토어의 dispatch 와 getState 메서드를 받는다.
- 이는 미들웨어가 액션을 디스패치할 수 있고 데이터 스토어의 현재 데이터를 가져올 수 있게 한다.
- 데이터 스토어는 여러 미들웨어 컴포넌트를 사용할 수 있다.
- 액션은 하나의 미들웨어에서 다른 미들웨어로 전달될 수 있고 최종적으로 데이터 스토어의 dispatch 메서드로 전달될 수 있다.

```text
 return function receiveNext(next)
```
- receiveNext 함수는 액션이 데이터 스토어에 디스패치 되면 호출되는, 가장 안쪽의 함수인 processAction 을 리턴한다.
- 이 함수는 다음 미들웨어 컴포넌트로 전달되기 전의 액션 객체를 변경하거나 교첼할 수 있다.

- __리덕스는 데이터 스토어와 함께 사용하는 미들웨어 사슬을 생성할 때 사용할 수 있는 applyMiddleware 라는 함수를 제공한다.__
```text
applyMiddleware 함수엔 복수의 미들웨어 함수를 각 인자로 전달 할 수 있으며, 함수들은 전달된 순서대로 사슬을 이루게 된다.
```
```jsx
import {PRODUCTS} from "./dataTypes";
import {saveProduct, saveSuppliers} from "./modelActionCreators";
import {endEditing} from "./stateActions";

export const saveAndEndEditing = (data, dataType) => [ dataType === PRODUCTS ? saveProduct(data) : saveSuppliers(data), endEditing()]
```
- saveAndEndEditing 액션은 데이터 객체와 데이터 타입을 받아 이를 사용해 액션의 배열을 만든다.
- 액션의 배열은 미들웨어에 전달돼 순서대로 디스패치될 것이다.


## 4. 데이터 스토어 개선
- 미들웨어가 더 충분한 유연성을 제공하지 않는다고 판단된다면 또 다른 방법으로는 개선자 함수 이다.
- 개선자 함수는 __데이터 스토어 객체를 생성하는 책임을 지며 표준 메서드의 래퍼나 새 메서드를 제공하는 함수다.__
- applyMiddleware 함수가 바로 개선자 함수의 예이며, 이 함수는 데이터 스토어의 dispatch 메서드를 대체해, 리듀서로 전달되기 전에 액션을 미들웨어 사슬에 유통시킨다.
```jsx
export function asyncEnhancer(delay) {
    return function (createStoreFunction) {
        return function (...args) {
            const store = createStoreFunction(...args);
            return {
                ...store,
                dispatchAsync: (action) => new Promise((resolve, reject) => {
                    setTimeout(() => {
                        store.dispatch(action);
                        resolve();
                    },delay);
                })
            }
        }
    }
}
```
- 바깥에서 두번째 함수는 개선자가 데이터 스토어에 적용될때 호출되며, 개선자의 동작을 설정할 인자를 받을 기회를 제공한다.
- 데이터 스토어가 생성되면 리덕스는 개선자가 제공한 함수를 호출하며, 그 결과를 데이터 스토어 객체로 사용한다.

### 4.1 개선자 적용
- 표준 createStore 함수는 오직 하나의 개선자 함수만 받을 수 있는데, 우리는 이미 applyMiddleware 개선자를 사용하고 있다.
- 리듀서 함수는 조합이 가능하므로 하나의 개선자의 결과를 다른 리듀서로 전달할 수 있다. 리덕스는 함수의 조합을 쉽게 처리해주는 compose 라는 함수를 제공한다.


## 5. 리액트 리덕스 API
### 5.1 고급 연결 기능
- connect 함수는 대개 두 개의 인자를 사용하는데, 하나는 데이터 props 를 선택하며 다른 하나는 함수 props 를 선택한다.
```text
return connect(mapStateToProps, mapDispatchToPros)(presentationComponent)
```
- 그런데 사실 connect 함수는 고급 기능을 지원하기 위해 추가 인자를 허용하며, 또 다른 방식으로 표현된 인자를 사용할 수 있다.
#### a. 데이터 props 매핑
- connect 함수의 첫번째 인자는 컴포넌트의 데이터 props 를 위해 스토어로부터 데이터를 선택하는 함수다.
- 대개 셀렉터는 함수로 정의되는데, 이 함수는 스토어의 getState 메서드로부터 값을 받으며 prop 이름에 해당하는 프로퍼티를 갖는 객체를 리턴한다.
- 셀렉터 함수는 데이터 스토어에 변경이 있을 때 호출되며, connect 함수가 만든 HOC는 shouldComponentUpdate 생명주기 메서드를 사용해 커넥트 컴포넌트의 갱신에 변경된 값이 필요한지 여부를 확인한다.
- 셀렉터 함수를 커넥터 컴포넌트를 위해 부모가 제공한 props 를 받기 위한 두 번째 인자로 사용할 수도 있다.
```jsx
    const mapSateToProps = (storeData, ownProps) => {
        if(!ownProps.needSuppliers) {
            return { products: storeData.modelData[PRODUCTS] };
        } else {
            return {
                suppliers: storeData.modelData[SUPPLIERS].map(supp => ({
                    ...supp,
                    products: supp.products.map(id => storeData.modelData[PRODUCTS].find(p => p.id === Number(id)) || id).map(val => val.name || val)
                }))
            }
        }
    }
```

#### b. 함수 props 매핑
- connect 함수의 두 번째 인자는 함수 props 를 매핑하는 객체나 함수다.
- __객체인 경우엔 객체의 각 프로퍼티 값들이 액션 생성자 함수로 간주돼 자동으로 dispatch 메서드에 래핑되며 함수 prop 에 매핑된다.__
- __함수인 경우엔 그 함수는 dispatch 메서드에 전달돼 함수 prop 매핑에 사용된다.__
```text
Tip
connect 함수의 두 번째 인자를 생략할 수 도 있다. 이 경우 dispatch 메서드가 dispatch 라는 이름의 prop 에 매핑되며
컴포넌트가 직접 액셔니을 만들어 디스패치 할 수 있게 한다.
```
- 함수를 지정하는 경우엔 커넥터 컴포넌트의 props 를 받을지도 선택 할수 있다. 이는 컴포넌트가 부모로부터 데이터 스토어의 매핑됨 함수 props 의 집합에 대한 지시를 받을수 있게 한다.
```jsx
     const mapDispatchToProps = (dispatch, ownProps) => {
            console.log(ownProps)
            if (!ownProps.needSuppliers) {
                return {
                    editCallback: (...args) => dispatch(startEditingProduct(...args)),
                    deleteCallback: (...args) => dispatch(deleteProduct(...args))
                }
            } else {
                return {
                    editCallback: (...args) => dispatch(startEditingSupplier(...args)),
                    deleteCallback: (...args) => dispatch(deleteSupplier(...args)),
                }
            }
        }
```
#### c. props 병합
- connect 함수는 프레젠테이션 컴포넌트에 전달되기 전의 props 를 조합하기 위해 사용할수 있는 세번째 인자를 받을수 있다.
- __mergeProps 라고 하는 이 인자는 데이터 props, 함수 props, 컴포넌트 props 를 받으며, 이들을 조합한 하나의 객체를 리턴한다.__
- 리턴된 객체는 프레젠테이션 컴포넌트를 위한 props 로서 사용된다.
```jsx
const mergeProps = (dataProps, functionProps, ownProps) => ({
        ...dataProps, ...functionProps, ...ownProps
    })

return connect(mapStateToProps,mapDispatchToProps,mergeProps)(presentationComponent)
```
- 여기서 mergeProps 함수는 각 prop 객체로부터의 프로퍼티들을 조합한다.
- 프로퍼티들은 정해진 수선대로 객체로부터 복사되는데, 이는 ownProps 를 마지막에 복사한다는 뜻이며, 동일한 이름의 props 가 존재 할 때 부모로부터 받은 props 가 사용될 것이라는 뜻이다.

#### d. 연결 옵션 설정
- connect 함수의 마지막 인자는 관례적으로 option 라는 이름을 갖는 데이터 스토어의 연결을 설정할 때 사용되는 객체다.
```text
|       프로퍼티         |  설명
|       pur             | 기본적으로 커넥터 컴포넌트는 오직 자신의 props 가 변경되거나 데이터 스토어 로부터 선택된 값들 중 하나가 변결될 때 갱신된다.
|                       | 이는 connect 함수가 만드는 HOC 가 prop 나 데이터의 변경이 없다면 컴포넌트가 갱신 되지 않게 한다.
|                       | 이 프로퍼티를 false 로 설정하면 커넥터 컴포넌트는 다른 데이터에도 의존하게되며, HOC 는 갱신을 방지하려는 시도를 하지 않는다. 기본값은 true 다.
|  areStatePropsEqual   | pure 프로퍼티가 true 일때 갱신 작업의 최소화를 위해 mapStateToProps 값의 기본 등치 비교를 대체하는 함수다.
|  areOwnPropsEqual     | pure 프로퍼티가 true 일때 갱신 작업의 최소화를 위해 mapDispatchToProps 값의 기본 등치 비교를 대체하는 함수다. 
|  areMergedPropsEqual  | pure 프로퍼티가 true 일때 갱신 작업의 최소화를 위해 mergeProps 값의 기본 등치 비교를 대체하는 함수다.
|  areStateEqual        | pure 프로퍼티가 true 일때 갱신 작업의 최소화를 위해 전체 컴포넌트의 기본 등치 비교를 대체하는 함수다.
``` 


