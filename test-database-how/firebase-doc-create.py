from google.cloud import firestore

# Initialize Firestore client
db = firestore.Client.from_service_account_json("serviceAccountKey.json")

# Define Firestore structure
main_collection = "test-content"
main_document = "board"
sub_collections = ["questions", "answer-key"]
doc_prefix = "BODQ"
doc_range = range(1, 31)  # CODQ1 to CODQ30

def create_missing_documents():
    for sub_collection in sub_collections:
        for i in doc_range:
            doc_id = f"{doc_prefix}{i}"
            doc_ref = db.collection(main_collection).document(main_document).collection(sub_collection).document(doc_id)
            
            if not doc_ref.get().exists:  # Only create if it does not exist
                doc_ref.set({})  # Add empty document
                print(f"Created missing document: {doc_id} in {sub_collection}.")
            else:
                print(f"Document {doc_id} already exists in {sub_collection} (skipping).")

if __name__ == "__main__":
    create_missing_documents()
