import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { getDatabase, ref, onValue, set } from "firebase/database";
import Media from 'react-media';
import { GiOpenBook, GiBookCover } from 'react-icons/gi';


import bookData from '../../../assets/BookReportData.json';

import './TeacherBookReports.css';


const TeacherBookReports = () => {

    let db = getDatabase();

    const [showNoReport, setShowNoReport] = useState(false);

    const [dataBook, setDataBook] = useState([]);
    const [dataSection, setDataSection] = useState([]);
    const [dataReport, setDataReport] = useState([]);

    const [report, setReport] = useState("");

    useEffect(()=>{
        let queryData = {};
        let updateDataBook = [];
        let updateDataSection = [];
        let updateDataReport = [];

        const refSection = ref(db, 'BookReports/Submitted/');
        // create listener to take snapshot of db
        onValue(refSection, (snapshot) => {
            const data = snapshot.val();
            queryData = data 
        })
        console.log(queryData)
        let keysBooks = Object.keys(queryData)
        for (let i in keysBooks) {
            let iBook = keysBooks[i]
            let iSections = queryData[iBook]
            let keysSections = Object.keys(iSections);
            for (let j in keysSections) {
                let jSection = keysSections[j]
                let jBookReportData = queryData[iBook][jSection].data;
                if (jBookReportData === "" || jBookReportData === null) {
                    // console.log("Skipped: " + iBook + " - " + jSection)
                }
                else {
                    // console.log("Make Button for " + iBook + ' - ' + jSection)
                    updateDataBook = updateDataBook.concat(iBook);
                    updateDataSection = updateDataSection.concat(jSection);
                    updateDataReport = updateDataReport.concat(jBookReportData);
                }
            }
        }
        setDataBook(updateDataBook);
        setDataSection(updateDataSection);
        setDataReport(updateDataReport);
    }, [report])
    
    const toggleShowNoReport = () => {
        let updateShowNoReport = !showNoReport;
        setShowNoReport(updateShowNoReport)
    }

    const handleClick = (r) => {
        setReport("");
        setReport(r)
    };


    return(
        <div className="TeacherBookReportsContainer">
            <div className="TeacherBookReportsHeader">
                Available Book Reports:
            </div>
            <div className="TeacherBookReportsAllButtonContainer">
                {bookData.Books.map((book,idx)=> {
                    if (book === "---") {

                    }
                    else {
                        return(
                            <div className="TeacherBookReportsButtonSet">
                                <div className="TeacherBookReportsIconAndTitle">
                                    <GiOpenBook />
                                    {book}
                                </div>
                                <hr />
                                <div className="TeacherBookReportsButtonsGrid">
                                    {bookData.Sections[idx].map((section, idx2) => {
                                        if (dataSection.includes(section)) {
                                            // if section is in dataSection (i.e. there is report data), get the 
                                            // name of the book from dataBook at the same index
                                            let dataIdx = dataSection.indexOf(section)

                                            // checking ...Section[idx] against dataSection is good for now, but it's not sustainable
                                            // if there are different books with identical sections names, we may get active buttons 
                                            // that don't actually have report data linked to them. This is very feasible, as many books just
                                            // have "Chapter 1", etc. as a name 
                                            // 2021-10-20, actually this might be okay, as we iterate through each book. Think about the logic...
                                            return(
                                                <>
                                                <Button key={idx2} variant="success" onClick={()=>handleClick(dataReport[dataIdx])}>
                                                    {section}
                                                </Button>
                                                </>
                                            )
                                        }
                                        else {
                                            return(
                                                <>
                                                    <Button key={idx2} variant="outline-success"  onClick={()=>toggleShowNoReport()} >
                                                        {section}
                                                    </Button>
                                                    {/* this is loading all the modals each time the toggle is turned on! */}
                                                    <Modal centered show={showNoReport} onHide={toggleShowNoReport}>
                                                        <Modal.Header>
                                                            <Modal.Title><i>No Report</i></Modal.Title>
                                                            <button 
                                                                onClick={toggleShowNoReport}
                                                                type="button" 
                                                                className="btn-close" 
                                                                data-bs-dismiss="modal" 
                                                                aria-label="Close">
                                                            </button>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <span>
                                                                {"There is no data submitted for : " + book + ", " + section + "!"}
                                                            </span>
                                                        </Modal.Body>
                                                        <Modal.Footer>
                                                        <Button variant="secondary" onClick={toggleShowNoReport}>
                                                            Close
                                                        </Button>
                                                        </Modal.Footer>
                                                    </Modal>
                                                </>
                                            )
                                        }
                                    } 
                                    )}
                                </div>
                            </div>
                        )
                    }
                }
                )}
                {/* {dataReport.map((report, idx) => 
                    <>
                        <Media query="(min-width: 769px)"> 
                            <Button key={idx} style={{ width: "325px"}} onClick={()=>handleClick(report)}>
                                {dataBook[idx] + " - " + dataSection[idx]}
                            </Button>
                        </Media>
                        <Media query="(max-width: 768px) and (min-width: 601px)">
                            <Button key={idx} style={{ width: "210px"}} onClick={()=>handleClick(report)}>
                                {dataBook[idx] + " - " + dataSection[idx]}
                            </Button>
                        </Media>
                        <Media query="(max-width: 600px)">
                            <Button key={idx} style={{ width: "150px"}} onClick={()=>handleClick(report)}>
                                {dataBook[idx] + " - " + dataSection[idx]}
                            </Button>
                        </Media>
                    </>
                )} */}
            </div>
            <div className="TeacherBookReportsData">
                    {report}
            </div>
        </div>
    )
};

export default TeacherBookReports;