import { MDBFooter, MDBIcon } from 'mdb-react-ui-kit';
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../css/fotter.css'



//here component use in App to use in all pages
function Fotter() {


    let storedTheme = localStorage.getItem("theme");


    if (storedTheme === "light") {

        return (
            <div>
                <div className='Fotr'>

                    <MDBFooter className='text-center text-white fotrIconFirst'>

                        <div className='container p-4 pb-0'>
                            <section className='mb-4'>
                                {/* <a
                                    className='btn btn-primary btn-floating m-1'
                                    style={{ backgroundColor: '#3b5998', border: "none" }}
                                    href='https://www.facebook.com/profile.php?id=100007268836178'
                                    role='button'
                                >
                                    <MDBIcon fab icon='facebook-f' />
                                </a> */}


                                <a
                                    className='btn btn-primary btn-floating m-1'
                                    style={{ backgroundColor: '#ac2bac', border: "none" }}
                                    href='https://instagram.com/ritterss?igshid=NTc4MTIwNjQ2YQ=='
                                    role='button'
                                >
                                    <MDBIcon fab icon='instagram' />
                                </a>


                                {/* <a
                                    className='btn btn-primary btn-floating m-1'
                                    style={{ backgroundColor: '#0077b5', border: "none" }}
                                    href='https://www.linkedin.com/in/artem-kot96'
                                    role='button'
                                >
                                    <MDBIcon fab icon='linkedin' />
                                </a> */}

                            </section>
                        </div>

                        <div className='text-center p-3 endDark' >
                            <p>© 2023 create Hanna Lonskaya</p>
                        </div>
                        
                    </MDBFooter>
                </div>
            </div>
        )
    }



    else {

        return (
            <div>
                <div className='Fotr'>

                    <MDBFooter className='text-center text-white fotrIcon'>

                        <div className='container p-4 pb-0'>
                            <section className='mb-4'>
                                <a
                                    className='btn btn-primary btn-floating m-1'
                                    style={{ backgroundColor: '#3b5998', border: "none" }}
                                    href='https://www.facebook.com/profile.php?id=100007268836178'
                                    role='button'
                                >
                                    <MDBIcon fab icon='facebook-f' />
                                </a>


                                <a
                                    className='btn btn-primary btn-floating m-1'
                                    style={{ backgroundColor: '#ac2bac', border: "none" }}
                                    href='https://www.instagram.com/artem_kot96'
                                    role='button'
                                >
                                    <MDBIcon fab icon='instagram' />
                                </a>


                                <a
                                    className='btn btn-primary btn-floating m-1'
                                    style={{ backgroundColor: '#0077b5', border: "none" }}
                                    href='https://www.linkedin.com/in/artem-kot96'
                                    role='button'
                                >
                                    <MDBIcon fab icon='linkedin' />
                                </a>

                            </section>
                        </div>

                        <div className='text-center p-3 end' >
                            <p>© 2023 create Hanna Lonskaya</p>
                        </div>

                    </MDBFooter>
                </div>
            </div>
        )
    }

}

export default Fotter;