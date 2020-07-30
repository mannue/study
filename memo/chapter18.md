# 18장 온전한 애플리케이션 
- 리액트는 사용자에게 HTML 콘텐츠를 보여주기 위한 훌륭한 기능들을 제공하며, 온전한 웹 애플리케이션 개발을 위한 각종 기능들을 서드파티 패키지를 통해 지원한다.

```text
|      패키지        |   설명
|      리덕스        | 애플리케이션 컴포넌트의 외부에서 데이터를 관리하게 하는 데이터 스토어
| 리액트 리덕스       | props 를 통해서 리액트 컴포넌트를 리덕스 데이터 스토어에 연결해줌으로써 prop 스레딩을 하지 않아도 데이터에 접근 할수 있게 한다.
| 리액트 라우터       | 브라우저의 URL 을 기반으로 사용자에게 컴포넌트를 보여 줄수 있게, 리액트 애플리케이션을 위한 URL 라우팅 기능을 제공
| 엑시오스           | 비동기 HTTP 요청을 만들 수 있는 일관된 API를 제공한다.
| 아폴로 - 부스트     | 아폴로는 전통적인 RESTFull 웹 서비스보다 더 유연한 그래프QL 서비스 이용을 위한 클라이언트다.
| 리액트 아폴로       | 리액트 컴포넌트를 그래프QL 쿼리와 뮤테이션에 연결해 줌으로써, props 를 통해 그래프QL 서비스를 이용               
```

## 1. 예제 애플리케이션 작성
###1.1 상품 관련 개발
- 코드
    ```jsx
    import React, { Component } from "react";
    
    export class ProductTableRow extends Component {
    
      static defaultProps = {
          editCallback: () => console.log("no init editCallback"),
          deleteCallback: () => console.log("no init deleteCallback"),
      }
    
      render() {
          let p = this.props.product;
        return <tr>
            <td>{p.id}</td>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td className="text-right">${ Number(p.price).toFixed(2) }</td>
            <td>
                <button className="btn btn-sm btn-warning m-1"
                onClick={ () => this.props.editCallback(p) }>Edit</button>
                <button className="btn btn-sm btn-danger m-1"
                onClick={ () => this.props.deleteCallback(p)}>Delete</button>
            </td>
        </tr>
      }
    }
    ```
    - 이 컴포넌트는 한 테이블 안에 하나의 로우를 렌더링한다.

###1.2 상품 테이블 생성
- 코드 
    ```jsx
      import React, { Component } from "react";
      import { ProductTableRow } from "./ProductTableRow";
      
      export class ProductTable extends Component {
        constructor(props) {
          super(props);
          this.state = {
            product: [],
          };
        }
        render() {
          return (
            <table className="table table-sm table-striped table-bordered">
              <thead>
                <tr>
                  <th colSpan="5"
                  className="bg-primary text-white table-bordered h4 p-2">
                      Products
                  </th>
                </tr>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th className="text-right">Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.props.products.map((p) => (
                  <ProductTableRow
                    product={p}
                    key={p.id}
                    editCallback={this.props.editCallback}
                    deleteCallback={this.props.deleteCallback}
                  />
                ))}
              </tbody>
            </table>
          );
        }
      }
    ```
    - 이 컴포넌트는 products 라는 배열 prop 의 각 객체를 위해 ProductTableRow 컴포넌트로 채워질 테이블 하나를 렌더링한다.

###1.3 상품 편집기 생성
- 코드
    ```jsx
      import React, { Component } from "react";
      
      export class ProductEditor extends Component {
      
        static defaultProps = {
            product: {
                id: "",
                name: "",
                category: "",
                price: ""
            },
            saveCallback: (data) => console.log("no input saveCallback")
        }
      
        constructor(props) {
          super(props);
          this.state = {
              formData: {
                  id: props.product.id || "",
                  name: props.product.name || "",
                  category: props.product.category || "",
                  price: props.product.price || ""
              }
          }
        }
      
        handleChange = (ev) => {
            ev.persist();
            this.setState( state => state.formData[ev.target.name] = ev.target.value);
        }
      
        handleClick = (ev) => {
            this.props.saveCallback(this.state.formData)
        }
      
        render() {
          return <div className="m-2">
              <div className="form-group">
                  <label>ID</label>
                  <input className="form-control" name="id" disabled value={ this.state.formData.id } onChange={ this.handleChange }/>
              </div>
              <div className="form-group">
                  <label>Name</label>
                  <input className="form-control" name="name" disabled value={ this.state.formData.name } onChange={ this.handleChange }/>
              </div>
              <div className="form-group">
                  <label>Category</label>
                  <input className="form-control" name="category" disabled value={ this.state.formData.category } onChange={ this.handleChange }/>
              </div>
              <div className="form-group">
                  <label>Price</label>
                  <input className="form-control" name="price" disabled value={ this.state.formData.price } onChange={ this.handleChange }/>
              </div>
              <div className="text-center">
                  <button className="btn btn-primary m-1" onClick={ this.handleClick }>Save</button>
                  <button className="btn btn-secondary m-1" onClick={ this.handleClick }>Cancel</button>
              </div>
          </div>;
        }
      }
    ```
    - ProductEditor 컴포넌트는 사용자가 객체의 프로퍼티를 편집 할 수 있게 하는 필드들을 제공한다.
    
###1.4 상품화면 컴포넌트 생성
- 코드
    ```jsx
      import React, { Component } from "react";
      import { ProductEditor } from "./ProductEditor";
      import { ProductTable } from "./ProductTable";
      
      const propTypes = {};
      
      export class ProductDisplay extends Component {
        constructor(props) {
          super(props);
          this.state = {
            showEditor: false,
            selectedProduct: null,
          };
        }
      
        static defaultProps = {};
      
        createProduct = (ev) => {
          this.setState({
            showEditor: true,
            selectedProduct: {},
          });
        };
      
        startEditing = (product) => {
          this.setState({
            showEditor: true,
            selectedProduct: product,
          });
        };
      
        cancelEditing = (ev) => {
          this.setState({
            showEditor: false,
            selectedProduct: null,
          });
        };
      
        saveProduct = (ev, product) => {
          this.props.saveCallback(product);
          this.setState({
            showEditor: false,
            selectedProduct: null,
          });
        };
      
        render() {
          if (this.state.showEditor) {
            return (
              <ProductEditor
                key={this.state.selectedProduct.id || -1}
                product={this.state.selectedProduct}
                saveCallback={this.saveProduct}
                cancelCallback={this.cancelEditing}
              />
            );
          } else {
            return (
              <div className="m-2">
                <ProductTable
                  products={this.props.products}
                  editCallback={this.startEditing}
                  deleteCallback={this.props.deleteCallback}
                />
                <div className="text-center">
                  <button
                    className="btn btn-primary m-1"
                    onClick={this.createProduct}
                  >
                    Create Product
                  </button>
                </div>
              </div>
            );
          }
        }
      }
    ```
    - 이 컴포넌트는 데이터 테이블이나 편집기 중에 어떤 것을 보여줘야 하는지, 만약 편집기의 경우라면 사용자가 수정하고자 하는 상품이 어느 것인지 결정하기 위한 상태 데이터를 정의한다.
  
###1.5 공급업체 관련 개발
- 코드
    ```jsx
      import React, {Component} from 'react';
      
      export class SupplierTableRow extends Component {
      
          render() {
              let s = this.props.supplier;
              return <tr>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.city}</td>
                  <td>{s.products.join(", ")}</td>
                  <td>
                      <button className="btn btn-sm btn-warning m-1" onClick={ ()=> this.props.editCallback(s) }>Edit</button>
                      <button className="btn btn-sm btn-danger m-1" onClick={ ()=> this.props.deleteCallback(s) }>Delete</button>
                  </td>
              </tr>
          }
      }
    ```
    - 이 컴포넌트는 supplier 라는 prop 객체의 id, name, city, products 프로퍼티와 함께 하나의 테이블 로우를 렌더링한다.
    
###1.6 공급업체 테이블 생성
- 코드
    ```jsx
      import React, {Component} from 'react';
      import {SupplierTableRow} from "./SupplierTableRow";
      
      export class SupplierTable extends Component {
      
          render() {
              return <table>
                  <thead>
                      <tr><th>ID</th><th>Name</th><th>City</th><th>Products</th><th></th></tr>
                  </thead>
                  <tbody>
                  {
                      this.props.suppliers.map(s => <SupplierTableRow key={s.id} supplier={s} editCallback={this.props.editCallback } deleteCallback={this.props.deleteCallback}/>)
                  }
                  </tbody>
              </table>
          }
      }
    ```
    - 이 컴포넌트는 suppliers prop 배열 안의 각 객체를 supplierTableRow 에 매핑한 테이블 하나를 렌더링한다.
    
###1.7 공급업체 편집기 생성
- 코드 
    ```jsx
          import React, {Component} from 'react';
          
          export class SupplierEditor extends Component {
          
              constructor(props) {
                  super(props);
                  this.state = {
                      formData : {
                          id: props.supplier.id || "",
                          name: props.supplier.name || "",
                          city: props.supplier.city || "",
                          products: props.supplier.products || []
                      }
                  }
              }
          
              handleChange = (ev) => {
                  ev.persist();
                  this.setState(state => state.formData[ev.target.name] = ev.target.name === "products" ? ev.target.value.split(",") : ev.target.value);
              }
          
              handleClick = () => {
                  this.props.saveCallback({
                      ...this.state.formData,
                      products: this.state.formData.products.map(val => Number(val))
                  })
              }
          
              render() {
                  return <div className="m-2">
                      <div className="form-group">
                          <label>ID</label>
                          <input className="form-control" name="id" disabled value={ this.state.formData.id } onChange={ this.handleChange }/>
                      </div>
                      <div className="form-group">
                          <label>Name</label>
                          <input className="form-control" name="name"  value={ this.state.formData.name } onChange={ this.handleChange }/>
                      </div>
                      <div className="form-group">
                          <label>City</label>
                          <input className="form-control" name="city"  value={ this.state.formData.city } onChange={ this.handleChange }/>
                      </div>
                      <div className="form-group">
                          <label>Products</label>
                          <input className="form-control" name="products"  value={ this.state.formData.products } onChange={ this.handleChange }/>
                      </div>
                      <div className="text-center">
                          <button className="btn btn-primary m-1" onClick={ this.handleClick }>Save</button>
                          <button className="btn btn-secondary" onClick={ this.props.cancelCallback }>Cancel</button>
                      </div>
                  </div>
              }
          }
    ```
 
###1.8 공급업체 화면 컴포넌트 생성
- 이제 공급업체 테이블 이나 편집기 중 하나만 보일 수 있게 공급업체 데이터를 다루는 부분을 관리해야 한다.
- 코드 
    ```jsx
      import React, {Component} from 'react';
      import {SupplierEditor} from "./SupplierEditor";
      import {SupplierTable} from "./SupplierTable";
      
      export class SupplierDisplay extends Component {
      
          constructor(props) {
              super(props);
              this.state = {
                  showEditor: false,
                  selected: null,
              }
          }
      
          cancelEditing = (ev) => {
              this.setState({
                  showEditor: false,
                  selected: null,
              });
          };
      
          createSupplier = (ev) => {
              this.setState({
                  showEditor: true,
                  selected: {},
              })
          }
      
          saveSupplier = (supplier) => {
              this.props.saveCallback(supplier);
              this.setState({
                  showEditor: false,
                  selected: null
              })
          }
      
          startEditing = (supplier) => {
              this.setState({
                  showEditor: true,
                  selected: supplier
              })
          }
      
          render() {
             if (this.state.showEditor) {
                 return <SupplierEditor key={ this.state.selected.id || -1 } supplier={this.state.selected} saveCallback={this.saveSupplier} cancelCallback={this.cancelEditing}/>
             } else {
                 return <div className="m-2">
                     <SupplierTable suppliers={this.props.suppliers} editCallback={this.startEditing} deleteCallback={this.props.deleteCallback }/>
                     <div className="text-center">
                         <button className="btn btn-primary m-1" onClick={ this.createSupplier }>
                             Create Supplier
                         </button>
                     </div>
                 </div>
             }
          }
      }
    ```
    - SupplierDisplay 컴포넌트는 편집기와 테이블 중 어떤 컴포넌트를 보여줘야 할지 결정하기 위한 자신만의 상태 데이터를 갖는다.

###1.9 애플리케이션 완성하기
- 코드
    ```jsx
      import React, {Component} from 'react';
      
      
      export class Selector extends Component {
      
          constructor(props) {
              super(props);
              this.state = {
                  selection: React.Children.toArray(props.children)[0].props.name
              }
          }
      
          setSelection = (ev) => {
              ev.persist();
              this.setState({
                  selection: ev.target.name
              })
          }
      
          render() {
              return <div className="container-fluid">
                  <div className="row">
                      <div className="col-2">
                          {
                              // 각 자식에 대해 함수를 호출하고, 그결과들을 배열로 리턴한다
                              React.Children.map(this.props.children, c => {
                                  return <button name={c.props.name} onClick={this.setSelection} className={`btn btn-block m-2 ${this.state.selection === c.props.name ? "btn-primary active": "btn-secondary"}`}>
                                      {
                                          c.props.name
                                      }
                                  </button>
                              })
                          }
                      </div>
                      <div className="col">
                          {
                              // 이 메서드는 자식의 배열을 리턴하는데, 엘리먼트를 재정렬하거나 부분 제거할때 유용하다.
                              React.Children.toArray(this.props.children).filter(c=> c.props.name === this.state.selection)
                          }
                      </div>
                  </div>
              </div>
          }
      }
    ```
    - Selector 는 각 자식 컴포넌트를 위한 버튼을 랜더링하고 사용자가 선택한 콘텐츠만 보여주는 컨테이너 컴포넌트다.
    
## 2. 예제 애플리케이션의 한계
- 이 예제 애플리케이션은 리액트 컴포넌트를 조합해 애플리케이션을 완성하는 방법을 보여준다. 그러나 동시에 리액트가 제공하는 기능의 한계도 보여준다.
- 문제점
    - 예제 애플리케이션의 가장 큰 한계는 App 컴포넌트에 하드코딩한, 정적으로 정의한 데이터를 사용한다는 사실이다.
        - 최근 브라우저들은 일정량의 데이터를 로컬에 저장할 수 있게 하지만, 그래도 웹 애플리케이션의 외부에 데이터를 유지하는 가장 흔한 방법은 웹서비스를 이용하는 것이다.
    - 상태 데이터가 무조건 애플리케이션의 최상단까지 올라간다는 점이다.
        - 상태 데이터는 컴포넌트들을 협업 시킬때 사용되며, 동일한 데이터로의 접근이 필요한 공통의 조상 컴포넌트까지 끌어 올려진다.
        - 예제 애플리케이션은 그와 같은 접근법의 부정적인 면을 보여준다.
- __컴포넌트가 언마운트 되면 리액트는 그 컴포넌트와 상태 데이터를 제거한다.__
- 이는 예제 애플리케이션의 Selector 아래에 있는 어떤 컴포넌트도 애플리케이션 데이터를 저장하기에 적합하지 않다
- 결과적으로 모든 데이터와 조작 메서드를 App 컴포넌트에 정의할 수 밖에 없었다.
- __모델 데이터가 최상위 컴포넌트까지 끌려 올라가는 일을 방지하는 가장 좋은 방법은 모델 데이터를 별도의 데이터 스토어에 저장하는 것이다.__
- 리액트 컴포넌트가 데이터를 관리하지 않고도 보여줄 수 있게 말이다. 