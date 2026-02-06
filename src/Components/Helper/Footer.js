import React from 'react'

const Footer = ({ isVisible }) => {
    return (
        <>
            <footer className={`footer-wrapper ${isVisible ? 'expanded' : ''}`}>
                <div className="footer-wrapper__inside">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="footer-copyright">
                                    <p>
                                        <span> 2025</span>
                                        <a href="#"> © Next Gen.</a>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer