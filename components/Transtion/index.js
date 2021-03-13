import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
//import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './index.css'

const Transition = ({ timeout, classNames, appear, unmountOnExit, item }) => {
  return (
    <CSSTransition
      in={true}
      timeout={timeout}
      classNames={classNames}
      appear={appear}
      unmountOnExit={unmountOnExit}>

        {item}
    </CSSTransition>
    // <ReactCSSTransitionGroup 
    //   transitionName="example" 
    //   transitionEnterTimeout={1000} 
    //   transitionLeaveTimeout={300}
    //   transitionAppear={true}
    //   >

    //   {item}
    // </ReactCSSTransitionGroup>
  )
}

export default Transition