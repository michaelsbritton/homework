import { React, useEffect, useState } from 'react';
import { getDatabase, ref, get, child } from "firebase/database";
import HomeworkItem from './HomeworkItem/HomeworkItem';

import './Homework.css';

const Homework = () => {

    const [dbDates, setDbDates] = useState([])
    const [dbEntries, setDbEntries] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    let db= getDatabase();

    useEffect(()=>{
        let dates = [];
        let entries = [];
        
        const fetchData = async () => {
            setIsLoading(true);

            const dbRef = ref(getDatabase());
            await get(child(dbRef, 'HomeworkItems/'))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    let queryData = snapshot.val();
                    for (let i in Object.keys(queryData)) {
                        dates = dates.concat(Object.keys(queryData)[i]);
                        entries = entries.concat(queryData[Object.keys(queryData)[i]]);
                    }
                    setDbDates(dates.reverse());
                    setDbEntries(entries.reverse());
                    setIsLoading(false);
                    
                } else {
                    console.log("No Data Available")
                }
            })
            .catch((error) => {
                console.error(error);
            })
        }
        
        // Execute API call
        fetchData();

    }, [db])

    return(
        <div className="HomeworkContainer">
            <div className="HomeworkTitle">
                Homework
            </div>
            <div className="HomeworkText">
                This section will eventually allow students to track their past and present homework.
            </div>
            <div className="HomeworkLoader">
                {isLoading ? (
                    <div className="loader">
                        <div className="inner one"></div>
                        <div className="inner two"></div>
                        <div className="inner three"></div>
                    </div>
                ) : <div></div> }
            </div>
            
            <div className="AllHomeworkComponents">
                {dbDates.length>0 && dbDates.map((date, idx) => (
                   <HomeworkItem key={idx} title={date} data={dbEntries[idx]} />
                ))}
            </div>
        </div>
    )
}

export default Homework;