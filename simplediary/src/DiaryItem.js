import { useRef, useState } from "react";

const DiaryItem = ({onEdit,onRemove, author, content, create_date, emotion, id})=>{

    //현재 수정중인지 아닌지 구분해줄 state
    //isEdit가 true라면 수정중으로 간주해서 jsx 코드를 작성하고 false면 지금처럼 content가 나옴.
    const [isEdit, setIsEdit] = useState(false);
    //만약 toggleIsEdit이 호출이 되면 setIsEdit이 호출이 되면서 not 연산을 통해
    //isEdit이 true였다면 false로 바뀌고 false였다면 true로 바뀌는 반전 연산이 실행됨.
    const toggleIsEdit = ()=> setIsEdit(!isEdit);

    //textarea에 input을 핸들링할 곳.
    //useState(content);에 ""가 아닌 content를 넣으면 전의 data를 불러옴.
    const [localContent, setLocalContent] = useState(content);

    //focus 효과를 위한 함수.
    const localContentInput = useRef();

    //onClick 부분이 가독성이 좋지않아 밖으로 빼줌.
    const handleRemove = ()=>{
        if(window.confirm(`${id}번재 일기를 정말 삭제하시겠습니까?`)){
            //확인버튼을 누른다면
            onRemove(id);
        }
    };

    //수정 취소를 눌러도 전에 데이터가 아닌 수정데이터를 불러오기 때문에 전의 데이터를
    //불러오기 위한 함수.
    const handleQuitEdit = ()=>{
        setIsEdit(false);
        setLocalContent(content);

    }

    //수정을 위한 함수.
    const handleEdit = () =>{
        if(localContent.length <5){
            localContentInput.current.focuse();
            return;
        }
        if(window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)){
            
            onEdit(id, localContent);
            toggleIsEdit();
        }
    };


    

    return (
    <div className="DiaryItem">
        <div className="info">
            <span> 
                작성자 : {author} | 감정점수 : {emotion} 
            </span>
            <br />
            <span className="date">{new Date(create_date).toLocaleDateString()}</span>
        </div>
        <div className="content">
            {isEdit ? 
                (<>
                    <textarea 
                    ref={localContentInput}
                    value={localContent} onChange={(e)=>setLocalContent(e.target.value)} />
                </>) : (<>{content}</>)}
        </div>

            {isEdit ? (<>
                <button onClick={handleQuitEdit}>수정 취소</button>
                <button onClick={handleEdit} >수정 완료</button>
            </>):(
            <>
            <button onClick={handleRemove}>삭제하기</button>
            <button onClick={toggleIsEdit}>수정하기</button>
            </>)}



        
    </div>
    );
};
 
export default DiaryItem;