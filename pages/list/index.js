import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { Row, Col, List, Card, Breadcrumb, Spin ,message} from 'antd'
import {CheckSquareTwoTone, CompassOutlined } from '@ant-design/icons'
import '../../static/style/pages/comm.css'
import Header from '../../components/Header'
import Author from '../../components/Author/index.js'
import Advert from '../../components/Advert/index.js'
import Footer from '../../components/Footer'
import HomeTab from '../../components/HomeTab'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { serviceUrl } from '../../config/apiUrl'
import './index.css'
import Icon, { FileOutlined } from '@ant-design/icons'
import marked from 'marked'
import hljs from "highlight.js";
import BackTopBtn from '../../components/BackTopBtn'
import ListIcon from '../../components/ListIcon'
import Transition from '../../components/Transtion'
import '../../static/style/md.css'
import LoadMore from '../../components/LoadMore/index'
import LoadingPage from '../../components/Loading';
import {_awaitFn} from '../index'

import Layout from '../../components/Layout'


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

const ArticleList = (list) => {

  const [mylist, setMylist] = useState(list.list.data || []);
  const [breadName, setBreadName] = useState('ddd')
  const [isLoading, setIsLoading] = useState(false)
  const [typeId, setTypeId] = useState();
  const [pagemum, setPagenum] = useState(2);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(true);
  const [showLoadPage, setShowLoadPage] = useState(false);
  let tempList;
  const changeLoading = () => {
    setShowLoadPage(true)
  }

  useEffect(() => {
    console.log('typeId change')
    setShowLoadMoreBtn(true);
  }, [list.typeId])
  
  useEffect(() => {
    setMylist(list.list.data);
    setBreadName(list.list.data[0].typeName);
  })
  useEffect(()=>{
    setTypeId(list.typeId)
  },[])
  //??????????????????
  const _onLoadMore = async () => {
    setShowLoadPage(true);
    let dataProps = {
      pagemum,
      id:typeId,
    }
    await _awaitFn(1500); //  ??????????????????
    await axios.post(serviceUrl['getListByIdLoadMore'], dataProps)
      .then( (val) => {
        setShowLoadPage(false);
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
            // ????????????????????????
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
            setPagenum((val.data.pageNum + 1))
          }
        }
      })
  }

  const renderItem = () => {
    return (
      <div>
        {
          !!mylist.length
          ?
          <List
          itemLayout="vertical"
          dataSource={mylist}
          renderItem={item => (
            <div className='list-box'>
              <Spin spinning={isLoading}>
                <Card
                  bordered={false}
                  hoverable
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
                      dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                    ></div>
                    <div className='list-go'>
                      <FileOutlined />
                      <span><Link href={{ pathname: '/details', query: { id: item.id } }}>
                        <a onClick={changeLoading}>	&nbsp; ???????????? &gt;</a>
                      </Link> </span>
                    </div>
                  </List.Item>
                </Card>
              </Spin>
            </div>
          )}
        />
        : null
        }
      </div>
    )
  }

  return (
    <div>
      <Layout 
        item = { renderItem }
        showLoadingPage = { showLoadPage }
        showLoadMoreBtn = { showLoadMoreBtn }
        onLoadMore = { _onLoadMore }
        ></Layout>
    </div>
    
  )

}
ArticleList.getInitialProps = async (context) => {
  let id = context.query.id;
  let promise = new Promise((resolve, reject) => {
    axios.post(serviceUrl['getListByIdLoadMore'],{pagemum:1, id}).then((res) => {
      resolve({list:res.data,typeId:id})
    })
  })
  return await promise
}


export default ArticleList

