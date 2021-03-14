import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { Row, Col, List, Spin, Card, Affix, message } from 'antd'
import '../static/style/pages/index.css'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import HomeTab from '../components/HomeTab'
import axios from 'axios'
import Link from 'next/link'
import { serviceUrl } from '../config/apiUrl'
import hljs from "highlight.js"
import marked from 'marked'
import 'highlight.js/styles/monokai-sublime.css';
import { Helmet } from 'react-helmet'
import { FileOutlined,CheckSquareTwoTone } from '@ant-design/icons'
import BackTopBtn from '../components/BackTopBtn'
import ListIcon from '../components/ListIcon'
import Transition from '../components/Transtion'
import { $POST, $GET } from '../config/request'
import '../static/style/md.css'
import LoadMore from '../components/LoadMore';
import LoadingPage from '../components/Loading';


// 延迟函数
export const _awaitFn = async (millisecond)=>{
  return  await new Promise((resolve, reject)=>{
    setTimeout(() => {
      resolve(`成功延迟 ${millisecond} `)
    }, millisecond);
  })
}
const renderer = new marked.Renderer();
marked.setOptions({
  renderer: renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  sanitize: false,
  xhtml: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

const Home = (list) => {
  const [mylist, setMylist] = useState(list.data || []);
  const [topList, setTopList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [media, setmedia] = useState('')
  const [pagemum, setPageNum] = useState(2);
  const [showLoadingPage, setShowLoadingPage] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(true);

  
  //进入文章loading
  const changeLoading = async() => {
    // await _awaitFn(1500);
    setShowLoadingPage(true);
  }
  let tempList = [];  // 文章list
  useEffect(() => {
    let w = document.querySelector('body').offsetWidth;
    if (w < 1200) {
      setmedia('isPhone')
    }
  }, [])
  //  获取置顶文章
  useEffect(() => {
    $GET(serviceUrl['getTopArticle'])
      .then((val) => {
        setTopList(val.data.data);
      })
  }, [])
  
  //加载更多文章
  const _onLoadMore = async () => {
    
    setShowLoadingPage(true);
    let dataProps = {
      pagemum,
    }
    await _awaitFn(1500); //  执行延迟函数
    await $POST(serviceUrl['getArticle'], dataProps)
      .then( (val) => {
        setShowLoadingPage(false);
        if (val.data.success == false) {
          console.log(val.data.msg);
          setShowLoadMoreBtn(false);
          // message.success(val.data.msg);
          message.success({
            icon:<CheckSquareTwoTone />,
            content: val.data.msg,
            style:{ color:'#fff'},
            duration: 2,
          })
        } else {
          tempList = mylist;
          let valtmplist = val.data.data;
          if(valtmplist.length == 0){
            console.log('vallist',0)
            return ;
          } else {
            for (let i = 0; i < valtmplist.length; i++) {
              for (let j = 0; j < tempList.length; j++) {
                if (valtmplist[i].id == tempList[j].id) {
                  valtmplist.splice[i, 1];
                  i--;
                }
              }
            };
            valtmplist.map((i) => {
              tempList.push(i);
            });
            setMylist(tempList);
            setPageNum((val.data.pageNum + 1))
          }
        }
      })
  }


  const renderTopList = (list) => {
    return (
      <div>
        {
          list.length > 0 ?
            <div>
              <List
                // header={<div></div>}
                itemLayout="vertical"
                dataSource={list}
                renderItem={(item, index) => (
                  <div className='list-item-warp'>
                    <Spin spinning={isLoading}>
                      <Card
                        hoverable
                        bordered={false}
                        className='list-item'
                      >
                        <List.Item>
                          <div className="list-title">
                            <Link href={{ pathname: '/Details', query: { id: item.id } }}>
                              <a onClick={changeLoading}>{item.title}</a>
                            </Link>
                          </div>
                          <div className='artTop-responsive-box'>
                            <ListIcon media={media} item={item} className='list-icon' isTop />
                          </div>
                          <div className="list-context"
                            dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}>
                          </div>
                          <div className='list-go'>
                            <FileOutlined />
                            <span><Link href={{ pathname: '/Details', query: { id: item.id } }}>
                              <a onClick={changeLoading}>	&nbsp; 查看全文 &gt;</a>
                            </Link> </span>
                          </div>
                        </List.Item>
                      </Card>
                    </Spin>
                  </div>
                )}
              />
            </div>
            :
            null
        }
      </div>
    )
  }

  const renderItem = () => {
    return (
      <div>
        { !!topList.length > 0 ? renderTopList(topList) : null}
        {
          mylist.length > 0
            ?
            <List
              header={<div style={{ padding: '20px 0 0 20px' }}>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={(item, index) => (
                <div className='list-item-warp' >
                  <Spin spinning={isLoading}>
                    <Card
                      hoverable
                      bordered={false}
                      className='list-item'
                    >
                      <List.Item>
                        <div className="list-title">
                          <Link href={{ pathname: '/Details', query: { id: item.id } }}>
                            <a onClick={changeLoading}>{item.title}</a>
                          </Link>
                        </div>
                        <ListIcon item={item} className='list-icon' />
                        <div className="list-context"
                          dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}>
                        </div>
                        <div className='list-go'>
                          <FileOutlined />
                          <span><Link href={{ pathname: '/Details', query: { id: item.id } }}>
                            <a onClick={changeLoading}>	&nbsp; 查看全文 &gt;</a>
                          </Link> </span>
                        </div>
                      </List.Item>
                    </Card>
                  </Spin>
                </div>
              )}
            />
            :
            null
        }
      </div>

    )
  }
  
  return (
      <div className='wrap'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Evans-blog-首页</title>
        <body style='background: url(../../../static/floor-tile.png)'></body>
      </Helmet>

      <Affix offsetTop={0}>
        <Header>
          <title>Home</title>
        </Header>
      </Affix>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={10}   >
          {/* <LXAnimation  items={renderItem()}> 
          </LXAnimation> */}
         <Transition
            timeout={3000}
            classNames={'fly'}
            appear={true}
            unmountOnExit={true}
            item={renderItem}
          />
          { showLoadMoreBtn ? <LoadMore onloadMore={_onLoadMore} /> : null}
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Affix offsetTop={70}>
            <HomeTab />
            <Advert />
          </Affix>
        </Col>
      </Row>
      <Footer />
      <BackTopBtn />
      { showLoadingPage ? <LoadingPage /> : null }
    </div>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve, reject) => {
    axios.post(serviceUrl['getArticle'], { pagemum: 1 })
      .then(
        (res) => {
          console.log('init');
          resolve(res.data)
        }
      )
  })
  return await promise
}

export default Home
