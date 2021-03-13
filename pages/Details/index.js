import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { Row, Col, Affix, Breadcrumb, Card } from 'antd'
import Header from '../../components/Header'
import Author from '../../components/Author'
import Advert from '../../components/Advert'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import axios from 'axios';
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import './index.css'
import Tocify from '../../components/tocify.tsx'
import Footer from '../../components/Footer'
import { serviceUrl } from '../../config/apiUrl'
import { $GET, $POST } from '../../config/request'
import { Helmet } from 'react-helmet'
import BackTopBtn from '../../components/BackTopBtn'
import ListIcon from '../../components/ListIcon'
import CommentForm from '../../components/CommentForm'
import CommentList from '../../components/CommentList/index'
import Transition from '../../components/Transtion'
import Share from '../../components/Share'
import '../../static/style/md.css'

const Detailed = (props) => {
  const tocify = new Tocify()
  const renderer = new marked.Renderer();
  const [commentKey, setCommentKey] = useState(Math.random());
  const [media, setMedia] = useState('');

  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  

  // 获取屏幕宽度, 设置响应式
  useEffect(() => {
    let SW = document.querySelector('body').clientWidth;
    console.log(SW);
    if(SW<1200){
      setMedia('isPhone');
    } else if(SW>=1200){
      setMedia('isSreen');
    }
    // fetchCommCount()
  },[])

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  //  提交评论
  const upComment = async (values) => {
    let dataProps = {
      ...values,
      art_id: props.id,
      is_pass: 0,
      add_time: parseInt(new Date() / 1000),
    };

    const res = await axios({
      method: "post",
      url: serviceUrl.addComment,
      header: { "Access-Control-Allow-Origin": "*" },
      data: dataProps,
      withCredentials: true
    })
    const isSuccess = res.status == 200;
    if (isSuccess) {
      setCommentKey(Math.random());
    } else {
    }
    return isSuccess;
  };
  let html = marked(props.article_content)
  const renderItem = () => {
    return (
      <div>
        <div className="detailed-content"
          dangerouslySetInnerHTML={{ __html: html }}   >
        </div>
      </div>
    )
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Evans-{props.title}</title>
        <body style='background: url(../../../../static/floor-tile.png)'></body>
      </Helmet>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />

      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={12}   >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item> {props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div>
                <div className="detailed-title">
                  {props.title}
                </div>
                <ListIcon item={props} className='center' />
                <Transition
                  in={true}
                  timeout={1500}
                  classNames={"fly"}
                  appear={true}
                  unmountOnExit={true}
                  item={renderItem}
                >
                </Transition>
              </div>
              <div id='comment-box'>
                <CommentList media={media} artId={props.id} listKey={commentKey} upComment={upComment} />
                <CommentForm onOk={upComment} />
              </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <BackTopBtn />
      <div id='share'>
        <Share props={props}  className='share'/>
      </div>
      <Footer />
      {/* <Butterfly /> */}
      

    </>
  )
}

Detailed.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(serviceUrl.getArticleById + id).then(
      (res) => {
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default Detailed