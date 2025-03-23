# TravelTracker-React-Node-Php

## Overview
PDF Expense Extractor is a web-based application that allows users to upload an expense receipt (such as an Uber invoice) in PDF format. The system then extracts key details like travel locations, date of travel, and total price using OpenAI's API and displays the extracted information in a structured format.

## Features
- Upload PDF receipts
- Extract travel details automatically using AI
- Display extracted data in a user-friendly format
- Built with **React.js** (Frontend) and **Node.js + Express.js** (Backend)
- Uses **Multer** for file uploads and **pdf-parse** for text extraction
- AI-powered text processing via **OpenAI API**

---

## Tech Stack
### Frontend
- React.js
- Axios (for API requests)
- HTML, CSS, JavaScript

### Backend
- Node.js + Express.js
- Multer (for handling file uploads)
- pdf-parse (for extracting text from PDFs)
- OpenAI API (for intelligent data extraction)
- dotenv (for environment variables)

---

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/pdf-expense-extractor.git
cd pdf-expense-extractor
```

### 2. Setup Backend
```bash
cd backend
npm install
```

#### Configure API Keys
Create a `.env` file inside `backend/` and add your OpenAI API key:
```env
OPENAI_API_KEY=your_openai_api_key_here
```

#### Start Backend Server
```bash
node index.js
```
_Backend will run on `http://localhost:5000/`_

### 3. Setup Frontend
```bash
cd frontend
npm install
npm start
```
_Frontend will run on `http://localhost:3000/`_

---

## Usage
1. Open the application in your browser (`http://localhost:3000/`)
2. Click **Browse** and select a PDF receipt (e.g., an Uber invoice)
3. Click **Upload**
4. The extracted travel details will be displayed

---

## API Endpoints
### **1. Upload PDF**
#### **POST** `/upload`
Uploads a PDF file and extracts travel details.

#### **Request Body:**
- `file`: (PDF) The uploaded receipt

#### **Response:**
```json
{
  "success": true,
  "extractedData": {
    "Travel From": "City A",
    "Travel To": "City B",
    "Date of Travel": "2024-03-22",
    "Total Price": "$25.00"
  }
}
```

---

## Future Improvements
- ✅ Store extracted data in a MySQL database
- ✅ Improve AI extraction accuracy
- ✅ Add support for more receipt formats
- ✅ Deploy the application to the cloud

---

## Contributing
Contributions are welcome! Feel free to submit a Pull Request or open an Issue if you have ideas to improve the project.

---

## License
This project is licensed under the MIT License.

---

## Contact
For any queries, reach out to **[Your Name]** at [your.email@example.com].
