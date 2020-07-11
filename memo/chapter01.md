# chapter 01
- 프로젝트 구조
   ```
  public/index.html
  - 브라우저가 로딩하는 HTML 파일이며, 화면에 보여줄 엘리먼트 뿐 아니라 자바스크립트 파일을 로딩하기 위한 엘리먼트도 포함
  
  src/index.js
  - react application 의 설정과 구동에 관여하는 JS 파일
  
  src/App.js
  - 사용자에게 보여줄 HTML 콘텐츠뿐 아니라 HTML이 필요로 하는 자바스크립트를 포함하는 리액트 컴포넌
   ``` 
- 임시 콘텐츠 대체
    - App.js 파일엔 App 이라고 하는 리액트 컴포넌트가 포함돼 있으며, 컴포넌트는 리액프 애플리케이션의 핵심 구성 요소이며 JSX로 작성된다.
    - JSX는 특별한 조치 없이도 자바스크립트 코드 안에 HTML을 포함시킬 수 있는 자바스크립트의 상위 집합
    - App.js 파일을 저장하면 리액트 개발 도구는 변경사항을 자동으로 감지해 애플리케이션을 다시 빌드 한다.
    - 리액트 개발에 사용되는 JSX 파일은 HTML과 자바스크립트를 손쉽게 결합해준다.
    - 표준 HTML 파일과는 다른, 약간의 중요한 차이가 있다.
        ```jsx
        <h4 className="bg-primary text-white text-center p-2">
          To Do List
        </h4>
        표준 HTML에서 class 속성은 엘리먼트를 클래스에 할당할 때 사용
        JSX 파일도 일종의 자바스크립트 파일이며, 자바스크립트는 className이라는 property로 클래스를 설정!!!
        ```
- 동적 콘텐츠
    - 리액트는 표현식을 지원함으로써 동적 컨텐츠 작업을 쉽게 해준다.
    - 표현식은 자바스크립트의 일부로서 컴포넌트의 render 메서드가 호출될때 평가되며, 사용자에게 데이터를 보여줄 수 있는 수단을 제공
    - 리액트 컴포넌트엔 state 라는 특별한 프로퍼티가 있다.
        ```jsx
        this.state = {
          userName: "Adam"
        }   
        ```
        - this 키워드는 현재 객체를 참조하며, 현재 객체의 프로퍼티나 메서드에 접근할때 사용
        ```jsx
        <h4 className="bg-primary text-white text-center p-2">
          { this.state.username }'s To Do List
        </h4>
        ```   
        - 표현식은 render 메서드가 호출될때 평가되며, 그 결과가 컨텐츠에 포함돼 사용자에게 보인다.

- 상태 데이터 의 변경
    - 리액트 애플리케이션의 동적인 특성은 상태 데이터의 변경에 기인한다.
    - 상태 데이터의 변경이란 컴포넌트의 render 메서드가 다시 호출됨에 따라 새로운 상태 데이터 값을 사용해 표현식도 다시 평가됨을 뜻한다.
    - button 엘리먼트의 onClick 속성
        ```jsx
            <button className="btn btn-primary m-2" onClick={this.changeStateData}>Change</button>
        ```
        - 버튼 클릭은 이벤트를 촉발하며, onClic은 이벤트 처리 메서드(이벤트 핸들러 event handler)의 한 예
        ```jsx
          changeStateData = () => {
            this.setState({
              userName: this.state.userName === "Adam" ? "Bob" : "Adam"
            })
          };
        ```
        - setState 메서드가 호출되면 리액트는 컴포넌트의 상태 데이터를 새 값을 갱신하고, 그 다음에 render 메서드를 호출한다.
    - arrow function 문법을 사용할 때는 return 키워드를 사용하지 않아도 되며, 함수 내용을 둘러싸는 중괄호도 생략 할수 있다.
    
- 할 일 목록 애플리케이션에 기능 추가
    ```jsx
    <h4 className="bg-primary text-white text-center p-2">
        {this.state.userName}'s To Do List (
        {this.state.todoItems.filter((t) => !t.done).length} items to do)
    </h4>
    ```
    - 이 표현식은 todoItems 라는 상태 데이터의 배열로부터 객체를 걸러낸다.
    - 아직 완료 되지 않은 할 일들만 선택해 그 length 프로퍼티의 값을 읽음으로써, 남아있는 할 일의 수를 사용자에게 보여 줄 수 있게 한다.
    ```jsx
    <input
        className="form-control"
        value={this.state.nextItemText}
        onChange={this.updateNewTextValue}
    />
    ```
    - value 속성은 input 엘리먼트의 콘텐츠를 지정하기 위해 사용하며, 위 경우 value 속성에 지정된 표현식은 newItemText 라는 상태 데이터 프로퍼티의 값을  리턴
    - 상태 데이터 프로퍼티의 값이 변경되면 input 엘리먼트의 콘텐츠도 갱신된다는 뜻
    - onChange 속성은 change 이벤트가 발생 할때 리액트가 해야 할 일을 알려주는데, change 이벤트는 사용자가 input 엘리먼트에 뭔가를 입력하면 발생
    - button 엘리먼트에서 onClick 속성을 사용해 click 이벤트에 대한 응답으로 createNewTodo 메서드를 호출
    ```jsx
    this.setState({
        todoItems: [...todoItems, { action: nextItemText, done: false }],
        nextItemText: "",
    });
    ```
    - 배열에 새 아이템을 추구하는 구문에선 자바스크립트 언어에 최근에 추가된 스프레드 연산자(spread operator)를 사용
    - 리액트 개발도구는 최신의 자바스크립트 기능을 허용하며 예전 브라우저에서도 동작할 수 있는 호환코드로 변환
    
- 할 일 목록 보여주기
    - JSX는 HTML 과 자바스크립트의 자유로운 혼합을 허용하며, 자바스크립트 메서드에서 HTML 콘텐츠를 리턴하는 일도 가능하다.
    ```jsx
        todoTableRows = () =>
            this.state.todoItems.map((item) => (
                <tr key={item.action}>
                    <td>{item.action}</td>
                    <td>
                    <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => this.toggleTodo(item)}
                    />
                    </td>
                </tr>
            ));
  
        - 배열안의 각 아이템은 테이블의 행, 즉 테이블 로우(table row) 를 의미하는 HTML 엘리먼트인 tr에 매핑된다.
        - tr 엘리먼트 안엔 테이블 셀(table cell)을 의미하는 td 엘리먼트들이 있다.
    ```
    - 리액트는 콘텐츠에 약간의 제약을 두기도 하는데, todoTableRows 메서드에서 tr 엘리먼트에 key 속성을 추가한 것이 그 때문이다.
    ```jsx
    <tr key={item.action}>
    ```
    - 리액트는 어떤 변경이 발생하면 컴포넌트의 render 메서드를 호출해, 현재 브라우저에서 보여준 결과와 비교해 바뀐 부분만 반영되게 한다.
    - 현재 콘텐츠와 새로운 데이터를 상호 연관시켜 효율적인 변경 관리를 하기 위해 필요한 것이 key 속성 이다.

-  컴포넌트 추가
    - 위임을 받은 컴포넌트를 자식 컴포넌트 라고 하며, 기능을 위임한 컴포넌트를 부모 컴포넌트 하고 한다.
    - 자식 컴포넌트가 __props를 통해 받은 데이터는 읽기 전용__ 이며 변경될 수 없다.
    - 자식 컴포넌트가 데이터를 변경하게 하려면 부모 컴포넌트가 이른바 함수 props 라는 방법으로, 중요한 일이 생겼을 때 호출할 수 있게 __콜백 함수__를 제공
    - __데이터 props는 부모가 자식에게 데이터를 제공하는 방법이며, 함수 props는 자식이 부모와 소통할 수 있는 방법__
    
- 완료된 할 일의 시각적 처리
    ```jsx
      this.state.showCompleted && (
              <table className="table table-striped table-bordered">
    ```
    - 이 표현식이 평가되면 showCompleted 프로퍼티가 오직 true 인 경우에만 table 엘리먼트가 컴포넌트의 콘텐츠에 포함

- 데이터의 지속 저장 
    ```text
    로컬 스토리지 API 는 리액트만을 위한 특정 기능이 아닌, 브라우저의 표준 기능이다.
    ``` 