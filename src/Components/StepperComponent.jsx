import React, { useState } from "react";
import "./Stepper.css"; // Custom CSS file

const Stepper = () => {
    const [step, setStep] = useState(1);

    const navigate = (stepNumber) => {
        setStep(stepNumber);
    };

    return (
        <div className="stepper">
            {/* /* Steps Header */}
            <div className="steps-container">
                <div className="steps">
                    {[
                        { id: 1, icon: "fa-pencil-alt", text: "Client Overview" },
                        { id: 2, icon: "fa-info-circle", text: "Contact Information" },
                        { id: 3, icon: "fa-users", text: "Ownership and Legal Structure" },
                        { id: 4, icon: "fa-chart-line", text: "Financial Information" },
                        { id: 5, icon: "fa-shield-alt", text: "Regulatory and Compliance" },
                        { id: 6, icon: "fa-university", text: "Banking Services Requested" },
                        { id: 7, icon: "fa-sticky-note", text: "Important Notes" },
                        { id: 8, icon: "fa-check", text: "Finish" }
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
                        <h3>Client Overview</h3>
                        <input type="text" placeholder="Client Legal Name" className="form-control" />
                        <input type="text" placeholder="DBA (Doing Business As)" className="form-control" />
                        <input type="text" placeholder="Industry" className="form-control" />
                        <input type="text" placeholder="Business Type" className="form-control" />
                        <input type="date" placeholder="Date of Incorporation" className="form-control" />
                        <input type="text" placeholder="Client ID (Internal)" className="form-control" />
                        <input type="text" placeholder="Relationship Manager" className="form-control" />
                        <button className="btn next" onClick={() => navigate(2)}>Next</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="stepper-content">
                        <h3>Contact Information</h3>
                        <input type="text" placeholder="Primary Contact" className="form-control" />
                        <input type="text" placeholder="Name" className="form-control" />
                        <input type="text" placeholder="Title" className="form-control" />
                        <input type="email" placeholder="Email" className="form-control" />
                        <input type="number" placeholder="Phone" className="form-control" />
                        <input type="text" placeholder="Mailing Address" className="form-control" />
                        <input type="text" placeholder="Physical Address" className="form-control" />
                        <div className="button-group">
                            <button className="btn prev" onClick={() => navigate(1)}>Previous</button>
                            <button className="btn next" onClick={() => navigate(3)}>Next</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="stepper-content">
                        <h3>Ownership and Legal Structure</h3>
                        <input type="text" placeholder="Ultimate Beneficial Owner(s) (UBOs)" className="form-control" />
                        <input type="number" placeholder="Ownership percentage" className="form-control" />
                        <input type="text" placeholder="Details" className="form-control" />
                        <input type="text" placeholder="Key Management" className="form-control" />
                        <input type="text" placeholder="Registered Agent" className="form-control" />
                        <input type="text" placeholder="State of Incorporation" className="form-control" />
                        <input type="number" placeholder="Federal Tax ID (EIN)" className="form-control" />
                        <div className="button-group">
                            <button className="btn prev" onClick={() => navigate(2)}>Previous</button>
                            <button className="btn next" onClick={() => navigate(4)}>Next</button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="stepper-content">
                        <h3>Financial Information</h3>
                        <input type="text" placeholder="Annual Revenue (Most Recent Year)" className="form-control" />
                        <input type="text" placeholder="Net Income (Most Recent Year)" className="form-control" />
                        <input type="number" placeholder="Number of Employees" className="form-control" />
                        <input type="text" placeholder="Primary Bank (Currently)" className="form-control" />
                        <input type="text" placeholder="Purpose of Account" className="form-control" />
                        <input type="text" placeholder="Anticipated Monthly Transaction Volume" className="form-control" />
                        <input type="text" placeholder="Credits" className="form-control" />
                        <input type="text" placeholder="Debits" className="form-control" />
                        <input type="text" placeholder="International Transactions" className="form-control" />
                        <div className="button-group">
                            <button className="btn prev" onClick={() => navigate(3)}>Previous</button>
                            <button className="btn next" onClick={() => navigate(5)}>Next</button>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="stepper-content">
                        <h3>Regulatory and Compliance</h3>
                        <input type="text" placeholder="AML/KYC Compliance" className="form-control" />
                        <input type="text" placeholder="OFAC Screening" className="form-control" />
                        <input type="text" placeholder="Industry-Specific Regulations" className="form-control" />
                        <input type="text" placeholder="Licenses and Permits" className="form-control" />
                        <div className="button-group">
                            <button className="btn prev" onClick={() => navigate(4)}>Previous</button>
                            <button className="btn next" onClick={() => navigate(6)}>Next</button>
                        </div>
                    </div>
                )}

                {step === 6 && (
                    <div className="stepper-content">
                        <h3>Banking Services Requested</h3>
                        <input type="text" placeholder="Checking Account(s)" className="form-control" />
                        <input type="text" placeholder="Online Banking" className="form-control" />
                        <input type="text" placeholder="Wire Transfers" className="form-control" />
                        <input type="text" placeholder="ACH Origination" className="form-control" />
                        <input type="text" placeholder="Remote Deposit Capture (RDC)" className="form-control" />
                        <input type="text" placeholder="Lockbox Services (Potential Future Need)" className="form-control" />
                        <div className="button-group">
                            <button className="btn prev" onClick={() => navigate(5)}>Previous</button>
                            <button className="btn next" onClick={() => navigate(7)}>Next</button>
                        </div>
                    </div>
                )}

                {step === 7 && (
                    <div className="stepper-content">
                        <h3>Important Notes</h3>
                        <input type="text" placeholder="Lockbox Services (Potential Future Need)" className="form-control" />
                        <div className="button-group">
                            <button className="btn prev" onClick={() => navigate(6)}>Previous</button>
                            <button className="btn next" onClick={() => navigate(8)}>Finish</button>
                        </div>
                    </div>
                )}

                {step === 8 && (
                    <div className="stepper-content">
                        <h3>Finish</h3>
                        <p>🎉 Congratulations! You have completed the process.</p>
                        <button className="btn prev">Send confirmation email</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Stepper;