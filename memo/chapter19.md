# 19장 리덕스 데이터 스토어
- __데이터 스토어는 애플리케이션 데이터를 리액트 컴포넌트 계층도의 외부로 이동시킨다.__
- 데이터 스토어를 사용한다는 말은 데이터가 최상위 컴포넌트까지 올라가지 않으며, 데이터 접근을 위해 prop 스레딩을 사용할 필요가 없다는 뜻이다.
- 결과적으로 애플리케이션은 더욱 자연스러운 구조를 갖게 되며, 리액트 컴포넌트는 콘텐츠를 렌더링해 사용자에게 보여준다는 본연의 역할에 충실하게 된다.
- __그러나 데이터 스토어는 복잡할 수 있으며, 직관에 어긋나는 절차를 애플리케이션에 도입 할 수 있다.__

```text
|    패키지    |  설명
|   redux     | 리덕스 데이터 스토어 기능을 포함하는 패키지
| react-redux | 리액트에서 리덕스를 사용하기 위한 통합 기능을 포함하는 패키지 
```

## 1. 데이터 스토어 생성
- __리덕스의 두가지 특징__
```text
1. 리덕스에서의 변경 작업은 스토어에 있는 데이터에 직접 적용되지 않는다.
- 리덕스는 페이로드(payload) 를 받아 스토어의 데이터를 갱신하는 함수에 의존한다.
- 이는 리액트 컴포넌트에서 상태 데이터를 갱신 할때 setState 메서드를 사용해야 하는 것과 비슷하다.

2. 혼란의 지점은 용어다.

|      용어     |  설명
| 액션          | 스토어의 데이터를 변경할 작업을 기술한다. 리덕스는 데이터의 직접 변경을 허용하지 않으며 반드시 액션을 사용해야 한다.
| 액션 타입      | 액션은 파라미터를 갖는 평범한 자바스크립트 객체이며, 그 파라미터가 바로 액션 타입이다. 액션 타입은 액션이 올바로 식별되고 처리되게 한다. 
| 액션 생성자    | 액션을 생성하는 함수다. 액션 생성자는 리액트 컴포넌트에 함수 props 로 나타남으로써 액션 생성자 함수의 호출은 곧 데이터 스토어에 변경이 일어 남을 의미한다.
| 리듀서        | 액션을 받아 데이터 스토어에 변경사항을 처리하는 함수다. 데이터 스토어에 적용할 작업은 액션에서 지정하지만, 실제 그 작업을 수행하는 자바스크립트 코드는 리듀서 에 있다.
| 셀렉터        | 컴포넌트가 데이터 스토어로 부터의 데이터에 접근 할 수 있게 한다. 셀렉터는 리액트 컴포넌트에 데이터 props 로 나타난다.
```  
- 데이터 스토어 종류
    - MobX , Relay 등이 있다.

### 1.1 데이터 타입 정의
- 데이터 스토어를 관리하는 코드를 복제해 각기 다른 객체 집합에 동일한 작업을 수행하게 함으로써 데이터 스토어의 생성이 어렵고 이해하기도 어려운 결과를 가져오며, 하나의 데이터 유형을 위한 코드를 복사해 잘못 적용함으로써 에러의 가능성이 포함되기 쉽다.
- 이는 앞으로 __데이터 스토어를 가급적 공통 코드로 통합하면서 해결될 사항이다.__
_ 처음 할일은 데이터 스토어 전반에 존재하는 데이터의 각기 다른 유형을 일관되게 식별하기 위해 상수를 정의하는 것이다.
- 코드 
    ```jsx
      export const PRODUCTS = "products";
      export const SUPPLIERS = "suppliers"
    ```

### 1.2 초기 데이터 정의
-데이터 스토어의 초기 콘텐츠를 정의
- 코드
    ```jsx
      import { PRODUCTS, SUPPLIERS } from "./dataTypes";
      
      export const initialData = {
          [PRODUCTS]: [
              {id: 1, name: "Trail Shoes", category: "Running", price: 100},
              {id: 2, name: "Thermal Hat", category: "Running", price: 12},
              {id: 3, name: "Heated Gloves", category: "Running", price: 82.50}
          ] ,
          [SUPPLIERS]: [
              {id:1 , name: "Zoom Shoes", city: "London", products: [1]},
              {id:2 , name: "Cosy Gear", city: "New York", products: [2, 3]}
          ],
      }
    ```
- 리덕스의 특징 중 하나는 리덕스의 많은 기능을 순수 자바스크립트로 사용 할수 있다는 점이다.

### 1.3 액션 타입 정의
- 스토어 안의 데이터에 수행할 작업을 기술 하는 것, 즉 액션을 만드는 것이다.
- 복잡한 애플리케이션에선 많은 수의 액션들이 존재 할 것이며, 그들을 식별하기 위해 상숫값을 사용하는 방법이 도움이 될것이다.
- 코드
    ```jsx
      export const STORE = "STORE";
      export const UPDATE = "UPDATE";
      export const DELETE = "DELETE";
    ```
    - 예제 애플리케이션에 기능을 부여하기 위해 세 개의 이벤트를 정의 했다.
    
### 1.4 액션 생성자 정의
- 액션은 데이터의 변경 요청을 위해 애플리케이션에서 데이터 스토어로 전달되는 객체다.
- __하나의 액션은 작업을 지정하는 액션 타입과 그 작업에 필요한 데이터를 제공하는 페이로드를 포함한다.__
- 또한 액션은 작업을 기술하기 위해 필요한 프로퍼티들의 조합을 정의할 수 있는 평범한 자바스크립트 객체다.
- 액션은 __액션 생성자__ 에 의해 생성되는데, 액션 생성자란 __애플리케이션으로부터 데이터를 받고 데이터 스토어의 변경사항을 기술한 액션을 리턴하는 함수를 말한다.__
- 코드
    ```jsx
      import {PRODUCTS, SUPPLIERS} from "./dataTypes";
      import {DELETE, STORE, UPDATE} from "./modelActionTypes";
      
      let idCounter = 100;
      
      export const saveProduct = (product) => {
          return createSaveEvent(PRODUCTS, product)
      }
      
      export const saveSuppliers = (supplier) => {
          return createSaveEvent(SUPPLIERS, supplier)
      }
      
      const createSaveEvent = (dateType, payload) => {
          if (!payload.id) {
              return {
                  type: STORE,
                  dataType: dateType,
                  payload: { ...payload, id: idCounter++ }
              }
          } else {
              return {
                  type: UPDATE,
                  dataType: dateType,
                  payload: payload
              }
          }
      }
      
      export const deleteProduct = (product) => ({
          type: DELETE,
          dataType: PRODUCTS,
          payload: product.id
      })
      
      export const deleteSupplier = (supplier) => ({
          type: DELETE,
          dataType: SUPPLIERS,
          payload: supplier.id,
      })
    ```
    - 여기선 모두 네개의 액션 생성자를 정의했다.
    
### 1.5 리듀서 정의
- __리듀서는 액션을 데이터 스토어에 적용하는 자바스크립트 함수다.__
- 코드
    ```jsx
      import {DELETE, STORE, UPDATE} from "./modelActionTypes";
      import {initialData} from "./initialDate";
      
      export default function (storeData, action) {
          switch (action.type) {
              case STORE:
                  return {
                      ...storeData,
                      [action.dataType]: storeData[action.dataType].concat([action.payload])
                  }
              case UPDATE:
                  return {
                      ...storeData,
                      [action.dataType]: storeData[action.dataType].map(p=> p.id === action.payload.id ? action.payload: p)
                  }
              case DELETE:
                  return {
                      ...storeData,
                      [action.dataType]: storeData[action.dataType].filter(p=> p.id !== action.payload.id)
                  }
              default:
                  return storeData || initialData
          }
      }
    ```
    - 리듀서는 데이터 스토어로부터 현재의 데이터를 받의며, 또한 액션을 파라미터로 받는다.
    - 액션을 확인해 데이터 스토어의 기존 데이터를 대체할 새로운 데이터 객체를 만든다.
    - 지켜야 할 규칙!!!!
        - __리듀서는 반드시 새로운 객체를 만들어야 하며, 파라미터로 받은 객체를 리턴하면 안된다.__
            - 이유: 그 객체의 어떤 변경 사항이라도 리덕스가 무시할 것이기 때문이다.
        -__스토어 안의 데이터는 리듀서가 만든 객체로 대체되므로 액션에 의해 변경된 프로퍼티뿐만 아니라 다른 기존 프로퍼티도 복사해야 된다__

- 만약 리듀서 함수가 undefined 를 리턴하면 리덕스는 에러를 발생시킬 것이다.
 
        
    