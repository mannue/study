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
- 
    
