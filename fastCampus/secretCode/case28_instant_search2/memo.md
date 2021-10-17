### Instant Search 2
1. 요구사항
    - 사용자 검색값을 Rest API 통해 결과 값을 Text List 에 보여준다 
    - 해당 검색이 없는 경우 검색 입력값이 없다고 알려준다.
   
2. Js 구현
    - 개인 구현 
    ```js
        $searchInput.addEventListener('input',  async ($input) => {
        const query = $input.target.value;
        
        if (!query) return
        $loadingIndicator.style.visibility = 'visible';
    
        const res = await fetch(`${API_URL}?q=${query}`);
    
        await res.json().then((items) => {
            $loadingIndicator.style.visibility = 'hidden';
            if (!items.length) {
                $textList.innerHTML = ''
                $textList.style.visibility = 'hidden'
                $infoParagraph.innerHTML = '해당하는 검색어가 없습니다.'
                return
            }
            $infoParagraph.innerHTML = ''
            $textList.innerHTML = items.map((item) => `<li>${item.name}</li>`).join('')
            $textList.style.visibility = 'visible'
            }, () => {
            $textList.innerHTML = ''
            $textList.style.visibility = 'hidden'
            $infoParagraph.innerHTML = '서버 에러 발생'
            })
        });
    ```
   - 
   - fetch 함수를 통해 Rest Api 를 호출하고 loadingIndicator 을 visible 로 변경하여 검색중이라는 메시지를 표시한다.
   - 곁과값이 있는 경우 json 으로 변환하여 해당 값이 있으면 기존의 infoParagraph 를 초기화 하고 text list 에 출력한다.
   - 만약 값이 없는 경우 infoParagraph 에 내용을 출력한다.
