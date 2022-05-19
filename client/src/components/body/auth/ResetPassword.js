import React, {useState} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isLength, isMatch} from '../../utils/validation/Validation'


const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function ResetPassword() {
    const [data, setData] = useState(initialState)
    const {token} = useParams()

    const {password, cf_password, err, success} = data

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }


    const handleResetPass = async () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})
        
        try {
            const res = await axios.post('/user/reset', {password}, {
                headers: {Authorization: token}
            })

            return setData({...data, err: "", success: res.data.msg})

        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
        
    }


    return (
        <div className="fg_pass" style={{height: "100vh", width: "100%", backgroundColor: "#F0F2F5"}} >
            <div style={{display:"flex", alignItems: "center", flexDirection: "column"}}>
                <h2 style={{marginTop:"13vh", color:"var(--primary-color)"}}>Reset Your Password</h2>
                <div className="row">
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}

                    <label style={{color:"var(--primary-color)"}} htmlFor="password">Password</label>
                    <input style={{borderRadius: "25px", borderColor:"var(--primary-color)"}} type="password" name="password" id="password" value={password}
                    onChange={handleChangeInput} />

                    <label style={{color:"var(--primary-color)"}} htmlFor="cf_password">Confirm Password</label>
                    <input style={{borderRadius: "25px", borderColor:"var(--primary-color)"}} type="password" name="cf_password" id="cf_password" value={cf_password}
                    onChange={handleChangeInput} />
                    <div style={{display:"flex", justifyContent:"center", marginTop:"2vh"}}>
                        <button style={{borderRadius: "25px", backgroundColor:"var(--primary-color)", borderColor:"var(--primary-color)"}} onClick={handleResetPass}>Reset Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
