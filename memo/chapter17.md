# 17장 유닛 테스트 
```text
|         패키지            |   설명
|                          |  엔자임은 에어비앤비에서 만든 테스트 패키지로 렌더링된 콘텐츠를 검사하고 
|         enzyme           |   그 props 와 상태를 확인함으로써 컴포넌트를 쉽게 테스트 할수 있게 한다.
|  enzyme-adapter-react-16 | 엔자임을 사용하려면 리액트의 특정 버전을 위한 어댑터가 있어야 한다.  
```

# 1. 간단한 유닛 테스트
- Create React App 으로 만든 픠로젝트에는 유닛 테스트를 실행하고 그 결과를 보고하는 , 제스트 라는 테스트 도구가 포함된다.
- 코드
    ```jsx
      import React from 'react';
      import ReactDOM from 'react-dom';
      import App from './App';
      
      it('renders without crashing', () => {
          const div = document.createElement('div');
          ReactDOM.render(<App/>, div);
          ReactDOM.unmountComponentAtNode(div);
      })
    ```
    - 이는 기초적인 유닛 테스트이며, it 함수를 캡슐화 한다.
    - __함수의 첫번째 인자는 테스트에 대한 설명 , 두 번째 인자는 어떤 작업을 수행하는 함수로서 테스트 자체에 해당한다.__
    - 테스트가 실행된 다음엔 테스트 도구는 감시 모드에 들어간다. 이후 파일이 변경되면 다시 테스트가 실행돼 그 결과를 보여주게 된다.
    
    ```jsx
    function App(props) {
        throw new Error("something went wrong")
    }
    ```
    - render 메서드가 호출되면 에러가 던져질 것이며, 이는 유닛 테스트에서 감시하는 동작이다.
    - __컴포넌트가 던진 에러는 유닛 테스트 안의 it 함수로 버블링돼 테스트 실패로 취급된다.__
    

# 2. 얕은 렌더링(shallow rendering)을 사용한 컴포넌트 테스트
- 얇은 렌더링은 컴포넌트를 자식으로부터 격리해 테스트 할 수 있게 한다.
- __이는 컨텐츠의 상호작용에 의한 영향 없이 컴포넌트의 기본 기능을 테스트 할수 있는 효과적인 기법이다.__
```text
    제스트는 test.js 나 spec.js 로 끝나는 이름의 파일, 또는 __tests__ 라는 이름의 폴더 안에 있는 모든 파일에서 테스트를 식별한다.
```
- 얇은 렌더링을 사용한 테스트
    ```jsx
    import React from "react";
    import Adapter from 'enzyme-adapter-react-16';
    import Enzyme , { shallow }from "enzyme";
    import App from './App'
    import ValueInput from "./ValueInput";
    
    Enzyme.configure({ adapter: new Adapter() });
    it("Renders three ValueInputs", () => {
        const wrapper = shallow(<App />)
        const valCount = wrapper.find(ValueInput).length;
        expect(valCount).toBe(3)
    })
    ```
    - 첫 번째 구문은 엔자임 패키지를 설정하고, 적합한 버전의 리액트에 맞는 엔자임 어댑터를 적용한다.
    ```jsx
      Enzyme.configure({ adapter: new Adapter() });
    ```
    - Enzyme.configure 메서드엔 설정 객체 하나가 전달되며, 거기엔 어댑터 패키지의 콘텐츠가 할당된 adapter 프로퍼티가 포함된다.
    ```jsx
      it("Renders three ValueInputs", () => {})
    ```
    - it 메서드를 사용하기 위해 따로 가져오기를 할 필요가 없는데, it 메서드는 제스트 패키지에 의해 전역으로 정의돼 있기 때문이다.
    - 첫번째 인자로는 이 테스트가 하고자 하는 바의 의미 있는 설명이 들어가야 한다.
    ```jsx
      const wrapper = shallow(<App />)
    ```
    - shallow 함수는 컴포넌트 엘리먼트를 받는다. 컴포넌트는 인스턴스화 된 다음, 그 콘텐츠가 렌더링된다.
    - __그러나 얇은 렌더링에서 자식 컴포넌트가 배재되며, 그 엘리먼트들은 App 컴포넌트의 출력 결과에 그대로 남아 있게 된다.__
    - App 컴포넌트의 props 와 상태 데이터는 콘텐츠 렌더링에 사용되나, 자식 컴포넌트는 처리되지 않는다는 말이다.
    ```text
       <div className="m-2">
            <h5 className="bg-primary text-white text-center p-2">Simple Addition</h5>
            <Result result={0} />
            <ValueInput id="1" changeCallback={[Function]} />
            <ValueInput id="2" changeCallback={[Function]} />
            <ValueInput id="3" changeCallback={[Function]} />
            <div className="text-center">
              <button className="btn btn-primary" onClick={[Function]}>
                Total
              </button>
            </div>
          </div>
    ```
    - 결과물은 테스트를 위해 조사 될수 있는 래퍼 객체가 보여준다.
    - 컴포넌트 콘텐츠 조사를 위한 유용한 엔자임 메서드
    ```text
    |        메서드         |   설명
    |  find(selecotr)      | css 셀렉터에 부합하는, 즉 엘리먼트 타입, 클래스가 일치하는 모든 엘리먼트를 찾는다.
    | findWhere(predicate) | 지정된 서술 함수(predicate) 에 부합하는 모든 엘리먼트를 찾는다.
    | children()           | 현재 엘리먼트의 자식을 포함하는 새 래퍼 객체를 만든다.
    | hasClass(class)      | 현재 엘리먼트가 지정된 클래스에 해당한다면 true 를 리턴한다.
    | text()               | 현재 엘리먼트의 텍스트 콘텐츠를 리턴한다.
    | html()               | 얇은 렌더링이 아닌, 전체 렌더링을 한 컴포넌트 콘텐츠를 리턴한다. 즉 모든 자식 컴포넌트도 처리한다.
    | debug()              | 얇은 렌더링을 한 컴포넌트 콘텐츠를 리턴한다.
    ```
    - 이들 메서드는 컴포넌트가 렌더링한 콘텐츠를 탐색하고 조사하기 위해 사용된다.
    ```jsx
      expect(valCount).toBe(3)
    ```
    - 테스트의 마지막 작업은 예상 결과와 실제 결과를 비교하는일이다. 이는 제스트의 expect 라는 전역 함수를 사용해 가능하다.
    - 테스트 결과는 expect 함수에 전달되며, 그에 대해 toBe 라는 비교자 메서드가 호출된다.
    - 유용한 비교자 메서드
    ```text
    |        메서드           |   설명
    | toBe(value)            | 결과가 지정한 값과 같은지 확인한다. 두 비교 대상이 객체일 필요는 없다.
    | toEqual(object)        | 결과가 지정한 값과 같은지 확인한다. 두 비교 대상이 동일한 객체 유형이어야 한다.
    | toMatch(regexp)        | 결과가 지정한 정규식 에 부합하는지 확인하다.
    | toBeDefined()          | 결과가 정의돼 있는지 확인한다.
    | toBeUndefined()        | 결과가 아직 정의돼 있지 않은지 확인한다.
    | toBeNull()             | 결과가 null 인지 확인한다.
    | toBeTruthy()           | 결과가 참 계열인지 , 즉 true 로 간주 될수 있는지 확인한다.
    | toBeFalsy()            | 결과가 거짓 계열인지, 즉 false 로 간주될 수 있는지 확인한다.
    | toContain(substring)   | 결과가 지정한 문자열을 포함하고 있는지 확인한다.
    | toBeLessThan(value)    | 결과가 지정한 값보다 작은지 확인한다.
    | toBeGreaterThan(value) | 결과가 지정한 값보다 큰지 확인한다.   
    ```
    - 제스트는 어떤 테스트가 실패했는지 추적해, 프로젝트의 모든 테스트 실행이 완료되면 그 결과를 보고 한다.

# 3. 전체 렌더링(full rendering)을 사용한 컴포넌트 
- 전체 렌더링은 모든 자손 컴포넌트를 처리하며, 자손 컴포넌트 엘리먼트는 렌더링된 콘텐츠안에 포함된다.
- 코드 
    ```jsx
      import React from "react";
      import Adapter from 'enzyme-adapter-react-16';
      import Enzyme, {mount, shallow} from "enzyme";
      import App from './App'
      
      Enzyme.configure({ adapter: new Adapter() });
      it("Fully renders three inputs", () => {
          const wrapper = mount(<App title="tester"/>)
          const count = wrapper.find("input.form-control").length
          expect(count).toBe(3);
      })
      
      it("Shallow renders zero inputs",()=>{
          const wrapper = shallow(<App />);
          const count = wrapper.find("input.form-control").length
          expect(count).toBe(0)
      })
    ```
    - 
    
  