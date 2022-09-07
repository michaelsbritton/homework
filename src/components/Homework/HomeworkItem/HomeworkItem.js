import { React } from 'react';
import { Accordion } from 'react-bootstrap';


import './HomeworkItem.css';

const HomeworkItem = (props) => {

    const convertDate = (str) => {
        let titleString = '';
        let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
        let year = str.slice(0,4)
        let month = str.slice(5,7);
        let day = str.slice(8,10)
        
        let textMonth = months[parseInt(month)-1]
        
        titleString = year + ' ' + textMonth + ' ' + day;
        return(titleString)
    }

    return(
        <div className='HwAccordionElement'>
            <Accordion>
                <Accordion.Item eventKey='1'>
                    <Accordion.Header>
                        {convertDate(props.title)}
                    </Accordion.Header>
                    <Accordion.Body>
                        <div dangerouslySetInnerHTML={{
                            __html: props.data
                        }} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            {/* <Card>
                -----
            </Card> */}
        </div>
    )
}

export default HomeworkItem;