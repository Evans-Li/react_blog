
import React, { useRef, useState, useEffect } from 'react'
import { Avatar, Divider, Tooltip, Card, Tag, Tabs, Modal } from 'antd'
import './index.css'
import { serviceUrl } from '../../config/apiUrl'
import axios from 'axios'
import ViewCount from '../ViewCount'
import MyModal from '../MyModal'

import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined
} from '@ant-design/icons'

const config = {
  github: 'https://github.com/Evans-Li',
  qq_image: '/static/qq.jpeg',
  wechat_image: '/static/wechat.jpeg'
}


const Author = (data) => {
  const [visibleqq, setVisibleqq] = useState(false);
  const [visiblewechat, setvisibalewechat] = useState(false);

  const [all_part_count, setAll_part_count] = useState(0);  //总文章数
  const [all_view_count, setAll_view_count] = useState(0);  //总浏览数
  const [isPlay, setIsPlay] = useState(false)
  let playerEl = useRef(null) // audio
  let rotateEl = useRef(null)  // 控制播放暂停元素
  const maskEl = useRef(null)
  let [t, setT] = useState(0)
  var i = 0;
  // useEffect(()=>{
  //   console.log(data)
  // },[])

  const Beat = () => (
    <div className='mm' >
      {
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
          <span key={item}></span>
        ))
      }
    </div>
  )




  var time = () => {
    let time = setInterval(function () {
      if (i === 360) {
        i = 0;
        i++;
      } else {
        i++;
      }
      rotateEl.current.style.transform = `rotate(${i}deg)`;
      if (playerEl.current.paused) {
        setT(i)
        console.log('--- t', t)
        clearInterval(time)
        console.log('定时器清除')
      }
    }, 30);
  }


  //  头像旋转定时器
  let timer = function () {
    time()
  }
  //  音乐播放暂停
  const isPlayeIng = () => {
    if (!isPlay) {  //播放
      maskEl.current.style.background = `rgba(0, 0, 0, .3)`;
      i = t;
      setIsPlay(true)
      //调用定时器 , 使头像旋转
      playerEl.current.play()
      timer();
    } else {  // 暂停
      playerEl.current.pause()
      setIsPlay(false)
      maskEl.current.style.background = `rgba(0, 0, 0, 0)`;
    }
  }


  //获取总浏览数与文章数
  const fetchData = async () => {
    const result = await axios(serviceUrl.getAllPartCount).then(res => {
      return res.data.data;
    })
    setAll_part_count(result[0].total);
    setAll_view_count(result[0].all_view_count);
  }
  useEffect(() => {
    fetchData()
    return () => {
      // clearInterval(aa)

    }
  }, [])
  const clickToShowqq = ()=> setVisibleqq(!visibleqq)
  const clickToCloseqq = () => setVisibleqq(false)
  const clickToshowwechat =() => setvisibalewechat(!visiblewechat)
  const clickToClosewechat = () => setvisibalewechat(false)


  return (
    <div className="author-div comm-box">
      <div>
        <div className='audiol'  >
          <div className='pl-contro' onClick={isPlayeIng}>
            <div className='mask' ref={maskEl}></div>
            {isPlay ? <Beat /> : null}
            <div className='rotate-div' ref={rotateEl}>
              <Avatar size={120} src={'../../static/IMG_1231.JPG'} />
              <audio autoPlay={false} ref={playerEl} controls hidden loop>
                <source src={'../../static/home.m4a'} type="audio/mpeg"></source>
                {/* <source src='https://music.163.com/song?id=30500857&userid=408422666' ></source> */}
              </audio>
            </div>

          </div>
        </div>
        <p className='author-name-p'>Evans</p>
        <p>-- 入门程序员 --</p>
        <div>
          <Tag color="magenta">WEB前端</Tag>
          <Tag color="red">入门程序员</Tag>
          {/* <Tag color="gold">没有经验</Tag> */}
          <Tag color='cyan'>文章共{all_part_count ? <ViewCount value={all_part_count} /> : 0}篇</Tag>
          <Tag color='blue'>共被访问{all_view_count ? <ViewCount value={all_view_count} /> : 0}次</Tag>
        </div>
      </div>
      <div className="author-introduction">
        <Divider>社交账号</Divider>
        <Tooltip placement='bottom' title={<a target='_blank' href={config.github}>&nbsp; {config.github} &nbsp; </a>}>
          <a target='view_window' href='https://github.com/Evans-Li'>
            <Avatar icon={<GithubOutlined />} size={28} className="account" ></Avatar>
          </a>
        </Tooltip>
        <Tooltip placement='bottom' title={<img width='150pxpx' height='200px' alt="qq" src={config.qq_image} onClick={clickToShowqq} />}>
          <MyModal visible={visibleqq} onOk={clickToCloseqq} image={config.qq_image}></MyModal>
          
          <Avatar size={28} icon={< QqOutlined />} className="account" />
        </Tooltip>
        <Tooltip placement='bottom' title={<img width='150pxpx' height='200px' alt="wechat" src={config.wechat_image}  onClick={clickToshowwechat}/>}>
          <MyModal visible={visiblewechat} onOk={clickToClosewechat} image={config.wechat_image}></MyModal>
          <Avatar size={28} icon={< WechatOutlined />} className="account" />
        </Tooltip>
      </div>
    </div>
  )
}


export default React.memo(Author)