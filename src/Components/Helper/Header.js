import React, { useEffect, useState, useContext } from 'react'
import searchImg from "../../assets/img/svg/search.svg"
import aligncenter from "../../assets/img/svg/align-center-alt.svg"
import author from "../../assets/img/author-nav.jpg"
import ekologo from '../../assets/img/logo.png'
import { Link, useNavigate } from 'react-router-dom'

import team1 from '../../assets/img/team-1.png'
import bell from '../../assets/img/svg/alarm.svg'
import inbox from '../../assets/img/svg/inbox.svg'
import upload from '../../assets/img/svg/upload.svg'
import login from '../../assets/img/svg/log-in.svg'
import sign from '../../assets/img/svg/at-sign.svg'
import heart from '../../assets/img/svg/heart.svg'
import { useProfile } from '../../Context/UserContext'
import { imgUrl } from '../Services/api'

const Header = ({ handleToggle }) => {
    const { profile, fetchProfile } = useProfile();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("adminToken")
        navigate('/login')
    }
    useEffect(() => {
        fetchProfile();
    }, []);
    return (
        <>
            <div className="mobile-search">
                <form action="" className="search-form">
                    <img src={searchImg} alt="search" className="svg" />
                    <input
                        className="form-control me-sm-2 box-shadow-none"
                        type="search"
                        placeholder="Search..."
                        aria-label="Search"
                    />
                </form>
            </div>
            <div className="mobile-author-actions" />
            <header className="header-top">
                <nav className="navbar navbar-light">
                    <div className="navbar-left">
                        <div className="logo-area">
                            <Link className="navbar-brand" to="/">
                                <img className="dark" src={ekologo} alt="logo" />
                                <img className="light" src={ekologo} alt="logo" />
                            </Link>
                            <Link className="sidebar-toggle" onClick={handleToggle}>
                                <img
                                    className="svg"
                                    src={aligncenter}
                                    alt="img"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-right">
                        <ul className="navbar-right__menu">
                            <li className="nav-author">
                                <div className="dropdown-custom">
                                    <Link to="" className="nav-item-toggle">
                                        <img src={profile.profile_img ? `${imgUrl}/${profile.profile_img}` : team1} alt="" className="rounded-circle" />
                                        <span className="nav-item__title">
                                            {profile?.first_name}{" "} {profile?.last_name}
                                            <i className="las la-angle-down nav-item__arrow" />
                                        </span>
                                    </Link>
                                    <div className="dropdown-parent-wrapper">
                                        <div className="dropdown-wrapper">
                                            <div className="nav-author__info">
                                                <div className="author-img">
                                                    <img
                                                        src={profile.profile_img ? `${imgUrl}/${profile.profile_img}` : team1}
                                                        alt=""
                                                        className="rounded-circle"
                                                    />
                                                </div>
                                                <div>
                                                    <h6>{profile?.first_name}{" "} {profile?.last_name}</h6>
                                                    <span>Admin</span>
                                                </div>
                                            </div>
                                            <div className="nav-author__options">
                                                <ul>
                                                    <li>
                                                        <Link to="/profile">
                                                            <i className="uil uil-user" /> Profile
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/setting">
                                                            <i className="uil uil-setting" /> Setting
                                                        </Link>
                                                    </li>
                                                </ul>
                                                <a onClick={handleLogout} className="nav-author__signout">
                                                    <i className="uil uil-sign-out-alt" /> Sign Out
                                                </a>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header