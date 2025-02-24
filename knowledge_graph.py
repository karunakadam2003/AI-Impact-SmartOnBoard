import networkx as nx

def kg(): 
    # Create a directed graph.
    G = nx.DiGraph()

    # Add nodes with detailed attributes.
    G.add_node("SiteA", 
            name="Bank Customer Onboarding",
            url="http://localhost:5000/sitea.html",
            role="target update site",
            description="A bank customer onboarding portal that collects detailed customer information (name, DOB, address, etc.). Certain fields (e.g. Bank Id) require data from a reference source.")

    G.add_node("SiteB", 
            name="Contact Information Portal",
            url="http://localhost:5000/siteb.html",
            role="target update site",
            description="A portal designed for managing corporate contact information such as contact name, email, phone, and office address.")

    G.add_node("SiteC", 
            name="Transaction Lookup",
            url="http://localhost:5000/sitec.html",
            role="reference data source",
            description="A reference application that allows users to input a transaction number and retrieves transaction details like amount, date, and status etc.")

    # Define relationships among websites.
    G.add_edge("SiteA", "SiteC", relation="refernces transaction details from SiteC")
    G.add_edge("SiteC", "SiteA", relation="Acts as a reference application")
    G.add_edge("SiteC", "SiteB", relation="Acts as a reference application")


    return G