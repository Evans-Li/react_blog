import React, { useState, useEffect } from 'react'
import {  Badge, Tooltip } from 'antd'
import { LikeFilled, LikeOutlined, QqOutlined, WechatOutlined, CommentOutlined } from '@ant-design/icons'
import QRCode from 'qrcode.react'
import { useCookies } from 'react-cookie';
import './index.css'
import { serviceUrl } from '../../config/apiUrl'
import { $GET, $POST } from '../../config/request'


// 用户未操作按钮样式
const iconStyleN = {
  fontSize: 20,
  // color: '#8C939F'
}

// 用户已操作按钮样式
const iconStyleY = {
  fontSize: 19,
  color: '#3280F6'
}

// 徽章数字
const offset = [12, -5]

const Share = ({ props }) => {
  const [likeCount, setLikeCount] = useState(0) // 点赞数
  const [isLike, setIsLike] = useState(false) // 是否已经点赞
  const [commentCount, setCommentCount] = useState(99);
  const [cookies, setCookie, removeCookie] = useCookies(['isLike']);
  let shareQQData = {
    baseUrl: '',
    title: props.title,
    pics: 'https://avatars3.githubusercontent.com/u/43921905?s=460&u=c3c3c4a5c2c24429ed937763546455b9c17f8b35&v=4',
    desc: props.title
  }

  // 判断当前环境  
  if (process.env.NODE_ENV == 'development') {
    shareQQData.baseUrl = `http://101.200.153.19${props.url.asPath}`
  } else if (process.env.NODE_ENV == 'production') {
    shareQQData.baseUrl = `http://101.200.153.19${props.url.asPath}`
  }

  let shareQQUrl = `http://connect.qq.com/widget/shareqq/index.html?url=${shareQQData.baseUrl}&sharesource=qzone&title=${shareQQData.title}&pics=${shareQQData.pics}&summary=${shareQQData.desc}`
  let shareWechatData = {
    qrUrl: shareQQData.baseUrl,
    logo: shareQQData.pics
  }


  

  // qq分享
  const handleQQshare = () => {
    window.open(shareQQUrl, '_blank')
  }

  // 点赞按钮渲染函数
  const renderLike = () => (
    <div>
      <span onClick={handleLike} className={!!isLike ? 'btn btn-active' : 'btn btn-no-active'} >
        <Badge  count={likeCount} offset={offset} showZero>
          {
            !!isLike && isLike ?
              <LikeFilled style={iconStyleY} />
              :
              <LikeOutlined style={iconStyleN} />
          }
        </Badge>
      </span>
    </div>
  )


  // 跳转到评论 锚点
  const renderToComment = () => (
    <div>
      <span className='btn' >
        <a href='#comment-box' className='share-qq'>
          <Badge count={commentCount} offset={offset} overflowCount={99} style={{backgroundColor:'#70ACF9'}}>
            <CommentOutlined style={iconStyleN} />
          </Badge>
        </a>
      </span>
    </div>
  )

  //QQ分享
  const renderShareQQ = () => (
    <div>
      <span className='btn' >
        <a className='share-qq' onClick={handleQQshare} >
          <QqOutlined style={iconStyleN} />
        </a>
      </span>
    </div>
  )

  // 微信分享
  const renderShareWechat = () => (
    <div className='share-wechat-warp'>
      <span className='btn share-wechat-hover' >
        <a className='share-wechat' >
          <WechatOutlined style={iconStyleN} />
        </a>
      </span>
      <div className='share-wechat-qr'>
        <QRCode
          value={shareWechatData.qrUrl}// 生成二维码的内容
          size={100} // 二维码的大小
          fgColor="#000000" // 二维码的颜色
        />
      </div>
      
    </div >
  )

  

  //  获取点赞数
  const fetchLikeCount =()=>{
    let id = props.id
    $GET(serviceUrl.getLikeCount + id).then( res =>{
      setLikeCount(res.data.data[0].like_count)
    }).catch(()=>{
      console.log('点赞数获取失败');
    })
  }

  //点赞
  const handleLike = () => {
    let dataProps = {
      id: props.id
    }
    $POST(serviceUrl.doLike, dataProps).then((res)=>{
      setIsLike(true)
      fetchLikeCount()
    })
  }

  // 获取文章评论数
  const fetchCommCount = ()=>{
    $GET(serviceUrl.getArticleCommentCountById + props.id).then((res) => {
      setCommentCount(res.data.data[0].count)
    }).catch((e)=>{
      console.log(e)
    })
  }


  useEffect(()=>{
    fetchLikeCount()
    fetchCommCount()
  },[])


  return (
    <div>
      <div className='share'>
        {/* {renderLike()} */}
        {renderToComment()}
        <span className='share-text'>分享</span>
        {renderShareQQ()}
        {renderShareWechat()}
      </div>
    </div>

  )
}

export default Share