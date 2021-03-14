import React, { useState, useEffect } from 'react';
import './index.css'
const Advert = () => {
  const [imgurls, setImgurls] = useState([]);
  useEffect(()=>{
    let imglist = [
      { img: 'https://s3.ax1x.com/2021/03/14/60xRO0.png'},
      { img: 'https://s3.ax1x.com/2021/03/14/60x2yq.png'},
      { img: 'https://s3.ax1x.com/2021/03/14/60xgln.png'},
    ]
    setImgurls(imglist);
    return ()=>{
      console.log('advert 销毁');
    }
  },[])
  return (
    <div className='ad-div comm-box'>
      { 
        !!imgurls.length 
          ? imgurls.map((item,index)=>{
            return (
              <img src={item.img} alt={item.img} width='100%' />
            )
          })
          : null
      }
    </div>
  )
}

export default Advert

