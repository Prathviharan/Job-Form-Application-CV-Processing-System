# Job Application Processing System

This is a **MERN stack** application that automates **job application processing**, including **CV handling, data extraction, webhook submission, and email automation**. The application is deployed using **Azure** and integrates with **Google Sheets** for storing extracted data.

## 🛠️ Tech Stack

- **Frontend**: React, Bootstrap, Fetch API
- **Backend**: Node.js, Express, MongoDB (Azure Cosmos DB)
- **Storage**: Azure Blob Storage
- **Parsing**: `pdf-parse` (Extracts text from CVs)
- **Webhook**: Axios (Sends processed data to external API)
- **Email Automation**: Nodemailer (Gmail SMTP)
- **Google Sheets API**: Stores extracted CV data
- **Deployment**: Azure App Services & Azure Static Web Apps

---

## 📂 Project Structure

```
📦 job-application-pipeline
 ┣ 📂 backend
 ┃ ┣ 📂 config
 ┃ ┃ ┗ 📜 db.js                # MongoDB connection setup
 ┃ ┣ 📂 controllers
 ┃ ┃ ┗ 📜 applicationController.js  # Handles CV processing & webhook
 ┃ ┣ 📂 models
 ┃ ┃ ┗ 📜 Applicant.js          # Mongoose schema for applications
 ┃ ┣ 📂 routes
 ┃ ┃ ┗ 📜 applicationRoutes.js   # API routes
 ┃ ┣ 📂 services
 ┃ ┃ ┣ 📜 azureStorage.js       # Handles Azure Blob Storage
 ┃ ┃ ┣ 📜 pdfParser.js          # Extracts text from PDFs
 ┃ ┃ ┣ 📜 googleSheetsService.js # Saves extracted data to Google Sheets
 ┃ ┃ ┣ 📜 emailService.js       # Sends follow-up emails
 ┃ ┣ 📜 server.js               # Main Express app
 ┣ 📂 frontend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┃ ┗ 📜 JobForm.js          # Job application form
 ┃ ┃ ┣ 📂 pages
 ┃ ┃ ┃ ┣ 📜 index.js            # Main page with form
 ┃ ┃ ┣ 📜 App.js                # React entry point
 ┃ ┃ ┣ 📜 styles.css            # Bootstrap styling
 ┃ ┣ 📜 package.json            # React dependencies
 ┣ 📜 .env                      # Environment variables
 ┣ 📜 README.md                 # Project documentation
 ┣ 📜 azure-deploy.yaml         # Deployment script for Azure
```

---

## 🔧 Setup & Installation

### **1️⃣ Clone the repository**

```sh
git clone https://github.com/your-username/job-application-pipeline.git
cd job-application-pipeline
```

### **2️⃣ Set up the backend**

```sh
cd backend
npm install
```

### **3️⃣ Configure **``** file (Backend)**

```ini
MONGO_URI=your-mongodb-uri
AZURE_STORAGE_CONNECTION_STRING=your-azure-storage-connection
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
GOOGLE_SHEET_ID=your-google-sheet-id
CANDIDATE_EMAIL=your-email@example.com
```

### **4️⃣ Start the backend server**

```sh
npm run dev
```

### **5️⃣ Set up the frontend**

```sh
cd frontend
npm install
npm start
```

---

## ✅ API Endpoints

### **1️⃣ Submit Job Application**

**POST **`` - Submits an application with CV upload.

#### Request Body (Form Data)

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "phone": "1234567890",
  "cv": "(PDF File)"
}
```

#### Response

```json
{
  "success": true,
  "message": "Application submitted successfully!"
}
```

---

## 📌 Deployment on Azure

### **1️⃣ Deploy Backend (Azure App Services)**

```sh
az webapp up --name job-application-backend --resource-group myResourceGroup --sku B1 --location EastUS
```

### **2️⃣ Deploy Frontend (Azure Static Web Apps)**

```sh
az staticwebapp create --name job-application-frontend --resource-group myResourceGroup --source . --location EastUS
```

---

## 🔥 Testing & Debugging

### **1️⃣ Verify Webhook Submission**

- Check if data is sent to [**https://rnd-assignment.automations-3d6.workers.dev/**](https://rnd-assignment.automations-3d6.workers.dev/)
- If failed, check `console.log("❌ Webhook Error:", error.response?.data || error.message);`

### **2️⃣ Check Google Sheets Storage**

- Ensure **Google Sheet ID** is correct in `.env`
- If data is missing, check logs for `console.log("📌 Extracted CV Data:", extractedData);`

### **3️⃣ Verify Email Sending**

- If Gmail SMTP fails, enable **Less Secure Apps** or use **SendGrid API**.
- Check logs for `console.log("📩 Email scheduled for", name);`

---

## 🎯 Future Improvements

- 🔹 **Improve AI-based CV Parsing**
- 🔹 **Add Authentication (OAuth)**
- 🔹 **Improve UI/UX for the application form**
- 🔹 **Optimize storage cost by auto-deleting old CVs**

---

## 👨‍💻 Contributors

- **Your Name** - Developer
- **Your Team (If any)**

---

## ⭐ Support

If you like this project, **give it a star ⭐ on GitHub!** 😊

