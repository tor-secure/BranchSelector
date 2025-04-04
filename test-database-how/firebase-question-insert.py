from google.cloud import firestore

# Initialize Firestore client
db = firestore.Client.from_service_account_json("serviceAccountKey.json")

# Define Firestore structure
main_collection = "test-content"
main_document = "board"
sub_collection = "answer-key"
doc_prefix = "BODQ"
doc_range = range(1, 31)  # CODQ1 to CODQ30

# Mapping of CODQ to CODO values
data_mapping = {
    "BODQ1": {
        "BODO1": { "CBSE": 1, "State Board": 1 },
        "BODO2": { "ICSE": 1 },
        "BODO3": { "IB": 1, "IGCSE": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ2": {
        "BODO1": { "CBSE": 1, "ICSE": 1 },
        "BODO2": { "IGCSE": 1, "IB": 1 },
        "BODO3": { "NIOS": 1 },
        "BODO4": { "State Board": 1 }
    },
    "BODQ3": {
        "BODO1": { "ICSE": 1, "IB": 1 },
        "BODO2": { "CBSE": 1, "IGCSE": 1 },
        "BODO3": { "State Board": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ4": {
        "BODO1": { "CBSE": 1, "ICSE": 1 },
        "BODO2": { "IB": 1, "IGCSE": 1 },
        "BODO3": { "NIOS": 1 },
        "BODO4": { "State Board": 1 }
    },
    "BODQ5": {
        "BODO1": { "IB": 1, "IGCSE": 1 },
        "BODO2": { "CBSE": 1, "ICSE": 1 },
        "BODO3": { "State Board": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ6": {
        "BODO1": { "CBSE": 1, "State Board": 1 },
        "BODO2": { "ICSE": 1 },
        "BODO3": { "IGCSE": 1, "IB": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ7": {
        "BODO1": { "IB": 1 },
        "BODO2": { "IGCSE": 1 },
        "BODO3": { "CBSE": 1, "ICSE": 1, "State Board": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ8": {
        "BODO1": { "IB": 1 },
        "BODO2": { "IGCSE": 1 },
        "BODO3": { "CBSE": 1, "ICSE": 1, "State Board": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ9": {
        "BODO1": { "CBSE": 1, "State Board": 1 },
        "BODO2": { "ICSE": 1 },
        "BODO3": { "IB": 1, "IGCSE": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ10": {
        "BODO1": { "NIOS": 1 },
        "BODO2": { "CBSE": 1, "ICSE": 1 },
        "BODO3": { "IB": 1, "IGCSE": 1 },
        "BODO4": { "State Board": 1 }
    },
    "BODQ11": {
        "BODO1": { "IB": 1, "IGCSE": 1 },
        "BODO2": { "ICSE": 1 },
        "BODO3": { "CBSE": 1, "State Board": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ12": {
        "BODO1": { "IB": 1, "IGCSE": 1 },
        "BODO2": { "ICSE": 1 },
        "BODO3": { "CBSE": 1, "State Board": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ13": {
        "BODO1": { "IB": 1, "IGCSE": 1 },
        "BODO2": { "ICSE": 1 },
        "BODO3": { "CBSE": 1, "State Board": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ14": {
        "BODO1": { "IB": 1, "IGCSE": 1 },
        "BODO2": { "ICSE": 1 },
        "BODO3": { "CBSE": 1, "State Board": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ15": {
        "BODO1": { "IB": 1 },
        "BODO2": { "IGCSE": 1 },
        "BODO3": { "CBSE": 1, "ICSE": 1 },
        "BODO4": { "NIOS": 1, "State Board": 1 }
    },
    "BODQ16": {
        "BODO1": { "NIOS": 1 },
        "BODO2": { "IB": 1, "IGCSE": 1 },
        "BODO3": { "CBSE": 1, "ICSE": 1, "State Board": 1 },
        "BODO4": { "State Board": 1 }
    },
    "BODQ17": {
        "BODO1": { "IB": 1, "IGCSE": 1 },
        "BODO2": { "ICSE": 1 },
        "BODO3": { "CBSE": 1, "State Board": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ18": {
        "BODO1": { "NIOS": 1 },
        "BODO2": { "IB": 1, "IGCSE": 1 },
        "BODO3": { "CBSE": 1, "ICSE": 1, "State Board": 1 },
        "BODO4": { "CBSE": 1, "ICSE": 1 }
    },
    "BODQ19": {
        "BODO1": { "IB": 1, "IGCSE": 1 },
        "BODO2": { "ICSE": 1, "CBSE": 1 },
        "BODO3": { "NIOS": 1 },
        "BODO4": { "State Board": 1 }
    },
    "BODQ20": {
        "BODO1": { "IB": 1, "IGCSE": 1, "NIOS": 1 },
        "BODO2": { "ICSE": 1 },
        "BODO3": { "CBSE": 1, "State Board": 1 },
        "BODO4": { "ICSE": 1, "CBSE": 1 }
    },
    "BODQ21": {
        "BODO1": { "ICSE": 1 },
        "BODO2": { "CBSE": 1, "IGCSE": 1 },
        "BODO3": { "State Board": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ22": {
        "BODO1": { "IB": 1, "IGCSE": 1 },
        "BODO2": { "ICSE": 1 },
        "BODO3": { "CBSE": 1, "State Board": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ23": {
        "BODO1": { "IB": 1, "ICSE": 1 },
        "BODO2": { "CBSE": 1, "IGCSE": 1 },
        "BODO3": { "NIOS": 1, "State Board": 1 },
        "BODO4": { "ICSE": 1, "IGCSE": 1 }
    },
    "BODQ24": {
        "BODO1": { "CBSE": 1, "ICSE": 1, "State Board": 1 },
        "BODO2": { "IGCSE": 1 },
        "BODO3": { "IB": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ25": {
        "BODO1": { "CBSE": 1, "ICSE": 1, "IGCSE": 1 },
        "BODO2": { "IB": 1 },
        "BODO3": { "NIOS": 1, "State Board": 1 },
        "BODO4": { "IB": 1, "IGCSE": 1, "NIOS": 1 }
    },
    "BODQ26": {
        "BODO1": { "CBSE": 1, "ICSE": 1 },
        "BODO2": { "IGCSE": 1 },
        "BODO3": { "IB": 1, "NIOS": 1 },
        "BODO4": { "NIOS": 1, "State Board": 1 }
    },
    "BODQ27": {
        "BODO1": { "IB": 1, "IGCSE": 1 },
        "BODO2": { "ICSE": 1 },
        "BODO3": { "CBSE": 1, "State Board": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ28": {
        "BODO1": { "CBSE": 1, "ICSE": 1 },
        "BODO2": { "IGCSE": 1 },
        "BODO3": { "NIOS": 1, "IB": 1 },
        "BODO4": { "IB": 1, "IGCSE": 1 }
    },
    "BODQ29": {
        "BODO1": { "CBSE": 1, "State Board": 1 },
        "BODO2": { "ICSE": 1 },
        "BODO3": { "IGCSE": 1, "IB": 1 },
        "BODO4": { "NIOS": 1 }
    },
    "BODQ30": {
        "BODO1": { "NIOS": 1 },
        "BODO2": { "IB": 1, "IGCSE": 1 },
        "BODO3": { "CBSE": 1, "ICSE": 1, "State Board": 1 },
        "BODO4": { "IGCSE": 1, "IB": 1 }
    }
}

def add_data_to_firestore():
    for doc_id, values in data_mapping.items():
        doc_ref = db.collection(main_collection).document(main_document).collection(sub_collection).document(doc_id)
        
        # Update the document with the new data
        doc_ref.set(values)
        print(f"✅ Added data for {doc_id}")

if __name__ == "__main__":
    add_data_to_firestore()
