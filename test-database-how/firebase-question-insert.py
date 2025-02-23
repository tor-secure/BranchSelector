from google.cloud import firestore

# Initialize Firestore client
db = firestore.Client.from_service_account_json("serviceAccountKey.json")

# Define Firestore structure
main_collection = "test-content"
main_document = "code"
sub_collection = "questions"
doc_prefix = "CODQ"
doc_range = range(1, 31)  # CODQ1 to CODQ30

# Mapping of CODQ to CODO values
data_mapping = {
    "CODQ1": {
        "options": {
            "CODO1": "Option Description 1",
            "CODO2": "Option Description 2",
            "CODO3": "Option Description 3",
            "CODO4": "Option Description 4"
        },
        "question": "Question Description 1"
    },
    "CODQ2": {
        "options": {
            "CODO1": "Option Description 1",
            "CODO2": "Option Description 2",
            "CODO3": "Option Description 3",
            "CODO4": "Option Description 4"
        },
        "question": "Question Description 2"
    },
    "CODQ3": {
        "options": {
            "CODO1": "Option Description 1",
            "CODO2": "Option Description 2",
            "CODO3": "Option Description 3",
            "CODO4": "Option Description 4"
        },
        "question": "Question Description 3"
    },
    "CODQ4": {
        "options": {
            "CODO1": "Option Description 1",
            "CODO2": "Option Description 2",
            "CODO3": "Option Description 3",
            "CODO4": "Option Description 4"
        },
        "question": "Question Description 4"
    },
    "CODQ5": {
        "options": {
            "CODO1": "Option Description 1",
            "CODO2": "Option Description 2",
            "CODO3": "Option Description 3",
            "CODO4": "Option Description 4"
        },
        "question": "Question Description 5"
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
