# 5장 SportsStore: 현실적인 애플리케이션

- 전자상 거래 애플리케이션 제작
```text
    SportsStore 
     
    - 고객이 카테고리나 페이지 번호로 상품을 찾아볼 수 있는 온라인 카탈로그
    - 상품을 추가하거나 제거 할 수 있는 쇼핑 카트
    - 배송 정보를 입력하고 주문을 할 수 있는 결제 시스템
    - 제품이나 주문을 관리하기 위한 생성 , 읽기, 갱신, 삭제 , 즉 CRUD 기능을 갖춘 관리 페이지
    - 관리 페이지는 로그인을 한 관리자만 사용할 수 있다.
```

- 추가 설치 package 
```text
|    패키지         |                         설명                                                                 |
| bootstrap        | HTML 콘텐츠를 보여줄 때 사용할 여러 CSS 스타일을 제공                                              |
| fontawesome-free | HTML 콘텐츠에 포함시킬 수 있는 아이콘들을 제공                                                     |
| redux            | 애플리케이션의 각기 다른 부분들이 어울리기 쉽게 해주는 데이터 스토어 라는 기능을 제공                     |
| react-redux      | 리덕스의 데이터 스토어를 리액트 애플리케이션에 통합해 준다.                                           |
| react-router-dom | 브라우저의 현재 URL을 기준으로 사용자에서 보여줄 콘텐츠를 선택 할 수 있는 URL 라우팅이라는 기능을 제공한다. |
| axios            | HTTP 요청을 만들 때 사용되며, RESTful 과 그래프 서비스에 접근할 때도 사용된다.                        |
| graphql          | 그래프 QL 표준 명세의 참조 구현체를 제공                                                          |
| apollo-boost     | 그래프 QL 서비스를 사용하는 클라이언트를 제공한다.                                                  |
| react-apollo     | 그래프 QL 클라이언트를 리액트 애플리케이션에 통합해준다.                                             |              
```

- npm install --save-dev 에서 --save-dev 인자는 개발 기간에만 이들 패키지를 사용하며 배포할 때는 애플리케이션의 일부로 포함시키지 말라는 뜻이다.

- 프로젝트에 필요한 보조 패키지
```text
|    패키지                       |                  설명                             |
| json-server                    | RESTful 웹 서비스를 제공                            |
| jsonwebtoken                   | 사용자 인증 처리에 사용                              |
| express                        | 백엔드 서버의 호스팅을 담당                           |
| express-graphql                | 그래프 QL 서버를 만들 때 사용                         |
| cors                           | 교차 출처 리소스 공유 (CORS) 요청을 가능하게 한다.       |
| faker                          | 테스트를 위한 가짜 데이터를 생성한다.                   |
| chokidar                       | 파일을 모니터링한다.                                 |
| npm-run-all                    | 하나의 명령으로 여러 npm 스크립트를 실행할 때 사용한다.   |
| connect-history-api-fallback   | index.html 파일의 HTTP 요청에 응답한다.              |   
```

- data.js : 웹 서비스를 통해 받을수 있는 데이터 
- server.js : 애플리케이션에 데이터를 포함해 제공할 웹 서비스를 생성 

- 데이터 스토어
    - 데이터 스토어는 사용자에게 보여줄 데이터의 저장소 이며, 페이지네이션(pagination) 같은 애플리케이션의 기능을 편성하기 위해 필요한 데이터를 지원
    - SportsStore의 데이터 스토어는 redux를 사용해 만들것 이다.
    - redux는 리액트 프로젝트에 있어 가장 인기 있는 데이터스토어 이다.
    
- 데이터 스토어 액션과 액션 생성자
    - __액션(action) 이란 데이터 변경을 위해 데이터 스토어로 전달되는 객체를 말한다.__
    - 모든 액션은 타입을 가지며, 액션 객체는 액션 생성자(action creator)를 통해 만들어 진다.
    - 액션 생성자는 데이터 스토어가 데이터를 변경하기 위해 처리하는 액션 객체를 생성한다.
    - __액션 생성자는 변경 유형을 지정하는 type 프로퍼티가 반드시 필요하다.__
    - __액션은 데이터 스토어의 리듀서(reducer) 에 의해 처리된다.__
    - __리듀서란 데이터 스토어의 현재 콘텐츠와 액션 객체를 가져와 변경 작업을 수행하는 함수를 말한다.__
    - 리듀서는 변경사항이 담긴 새 객체를 만들어 리턴해야 한다.
    - 액션 타입이 인식되지 않는다면 변경되지 않은 데이터 스토어 객체를 그대로 리턴해야 한다.
    - 리덕스 패키지는 리듀서를 사용해 새 데이터 스토어를 생성하는 createStore 라는 함수를 제공한다.
    
- 쇼핑 기능 만들기 
    ```text
    |        URL             |              설명                             |  
    | /shop/products         | 카테고리와 관계 없이 모든 상품을 사용자에게 보여준다. |
    | /shop/products/chess   | 특정 카테고리의 상품만을 보여준다.                 |
    ```
    - 애플리케이션이 브라우저 URL에 응답하는 일을 URL 라우팅(URL routing) 이라고 한다.
    
- 상품과 카테고리 컴포넌트 제작 
    - 컴포넌트는 작은 작업을 수행하거나 작은 양의 콘텐츠를 보여주는 역할을 하며, 컴포넌트들이 조합돼 더욱 복잡한 기능을 수행하게 된다.
    - Link를 사용하면 사용자가 링크를 클릭했을때 어떤 HTTP 요청을 보내거나 애플리케이션을 다시 로딩하지 않아도 브라우저에 새 URL로의 이동을 요청할 수 있다.
    - 리덕스 패키지는 connect라는 함수를 제공하는데, 이는 컴포넌트를 데이터 스토어에 연결함으로써 데이터 스토어로부터 값이든 데이터 스토어를 부착하는 함수로부터의 값이든 props를 사용할 수 있게 한다.
    - 카테고리가 선택되면 그에 따라 상품 데이터를 필터링해야 하는데, 이는 리액트 라우터패키지의 기능을 사용해 가능하다.
   
    ```jsx
     <Route path="/shop/products/:category?" render={{(routeProps) => 
    ``` 
    - path prop은 브라우저가 /shop/products로 내비게이션할 때까지 Route를 대기시킨다.
    - 만약 /shop/products/running 등과 같이 URL에 추가된 부분이 있다면 그 부분이 categorㅛ 파라미터에 할당된다.
    - 브라우저가 path와 부합하는 URL로 내비게이션하면 Route는 render prop에 지정된 콘텐츠를 보여주게 된다.
    
    ```jsx
    <Shop { ...this.props } { ...routeProps }
             products={ filterProducts(this.props.products,
                                       routeProps.match.params.category) }/>
    ```
  - 여기가 데이터 스토어와 URL 라우팅 기능이 조합된 지점이다.
  - Shop 컴포넌트는 사용자가 선택한 카테고리가 뭔지 알아야 하는데, 이는 Route 컴포넌트의 render prop에 전달된 인자를 통해 알 수 있다.
  - ...this.props 는 Shop 의 props 에 복사되며, ...routeProps 는 Shop 의 routeProps 에 복사된다.
  
  - Route는 Switch 와 Redirect 라는 리액트 라우터 패키지의 또 다른 두 컴포넌트와 함께 사용된다.
  - Switch 와 Redirect 는 현재 URL이 Route에 의해 일치되지 않는 경우 /shop/products 로 재지향, 즉 리다이렉션 하는 역할을 한다.
  - ShopConnector 컴포넌트는 데이터 스토어로 데이터를 로딩하기 위해 componentDidMount 메서드를 사용
  - componentDidMount 는 리액트의 컴포넌트 생명주기 메서드 중 하나이다.
  
- 카테고리 버튼 개선 
