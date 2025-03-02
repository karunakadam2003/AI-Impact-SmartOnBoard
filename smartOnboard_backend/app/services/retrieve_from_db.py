import sqlite3

def retrieve_from_db():
    # Get all the data from the database
    conn = sqlite3.connect('./formdata.db')
    cursor = conn.cursor()
    cursor.execute("SELECT ref_id FROM formdata ORDER BY id DESC LIMIT 1")
    last_entry = cursor.fetchone()
    conn.close()
    return last_entry