import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { firebaseAuth } from '../../firebase'
import { GoogleAuthProvider, RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import './Signin.css'

function Signin() {
    const [mobile, setMobile] = useState('')
    const [otp, setOtp] = useState('')
    const [showMobileHideOtp, setShowMobileHideOtp] = useState(true)
    const [error, setError] = useState()
    const history = useHistory()
    useEffect(() => {
    })
    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible'
        }, firebaseAuth);
    }
    const signin = () => {
        if (mobile.length === 10) {
            generateRecaptcha()
            let appVerifier = window.recaptchaVerifier
            signInWithPhoneNumber(firebaseAuth, "+91" + mobile, appVerifier).then((confirmationResult) => {
                window.confirmationResult = confirmationResult
                setShowMobileHideOtp(false)
                setError('')
            }).catch((error) => {
                setError(error.message)
            })
        }
        else {
            setError('Enter valid Mobile')
        }
    }
    const verifyOtp = () => {
        if (otp.length === 6) {
            let confirmationResult = window.confirmationResult
            confirmationResult.confirm(otp).then((result) => {
                history.push('/')
                setError('')
            }).catch(() => {
                setError('Enter valid OTP')
            })
        }
        else {
            setError('Enter valid OTP')
        }
    }
    const googleSignIn = () => {
        const googleProvider = new GoogleAuthProvider()
        signInWithPopup(firebaseAuth, googleProvider).then((result) => {
            console.log(result)
            history.push('/')
            setError('')
        }).catch(() => {
            setError('Popup Closed by the User')
        })
    }
    const guestSignIn = () => {
        signInWithEmailAndPassword(firebaseAuth, 'guest@netflixme.com', 'guest@netflixme').then((result) => {
            console.log(result)
            history.push('/')
            setError('')
        }).catch((error) => {
            setError(error.message)
        })
    }
    return (
        <div className="signin">
            <div className="signin-content container m-0">
                <h1 className="title">Unlimited movies, TV shows and more.</h1>
                <div className="description">Ready to watch? Sign in to create your membership.</div>
                <div className='form-row signin-form'>
                    <div className="form-group col-md-9">
                        {showMobileHideOtp ? <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">+91</div>
                            </div>
                            <input type="tel" name="mobile" value={mobile} className="form-control" placeholder="Enter Mobile" onChange={(e) => setMobile(e.target.value)} />
                        </div> : <input type="number" name="otp" value={otp} className="form-control" placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} />}
                        <div className="signin-error">{error}</div>
                    </div>
                    <div className="form-group col-md-3 otp-signin" >
                        {showMobileHideOtp ? <button className="btn btn-danger" onClick={signin}>Get Started</button> : <button className="btn btn-danger" onClick={verifyOtp}>Verify OTP</button>}
                    </div>
                    {showMobileHideOtp &&
                        <div className="form-group col-md-6 other-signin">
                            <button className="btn" onClick={googleSignIn}>
                                <img src="https://banner2.cleanpng.com/20171216/6c0/google-png-5a3554027e9924.3682726615134443545186.jpg" alt="Google logo" height='25px' />
                                <span style={{ marginLeft: '1px' }}>Sign in with Google</span>
                            </button>
                        </div>
                    }
                    {showMobileHideOtp &&
                        <div className="form-group col-md-6 other-signin">
                            <button className="btn" onClick={guestSignIn}>
                                <img src="https://icons.veryicon.com/png/o/miscellaneous/youyinzhibo/guest.png" alt="Google logo" height='25px' />
                                <span style={{ marginLeft: '5px' }}>Sign in with Guests</span>
                            </button>
                        </div>
                    }
                </div>
            </div>
            <div id="recaptcha-container"></div>
        </div >
    )
}

export default Signin