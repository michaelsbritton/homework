import { React, useState } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

import './CreateHomeworkEntry.css';

const CreateHomeworkEntry = () => {
    
    const [nFields, setNFields] = useState([1]);
    const [nIndent, setnIndent] = useState([false]);
    const [nUndent, setnUndent] = useState([false]);
    const [selected, setSelected] = useState([false]);
    const [globalIndent, setGlobalIndent] = useState(0);

    const addField = (fields) => {
        let lastIndex = fields.length - 1;
        let oldValue = fields[lastIndex];
        let newValue = oldValue + 1;
        fields = fields.concat(newValue);
        // logic for checkboxes
        // nIndent will only be false for the 1st entry, which is the default value
        let indent = nIndent.concat(true);
        // nUndent will be false if globalIndent = 0
        let undent = [];
        if (globalIndent === 0) {
            undent = nUndent.concat(false);
        } else {
            undent = nUndent.concat(true)
        }
        setNFields(fields);
        setnIndent(indent);
        setnUndent(undent);
        console.log(fields)
        console.log(indent)
        console.log(undent)
    }

    const handleIndentSelect = (event, gI, idx) => {
        // console.log("Indent: " + event.target.checked)
        let indentValue = gI;
        if (event.target.checked && !selected[idx]) {
            indentValue = indentValue + 1;
            let selectedValue = selected;
            selectedValue[idx] = true;
            setSelected(selectedValue);
        } 
        else if (event.target.checked && selected[idx]) {
            indentValue = indentValue + 2;
        }
        else {
            indentValue = indentValue - 1;
        }
        setGlobalIndent(indentValue);
        console.log(indentValue)
    }

    const handleUndentSelect = (event, gI, idx) => {
        // console.log("Undent: " + event)
        let indentValue = gI;
        if (event.target.checked && !selected[idx]) {
            indentValue = indentValue - 1;
            let selectedValue = selected;
            selectedValue[idx] = true;
            setSelected(selectedValue);
        }
        else if (event.target.checked && selected[idx]) {
            indentValue = indentValue - 2;
        }
        else {
            indentValue = indentValue + 1;
        }
        setGlobalIndent(indentValue);
    }
    
    return(
        <div className="CreateHomeworkEntryContainer">
            <div>Global Indent Value: {globalIndent}</div>
            {nFields.map((n, idx) => (
                <div key={idx} className="CreateHomeworkEntryRow">
                    <InputGroup className="mb-3" style={{ width: "75vw", marginBottom: "0px" }}>
                        <FormControl aria-label="Text input with checkbox" style={{ width: "55%", margin: "0px" }}/>
                        {nIndent[idx] ? (
                                <InputGroup.Radio name={"Group"+n} onChange={(e)=>handleIndentSelect(e, globalIndent, idx)} aria-label="Checkbox for following text input" style={{ margin: "0px" }} />
                            ) : <InputGroup.Radio name={"Group"+n}  disabled aria-label="Checkbox for following text input" style={{ margin: "0px" }} />
                        }
                        <InputGroup.Text id="inputGroup-sizing-default" style={{ margin: "0px" }}>Indent</InputGroup.Text>
                        {nUndent[idx] ? (
                                <InputGroup.Radio name={"Group"+n}  onChange={(e)=>handleUndentSelect(e, globalIndent, idx)} aria-label="Checkbox for following text input" style={{ margin: "0px" }} />
                            ) : <InputGroup.Radio name={"Group"+n}  disabled aria-label="Checkbox for following text input" style={{ margin: "0px" }} />
                        }
                        
                        <InputGroup.Text id="inputGroup-sizing-default" style={{ margin: "0px" }}>Unindent</InputGroup.Text>
                    </InputGroup>
                    <Button variant="outline-secondary" id="button-addon1" 
                        style={{ marginBottom: "16px", marginLeft: "16px" }}
                        onClick={()=>addField(nFields)}    
                    >
                        +
                    </Button>
                </div>
            ))}
            <Button variant="primary">Submit</Button>
        </div>
    )
}

export default CreateHomeworkEntry;