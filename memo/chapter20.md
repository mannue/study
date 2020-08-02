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
