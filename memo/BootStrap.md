# BootStrap
- 부트스트랩 소개
    - HTML 엘리먼트는 브라우저에게 콘텐츠의 유형만을 알려줄뿐, 콘텐츠의 모양에 대한 정보는 제공하지 못한다.
    - 콘텐츠의 모양 정보를 제공하는 건 바로 __캐스케이딩 스타일시트(css)__ 다.
    _ CSS는 엘리먼트의 모양과 관련한 모든 사항을 설정할 수 있는 프로퍼티와 그 프로퍼티가 적용되게 하는 셀렉터(selector)로 구성
    - CSS 주된 문제점
        - 브라우저마다 프로퍼티를 조금씩 다르게 해석함으로써 각기 다른 기기에서 HTML 콘텐츠가 다른 모양으로 보일 수 있다는 점
    - 위 문제를 추척해 해결하는 일은 매우 어렵다. 이에 따라 개발자가 쉽고 일관된 방식으로 HTML 콘텐츠에 스타일을 적용할 수 있게 CSS 프레임워크가 등장
    - 가장 인기 있는 CSS 프레임워크는 부트스트랩 이다.
    - 부트스트랩은 엘리먼트의 일관된 스타일을 위해 적용할 수 있는 CSS 클래스의 모음, 그리고 추가적인 향상을 위해 선택할 수 있는 자바스크립트 코드로 이뤄졌다.

- 기본 부트스트랩 클래스 적용
    - 부트스트랩의 스타일은 className 프로퍼티를 통해 적용
    - className 프로퍼티는 class 속성에 대응하며, 관련된 엘리먼트들을 그룹화하기 위해 사용
    ```jsx
      <h4 className="bg-primary text-white text-center p-2 m-1">
          { message } 
      </h4>       
    ```
    ```text
    | 클래스       | 설명                                                   |
    | bg-primary  | 엘리먼트의 용도에 대한 시각적 단서를 제공하는 스타일 컨텍스트다. |
    | text-white  | 엘리먼트 콘텐츠의 텍스트에 흰색 스타일을 적용                 |
    | text-center | 엘리먼트 콘텐츠에 수평 기준의 가운데 정렬 스타일              |
    | p-2         | 엘리먼트 콘텐츠의 주변에 여백을 추가하는 스타일               |
    | m-1         | 엘리먼트의 주변에 여백을 추가하는 스타일 적용                 |
    ```

- 컨텍스트 클래스
    - 부트스트랩 같은 CSS 프레임워크를 사용하는 큰 이점 
        - 애플리케이션 전반에 걸쳐 일괄된 테마를 만드는 과정이 용이
    - 부트스트랩은 연관된 엘리먼트들에 일괄된 스타일을 적용할 수 있는 일련의 __스타일 컨텍스트__ 들을 제공
    ```text
    | 스타일 컨텍스트 | 설명                            | 
    | primary      | 콘텐츠의 주된 영역을 나타낸다.       |
    | secondary    | 콘텐츠의 보조 영역을 나타낸다.       |
    | success      | 결과가 성공적임을 나타낸다.          |
    | info         | 추가 정보를 나타낸다.               |
    | warning      | 경고성 정보를 나타낸다.             |
    | danger       | 심각한 경고성 정보를 나타낸다.       |
    | muted        | 콘텐츠가 덜 강조되게, 즉 흐리게 한다. |
    | dark         | 검은색으로 명암대비를 높인다.        |
    | white        | 흰색으로 명암대비를 높인다.          |   
    ```
    - 부트스트랩은 각기 다른 유형의 엘리먼트마다 스타일 컨텐스트를 적용할 수 있는 클래스들을 제공
    
- 마진과 패딩
    - 부트스트랩엔 패딩과 마진을 추가할 수 있는 유틸리티 클래스들이 포함돼 있다.
    - 패딩은 엘리먼트의 경계선과 그 안의 콘텐츠 사이의 여백을 뜻한다.
    - 마진은 엘리먼트의 경계선과 둘러싼 엘리먼트 사이의 여백을 뜻한다.
    - 마진과 패딩의 규칙
        - 첫 문자는 m(마진) or p(패딩)로 시작
        - 그다음엔 가장자리 측면을 나타내는 문자 (t는 상측, b는 하측, ㅣ은 좌측, r은 우측)를 선택적으로 붙일수 있다.
        - 그다음엔 하이픈(-)
        - 마지막으로 여백의 크기를 나타내는 숫자(여백이 없는 0 부터 가장큰 5까지) 
        - 가장자리 측면을 나타내는 문자를 생략 하면 네 측면에 모두 적용!!!
        ```jsx
          <h4 className="bg-primary text-white text-center p-2 m-1">
              {message}
          </h4>
          // 엘리먼트의 네 측면에 모두 2만큼 여백이 추가 
        ```

- 부트스트랩으로 그리드 생성
    - 부트스트랩은 최대 12개 컬럼까지 각기 다른 유형의 그리드 레이아웃을 지원하는 스타일 클래스를 제공
        ```jsx
        render = () => (
            <div className="container-fluid p-4">
              <div className="row bg-info text-white p-2">
                <div className="col font-weight-bold">Value</div>
                <div className="col-6 font-weight-bold">Even?</div>
              </div>
              <div className="row bg-light p-2 border">
                <div className="col">{ this.state.count }</div>
                <div className="col-6">{ this.isEven( this.state.count ) }</div>
              </div>
              <div className="row">
                <div className="col">
                  <button className="btn btn-info m-2" onClick={ this.handleClick }>
                    Click Me
                  </button>
                </div>
              </div>
            </div>
        );
        ```
        - 그리드의 최상위 div 엘리먼트엔 container 클래스를 할당
        - 그 다음엔 자식 div 엘리먼트에 row 클래스를 할당
        - 다시 자식 div 엘리먼트에 col 클래스를 할당해 그리드 레이아웃을 구성
    
- 부트스트랩으로 테이블 스타일 적용
    - 부트스트랩은 table 엘리먼트와 그 콘텐츠의 스타일 적용을 지원
        ```text
        | 클래스          | 설명                                                        |
        | table          | table 엘리먼트와 그 로우에 일반적인 스타일을 적용                 |
        | table-striped  | 테이블의 로우 마다 교대로 배경색을 달리하는 , 즉 줄무늬 스타일을 적용 |
        | table-bordered | 모든 로우와 컬럼에 테두리를 적용                                |
        | table-sm       | 테이블의 공간을 줄임으로써 좀 더 촘촘한 레이아웃을 만든다.          |
        ```
        - 이들 클래스는 모두 table 엘리먼트에 직접 적용할 수 있다.
        ```jsx
          <table className="table table-striped table-bordered table-sm">
                  <thead className="bg-info text-white">
                      <tr><th>Value</th><th>Even?</th></tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>{ this.state.count }</td>
                          <td>{ this.isEven(this.state.count) }</td>
                      </tr>
                  </tbody>
                  <tfoot className="text-center">
                      <tr>
                          <td colSpan="2">
                              <button className="btn btn-info m-2" onClick={ this.handleClick }>
                                  Click Me
                              </button>
                          </td>
                      </tr>
                  </tfoot>
              </table>
        ```
 
 - 부트스트랩으로 폼 스타일 적용
    ```jsx
           <div className="m-2">
               <div className="form-group">
                   <label>Name:</label>
                   <input className="form-control"/>
               </div>
               <div className="form-group">
                   <label>City:</label>
                   <input className="form-control"/>
               </div>
           </div>
    ```
   - 폼에 기본 스타일을 적용하려면 label 과 input 엘리먼트를 포함하는 div 엘리먼트에 form-group 클래스를 지정하면 된다.
   - 이때 input 엘리먼트엔 form-control 클래스를 지정한다.
           