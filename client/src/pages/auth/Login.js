import React from 'react'

import loginImage from "../../assets/images/banner1.jpg"
import {InputType} from "../../components/shared/Form/InputType";

const Login = () =>{
    return (
        <>
            <div className="row g-0">
                <div className="col-md-8 form-banner">
                    <img src={loginImage} alt="loginImage"/>
                </div>
                <div className="col-md-4 form-container">
                    <form >
                        <InputType
                            labelText={"Email"}
                            labelFor={'forEmail'}
                            inputTape={'email'}
                            name={'email'}
                        />
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>

                </div>
            </div>
        </>
    )
}

export {Login};