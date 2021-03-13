import React from 'react'
import { BackTop } from 'antd'
import './index.css'

import { ArrowUpOutlined,VerticalAlignTopOutlined  } from '@ant-design/icons'


const BackTopBtn = ()=>{
  return(
      <BackTop visibilityHeight={300} >
        <div className='back-top'>
          {/* <div className='horizontal'></div> */}
          {/* <VerticalAlignTopOutlined   style={{ fontSize: '31px', color: '#ffffff'}}/> */}
          <div className="top-triangle"></div>
        </div>
      </BackTop>
  )
}

export default BackTopBtn