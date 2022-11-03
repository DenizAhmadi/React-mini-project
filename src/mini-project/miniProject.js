import React from "react";
import "./miniProject.css";
// import Logo from "../Logo";

function HwOne() {
    //   function onLogout() {

    //     localStorage.removeItem("token")
    //   }
    return (
        <>
            <div className='container'>
                {/* <div className='first-header'>
                        <div className='icons'>
                            <script
                                src='https://kit.fontawesome.com/a076d05399.js'
                                crossorigin='anonymous'
                            ></script>

                            <i class='fa fa-twitter'></i>
                            <i class='fa fa-instagram'></i>
                            <i class='fa fa-facebook-f'></i>
                            <i class='fa fa-telegram'></i>
                            <i class='fa fa-youtube-play'></i>
                        </div>

                        <div className='search-container'>
                            <button className='search-btn' type='submit'>
                                <i className='fa fa-search icon'></i>
                            </button>
                            <input
                                className='mohi'
                                type='text'
                                placeholder='Search'
                                name='search'
                            />
                        </div>

                        <div className='active-two'>
                            <ul>
                                {localStorage.getItem("token") ==
                                "2mlkcmwle" ? (
                                    <li>
                                        <p onClick={onLogout}> Logout </p>
                                    </li>
                                ) : (
                                    <>
                                        <li>
                                            <a href='/signup'> Sign up </a>
                                        </li>

                                        <li>
                                            <a href='/login'> Login </a>
                                        </li>
                                    </>
                                )}

                                <li>
                                    <a href='#ListenNow'>
                                        {" "}
                                        <b> Listen Now </b>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <link
                            rel='stylesheet'
                            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
                        />
                    </div> */}

                <div className='second-header'>
                    {/* <p className="logo"> <b> Hawdom </b>music</p> */}
                    <ul>
                        <li>
                            {/* <a class='active' href='#Music '>
                                    {" "}
                                    Music{" "}
                                </a> */}
                            <div className='map'>
                                <img
                                    src={process.env.PUBLIC_URL + "/Logo.png"}
                                    width='50'
                                    alt='logo'
                                />
                            </div>
                        </li>

                        <li>
                            <a href='#Video'> نقشه </a>
                        </li>

                        <li>
                            <a href='#Playlist'>داشبورد</a>
                        </li>

                        <li>
                            <a href='#Podcast'> تاریخچه </a>
                        </li>

                        <li>
                            <a href='#Event'> هشدارها </a>
                        </li>

                        <li>
                            <a href='#Blog '> مدیریت موقعیت یاب ها </a>
                        </li>

                        <li>
                            <a href='#AboutUs'> پروفایل کاربران </a>
                        </li>

                        <li>
                            <a href='#Album'> مدیریت کاربران </a>
                            {/* <img src={Logo} width="100" alt="logo"/> */}
                            {/* <img src={process.env.PUBLIC_URL+ "/Logo.png"} width="100" alt="logo"/> */}
                        </li>

                        <li>
                            <a href='#Blog '> محدوده ی جغرافیایی </a>
                        </li>

                        <li>
                            <a href='#AboutUs'> پایش مسیر </a>
                        </li>

                        <span className='spacer' />
                        
                            <p className='logo'>
                                <img
                                    src={process.env.PUBLIC_URL + "/Avatar.png"}
                                    alt='Avatar' 
                                    className='avatar'
                                 
                                />
                            </p>
                       
                    </ul>
                </div>

                <div className='main'>
                    {/* {localStorage.getItem("token") == "2mlkcmwle" ? (
                            <Switch>
                                <Route path='/Dashboard'>
                                    {" "}
                                    <h1 style={{ color: "#fff" }}>
                                        {" "}
                                        Welcom to dashboard
                                    </h1>{" "}
                                </Route>
                                <Route path='*'>
                                    <Redirect to='/Dashboard' />
                                </Route>
                            </Switch>
                        ) : (
                            <Switch>
                                <Route path='/Password' component={Signin} />
                                <Route path='/Signup' component={Signup} />
                                <Route path='/login' component={Reset} />
                                <Route path='*'>
                                    {" "}
                                    <Redirect to='/Signup' />
                                </Route>
                            </Switch>
                        )} */}
                </div>
            </div>
        </>
    );
}

export default HwOne;
