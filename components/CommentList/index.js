import React, { useState, useEffect } from 'react';
import { Drawer,Divider } from 'antd'
import CommentForm from '../CommentForm';
import axios from 'axios'
import { serviceUrl } from '../../config/apiUrl'
import CommentItem from '../CommentItem'
import '../../static/style/comment/comment.css'

//  格式化评论和回复数据
const commentFormat = list => {
  let commentList = [], replyList = []
  list.forEach(v => {
    if (!!v.is_reply) {
      replyList.push(v)
    } else {
      commentList.push(v)
    }
  })
  commentList.forEach(v => {
    v.children = replyList.filter(reply => reply.reply_id === v.id).sort((a, b) => a.add_time - b.add_time);
  })
  return commentList
}


const CommentList = ({ media ,artId, listKey, upComment }) => {
  const [list, setList] = useState([])
  const [drawerOptions, setDrawerOptions] = useState({ visible: false, item: undefined });
  const handleReply = (comment) => {
    setDrawerOptions({
      visible: true,
      item: comment
    })
  }

  const cancelReply = () => {
    setDrawerOptions({
      visible: false,
      item: undefined
    })
  }

  const submitReply = (values) => {
    const option = {
      ...values,
      is_reply: 1,
      reply_id: drawerOptions.item.id,
    }
    upComment(option)
    cancelReply()
    return false
  }
  const fetchData = async () => {
    const result = await axios(serviceUrl.getCommentListById + artId);
    let tmplist = result.data.commList
    if (!tmplist || !tmplist.length) {
      return
    }
    let list = []
    // 最多显示15条评论
    let max = tmplist.length < 14 ? tmplist.length : 14
    for(let i = 0; i<max; i++){
      list.push(tmplist[i])
    }
    let replyList = result.data.replyList
    for(let i in replyList){
      list.push(replyList[i])
    }
    const commentList = commentFormat(list);
    setList(commentList)
  }

  useEffect(() => {
    fetchData()
  }, [artId, listKey])


  if (!list.length) {
    return null
  }
  return (
    <div>
      <Divider>最新留言</Divider>
      {list.map(item => (
        <CommentItem
          key={item.id}
          item={item}
          handleReply={() => handleReply(item)}
        >
          {!!item.children.length && item.children.map(reply => (
            <CommentItem key={reply.id} item={reply} />
          ))}
        </CommentItem>
      ))}

      <Drawer
        title="回复"
        placement={media == 'isPhone' ? 'bottom' : 'right'}
        width='34%'
        height={media == 'isPhone' ? '100%' : ''}
        // height='100%'
        destroyOnClose
        closable={false}
        maskClosable={false}
        onClose={cancelReply}
        visible={drawerOptions.visible}
      >
        <CommentForm
          isReply
          onOk={submitReply}
          onCancel={cancelReply}
        />
      </Drawer>

    </div>
  )
}

export default CommentList