import React from 'react'
import {Button } from 'antd'



const LoadMore  = ({onloadMore})=>{

  return(
    <>
    <Button
      type='primary'
      color='#E4F0FD'
      style={{width:'100%',}}
      onClick={onloadMore}
     > 加载更多文章</Button>
    </>
   
  )
}


export default LoadMore;