import { useEffect, useRef, useState } from "react";
import { useCookies } from 'react-cookie'
import ReactPlayer from "react-player";
import jwt_decode from 'jwt-decode';
import classes from "./MediaDisplay.module.css";
//import Button from "../UI/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { Button } from "@mui/material";



const mediaState = { duration: 0, played: 0, loaded: 0, remaining: 0}
const regex_url = /(http:\/\/)+/
function MediaDisplay() {
  const [urlState, setUrlState] = useState({'url':''});
  const [timer, setTImer] = useState(mediaState)
  const [cookies] = useCookies(['user'])
  var token = jwt_decode(cookies.user)
  var user = token.data.at(0).at(0); 
  const [showbutton, setShowButton] = useState(false);
  const navigate = useNavigate();
  let { courseCode, topicId, linkId } = useParams()
  const mediaRef = useRef()
  const [showPDF, setShowPDF] = useState(false);
  useEffect(() => {
    
    const values = {
      courseCode: courseCode,
      link_name: linkId   // updated to remove "chapter"
    }
    // console.log(values);
    axios.post("http://localhost:8000/media", values)
      .then((res) => {
        if (res.data.link_data.at(0).link_type === 'pdf'){
          setShowPDF(true)
          setUrlState({
            'url': !regex_url.test(res.data.link_data.at(0).links) ?
              `http://localhost:8000/static/pdfs/${res.data.link_data.at(0).links}` :
              res.data.link_data.at(0).links
          })
        }
        if (res.data.link_data.at(0).link_type === 'video') {
          setShowPDF(false)
          setUrlState({
            'url': !regex_url.test(res.data.link_data.at(0).links) ?
              `http://localhost:8000/static/videos/${res.data.link_data.at(0).links}` :
              res.data.link_data.at(0).links
          })
        }
        if (res.data.link_data.at(0).mandatory === 1) {
          setShowButton(true);
        }
        else {
          setShowButton(false);
        }
      }).catch(err => { console.error(err); });
    
    const handleContextmenu = e => {
      e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu)
    }
  }, [courseCode, linkId, urlState.url,]);
  //console.log(urlState.url);

  const markComplete = () => {
    const values = {
      EmpCode: user.EmpCode,
      courseCode: courseCode,
      chapterId: linkId, 
      totalVideoLength: timer.duration,
      durationWatched: timer.played
    }

    axios.post('http://localhost:8000/course-content/addcheckpoints', values)
      .then(res => {
        console.log(res.data.message);
        alert(res.data.message);
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
  }

  return (
    <div className={classes.container}>
      { !urlState && (
        <p className={classes.content_message}>
          please select a content from the sidenav to watch
        </p>
      )}
      { urlState &&  !showPDF ? (
        <div className={classes.player}>
          <ReactPlayer
            ref={mediaRef}
            onProgress={addProgress}
            className={classes.react_player}
            url={urlState.url}
            controls={true}
            width="100%"
            height="70%"
          />
        </div>
      ) : (
        <div>
            <iframe src={urlState.url} width={1000} height={600}></iframe>
        </div>
      )}
      
      <Button variant="contained" sx={{ backgroundColor: '#14213d', alignSelf: 'center', borderRadius: 8}} onClick={markComplete}>
        <p>Mark as Complete</p>
      </Button>
    </div>
  );
}

export default MediaDisplay;
