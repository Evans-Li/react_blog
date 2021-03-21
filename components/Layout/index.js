
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Row, Col, List, Spin, Card, Affix, message } from 'antd'
import '../../static/style/pages/index.css'
import Header from '../Header'
import Author from '../Author'
import Advert from '../Advert'
import Footer from '../Footer'
import HomeTab from '../HomeTab'
import BackTopBtn from '../BackTopBtn'
import Transition from '../Transtion'
import LoadMore from '../LoadMore'
import Loading from '../Loading'


function Layout(props){
  
  return (
    <div className='wrap'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Evans博客</title>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <link rel="bookmark" href="/static/favicon.ico" type="image/x-icon" />
        <body style='background: url(https://s3.ax1x.com/2021/03/15/6BHJIA.png)'></body>
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
            item={ props.item }
          />
          { props.showLoadMoreBtn && props.showLoadMoreBtn ? <LoadMore onloadMore={props.onLoadMore} /> : null}
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
      { props.showLoadingPage &&  props.showLoadingPage ? <Loading /> : null}
    </div>
  )
}

export default Layout;