import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

// import CreateHomeworkEntry from './CreateHomeworkEntry';
import CreateHomeworkEntryForm from './CreateHomeworkEntryForm';


import './TeacherHomework.css';

const TeacherHomework = () => {
    return(
        <div className="TeacherHomworkContainer">
            <Tabs defaultActiveKey="home" id="teacher-navigation" className="mb-3" 
                  style={{display:"flex", flexDirection:"row", justifyContent:"center", marginTop:"25px"}}>
                <Tab eventKey="view-edit" title="View/Edit Entry">
                    View and Edit Current Homework Entries
                </Tab>
                <Tab eventKey="create" title="Create Entry">
                    <div className="CreateHomeworkTitle">
                        <h5>Create New Homework Entry</h5>
                        {/* <CreateHomeworkEntry /> */}
                        <CreateHomeworkEntryForm />
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default TeacherHomework;