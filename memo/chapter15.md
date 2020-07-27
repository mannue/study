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



    
