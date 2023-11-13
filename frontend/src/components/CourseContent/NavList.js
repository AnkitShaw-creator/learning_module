import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./NavList.module.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function NavList(props) {
  const [list, setList] = useState();
  const [showLinks, setShowLinks] = useState(false);
  const data = props.topicData;

  

  useEffect(() => {
    const values = {
      courseCode: props.course,
      topic: props.topic,
    };

    axios.post("http://localhost:8000/subtopics", values).then((res) => {
      setList(res.data);
    });
    
  }, [props.course, props.subTopic, props.topic]);

  const clickHandler = (url) => {
    props.clickHandler(url);
    console.log("Click function called:", url);
  };

  const linkDisplayHandler = () => {
    setShowLinks(!showLinks);
  };


  //console.log(data);
  return (
    <div className={classes.topics}>
      <div className={classes.topic_header}>
        <p className={classes.header}>{data.topic}</p>
        <h6>{data.mandatory===1 && `Due by ${data.endDate}` }</h6>
        <div className={classes.icon}>
          {!showLinks ?
            (<FiChevronDown onClick={linkDisplayHandler} />):
            (<FiChevronUp onClick={linkDisplayHandler} />)
          }
        </div>
      </div>
      <div className={classes.navlist}>
        {showLinks && (
          <ul>
            {list &&
              list.map((row) => {
                return (
                  <li
                    id={row.id}
                    onClick={() => {
                      clickHandler(row.links);
                    }}
                  >
                    {row.link_name}
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default NavList;
