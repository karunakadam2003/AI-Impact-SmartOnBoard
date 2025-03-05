import React from "react";
import StepperComponent from "./StepperComponent";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Stepper.css"
import "./Stepper.css"; // Custom CSS file


function SmartOnboard() {
    return (
        <div>

            <div className="ps-body-container" data-pid="702-224111-64" data-ptid="tcm:702-223692-128">
                <div className="ps-emergency-message" role="region" aria-label="Alerts and Notifications">
                </div>
                {/* This is Header Component */}
                <header className="ps-masthead" role="banner" data-cid="tcm:84-224274-16" data-ctid="tcm:91-223647-32">
                    <div className="ps-masthead-wrapper">
                        <div className="new_logoOuter">
                            <div className="ps-logo-home">
                                <img src="/assets/images/rwd/wf_logo_220x23.png" alt="Wells Fargo Home Page" />
                            </div>
                        </div>
                        <nav className="ps-right-nav" aria-label="Header Navigation">
                            <ul>
                                <li><a href="locator/index.html">ATMs/Locations</a></li>
                                <li><a href="#" className="ps-masthead-help" role="button">Help</a></li>
                                <li><a href="about/index.html">About Us</a></li>
                                <li><a href="es/index.html" xmlLang="es" id="langPrefToggle" className="spTogglePersonal" name="langPrefToggle" lang="es">Español</a></li>
                                <li className="ps-search-item"><a href="#" className="ps-nxgSearchIcon" id="nxgSearchButton" aria-label="Search, Opens a dialog.">&nbsp;&nbsp;</a></li>
                                <li className="ps-sign-on-item"> <div className="ps-masthead-sign-on">
                                    <a href="https://connect.secure.wellsfargo.com/auth/login/present?origin=cob&LOB=CONS" className="ps-sign-on-text" data-platform="applicationhost" data-host="Login App Host">Sign On</a>
                                </div></li>
                            </ul>
                        </nav>
                        <button type="button" data-role="none" className="ps-hamburger-link" name="hamburger-link" data-effect="st-effect-1" aria-expanded="false" aria-label="Open Menu Navigation">
                            <div className="ps-icon-bar" />
                            <div className="ps-icon-bar" />
                            <div className="ps-icon-bar" />
                            <span>MENU</span>
                        </button>
                    </div>
                </header>

                {/* This is Header Component End*/}
                <div className="ps-support-dropdown-overlay-container" />
                <div className="ps-support-dropdown-overlay" data-cid="tcm:84-241194-16" data-ctid="tcm:91-236597-32">
                    <div className="ps-support-dropdown-hook" />
                    <div className="support-dropdown-container">
                        <div className="support-dropdown-top">
                            <div>
                                <h2 className="contact-bar-header">How can we help?</h2>
                            </div>
                            <div>
                                <ul className="support-bar-links">
                                    <li className="contact-bar-location-list">
                                        <a aria-controls="find_location_block" aria-expanded="false" className="contact-bar-collapsible contact-bar-location" href="#" role="button" tabIndex={0}>
                                            <span aria-hidden="true" className="contact-bar-location-icon">‍</span>
                                            <span aria-level={3} className="contact-bar-select" role="heading">
                                                Find a location
                                            </span>
                                            <span aria-hidden="true" className="collapsible-icon collapsible-icon-collapse">‍</span>
                                        </a>
                                        <div aria-hidden="true" className="contact-bar-content contact-bar-content-hidden" id="find_location_block">
                                            <div className="contact-bar-form-grp">
                                                <form action="https://www.wellsfargo.com/locator/search/" className="find_location" method="get" xmlns="http://www.w3.org/1999/xhtml">
                                                    <div className="contact-bar-form-input">
                                                        <input className="contact-bar-input-box" id="supportDropDownLocator" name="searchTxt" placeholder aria-label="City, State or ZIP" type="text" />
                                                        <label htmlFor="supportDropDownLocator">
                                                            City, State or ZIP
                                                        </label>
                                                    </div>
                                                    <div className="contact-bar-form-btn">
                                                        <button type="submit">
                                                            Go
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <a aria-controls="make_appointment_block" aria-expanded="false" className="contact-bar-collapsible contact-bar-appointment" href="#" role="button" tabIndex={0}>
                                            <span aria-hidden="true" className="support-dropdown-icon appointment-icon">‍</span>
                                            <span aria-level={3} className="contact-bar-select" role="heading">
                                                Make an appointment
                                            </span>
                                            <span aria-hidden="true" className="collapsible-icon collapsible-icon-collapse">‍</span>
                                        </a>
                                        <div aria-hidden="true" className="contact-bar-content contact-bar-content-hidden" id="make_appointment_block">
                                            <div className="contact-bar-form-grp">
                                                <form action="https://www.wellsfargo.com/locator/search/" className="find_location" method="get" xmlns="http://www.w3.org/1999/xhtml">
                                                    <div className="contact-bar-form-input">
                                                        <input className="contact-bar-input-box" id="supportDropDownMAA" name="searchTxt" placeholder aria-label="City, State or ZIP" type="text" />
                                                        <label htmlFor="supportDropDownMAA">
                                                            City, State or ZIP
                                                        </label>
                                                    </div>
                                                    <div className="contact-bar-form-btn">
                                                        <input className="visuallyHidden" id="maaSupportDropdown " name="maasrch" tabIndex={-1} type="text" defaultValue="Y" />
                                                        <button type="submit">
                                                            Go
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <a aria-controls="quick_help_block" aria-expanded="false" className="contact-bar-collapsible contact-bar-call" href="#" role="button" tabIndex={0}>
                                            <span aria-hidden="true" className="contact-bar-appointment-icon">‍</span>
                                            <span aria-level={3} className="contact-bar-select" role="heading"> Quick help</span>
                                            <span aria-hidden="true" className="collapsible-icon collapsible-icon-collapse">‍</span>
                                        </a>
                                        <div aria-hidden="true" className="contact-bar-content contact-bar-call-desc contact-bar-content-hidden" id="quick_help_block">
                                            <ul>
                                                <li><a href="help/index.html">Customer service and FAQs</a></li>
                                                <li> <a href="help/routing-number/index.html">Find routing and account numbers</a> </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="support-dropdown-bottom">
                            <div>
                                <h2 className="popular-faqs-header">Popular FAQs</h2>
                            </div>
                            <div>
                                <ul className="popular-faq-links">
                                    <li>
                                        <div className="ps-popular-faq-link">
                                            <div>
                                                <a href="help/routing-number/index.html">How do I find my routing and account numbers?</a>
                                                <span aria-hidden="true" className="right-chevron" />
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="ps-popular-faq-link">
                                            <div>
                                                <a href="help/online-banking/zelle-faqs/index.html#isthereafeeforzelle">Is there a fee for Zelle<sup>®</sup>?</a>
                                                <span aria-hidden="true" className="right-chevron" />
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="ps-popular-faq-link">
                                            <div>
                                                <a href="privacy-security/fraud/report/index.html">How do I report suspected fraud?</a>
                                                <span aria-hidden="true" className="right-chevron" />
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="ps-popular-faq-link">
                                            <div>
                                                <a href="help/index.html">See more FAQs</a>
                                                <span aria-hidden="true" className="right-chevron" />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ps-fat-nav-overlay" />
                <div className="ps-fat-nav-outer" data-cid="tcm:84-226512-16" data-ctid="tcm:91-226306-32">
                    <nav className="ps-fat-nav-wrapper" aria-label="Main Navigation">
                        <div className="ps-fat-nav-hook" />
                        <div className="ps-fat-nav-l1">
                            <div className="ps-fat-nav-search">
                                <button className="fat-nav-search" id="nxgSearchButton"><span className="fat-nav-search-icon">‍</span>
                                    <span className="ps-search-text">Search</span>
                                </button>
                            </div>
                            <div className="ps-fat-nav-l1-links active">
                                <ul>
                                    <li className="ps-fat-nav-item"><a data-platform="publicsite" href="investing-wealth/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Investing &amp; Wealth Management</a></li>
                                    <li className="ps-fat-nav-item"><a data-platform="publicsite" href="biz/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Small Business</a></li>
                                    <li className="ps-fat-nav-item"><a data-platform="publicsite" href="com/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Commercial Banking</a></li>
                                    <li className="ps-fat-nav-item"><a data-platform="publicsite" href="cib/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Corporate &amp; Investment Banking</a></li>
                                    <li className="ps-fat-nav-item"><a href="/onboarding">Commercial onboarding</a></li>
                                </ul>
                            </div>
                            <div className="ps-fat-nav-l1-extras">
                                <ul>
                                    <li className="ps-fat-nav-extra"><a href="locator/index.html">ATMs/Locations</a></li>
                                    <li className="ps-fat-nav-extra"><a data-platform="publicsite" href="help/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Customer service and FAQs</a></li>
                                    <li className="ps-fat-nav-extra"><a data-platform="publicsite" href="about/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">About Us</a></li>
                                    <li className="ps-fat-nav-extra"><a href="es/index.html" id="langPrefToggle" className="spTogglePersonal" name="langPrefToggle" xmlLang="es" lang="es">Español</a></li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <div className="ps-fat-nav-l3-wrapper ps-fat-nav-l3-override">
                        <div className="ps-fat-nav-hook" />
                        <div className="ps-fat-nav-l3" data-matching-href="/checking/">
                            <div className="ps-fat-nav-search">
                                <button className="fat-nav-search" id="nxgSearchButton"><span className="fat-nav-search-icon">‍</span>
                                    <span className="ps-search-text">Search</span>
                                </button>
                            </div>
                            <div className="ps-fat-nav-l3-primary">
                                <div className="ps-fat-nav-l3-back"><a href="#" className="l3-back-link"><span className="ps-fat-nav-arrow is-left" aria-hidden="true">‍</span>Back</a></div>
                                <div className="ps-fat-nav-l3-ctas">
                                    <a data-platform="publicsite" href="checking/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="ps-fat-nav-l3-primary-button" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">View all checking accounts</a>
                                    <a data-platform="publicsite" href="checking/compare-checking-accounts/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="ps-fat-nav-l3-secondary-button" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Compare checking accounts</a>
                                </div>
                                <div className="ps-fat-nav-l3-products">
                                    <a data-platform="publicsite" href="checking/clear-access-banking/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-piggybank">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Clear Access Banking&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                An account that helps you spend only what you have in it
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a href="checking/prime/index.html" className="l3-product-tile">
                                        <div className="l3-product-icon icon-percentage">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Prime Checking&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Many discounts and benefits are included with this interest-bearing account
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a href="checking/everyday/index.html" className="l3-product-tile">
                                        <div className="l3-product-icon icon-star">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Everyday Checking&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Our most popular account for managing day-to-day financial needs
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a href="checking/premier/index.html" className="l3-product-tile">
                                        <div className="l3-product-icon icon-star-in-hand">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Premier Checking&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                An interest-bearing account with our premier level of relationship banking benefits
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a data-platform="publicsite" href="checking/student/index.html" data-newbrowser data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-apple">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Student/teen banking&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Account options ideal for teens and students
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                </div>
                            </div>
                            <div className="ps-fat-nav-l3-secondary">
                                <div className="ps-fat-nav-l3-services">
                                    <h3 className="l3-headline">BANKING SERVICES</h3>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="help/routing-number/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Routing and account numbers </a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="checking/overdraft-services/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Overdraft services</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="privacy-security/fraud/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Security and fraud</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="help/checking-savings/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Checking FAQs</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="international-remittances/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Global remittance</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="https://appointments.wellsfargo.com/maa/appointment/" enrollmentid={2935} className>Make an appointment</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="foreign-exchange/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Foreign exchange</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="goals-banking-made-easy/activate-debit-card/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Activate debit card</a>
                                    </div>
                                    <h3 className="l3-headline">DIGITAL BANKING</h3>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="mobile-online-banking/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Wells Fargo Online<sup>®</sup></a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="mobile-online-banking/apps/index.html" className>Wells Fargo Mobile<sup>®</sup> app</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="mobile-online-banking/transfer-pay/index.html" className>Transfer and pay</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="privacy-security/fraud/report/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Report fraud</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ps-fat-nav-l3" data-matching-href="/savings-cds/">
                            <div className="ps-fat-nav-search">
                                <button className="fat-nav-search" id="nxgSearchButton"><span className="fat-nav-search-icon">‍</span>
                                    <span className="ps-search-text">Search</span>
                                </button>
                            </div>
                            <div className="ps-fat-nav-l3-primary">
                                <div className="ps-fat-nav-l3-back"><a href="#" className="l3-back-link"><span className="ps-fat-nav-arrow is-left" aria-hidden="true">‍</span>Back</a></div>
                                <div className="ps-fat-nav-l3-ctas">
                                    <a data-platform="publicsite" href="savings-cds/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="ps-fat-nav-l3-primary-button" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">View all savings accounts</a>
                                    <a data-platform="publicsite" href="savings-cds/rates/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="ps-fat-nav-l3-secondary-button" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Check all rates</a>
                                </div>
                                <div className="ps-fat-nav-l3-products">
                                    <a data-platform="publicsite" href="savings-cds/way2save/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-dollar-bills">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Way2Save<sup>®</sup> Savings&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Build your savings automatically
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a data-platform="publicsite" href="savings-cds/platinum/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-money-exchange">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Platinum Savings&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                <p className="MsoNormal">Grow your savings with more ways to access your money</p>
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a data-platform="publicsite" href="savings-cds/certificate-of-deposit/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-sprout">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Wells Fargo CDs&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Provide a guaranteed rate of return, even during uncertain times
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a data-platform="publicsite" href="savings-cds/kids/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-piggybank">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Kids Savings&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                A good way to start your children on the road to financial success
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                </div>
                            </div>
                            <div className="ps-fat-nav-l3-secondary">
                                <div className="ps-fat-nav-l3-services">
                                    <h3 className="l3-headline">BANKING SERVICES</h3>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="help/routing-number/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Routing and account numbers </a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="tax-center/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Tax center</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="privacy-security/fraud/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Security and fraud</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="help/checking-savings/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Savings FAQs</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="international-remittances/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Global remittance</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="https://appointments.wellsfargo.com/maa/appointment/" enrollmentid={2935} className>Make an appointment</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="foreign-exchange/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Foreign exchange</a>
                                    </div>
                                    <h3 className="l3-headline">DIGITAL BANKING</h3>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="mobile-online-banking/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Wells Fargo Online<sup>®</sup></a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="mobile-online-banking/apps/index.html" className>Wells Fargo Mobile<sup>®</sup> app</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="mobile-online-banking/transfer-pay/index.html" className>Transfer and pay</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ps-fat-nav-l3" data-matching-href="https://creditcards.wellsfargo.com/?sub_channel=WEB&vendor_code=WF&linkLoc=FNMC&lang=en">
                            <div className="ps-fat-nav-search">
                                <button className="fat-nav-search" id="nxgSearchButton"><span className="fat-nav-search-icon">‍</span>
                                    <span className="ps-search-text">Search</span>
                                </button>
                            </div>
                            <div className="ps-fat-nav-l3-primary">
                                <div className="ps-fat-nav-l3-back"><a href="#" className="l3-back-link"><span className="ps-fat-nav-arrow is-left" aria-hidden="true">‍</span>Back</a></div>
                                <div className="ps-fat-nav-l3-ctas">
                                    <a href="https://creditcards.wellsfargo.com/?sub_channel=WEB&vendor_code=WF&linkLoc=FNMC&lang=en" className="ps-fat-nav-l3-primary-button" data-platform="creditCardsWF">View all credit cards</a>
                                    <a href="https://web.secure.wellsfargo.com/credit-cards/yourinfo/?sub_channel=WEB&vendor_code=WF&linkloc=FNPQ&lang=en" className="ps-fat-nav-l3-secondary-button" data-platform="wstHost">See if you're prequalified</a>
                                </div>
                                <div className="ps-fat-nav-l3-products">
                                    <a href="https://creditcards.wellsfargo.com/cash-back-credit-cards/?sub_channel=WEB&vendor_code=WF&linkloc=FNCB&lang=en" className="l3-product-tile" data-platform="creditCardsWF">
                                        <div className="l3-product-icon icon-dollar-bills">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Cash back credit cards&nbsp;<span className="chevron-icon" /></div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a href="https://creditcards.wellsfargo.com/rewards-credit-cards/?sub_channel=WEB&vendor_code=WF&linkloc=FNRW&lang=en" className="l3-product-tile" data-platform="creditCardsWF">
                                        <div className="l3-product-icon icon-star">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Rewards credit cards&nbsp;<span className="chevron-icon" /></div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a href="https://creditcards.wellsfargo.com/0-percent-intro-apr-credit-cards/?sub_channel=WEB&vendor_code=WF&linkloc=FNIR&lang=en" className="l3-product-tile" data-platform="creditCardsWF">
                                        <div className="l3-product-icon icon-percentage">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">0% intro APR credit cards&nbsp;<span className="chevron-icon" /></div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a href="https://creditcards.wellsfargo.com/travel-credit-cards/?sub_channel=WEB&vendor_code=WF&linkloc=FNTR&lang=en" className="l3-product-tile" data-platform="creditCardsWF">
                                        <div className="l3-product-icon icon-airplane">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Travel credit cards&nbsp;<span className="chevron-icon" /></div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a href="https://creditcards.wellsfargo.com/balance-transfer-credit-cards/?sub_channel=WEB&vendor_code=WF&linkloc=FNBT&lang=en" data-platform="creditCardsWF" className="l3-product-tile">
                                        <div className="l3-product-icon icon-money-transfer">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Balance transfer credit cards&nbsp;<span className="chevron-icon" /></div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a href="https://creditcards.wellsfargo.com/business-credit-cards/?sub_channel=WEB&vendor_code=WF&linkLoc=FNBD&lang=en" className="l3-product-tile" data-platform="creditCardsWF">
                                        <div className="l3-product-icon icon-briefcase">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Business credit card&nbsp;<span className="chevron-icon" /></div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                </div>
                            </div>
                            <div className="ps-fat-nav-l3-secondary">
                                <div className="ps-fat-nav-l3-services">
                                    <h3 className="l3-headline">CREDIT CARD SERVICES</h3>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="https://confirmcard.wellsfargo.com/" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Confirm credit card</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="rewards/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Wells Fargo Rewards<sup>®</sup></a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="credit-cards/features/balance-transfer/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Request a balance transfer</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="https://entertainment.wf.com/?sub_channel=WEB&vendor_code=WF&linkLoc=fn" enrollmentid={0}>
                                            Wells Fargo Entertainment
                                        </a>

                                    </div>
                                    <h3 className="l3-headline">EDUCATION &amp; TOOLS</h3>
                                    <div className="l3-link-item">
                                        <a href="https://apply.wellsfargo.com/getting_started?product_code=CC&language=en&applicationtype=creditcarddirectmail&sub_channel=WEB&vendor_code=WF" data-platform="salesplatform">Respond to mail offer</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="mobile/payments/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Digital wallets</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="help/credit-cards/credit-card-faqs/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Credit card FAQs</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="goals-credit/smarter-credit/credit-101/fico/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">FICO<sup>®</sup> Credit Score</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="https://creditcards.wellsfargo.com/credit-cards-education/?sub_channel=WEB&vendor_code=WF&linkLoc=fn&lang=en" data-platform="creditCardsWF">Credit card education</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ps-fat-nav-l3" data-matching-href="/mortgage/">
                            <div className="ps-fat-nav-search">
                                <button className="fat-nav-search" id="nxgSearchButton"><span className="fat-nav-search-icon">‍</span>
                                    <span className="ps-search-text">Search</span>
                                </button>
                            </div>
                            <div className="ps-fat-nav-l3-primary">
                                <div className="ps-fat-nav-l3-back"><a href="#" className="l3-back-link"><span className="ps-fat-nav-arrow is-left" aria-hidden="true">‍</span>Back</a></div>
                                <div className="ps-fat-nav-l3-ctas">
                                    <a data-platform="publicsite" href="mortgage/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="ps-fat-nav-l3-primary-button" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">View home loans</a>
                                    <a href="mortgage/rate-quote/index.html"> <span className>Get a personalized rate quote </span> </a>
                                </div>
                                <div className="ps-fat-nav-l3-products">
                                    <a data-platform="publicsite" href="mortgage/buying-a-house/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-home-for-sale">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Buy a home&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Get started on your homeownership journey
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a data-platform="publicsite" href="mortgage/mortgage-refinance/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-percentage">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Refinance your mortgage&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Do home repairs, reduce payments, or more
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a href="mortgage/rates/index.html" className="l3-product-tile">
                                        <div className="l3-product-icon icon-percentage">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Check mortgage rates&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                See rate and APR information for popular loan types
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a href="mortgage/buying-a-house/first-time-home-buyer/index.html" className="l3-product-tile">
                                        <div className="l3-product-icon icon-piggybank">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">First-time homebuyers&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Make your dream of homeownership a reality with first-time homebuyer resources
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a href="mortgage/jump/come-home/index.html" className="l3-product-tile">
                                        <div className="l3-product-icon icon-magnifying-glass">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Shop for homes&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Access our exclusive tool for customers
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a href="mortgage/down-payment-help/index.html" className="l3-product-tile">
                                        <div className="l3-product-icon icon-home-percentage">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Low down payment options&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Learn about our low down payment and closing cost programs
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                </div>
                            </div>
                            <div className="ps-fat-nav-l3-secondary">
                                <div className="ps-fat-nav-l3-services">
                                    <h3 className="l3-headline">MORTGAGE TOOLS</h3>
                                    <div className="l3-link-item">
                                        <a href="mortgage/calculators/index.html" className>Mortgage and refinance calculators</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="mortgage/learn/index.html" className>Mortgage Learning Center</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="mortgage/apply/index.html" className>Start your application</a>
                                    </div>
                                    <h3 className="l3-headline">MORTGAGE SERVICES</h3>
                                    <div className="l3-link-item">
                                        <a href="mortgage/manage-account/index.html" className>Manage your account</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="mortgage/manage-account/payment-help/index.html" className>Get help with payment challenges</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ps-fat-nav-l3" data-matching-href="/personal-loans/">
                            <div className="ps-fat-nav-search">
                                <button className="fat-nav-search" id="nxgSearchButton"><span className="fat-nav-search-icon">‍</span>
                                    <span className="ps-search-text">Search</span>
                                </button>
                            </div>
                            <div className="ps-fat-nav-l3-primary">
                                <div className="ps-fat-nav-l3-back"><a href="#" className="l3-back-link"><span className="ps-fat-nav-arrow is-left" aria-hidden="true">‍</span>Back</a></div>
                                <div className="ps-fat-nav-l3-ctas">
                                    <a href="https://icomplete.wellsfargo.com/oas/status/personal-loans-rate-checker/getting-started/" data-platform="dsf" className="ps-fat-nav-l3-primary-button">See my loan options</a>
                                </div>
                                <div className="ps-fat-nav-l3-products">
                                    <a data-platform="publicsite" href="personal-loans/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-percentage">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Personal loans&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Learn how a personal loan can help you with funds for life events like graduations and weddings, adoption and fertility, or other needs
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a data-platform="publicsite" href="personal-loans/home-improvement/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-home-improvement">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Loans for home improvement&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Use a personal loan to pay for home renovations and repairs
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a data-platform="publicsite" href="personal-loans/uses-of-a-personal-loan/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-money-transfer">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Finance a large expense&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Pay for new appliances, car repairs, medical expenses, and more
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a data-platform="publicsite" href="personal-loans/debt-consolidation/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-bullseye">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Consolidate debt&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Combine your higher-interest debt into one manageable payment
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                </div>
                            </div>
                            <div className="ps-fat-nav-l3-secondary">
                                <div className="ps-fat-nav-l3-services">
                                    <h3 className="l3-headline">PERSONAL LOAN SERVICES</h3>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="help/loans/personal-loan-faqs/index.html#howdoiapplyforaloan" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">How to apply for a loan</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="help/loans/personal-loan-faqs/index.html#paymentsandfees" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">How to make a payment</a>
                                    </div>
                                    <h3 className="l3-headline">EDUCATION &amp; TOOLS</h3>
                                    <div className="l3-link-item">
                                        <a href="https://icomplete.wellsfargo.com/oas/status/personal-loans-rate-checker/getting-started/" data-platform="dsf">Check your rate and loan options</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="personal-loans/debt-consolidation-calculator/index.html">Debt consolidation calculator</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="financial-health/credit-and-debt/index.html">Understanding credit and debt</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ps-fat-nav-l3" data-matching-href="/auto-loans/">
                            <div className="ps-fat-nav-search">
                                <button className="fat-nav-search" id="nxgSearchButton"><span className="fat-nav-search-icon">‍</span>
                                    <span className="ps-search-text">Search</span>
                                </button>
                            </div>
                            <div className="ps-fat-nav-l3-primary">
                                <div className="ps-fat-nav-l3-back"><a href="#" className="l3-back-link"><span className="ps-fat-nav-arrow is-left" aria-hidden="true">‍</span>Back</a></div>
                                <div className="ps-fat-nav-l3-ctas">
                                    <a data-platform="publicsite" href="auto-loans/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="ps-fat-nav-l3-primary-button" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Explore auto loans</a>
                                </div>
                                <div className="ps-fat-nav-l3-products">
                                    <a data-platform="publicsite" href="https://connect.secure.wellsfargo.com/auth/login/present?origin=cob&LOB=CONS" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-car">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Current auto loan customers&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Sign in to make payments, view statements, set up alerts, and more
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a data-platform="publicsite" href="auto-loans/vehicle-financing-101/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-percentage">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Vehicle financing&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                New and used vehicle financing through your dealer
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a data-platform="publicsite" href="https://oam.wellsfargo.com/oamo/identity/enrollment" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-mobile-phone">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Enroll in Wells Fargo Online<sup>®</sup>&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Use online banking to manage your auto loan
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                </div>
                            </div>
                            <div className="ps-fat-nav-l3-secondary">
                                <div className="ps-fat-nav-l3-services">
                                    <h3 className="l3-headline">AUTO LOAN SERVICES</h3>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="auto-loans/make-payments/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Other ways to make a payment</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="mobile-online-banking/apps/index.html" className>Wells Fargo Mobile<sup>®</sup> app</a>
                                    </div>
                                    <h3 className="l3-headline">EDUCATION &amp; TOOLS</h3>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="help/loans/auto-loans-faqs/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Auto loan FAQs</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a data-platform="publicsite" href="https://learnmore.wf.com/EV/" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">Learn about electric vehicles</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ps-fat-nav-l3" data-matching-href="/premier/">
                            <div className="ps-fat-nav-search">
                                <button className="fat-nav-search" id="nxgSearchButton"><span className="fat-nav-search-icon">‍</span>
                                    <span className="ps-search-text">Search</span>
                                </button>
                            </div>
                            <div className="ps-fat-nav-l3-primary">
                                <div className="ps-fat-nav-l3-back"><a href="#" className="l3-back-link"><span className="ps-fat-nav-arrow is-left" aria-hidden="true">‍</span>Back</a></div>
                                <div className="ps-fat-nav-l3-ctas">
                                    <a href="premier/index.html" className="ps-fat-nav-l3-primary-button">Premier services overview</a>
                                </div>
                                <div className="ps-fat-nav-l3-products">
                                    <a data-platform="publicsite" href="premier/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-star-in-hand">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Introducing Wells Fargo Premier&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Elevate your financial expectations
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a data-platform="publicsite" href="checking/premier/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-check">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Premier Checking&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                An interest-bearing account with our premier level of relationship banking benefits
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                </div>
                            </div>
                            <div className="ps-fat-nav-l3-secondary">
                                <div className="ps-fat-nav-l3-services">
                                    <h3 className="l3-headline">BANKING SERVICES</h3>
                                    <div className="l3-link-item">
                                        <a href="help/routing-number/index.html" className>Routing and account numbers </a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="checking/overdraft-services/index.html" className>Overdraft services </a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="privacy-security/fraud/index.html" className>Security and fraud </a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="help/checking-savings/index.html" className>Checking FAQs </a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="international-remittances/index.html">Global remittance </a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="https://appointments.wellsfargo.com/maa/appointment/" enrollmentid={2935}>Make an appointment </a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="foreign-exchange/index.html">Foreign exchange </a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="goals-banking-made-easy/activate-debit-card/index.html">Activate debit card </a>
                                    </div>
                                    <h3 className="l3-headline">DIGITAL BANKING</h3>
                                    <div className="l3-link-item">
                                        <a href="mobile-online-banking/index.html">Wells Fargo Online<sup>®</sup></a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="mobile-online-banking/apps/index.html">Wells Fargo Mobile<sup>®</sup> app</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="mobile-online-banking/transfer-pay/index.html">Transfer and pay</a>
                                    </div>
                                    <div className="l3-link-item">
                                        <a href="privacy-security/fraud/report/index.html">Report fraud </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ps-fat-nav-l3" data-matching-href="/financial-health/">
                            <div className="ps-fat-nav-search">
                                <button className="fat-nav-search" id="nxgSearchButton"><span className="fat-nav-search-icon">‍</span>
                                    <span className="ps-search-text">Search</span>
                                </button>
                            </div>
                            <div className="ps-fat-nav-l3-primary">
                                <div className="ps-fat-nav-l3-back"><a href="#" className="l3-back-link"><span className="ps-fat-nav-arrow is-left" aria-hidden="true">‍</span>Back</a></div>
                                <div className="ps-fat-nav-l3-ctas">
                                    <a href="financial-goals/index.html" className="ps-fat-nav-l3-primary-button">Financial Goals</a>
                                    <a href="mobile-online-banking/lifesync/index.html">LifeSync </a>
                                </div>
                                <div className="ps-fat-nav-l3-products">
                                    <a data-platform="publicsite" href="financial-goals/save/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-piggybank">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Save&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Kick off your savings journey with the right tips and tools
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a data-platform="publicsite" href="financial-goals/borrow/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-cash-in-hand">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Borrow&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Learn how your borrowing power goes beyond lending
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a data-platform="publicsite" href="financial-goals/protect/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-shield">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Protect&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Start securing your financial future with the help of our advice
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                    <a data-platform="publicsite" href="financial-goals/invest/index.html" exitdestination exitdisclaimer data-newbrowser enrollmentid data-rottracking className="l3-product-tile" data-params data-responsive-params data-destinationtype="none" data-nativelinktype="none">
                                        <div className="l3-product-icon icon-graph-jagged">
                                        </div>
                                        <div className="wrapper">
                                            <div className="l3-product-tile-headline">Invest&nbsp;<span className="chevron-icon" /></div>
                                            <div className="l3-product-tile-content">
                                                Take the first steps towards investing towards your future
                                            </div>
                                        </div>
                                        <span className="chevron-icon mobile" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container-l3-mobile" id="containerL3Mobile" />
                <main className="ps-body-wrapper">
                    <h1 className="hidden" id="skip">Wells Fargo</h1>
                    {/* Stepper Component */}
                          <div className="ps-mid-page-title-wrapper">
                                <h2 className="ps-mid-page-title">SmartOnBoard</h2>
                                
                            </div>
{/*                             <button className="btn next" onClick={() => { window.location.href = "http://localhost:9000"; }}>Help me onboard</button> */}
                          
                          <StepperComponent></StepperComponent>
                      <FloatingChatButton />

                    <div className="alt-nav-container presentedElement" data-cid="tcm:182-234954" data-ctid="tcm:91-223671-32">                     <div className="row">                         <ul className="alt-nav-links">                             <li className="ps-col-xs-6 ps-col-md-4 ps-col-sm-6">                                 <a href="checking/index.html" className="alt-nav-link alt-check">                                     <span className="alt-personal-checking-icon" aria-hidden="true" />                                     Checking                               </a> </li>                             <li className="ps-col-xs-6 ps-col-md-4 ps-col-sm-6">                                 <a href="savings-cds/index.html" className="alt-nav-link alt-currency-us-dollar">                                     <span className="alt-personal-sav-cds-icon" aria-hidden="true" />                                     Savings &amp; CDs                               </a> </li>                             <li className="ps-col-xs-6 ps-col-md-4 ps-col-sm-6">                                 <a href="https://creditcards.wellsfargo.com/" className="alt-nav-link alt-creditcard">                                     <span className="alt-personal-creditcard-icon" aria-hidden="true" />                                     Credit Cards                               </a> </li>                             <li className="ps-col-xs-6 ps-col-md-4 ps-col-sm-6">                                 <a href="mortgage/index.html" className="alt-nav-link alt-icon-house">                                     <span className="alt-personal-homeloan-icon" aria-hidden="true" />                                     Home Loans                               </a> </li>                             <li className="ps-col-xs-6 ps-col-md-4 ps-col-sm-6">                                 <a href="personal-loans/index.html" className="alt-nav-link alt-cash-in-hand">                                     <span className="alt-personal-personalloan-icon" aria-hidden="true" />                                     Personal Loans                               </a> </li>                             <li className="ps-col-xs-6 ps-col-md-4 ps-col-sm-6">                                 <a href="auto-loans/index.html" className="alt-nav-link alt-vehicle-car">                                     <span className="alt-personal-autoloan-icon" aria-hidden="true" />                                     Auto Loans                               </a> </li>                             <li className="ps-col-xs-6 ps-col-md-4 ps-col-sm-6">                                 <a href="investing-wealth/index.html" className="alt-nav-link alt-investing">                                     <span className="alt-personal-investing-icon" aria-hidden="true" />                                     Investing                               </a> </li>                             <li className="ps-col-xs-6 ps-col-md-4 ps-col-sm-6">                                 <a href="premier/index.html" className="alt-nav-link star-in-hand-icon">                                     <span className="alt-personal-premier-icon" aria-hidden="true" />                                        Premier                               </a> </li>                             <li className="ps-col-xs-6 ps-col-md-4 ps-col-sm-6">                                 <a href="financial-education/index.html" className="alt-nav-link alt-apple">                                     <span className="alt-personal-educationtools-icon" aria-hidden="true" />                                     Education &amp; Tools                               </a> </li> </ul> </div> </div>
                    <div className="card-background-white text-aligned-center">
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>

                    
                </main>



                <div role="dialog" tabIndex={-1} aria-labelledby="headerTextAppStore" data-content-id={1224111702} className="ep-modal" aria-modal="true">
                    <div className="ep-modal-dialog">
                        <div className="ep-modal-content">
                            <div className="ep-modal-header">
                                <p tabIndex={1} id="headerTextAppStore">You are leaving the Wells Fargo website</p>
                            </div>
                            <div className="ep-modal-body" data-variant-condition="true">
                                <p>
                                    You are leaving wellsfargo.com and entering a website that Wells Fargo does not control.
                                </p>
                                <p>
                                    Wells Fargo has provided this link for your convenience, but does not endorse and is not responsible for the products, services, content, links, privacy policy, or security policy of this website.
                                </p>
                            </div>
                            <div className="ep-modal-footer">
                                <a className="ps-btn-primary" href="https://apps.apple.com/us/app/wells-fargo-mobile/id311548709?ppid=61927db7-dd56-4349-af8d-6080fa7dc048" tabIndex={2} data-content-id={1224111702} data-presentation={1}>Continue</a>
                                <a className="ps-btn-secondary" role="button" href="#" tabIndex={3}>Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div role="dialog" tabIndex={-1} aria-labelledby="headerTextGooglePlay" data-content-id={3224111702} className="ep-modal" aria-modal="true">
                    <div className="ep-modal-dialog">
                        <div className="ep-modal-content">
                            <div className="ep-modal-header">
                                <p tabIndex={1} id="headerTextGooglePlay">You are leaving the Wells Fargo website</p>
                            </div>
                            <div className="ep-modal-body" data-variant-condition="true">
                                <p>
                                    You are leaving wellsfargo.com and entering a website that Wells Fargo does not control.
                                </p>
                                <p>
                                    Wells Fargo has provided this link for your convenience, but does not endorse and is not responsible for the products, services, content, links, privacy policy, or security policy of this website.
                                </p>
                            </div>
                            <div className="ep-modal-footer">
                                <a className="ps-btn-primary" href="https://play.google.com/store/apps/details?id=com.wf.wellsfargomobile&listing=h_p_p_10_24" tabIndex={2} data-content-id={3224111702} data-presentation={1}>Continue</a>
                                <a className="ps-btn-secondary" role="button" href="#" tabIndex={3}>Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div role="dialog" tabIndex={-1} aria-labelledby="headerTextFacebook" data-content-id={1224300702} className="ep-modal" aria-modal="true">
                    <div className="ep-modal-dialog">
                        <div className="ep-modal-content">
                            <div className="ep-modal-header">
                                <p tabIndex={1} id="headerTextFacebook">You are leaving the Wells Fargo website</p>
                            </div>
                            <div className="ep-modal-body" data-variant-condition="true">
                                <p>
                                    You are leaving wellsfargo.com and entering a website that Wells Fargo does not control.
                                </p>
                                <p>
                                    Wells Fargo has provided this link for your convenience, but does not endorse and is not responsible for the products, services, content, links, privacy policy, or security policy of this website.
                                </p>
                            </div>
                            <div className="ep-modal-footer">
                                <a className="ps-btn-primary" href="https://www.facebook.com/wellsfargo/" tabIndex={2} data-content-id={1224300702} data-presentation={1}>Continue</a>
                                <a className="ps-btn-secondary" role="button" href="#" tabIndex={3}>Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div role="dialog" tabIndex={-1} aria-labelledby="headerTextLinkedin" data-content-id={3224300702} className="ep-modal" aria-modal="true">
                    <div className="ep-modal-dialog">
                        <div className="ep-modal-content">
                            <div className="ep-modal-header">
                                <p tabIndex={1} id="headerTextLinkedin">You are leaving the Wells Fargo website</p>
                            </div>
                            <div className="ep-modal-body" data-variant-condition="true">
                                <p>
                                    You are leaving wellsfargo.com and entering a website that Wells Fargo does not control.
                                </p>
                                <p>
                                    Wells Fargo has provided this link for your convenience, but does not endorse and is not responsible for the products, services, content, links, privacy policy, or security policy of this website.
                                </p>
                            </div>
                            <div className="ep-modal-footer">
                                <a className="ps-btn-primary" href="https://www.linkedin.com/company/wellsfargo/" tabIndex={2} data-content-id={3224300702} data-presentation={1}>Continue</a>
                                <a className="ps-btn-secondary" role="button" href="#" tabIndex={3}>Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div role="dialog" tabIndex={-1} aria-labelledby="headerTextInstagram" data-content-id={5224300702} className="ep-modal" aria-modal="true">
                    <div className="ep-modal-dialog">
                        <div className="ep-modal-content">
                            <div className="ep-modal-header">
                                <p tabIndex={1} id="headerTextInstagram">You are leaving the Wells Fargo website</p>
                            </div>
                            <div className="ep-modal-body" data-variant-condition="true">
                                <p>
                                    You are leaving wellsfargo.com and entering a website that Wells Fargo does not control.
                                </p>
                                <p>
                                    Wells Fargo has provided this link for your convenience, but does not endorse and is not responsible for the products, services, content, links, privacy policy, or security policy of this website.
                                </p>
                            </div>
                            <div className="ep-modal-footer">
                                <a className="ps-btn-primary" href="https://www.instagram.com/wellsfargo/" tabIndex={2} data-content-id={5224300702} data-presentation={1}>Continue</a>
                                <a className="ps-btn-secondary" role="button" href="#" tabIndex={3}>Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div role="dialog" tabIndex={-1} aria-labelledby="headerTextPinterest" data-content-id={7224300702} className="ep-modal" aria-modal="true">
                    <div className="ep-modal-dialog">
                        <div className="ep-modal-content">
                            <div className="ep-modal-header">
                                <p tabIndex={1} id="headerTextPinterest">You are leaving the Wells Fargo website</p>
                            </div>
                            <div className="ep-modal-body" data-variant-condition="true">
                                <p>
                                    You are leaving wellsfargo.com and entering a website that Wells Fargo does not control.
                                </p>
                                <p>
                                    Wells Fargo has provided this link for your convenience, but does not endorse and is not responsible for the products, services, content, links, privacy policy, or security policy of this website.
                                </p>
                            </div>
                            <div className="ep-modal-footer">
                                <a className="ps-btn-primary" href="https://www.pinterest.com/wellsfargo/" tabIndex={2} data-content-id={7224300702} data-presentation={1}>Continue</a>
                                <a className="ps-btn-secondary" role="button" href="#" tabIndex={3}>Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div role="dialog" tabIndex={-1} aria-labelledby="headerTextYoutube" data-content-id={9224300702} className="ep-modal" aria-modal="true">
                    <div className="ep-modal-dialog">
                        <div className="ep-modal-content">
                            <div className="ep-modal-header">
                                <p tabIndex={1} id="headerTextYoutube">You are leaving the Wells Fargo website</p>
                            </div>
                            <div className="ep-modal-body" data-variant-condition="true">
                                <p>
                                    You are leaving wellsfargo.com and entering a website that Wells Fargo does not control.
                                </p>
                                <p>
                                    Wells Fargo has provided this link for your convenience, but does not endorse and is not responsible for the products, services, content, links, privacy policy, or security policy of this website.
                                </p>
                            </div>
                            <div className="ep-modal-footer">
                                <a className="ps-btn-primary" href="https://www.youtube.com/user/wellsfargo/" tabIndex={2} data-content-id={9224300702} data-presentation={1}>Continue</a>
                                <a className="ps-btn-secondary" role="button" href="#" tabIndex={3}>Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div role="dialog" tabIndex={-1} aria-labelledby="headerTextTwitter" data-content-id={11224300702} className="ep-modal" aria-modal="true">
                    <div className="ep-modal-dialog">
                        <div className="ep-modal-content">
                            <div className="ep-modal-header">
                                <p tabIndex={1} id="headerTextTwitter">You are leaving the Wells Fargo website</p>
                            </div>
                            <div className="ep-modal-body" data-variant-condition="true">
                                <p>
                                    You are leaving wellsfargo.com and entering a website that Wells Fargo does not control.
                                </p>
                                <p>
                                    Wells Fargo has provided this link for your convenience, but does not endorse and is not responsible for the products, services, content, links, privacy policy, or security policy of this website.
                                </p>
                            </div>
                            <div className="ep-modal-footer">
                                <a className="ps-btn-primary" href="https://www.twitter.com/wellsfargo/" tabIndex={2} data-content-id={11224300702} data-presentation={1}>Continue</a>
                                <a className="ps-btn-secondary" role="button" href="#" tabIndex={3}>Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div role="dialog" tabIndex={-1} aria-labelledby="headerText" data-content-id={13224300702} className="ep-modal" aria-modal="true">
                    <div className="ep-modal-dialog">
                        <div className="ep-modal-content">
                            <div className="ep-modal-header">
                                <p tabIndex={1} id="headerText">You are leaving the Wells Fargo website</p>
                            </div>
                            <div className="ep-modal-body" data-variant-condition="true">
                                <p>
                                    You are leaving wellsfargo.com and entering a website that Wells Fargo does not control.
                                </p>
                                <p>
                                    Wells Fargo has provided this link for your convenience, but does not endorse and is not responsible for the products, services, content, links, privacy policy, or security policy of this website.
                                </p>
                            </div>
                            <div className="ep-modal-footer">
                                <a className="ps-btn-primary" href="https://www.sipc.org/" tabIndex={2} data-content-id={13224300702} data-presentation={1}>Continue</a>
                                <a className="ps-btn-secondary" role="button" href="#" tabIndex={3}>Cancel</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Component */}

                <footer className="ps-footer-homepage">
                    <div className="ps-footer-wrapper">
                        <div>
                            <div className="ps-footer-links" data-cid="tcm:84-224298-16" data-ctid="tcm:91-223668-32">
                                <nav role="navigation" aria-label="Footer Navigation">
                                    <ul>
                                        <li className="ps-footer-link">
                                            <span> <a href="privacy-security/index.html">Privacy, Cookies, Security &amp; Legal</a> </span>
                                        </li>
                                        <li className="ps-footer-link">
                                            <span><a href="privacy-security/opt-out-notice/index.html">Do Not Sell or Share My Personal Information</a></span>
                                        </li>
                                        <li className="ps-footer-link">
                                            <span> <a href="privacy-security/notice-of-data-collection/index.html">Notice of Data Collection</a> </span>
                                        </li>
                                        <li className="ps-footer-link">
                                            <span> <a href="privacy-security/terms/index.html">General Terms of Use</a> </span>
                                        </li>
                                        <li className="ps-footer-link">
                                            <span> <a href="online-banking/online-access-agreement/index.html">Online Access Agreement</a> </span>
                                        </li>
                                        <li className="ps-footer-link">
                                            <span> <a href="privacy-security/fraud/report/index.html">Report Fraud</a> </span>
                                        </li>
                                        <li className="ps-footer-link">
                                            <span> <a href="about/index8e12.html?linkLoc=footer/">About Wells Fargo</a> </span>
                                        </li>
                                        <li className="ps-footer-link">
                                            <span> <a href="about/careers/index.html">Careers</a> </span>
                                        </li>
                                        <li className="ps-footer-link">
                                            <span> <a href="about/diversity/index.html">Diversity and Accessibility</a> </span>
                                        </li>
                                        <li className="ps-footer-link">
                                            <span> <a href="sitemap/index.html">Sitemap</a> </span>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                        <div>
                            <div className="ps-footer-social-icons" data-cid="tcm:84-224817-16" data-ctid="tcm:91-223684-32">
                                <ul>
                                    <li>
                                        <a className=" icon-facebook social-icon" aria-label="Wells Fargo facebook page" data-exit="true" refplatform="newwindow" data-href-id={1224300702} href="#" />
                                    </li>
                                    <li>
                                        <a data-platform="external" data-newbrowser enrollmentid data-rottracking className=" icon-linkedin social-icon" data-params aria-label="Wells Fargo LinkedIn page" data-exit="true" data-destinationtype="none" data-nativelinktype="none" refplatform="newwindow" data-href-id={3224300702} href="#" />
                                    </li>
                                    <li>
                                        <a data-platform="external" data-newbrowser enrollmentid data-rottracking className=" icon-instagram social-icon" data-params aria-label="Wells Fargo Instagram page" data-destinationtype="none" data-nativelinktype="none" data-exit="true" refplatform="newwindow" data-href-id={5224300702} href="#" />
                                    </li>
                                    <li>
                                        <a data-platform="external" data-newbrowser enrollmentid data-rottracking className=" icon-pinterest social-icon" data-params aria-label="Wells Fargo Pinterest page" data-exit="true" data-destinationtype="none" data-nativelinktype="none" refplatform="newwindow" data-href-id={7224300702} href="#" />
                                    </li>
                                    <li>
                                        <a data-platform="external" data-newbrowser enrollmentid data-rottracking className=" icon-youtube social-icon" data-params aria-label="Wells Fargo Youtube page " data-exit="true" data-destinationtype="none" data-nativelinktype="none" refplatform="newwindow" data-href-id={9224300702} href="#" />
                                    </li>
                                    <li>
                                        <a data-platform="external" data-newbrowser enrollmentid data-rottracking className=" icon-twitter social-icon" data-params aria-label="Wells Fargo Twitter page " data-exit="true" data-destinationtype="none" data-nativelinktype="none" refplatform="newwindow" data-href-id={11224300702} href="#" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="ps-not-not" data-cid="tcm:84-228728-16" data-ctid="tcm:91-223674-32">
                            <p>Investment and Insurance Products are:</p>
                            <ul>
                                <li>Not Insured by the FDIC or Any Federal Government Agency</li>
                                <li>Not a Deposit or Other Obligation of, or Guaranteed by, the Bank or Any Bank Affiliate</li>
                                <li>Subject to Investment Risks, Including Possible Loss of the Principal Amount Invested</li>
                            </ul>
                        </div>
                        <div className="ps-footnote-text" data-cid="tcm:84-224322-16" data-ctid="tcm:91-223670-32">
                            <p /><p>Investment products and services are offered through Wells Fargo Advisors. Wells Fargo Advisors is a trade name used by Wells Fargo Clearing Services, LLC (WFCS) and Wells Fargo Advisors Financial Network, LLC, Members <a data-exit="true" aria-label="hyperlink text opens dialogue" target="_blank" data-href-id={13224300702} href="#">SIPC</a>, separate registered broker-dealers and non-bank affiliates of Wells Fargo &amp; Company.</p><p />
                        </div>
                        <div className="ps-footnote-text" data-cid="tcm:84-327805-16" data-ctid="tcm:91-223670-32">
                            <p /><p>1. Availability may be affected by your mobile carrier’s coverage area. Your mobile carrier’s message and data rates may apply. Fargo is only available on the smartphone versions of the Wells Fargo Mobile<sup>®</sup> app.</p><p />
                        </div>
                        <div className="ps-footnote-text" data-cid="tcm:84-148263-16" data-ctid="tcm:91-223670-32">
                            <p /><p>Android, Chrome, Google Pay, Google Pixel, Google Play, Wear OS by Google, and the Google Logo are trademarks of Google LLC.</p><p />
                        </div>
                        <div className="ps-footnote-text" data-cid="tcm:84-38072-16" data-ctid="tcm:91-223670-32">
                            <p /><p>Apple, the Apple logo, Apple Pay, Apple Watch, Face ID, iCloud Keychain, iPad, iPad Pro, iPhone, iTunes, Mac, Safari, and Touch ID are trademarks of Apple Inc., registered in the U.S. and other countries. Apple Wallet is a trademark of Apple Inc. App Store is a service mark of Apple Inc.</p><p />
                        </div>
                        <div className="ps-footnote-text" data-cid="tcm:84-6793-16" data-ctid="tcm:91-223670-32">
                            <p /><p>Deposit products offered by Wells Fargo Bank, N.A. Member FDIC.</p><p />
                        </div>
                        <div className="ps-footnote-footer" data-cid="tcm:84-226264-16" data-ctid="tcm:91-223661-32">
                            <span className="ps-home-lending-icon">‍</span>
                            <span xmlLang="en" lang="en">Equal Housing Lender</span>
                        </div>
                        <div className="ps-footnote-text" data-cid="tcm:84-233318-16" data-ctid="tcm:91-223670-32">
                            <p /><p>PM-05082026-7283028.1.1</p><p />
                        </div>
                        <div className="ps-footnote-text" data-cid="tcm:84-304786-16" data-ctid="tcm:91-223670-32">
                            <p /><p>LRC-0224</p><p />
                        </div>
                        <div>
                            <div className="ps-gray-line-container">
                                <div className="ps-gray-line">‍</div>
                            </div>
                            <div className="ps-copyright" data-cid="tcm:84-224468-16" data-ctid="tcm:91-223675-32">© 1999 - 2025 Wells Fargo. NMLSR ID 399801</div>
                        </div>
                    </div>
                </footer>
            </div>
            <div className="visuallyHidden"> </div>
        </div>
    );
}

export default SmartOnboard;
