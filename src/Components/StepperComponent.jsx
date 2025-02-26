import React, { useState } from "react";
import "./Stepper.css"; // Custom CSS file

const Stepper = () => {
    const [step, setStep] = useState(1);

    const navigate = (stepNumber) => {
        setStep(stepNumber);
    };

    return (
        <div className="stepper">
            {/* Steps Header */}
            <div className="steps-container">
                <div className="steps">
                    {[
                        { id: 1, icon: "fa-pencil-alt", text: "Basic Information" },
                        { id: 2, icon: "fa-info-circle", text: "Personal Data" },
                        { id: 3, icon: "fa-book-reader", text: "Terms and Conditions" },
                        { id: 4, icon: "fa-check", text: "Finish" }
                    ].map(({ id, icon, text }) => (
                        <div key={id} className={`step ${step === id ? "active" : ""}`}>
                            <div className="step-title">
                                <span className="step-number">{`0${id}`}</span>
                                <i className={`fa ${icon}`}></i>
                                <div className="step-text">{text}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stepper Content */}
            <div className="stepper-content-container">
                {step === 1 && (
                    <div className="stepper-content">
                        <h3>Step 1: Basic Information</h3>
                        <input type="text" placeholder="Username" className="form-control" />
                        <input type="email" placeholder="Email" className="form-control" />
                        <input type="password" placeholder="Password" className="form-control" />
                        <input type="password" placeholder="Confirm Password" className="form-control" />
                        <button className="btn next" onClick={() => navigate(2)}>Next</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="stepper-content">
                        <h3>Step 2: Personal Data</h3>
                        <input type="text" placeholder="First Name" className="form-control" />
                        <input type="text" placeholder="Last Name" className="form-control" />
                        <input type="text" placeholder="Phone Number" className="form-control" />
                        <input type="text" placeholder="Address" className="form-control" />
                        <div className="button-group">
                            <button className="btn prev" onClick={() => navigate(1)}>Previous</button>
                            <button className="btn next" onClick={() => navigate(3)}>Next</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="stepper-content">
                        <h3>Step 3: Terms and Conditions</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                        <div className="button-group">
                            <button className="btn prev" onClick={() => navigate(2)}>Previous</button>
                            <button className="btn next" onClick={() => navigate(4)}>Next</button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="stepper-content">
                        <h3>Step 4: Finish</h3>
                        <p>🎉 Congratulations! You have completed the process.</p>
                        <button className="btn prev" onClick={() => navigate(3)}>Previous</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stepper;
