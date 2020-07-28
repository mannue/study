# 16장 ref 와 포털 
- 보통의 상황에서 컴포넌트는 DOM 안의 엘리먼트와 직접 상호작용 할 수 없다.
- 그 대신 props 와 이벤트 핸들러를 통해 상호작용을 하며, 이 는 콘텐츠에 대한 지식 없이도 컴포넌트들의 협업을 가능하게 한다.
- 그러나 컴포넌트가 DOM 안의 엘리먼트와 상호작용을 해야 하는 상황도 있다.
- 리액트는 이를 위해 두가지 기능을 제공한다.
```text
1. ref (reference) 의 약자 로서, 컴포넌트가 렌더링 한 HTML 엘리먼트가 DOM 에 추가된 후에도 접근을 가능하게 한다.
2. 포털(portal) 이라는 기능이며, 이는 애플리케이션 콘텐츠의 외부에서 HTML 엘리먼트에 접근할 수 있게 한다.
```
- 이들 기능은 주의해서 사용해야 하는데, 왜냐하면 컴포넌트의 독립성을 약화시킴으로써 개발, 테스트, 유지 관리를 어렵게 만들기 때문이다.
- 이들 기능을 무분별하게 사용한다면 리액트가 제공하는 핵심 기능을 중복해서 만들게 되는 안 좋은 결과를 낳을 수 있다.

```text
유용한 경우
- 엘리먼트에 포커스를 주는 일과 같이 DOM 에 직접 접근하지 않으면 쉽게 처리할수 없는 HTML 엘리먼트의 일부 특징들이 있다.
- 다른 프레임워크나 라이브러리에 접근하는 경우에도 유용하다.
```

## 1. ref 생성 
- __ref 는 컴포넌트가 특정 HTML 엘리먼트의 기능을 사용하기 위해 DOM 에 접근하고자 할 때 사용된다.__
- props 를 통해 사용할수 없는 HTML 기능들이 존재하며, 그중 하나는 엘리먼트가 포커스를 얻었는지 여부를 확인하는 일이다.
- 콘텐츠가 처음 렌더링 될때 어떤엘리먼트에 포커스를 주고 싶다면 autoFocus 속성을 사용하면 된다.
- 그러나 사용자가 버튼을 클릭하면 포커스가 버튼으로 이동될것이다. 이는 input 엘리먼트를 클릭하거나 Tab 키를 사용해 input 엘리먼트에 다시 포커스를 주지 않는 한, 새로운 아이템을 만들기 위한 타이핑을 즉시 시작 할수 없다는 뜻이다.
- __ref 를 사용하면 Add 버튼을 클릭해 이벤트가 발생할때, DOM 에 접근해 input 엘리먼트 에 대해 focus 메서드를 호출할수 있다.__

```text
ref 를 과도하게 사용하는 컴포넌트는 관리가 힘들며 특정 브라우저 기능으로의 의존성을 높일수 있고,
따라서 각기 다른 플랫폼에서 실행하기 곤한해 질수 있다.
따라서 ref 는 오직 최후의 수단으로 사용해야 하며, 상태와 props 를 사용해 동일한 결과를 얻을 수 있는지 늘 고민하기 바란다.
```
- 코드
    ```text
     constructor(props) {
          super(props);
          this.state = {
              name: "",
              category: "",
              price: ""
          }
          this.nameRef = React.createRef();
      }
    ```
    - ref 를 React.createRef 메서드를 사용해 만들었으며, 이를 생성자 안에 함으로써 그 결과를 컴포넌트 전체에서 사용할 수 있게 했다.
    - __ref 는 ref 라는 특별한 prop, 해당 엘리먼트를 위한 ref 를 선택하는 표현식을 사용해 엘리먼트에 연결된다.__
    ```jsx
      <div className="form-group p-2">
          <label>Name</label>
          <input className="form-control" name="name"
          value={this.state.name} onChange={this.handleChange}
          autoFocus={true} ref={this.nameRef}/>
      </div>
    ```
    - createRef 메서드가 리턴한 ref 객체는 current 라고 하는 프로퍼티 하나를 정의하고 있는데, 이 프로퍼티는 DOM 안의 엘리먼트를 대변하는 HTMLElement 라는 객체를 리턴한다.
    - 여기선 handleAdd 메서드 안에서 current 프로퍼티를 사용해 상태 데이터 갱신이 완료되면 focus 메서드를 호출하게 했다.
    ```text
      handleAdd = () => {
          this.props.callback(this.state)
          this.setState({
              name: "",
              category: "",
              price: ""
      }, () => this.nameRef.current.focus())
    ```

## 2. 비제어 폼 컴포넌트
- 리액트는 각 폼 엘리먼트의 콘텐츠에 대한 책임을 지며, 값 저장은 상태 데이터 프로퍼티로 값 변경은 이벤트 핸들러로 처리 한다. 
- 폼 엘리먼트에 대한 접근에 ref 가 사용되며, 브라우저가 엘리먼트의 값 관리와 변경 처리의 책임을 진다. 
- 코드
    ```jsx
        import React, { Component, Fragment } from "react";
        
        class Editor extends Component {
          constructor(props) {
            super(props);
            /*    this.state = {
              name: "",
              category: "",
              price: "",
            };*/
            this.nameRef = React.createRef();
            this.categoryRef = React.createRef();
            this.priceRef = React.createRef();
          }
          /*
        
          handleChange = (event) => {
            event.persist();
            this.setState((state) => (state[event.target.name] = event.target.value));
          };
        */
        
          handleAdd = () => {
            this.props.callback({
              name: this.nameRef.current.value,
              category: this.categoryRef.current.value,
              price: this.priceRef.current.value,
            });
        
            this.nameRef.current.value = "";
            this.categoryRef.current.value = "";
            this.priceRef.current.value = "";
            this.nameRef.current.focus();
          };
        
          render() {
            return (
              <Fragment>
                <div className="form-group p-2">
                  <label>Name</label>
                  <input
                    className="form-control"
                    name="name"
                    autoFocus={true}
                    ref={this.nameRef}
                  />
                </div>
                <div className="form-group p-2">
                  <label>Category</label>
                  <input
                    className="form-control"
                    name="category"
                    ref={this.categoryRef}
                  />
                </div>
                <div className="form-group p-2">
                  <label>Price</label>
                  <input
                    className="form-control"
                    name="price"
                    ref={this.priceRef}
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-primary" onClick={this.handleAdd}>
                    Add
                  </button>
                </div>
              </Fragment>
            );
          }
        }
        
        export default Editor;
    ```
    - 이 코드의 결과는 이전의 예제와 동일한다. 그러나 내부적으로 리액트는 더 이상 엘리먼트의 값을 관리하거나 변경 이벤트에 응답할 책임을 갖지 않는다.

- 콜백 ref 사용하는 방법
    ```jsx
      import React, { Component, Fragment } from "react";
      
      class Editor extends Component {
        constructor(props) {
          super(props);
          this.formElements = {
            name: { },
            category: { },
            price: { }
          }
        }
      
        setElement = (element) => {
          console.log(element)
          if (element !== null) {
            this.formElements[element.name].element = element;
          }
          console.log(this.formElements)
        }
      
        handleAdd = () => {
          let data = {};
          Object.values(this.formElements).forEach(v => {
            data[v.element.name] = v.element.value;
            v.element.value = "";
          });
          console.log(`data: ${JSON.stringify(data)}`)
          this.props.callback(data)
          this.formElements.name.element.focus();
        };
      
        render() {
          return (
            <Fragment>
              <div className="form-group p-2">
                <label>Name</label>
                <input
                  className="form-control"
                  name="name"
                  autoFocus={true}
                  ref={this.setElement}
                />
              </div>
              <div className="form-group p-2">
                <label>Category</label>
                <input
                  className="form-control"
                  name="category"
                  ref={this.setElement}
                />
              </div>
              <div className="form-group p-2">
                <label>Price</label>
                <input
                  className="form-control"
                  name="price"
                  ref={this.setElement}
                />
              </div>
              <div className="text-center">
                <button className="btn btn-primary" onClick={this.handleAdd}>
                  Add
                </button>
              </div>
            </Fragment>
          );
        }
      }
      
      export default Editor;
    ```
    - 각 input 엘리먼트의 ref 프로퍼티 값으로 콘텐츠가 렌더링될 때 호출되는 메서드가 지정됐다.
    - setElement 메서드는 엘리먼트가 언마운트됐다면 null 을 인자로 받으며 호출된다. 따라서 엘리먼트 제거에 따른 별도의 정리를 할 필요 없이 단지 setElement 메서드에서 null 값 여부만 확인하면 된다.
    ```jsx
        setElement = (element) => {
          console.log(element)
          if (element !== null) {
            this.formElements[element.name].element = element;
          }
          console.log(this.formElements)
        }
    ```
2.1. 비제어 폼 컴포넌트의 검증
- __폼 엘리먼트엔 HTML 제약 검증 API 의 검증 기능이 내장돼 있다.__
- 이 검증 API 는 다음과 같은 식의 객체를 사용해 엘리먼트의 검증 상태를 기술한다.
    ```text
      {
          valueMissing: true, tooShort: false, rangeUnderflow: false
      }
    ``` 
    - 반드시 값을 가져야 한다고 지정된 엘리먼트가 값이 없다면 valueMissing 프로퍼티는 true 를 리턴한다.
    - 엘리먼트의 값 길이가 검증 규칙에 의해 지정된 문자의 수보다 적다면 tooShort 프로퍼티는 true 를 리턴한다.
    - 지정된 최솟값 보다 엘리먼트의 숫자값이 더 작으면 rangeUnderflow 프로퍼티는 true를 리턴한다.
    
    ```jsx
      export function GetValidationMessages(elem) {
          let errors = [];
          if (!elem.checkValidity()) {
              if (elem.validity.valueMissing) {
                  errors.push("Value required");
              }
              if (elem.validity.tooShort) {
                  errors.push("Value is too short")
              }
              if (elem.validity.rangeUnderflow) {
                  errors.push("Value is too small")
              }
          }
          return errors;
      }
    ```
    - GetValidationMessage 함수는 HTML 엘리먼트 객체를 받아 checkValidity 메서드를 호출함으로써 브라우저에게 데이터 검증을 요청한다.
    - checkValidity 메서드는 엘리먼트의 값이 유효하다면 true 를 그렇지 않으면 false 를 리턴한다.
    - 만약 엘리먼트의  값이 유효하지 않다면 엘리먼트의 validity 프로퍼티를 확인해, valueMissing, tooShort, rangeUnderflow 프로퍼티 중에 true 가 있다면 사용자에게 보여줄 메시지를 에러의 배열에 추가할 수 있다.
    
    ```jsx
      import React, { Component } from "react";
      
      const propTypes = {};
      
      export class ValidationDisplay extends Component {
        render() {
          return this.props.errors ? this.props.errors.map( err =>
          <div className="small bg-danger text-white mt-1 p-1"
          key={err}>
              {err}
          </div>): null
        }
      }
    ```
    - 이 컴포넌트는 에러 메시지의 배열을 받아 화면에 보여준다. 만약 에러 메시지가 전혀 없다면 null 을 리턴함으로써 보여줄 콘텐츠가 없음을 나타낸다.
    ```jsx
      this.formElements = {
        name: { label: "Name", name: "name", validation: { required: true, minLength: 3}},
        category: { label: "Category", name: "category", validation: { required: true, minLength: 5}},
        price: { label: "Price", name: "price", validation: { type: "number", required: true, min: 5}}
      }
  
      <input
        className="form-control"
        name={elem.name}
        autoFocus={elem.name === "name"}
        ref={this.setElement}
        onChange={ ()=> this.validateFormElement(elem.name)}
        { ...elem.validation}/>
    ```
    - input 엘리먼트에 formElements 의 validation 속성을 적용함으로써 HTML 자체 검증하도록 한다.
        
## 3. ref 와 생명주기
- __ref 는 리액트가 컴포넌트의 render 메서드를 호출하기 전까지 값을 할당받지 못한다.__
- __createRef 메서드를 사용하는 경우라면 컴포넌트가 자신의 콘텐츠를 렌더링 하기 전까지 current 프로퍼티는 값을 할당받지 못한다.__
- __콜백 ref 역시 컴포넌트의 렌더링 전까지 자신의 메서드를 호출하지 못한다.__
- __ref 의 할당은 컴포넌트 생명주기에 있어서 후반에 일어날 것이다.__
- DOM 엘리먼트는 렌더링 단계 이전엔 생성되지 않는다. 즉 리액트는 render 메서드가 호출되기 전까지는 ref 가 참조할 엘리먼트를 만들지 않는다는 뜻이다.
- __ref 와 연결된 엘리먼트는 오직 componentDidMount 와 componentDidUpdate 메서드에서 접근이 가능하다.__
- 이 생명주기 메서드들은 렌더링이 완료되고 DOM 엘리먼트가 생성되거나 갱신된 후에 사용되기 때문이다.
- ref 를 사용하는 결과 중 하나는, 리액트가 DOM 의 엘리먼트를 교체하는 경우 컴포넌트가 컨텍스트를 보존하기 위해 상태에 의존할 수 없다는 점이다.
- 리액트는 DOM 변경을 최소화 하려고 노력하겠지만, 그럼에도 애플리케이션의일생에 걸쳐 사용되는 엘리먼트에 의존하면 안된다.

- 코드
    ```jsx
         import React, { Component, Fragment } from "react";
         import {GetValidationMessages} from "./ValidationMessages";
         import {ValidationDisplay} from "./ValidationDisplay";
         
         class Editor extends Component {
           constructor(props) {
             super(props);
             this.formElements = {
               name: { label: "Name", name: "name", validation: { required: true, minLength: 3}},
               category: { label: "Category", name: "category", validation: { required: true, minLength: 5}},
               price: { label: "Price", name: "price", validation: { type: "number", required: true, min: 5}}
             }
             this.state = {
               errors: {},
               wrapContent: false,
             }
           }
         
           setElement = (element) => {
             if (element !== null) {
               this.formElements[element.name].element = element;
             }
           }
         
           handleAdd = () => {
             if (this.validateFormElements()) {
               let data = {};
               Object.values(this.formElements).forEach(v => {
                 data[v.element.name] = v.element.value;
                 v.element.value = "";
               });
               console.log(`data: ${JSON.stringify(data)}`)
               this.props.callback(data)
               this.formElements.name.element.focus();
             }
           };
         
           validateFormElement = (name) => {
             let errors = GetValidationMessages(this.formElements[name].element);
             console.log(errors)
             this.setState(state => state.errors[name] = errors);
             return errors.length === 0;
           }
         
           validateFormElements = () => {
             let valid = true;
             Object.keys(this.formElements).forEach(name => {
               if (!this.validateFormElement(name)) {
                 valid=false;
               }}
             )
             return valid;
           }
         
           toggleWrap = () => {
             this.setState(state => state.wrapContent = !state.wrapContent)
           }
         
           wrapContent(content) {
             return this.state.wrapContent ? <div className="bg-secondary p-2">
               <div className="bg-light">{ content }</div>
             </div> : content;
           }
         
           render() {
             return this.wrapContent(
                 <Fragment>
                   <div className="form-group text-center p-2">
                     <div className="form-check">
                       <input className="form-check-input"
                              type="checkbox"
                              checked={this.state.wrapContent}
                              onChange={this.toggleWrap}/>
                       <label className="form-check-label">Wrap Content</label>
                     </div>
                   </div>
                   {
                     Object.values(this.formElements).map( elem =>
                         <div className="form-group p-2" key={ elem.name } >
                           <label>{elem.label}</label>
                           <input
                               className="form-control"
                               name={elem.name}
                               autoFocus={elem.name === "name"}
                               ref={this.setElement}
                               onChange={ ()=> this.validateFormElement(elem.name)}
                               { ...elem.validation}/>
                           <ValidationDisplay errors={this.state.errors[elem.name]} />
                         </div>)
                   }
                   <div className="text-center">
                     <button className="btn btn-primary" onClick={this.handleAdd}>
                       Add
                     </button>
                   </div>
                 </Fragment>
             )
           }
         }
         
         export default Editor;
    ```
    - 체크 시 input 엘리먼트에 입력됐던 텍스트는 사라지며, 탐지된 모든 검증 에러가 컴포넌트 상태 데이터의 일부이므로 입력했던 값이 사라졌음에도 불구하고 에러 메시지는 새 input 엘리먼트와 나란히 나타날 것이라는 점이다.
    - 이 문제를 해결 하기 위해 상태 유지 컴포넌트엔 getSnapshotBeforeUpdate 라는 생명 주기 메서드가 있다.
    ```text
               --------- Snapshot 객체 --------->--->
               |                                     |
       render -----> getSnapshotBeforeUpdate ----> componentDidUpdate
    ```
    - 이 getSnapshotBeforeUpdate 메서드는 DOM 갱신 이전의 현재 콘텐츠를 조사해 커스텀 스냅샷 객체를 생성한다.
    - DOM 갱신이 완료되면 componentDidUpdate 메서드가 스냅샷 객체를 받으며 호출된다. 따라서 컴포넌트는 현재 DOM 에 존재하는 엘리먼트를 다룰 수 있게 된다.
    ```text
     조상의 콘텐츠가 변경됨에 따라 컴포넌트가 언마운트되고 다시 생성된 경우엔 스냅샷으로 컨텍스트를 보존하지 못한다.
     그런 상황이라면 componentWillUnmount 메서드를 사용해 ref 에 접근할 수 있으며, 데이터를 컨텍스트를 통해 보관할수 있다.
    ```
    - 코드
        ```jsx
           componentDidUpdate(oldProps, oldState, snapshot) {
              snapshot.forEach(item=> {
                let element = this.formElements[item.name].element
                if (element.value !== item.value) {
                  element.value = item.value
                }
              })
            }
          
            getSnapshotBeforeUpdate(prevProps, prevState) {
              return Object.values(this.formElements).map(item => {
                return {name: [item.name], value: item.element.value }
              })
            }
        ```
        - getSnapshotBeforeUpdate 메서드는 DOM 갱신 이전의 props 와 상태 객체를 받고 DOM 갱신 후에 componentDidUpdate 메서드에 전달될 객체를 리턴한다.
        - 리액트는 스냅샷 객체에 대한 특별한 형식을 강제하지 않으며, getSnapshotBeforeUpdate 메서드는 쓸모만 있다면 어떤 형식의 데이터라도 리턴 할 수 있다.
        - __getSnapshotBeforeUpdate 와 componentDidUpdate 메서드는 업데이트 단계에서 항상 호출된다 이점에서 DOM 갱신이 완료된 후의 엘리먼트 값이 스냅샷의 값과 다를때만 스냅샷이 적용 되게 한 이유다.__
        
## 4. 다른 라이브러리나 프레임워크를 위한 ref
- 서서히 리액트로 전환해가는 프로젝트에 있어서 어떤 컴포넌트는 다른 라이브러리나 프레임워크로 작성된 기존 기능과 상호 작동이 필요할 수 있다.
- 가장 흔한 예가 제이쿼리 다.

- 제이쿼리 코드
    ```jsx
        var $ = require('jquery')
        
        export function ColorInvalidElement(rootElement) {
            $(rootElement)
                .find("input:invalid").addClass("border-danger")
                .removeClass("border-success")
                .end()
                .find("input:valid").removeClass("border-danger")
                .addClass("border-success")
        }
    ```
    - 이 제리쿼리 구문은 invalid 라는 가상 클래스가 할당된 모든 input 엘리먼트를 찾아 border-danger 클래스를 추가하며, 또한 valid 가상 클래스인 모든 input 엘리먼트에는 border-success 클래스를 추가한다.
    - valid 와 invalid 는 엘리먼트의 검증 상태를 나타내는 HTML 제약 검증 API가 사용하는 가상 클래스다.
    
## 5. 자식 컴포넌트의 콘텐츠 접근
- ref 는 리액트가 특별히 취급하는 prop 이다. 
- __이는 자식 컴포넌트가 렌더링하는 DOM 엘리먼트에 대한 ref 를 사용할 때 주의가 필요하다는 뜻이다.__
- 가장 쉬운 접근법은 ref 객체 나 콜백 함수를 ref 가 다른 이름을 사용하는 것이다.
- 그러면 리액트는 그 ref 를 여느 prop 과 마찬가지로 전달 할 것이다.

```text
자식 컴포넌트의 콘텐츠에 접근하는 일은 신중을 가해야 한다. 작성과 테스트가 힘든 강하게 결합
된 컴포넌트들이 만들어지기 때문이다. 가능하다면 컴포넌트들 사이의 통신에는 prop 를 사용하기 바란다.
```

5.1. ref 포워딩
- 리액트는 자식에게 ref 를 전달하는 또 다른 방법을 제공한다.
- 이른바 ref 바인딩 이라고 하는데, 일반적인 prop 대신 ref 를 사용할 수 있게 하는 방법이다.
- 코드
    ```jsx
          import React, {Component} from 'react';
          
          export const ForwardFormField = React.forwardRef((props , ref) => {
              <FormField {...props} fieldRef={ref}/>
          })
          
          class FormField extends Component {
              constructor(props) {
                  super(props);
                  this.state = {
                      fieldValue: ""
                  }
              }
          
              handleChange = (ev) => {
                  this.setState({
                      fieldValue: ev.target.value
                  })
              }
          
              render() {
                  return (
                      <div className="form-group">
                          <label>{ this.props.label}</label>
                          <input className="form-control" value={this.state.fieldValue}
                                 onChange={this.handleChange} ref={this.props.fieldRef }/>
          
                      </div>
                  );
              }
          }
          
          export default FormField;
    ```
    - React.forwardRef 메서드는 props 와 ref 값을 받아 콘텐츠를 렌더링하는 함수에 전달된다.
    - 여기서 받은 ref 값을 fieldRef prop 에 넘겼는데, fieldRef 는 FormField 컴포넌트가 사용할 prop 의 이름이다.
    ```jsx
      import React from "react";
      import {ForwardFormField} from "./FormField";
      
      
      function App() {
          const fieldRef = React.createRef();
      
          const handleClick = () => {
              console.log(fieldRef)
              fieldRef.current.focus();
          };
      
          return (
              <div className="m-2">
                  <ForwardFormField label="Name" ref={fieldRef}/>
                  <div className="text-center m-2">
                      <button className="btn btn-primary" onClick={handleClick}>
                          Focus
                      </button>
                  </div>
              </div>
          );
      }
      
      export default App;

    ```
    - 동일한 결과를 가져오지만 이제 App 컴포넌트는 자식 컴포넌트 내부에서 처리되는 ref 에 대해 특별히 알 필요가 없다는 점이 달라졌다.
    
# 6. 포털 
- __포털은 컴포넌트가 부모 콘텐츠의 일부로서가 아닌 특정 DOM 엘리먼트 안에서 자신의 콘텐츠를 렌더링 할 수 있게 한다.__
- 이는 통상적인 리액트의 컴포넌트 모델을 벗어나는 일이다.
- 대상 엘리먼트가 애플리케이션의 외부에서 생성되고 관리돼야 하므로, 다른 컴포넌트 안에 콘텐츠를 렌더링 할때 포털을 사용할 수없다.
- 결론적으로 포털은 사용자에게 보여줄 대화상자나 모달 경고창을 만드는 경우, 또는 리액트를 다른 프레임워크나 라이브러리가 만든 콘텐츠에 통합하는 경우등 제한된 상황에서만 유용한 기능이다.

- 코드
    ```jsx
      import React, {Component} from 'react';
      import ReactDOM from "react-dom"
      
      class PortalWrapper extends Component {
          constructor(props) {
              super(props);
              this.protalElement = document.getElementById("portal")
          }
      
          render() {
              return ReactDOM.createPortal(
                  <div className="border p-3">{
                      this.props.children
                  }</div>
              )
          }
      }
      
      export default PortalWrapper;
    ```
    - 포털의 콘텐츠가 애플리케이션의 외부에서 렌더링 됨에도 이벤트 버블과 ref 할당 등이 가능하다.