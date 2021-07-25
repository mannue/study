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
        
