from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract
from pdf2image import convert_from_bytes
import os
from werkzeug.utils import secure_filename
import google.generativeai as genai
from docx import Document


app = Flask(__name__)
CORS(app)

# Upload folder setup
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Gemini API configuration
genai.configure(api_key="AIzaSyCODZT-SpcxDlB2rQ-6uvOiwmwvzGqpoOY")

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

ALLOWED_EXTENSIONS = {'pdf', 'docx', 'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Extract text from PDF (image-based)
def extract_text_from_pdf(file_bytes):
    try:
        images = convert_from_bytes(file_bytes, poppler_path=r"C:\Program Files\poppler\poppler-24.08.0\Library\bin")
        text = "\n".join([pytesseract.image_to_string(img) for img in images])
        return text.strip()
    except Exception as e:
        raise RuntimeError(f"PDF extraction failed: {e}")

# Extract text from DOCX
def extract_text_from_docx(file_path):
    try:
        doc = Document(file_path)
        return "\n".join([para.text for para in doc.paragraphs]).strip()
    except Exception as e:
        raise RuntimeError(f"DOCX extraction failed: {e}")

@app.route('/upload-cv', methods=['POST'])
def upload_cv():
    if 'cv' not in request.files:
        print("❌ No file uploaded")
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['cv']
    filename = secure_filename(file.filename)
    print(f"📄 Received file: {filename}")

    if not allowed_file(filename):
        print("❌ Invalid file type")
        return jsonify({'error': 'Unsupported file type'}), 400

    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    print(f"✅ File saved at: {file_path}")

    try:
        ext = filename.rsplit('.', 1)[1].lower()
        if ext == 'pdf':
            with open(file_path, 'rb') as f:
                extracted_text = extract_text_from_pdf(f.read())
        elif ext == 'docx':
            extracted_text = extract_text_from_docx(file_path)
        else:
            raise ValueError("Unsupported file extension")

        if not extracted_text:
            raise ValueError("Text extraction failed (empty result)")

        print("📑 Extracted text (first 300 chars):", extracted_text[:300])
    except Exception as e:
        print("❌ Text Extraction Error:", str(e))
        return jsonify({'error': 'Text extraction failed', 'details': str(e)}), 500

    # Gemini Recommendation
    try:
        model = genai.GenerativeModel(model_name="models/gemini-2.0-flash")  # ✅ Fixed model name
        prompt = (
            f"Here is a resume:\n\n{extracted_text}\n\n"
            "Based on this, suggest 3 personalized career paths or learning courses with reasons."
        )
        response = model.generate_content(prompt)
        
        if hasattr(response, "text") and response.text:
            print("✅ Gemini response preview:", response.text)
            return jsonify({'recommendations': response.text})
        else:
            raise ValueError("Empty or invalid Gemini response")
    
    except Exception as e:
        print("❌ Gemini Error:", str(e))
        return jsonify({'error': 'Gemini API error', 'details': str(e)}), 500
    finally:
        os.remove(file_path)
        print("🗑️ Cleaned up uploaded file.")

if __name__ == '__main__':
    app.run(port=5002, debug=True)
