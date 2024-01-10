import { useState, useEffect } from 'react'
import { Paper, TextField, Box, Grid, Divider, InputLabel, NativeSelect } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import classes from './Topics.module.css'
import axios from 'axios';
import Button from '../../UI/Button/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
}));

const data = {
    'courseCode': '',
    'topic':'',
    'mandatory': 0,
    'link_name': '',
    'links': '',
    'link_type': '',
    'duration':''
}

const AddTopic = () => {

    const [topicData, setTopicData] = useState(data);
    const [courseOptions, setCourseOptions] = useState();
    const [isLink, setIsLink] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:8000/courseOptions')
            .then(res => {
                //console.log(res.data);
                setCourseOptions(res.data)
            })
            .catch(err => { console.error(err); })
    },[])

    const change = (name, value) => {
        setTopicData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const mediaChangeHandler = (name) => {
        if (name === 'External Link') {
            setIsLink(true)
        }
        if (name === 'File') {
            setIsLink(false)
        }
    }

    const addTopicHandler = () => {
        console.log(topicData);
        const file = ''; 
        const { courseCode, topic, mandatory, link_name, links, link_type, duration} = topicData;
        const values = {
            'courseCode': courseCode,
            'topic': topic,
            'mandatory': mandatory,
            'link_name': link_name,
            'links': links,
            'link_type': link_type,
            'duration': duration
        }
        let form = new FormData()
        form.append('courseCode', courseCode)
        form.append('topic', topic)
        form.append('mandatory', mandatory)
        form.append('link_name', link_name)
        form.append('links', links)
        form.append('link_type', link_type)
        form.append('duration', duration)
        form.append('file', file)

        axios.post('http://localhost:8000/addtopics', values)
            .then(res => {
                //console.log(res.data.message);
                alert(res.data.message);
                setTopicData(data);
            })
            .catch(err => {
                console.error(err);
            })
    }

    //console.log(courseOptions);
    return (
        <>
            <div>AddTopic</div>
            <NavLink to='/admin/topics'>
                <Button
                    className={classes.back_btn}>
                    {"< Go back"}
                </Button>
            </NavLink>
            <Paper sx={{ padding: 3 }}>
                <div className={classes.heading_add_user}>
                    <p><b>Add Topics</b></p>
                </div>
                <Box sx={{ flexGrow: 2 }}>
                    <form>
                        <div className={classes.inputFieldContainer}>Select CourseCode
                            <Grid container spacing={1}>
                                <Grid item xs={8} md={8}>
                                    <Item>
                                        <InputLabel id="courseCode-label" variant="standard" htmlFor="uncontrolled-native">Course Code</InputLabel>
                                        <NativeSelect
                                            defaultValue={''}
                                            inputProps={{
                                                name: 'courseCode',
                                                id: 'uncontrolled-native',
                                            }}
                                            fullWidth
                                            onChange={(e) => { change('courseCode', e.target.value) }}
                                        >   
                                            <option value={''}>SELECT</option>
                                            {courseOptions && courseOptions.map((c) => {
                                                // console.log(c);
                                                return <option key={c.courseCode} value={c.courseCode}>{c.courseName}</option>
                                            })}
                                        </NativeSelect>
                                    </Item>
                                </Grid>
                            </Grid>
                        </div>
                        <Divider />
                        <div className={classes.inputFieldContainer}>Add Topic Name, Chapter Name
                            <Grid container spacing={8}>
                                <Grid item xs={8} md={8}>
                                    <Item>
                                        <TextField type='text' id='topic' label='Topic Name' onChange={(e) => { change('topic', e.target.value) }} fullWidth />
                                    </Item>
                                </Grid>
                            </Grid>
                            <Divider />
                            <Grid container spacing={8}>
                                <Grid item xs={8} md={8}>
                                    <Item>
                                        <TextField type='text' id='link_name' label='Chapter Name' onChange={(e) => { change('link_name', e.target.value) }}  fullWidth/>
                                    </Item>
                                </Grid>
                            </Grid>
                            <Divider />
                        </div>
                        <Divider/>
                        <div className={classes.inputFieldContainer}>Add the link/file
                            <Grid container spacing={8}>
                                <Grid item xs={8} md={8}>
                                    <RadioGroup
                                        
                                        aria-labelledby="mandatory-select-group"
                                        name="content-selection-group"
                                        onChange={(e) => { mediaChangeHandler(e.target.name) }}
                                    >
                                        <FormControlLabel value={1} control={<Radio />} label="External Link" name='External Link'/>
                                        <FormControlLabel value={0} control={<Radio />} label="File" name='File'/>
                                    </RadioGroup>
                                    <Item>
                                        <TextField type='text' id='links' label='Links/ File Name' onChange={(e) => { change('links', e.target.value) }} fullWidth/>
                                    </Item>
                                    {
                                        !isLink && <input type='file' accept='text/pdf, video/*'/>
                                    }
                                </Grid>
                            </Grid>
                        </div>
                        <Divider />
                        <div className={classes.inputFieldContainer}> Select if the topic is mandatory or not
                            <RadioGroup
                                aria-labelledby="mandatory-select-group"
                                name="mandatory-group"
                                onChange={(e) => { change('mandatory', e.target.value) }}
                            >
                                <FormControlLabel value={1} control={<Radio />} label="Yes" />
                                <FormControlLabel value={0} control={<Radio />} label="No" />
                            </RadioGroup>
                        </div>
                        <Divider />
                        <div className={classes.inputFieldContainer}> Select the content type
                            <RadioGroup
                                aria-labelledby="link-type-group"
                                name="link-type-group"
                                onChange={(e)=>{change('link_type', e.target.value)}}
                            >
                                <FormControlLabel value="video" control={<Radio />} label="Video" />
                                <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
                            </RadioGroup>
                        </div>
                        <Divider/>
                        <div className={classes.inputFieldContainer}>Add duration in days
                            <div className={classes.form_input_container}>
                                <TextField type='number' id='duration' label='Duration' onChange={(e) => { change('duration', e.target.value) }} />
                            </div>
                        </div>
                        <Divider />
                    </form>
                    <Button type='submit' variant="contained" className={classes.back_btn} onClick={addTopicHandler}>Submit</Button>
                </Box>

            </Paper>
        </>
        
    )
};

export default AddTopic;
