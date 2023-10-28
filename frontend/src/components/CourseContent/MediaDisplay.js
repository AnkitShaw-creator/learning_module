import React from 'react'
import ReactPlayer from 'react-player'
import classes from './MediaDisplay.module.css'

function MediaDisplay(props) {
  return (
        <div className={classes.container}>
          <ReactPlayer className={classes.player} url={props.url} controls={true}/>
        </div>
  )
}

export default MediaDisplay