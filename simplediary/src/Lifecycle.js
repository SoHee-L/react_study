import React, {useEffect, useState } from "react";
//자식 컴포넌트 하나 생성 그동안은 컴포넌트 1에 파일1 원칙을 중시했는데
//사실 그게 절대적인 법칙은 아님 하나의 파일에 두개의 컴포넌트를 만들어도 문제가 일어나진않음.
//가독성때문에 원칙을 중시하는 것.
const UnmountTest = ()=> {
    
    useEffect(()=>{
        console.log("Mount!");
        return ()=>{
            // Unmount 시점에 실행되게 됨.
            console.log("Unmount!");
        }
    },[]);

    return <div>Unmout Testing Component</div>
};

const Lifecycle = ()=>{
    const [isVisible, setIsVisible] = useState(false);
    const toggle = ()=> setIsVisible(!isVisible);

    return (
    <div style={{pedding: 20}}>
        <button onClick={toggle}>ON/OFF</button>
        {isVisible && <UnmountTest/>}
    </div>
    );
};
export default Lifecycle;