import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';


const TeacherTest = () => {

    const [toggleModal, setToggleModal] = useState(false);
    const [nGlobal, setnGlobal] = useState(1);

    const test = [1,2,3,4,5];
    const handleButtonClick = (n) => {
        setnGlobal(n);
        setToggleModal(!toggleModal);
    }
    const modalOff = () => {
        setToggleModal(false)
    }

    return(
        <div className="TeacherTestContainer" >
            {test.map((n, idx) => (
                <React.Fragment key={idx}>
                    <Button style={{ margin: "25px" }} onClick={()=>handleButtonClick(n)}>#{n}</Button>
                </React.Fragment>
            ))}
            <div>Other shit</div>
            <div>Some other shit</div>
            <div>The Last shit</div>
               <Modal centered show={toggleModal}>
                    <Modal.Header>
                        <Modal.Title>This is title for #{nGlobal}</Modal.Title>
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
                            {"There is no data submitted for book #" + nGlobal + "!"}
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

export default TeacherTest;