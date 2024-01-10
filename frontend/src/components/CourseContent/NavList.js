import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./NavList.module.css";
import { FiChevronDown, FiChevronUp, FiInfo } from "react-icons/fi";
import { useParams, useNavigate} from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import { Button } from "@mui/material";

function NavList(props) {
  const [list, setList] = useState();
  const [showLinks, setShowLinks] = useState(false);
  const data = props.topicData;
  const { courseCode, topicId, linkId } = useParams();
  const navigate = useNavigate();  

  useEffect(() => {
    const values = {
      courseCode: props.course,
      topic: props.topic,
    };

    axios.post("http://localhost:8000/subtopics", values).then((res) => {
      console.log(res.data);
      setList(res.data);
    });
    
  }, [props.course, props.subTopic, props.topic]);

  const clickHandler = (linkId) => {
    //const linkid = parseInt(name.match(/(\d+)/)); //changed to make the linkid field more global
    //console.log(row, typeof(row));
    navigate(`/course-content/${courseCode}/${linkId}`)
  };

  const linkDisplayHandler = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div className={classes.topics}>
      <div className={classes.topic_header}>
        <div className={classes.icon}>
          {!showLinks ?
            (<FiChevronDown onClick={linkDisplayHandler} />):
            (<FiChevronUp onClick={linkDisplayHandler} />)
          }
        </div>
        <p className={classes.header}>{data.topic}</p>
        
      </div>
      <div className={classes.navlist}>
        {showLinks && (
          <div>
            {list &&
              list.map((row) => {
                return (
                  <div className={classes.link_row}>
                    <p
                      id={row.id}
                      onClick={() => { clickHandler(row.id); } }>
                      {row.link_name}
                    </p>
                    {data.mandatory === 1 &&
                      <Tooltip  disableFocusListener title={`Due by ${data.endDate}`} placement="right"> 
                        <Button sx={{
                          m: 1, position: 'static', marginRight: '5px'
                        }} ><FiInfo/></Button>
                      </Tooltip>
                    }
                  </ div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default NavList;
