import DiaryItem from "./DiaryItem.js";

const DiaryList = ({onEdit, onRemove, diaryList})=>{
    return (
    <div className="DiaryList">
        <h2>일기 리스트</h2>
        <h4>{diaryList.length}개의 일기가 있습니다.</h4>
    <div>
        {diaryList.map((it)=>(
            <DiaryItem key={it.id} {...it} 
            onEdit={onEdit} onRemove={onRemove} />
        ))}
    </div>
    </div>
    );

};
//undefinded를 내려주는 경우. Props를 기본값을 빈배열로 정해서 전달
DiaryList.defaultProps={
    diaryList:[],
};

export default DiaryList;