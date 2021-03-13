import React from 'react';
import { Comment, Avatar } from 'antd'
import '../../static/style/comment/comment.css'


const CommentItem = ({ item, handleReply, ...rest }) => {
  const defaultAvatar = <Avatar src={'../../static/IMG_1231.JPG'}/>
  return (
    <div>
      <Comment
        actions={handleReply && [<span key="reply" onClick={handleReply}>回复</span>]}
        author={<a>{item.com_name}</a>}
        avatar={item.avatar || defaultAvatar}
        content={<p>{item.comment}</p>}
        datetime={item.add_time}
        {...rest}
      />
    </div>
  )
}


export default CommentItem