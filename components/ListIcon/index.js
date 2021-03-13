import React from 'react';
import { Tag } from 'antd'
import ViewCount from '../../components/ViewCount'
import './index.css'
import '../../static/style/pages/index.css'
import {
  CalendarOutlined,
  FileOutlined,
  FireTwoTone
} from '@ant-design/icons'

const style = (istop = false) => ({
    display: 'inline-block',
    padding: '0 20px',
  })
const ListIcon = ({ item, className = '', isTop = false, media='' }) => {
  return (
    <div className={`list-icon ${className} `}>
      {isTop
        ? 
        <div className="listicon-istop-box">
          <Tag style={style()} color='red'>置顶</Tag>
        </div>
        :
         null}
          <span>
            <CalendarOutlined />{item.addTime}
          </span>
          <span>
            <FileOutlined />{item.typeName}
          </span>
          <span>
            <FireTwoTone twoToneColor='#f0732e' /><ViewCount value={item.view_count} />人
          </span>
    </div>

  )
}



export default ListIcon