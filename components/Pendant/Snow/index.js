import React from 'react'
import '../../static/style/pages/index.css'

function Snow() {
  return (
    <div>
      <canvas id="Snow" width="542" height="722"></canvas>
      <script type='text/javascript' src='https://cdn.jsdelivr.net/gh/wangyang-o/imgcdn@master/js/snow.js' async={true}></script>
    </div>
  )
}


export default Snow