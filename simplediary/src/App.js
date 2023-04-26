import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import Lifecycle from './Lifecycle';

//comments를 사용하기 위한 url 주소
//https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);
  //api를 호출하는 함수 getData가 promise로 반환하는 비동기함수로 만듬. 
  const getData = async()=>{
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res)=>res.json());
    console.log(res);
  }

  const onCreate = (author, content, emotion) =>{
    const create_date = new Date().getTime();
    const newItem = {

      author,
      content,
      emotion,
      create_date,
      id: dataId.current,
    };
    dataId.current +=1;
    setData([newItem, ...data]);
  };

  const onRemove =(targetId)=>{
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it)=>it.id !== targetId);
    console.log(newDiaryList);
    setData(newDiaryList);

  };

  const onEdit = (targetId, newContent)=>{
    setData(
      data.map((it)=>
      it.id === targetId ? {...it, content:newContent}: it
      
      ) 
    )

  }
  return (
    <div className="App">
      <Lifecycle/>
      <DiaryEditor onCreate ={onCreate}/>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>

    </div>
  );
}

export default App;
