import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { getDatabase, ref, get, child } from "firebase/database";
// import Media from 'react-media';
import { GiOpenBook } from 'react-icons/gi';
// import { GiOpenBook, GiBookCover } from 'react-icons/gi';

import bookData from '../../../assets/BookReportData.json';

import './TeacherBookReports.css';


const TeacherBookReports = () => {

    // Book data variables
    const [DataSection, setDataSection] = useState([]);
    const [DataReport, setDataReport] = useState([]);
    const [report, setReport] = useState("");
    // Modal variables
    const [showNoReport, setShowNoReport] = useState(false);
    const [modalBook, setModalBook] = useState("");
    const [modalSection, setModalSection] = useState("");
    
    useEffect(()=>{
        const fetchData = async () => {

            let updateDataSection = [];
            let updateDataReport = [];

            const dbRef = ref(getDatabase());
            await get(child(dbRef, 'BookReports/Submitted/'))
            .then((snapshot) => {
                if (snapshot.exists()) {

                    let queryData = snapshot.val();
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
                                // console.log("Made Button for " + iBook + ' - ' + jSection)
                                updateDataSection = updateDataSection.concat(jSection);
                                updateDataReport = updateDataReport.concat(jBookReportData);
                            }
                        }
                    }
                    setDataSection(updateDataSection);
                    setDataReport(updateDataReport);
                } else {
                    console.log("No Data Available")
                }
            })
            .catch((error) => {
                console.error(error);
            })
        }
        
        // Execute the API call
        fetchData();

    }, [report]);
    
    const toggleShowNoReport = (book, section) => {
        setModalBook(book);
        setModalSection(section)
        let updateShowNoReport = !showNoReport;
        setShowNoReport(updateShowNoReport)
    }

    const modalOff = () => {
        setShowNoReport(false);
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
                        return(null)
                    }
                    else {
                        return(
                            <div key={idx} className="TeacherBookReportsButtonSet">
                                <div className="TeacherBookReportsIconAndTitle">
                                    <GiOpenBook style={{margin: "0 10"}}/>
                                    {book}
                                </div>
                                <hr />
                                <div className="TeacherBookReportsButtonsGrid">
                                    {bookData.Sections[idx].map((section, idx2) => {  
                                        if (DataSection.includes(section)) {
                                            // if section is in dataSection (i.e. there is report data), get the 
                                            // name of the book from dataBook at the same index
                                            let dataIdx = DataSection.indexOf(section)

                                            // checking ...Section[idx] against dataSection is good for now, but it's not sustainable
                                            // if there are different books with identical sections names, we may get active buttons 
                                            // that don't actually have report data linked to them. This is very feasible, as many books just
                                            // have "Chapter 1", etc. as a name 
                                            // 2021-10-20, actually this might be okay, as we iterate through each book. Think about the logic...
                                            return(
                                                <React.Fragment key={idx2}>
                                                    <Button variant="success" onClick={()=>handleClick(DataReport[dataIdx])}>
                                                        {section}
                                                    </Button>
                                                </React.Fragment>
                                            )
                                        }
                                        else {
                                            return(
                                                <React.Fragment key={idx2}>
                                                    <Button variant="outline-success" onClick={()=>toggleShowNoReport(book, section)} >
                                                        {section}
                                                    </Button>
                                                </React.Fragment>
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
            </div>
            <div className="TeacherBookReportsData">
                {report}
            </div>
            <Modal centered show={showNoReport} onHide={toggleShowNoReport}>
                <Modal.Header>
                    <Modal.Title><i>No Report</i></Modal.Title>
                    <button 
                        onClick={modalOff}
                        type="button" 
                        className="btn-close" 
                        data-bs-dismiss="modal" 
                        aria-label="Close">
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <span>
                        {"There is no data submitted for " + modalBook + ": " + modalSection + "!"}
                    </span>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={modalOff}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
};

export default TeacherBookReports;