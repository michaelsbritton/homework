import React from 'react';

import './Blog.css';

const Blog = () => {
    return(
        <div className="BlogContainer">
            
            {/* <div className="BlogEntry">
                <div className="BlogDate">
                    2021-10-31
                </div>
                <div className="BlogText">
                    Summary
                    <ul>
                        <li>X</li>
                        <li>Y</li>
                        <li>Z</li>
                    </ul>
                </div>
            </div>
            <hr /> */}

            <div className="BlogEntry">
                <div className="BlogDate">
                    2021-10-20
                </div>
                <div className="BlogText">
                    Continued changes from 10-15
                    <ul>
                        <li>Button functionality completed</li>
                        <li>Report text and display functionality completed</li>
                        <li>Made minor style adjustments to Teaching Console</li>
                    </ul>
                </div>
            </div>
            <hr />

            <div className="BlogEntry">
                <div className="BlogDate">
                    2021-10-15
                </div>
                <div className="BlogText">
                    Changed layout and functionality of Teacher Console buttons
                    <ul>
                        <li>All books and sections included in button layout</li>
                        <li>Solid button styles sections with data</li>
                        <li>Icons added</li>
                    </ul>
                </div>
            </div>
            <hr />

            <div className="BlogEntry">
                <div className="BlogDate">
                    2021-10-14
                </div>
                <div className="BlogText">
                    Started responsive design implementation for iPad and iPhone 7
                    <ul>
                        <li>Included desktop-first responsive design for designated pages</li>
                        <li>Minor layout changes for iPad and iPad Pro</li>
                        <li>Major layout changes for iPhone 7 (and like displays)</li>
                    </ul>
                </div>
            </div>
            <hr />

            <div className="BlogEntry">
                <div className="BlogDate">
                    2021-10-13
                </div>
                <div className="BlogText">
                    Testing carried out and layout details modified
                    <ul>
                        <li>Testing flow of data from student report creation to teacher reading</li>
                        <li>Button and text layout in Teacher Book Report Section modified</li>
                        <li>Home page and mini blog content created</li>
                    </ul>
                </div>
            </div>
            <hr />

            <div className="BlogEntry">
                <div className="BlogDate">
                    2021-10-12
                </div>
                <div className="BlogText">
                    Teacher Console - Teacher Book Reports section updated
                    <ul>
                        <li>Teacher Console navigation buttons and dynamic components created </li>
                        <li>Teacher Book Reports dynamic buttons layout and functionality for existing texts created</li>
                        <li>Display window created to display data</li>
                    </ul>
                </div>
            </div>
            <hr />

            <div className="BlogEntry">
                <div className="BlogDate">
                    2021-10-11
                </div>
                <div className="BlogText">
                    Firebase Authentication and sign in features built
                    <ul>
                        <li>Set up user authentication procedure and protocol in Firebase</li>
                        <li>Teacher Login section connected to Firebase. Structure implemented</li>
                        <li>Barebones Teacher Console created</li>
                    </ul>
                </div>
            </div>
            <hr />

            <div className="BlogEntry">
                <div className="BlogDate">
                    <b>2021-10-07</b>
                </div>
                <div className="BlogText">
                    Basic functionality added
                    <ul>
                        <li>Book Reports section button functionality linked up</li>
                        <li>Firebase Authentication and Realtime Database projects set up</li>
                        <li>Database structure decided and implemented</li>
                        <li>API functions created</li>
                    </ul>
                </div>
            </div>
            <hr />

            <div className="BlogEntry">
                <div className="BlogDate">
                    <b>2021-10-06</b>
                </div>
                <div className="BlogText">
                    Project started and basic functionality established
                    <ul>
                        <li>Menu navigation set up</li>
                        <li>Toriaezu logo designed and styled</li>
                        <li>Book Reports section JSON data created and lists using data implemented</li>
                        <li>Book Reports section basic layout created</li>
                    </ul>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default Blog;