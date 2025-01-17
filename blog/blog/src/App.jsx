/* eslint-disable */  //warning 메세지 삭제

import { useState } from 'react';
import './App.css'

function App() {
  // 서버와 통신하는법은 아직 안배웠으니, 변수만들어서 실제 서버에서 가져왔다고 가정
  // 로고의 경우는 자주 변경되지않으니 state보다는 하드코딩이나 변수로 작업하는게 좋다.
  let post = 'react Blog'
  // [state변수명, 변경도와주는 함수]
  let [title, setTitle] = useState(['남자코트 추천', '강남 우동맛집', '파이썬 독학'])
  let [likeCount, setLikeCount] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [selectedTitle, setSelectedTitle] = useState('');




  return (
    <div className="App">
      <div className='black-nav'>
        <h4>{post}</h4>
      </div>

      <button onClick={() => {
        let copy = [...title];
        copy[0] = '여자코트 추천'
        setTitle(copy);
      }}>제목변경</button>

      <button onClick={() => {
        let sort = [...title].sort();
        setTitle(sort)
      }}>가나다순 정렬</button>



      {
        title.map(function (a, i) {
          return (
            <div className="list" key={i}>
              <h4 onClick={() => {
                setModal(!modal);
                setSelectedTitle(a)

              }}>{a}
                <span className='like-btn' onClick={(e) => {
                  // 이벤트 버블링차단
                  e.stopPropagation();
                  let copy = [...likeCount];
                  copy[i] = copy[i] + 1;
                  setLikeCount(copy)

                }}>👍</span> {likeCount[i]}
              </h4>
              <p>1월 9일 발행</p>
            </div>
          )
        })
      }


      {
        // modal == true? <Modal/> : null  // 삼항연산자와 &&연산자가 동일한결과
        // 조건이 단순하다면 &&를 사용하세요.
        // 조건이 복잡하거나 추가될 가능성이 있다면 삼항 연산자를 사용하세요.
        modal && <Modal title={selectedTitle} />}
    </div>
  )
}

function Modal({ title }) {  // 컴포넌트는 대문자사용
  return (
    <div className="modal">
      <h4>{title}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button>글수정</button>
    </div>
  )
}



export default App;
/** 배운것
 *  1. 클래스명은 className으로 작성해야한다. 
 *  2. 변수는 {중괄호}로 만들수있다.
 *    ㄴ 태그 안에 내용이나, id나 class명으로도 변수사용가능
 *    ㄴ 데이터바인딩이라고 한다.
 *  3. 인라인스타일을 넣을땐 무조건 중괄호에 오브젝트 형식으로 넣어야한다.
 *    ㄴ style = { {color: 'red' , fontSize:'16px'} }
 *    ㄴ 주의사항은 -이 들어가는이름은 카멜표기법으로 적어야한다.
 *    ㄴ fonstSize, textDecoration...
 *  4. state란? 
 *    ㄴ js의 디스트럭쳐링과 동일
 *    ㄴ let [title,b] =  useState('남자 코트 추천')
 *    ㄴ 언제쓰는가?
 *        - State는 컴포넌트의 UI 상태를 관리하며, 값이 변경될 때마다 리렌더링을 유발하여 UI를 업데이트합니다.
 *        - 일반 변수는 리렌더링을 유발하지 않으며, 컴포넌트의 상태 변화에 따라 UI를 자동으로 업데이트할 필요가 없는 경우에 사용됩니다.
 *  5. 터미널에 warning 메세지 삭제법
 *    ㄴ 관련된 메세지의 대상들을 수정한다
 *    ㄴ 코드 최상단에(import 위에) eslint-disable 작성하기
 *  6. onClick 이벤트핸들러
 *    ㄴ 인라인스크립트
 *    ㄴ <span onClick={}>👍</span>
 *    ㄴ {}안에는 무조건 함수만 넣어야한다(함수명, 함수한줄로 작성 상관없음)
 *  7. state 변경법
 *    ㄴ [likeCount, ??] ??해당 위치에 함수를넣는다.
 *    ㄴ 해당부분에 꼭써야 재 렌더링이 잘 일어난다.
 *    ㄴ 변수1 & 변수2의 참조값이 같으면, 변수1 == 변수2는 true가 나옴
 *    ㄴ !!! state 변경함수 특징 !!!
 *        ㄴ 기존state == 신규state가 ture일 경우 변경되지않음
 *        ㄴ 신규배열 = 기존배열 로 복사(얕은복사)한다면 내가 내용을 변경해도 state가 변경된것을 인지하지 못함.
 *        ㄴ 즉, 참조값이 같으면 변경을 인지못함
 *        ㄴ let copy = [...title] 방법으로 작업하면 됨.
 *  8. 컴포넌트 만드는 법
 *    ㄴ 1) function 생성
 *    ㄴ 2) return()안에 컴포넌트화 하고싶은 코드담기
 *    ㄴ 3) html에서 원하는 위치에 <함수명></함수명> 쓰기
 *      ㄴ 컴포넌트는 함수명 첫글자를 대문자로 사용(클래스함수도 첫글자대문자)
 *    ㄴ return안에 html을 작성할때는 하나의 태그로 크게 감싸야한다(wrap처럼)
 *    ㄴ 만약 1개이상의 태그를 나란히 놓아야한다면 큰 div로 다시감싸야한다.
 *        - 의미없는 div는 <></>로 사용가능하다. (fragment 문법)
 *  9. 컴포넌트를 사용하면 좋은 유형
 *    1) 반복적인 html을 축약할때
 *    2) 큰 페이지를 컴포넌트화 할수 있다
 *    3) 자주변경되는 것들을 컴포넌트화하면 성능적으로 이득이다(무조건은 아님)
 *  10. 컴포넌트의 단점
 *    1) state를 가져다쓸때 연결이 안됨.(다른 함수에 있기때문에)
 * 
 * 
 * 

*/