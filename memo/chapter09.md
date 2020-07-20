# 9장 리액트 주무르기
리액트 프로젝트의 구조
-
- 새프로젝트가 생성되면 리액트 애플리케이션의 기본 파일, 임시 콘텐츠, 개발 도구 일체가 포함된 상태에서 시작 할 수 있다.
- 프로젝트 폴더 안에 있는 폴더와 파일을 설명
```text
|       이름         |   설명
| node_module       | 애플리케이션과 개발 도구가 필요로 하는 패키지들이 위치하는 폴더
| public            | 정적 콘텐츠가 위치하는 폴더로서 HTTP 요청에 응답할 때 사용되는 index.html 파일을 포함
| src               | 애플리케이션 코드 와 콘텐츠가 위치하는 폴더
| package.json      | 프로젝트를 위한 최상위 의존성의 목록을 포함하는 파일
| package-lock.json | 프로젝트를 위한 의존성의 전체 목록을 포함하는 파일 
```
1. 소스 코드 폴더
    - src는 프로젝트 안에서 가장 중요한 폴더다.
    - 애플리케이션의 코드와 콘텐츠 파일이 위치하며, 해당 프로젝트의 기능이 구현되는 장소
    ```text
    |         파일        |  설명 
    | index.js           | 애플리케이션 구성과 실행을 책임진다.
    | index.css          | 애플리케이션을 위한 전역 CSS 스타일을 포함 
    | App.js             | 최상위 리액트 컴포넌트를 포함한다.
    | App.css            | 새 프로젝트를 위한 임시 CSS 스타일을 포함 한다.
    | App.test.js        | 최상위 컴포넌트에 대한 유닛 테스트를 포함 한다. 
    | serviceWorker.js   | 오프라인에서 작동하는 프로그레시브 웹 앱에 사용된다.  
    ```
2. 패키지 폴더 
    - 패키지들 사이엔 수작업으로 관리하기엔 너무 어려운, 복잡한 계층도를 갖는 의존성들이 존재한다.
    - NPM 이나 Yarn 이른바 패키지 관리자라고 하는 소프트웨어를 사용한다.
    - 프로젝트가 생성될 때 패키지 관리자는 리액트 개발에 필요한 패키지의 초기 목록을 받고, 각 패키지가 의존하는 패키지들을 조사한다.
    - 그 패키지들이 의존하는 또 다른 패키지들을 조사하는데, 이 과정은 패키지 목록이 최종적으로 완성될 때까지 반복된다.
    - 패키지 목록이 완성되면 패키지 관리자는 해당 패키지들을 모두 다운로드하고 node_module 폴더에 설치한다.
    - 초기 패키지 목록은 dependencies 와 devDependencies 라는 프로퍼티를 사용해 package.json 파일에 정의 
    - 애플리케이션의 실행에 필요한 패키지들은 __dependencies 절에 나열하며__, 개발할 때는 필요하나 배포할 때는 포함시키지 않을 패키지 들은 devDependencies 절에 나열한다.
    ```json
    { 
         "dependencies": {
           "bootstrap": "^4.5.0",
           "react": "^16.13.1",
           "react-dom": "^16.13.1",
           "react-scripts": "3.4.1"
         }
    }  
    ```
    - 리액트의 주된 기능을 포함하는 react 패키지
    - 웹 어플리케이션에 필요한 기능을 포함하는 react-dom 패키지
    - 개발 도구의 명령 등을 포함하는 react-scripts 패키지
    
    - 패키지의 버전 번호 체계
    ````text
    |     형식            |   설명
    | 16.7.0             | 정확히 일치하는 버전의 패키지만 수용
    | *                  | 별표를 사용하면 어떤 버전 번호라도 수용
    | ~16.7.0            | 패치 레벨 번호(세번째 숫자)가 일치하지 않아도 해당 버전을 수용한다는 뜻이다.
    | ^16.7.0            | 마이너 버전 번호나 패치 레벨 번호가 일치하지 않아도 해당 버전을 수용한다는 뜻이다.  
    ````
   
   - package.json 파일에서 script 절
    ```json
    {
         "scripts": {
           "start": "react-scripts start",
           "build": "react-scripts build",
           "test": "react-scripts test",
           "eject": "react-scripts eject" 
         }
    }
    ```
    - eject : 모든 도구를 위한 설정 파일을 프로젝트 폴더로 복사한다.
    

리액트 개발 도구
- 
- 프로젝트에 추가된 리액트 개발 도구는 src 폴더 안의 변경을 자동으로 감지해 애플리케이션을 컴파일 하고 브라우저가 사용할 파일들을 패키징 한다.
- 웹팩 : 자바스크립트 모듈을 브라우저가 사용할 수 있게 패키징하는 모듈 번들러 다.
- 웹팩은 먼저 index.js 파일부터 시작하는데, 의존성 집합을 만들기 위한 import 구문들이 있는 모든 모듈을 로딩한다.
- 이 과정은 index.js 가 의존하는 각 모듈마다 반복되며, 전체 애플리케이션의 의존성 파일들이 모두 완성될때 까지 계속된다. 그 다음에 그 파일들을 이른바 번들 이라고 하는 하나의 파일로 통합된다.

1. 컴파일과 변환 과정의 이해 
    - 빌드 과정은 웹팩이 수행하며, 핵심 단계 중 하나인 코드 변환은 바벨 이라는 패키지가 수행한다.
    - 바벨의 두 가지 중요한 임무 
        - JSX 콘텐츠를 변환하는 작업
        - 구식 브라우저에서도 최신의 자바스크립트 기능이 실행 될수 있게 자바스크립트 코드를 변환하는 작업
    - JSX 변환
        - JSX는 HTML 과 자바스크립트를 혼합할 수 있게 하는, 자바스크립트의 상위 집합이다.
        - JSX는 HTML 표준 전체를 지원하지는 않는다.
        - JSX 안의 모든 HTML 엘리먼트는 React.createElement 메서드를 호출하는 코드로 변환
        ```jsx
          export default class App extends Component {
              render = () =>
                  <h4 className="bg-primary text-white text-center p-3">
                    This is an HTML element
                  </h4>
          }
          // 동일한 코드 
          export default class App extends Component {
              render = () => React.createElement("h4",
                  { className: "bg-primary text-white text-center p-3"},
                  "This is an HTML element"
                  )
          }
        ```
        - 변환 과정에서 h4 엘리먼트는 React.createElement 메서드를 호출하는 코드로 바뀌며, 그 결과 브라우저가 JSX를 알아야 할 필요가 없이 완전한 자바스크립트 코드가 만들어 진다.
        - JSX 변환은 빌드 과정에서 한 번만 수행되며 JSX는 리액트의 기능을 쉽게 사용하는 것이 목적이다.
        
2. 개발 HTTP 서버
    - 개발 과정을 쉽게 만들기 위해 이 프로젝트에선 웹팩에 통합되는 HTTP 서버인 webpack-dev-server 패키지를 추가했다.
    - 이 개발 HTTP 서버는 번들을 만드는 작업이 끝나면 즉시 3000번 포트를 통해 HTTP 요청을 리스닝하도록 설정돼 있다.
    - 이 서버는 HTTP 요청을 받으면 public/index.html 파일의 콘텐츠를 리턴한다.

3. 정적 콘텐츠
    - 이미지나 CSS 스타일시트 같은 정적 콘텐츠를 리액트 애플리케이션에 포함시키는 가장 좋은 방법은 필요한 파일을 src 폴더에 추가하고 코드 안에서 import구문을 사용해 그 파일로의 의존성을 선언하는 것이다.
    - import 키워드를 사용해 정적 콘텐츠로의 의존성을 선언하면 콘텐츠를 어떻게 다를지에 대한 결정은 개발 도구가 하게 된다.
    - 10Kb 보다 작은 파일의 경우 그 콘텐츠는 HTML 문서에 콘텐츠를 추가하는 자바스크립트 코드와 함께 bundle.js 파일에 포함될것 이다.
    - SVG 파일과 같은 큰 파일은 별도의 HTTP 요청으로 처리된다.
    ```html
       <img src="/static/media/logo.5d5d9eef.svg" alt="reactLogo">
    ```
   
4. 린터의 이해
    - 린터는 프로젝트의 코드와 콘텐츠가 일련의 규칙들을 지키는지 확인하는 책임을 진다.
    - 린터 자체는 작동이 중단 되거나 다시 설정될 수 없다.
    - 린터 자체의 작동을 멈추게 할 수는 없지만 코드에 주석을 추가함으로써 경고 메시지가 나타나지 않게 할 수는 있다.
    ```jsx
    // eslint-disable-next-line no-unused-vars
    let error = "not a valid statement";
    ```
   - 만약 그다름 라인부터 모든 규칙에 대한 경고를 숨시고 싶다면 주석에 규칙 이름을 생략하면 된다.
   ```jsx
    // eslint-disable-next-line
    let error = "not a valid statement";
   ```
   - 파일 전체에서 하나의 규칙에 대한 경고를 숨기고 싶다면 파일의 첫부분에 주석을 추가 하면 된다.
   ```jsx
   /* eslint-disable no-unused-vars */
   import React, {Component} from 'react';
   import "./App.css";
   import reactLogo from "./logo.svg";
   ```
   - 파일 전체에서 모든 규칙에 대한 경고를 숨기고 싶다면 주석에서 규칙 이름을 생략하면 된다.

5. 개발 도구
    ```text
    |     옵션             |    설명
    | BROWSER             | 개발 도구가 초기 빌드 작업을 완료한 후 실행할 브라우저를 지정할 때 사용
    | HOST                | 개발 HTTP 서버가 바인딩할 호스트명을 지정할 때 사용
    | POST                | 개발 HTTP 서버가 사용할 포트를 지정할 때 사용
    | HTTPS               | 이 옵션에 true 를 지정하면 자체 서명 인증서를 생성하고 개발 HTTP 서버에 SSL이 적용
    | PUBLIC_URL          | public 폴더로부터 가져올 콘텐츠의 URL을 변경할때 사용
    | CI                  | 이 옵션에 true 를 지정하면 빌드 과정에서의 모든 경고를 에러로 취급
    | REACT_EDITOR        | 브라우저에서 스택 추척 부분을 클릭하면 열릴 코드 에디터를 지정 할때 사용
    | CHOKIDAR_USEPOLLING | 개발 도구가 src 폴더 안의 변화를 감지하지 못할 때 이 옵션에 true 를 지정해야 한다. 이는 가상 머신이나 컨테이너에서 작업할때 발생할수 있는 상황이다.
    | GENERATE_SOURCEMAP  | 이 옵션에 false를 지정하면 소스 맵이 생성되지 않는다. 소스 맵은 디버깅과정에서 브라우저가 번들된 자바스크립트 코드와 해당 소스 파일을 연관시킬때 사용된다.
    | NODE_PATH           | Node.js 모듈을 찾기 위한 위치를 지정할 때 사용
    ```
   - .env 파일을 만들어 설정할 수 있다. 
   
   - 브라우저 디버거 사용하기
        - 애플리케이션의 제어권을 디버거에 넘기는 가장 좋은 방법은 자바스크립트 debugger 키워드를 사용하는 것이다.
        ```jsx
            changeCity = () => {
                debugger
                this.setState({
                    city: this.state.city === "London" ? "New York" : "London",
                })
            };
        ```