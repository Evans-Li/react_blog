import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { List, Spin, Card, message } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import { serviceUrl } from '../config/apiUrl'
import hljs from "highlight.js"
import marked from 'marked'
import 'highlight.js/styles/monokai-sublime.css';
import { FileOutlined, CheckSquareTwoTone } from '@ant-design/icons'
import ListIcon from '../components/ListIcon'
import { $POST, $GET } from '../config/request'
import '../static/style/md.css'



// 延迟函数
export const _awaitFn = async (millisecond) => {
  return await new Promise((resolve, reject) => {
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
  const [isLoading, setIsLoading] = useState(false) ;
  const [media, setmedia] = useState('')
  const [pagemum, setPageNum] = useState(2);
  const [showLoadingPage, setShowLoadingPage] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(true);


  //进入文章loading
  const changeLoading = async () => {
    setShowLoadingPage(true);
    await _awaitFn(2000);
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
      .then((val) => {
        setShowLoadingPage(false);
        if (val.data.success == false) {
          console.log(val.data.msg);
          setShowLoadMoreBtn(false);
          // message.success(val.data.msg);
          message.success({
            icon: <CheckSquareTwoTone />,
            content: val.data.msg,
            style: { color: '#fff' },
            duration: 2,
          })
        } else {
          tempList = mylist;
          let valtmplist = val.data.data;
          if (valtmplist.length == 0) {
            console.log('vallist', 0)
            return;
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
                            <Link href={{ pathname: '/details', query: { id: item.id } }}>
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
                            <span><Link href={{ pathname: '/details', query: { id: item.id } }}>
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
                          <Link href={{ pathname: '/details', query: { id: item.id } }}>
                            <a onClick={changeLoading}>{item.title}</a>
                          </Link>
                        </div>
                        <ListIcon item={item} className='list-icon' />
                        <div className="list-context"
                          dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}>
                        </div>
                        <div className='list-go'>
                          <FileOutlined />
                          <span><Link href={{ pathname: '/details', query: { id: item.id } }}>
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
    <>
      <Layout 
         item = { renderItem }
         showLoadMoreBtn = {showLoadMoreBtn }
         showLoadingPage = { showLoadingPage }
         onLoadMore = {_onLoadMore}
      ></Layout>
    </>
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
