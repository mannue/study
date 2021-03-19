### 1. Context Menu - jquery 코드

- JQuery Method 
  ```text
    method 
        .on( events [, selector ] [, data ], handler ) :  이벤트 추가 함 
    parameter 
        event    : 이벤트 namespace
        selector : A selector string to filter the descendants of the selected elements that trigger the event.
        ( 선택 할 선택자를 입력 )
        data     : Data to be passed to the handler in event.data when an event is triggered.
        ( 이벤트가 발생 시 넘어오는 데이터 )
        handler  : A function to execute when the event is triggered.
        ( 이벤트 발생 시 실행 되는 함수 )
  
    method
       .toggleClass( className ) :  클래스 이름이 있으면 제거 하고 없으면 추가하는 함수
    parameter
       className : One or more classes (separated by spaces) to be toggled for each element in the matched set.
                  ( 스페이스를 구분자로 사용하여 하나 또는 여러개의 클래스이름을 입력 )
    
    method 
      .siblings( [selector ] ) : 한 선택자의 형제들을 가져오는 함수
  ```