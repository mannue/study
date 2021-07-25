### Pagination
1. JS 로 구현하기
    - 개인 구현 
        ```js
            function getComments(page) {
                 var start =  1 + Math.imul(5, page-1);
                this.current_page = page; // 현재 페이지 번호로 셋팅합니다.
                
                // 해당 페이지의 게시물의 마지막 지점을 보여줍니다.
                var limit = Math.imul(5, page)
                
                // 게시물의 결과를 배열로 리턴합니다.
                console.log(start-1, limit, comments);
                
                return comments.slice(start-1, limit);
            }
        ```
        - getComments 함수 는 입력한 page 부터 limit 까지 comment 의 크기를 return 하는 함수다.
        ```js
                function getPageListFormat() {
                var result = '';
                for (let i=1; i<=this.total_page; i++) {
                let element = '';
                if (this.current_page === i) {
                element = `<button class="active">${i}</button>`;
                } else {
                element = `<button>${i}</button>`;
                }
                result = result + element;
            }
        ```
        - getPageListFormat 함수는 total page 정보를 바탕으로 버튼를 생성하는 함수이다.
        ```js
            document.addEventListener("DOMContentLoaded", function() {
                var pagination = new Pagination();
                // 첫 페이지 로딩시에 pagaination 객체를 활용해서
                // #commentContainer , #pageContainer 에 각각 넣어줍니다.
                let element = document.querySelector('#commentContainer');
                element.innerHTML = pagination.getCommentFormat(pagination.getComments(pagination.current_page));
                let buttonContainerElement = document.querySelector('.pageWrap');
                buttonContainerElement.innerHTML = pagination.getPageListFormat();
                document.addEventListener('click', function (event) {
                
                      // pageContainer 안에 페이지 변수들은 동적으로 생성됩니다.
                      // 이벤트를 클릭했을 때 해당 지점이 버튼변수일때 innerHtml 로 넣어주는 부분을 완성해주세요.
                      if(event.target.matches("button")) {
                          element.innerHTML = pagination.getCommentFormat(pagination.getComments(parseInt(event.target.innerText)));
                          buttonContainerElement.innerHTML = pagination.getPageListFormat();
                      }
                }, false);
            });
        ```
        - addEventListener 등록 함수는 Dom 이 로딩하면 호출되는 함수로 위 함수를 토대로 commentContainer 에 innerHTML 를 이용해서 comment list를 만들고 getPageListFormat 을 통해서 버튼리스트를 생성한다.
    - 동영상 과 차이
        - 차이는 거의 없는것 같다 comment.slice 가 아니라 stream 의 filter 를 사용하였다.
        - getPageListFormat 함수에서 class 부분을 따로 변수로 사용하였다.
    - 기타
      - [match](https://developer.mozilla.org/en-US/docs/Web/API/Element/matches) 
        
2. jQuery 로 구현
   - JS 차이점
      ```js
            var commentContainer = $("#commentContainer");
            var pageContainer = $("#pageContainer");
            
            commentContainer.html(pagination.getCommentFormat(pagination.getComments(1)));
            pageContainer.html(pagination.getPageListFormat());
            
            $(document).on("click", "#pageContainer button", function () {
            var page = $(this).html();
            console.log(page);
            commentContainer.html(
            pagination.getCommentFormat(pagination.getComments(page))
            );
            pageContainer.html(pagination.getPageListFormat());
            });
      ```
     - html : 선택한 요소 안의 내용을 가져오거나, 다른 내용으로 바꿉니다. [참고](https://www.codingfactory.net/10324)
   
   
3. React 로 구현
   - 코드
      ```js
        // comments.js
        reducers : {

        // payload.page 페이지 변수
        getComments( state, action ) {    

            // 해당 페이지의 보여질 게시물의 첫번째 번호
            // const start
            const { payload } = action;

            const start =  Math.imul(5, payload.page - 1);

            // 해당 페이지의 보여질 게시물의 마지막 번호
            const limit = start + state.limit;

            // data 변수로 게시물의 배열을 저장합니다.
            // state.data = state.comments.filter();
            state.data = state.comments.filter((_, index) => index >= start && index <= (limit-1));
            // 현재 페이지로 셋팅합니다.
            state.current_page = payload.page;

        }
      ```
      - redux toolkit 라이브러리 를 이용하여 액션 을 정의 하는 부분이다. 
      - 참고 : [redux toolkit](https://redux-toolkit.js.org/api/createSlice)
     ```js
         // PageList.js 
     
         ${({ active }) =>
           active &&
           `
           background: gray;
           color: #fff;
         `}
     ```
     - PageList 에서 props 를 통해서 버튼의 백그라운드를 설정하는 부분이다. 
     - 참고: [style component] (https://kyounghwan01.github.io/blog/React/styled-components/#%E1%84%83%E1%85%A1%E1%84%85%E1%85%B3%E1%86%AB-%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%8B%E1%85%A6%E1%84%89%E1%85%A5-%E1%84%8F%E1%85%A5%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3-import)
