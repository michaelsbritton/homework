import React from 'react';
import Blog from './Blog/Blog';

import './Home.css';

const Home = () => {
    return(
        <div className="HomeContainer">
            <div className="HomeTitle">
                Home
            </div>
            <div className="HomeBody">
                <span>
                    Welcome to a small project I'm working on called Homework<span dangerouslySetInnerHTML={{ "__html": "&trade;" }} />.
                    Currently, I'm working as a one-man team to develop this site geared toward English lessons between one student and a teacher or team of teachers.
                    Goals of the project include allowing logins for multitudes of students and for teachers, expanding sections beyond book reports and homework logging. 
                    Testing, grading, digitalized feedback, reports, and innovative design, teaching, and learning techniques are all ideas I would love see implemented here.
                    Until those goals have been achieved, updates to the website and other developments and fixes will be logged in a mini-blog, below.
                </span>
            </div>
            <hr />
            <div className="HomeBlog">
                <div className="HomeBlogTitle">
                    Updates
                </div>
                <Blog />
            </div>
        </div>
    )
}

export default Home;