# 15장 폼과 데이터 검증
- 폼은 애플리케이션이 사용자로부터 데이터를 수집할 수 있게 한다.
- 검증은 데이터를 검사함으로써 애플리케이션에 사용할수 있음을 보장하는 과정이다.

## 1. 폼 엘리먼트 사용
- 대부분의 폼은 복수의 필드를 필요로 한다. 따라서 각 필드를 위한 서로 다른 이벤트핸들러를 정의하기 보다는 하나의 메서드를 사용하고 해당 폼 엘리먼트가 자신과 관련된 상태 값을 나타낼수 있게 하는 방법이 낫다.
- 코드
    ```jsx
    import React, {Component} from 'react';
    
    class Editor extends Component {
        constructor(props) {
            super(props);
            this.state = {
                name: "",
            }
        }
    
        updateFormValue = (event) => {
            this.setState({
                [event.target.name] : event.target.value
            }, () => this.props.submit(this.state))
        }
        render() {
            return (
                <div className="h5 bg-info text-white p-2">
                    <div className="form-group">
                        <label>Name</label>
                        <input className="form-control"
                        name="name"
                        value={this.state.name}
                        onChange={this.updateFormValue}/>
                    </div>
                </div>
            );
        }
    }
    
    export default Editor;
    ```
    - 이 예제에선 name prop를 사용해 상태 프로퍼티의 이름을 지정했으며, 이를 이벤트 핸들러가 받은 이벤트로부터 읽히게 했다.
    
  ```jsx
      updateFormValue = (event) => {
                  this.setState({
                      [event.target.name] : event.target.value
                  }, () => this.props.submit(this.state))
              }
    ```
    - 대괄호([와])안의 콘텐츠는 상태 갱신을 위한 프로퍼티 이름을 얻기 위해 평가된다.
    - 이는 setState 메서드에서 event.target 객체의 name 프로퍼티를 사용할 수 있게 한다.
    - __이 접근법은 한 컴포넌트 안의 이벤트 핸들러 개수를 줄여준다는 장점이 있다.__

    ```text
    사용자에게 빈 input 엘리먼트를 보여주고 싶다면 상태 프로퍼티에 빈 문자열("")을 지정하기 바란다.
    빈 문자열이 아닌 null 이나 undefined는 사용하지 말아야 한다. 그럴 경우 리액트는 자바스크립트 콘솔에 경고 메시지를 발생시키기 때문이다.
    ```
    - setState 메서드가 제공하는 콜백 옵션을 사용함으로써 상태 데이터가 갱신된 다음에 submit 함수 prop를 호출하게 했다는 점에 주목하기 바란다.
    - 지금은 마치 상태 데이터를 불필요하게 중복 사용하는 것으로 보이지만, 이렇게 함으로써 나중에 데이터 검증 기능을 구현할 때 좀 더 쉽게 할수 있다.!!

1.1. select 엘리먼트
- 일단 기본 구조가 갖춰지면 제어 컴포넌트에 폼 엘리먼트를 추가하는 일은 쉽다.
- Editor 컴포넌트에 두 개의 select 엘리먼트를 추가하자
- 코드
    ```jsx
      import React, {Component} from 'react';
      
      class Editor extends Component {
          constructor(props) {
              super(props);
              this.state = {
                  name: "Bob",
                  flavor: "Vanilla",
                  toppings: ["Strawberries"]
              }
      
              this.flavors = ["Chocolate", "Double Chocolate", "Triple Chocolate", "Vanilla"];
              this.toppings = ["Sprinkles", "Fudge Sauce", "Strawberries", "Maple Syrup"]
          }
      
          updateFormValue = (event) => {
              this.setState({
                  [event.target.name] : event.target.value
              }, () => this.props.submit(this.state))
          }
      
          updateFormValueOptions = (event) => {
              let options = [...event.target.options].filter(o => o.selected).map(o=>o.value);
              this.setState({
                  [event.target.name]: options,
              }, () => this.props.submit(this.state))
          }
      
          render() {
              return (
                  <div className="h5 bg-info text-white p-2">
                      <div className="form-group">
                          <label>Name</label>
                          <input className="form-control"
                          name="name"
                          value={this.state.name}
                          onChange={this.updateFormValue}/>
                      </div>
                      <div className="form-group">
                          <label>Ice Cream Flavors</label>
                          <select className="form-control"
                                  name="flavor" value={this.state.flavor}
                                  onChange={ this.updateFormValue }>
                              {
                                  this.flavors.map(flavor =>
                                  <option value={flavor} key={flavor}>{flavor}</option> )
                              }
                          </select>
                      </div>
                      <div className="form-group">
                          <label>Ice Cream Toppings</label>
                          <select className="form-control" multiple={true}
                          name="toppings" value={ this.state.toppings}
                          onChange={ this.updateFormValueOptions }>
                              {
                                  this.toppings.map(top =>
                                  <option value={top} key={top}>{top}</option>)
                              }
                          </select>
                      </div>
                  </div>
              );
          }
      }
      
      export default Editor;
    ```
    - 복수의 값을 보여주는 엘리먼트의 경우 신중을 기애햐 하지만, 그럼에도 불구하고 select 엘리먼트는 다루기 어렵지 않다.
    - 기본적으로 select 엘리먼트에선 사용자가 선택한 값이 value 프로퍼티에 설정되고, 그 선택 행위는 onChange 프로퍼티를 통해 처리된다.
    - select 엘리먼트가 보여주는 option 엘리먼트는 보동의 HTML 엘리먼트로 작성되거나 프로그래밍으로 생성 될수 있는데, 어느 경우든 반드시 key 프로퍼티가 있어야 한다.
    ```jsx
      <select className="form-control"
              name="flavor" value={this.state.flavor}
              onChange={ this.updateFormValue }>
          {
              this.flavors.map(flavor =>
              <option value={flavor} key={flavor}>{flavor}</option> )
          }
      </select>
    ```
a. 복수의 아이템을 보여주는 select 엘리먼트
- 복수 선택이 가능한 select 엘리먼트의 경우 약간의 작업이 필요하다.
- 우선 엘리먼트를 정의할때 multiple prop 에 표현식과 함께 true 를 설정해야 한다.
- 코드
    ```jsx
       <select className="form-control" multiple={true}
                           name="toppings" value={ this.state.toppings}
                           onChange={ this.updateFormValueOptions }/>
    ```
    - multiple prop에 어떤 문자열 값을 지정하든 무조건 multiple 속성을 적용한다는 의미가 된다.
    - __즉 설사 "false"를 지정하더라도 그와 관계없이 multiple 속성이 적용된다.__
    - 지금처럼 문자열 값 대신 표현식을 사용하는 이유는 그런 흔한 실수를 막기 위해서다.
    - 사용자의 복수 선택을 처리하려면 변경 이벤트를 처리하는 또 다른 핸들러가 필요하다.
    ```jsx
      updateFormValueOptions = (event) => {
              let options = [...event.target.options].filter(o => o.selected).map(o=>o.value);
              this.setState({
                  [event.target.name]: options,
              }, () => this.props.submit(this.state))
          }
    ```
    - 사용자가 선택한 아이템들은 event.target.options 프로퍼티를 통해 접근할 수 있으며, selected 프로퍼티의 값이 true 인 아이템이 선별된다.
    - filter 메서드를 사용해 아이템을 선별하고 map 메서드를 사용해 value 프로퍼티를 가져오는데, 그 결과 선택된 각 option 엘리멘트의 value 속성 값들이 포함된 배열인 options가 만들어진다.

1.2. 라디오 버튼
- 라디오 버튼으로 작업하는 과정은 텍스트 input 엘리먼트의 경우와 비슷하다.
- 코드
    ```jsx
      <div className="form-group">
        <label>Ice Cream Flavors</label>
        {this.flavors.map(flavor=>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flavor"
              value={flavor}
              checked={this.state.flavor === flavor}
              onChange={this.updateFormValue}
            />
            <label className="form-check-label">{flavor}</label>
          </div>
        )}
      </div>
    ```
- __라디오 버튼은 사용자가 목록에서 하나의 값만을 선택할 수 있게 한다.__
- 아이템의 값은 라디오 버튼의 value 프로퍼티에 의해 지정되며, checked 프로퍼티는 엘리먼트가 정확히 선택됐는지를 나타낸다.

1.3. 체크박스
- 체크박스의 작업 방식은 라디오 버튼과 다른데, 모든 대상 엘리먼트의 checked 프로퍼티를 읽어 체크박스의 체크 여부를 확인해야 하기 때문이다.
- 코드 
    ```jsx
      <div className="form-group">
        <div className="form-check">
          <input className="form-check-input"
                 type="checkbox" name="twoScoops"
                 checked={ this.state.twoScoops }
                 onChange={ this.updateFromValueCheck }/>
          <label className="from-check-label">Two Scoops</label>
        </div>
      </div>
    ```
    - __checked 프로퍼티는 화면에서 체크박스에 체크 표시가 돼야 하는지 지정하며, 또한 사용자가 체크박스에 체크를 하거나 해제하는 변경 이벤트를 처리할 때 사용된다.__

1.4. 체크박스를 사용한 배열 채우기
- 체크박스는 사용자가 선택한 아이템으로 배열을 채우는 데 사용될 수 있으며, 이는 복수 선택이 가능한 select 엘리먼트의 경우보다 더 친숙하다.
- 코드
    ```jsx
      updateFromValueCheck = (event) => {
        event.persist();
        this.setState(
          (state) => {
            console.log(state)
            if (event.target.checked) {
              return {toppings : [...state.toppings,event.target.name]}
            } else {
              let index = state.toppings.indexOf(event.target.name);
              return {toppings: state.toppings.filter(index => index !== event.target.name)}
            }
          },
          () => this.props.submit(this.state));
      }
    
      render() {
        return (
          <div className="h5 bg-info text-white p-2">
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.updateFormValue}
              />
            </div>
            <div className="form-group">
              <label>Ice Cream Toppings</label>
              {this.toppings.map((top) => {
                return (
                    <div className="form-check" key={top}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name={top}
                        checked={this.state.toppings.indexOf(top) > -1}
                        onChange={this.updateFromValueCheck}
                    />
                    <label className="form-check-label">{top}</label>
                </div>)
              })}
            </div>
          </div>
        );
      }
    ```
    - updateFormValueCheck 메서드는 이번엔 오직 사용자가 선택한 값들만 포함되도록 toppings 배열의 콘텐츠를 관리한다.
    - 체크박스의 체크가 해제될 때 배열로부터 해당 값을 제거하는 작업과 체크박스에 체크가 될 때 배열에 해당 값을 추가하는 작업엔 표준 자바스크립트의 방식을 사용됐다.
    
1.5 텍스트 영역
- 평범한 HTML 과는 달리 텍스트 영역, 즉 textarea 엘리먼트의 콘텐츠는 value 프로퍼티를 사용해 읽거나 쓸수 있다.


## 2. 폼 데이터 검증
- 데이터 검증은 사용자가 제공한 데이터를 검사해 애플리케이션이 사용할 수 있는 데이터인지 확인하는 과정이다.
```text
폼은 가급적 아껴 사용해야 하며, 예컨데 배송 주소 입력과 같이 사용자가 가치 있게 여기는 작업에만 사용해야 한다.
그 밖의 경우라면 사용자의 작업 흐름을 방해하지 않고 매번 사용자를 짜증 나게 하지 않는 대안을 찾아 데이터를 얻어야 한다.
```
- 폼 검증에 있어 검증의 각기 다른 부분들이 HTML과 컴포넌트의 복잡한 계층도에 분포될수 있다 따라서 각기 다른 부분을 연결하기 위해 prop 스레딩 을 하기보다는 컨텍스트를 사용하는 방법이 낫다.
- 코드
    ```jsx
        import React from 'react';
        
        
        export const ValidationContext = React.createContext({
            getMessagesForField: (field) => []
        })
    
    ```
    - 각 폼 엘리먼트를 위한 검증 이슈들을 배열에 저장한다.
    - 또한 각 이슈에 관한 메시지를 해당 엘리먼트와 나란히 보여줄것이다.
    - 컨텍스트는 특정 필드를 위한 검증 메시지를 리턴하는 함수에 접근할 수 있게 한다.
    
2.1. 검증 규칙 정의
- 코드
    ```jsx
      import React from "react";
      
      export function ValidateData(data, rules) {
          let errors = {};
          Object.keys(data).forEach(field=> {
              if (rules.hasOwnProperty(field)) {
                  let fielderrors = [];
                  let val = data[field];
                  if (rules[field].required && validator.isEmpty(val)) {
                      fielderrors.push("Value required");
                  }
                  if (!validator.isEmpty(data[field])) {
                      if (rules[field].minlength && !validator.isLength(val, rules[field].minlength)) {
                          fielderrors.push(`Enter at least ${rules[field].minlength}` + " characters")
                      }
                      if (rules[field].alpha && !validator.isAlpha(val)) {
                          fielderrors.push("Enter only letters");
                      }
                      if (rules[field].email && !validator.isEmail(val)) {
                          fielderrors.push("Enter a valid email address");
                      }
                  }
                  if (fielderrors.length > 0) {
                      errors[field] = fielderrors;
                  }
              }
          })
          return errors;
      }
    ```
    - ValidateData 함수는 폼 값들을 프로퍼티로 갖는 객체 하나와 값에 적용할 검증 규칙들을 지정하는 객체 하나를 받는다.
    - validator 패키지는 광범위한 검사를 할 수 있는 메서드를 제공한다.
    - validator 패키지가 제공하는 메서드
        ```text
        |     메서드     |   설명
        | isEmpty       | 값이 빈 문자열이면 true를 리턴한다.
        | isLength      | 값이 최소한의 길이를 초과하면 true를 리턴한다.
        | isAlpha       | 값이 알파벳 문자만 포함하면 true를 리턴한다.
        | isEmail       | 값이 올바른 형식의 이메일 주소라면 true를 리턴한다.
        | isEqual       | 두 값이 동일하다면 true를 리턴한다.  
        ```
    
- 코드 
    ```jsx
       import React, {Component, Fragment} from 'react';
       import {ValidationContext} from "./ValidationContext";
       
       
       export class FormValidator extends Component {
       
           constructor(props) {
               super(props);
               this.state = {
                   errors: {},
                   dirty: {},
                   formSubmitted: false,
                   getMessagesForField: this.getMessagesForField
               }
           }
       
           static getDerivedStateFromProps(props, state) {
               return {
                 errors: ValidateData(props.data, props.rules)
               };
           }
       
           get formValid() {
               return Object.keys(this.state.errors).length === 0;
           }
       
           handleChange = (ev) => {
               let name = ev.target.name;
               this.setState(state => state.dirty[name] = true)
           }
       
           handleClick = (ev) => {
               this.setState({ formSubmiited: true }, () => {
                   if (this.formValid) {
                       this.props.submit(this.props.data)
                   }
               })
           }
       
           getButtonClasses() {
               return this.state.formSubmiited && !this.formValid ? "btn-danger" : "btn-primary";
           }
       
           getMessagesForField = (field) => {
               return (this.state.formSubmitted || this.state.dirty[feild]) ? this.state.errors[field] || [] : []
           }
       
           render() {
               return (
                   <Fragment>
                       <ValidationContext.Provider value={this.state}>
                           <div onChange={this.handleChange}>
                               { this.props.children }
                           </div>
                       </ValidationContext.Provider>
       
                       <div>
                           <button className={ `btn ${ this.getButtonClasses() }`}
                                   disabled={ this.state.formSubmitted && !this.formValid }>
                               Submit
                           </button>
                       </div>
                   </Fragment>
               )
           }
       }   
    ```
    - 검증 작업은 getDerivedStateFromProps 라는 생명주기 메서드에서 수행되는데, 이 메서드는 컴포넌트가 받은 prop을 기준으로 상태를 변경할 수 있는 기회를 준다.
    - 컴포넌트는 검증받을 폼 데이터를 포함하는 data prop 와 검증 규칙이 정의된 rules prop 을 받고, 이 둘을 정의했던 ValidateData 함수에 전달한다.
    - ValidateData 함수의 결과는 state.errors 프로퍼티에 할당되는데, 이는 검증 이슈를 갖는 각 폼 필드를 위한 프로퍼티와 사용자에게 보여야 하는 메시지들의 배열을 포함하는 객체다.
    - __폼검증은 사용자가 필드를 편집하거나 폼 제출을 시도하기 전까지는 시작되면 안된다.__
    
    ```jsx
      <div onChange={this.handleChange}>
          { this.props.children }
      </div>
    ```
    - handleChange 메서드는 변경 이벤트의 대상 엘리먼트의 name prop 값을 dirty 상태 객체에 추가한다. (폼 검증에 있어서 사용자가 시작하기 전까지의 엘리먼트를 프리스틴 상태, 편집을 시작한 후를 더티 상태라고 한다.)
    - 컴포넌트는 버튼이 클릭됐을 때 formSubmitted 상태 프로퍼티를 변경하는 핸들러와 함께 button 엘리먼트를 사용자에게 보여준다.
    - 만약 폼이 유효하지 않은 상황에서 버튼이 클릭되면 문제가 해결될 때까지 버튼은 사용이 불가능해지고 색상이 바뀜으로써 데이터가 처리 될수 없음을 보여준다.
    
    ```jsx
        <button className={ `btn ${ this.getButtonClasses() }`}
                disabled={ this.state.formSubmitted && !this.formValid }>
            Submit
        </button>
    ```
    - 만약 검증 결과에 문제가 없다면 handleClick 메서드는 검증된 데이터를 인자로 해서 submit 이라는 함수 prop를 호출한다.

2.2. 검증 메시지 표시
- 코드
    ```jsx
      import React, {Component} from 'react';
      import {ValidationContext} from "./ValidationContext";
      
      
      export class ValidationMessage extends Component {
      
          static contextType = ValidationContext
      
          render() {
              return this.context.getMessagesForField(this.props.field).map(err =>
                  <div className="small bg-danger text-white mt-1 p-1" key={err}>{ err }</div>
              )
          }
      }
    ```
    - 이 컴포넌트는 FormValidator 컴포넌트가 제공한 컨텍스트를 사용해 field prop에서 지정한 이름의 폼 필드를 위한 검증 메시지를 얻는다.
    - 이 컴포넌트는 단지 메시지를 요청하고 보여줄 뿐이다. 보여줄 메시지가 없을 경우엔 콘텐츠를 렌더링 하지 않는다.
    
2.3. 폼 검증 적용
- FormValidator 컴포넌트는 반드시 폼 필드의 조상이여야 하는데, 그래야 버블 단계를 통해 변경 이벤트를 받을 수 있기 때문이다.
- 또한 ValidationMessage 컴포넌트의 조상이기도 해야하는데, 그래야 공유된 컨텍스트를 통해 검증 메시지에 접근 할수 있기 때문이다.

2.4. 그밖의 엘리먼트와 데이터 타입의 검증
- 검증 기능은 input 과 textarea 엘리먼트를 직접 다루지 않는다는 점에 주목하기 바란다.
- 그 대신 상태와 이벤트라는 표준 기능을 이용해 데이터를 리액트의 통제 범위로 가져옴으로써 검증이 가능하며, 또한 컴포넌트가 데이터의 출처를 몰라도 데이터를 다룰 수 있게 한다.

a. 체크박스의 체크 여부
- 우리가 사용하는 validator 패키지는 오직 문자열 값을 대상으로 하므로, 불리언 값에 대한 검증을 요구하면 에러를 보고한다.
- 코드
    ```jsx
       import React, { Component } from "react";
       import {FormValidator} from "./FormValidator";
       import {ValidationMessage} from "./ValidationMessage";
       
       class Editor extends Component {
         constructor(props) {
           super(props);
           this.state = {
             name: "",
             order: "",
             email: "",
             terms: false,
           };
       
           this.rules = {
             name: { required: true, minlength: 3, alpha: true },
             terms: { true: true }
           }
       
         }
       
         updateFormValue = (event) => {
           this.setState(
             {
               [event.target.name]: event.target.value,
             });
         };
       
         updateFormValueCheck = (event) => {
           this.setState({[event.target.name]: event.target.value})
         }
       
         render() {
           console.log("Edit render!!")
           return (
                     <div className="h5 bg-info text-white p-2">
                       <FormValidator data={this.state} rules={this.rules}
                                                 submit={this.props.submit}>
                         <div className="form-group">
                           <label>Name</label>
                           <input
                           className="form-control"
                           name="name"
                           value={this.state.name}
                           onChange={this.updateFormValue}
                           />
                           <ValidationMessage field="name"/>
                         </div>
                         <div className="form-group">
                           <div className="form-check">
                             <input type="checkbox" name="terms"
                             checked={ this.state.terms}
                             onChange={this.updateFormValueCheck}/>
                             <label className="form-ckeck-label">
                               Agree to terms
                             </label>
                           </div>
                           <ValidationMessage field="terms"/>
                         </div>
                       </FormValidator>
                     </div>
           );
         }
       }
       
       export default Editor;
    ```
  
b. 값 일치 여부
- 어떤 값들은 두번 입력을 받아 확인을 해야 하는 경우가 있다.
- 예컨대 계정 생성 시 의 패스워드나 이메일 주소등이 그렇다.

2.5. 폼에 특정적인 검증
- 사용자가 선택한 사항들의 조합이 일괄돼야 하는 경우에는 개별 값만 검증을 수행할 수 없다.
- 이런 종류의 검증은 사용자가 정상 데이터를 입력하고 제출한 다음에야 가능하며, 그 시점에서 애플리케이션은 데이터를 처리하기 전에 최종 검사를 수행해야 한다.
- 개별 필드에 대한 검증은 여러 폼에서도 동일한 코드를 사용할 수있지만, 여러 값의 조합에 대한 검증은 주로 하나의 폼에 특정적인 코드를 사용하게 된다.
- 코드
    ```jsx
      export function ValidateForm(data) {
          let errors = [];
          if (!data.email.endsWith("@example.com")) {
              errors.push("Only example.com users allowed")
          }
          if (!data.email.toLowerCase().startsWith(data.name.toLowerCase())) {
              errors.push("Email address must start with name")
          }
          if (data.name.toLowerCase() === "joe") {
              errors.push("Go away, Joe")
          }
          return errors;
      }
    ```
    - ValidateForm 함수는 폼 데이터를 받아서 이메일 주소가 @example.com 으로 끝나는지, email 값이 name 으로 시작하는지, name 프로퍼티의 값이 joe가 아닌지 확인한다.

- 코드
    ```jsx
        import React, {Component, Fragment} from 'react';
        import {ValidationContext} from "./ValidationContext";
        import {ValidateData} from "./validation";
        
        
        export class FormValidator extends Component {
        
            constructor(props) {
                super(props);
                this.state = {
                    errors: {},
                    dirty: {},
                    formSubmitted: false,
                    getMessagesForField: this.getMessagesForField
                }
            }
        
            static getDerivedStateFromProps(props, state) {
                state.errors = ValidateData(props.data, props.rules)
                if (state.formSubmiited && Object.keys(state.errors).length === 0) {
                    let formErrors = props.validateForm(props.data);
                    if (formErrors > 0) {
                        state.errors.form = formErrors;
                    }
                }
                return state;
            }
        
            get formValid() {
                return Object.keys(this.state.errors).length === 0;
            }
        
            handleChange = (ev) => {
                let name = ev.target.name;
                this.setState(state => state.dirty[name] = true)
            }
        
            handleClick = (ev) => {
                this.setState({ formSubmiited: true }, () => {
                    if (this.formValid) {
                        let formErrors = this.props.validateForm(this.props.data);
                        if (formErrors.length === 0) {
                            this.props.submit(this.props.data)
                        }
                    }
                })
            }
        
            getButtonClasses() {
                return this.state.formSubmiited && !this.formValid ? "btn-danger" : "btn-primary";
            }
        
            getMessagesForField = (field) => {
                return (this.state.formSubmitted || this.state.dirty[field]) ? this.state.errors[field] || [] : []
            }
        
            render() {
                return (
                    <Fragment>
                        <ValidationContext.Provider value={this.state}>
                            <div onChange={this.handleChange}>
                                { this.props.children }
                            </div>
                        </ValidationContext.Provider>
        
                        <div>
                            <button className={ `btn ${ this.getButtonClasses() }`}
                                    onClick={this.handleClick}
                                    disabled={ this.state.formSubmitted && !this.formValid }>
                                Submit
                            </button>
                        </div>
                    </Fragment>
                )
            }
        }
    ```
    - 이 코드는 사용자가 submit 버튼을 누르면 전체 폼에 대한 검증을 시작한다.
    