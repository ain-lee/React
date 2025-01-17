/* eslint-disable */  //warning 메세지 삭제
// 날짜바꾸기

import { useState } from 'react';
import './App.css'

function App() {
  let logoName = 'React Blog';
  let [title, setTitle] = useState(['강남맛집', '서초맛집', '반포맛집', '인천맛집']);
  let [titleNum, setTitleNum] = useState(0);
  let [likeCount, setLikeCount] = useState([0, 0, 0, 0]);
  let [date, setDate] = useState(`2025.01.14`)  //date 바꾸기
  let [modal, setModal] = useState(false);
  let [inputValue, setInputValue] = useState('');


  return (
    <div className="App">
      <div className='black-nav'>
        <h4>{logoName}</h4>
      </div>

      <input type="text" onChange={(e)=>{
          // state변경함수는 늦게처리됨. 비동기방식
          // 진행순서 console.log → setInputValue(e.target.value); 
            setInputValue(e.target.value); 
        }}/>
      <button onClick={(e)=>{
          // 1. 배열을 copy한다.
          // 2. 원하는 기능을 넣는다
          // 3. set변수의 ()괄호 안에 copy변수를 넣는다.
          if(inputValue == ''){return}
          let titleCopy = [...title];
          let likeCountCopy = [...likeCount]
          let getToday = ()=>{
              let date = new Date();
              let year = date.getFullYear();
              let month = ("0" + (1 + date.getMonth())).slice(-2);
              let day = ("0" + date.getDate()).slice(-2);
          
              return year + "." + month + "." + day;
          }
          
          titleCopy.unshift(inputValue)
          likeCountCopy.unshift(0)

          setTitle(titleCopy)
          setLikeCount(likeCountCopy)
          setDate(getToday)
          console.log(e.target)
          
      }}>글 발행</button>


      {title.map(function(a, i){
          return(
            <div className='list' key={i}>
              <h4 onClick={() =>{
                    setModal(!modal); 
                    setTitleNum(i)
                }} style={{cursor:'pointer'}}>
                {a} 
                  <span className='like-btn' onClick={(e) => {
                      e.stopPropagation();
                      let copy = [...likeCount];
                      copy[i] += 1;
                      setLikeCount(copy)
                  }}> 👍 {likeCount[i]}</span>
              </h4>
              <p>{ date }</p>
              <button onClick={(e)=> {
                  let copy = [...title]
                  copy.splice(i, 1)
                  setTitle(copy)
              }}>삭제</button>
            </div>
          )
        })
      }

      

      {modal && <Modal title={title} titleNum={titleNum}/>}

    </div>
  )
  

  // Modal
  function Modal(props) {
    return(
      <div className="modal">
          <h4>{props.title[titleNum]}</h4>
          <p>날짜</p>
          <p>상세내용</p>
      </div>
  
    )
  }
}




export default App;

/** Class 작성법
 * 
 * class Modal2 extends React.Component {
      constructor(props){
        super(props);
        this.state = {
          name : 'kim',
          age : 20
        }
      }

      render(){
        return (
          <div>안녕 { this.props.프롭스이름 }</div>
        )
      }
    }
 */