# SportsStore: REST 와 결제 시스템

작업내용
-
<u>웹 서비스로부터 데이터를 가져와 페이지에 좀 더 많은 양의 데이터를 보여주게 할 것 이며, 결제와 주문 기능도 개발할 것이다.</u>

RESTful 웹 서비스
-
SportsStore 애플리케이션이 보여주고 있는 정적 데이터를 웹 서비스로부터의 데이터로 대처

- 설정 파일 만들기
    - 개발 애플리케이션과 운영 애플리케이션이 사용하는 URL이 다를수 있으므로 하드코딩을 피해야 한다.
    - data/Urls.js 작성
    
- 데이터 소스 생성
    ```jsx
      export class RestDataSource {
      
          GetData = (dataType) => this.SendRequest("get", RestUrls[dataType]);
      
          SendRequest = (method, url) => Axios.request({method, url})
      }
    ```
    - RestDataSource 클래스는 웹 서비스에 대한 HTTP 요청을 만들기 위해 엑시오스라는 패지키를 사용한다.
    - 엑시오스는 안정된 APU를 제공하며 JSON 을 자바스크립트 객체로 자동 변환해주는, HTTP를 다루기 위한 인기 있는 패키지다.
    - GetData 메서드의 결과는 웹 서비스로부터 응답을 수신할 때 이행되는 하나의 Promise 다 
    
- 데이터 스토어 확장
    - 자바스크립트 코드의 HTTP 요청 전송은 비동기식으로 수행된다. 이는 리듀서가 액션을 처리한 다음에 변경사항에 반응하는 리덕스 데이터 스토어의 기본 동작과 잘 맞지 않는다.
    - 리덕스 데이터 스토어는 미들웨어를 통해 비동기 작업을 지원하도록 확장 될수 있다.
    - 미들웨어는 데이터 스토어에 전달될 액션을 미리 조사해 변경할 수 있다.
    - 20장에선 액션을 가로채고, 데이터를 가져오는 비동기 요청이 수행되는 동안 그 액션을 지연시키는 데이터 스토어 미들웨어를 만들어 볼것이다. 
    ```jsx
      const isPromise = (payload) =>
          (typeof(payload) === "object" || typeof(payload) === "function") && typeof(payload.then) === "function";
      
      export const asyncAction = () => (next) => (action) => {
          if (isPromise(action.payload)) {
              action.payload.then(result=> next({...action, payload: result}));
          } else {
              next(action);
          }
      }
    ```
    - 액션의 payload 가 Promise 인지를 판단하는 함수 하나가 있으며, 함수는 payload가 함수나 객체인지, 그렇다면 then 함수를 갖고 있는지 확인한다.
    - asyncAction 함수는 Promise의 이행을 기다리기 위해 then 함수를 호출하는데, 이때 next 함수를 사용해 payload의 값을 result로 대체해 전달한다.
    - next 함수는 데이터 스토어의 정상적인 경로를 거치게 한다.  
    
    ```jsx
      export const SportsStoreDataStore = createStore(CommonReducer(ShopReducer, CartReducer), applyMiddleware(asyncAction));
    ```
    - applyMiddleware 는 미들웨어를 래핑해 액션을 받으며, 그 결과를 데이터 스토어를 생성하는 createStore 함수에 인자로 전달한다.
    - 이는 asyncActions 함수가 데이터 스토어에 전달된 모든 액션을 조사 하고 Promise payload 와 함께 처리할 수 있게 한다.
     
- 액션 생성자 수정
    ```jsx
       import {ActionTypes} from "./Types";
       import {RestDataSource} from "./RestDataSource";
       
       const dataSource = new RestDataSource();
       
       export const loadData = (dataType) => ({
           type: ActionTypes.DATA_LOAD,
           payload: dataSource.GetData(dataType).then(
               response => ({
                   dataType,
                   data: response.data
               })
           ),
       });
    ```
    - loadData 함수가 만든 액션 객체가 데이터 스토어에 전달되면, 정의한 미들웨어가 웹 서비스로부터 응답을 기다렸다가 정상 처리를 위해 액션을 전달할 것이다.
     
- 페이지네이션
    - 대부분의 애플리케이션은 사용자에게 여러 페이지에 걸쳐 보여주는, 즉 페이지네이션을 해야 할 정도로 많은 데이터를 다룬다.
    - faker.js 는 개발과 테스트를 위한 데이터를 쉽게 생성할 수 있는 강력한 도구이며, 상황에 맞는 데이터를 생성 할 수 잇는 API를 제공한다.
    
- 웹 서비스 페이지네이션
    - 페이지네이션은 서버의 지원이 있어야 가능하다.
    - 남아 있는 데이터 서브셋과 그 양에 대한 정보를 요청할 수 았는 수단을 클라이언트에게 제공해야 하기 때문이다.
    - RESTful 웹 서비스를 제공하는 json-server 패키지는 쿼리 문자열을 통해 페이지네이션을 지원한다.
    ```text
      http://10.252.9.228:3500/api/products?category_like=watersports&_page=2&_limit=2&sort=name
      
      |        필드     |  설명 
      | category_like  | 카테고리에 맞는 객체만 결과에 포함시키는 필드다. 카테고리 필드를 생략하면 모든 카데고리의 상품이 결과에 포함된다.  
      | _page          | 페이지 번호를 선택하는 필드다.
      | _limit         | 페이지의 크기, 즉 상품의 개수를 선택하는 필드다.
      | _sort          | 객체의 정렬 방식을 지정하는 필드다.
    ```    
    - X-Total-Count 헤더는 요청된 URL에 부합하는 객체의 총 개수를 제공하므로 전체 페이지 수 계산에 유용하다.
    - Link 헤더는 첫 페이지,이전 페이지, 다음 페이지, 마지막 페이지를 요청 할 수 있는 URL들을 제공한다.
    
- HTTP 요청과 액션 변경
    ```jsx
      import {ActionTypes} from "./Types";
      import {RestDataSource} from "./RestDataSource";
      
      const dataSource = new RestDataSource();
      
      export const loadData = (dataType, params) => ({
          type: ActionTypes.DATA_LOAD,
          payload: dataSource.GetData(dataType, params).then(
              response => ({
                  dataType,
                  data: response.data,
                  total: Number(response.headers["x-total-count"]),
                  params
              })
          ),
      });
    ```
    - 미들웨어에 의해 Promise 가 이행되면 리듀서로 전송된 액션 객체엔 payload.total 과 payload.params 프로퍼티가 포함된다.
    - params는 사용자의 요청에 따라 추가 데이터에 대한 HTTP 요청을 만들 때 사용될것이다.
    ```jsx
    // ShopReducer.js
    import {ActionTypes} from "./Types";
    
    export const ShopReducer = (storeData, action) => {
        switch (action.type) {
            case ActionTypes.DATA_LOAD:
                return {
                    ...storeData,
                    [action.payload.dataType]: action.payload.data,
                    [`${action.payload.dataType}_total`]: action.payload.total,
                    [`${action.payload.dataType}_params`]: action.payload.params
                }
            default:
                return storeData || {};
        }
    };
    ```
    
- 데이터 로딩 컴포넌트 제작
    ```jsx
      import React, {Component, Fragment, PropTypes} from 'react';
      
      const propTypes = {};
      
      export class DataGetter extends Component {
      
          constructor(props) {
              super(props);
          }
      
          static defaultProps = {};
      
          render() {
              return <Fragment>{
                  this.props.children
              }</Fragment>
          }
      
          componentDidUpdate = () => this.getData();
          componentDidMount = () => this.getData();
      
          getData = () => {
              const dsData = this.props.products_params || {};
              const rtData = {
                  _limit: this.props.pageSize || 5,
                  _sort: this.props.sortKey || "name",
                  _page: this.props.match.params.page || 1,
                  category_like: (this.props.match.params.category || "") === "all" ? "" : this.props.match.params.category
              }
      
              if (Object.keys(rtData).find(key => dsData[key] !== rtData[key])) {
                  this.props.loadData(DataTypes.PRODUCTS, rtData);
              }
          }
      }
      
      
      
      DataGetter.propTypes = propTypes;
    ```
    - getData는 URL로부터 파라미터들을 가져와서 데이터 스토어에 마지막으로 저장된 파라미터들과 비교한다.
    - 만약 차이가 있다면 사용자가 요청한 데이터를 로딜할 새 액션이 부착된다.
    - URL로부터 가져온 카테고리와 페이지 번호 외에도 새액션은 _sort 와 _limit 라는 파라미터를 만들어 결과를 정렬하고 데이터의 개수를 설정 할수 있게 한다.
    - 정렬과 데이터 개수 설정에는 데이터 스토어로 부터 가져온 값이 사용된다.