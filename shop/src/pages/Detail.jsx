// input에 숫자가아닌 텍스트 입력 시 alert창 띄우기

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
/**styled-components를 쓰는이유
    1. CSS 파일 오픈할 필요없이 JS 파일에서 바로 스타일넣을 수 있습니다.
    2. styled-components는 다른 JS 파일을 오염시키지 않습니다. 원래 App.css파일은 오염됩니다.
        app.css에서 스타일주면, 모든페이지에 적용됨.
        해당 파일에서만 적용되게 하려면, css명을 변경하면됨
            ㄴ App.css → App.module.css
            ㄴ Detail.css → Detail.module.css
    3. 페이지 로딩시간 단축됩니다.
*/
/** 단점 
 *  1. js파일이 매우복잡해짐(그냥 컴포넌트인지, 스타일컴포넌트인지 구분안됨. 둘다 대문자로 시작)
 *  2. 다른파일에서도 사용하고싶으면 컴포넌트간 import할텐데 그러면 css와 다를바없음
 *  3. 협업시 css담당의 숙련도 이슈(동료가 css를 잘못할수도, 이문장을 모를수도, 익숙하지 않을수도있음.)
 * 
*/

// let Btn = styled.button`
//     background:${props => props.bg};
//     color:${props => props.bg=='black'? '#fff':'#000'};
//     padding:0 10px;
// `
// let NewBtn = styled.button(Btn)`
//     padding:20px;
// `

function Detail(props) {
    let { id } = useParams();
    let 찾은상품 = props.shoes.find((x) => x.id == id)
    let [alert, setAlert] = useState(true)

    useEffect(() => {
        let time = setTimeout(() => { setAlert(false) }, 2000)
        return () => {
            // 기존 타이머 삭제
            clearTimeout(time)
            // 기존 데이터요청 삭제
        }
    }, [])
    // [] 안에는 아무변수나 state를 넣을 수 있다.
    // [] 없을때는 컴포넌트가 mount, update될때 마다 useEffect가 실행된다.
    // []만 적는다면, mount때만 실행되고, 컴포넌트가 update 될때는 실행되지 않는다.
    // [변수]가 있으면 처음에 mount, update될때 실행되는건 똑같지만 그 후는 [변수]의 상태가 변할때만 실행된다.
    // useEffect안의 return문은 useEffect동작 전에 실행된다.(별명: clean up function)
    //      ㄴ 보통 retrun문 안에 기존코드 지우는것 많이 작성함
    //      ㄴ 타이머쓸때 return문 안에 '기존 타이머 제거'코드를 넣는다 (쓸데없는 비효율코드 방지용)
    //      ㄴ 서버로 데이터 요청시 1,2초 소요됨, 그안에 재랜더링하면 요청이 계속쌓이고 버그생김
    // clean up fnction은 mount때는 실행안됨, unmount시 실행됨.

    /** 빡통식 요약
     *  useEffect(()=>{ 실행할코드 })        1. 재랜더링마다 코드실행(mount, update마다 실행됨)
     *   
     *  useEffect(()=>{ 실행할코드 }, [])    2. mount시 1회 실행가능(update는 실행안됨)
     *  
     *  useEffect(()=>{ 
     *       return()=>{
     *           ~~코드~~                    3. useEffect안의 코드 실행전에 먼저 실행
     *       }
     *   })
     *  
     *  useEffect(()=>{ 
     *       return()=>{
     *           ~~코드~~                    4. unmount시 1회 실행
     *       }
     *   },[])
     * 
     *  useEffect(()=>{ 
     *      ~~코드~~                         4. mount와 [변수명]이 변경될때만 실행
     *   },[변수명])
     */


    return (
        <div className="container">
            {/* <Btn bg='black'>버튼</Btn>
           <NewBtn bg='pink'>버튼</NewBtn> */}
            {
                alert == true
                    ? <div className="alert alert-warning">
                        2초이내 구매 시 할인
                      </div>
                    : null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${찾은상품.id + 1}.jpg`} width="100%" />
                </div>
                <div className="col-md-6">
                    <input type="text"/>
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;


/** 컴포넌트의 Lifecycle
 *  mount - 페이지에 장착될때, 컴포넌트가 보일때(해당페이지에 들어갈때)
 *  update - 업데이트
 *  unmount - 제거될때, 컴포넌트가 안보일때(해당페이지에서 나갈때)
 * 
 *  1. 배우는이유
 *      - 컨포넌트가 장착되거나, 업데이트될때 간섭가능(코드실행 가능)
 * 
 *  2. 예전 사용법(class)
 *      class Detail2 extends React.Component{
 *          componentDidMount(){
 *              // 컴포넌트 mount 시 실행할 코드
 *          }
 *          componentDidUpdate(){
 *              // 컴포넌트 update 시 실행할 코드
 *          }
 *          componentWillUnmount(){
 *              // 컴포넌트 unmount 시 실행할 코드
 *          }
 *      }
 * 
 *  3. 요즘 사용법(만들어진 function안에 useEffect())
 *      // 만들어진 컨포넌트
 *      function Detail(props){
 *          useEffect(()=>{
 *              // 컴포넌트 mount,update 시 코드실행
 *          })
 *      }
 *  4. useEffect 쓰는 이유
 *      - 사실 useEffect안에 console찍는거나, 그냥 밖에다가 console찍는거나 동일하게 작동함.
 *      - Q. 근데 왜 사용하는걸까?
 *             A. 동작원리 때문임.
 *                  ㄴ 밖에다 쓰는거랑 실행시점이 조금다름
 *                  ㄴ js, html 랜더링이 다 된 다음에 실행됨(밖에다 쓰는거는 랜더링 안돼도 실행됨)
 *                      ㄴ 시간이 많이걸리는 반복문 실행 시 랜더링 다된 상태에서 반복되니까 화면은 그려진상태임(실행흐름: 랜더링 → useEffect안의 코드)
 *                      ㄴ 효율적이고 빠른느낌을 줄수있음
 *                  ㄴ 시간이 오래걸리는 코드나, 서버에서 데이터 가져오는작업, 타이머작업 등 은 useEffect안에 쓰는게 좋은관습이다.
 *  5. 왜 이름이 Effect인가?
 *      - Effect: 효과
 *      - 프로그램 용어 중 하나가 side-effect가 있는데 함수의 핵심기능과 상관없는 부가기능을 뜻함.
 *      - side-effect에서 따온 글자라서 useEffect라고 만듬
 * 
 */