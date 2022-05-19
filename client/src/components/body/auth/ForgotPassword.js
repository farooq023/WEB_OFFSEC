import React, {useState} from 'react'
import axios from 'axios'
import {isEmail} from '../../utils/validation/Validation'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'

const initialState = {
    email: '',
    err: '',
    success: ''
}

function ForgotPassword() {
    const [data, setData] = useState(initialState)

    const {email, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }

    const forgotPassword = async () => {
        if(!isEmail(email))
            return setData({...data, err: 'Invalid email.', success: ''})
            
        try {
            const res = await axios.post('/user/forgot', {email})

            return setData({...data, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && setData({...data, err:  err.response.data.msg, success: ''})
        }
    }
    
    return (
        <div className="fg_pass" style={{ height: "100vh", width: "100%", backgroundColor: "#F0F2F5" }}>
            <div style={{display:"flex", alignItems: "center", flexDirection: "column"}}>
                <h2 style={{marginTop:"12vh", color:"var(--primary-color)"}}>Forgot Your Password?</h2>
                <div className="row">
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}

                    <label style={{color:"var(--primary-color)"}} htmlFor="email">Enter your email address:</label>
                    <input style={{borderRadius: "25px", borderColor:"var(--primary-color)"}} type="email" name="email" id="email" value={email} onChange={handleChangeInput} />
                    <div style={{display:"flex", justifyContent:"center"}}>
                    <button style={{borderRadius: "25px", backgroundColor:"var(--primary-color)", borderColor:"var(--primary-color)"}}
                        onClick={forgotPassword}>Verify your email
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
 