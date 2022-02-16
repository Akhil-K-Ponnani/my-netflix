import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { firebaseAuth } from '../../firebase'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
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
    return (
        <div className="signin">
            <div className="signin-content container m-0">
                <h1 className="title">Unlimited movies, TV shows and more.</h1>
                <div className="description">Ready to watch? Enter your Mobile to create your membership.</div>
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
                    <div className="form-group col-md-3">
                        {showMobileHideOtp ? <button className="btn btn-danger" onClick={signin}>Get Started</button> : <button className="btn btn-danger" onClick={verifyOtp}>Verify OTP</button>}
                    </div>
                </div>
            </div>
            <div id="recaptcha-container"></div>
        </div>
    )
}

export default Signin