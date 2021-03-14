import React, { useState, useEffect } from 'react'
import ReactCSSTransitionGroup from 'react-transition-group'; // ES6

import Router from 'next/router'
import { Row, Col, Menu, Spin } from 'antd'
import axios from 'axios'
import { serviceUrl } from '../../config/apiUrl'
import './index.css'
import {
  HomeOutlined,
  YoutubeOutlined,
  ReadOutlined,
  SmileOutlined,
  MenuOutlined
} from '@ant-design/icons'



const Header = () => {
  const [typeInfo, setTypeInfo] = useState([])
  useEffect(() => {
    const fetchType = async () => {
      const result = await axios(serviceUrl.getTypeInfo).then((res) => {
        setTypeInfo(res.data.data)
        return res.data.data
      })
      setTypeInfo(result)
    }
    fetchType()
  }, [])

  const handleClick = (e)=>{
    if(e.key == '0'){
      Router.push('/index')
    }else{
      Router.push('/list?id=' + e.key)
    }
  }
  

  return (
  <div>

      <div className="header">
        <Row type="flex" justify="center" >
          <Col xs={20} sm={20} md={6} lg={11} xl={7} className='blog-title'>
            <span className="header-logo"><a href='/'>&nbsp;&nbsp;&nbsp;Evans &nbsp;</a></span>
            {/* <span className="header-txt">-- while( !(succeed == try()) )</span> */}
            <span className="header-txt">深入技术 看看世界</span>
          </Col>


          <Col className="memu-div" xs={3} sm={4} md={2} lg={2} xl={7}>

            <Menu mode="horizontal"
              style={{marginRight:'10px',height:'70px'}}
              overflowedIndicator={<MenuOutlined />}
              title='菜单'
              onClick={handleClick}
            >
              <Menu.Item key="0">
                <HomeOutlined />首页
              </Menu.Item>
              <Menu.Item key={1}>
                <YoutubeOutlined/> 实用技术
              </Menu.Item>
              <Menu.Item key={2}>
                <ReadOutlined/> 个人笔记
              </Menu.Item>
              <Menu.Item key={3}>
                <SmileOutlined/> 快乐生活
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </div>
    </div>
  )

}

export default Header