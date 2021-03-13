import React, { useState, useEffect} from 'react'

const ViewCount = (value) => {
  const [count, setCount ] = useState(0)
  const step1 = 501
  const step2 = 21
  const style = {
    // width: '60px',
    padding:'0 5px 0 0'
  }

  useEffect(()=>{
    let c = value.value
    if(c <= 0){
      return
    }
    let i = 1;
    const timer = ()=>{
      let time = setInterval(() => {
        if(c>10000){
          if(i+step1>c){
            i++
          }else{
            i+=step1
          }
        }else if(c>1000){
          if(i+step2>c){
            i++;
          }else{
            i+=step2
          }
        }else{
          i++;
        }
        // 大于count就停止
        if(i>c){
          clearInterval(time)
          return
        }
        setCount(i)
      }, 3);
    }
    //调用定时器
    timer()
  },[])
  return (
    <>
      <span style={style} >
        {count}
      </span>
    </>
  )
}

export default React.memo(ViewCount)