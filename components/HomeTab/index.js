import React from 'react'
import './index.css'
import {  Tabs } from 'antd'
import { QqOutlined } from '@ant-design/icons'
const { TabPane } = Tabs

const qqList = [0,1,2,3,4].map((item,index)=>{
  return {
    href: 'https://shang.qq.com/wpa/qunwpa?idkey=b579b0054e58fea7d7e41e529c2dd415d7e0632c1f95a00c065513d8763a202e',
    text: `前端${index+1}群:创造404(3000人)`
  }
})

const HomeTab = () => {
  return (
    <div className='comm-box home-tab'>
      <Tabs >
        <TabPane tab="QQ群" key="1">
          <div>
            <p className='qq-tips'>加入QQ群一起学习!!</p>
            {
              qqList.map((item,index) => (
                <p key={index+item}><a key={item+index} target="_blank" href={item.href}><QqOutlined /><span className='text'>{item.text}</span></a></p>
              ))
            }
          </div>
        </TabPane>
        <TabPane tab="公众号" key="2">
          <div>
            <p className='tab-h'>即将上线...</p>
          </div>
        </TabPane>

        <TabPane tab="小密圈" key="3">
          <div>
            <p className='tab-h'>即将上线...</p>
          </div>
        </TabPane>
      </Tabs>


    </div>
  )
}

export default HomeTab