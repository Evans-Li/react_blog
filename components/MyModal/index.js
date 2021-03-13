import React,{useState} from 'react'
import {Modal} from 'antd'




const MyModal =({visible, onOk, image}) => {

  return (
    <>
      <Modal
        visible={visible}
        maskClosable={true}
        onOk={onOk}
        onCancel={onOk}
        closable={true}
        bodyStyle={{
          padding: 0,
          background: 'rgba(0,0,0,0)',
          width: '490px',
        }}
        footer={false}
        keyboard={true}
        mask={true}
        maskStyle={{
          background: 'rgba(0,0,0,.8)'
        }}
        destroyOnClose={true}
      >
        <img src={image} style={{ width: "106.2%", height: '50%' }}></img>
      </Modal>
    </>
  )
}

export default MyModal;