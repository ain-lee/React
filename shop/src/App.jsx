// 제품 클릭 시 datail/제품id로 이동되게 하기

import { Navbar, Container, Nav } from 'react-bootstrap'
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import data from './data.jsx'
import Detail from './pages/Detail.jsx'
import axios from 'axios'


function App() {
  let [shoes, setShoes] = useState(data)
  // use로 시작하는것들은 hook이라고 부름.
  // hook이란 유용한 것들이 들어있는 함수
  // useNavigate는 페이지 이동을 도와주는 함수
  let navigate = useNavigate();


  return (
    <div className='App'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail/0') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='*' element={<div>존재하지 않는 페이지입니다.</div>} /> {/* '*'는 이 외의 모든것을 뜻함 */}
        <Route path='/' element={<Main shoes={shoes} setShoes={setShoes}/>} />

        {/* 페이지 여러개만들고싶으면 url파라미터 사용 */}
        <Route path='/detail/:id' element={<Detail shoes={shoes} />} />

        <Route path='/about' element={<About />}>
          {/* nested routes 라고함, 태그안에 태그라는뜻 */}
          {/* nested routes는 about과 안의 라우터를 함께보여줌 */}
          <Route path='member' element={<div>멤버 페이지임</div>} />
          <Route path='location' element={<div>위치정보 페이지임</div>} />
        </Route>
        <Route path='/event' element={<Event />}>
          <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
        </Route>
      </Routes>

    </div>
  )
}
// About 페이지
function About() {
  return (
    <>
      <h4>About페이지임</h4>
      {/* Outlet는 구멍(파라미터)와 동일, 하위라우터를 보여줌 */}
      <Outlet></Outlet>
    </>
  )
}
// Event 페이지
function Event(){
  return(
    <>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </>
  )
}

// 메인페이지
function Main(props) {
  return (
    <>
      <div className='main-bg'></div>

      <button onClick={()=>{
        let copy = [...props.shoes]
        copy.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)

        props.setShoes(copy)
      }}>가나다 변경</button>
      <div className="container">
        <div className="row">
          {props.shoes.map((item, index) => {
            return (
              <div className="col-md-4" key={index}>
                <img src={`https://codingapple1.github.io/shop/shoes${item.id + 1}.jpg`} width='80%' alt="" />
                <h4>{item.title}</h4>
                <p>{item.content}</p>
                <p>{item.price}</p>
              </div>
            )
          })}

          {/* {props.shoes.map((item, index) => {
            return (
              <Product shoes={shoes[index]} i={index + 1} key={index} />
            )
          })} */}
        </div>
      </div>
      <button onClick={(props)=>{
        axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((result)=>{
            let copy = [...props.shoes, ...result.data]
            console.log(copy)
          })
          .catch(()=>{
            console.log('실패')
          })
      }}>버튼</button>
    </>
  )
}



// 상품카드(안씀?)
function Product(props) {
  return (
    <div className="col-md-4">
      <img src={`https://codingapple1.github.io/shop/shoes${props.i}.jpg`} width='80%' alt="" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  )
}

export default App;
