import { useEffect, useRef, useState } from "react";
import { useCookies } from 'react-cookie'
import ReactPlayer from "react-player";
import jwt_decode from 'jwt-decode';
import classes from "./MediaDisplay.module.css";
import Button from "../UI/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';


const mediaState = { duration: 0, played: 0, loaded: 0, remaining: 0}

function MediaDisplay() {
  const [urlState, setUrlState] = useState(mediaState);
  const [timer, setTImer] = useState(mediaState)
  const [cookies] = useCookies(['user'])
  var token = jwt_decode(cookies.user)
  var user = token.data.at(0).at(0); 
  const [showbutton, setShowButton] = useState(false);
  const navigate = useNavigate();
  let { courseCode, topicId, linkId } = useParams()
  const mediaRef = useRef()


  useEffect(() => {
    const values = {
      courseCode: courseCode,
      link_name: `chapter-${linkId}`
    }
    axios.post("http://localhost:8000/media", values)
      .then((res) => {
        setUrlState(res.data.link_data.at(0).links)
        if (res.data.link_data.at(0).mandatory === 1) {
          setShowButton(true);
        }
        else {
          setShowButton(false);
        }
      }).catch(err=>{console.error(err);});
  }, [courseCode, linkId, urlState]);

  const markComplete = () => {
    const values = {
      EmpCode: user.EmpCode,
      courseCode: courseCode,
      chapterId: linkId 
    }

    axios.post('http://localhost:8000/course-content/addcheckpoints', values)
      .then(res => {
        console.log(res.data.message);
        linkId = parseInt(linkId) + 1
        navigate(`/course-content/${courseCode}/${topicId}/${linkId}`)
       })
      .catch(err => { console.error(err); })
  };

  const addProgress = () => {
    const Played = mediaRef.current.getCurrentTime();
    const Duration = mediaRef.current.getDuration();
    const Loaded = mediaRef.current.getSecondsLoaded();
    setTImer({
      duration: Duration,
      played: Played,
      loaded: Loaded,
      remaining: Duration - Played
    })
    console.log(timer);
    if (timer.remaining <= 5) {
      console.log("finished");
    }
  }

  return (
    <div className={classes.container}>
      {!urlState && (
        <p className={classes.content_message}>
          please select a content from the sidenav to watch
        </p>
      )}
      <div className={classes.player}>
        {urlState && (
          <ReactPlayer
            ref={mediaRef}
            onProgress={addProgress}
            className={classes.react_player}
            url={urlState}
            controls={true}
            width="100%"
            height="70%"
          />
        )}
      </div>
      <div className={classes.button_div}>
        {showbutton && <Button className={classes.completeButton} onClick={markComplete}>
            <p>Mark as Complete</p>
          </Button>}
      </div>
    </div>
  );
}

export default MediaDisplay;
