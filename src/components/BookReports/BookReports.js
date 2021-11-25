import React, { useState, useRef } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { ref, onValue, set } from "firebase/database";

// import autosize from 'autosize';

import bookData from '../../assets/BookReportData.json';

import './BookReports.css';

const BookReports = (props) => {

    const db = props.db;

    const refTextInput = useRef();

    const [textFill, setTextFill] = useState("");

    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedBook, setSelectedBook] = useState("");
    const [selectedSection, setSelectedSection] = useState("");

    const [showLoadAlert, setShowLoadAlert] = useState(false);
    const [headerLoadAlert, setHeaderLoadAlert] = useState("");
    const [textLoadAlert, setTextLoadAlert] = useState("");
    const [showSubmitAlert, setShowSubmitAlert] = useState(false);
    const [headerSubmitAlert, setHeaderSubmitAlert] = useState("");
    const [textSubmitAlert, setTextSubmitAlert] = useState("");
    const [showSaveAlert, setShowSaveAlert] = useState(false);
    const [headerSaveAlert, setHeaderSaveAlert] = useState("");
    const [textSaveAlert, setTextSaveAlert] = useState("");

    const toggleShowLoadAlert = () => {
        let updateShowLoadAlert = !showLoadAlert;
        setShowLoadAlert(updateShowLoadAlert);
    };

    const toggleShowSaveAlert = () => {
        let updateShowSaveAlert = !showSaveAlert;
        setShowSaveAlert(updateShowSaveAlert);
    };

    const toggleShowSubmitAlert = () => {
        let updateShowSubmitAlert = !showSubmitAlert;
        setShowSubmitAlert(updateShowSubmitAlert);
    };

    const handleSelectBook = (e) => {
        let updateSelectedBook = bookData.Books[e];
        console.log("handleSelectBook: " + updateSelectedBook)
        setSelectedBook(updateSelectedBook);
        setSelectedIdx(e);
        setSelectedSection("");
    }

    const handleSelectSection = (e) => {
        let updateSelectedSection = bookData.Sections[selectedIdx][e];
        console.log("handleSelectSection: " + updateSelectedSection);
        setSelectedSection(updateSelectedSection)
    }

    const handleLoad = (event) => {
        event.preventDefault();
        //create a Firebase ref 
        const refSection = ref(db, 'BookReports/Saved/' + selectedBook + '/' + selectedSection + '/data');
        // create listener to take snapshot of db
        onValue(refSection, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            if (data === "" || data === null) {
                setHeaderLoadAlert("No Saved Data");
                setTextLoadAlert("There is nothing saved for " + selectedBook + ", " + selectedSection + ". Please double check your selection, or start a new draft.");
                toggleShowLoadAlert();
            }
            else {
                setTextFill(data);
            }
        });
    };

    const handleSave = (event) => {
        event.preventDefault();
        let currentTextSave = refTextInput.current.value;
        // If a book hasn't yet been selected:
        if (selectedBook === "" || selectedBook === "---") {
            setHeaderSaveAlert("No Book Selected")
            setTextSaveAlert("Please select a book and a section from the menus and try again.")
            toggleShowSaveAlert();
        }
        // Or if a section hasn't yet been selected
        else if (selectedSection === "" || selectedSection === '---') {
            setHeaderSaveAlert("No Section Selected")
            setTextSaveAlert("Please select a section from the menu and try again.")
            toggleShowSaveAlert();
        }
        // if nothing has been entered
        else if (currentTextSave === "") {
            setHeaderSaveAlert("No Text Entered")
            setTextSaveAlert("You haven't written anything for your book report. Please enter some text and try saving again.")
            toggleShowSaveAlert();
        }
        else {
            setHeaderSaveAlert("Draft Saved")
            setTextSaveAlert("Your book report has been saved. Feel free to write more and save, or close everything and load it up again next time.")

            const refSection = ref(db, ('BookReports/Saved/' + selectedBook + '/' + selectedSection));
            set(refSection, {
                data: currentTextSave
            });
            toggleShowSaveAlert();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let currentTextSubmit = refTextInput.current.value;
        if (selectedBook === "" || selectedBook === "---") {
            setHeaderSubmitAlert("No Book Selected")
            setTextSubmitAlert("Please select a book and a section from the menus and try again.")
            toggleShowSubmitAlert();
        }
        // Or if a section hasn't yet been selected
        else if (selectedSection === "" || selectedSection === '---') {
            setHeaderSubmitAlert("No Section Selected")
            setTextSubmitAlert("Please select a section from the menu and try again.")
            toggleShowSubmitAlert();
        }
        // if nothing has been entered
        else if (currentTextSubmit === "") {
            setHeaderSubmitAlert("No Text Entered")
            setTextSubmitAlert("You haven't written anything for your book report. Please enter some text and try saving again.")
            toggleShowSubmitAlert();
        }
        else {
            setHeaderSubmitAlert("Submitted")
            setTextSubmitAlert("Your book report has been submitted. Feel free to write more, update, and save. If you want to update later, close everything, load it up again next time, and submit your update.")

            const refSection = ref(db, ('BookReports/Submitted/' + selectedBook + '/' + selectedSection));
            set(refSection, {
                data: currentTextSubmit
            });
            toggleShowSubmitAlert();
        }
    };

    return(
        <div className="BookReportContainer">
            <div className="BookReportTitle">
                Book Reports
            </div>
            <div className="BookReportSelectionBar">
                <div className="BookDropdown">
                    <DropdownButton id="dropdown-basic-button" title="Select a Book" onSelect={handleSelectBook}>
                        {bookData.Books.map((book, idx)=>
                            <Dropdown.Item key={idx} eventKey={idx}>{book}</Dropdown.Item>
                        )}
                    </DropdownButton>
                </div>
                <div className="ChapterDropdown">
                    <DropdownButton id="dropdown-basic-button" title="Select a Chapter/Section" onSelect={handleSelectSection}>
                        {bookData.Sections[selectedIdx].map((section, idx2) =>
                            <Dropdown.Item key={idx2} eventKey={idx2}>{section}</Dropdown.Item>
                        )}
                    </DropdownButton>
                </div>
            </div>
            <div className="SelectionDisplay">
                <div className="Selection">
                    <b>Book:</b> {selectedBook}
                </div>
                <div className="Selection">
                    <b>Section:</b> {selectedSection}
                </div>
            </div>
            {/* <div className="ReportInput" contentEditable> */}
            <div className="ReportInput">
                <textarea 
                    className="ReportTextArea"
                    // style={{}} 
                    // ref={c=>this.textarea=c}
                    ref={refTextInput}
                    placeholder="type some text"
                    // rows={1} defaultValue=""
                    defaultValue = {textFill}
                />
                <div className="ReportControls">
                    <div className="ReportControlsAlert">

                    </div>
                    <div className="ReportControlsButtons">
                        <Button variant="primary" style={{ margin: '0px 15px'}} onClick={handleLoad}>Load</Button>
                        
                        <Modal centered show={showLoadAlert} onHide={toggleShowLoadAlert}>
                            <Modal.Header>
                                <Modal.Title><i>{headerLoadAlert}</i></Modal.Title>
                                <button 
                                    onClick={toggleShowLoadAlert}
                                    type="button" 
                                    className="btn-close" 
                                    data-bs-dismiss="modal" 
                                    aria-label="Close">
                                </button>
                            </Modal.Header>
                            <Modal.Body>
                                {textLoadAlert} 
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={toggleShowLoadAlert}>
                                Close
                            </Button>
                            </Modal.Footer>
                        </Modal>

                        <Button variant="primary" style={{ margin: '0px 15px'}} onClick={handleSave}>Save</Button>
                        
                        <Modal centered show={showSaveAlert} onHide={toggleShowSaveAlert}>
                            <Modal.Header>
                                <Modal.Title><i>{headerSaveAlert}</i></Modal.Title>
                                <button 
                                    onClick={toggleShowSaveAlert}
                                    type="button" 
                                    className="btn-close" 
                                    data-bs-dismiss="modal" 
                                    aria-label="Close">
                                </button>
                            </Modal.Header>
                            <Modal.Body>
                                {textSaveAlert} 
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={toggleShowSaveAlert}>
                                Close
                            </Button>
                            </Modal.Footer>
                        </Modal>

                        <Button variant="success" style={{ margin: '0px 15px'}} onClick={handleSubmit}>Submit</Button>
                        
                        <Modal centered show={showSubmitAlert} onHide={toggleShowSubmitAlert}>
                            <Modal.Header>
                                <Modal.Title><i>{headerSubmitAlert}</i></Modal.Title>
                                <button 
                                    onClick={toggleShowSubmitAlert}
                                    type="button" 
                                    className="btn-close" 
                                    data-bs-dismiss="modal" 
                                    aria-label="Close">
                                </button>
                            </Modal.Header>
                            <Modal.Body>
                                {textSubmitAlert}
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={toggleShowSubmitAlert}>
                                Close
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookReports;