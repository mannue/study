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

### 1.6 데이터 스토어 생성 
- __리덕스는 데이터 스토어를 생성하고 사용될 준비를 해주는 createStore 라는 함수를 제공한다.__
```text
<Tip>
파일 이름을 반드시 index.js 로 할 필요는 없다. 그러나 이렇게 하면 파일 이름 없이 폴더 이름만으로 
데이터 스토어를 가져 올수 있다는 장점이 있다. 
```
- 코드
    ```jsx
      import { createStore } from "redux";
      import modelReducer from "./modelReducer";
      
      export default createStore(modelReducer);
      
      export { saveProduct, saveSuppliers, deleteProduct, deleteSupplier } from "./modelActionCreators"
    ```
    - index.js 파일에서 기본 내보내기를 사용하면 리듀서 함수를 인자로 받는 createStore 를 호출하는 결과가 된다.
    - 또한 액션 생성자들도 내보내기를 함으로써 하나의 import 구문으로도 애플리케이션의 어디에서든 데이터 스토어의 기능에 접근할 수 있게 했다.

     
## 2. 데이터 스토어 사용
- 아직은 앞선 만든 액션, 액션 생성자, 리듀서를 애플리케이션에 통합하지 않았으며, 애플리케이션 컴포넌트와 데이터 스토어 사이의 어떤 연결도 없는 상태다.

### 2.1 최상위 컴포넌트에 데이터 스토어 적용
- 리액트 리덕스 패키지엔 데이터 스토어에 접근하게 하는 리액트 컨테이너 컴포넌트가 포함돼 있다.
- __Provider 라고 하는 이 컴포넌트를 컴포넌트 계층도의 최상위에 적용하면 애플리케이션 전체에서 데이터 스토어를 사용할 수 있게 된다.__
- 코드
    ```jsx
      import React from "react";
      import {ProductsAndSuppliers} from "./ProductsAndSuppliers";
      import {Provider} from "react-redux";
      import dataStore from "./store";
      
      function App() {
        return(
            <Provider store={dataStore}>
              <ProductsAndSuppliers />    
            </Provider>
        )
      }
      
      export default App;
    ```
    - Provider 컴포넌트엔 데이터 스토어를 지정하는 store 라는 prop 이 있으며, 여기에 import 구문에서 명명한 dataStore 를 할당했다.

### 2.2 상품 데이터 연결
- 다음 단계는 데이터를 필요로 하는 컴포넌트에 데이터 스토어 그리고 그에 대한 작업하는 액션 생성자를 연결하는 것이다.
- 우선 데이터 스토어를 받고 컴포넌트와 스토어를 연결해줄 props 를 선택하는 함수를 정의했다.
    ```jsx
     const mapStateToProps = (storeData) => ({
       products: storeData.products
     })
    ```
    - mapStateToProps 라는 관례적인 이름의 이 함수는 컴포넌트의 prop 이름과 스토어의 데이터를 매핑하는 객체 하나를 리턴한다.
    - __이와 같은 매핑 함수를 셀렉터(selector) 라고 한다.__
    - 컴포넌트 prop 에 매핑될 데이터를 선택 하기 때문에 붙여진 이름이다.
    - 이 코드에선 셀렉터가 스토어의 products 배열을 컴포넌트의 product prop 에 매핑하고 있다.

- 컴포넌트에 필요한 함수 prop 을 데이터 스토어의 액션 생성자에 매핑했다.
    ```jsx
    const mapDispatchToProps = {
      saveCallback: saveProduct,
      deleteCallback: deleteProduct,
    }
    ```
    - 리액트 리덕스 패키지는 액션 생성자를 함수 prop 에 연결하는 여러 방법을 지원한다.
    - 컴포넌트가 데이터 스토어에 연결되면 리듀서가 자동으로 호출될 수 있도록 액션 생성자도 연결된다.
    - 이 코드에선 saveProduct 와 deleteProduct 액션 생성자를 saveCallback 과 deleteCallback 이라는 이름의 함수를 prop 에 매핑했다.

- 일단 데이터와 함수 prop 을 위한 매핑이 정의되면, 그 다음엔 리액트 리덕스 패키지가 제공하는 connect 함수에 전달된다.
    ```jsx
    const connectFunction = connect(mapStateToProps, mapDispatchToProps);
    ```
    - __connect 함수는 부모 컴포넌트가 제공한 props 가 병합된 데이터 스토어에 연결된 props 를 전달하는 HOC 를 생성한다.__

- 마지막 으로 connect 가 리턴한 함수에 컴포넌트를 전달했다.
    ```text
    export const ProductDisplay = connectFunction{
    ```
- 데이터 스토어가 제공하는 props 가 부모 컴포넌트로 부터의 props 를 대체했으므로, ProductDisplay 컴포넌트는 상품 생성, 편집, 삭제 등의 모든 작업을 데이터 스토어의 데이터에 하게 됐다.

### 2.3 공급업체 데이터 연결
- 데이터 스토어를 사용하면서 상품 데이터와 공급업체 데이터를 제공하고 관리하던 ProductAndSuppliers 컴포넌트는 불필요해졌다.
```jsx
    import React from "react";
    import {ProductsAndSuppliers} from "./ProductsAndSuppliers";
    import {Provider} from "react-redux";
    import dataStore from "./store";
    import {ProductDisplay} from "./ProductDisplay";
    import {Selector} from "./Selector";
    import {SupplierDisplay} from "./SupplierDisplay";
    
    function App() {
      return(
          <Provider store={dataStore}>
              <Selector>
                  <ProductDisplay name="Products"/>
                  <SupplierDisplay name="Suppliers"/>
              </Selector>
          </Provider>
      )
    }
    
    export default App;
```
- 여기선 ProductDisplay 와 SupplierDisplay 컴포넌트가 데이터와 메서드에 접근할 수 있게 했던 props 를 제공하지 않았다는 점에 주목하기 바란다.
- 이는 컴포넌트를 데이터 스토어에 연결하는 connect 메서드가 담당하기 때문이다.


## 3. 데이터 스토어 확장
- 데이터 스토어는 사용자에게 보여주는 데이터만을 위한 것이 아니다.
- 데이터 스토어는 컴포넌트들을 조합하고 관리할 때 사용되는 상태 데이터도 저장 할수 있다.
- 상태 데이터를 포함하게 데이터 스토어를 확장하면 컴포넌트가 상태 데이터에 직접 연결 할 수 있게 된다.

### 3.1 스토어에 상태 데이터 추가
- 우리의 목적은 ProductDisplay 와 SupplierDisplay 컴포넌트 안의 상태 데이터와 로직을 데이터 스토어로 옮기는 것이다.
```jsx
    import { PRODUCTS, SUPPLIERS } from "./dataTypes";
    
    export const initialData = {
        modelData: {
            [PRODUCTS]: [
                {id: 1, name: "Trail Shoes", category: "Running", price: 100},
                {id: 2, name: "Thermal Hat", category: "Running", price: 12},
                {id: 3, name: "Heated Gloves", category: "Running", price: 82.50}
            ] ,
            [SUPPLIERS]: [
                {id:1 , name: "Zoom Shoes", city: "London", products: [1]},
                {id:2 , name: "Cosy Gear", city: "New York", products: [2, 3]}
            ],
        },
        stateDate: {
            editing: false,
            selectedId: -1,
            selectedType: PRODUCTS
        }
    }
```

### 3.2 액션 타입과 액션 생성자 정의 
```jsx
    import {PRODUCTS, SUPPLIERS} from "./dataTypes";
    
    export const  STATE_START_EDITING   = "state_start_editing";
    export const  STATE_END_EDITING     = "state_end_editing";
    export const  STATE_START_CREATING  = "state_start_creating";
    
    export const startEditingProduct = (product) => ({
        type: STATE_START_EDITING,
        dateType: PRODUCTS,
        payload: product
    });
    
    export const startEditingSupplier = (supplier) => ({
        type: STATE_START_EDITING,
        dateType: SUPPLIERS,
        payload: supplier
    });
    
    export const endEditingProduct = () => ({
        type: STATE_END_EDITING
    })
    
    export const startCreatingProduct = () => ({
        type: STATE_START_CREATING,
        dateType: PRODUCTS
    })
    
    export const startCreatingSupplier = () => ({
        type: STATE_START_CREATING,
        dateType: SUPPLIERS
    })
```
- 이 액션 생성자들은 ProductDisplay 와 SupplierDisplay 컴포넌트가 정의했던 메서드들에 대응하며, 사용자가 객체를 편집, 취소, 생성 할 수 있게 한다.

### 3.3 리듀서 정의 
```jsx
    import {STATE_END_EDITING, STATE_START_CREATING, STATE_START_EDITING} from "./stateActions";
    import {initialData} from "./initialDate";
    
    export default function (storeData, action) {
        switch (action.type) {
            case STATE_START_EDITING:
            case STATE_START_CREATING:
                return {
                    ...storeData,
                    editing: true,
                    selectedId: action.type === STATE_START_EDITING ? action.payload.id : -1,
                    selectedType: action.dataType
                }
            case STATE_END_EDITING:
                return {
                    ...storeData,
                    editing: false
                }
            default:
                return storeData || initialData.stateDate
        }
    }
```
- 상태 데이터를 위한 리듀서는 사용자가 편집하거나 생성하는 대상을 추적하는데 이는 기존의 컴포넌트에서 했던 접근법과 같다.

### 3.4 스토어에 상태 데이터 기능 통합
- __리덕스는 데이터 스토어의 각 섹션을 담당하는 리듀서들을 조합해 사용할 수 있게 하는 combineReducers 라는 함수를 제공한다.__
```jsx
    import {combineReducers, createStore} from "redux";
    import modelReducer from "./modelReducer";
    import stateReducer from "./stateReducer";
    
    export default createStore(combineReducers(
        {
            modelData: modelReducer,
            stateDate: stateReducer
        }
    ));
    
    export { saveProduct, saveSuppliers, deleteProduct, deleteSupplier } from "./modelActionCreators"
```
- combineReducers 함수의 인자는 데이터 스토어의 각 섹션의 이름과 각 데이터를 관리하는 리듀서를 프로퍼티로 갖는 하나의 객체다.
- 여기선 데이터 스토어의 modelData 섹션을 책임지는 원래의 리듀서, stateData 섹션을 책임지기 위해 정의했던 리듀서를 사용했다.
- 조합된 리듀서는 데이터 스토어를 생성하기 위한 createStore 함수로 전달된다.

```text
Tip
각 리듀서는 데이터 스토어의 서로 분리된 부분을 담당하지만, 새 데이터 스토어 객체가 리턴될 때 까지 각 리듀서에게 액션이 전달된다.
즉 새 데이터 스토어 객체가 리턴된다는 것은 모든 액션이 처리됐음을 의미한다.
``` 

### 3.5 컴포넌트와 상태 데이터 연결
- 각 컴포넌트를 수정하기 보다는 별도의 커넥터 컴포넌트를 정의해 데이터 스토어의 기능과 컴포넌트 props 를 매핑하게 할것 이다.
```text
프리젠터 패턴 과 커넥터 패턴
데이터 스토어를 사용할 때의 일반적인 접근법은 두 개의 컴포넌트 유형을 사용하는 것이다.
프리젠터 컴포넌트는 콘텐츠를 렌더링하고 사용자의 입력에 응답하는 책임을 진다. 
프리젠터는 데이터 스토어에 직접 연결되지 않은 데이터와 함수 props 를 받는다.
커넥터 컴포넌트는 혼란스럽겠지만 바로 컨테이너 컴포넌트를 말하며, 데이터 스토어에 연결하고 프리젠터 컴포넌트에 props를 제공한다.
```
```jsx
import React, {Component} from 'react';
import { connect } from "react-redux";
import { endEditing } from "./stateActions"
import { saveProduct, saveSuppliers } from "./modelActionCreators";
import { PRODUCTS, SUPPLIERS } from "./dataTypes";

export const EditorConnector = (dataType, presentationComponent) => {
    const mapStateToProps = (storeData) => ({
        editing: storeData.stateData.editing && storeData.stateData.selectedType === dataType,
        product: (storeData.modelData[PRODUCTS].find(p => p.id === storeData.stateDate.selectedId)) || {},
        supplier: (storeData.modelData[SUPPLIERS].find(s => s.id === storeData.stateDate.selectedId)) || {}
    })

    const mapDispatchToProps = {
        cancelCallback: endEditing,
        saveCallback: dataType === PRODUCTS ? saveProduct: saveSuppliers
    }
    return connect(mapStateToProps,mapDispatchToProps)(presentationComponent)
}
```
- EditorConnector 는 ProductEditor 와 SupplierEditor 컴포넌트에 필요한 프리젠터 컴포넌트를 prop 와 함께 제공하는 HOC 다.
- __이는 이들 컴포넌트 각자가 connect 함수를 사용할 필요 없이, 동일한 코드를 사용해 데이터 스토어에 연결 할 수 있다는 뜻이다.__
- 두종류 모두를 지원하기 위해 HOC 함수는 데이터를 선택할 때 사용되는 데이터 타입과 props 에 매핑될 액션 생성자를 받는다.

```text

```
 

    
    