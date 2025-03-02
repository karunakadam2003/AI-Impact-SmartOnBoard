import React, { useState } from "react";
import "./Stepper.css"; // Custom CSS file
import axios from 'axios';

const Stepper = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    const navigate = (stepNumber) => {
        setStep(stepNumber);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        try {
            // Send the form data to the server
            await axios.post('http://localhost:8000/saveFormData', {
                formData
            });
            alert('Data saved successfully!');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleFinish = () => {
        handleSubmit();
        navigate(8);
    }

    return (
        <div className="stepper">
            {/* Steps Header */}
            <div className="steps-container">
                <div className="steps">
                    {[
                        // { id: 1, icon: "fa-pencil-alt", text: "Client Overview" },
                        // { id: 2, icon: "fa-info-circle", text: "Contact Information" },
                        // { id: 3, icon: "fa-users", text: "Ownership and Legal Structure" },
                        // { id: 4, icon: "fa-chart-line", text: "Financial Information" },
                        // { id: 5, icon: "fa-shield-alt", text: "Regulatory and Compliance" },
                        // { id: 6, icon: "fa-university", text: "Banking Services Requested" },
                        // { id: 7, icon: "fa-sticky-note", text: "Important Notes" },
                        // { id: 8, icon: "fa-check", text: "Finish" }



                        { id: 1, icon: "fa-pencil-alt", text: "Client Overview" },
                        { id: 2, icon: "fa-users", text: "Ownership and Legal Structure" },
                        { id: 3, icon: "fa-chart-line", text: "Financial Information" },
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
                        <h3>Client Overview</h3>
                        <input type="text" name="clientLegalName" placeholder="Client Legal Name" className="form-control" onChange={handleChange} />
                        <input type="text" name="dba" placeholder="DBA (Doing Business As)" className="form-control" onChange={handleChange} />
                        <input type="text" name="industry" placeholder="Industry" className="form-control" onChange={handleChange} />
                        <input type="text" name="businessType" placeholder="Business Type" className="form-control" onChange={handleChange} />
                        <input type="date" name="dateOfIncorporation" placeholder="Date of Incorporation" className="form-control" onChange={handleChange} />
                        <input type="text" name="clientId" placeholder="Client ID (Internal)" className="form-control" onChange={handleChange} />
                        <input type="text" name="relationshipManager" placeholder="Relationship Manager" className="form-control" onChange={handleChange} />
                        <button className="btn next" onClick={() => navigate(2)}>Next</button>
                    </div>
                )}

                {/* {step === 2 && (
                    <div className="stepper-content">
                        <h3>Contact Information</h3>
                        <input type="text" name="primaryContact" placeholder="Primary Contact" className="form-control" onChange={handleChange} />
                        <input type="text" name="name" placeholder="Name" className="form-control" onChange={handleChange} />
                        <input type="text" name="title" placeholder="Title" className="form-control" onChange={handleChange} />
                        <input type="email" name="email" placeholder="Email" className="form-control" onChange={handleChange} />
                        <input type="number" name="phone" placeholder="Phone" className="form-control" onChange={handleChange} />
                        <input type="text" name="mailingAddress" placeholder="Mailing Address" className="form-control" onChange={handleChange} />
                        <input type="text" name="physicalAddress" placeholder="Physical Address" className="form-control" onChange={handleChange} />
                        <div className="button-group">
                            <button className="btn prev" onClick={() => navigate(1)}>Previous</button>
                            <button className="btn next" onClick={() => navigate(3)}>Next</button>
                        </div>
                    </div>
                )} */}

                {step === 2 && (
                    <div className="stepper-content">
                        <h3>Ownership and Legal Structure</h3>
                        <input type="text" name="ubos" placeholder="Ultimate Beneficial Owner(s) (UBOs)" className="form-control" onChange={handleChange} />
                        <input type="number" name="ownershipPercentage" placeholder="Ownership percentage" className="form-control" onChange={handleChange} />
                        <input type="text" name="details" placeholder="Details" className="form-control" onChange={handleChange} />
                        <input type="text" name="keyManagement" placeholder="Key Management" className="form-control" onChange={handleChange} />
                        <input type="text" name="registeredAgent" placeholder="Registered Agent" className="form-control" onChange={handleChange} />
                        <input type="text" name="stateOfIncorporation" placeholder="State of Incorporation" className="form-control" onChange={handleChange} />
                        <input type="number" name="federalTaxId" placeholder="Federal Tax ID (EIN)" className="form-control" onChange={handleChange} />
                        <div className="button-group">
                            <button className="btn prev" onClick={() => navigate(1)}>Previous</button>
                            <button className="btn next" onClick={() => navigate(3)}>Next</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="stepper-content">
                        <h3>Financial Information</h3>
                        <input type="text" name="annualRevenue" placeholder="Annual Revenue (Most Recent Year)" className="form-control" onChange={handleChange} />
                        <input type="text" name="netIncome" placeholder="Net Income (Most Recent Year)" className="form-control" onChange={handleChange} />
                        <input type="number" name="numberOfEmployees" placeholder="Number of Employees" className="form-control" onChange={handleChange} />
                        <input type="text" name="primaryBank" placeholder="Primary Bank (Currently)" className="form-control" onChange={handleChange} />
                        <input type="text" name="purposeOfAccount" placeholder="Purpose of Account" className="form-control" onChange={handleChange} />
                        <input type="text" name="monthlyTransactionVolume" placeholder="Anticipated Monthly Transaction Volume" className="form-control" onChange={handleChange} />
                        <input type="text" name="credits" placeholder="Credits" className="form-control" onChange={handleChange} />
                        <input type="text" name="debits" placeholder="Debits" className="form-control" onChange={handleChange} />
                        <input type="text" name="internationalTransactions" placeholder="International Transactions" className="form-control" onChange={handleChange} />
                        <div className="button-group">
                            <button className="btn prev" onClick={() => navigate(2)}>Previous</button>
                            <button className="btn next" onClick={() => navigate(4)}>Next</button>
                        </div>
                    </div>
                )}

                {/* {step === 5 && (
                    <div className="stepper-content">
                        <h3>Regulatory and Compliance</h3>
                        <input type="text" name="amlKycCompliance" placeholder="AML/KYC Compliance" className="form-control" onChange={handleChange} />
                        <input type="text" name="ofacScreening" placeholder="OFAC Screening" className="form-control" onChange={handleChange} />
                        <input type="text" name="industrySpecificRegulations" placeholder="Industry-Specific Regulations" className="form-control" onChange={handleChange} />
                        <input type="text" name="licensesAndPermits" placeholder="Licenses and Permits" className="form-control" onChange={handleChange} />
                        <div className="button-group">
                            <button className="btn prev" onClick={() => navigate(4)}>Previous</button>
                            <button className="btn next" onClick={() => navigate(6)}>Next</button>
                        </div>
                    </div>
                )} */}

                {/* {step === 6 && (
                    <div className="stepper-content">
                        <h3>Banking Services Requested</h3>
                        <input type="text" name="checkingAccounts" placeholder="Checking Account(s)" className="form-control" onChange={handleChange} />
                        <input type="text" name="onlineBanking" placeholder="Online Banking" className="form-control" onChange={handleChange} />
                        <input type="text" name="wireTransfers" placeholder="Wire Transfers" className="form-control" onChange={handleChange} />
                        <input type="text" name="achOrigination" placeholder="ACH Origination" className="form-control" onChange={handleChange} />
                        <input type="text" name="rdc" placeholder="Remote Deposit Capture (RDC)" className="form-control" onChange={handleChange} />
                        <input type="text" name="lockboxServices" placeholder="Lockbox Services (Potential Future Need)" className="form-control" onChange={handleChange} />
                        <div className="button-group">
                            <button className="btn prev" onClick={() => navigate(5)}>Previous</button>
                            <button className="btn next" onClick={() => navigate(7)}>Next</button>
                        </div>
                    </div>
                )} */}

                {/* {step === 7 && (
                    <div className="stepper-content">
                        <h3>Important Notes</h3>
                        <input type="text" name="importantNotes" placeholder="Important Notes" className="form-control" onChange={handleChange} />
                        <div className="button-group">
                            <button className="btn prev" onClick={() => navigate(6)}>Previous</button>
                            <button className="btn next" onClick={handleFinish}>Finish</button>
                        </div>
                    </div>
                )} */}

                {step === 4 && (
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
