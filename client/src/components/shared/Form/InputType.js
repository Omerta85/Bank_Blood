import React from "react";

const InputType = ({labelText,inputTape, value,onChange,name}) => {
    return (
        <>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                    {labelText}
                </label>
                <input
                    type={inputTape}
                    className="form-control"
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </div>
        </>
    );
}
export {InputType};