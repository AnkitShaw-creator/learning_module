import {useEffect, useState} from 'react'
import ReactPlayer from 'react-player'
import classes from './MediaDisplay.module.css'
import Button from '../UI/Button/Button';

function MediaDisplay(props) {
    const [urlState, setUrlState] = useState()
    
    console.log(props.url);

    useEffect(() => {
      setUrlState(props.url)
      console.log(urlState);
    },[props.url])

    const markComplete = () => {
    }

    return (
      <div className={classes.container}>
        <div className={classes.player}>
          <ReactPlayer className={classes.react_player} url={urlState} controls={true} width='100%' height='70%' />
        </div>
        <Button className={classes.completeButton} onClick={markComplete}>Mark as Complete</Button>
      </div>
    )
}

export default MediaDisplay