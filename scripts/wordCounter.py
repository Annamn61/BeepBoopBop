import requests
import xml.etree.ElementTree as ET
from collections import Counter
# import spacy

# nlp = spacy.load("en_core_web_sm")  # Load English language model
import re

# API URL
API_URL = "https://api.oregonlegislature.gov/odata/odataservice.svc/Measures?$filter=SessionKey eq '2025R1'"

def fetch_measures():
    """Fetches measure data from the API."""
    response = requests.get(API_URL, headers={"Accept": "application/atom+xml"})
    
    if response.status_code != 200:
        print("Error fetching data:", response.status_code)
        return None

    return response.text  # Returns raw XML response

def extract_catchlines(xml_data):
    """Extracts 'CatchLine' values from the XML response."""
    root = ET.fromstring(xml_data)
    namespace = {"atom": "http://www.w3.org/2005/Atom", "d": "http://schemas.microsoft.com/ado/2007/08/dataservices"}

    catchlines = [entry.find(".//d:CatchLine", namespace).text for entry in root.findall(".//atom:entry", namespace) if entry.find(".//d:CatchLine", namespace) is not None]

    return catchlines

def tokenize(text):
    """Splits text into words, removing punctuation and making lowercase."""
    words = re.findall(r'\b[a-zA-Z]+\b', text.lower())  # Extract words only
    return words

# def count_words(catchlines):
#     """Aggregates word frequencies across all catchlines."""
#     word_counter = Counter()
#     for line in catchlines:
#         words = tokenize(line)
#         word_counter.update(words)

#     return word_counter


STOPWORDS = {"to", "must", "provides", "any", "time", "board", "person", "assembly", "allows", "system", "under", "other", "legislative", "s", "services", "program", "moneys", "and", "the", "of", "in", "for", "on", "with", "by", "a", "an", "as", "at", "or", "department", "requires", "oregon", "state", "that", "from", "fund", "directs", "certain", "related", "general", "is", "this", "be", "use", "not", "who", "than", "may", "modifies", "are"}  # Add more if needed

def count_words(catchlines):
    """Aggregates word frequencies across all catchlines, excluding stopwords."""
    word_counter = Counter()
    for line in catchlines:
        words = tokenize(line)
        filtered_words = [word for word in words if word.lower() not in STOPWORDS]
        word_counter.update(filtered_words)

    return word_counter

# def count_nouns(catchlines):
#     """Counts only noun occurrences in catchlines."""
#     word_counter = Counter()
#     for line in catchlines:
#         doc = nlp(line)
#         nouns = [token.text.lower() for token in doc if token.pos_ == "NOUN"]
#         word_counter.update(nouns)

#     return word_counter

def main():
    xml_data = fetch_measures()
    if not xml_data:
        return

    catchlines = extract_catchlines(xml_data)
    word_counts = count_words(catchlines)

    # Display top 40 most common words
    print("\n🔹 Top 40 Words in Bill Catchlines 🔹\n")
    for word, count in word_counts.most_common(400):
        print(f"{word}: {count}")

    # Example: Find occurrences of specific words
    keywords = ["nuclear", "military", "natural", "drug", "drugs", "teacher", "pharmacy", "forest", "liquor", "recidivism", "foster", "cannabis", "forestry", "technology", "vehicles", "fire", "wildfire", "hospital", "sex", "conservation", "lottery", "electric", "vehicle", "schools", "environmental", "university", "business", "land", "lands", "credit", "grant", "veterans", "student", "students", "health", "climate", "energy", "medical", "child", "study", "education", "transportation", "water", "income"]
    print("\n🔹 Specific Word Counts 🔹\n")
    for keyword in keywords:
        print(f"{keyword}: {word_counts[keyword]}")

if __name__ == "__main__":
    main()