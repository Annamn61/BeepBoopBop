import requests
import xml.etree.ElementTree as ET

# API Endpoint for Oregon Legislative Measures
API_URL = "https://api.oregonlegislature.gov/odata/ODataService.svc/Measures?$filter=SessionKey eq '2025R1'"

def fetch_bills():
    """
    Fetch legislative measures from the Oregon API.
    Parses XML response and extracts bill details.
    
    Returns:
        list of dict: Contains MeasurePrefix, MeasureNumber, CatchLine, and DateIntroduced.
    """
    response = requests.get(API_URL)
    if response.status_code != 200:
        print("❌ Failed to fetch data")
        return []
    
    root = ET.fromstring(response.text)
    namespace = {'atom': "http://www.w3.org/2005/Atom", 'd': "http://schemas.microsoft.com/ado/2007/08/dataservices"}

    bills = []
    for entry in root.findall("atom:entry", namespace):
        measure_prefix = entry.find(".//d:MeasurePrefix", namespace).text
        measure_number = entry.find(".//d:MeasureNumber", namespace).text
        catchline = entry.find(".//d:CatchLine", namespace).text
        date_introduced = entry.find(".//d:CreatedDate", namespace).text  # Placeholder (API may have another date field)

        bills.append({
            'MeasurePrefix': measure_prefix,
            'MeasureNumber': measure_number,
            'CatchLine': catchline if catchline else "No summary available",
            'DateIntroduced': date_introduced
        })
    
    return bills

def search_bills_by_word(bills, search_word):
    """
    Search for bills that contain a specific word in their catchline.

    Args:
        bills (list of dict): List of bill dictionaries.
        search_word (str): The word to search for.

    Returns:
        None: Prints matching bills.
    """
    search_word = search_word.lower()  # Normalize input
    matches = []

    for bill in bills:
        catchline = bill.get('CatchLine', '').lower()
        if search_word in catchline:
            bill_number = f"{bill['MeasurePrefix']}{bill['MeasureNumber']}"
            date_introduced = bill.get('DateIntroduced', 'Unknown')

            matches.append(f"📌 {bill_number} (Introduced: {date_introduced})\n   📝 {bill['CatchLine']}")

    if matches:
        print(f"\n🔹 Bills mentioning '{search_word}':\n")
        print("\n".join(matches))
    else:
        print(f"\n🔍 No bills found containing '{search_word}'.")

# Run the script
if __name__ == "__main__":
    print("📡 Fetching legislative measures...")
    bills_data = fetch_bills()
    
    if bills_data:
        search_term = input("\n🔎 Enter a word to search in bill summaries: ").strip()
        search_bills_by_word(bills_data, search_term)
    else:
        print("⚠️ No bill data available.")
