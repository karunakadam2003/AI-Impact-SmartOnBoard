import random
import sqlite3
from fastapi.responses import JSONResponse

def generate_unique_id():
    unique_id = random.randint(10000000, 99999999)
    return unique_id

def save_form_data(data2: dict):
    print(data2)
    conn = sqlite3.connect('./formdata.db', timeout=20)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS formdata (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        client_legal_name TEXT,
                        dba TEXT,
                        industry TEXT,
                        business_type TEXT,
                        date_of_incorporation TEXT,
                        client_id TEXT,
                        relationship_manager TEXT,
                        primary_contact TEXT,
                        name TEXT,
                        title TEXT,
                        email TEXT,
                        phone TEXT,
                        secondary_contact TEXT,
                        mailing_address TEXT,
                        physical_address TEXT,
                        ultimate_beneficial_owners TEXT,
                        ownership TEXT,
                        details TEXT,
                        key_management TEXT,
                        registered_agent TEXT,
                        state_of_incorporation TEXT,
                        federal_tax_id TEXT,
                        annual_revenue TEXT,
                        net_income TEXT,
                        number_of_employees TEXT,
                        primary_bank TEXT,
                        purpose_of_account TEXT,
                        anticipated_monthly_transaction_volume TEXT,
                        credits TEXT,
                        debits TEXT,
                        international_transactions TEXT,
                        aml_kyc_compliance TEXT,
                        ofac_screening TEXT,
                        industry_specific_regulations TEXT,
                        licenses_and_permits TEXT,
                        checking_accounts TEXT,
                        online_banking TEXT,
                        wire_transfers TEXT,
                        ach_origination TEXT,
                        remote_deposit_capture TEXT,
                        lockbox_services TEXT,
                        important_notes TEXT,
                        ref_id INTEGER)''')
    try:
        cursor.execute('''INSERT INTO formdata (
            client_legal_name, dba, industry, business_type, date_of_incorporation, client_id, relationship_manager,
            primary_contact, name, title, email, phone, secondary_contact, mailing_address, physical_address,
            ultimate_beneficial_owners, ownership, details, key_management, registered_agent, state_of_incorporation,
            federal_tax_id, annual_revenue, net_income, number_of_employees, primary_bank, purpose_of_account,
            anticipated_monthly_transaction_volume, credits, debits, international_transactions, aml_kyc_compliance,
            ofac_screening, industry_specific_regulations, licenses_and_permits, checking_accounts, online_banking,
            wire_transfers, ach_origination, remote_deposit_capture, lockbox_services, important_notes, ref_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''', (
            data2.get("clientLegalName"), data2.get("dba"), data2.get("industry"), data2.get("businessType"),
            data2.get("dateOfIncorporation"), data2.get("clientId"), data2.get("relationshipManager"),
            data2.get("primaryContact"), data2.get("name"), data2.get("title"), data2.get("email"), data2.get("phone"),
            data2.get("secondaryContact"), data2.get("mailingAddress"), data2.get("physicalAddress"),
            data2.get("ubos"), data2.get("ownershipPercentage"), data2.get("details"),
            data2.get("keyManagement"), data2.get("registeredAgent"), data2.get("stateOfIncorporation"),
            data2.get("federalTaxId"), data2.get("annualRevenue"), data2.get("netIncome"),
            data2.get("numberOfEmployees"), data2.get("primaryBank"), data2.get("purposeOfAccount"),
            data2.get("monthlyTransactionVolume"), data2.get("credits"), data2.get("debits"),
            data2.get("internationalTransactions"), data2.get("amlKycCompliance"), data2.get("ofacScreening"),
            data2.get("industrySpecificRegulations"), data2.get("licensesAndPermits"), data2.get("checkingAccounts"),
            data2.get("onlineBanking"), data2.get("wireTransfers"), data2.get("achOrigination"), data2.get("rdc"),
            data2.get("lockboxServices"), data2.get("importantNotes"), generate_unique_id()
        ))
        conn.commit()
        conn.close()
        response = JSONResponse(content={"message": "data saved successfully"})
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response
    except Exception as e:
        conn.close()
        response = JSONResponse(content={"message": "data could not be saved", "error": str(e)})
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response