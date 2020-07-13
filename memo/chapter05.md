# 자바스크립트 핵심 정리
- 리액트 개발 도구는 바벨(Babel) 이라는 패키지를 기본으로 포함하는데, 바벨은 최신 기능을 사용한 자바스크립트 코드가 대부분의 브라우저에서 작동할 수 있게 변환하는 역할을 한다.

- 자바스크립트 구문
    - 자바스크립트의 기본적인 구성 요소는 구문(statement)이다.

- 자바스크립트 함수
    - 여러 구문을 하나의 함수에 모아 넣을 수도 있느데, 이 경우 브라우저가 그 함수를 호출하는 구문을 만나기 전까지는 함수가 실행되지 않는다.
    ```javascript
      const myFuc = function () {
          console.log("This statement is inside the function");
      }
      
      console.log("This statement is outside the function");
      
      myFuc();
    ```
    - 이 함수 안의 구문은 브라우저가 myFunc 함수를 호출하는 구문에 도달하기 전까지 실행되지 않는다.
    - 함수는 사용자의 행위와 같은 어떤 종류의 변경사항이나 이벤트에 응답하기 위해 사용될때 유용하다.
   
- 파라미터가 있는 함수
    ```javascript
      function myFuc(name, weather) {
          console.log("Hello" + name + ".");
          console.log("It is " + weather + " today.");
      }
      
      myFuc("Adam", "sunny");
    ```
  
- 기본 파라미터와 레스트 파라미터
    - 함수를 호출할 때 넘기는 인자의 수는 함수에 정의된 파라미터 수와 일치하지 않아도 된다.
    - 파라미터 수보다 적은 수의 인자를 넘긴다면 값을 받지 않은 파라미터는 모두 undefined 라는 값을 갖게 된다.
    - 파라미터 수보다 많은 수의 인자를 넘긴다면 초과된 인자들은 모두 무시된다.
    - 동일한 이름이지만 파라미터가 다른 두개의 함수는 만들수 없다(다형성 안됨!!)
        - 자바스크립트는 인자를 기준으로 두 함수를 구별하지 않는다.
        - 동일한 이름의 함수가 여러 개 있다면 마지막 함수만을 유효하게 처리한다.
    
    - 기본 파라미터(default parameter)
        ```javascript
          function myFuc(name, weather="raining") {
              console.log("Hello" + name + ".");
              console.log("It is " + weather + " today.");
          }
          
          myFuc("Adam");
        ```
    
    - 레스트 파라미터(rest parameter)
        ```javascript
          function myFuc(name, weather, ...extraAge) {
              console.log("Hello" + name + ".");
              console.log("It is " + weather + " today.");
              for (let i=0; i < extraAge.length; i++)
                  console.log("Extra Arg: "+ extraAge[i]);
          }
          
          myFuc("Adam", "sunny", "one", "two","tree");
        ```
        - __레스트 파라미터는 함수가 정의하는 파라미터 중 가장 마지막에 위치해야 하며, 파라미터 이름 앞에 반드시 생략 부호(...)가 붙어야 한다.__
    
- 다른 함수의 인자로 함수 사용
    ```javascript
    function myFunc(nameFunction) {
        return ("Hello " + nameFunction() + ".");
    }
    
    console.log(myFunc(function () {
        return "Adam";
    }));
    ```
    ```javascript
    function myFunc(nameFunction) {
        return ("Hello " + nameFunction() + ".");
    }
    
    function printName(nameFunction, printFunction) {
        printFunction(myFunc(nameFunction))
    }
    
    printName(function () {
        return "Adam";
    }, console.log);
    ```

- 변수와 타입
    - let 키워드는 변수를 선언할 때 사용하며, 선언과 동시에 값 할당도 가능
    - const 키워드의 경우엔 변경 될수 없는 상수를 만든다.
    - let 이나 const 를 써서 만든 변수나 상수는 그 변수나 상수가 정의한 코드 구역 안에서만 접근이 허용되며, 이를 변수 영역(variable scope) 이나 상수 영역(constant scope) 라고 한다.
    ```javascript
          function messageFunction(name, weather) {
              let message = "Hello, Adam";
          
              if (weather === "sunny") {
                  let message = "It is a nice day";
                  console.log(message);
              } else {
                  let message = "It is " + weather + " today";
                  console.log(message);
              }
              console.log(message);
          }
          
          messageFunction("Adam", "raining");
    // 결과 
    // It is raining today
    // Hello, Adam 
    ``` 
    - let 과 const 는 var 의 이상한 동작을 대체하고자 최근에 자바스크립트 표준 명세에 추가된 키워드다.
    
    ```javascript
        function messageFunction(name, weather) {
            var message = "Hello, Adam";
        
            if (weather === "sunny") {
                var message = "It is a nice day";
                console.log(message);
            } else {
                var message = "It is " + weather + " today";
                console.log(message);
            }
            console.log(message);
        }
        
        messageFunction("Adam", "raining");
    // 결과 
    // It is raining today
    // It is raining today
    ```
    - var 키워드의 문제는 변수의 영역이 함수 전체 라는 점이다!!
    
    ```text
      클로저의 사용
      함수 안에서 함수(즉 외부 함수(outer function) 와 내부 함수(inner function))를 정의하면
      내부 함수가 외부 함수의 변수에 접근 할 수 있으며, 이를 클로저(closure) 라고 한다.
    ```

- 기본 데이터 타입
    - 자바스크립트엔 string, number, boolean 이라는 기본 데이터 타입(primitive type)이 내장 
    
    - 템플릿 문자열
        - 템플릿 문자열을 사용하면 데이터 값을 콘텐츠 안에 직접 지정할 수 있으므로 오류의 가능성을 줄일수 있다.
        ```javascript
          function messageFunction(weather) {
              let message = `It is ${weather} today`;
              console.log(message);
          }
          
          messageFunction("raining");
        ```
    - number의 사용
        - number 타입은 정수뿐 아니라 부동소수점 수를 표현할 때 사용
        
- 자바스크립트 연산자
    - 등치 연산자(equality operator)와 일치 연산자(identity operator)
        - 등치 연산자 의 경우 피연산자의 타입을 일치 시킨 후에 그 값이 같은지 평가
        - 일치 연산자 의 경우 타입을 일치 시키지 않는다.
    
    - 명시적 타입 변환
        - 자바스크립트는 덧셈 보다 변수의 연결을 더 선호
        ```javascript
          let myData1 = 5 + 5;
          let myData2 = 5 + "5";
          
          console.log("Result 1: "+ myData1);
          console.log("Result 1: "+ myData2);
        // 결과
        // Result 1: 10
        // Result 2: 55
        ```
        - 명시적 타입 변환을 사용하면 혼란 없이 원래 의도했던 작업을 수행할 수 있다.
    
- 배열
    - 자바스크립트는 배열의 크기를 알아서 조정하고 서로 다른 어떤 데이터 타입이라도 보관 할 수 있다.
    - for 문과 forEach
    ```javascript
        let myArray = [100, "Adam", true];
        
        for (let i=0; i < myArray.length; i++) {
            console.log(`Index ${i}: ${myArray[i]}`);
        }
        
        console.log('---');
        
        myArray.forEach((value,index) => console.log(`Index ${index}: ${value}`));
    ```
   
- 스프레드 연산자(spread operator)
    ```javascript
      function printItems(numValue, stringValue, boolValue) {
          console.log(`Number: ${numValue}`);
          console.log(`String: ${stringValue}`);
          console.log(`Boolean: ${boolValue}`);
      }
      
      let myArray = [100, "Adam", true];
      
      printItems(myArray[0], myArray[1], myArray[2]);
      printItems(...myArray);
    // 동일한 결과값 출력
    ```

- 배열의 내장 메서드
    - 배열의 많은 내장 메서드가 새 배열을 리턴한다. 따라서 이들 메서드는 데이터 처리를 위한 연쇄적인 호출, 이른바 __메서드 체이닝(method chaining)__  이 가능하다.
    ```javascript
        let products = [
          { name: "Hat", price: 24.5, stock: 10 },
          { name: "kayak", price: 289.99, stock: 1 },
          { name: "Soccer Ball", price: 10, stock: 0 },
          { name: "Running Shoes", price: 116.5, stock: 20 },
        ];
        
        let totalValue = products
          .filter((item) => item.stock > 0)
          .reduce((prev, item) => prev + item.price * item.stock, 0);
        
        console.log(totalValue);
    ```

- 객체
    - 객체 리터럴
    ```javascript
        let myData = {
            name: "Adam",
            weather: "sunny",
        };
        
        console.log(`Hello ${myData.name}.`);
        console.log(`Today is ${myData.weather}`);
    ```
    
    - 객체 프로퍼티로서 변수 사용
        - 변수를 객체 프로퍼티로 사용하면 자바스크립트는 변수의 이름과 값을 프로퍼티의 이름과 값으로 간주 
        ```javascript
            let name = "Adam";
            
            let myData = {
                name,
                weather: "sunny",
            };
            
            console.log(`Hello ${myData.name}.`);
            console.log(`Today is ${myData.weather}`);
            // 출력 값
            // Hello Adam.
            // Today is sunny
        ```
    
    - 메서드로서의 함수
        - 자바스크립트의 특징 중 하나는 함수를 객체에 추가 할수 있다는 점이다.
        - 객체 안에 정의된 함수를 메서드 라고 한다.
        ```javascript
            let myData = {
                name: "Adam",
                weather: "sunny",
                printMessages: function () {
                    console.log(`Hello ${this.name}.`);
                    console.log(`Today is ${this.weather}`);
                }
            };
            
            myData.printMessages();
        ```
        - __this 는 현재 객체를 대변하는 특별한 변수로서 함수가 메서드로 사용될때 묵시적으로 전달 받는다.__
        ```text
          만약 화살표 함수의 결과로 객체 리터럴을 리턴하고 싶다면 반드시 객체를 소괄호로 감싸야한다.
          ex) myFunc = () => ({ data: "hello" });
          소괄호가 없으면 개발 도구는 중괄호의 시작과 끝을 함수의 내용이라 판단해 에러를 발생 시킬것이다.
        ```
  
- 클래스
    - 다른 객체로 프로퍼티 복사 
        ```javascript
            class MyData {
                constructor() {
                  this.name = "Adam";
                  this.weather = "sunny";
                }
                
                printMessages = () => {
                    console.log(`Hello ${this.name}`);
                    console.log(`Today is ${this.weather}.`);
                }
            }
            
            let myData = new MyData();
            let secondObject = {};
            
            Object.assign(secondObject, myData);
            
            secondObject.printMessages();
        ``` 
        - 자바스크립트는 Object.asssign 이라는 메서드를 제공
    
    - 명명된 파라미터로 프로퍼티 읽기
        ```javascript
            const myData = {
                name: "Bob",
                location: {
                  city: "Paris",
                  country: "France"
                },
                employment: {
                  title: "Manager",
                  dept: "Sales",
                },
            };
            
            function printDetails({ name, location: { city }, employment: { title }}) {
                console.log(`Name: ${name}, City: ${city}, Role: ${title}`);
            }
            
            printDetails(myData);
        ```
      
- 자바스크립트 모듈
    - 자바스크립트 모듈의 생성과 사용
        - export 키워드는 모듈의 기능을 모듈 밖에서 사용할 수 있게 명시하는 용도로 사용
        - 자바스크립트 파일의 콘텐츠는 기본적으로 __비공개(private)__ 이다.
        - default 키워드는 모듈에 하나의 기능만 있을 때 사용
    
    ```text
        식별자를 적용한 곳이 import 구문이라는 점에 주목하기 바란다. 이는 모듈의 함수를 사용할 코드에서 이름을 정할 수있다는 뜻이다.
        또한 애플리케이션의 각 부분에서 동일한 함수를 각기 다른 이름으로 참조 할 수 있다는 뜻이다.
    ```
    
    - export default 선언 후 import 하는 쪽에서 이름 변경 하여 사용 
        ```javascript
            // sum.js
            export function sumValues(values) {
                return values.reduce((prev, val) => prev + val, 0);
            }
            
            export default function sumOdd(values) {
                return sumValues(values.filter((item, index) => index % 2 === 0));
            }
          
            // example.js
            import oddOnly, { sumValues } from './sum';
            
            let values = [10, 20, 30, 40, 50];
            
            let total = sumValues(values);
            let odds = oddOnly(values)
            
            console.log(`Total: ${total} , Odd Total: ${odds}`);
        ```
    
    - export 선언 후 import 하는 쪽에서 이름 변경 하여 사용 (as 사용)
    ```javascript
        //operations.js
        export function multiply(values) {
            return values.reduce((total, val) => total + val, 1);
        }
        
        export function subtract(amount, values) {
            return values.reduce((total, val) => total - val, amount);
        }
        
        export function divide(first, second) {
            return first / second;
        }
      
        // example.js
        import oddOnly, { sumValues } from './sum';
        import {multiply, subtract as deduct } from "./operations";
        
        let values = [10, 20, 30, 40, 50];
        
        let total = sumValues(values);
        let odds = oddOnly(values)
        
        console.log(`Total: ${total} , Odd Total: ${odds}`);
        console.log(`Multiply: ${multiply(values)}`);
        console.log(`Subtract: ${deduct(1000, values)}`);
    ```
    
    - 모든 기능 가져오기
        ```javascript
            import oddOnly, { sumValues } from './sum';
            import * as  ops from "./operations";
            
            let values = [10, 20, 30, 40, 50];
            
            let total = sumValues(values);
            let odds = oddOnly(values)
            
            console.log(`Total: ${total} , Odd Total: ${odds}`);
            console.log(`Multiply: ${ops.multiply(values)}`);
            console.log(`Subtract: ${ops.subtract(1000, values)}`);
        ```

- 자바스크립트 프로미스
    - 프로미스(promise) 란 미래의 어느시점에서 종료될 백그라운드 작업을 말한다.
    - 프로미스를 주로 사용하는 경우는 HTTP 요청을 통한 데이터 요청인데, 이는 비동기식으로 수행되며 웹 서버로부터 응답을 받은 후에 결과를 만들어야 하기 때문이다.
    - 프로미스 사용하기
        - 비동기 작업이 완료되기를 기다렸다가 그 결과를 사용 할 수 있도록, 비동기 작업ㅇ르 관찰 할수 있는 기제가 필요하다.
        ```javascript
            // callee
            import {sumValues} from "./sum";
            
            export function asyncAdd(values) {
                return new Promise(callback => setTimeout(()=> {
                    let total = sumValues(values);
                    console.log(`Async Total: ${total}`);
                    callback(total);
                }, 500));
            }
      
            // caller
            import {asyncAdd} from "./async";
            
            let values = [10, 20, 30, 40, 50];
            
            asyncAdd(values).then( total => console.log(`Main Total: ${total}`));
        ```
        - Promise는 관찰 함수를 파라미터로 받는다
        - 관찰 대상인 함수엔 콜백 함수가 포함되는데, 이 함수는 비동기 작업이 완료되면 호출되며 그 결과를 인자로 받는다.
        - 콜백 함수의 호출을 소위 __약속 이행(resolving the promise)__ 이라고 한다.
        - then 메서드를 콜백이 실행 되면 호출될 함수를 받는다. 따라서 콜백에 전달된 결과느 then 함수에 제공된다.
    
    - 비동기 작업을 다루는 쉬운 방법
        - 자바스크립트는 프로미스를 직접 사용하지 않고 비동기 작업을 다룰 수 있게 지원한다.
        - 이를 위해 제공하는 두 개의 키워드가 있는데, 바로 __async 와 await__ 이다.
        ```text
            async 나 await 이 애플리케이션의 작동 방식에 전혀 영향을 주지 않는다는 점이 중요하다. 여전히 비동기 작업이 수행되며 작업이 완료되기 전까지 결과는 나오지 않는다.
            이들 키워드는 오직 비동기 작업을 다룰 수 있게 하는 것이 목적이므로 then 메서드를 사용하면 안된다. 
        ```
        - then 대신 async 와 await 사용하기
            ```javascript
                import {asyncAdd} from "./async";
                
                let values = [10, 20, 30, 40, 50];
                
                asyncAdd(values).then( total => console.log(`Main Total: ${total}`));
                
                async function doTask() {
                    let total = await asyncAdd(values);
                    console.log(`Main Total: ${total}`);
                }
                
                doTask();
                // 동일하게 출력
            ```
            - __async 와 await 는 오직 함수 에만 적용 할 수 있다!!.__
            - async 키워드는 이 함수가 프로미스 관련 기능에 의존함을 나타낸다.
            - await 키워드는 Promise 를 리턴하는 함수를 호출 할때 사용되며, Promise 객체의 콜백에 제공된 결과를 할당받은 후 에 그 다음 구문을 실행하게 된다. 
    