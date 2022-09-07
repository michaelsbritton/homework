import { React, useState } from 'react';
import { Dropdown, DropdownButton, InputGroup, FormControl, Button } from 'react-bootstrap';

import './CreateHomeworkEntryForm.css';

const CreateHomeworkEntryForm = () => {


    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);

    const [xFields, setxFields] = useState([1]);
    const [yFields, setyFields] = useState([[]]);
    const [zFields, setzFields] = useState([]);

    const yearList = ["2020","2021","2022"];
    const monthList= ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const thirtyOneDayList = ["January","March","May", "July","August","October","December"];

    const handleYearSelect = (e) => {
        console.log(e)
        setSelectedYear(e)
      }

    const handleMonthSelect = (e) => {
        setSelectedMonth(e)
    }

    const handleDaySelect = (e) => {
        setSelectedDay(e)
    }

    const generateDays = (selectedMonth) => {
        let day = []
        if (thirtyOneDayList.includes(selectedMonth)) {
            for (var i = 1; i <= 31; i++) {
                day.push(i);
             }
        } else {
            for (var j = 1; j <= 30; j++) {
                day.push(j);
             }
        }
        console.log(day);
        return(day);
    }

    const xAddLine = (xID, idx1) => {
        let newID = xFields.length + 1;
        let xFieldsNew = xFields;
        let newIdx = idx1 + 1;
        if (xFields.length === xID) {
            // the following is the same as xFieldsNew = xFieldsNew[newID]
            xFieldsNew = xFieldsNew.concat(newID);
        }
        else {
            xFieldsNew.splice(newIdx, 0, newID);
            xFieldsNew = [...xFieldsNew];
            // so dumb, splice alone doesn't trigger a DOM update (xFieldsNew isn't technically getting updated)
        }

        // update y-related arrays 
        let yFieldsNew = yFields;
        yFieldsNew[newIdx] = [];

        console.log(yFieldsNew);

        // update state
        setxFields(xFieldsNew)
    }

    const xRemoveLine = (xID, idx1) => {
        // arr.splice(idx, # items to remove)
        let xFieldsNew = xFields;
        xFieldsNew.splice(idx1, 1);
        xFieldsNew = [...subtractFromLarger(xFieldsNew,xID)];

        // update y-related arrays
        let yFieldsNew = yFields;
        yFieldsNew.splice(idx1, 1);
        yFieldsNew = [...yFieldsNew];
        console.log(yFieldsNew)

        // update state
        setxFields(xFieldsNew);
    }

    // Subtract one from values in array (a) that are higher than n
    // a should never contain n (removed in xRemoveLine)
    const subtractFromLarger = (a, n) => {
        console.log("a: " + a)
        console.log("n: " + n)
        let newA = [];
        for (let i in a) {
            if (a[i] > n) {
                newA = newA.concat(a[i] - 1);
            }
            // i is less than n
            else { 
                newA = newA.concat(a[i]);
            }
        }
        return(newA);
    }

    const addSublistX = (xID, idx1) => {
        console.log("Add sublist!");

        let yFieldsNew = yFields;
        let yID = yFieldsNew[idx1].length + 1;

        yFieldsNew[idx1] = [yID];
        yFieldsNew = [...yFieldsNew];

        setyFields(yFieldsNew);

    }


    return(
        <div>
            <div className="DateSelectionContainer">
                {/* <div className="BufferSpace">
                    
                </div> */}
                <div className="DateSelectionButtonsContainer">
                    <DropdownButton id="year" title="Year" onSelect={handleYearSelect}
                        style={{ marginTop: "15px", marginBottom: "15px", marginLeft: "10px", marginRight: "10px" }}>
                        {yearList.map((iYear, yearId) => (
                            <Dropdown.Item eventKey={iYear}>{iYear}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                    <DropdownButton id="month" title="Month" onSelect={handleMonthSelect}
                        style={{ marginTop: "15px", marginBottom: "15px", marginLeft: "10px", marginRight: "10px" }}>
                        {monthList.map((iMonth, monthId) => (
                            <Dropdown.Item eventKey={iMonth}>{iMonth}</Dropdown.Item>
                        ))}
                    </DropdownButton>
                    <DropdownButton id="day" title="Day" onSelect={handleDaySelect}
                        style={{ marginTop: "15px", marginBottom: "15px", marginLeft: "10px", marginRight: "10px" }}>
                        {!selectedMonth ? 
                            <Dropdown.Item eventKey="null">Select a month</Dropdown.Item>
                            :
                            generateDays(selectedMonth).map((day) => (
                                <Dropdown.Item eventKey={day}>{day}</Dropdown.Item>
                            ))
                        }
                    </DropdownButton>
                </div>
                <div className="DateDisplayContainer">
                    {/* <span style={{ marginTop: "5px", marginBottom: "15px", marginLeft: "10px", marginRight: "10px", width: "50px" }} >
                        Selected Date: 
                    </span>
                    <span style={{ marginTop: "5px", marginBottom: "15px", marginLeft: "10px", marginRight: "10px", width: "50px" }}>
                        {selectedYear ? selectedYear : " "}    
                    </span>
                    <span style={{ marginTop: "5px", marginBottom: "15px", marginLeft: "10px", marginRight: "10px", width: "50px" }}>
                        {selectedMonth ? selectedMonth : " "}    
                    </span>
                    <span style={{ marginTop: "5px", marginBottom: "15px", marginLeft: "10px", marginRight: "10px", width: "50px" }}>
                        {selectedDay ? selectedDay : " "}    
                    </span> */}
                    <div className="DefaultText" >
                        Selected Date : 
                    </div>
                    <div className="DisplayedDate">
                        {selectedYear ? selectedYear : " "}    
                    </div>
                    <div className="DisplayedDate">
                        {selectedMonth ? selectedMonth : " "}    
                    </div>
                    <div className="DisplayedDate">
                        {selectedDay ? selectedDay : " "}    
                    </div>
                </div>
            </div>

            <div className="CreateHomeworkEntryFormContainer">
            {xFields.map((xID, idx1) => (
                <div key={Math.random()} className="xEntryFields">
                    <div className="xRowFields">
                        <InputGroup className="mb-3" style={{ width: "75vw", marginBottom: "0px" }} >
                        <FormControl aria-label="Text input with checkbox" style={{ width: "55%", margin: "0px" }} placeholder={"X: " + xID} />
                            <Button variant="secondary" onClick={()=>addSublistX(xID, idx1)}>Sublist</Button>
                        </InputGroup>
                        <Button variant="outline-secondary"
                                style={{ marginBottom: "16px", marginLeft: "16px" }}
                                onClick={()=>xAddLine(xID, idx1)}>
                            +
                        </Button>
                        <Button variant="outline-secondary"
                                style={{ marginBottom: "16px", marginLeft: "16px" }}
                                onClick={()=>xRemoveLine(xID, idx1)}>
                            -
                        </Button>
                    </div>
                    {yFields.map((y, idx2) => {
                        if (y.length === 0) {
                            // console.log("EMPTY ARRAY")
                            return(null);
                        }
                        else {
                            return(
                                <div key={Math.random()} className="yEntryFields">
                                    <div className="yRowFields">
                                        <InputGroup className="mb-3" style={{ width: "75vw", marginBottom: "0px" }}>
                                        <FormControl aria-label="Text input with checkbox" style={{ width: "55%", margin: "0px" }}/>
                                            <Button variant="secondary">Sublist</Button>
                                        </InputGroup>
                                        <Button variant="outline-secondary"
                                                style={{ marginBottom: "16px", marginLeft: "16px" }}
                                                onClick={()=>xAddLine(xID)}>
                                            +
                                        </Button>
                                
                                {zFields.map((z, idx3) => (
                                    <div className="zRowFields">
                                        <InputGroup className="mb-3" style={{ width: "75vw", marginBottom: "0px" }}>
                                        <FormControl aria-label="Text input with checkbox" style={{ width: "55%", margin: "0px" }}/>
                                            <Button variant="secondary" style={{ width: "73px" }}>
                                            </Button>
                                        </InputGroup>
                                        <Button variant="outline-secondary"
                                                style={{ marginBottom: "16px", marginLeft: "16px" }}
                                                onClick={()=>xAddLine(xID)}>
                                            +
                                        </Button>
                                    </div>
                                ))}
                                </div>
                            {/* end of 'yEntryFields' */}
                            </div>
                        )}})

                    }
                {/* end of 'xEntryFields' */}
            </div>
            ))

            }
        </div>
        </div>
    )
}

export default CreateHomeworkEntryForm;