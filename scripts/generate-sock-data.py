from datetime import datetime, timedelta
import random
import json

# Template for MongoDB document
doc_template = {
    "userId": None,
    "sockDetails": {
        "size": None,
        "color": None,
        "pattern": None,
        "material": None,
        "condition": None,
        "forFoot": None
    },
    "additionalFeatures": {
        "waterResistant": None,
        "padded": None,
        "antiBacterial": None
    },
    "addedTimestamp": None
}

# Options for each attribute
userId = ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10"]
sizes = ["Small", "Medium", "Large"]
colors = ["Blue", "Red", "Green", "Black", "White"]
patterns = ["Striped", "Solid", "Polka dot", "Chequered"]
materials = ["Cotton", "Wool", "Polyester", "Nylon"]
conditions = ["New", "Used"]
forFoot_options = ["Left", "Right", "Both"]
bool_options = [True, False]

# Start timestamp for addedTimestamp field
start_date = datetime(2024, 1, 26, 10, 0, 0)

# Generate 50 documents
documents = []
for i in range(50):
    new_doc = doc_template.copy()
    
    new_doc["userId"] = random.choice(userId)

    new_doc["sockDetails"]["size"] = random.choice(sizes)
    new_doc["sockDetails"]["color"] = random.choice(colors)
    new_doc["sockDetails"]["pattern"] = random.choice(patterns)
    new_doc["sockDetails"]["material"] = random.choice(materials)
    new_doc["sockDetails"]["condition"] = random.choice(conditions)
    new_doc["sockDetails"]["forFoot"] = random.choice(forFoot_options)
    
    new_doc["additionalFeatures"]["waterResistant"] = random.choice(bool_options)
    new_doc["additionalFeatures"]["padded"] = random.choice(bool_options)
    new_doc["additionalFeatures"]["antiBacterial"] = random.choice(bool_options)
    
    # Increment timestamp by 1 day for each document
    new_doc["addedTimestamp"] = (start_date + timedelta(days=i + 1)).isoformat() + "Z"
    
    documents.append(new_doc)

# Define the file path where the JSON file will be saved
file_path = 'sock-data.json'

# Save the documents to a JSON file
with open(file_path, 'w') as file:
    json.dump(documents, file, indent=4)  # Pretty print the JSON
