import React, { useState } from 'react'
import Header from './Helper/Header'
import Siderbar from './Helper/Siderbar'
import { Outlet } from 'react-router-dom'
import Footer from './Helper/Footer'

const Layout = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleSidebar = () => {
        setIsVisible(!isVisible);
    };

    return (
        <>
            <div className='layout-light side-menu'>
                <Header handleToggle={toggleSidebar} />
                <main className="main-content">
                    <Siderbar isVisible={isVisible} />
                    <div className={`contents ${isVisible ? 'expanded' : ''}`}>
                        <Outlet />
                    </div>
                    <Footer isVisible={isVisible} />
                </main>
                <div className={`overlay-dark-sidebar ${isVisible ? 'show' : ''}`} />
                <div className="customizer-overlay" />
            </div>
        </>
    )
}

export default Layout