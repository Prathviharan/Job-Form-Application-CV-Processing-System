# Job Application Processing System

This is a **MERN stack** application that automates **job application processing**, including **CV handling, data extraction, webhook submission, and email automation**. The application is deployed using **Azure** and integrates with **Google Sheets** for storing extracted data.

## Tech Stack

- **Frontend**: React, Bootstrap, Fetch API
- **Backend**: Node.js, Express, MongoDB (Azure Cosmos DB)
- **Storage**: Azure Blob Storage
- **Parsing**: `pdf-parse` (Extracts text from CVs)
- **Webhook**: Axios (Sends processed data to external API)
- **Email Automation**: Nodemailer (Gmail SMTP)
- **Google Sheets API**: Stores extracted CV data
- **Deployment**: Azure App Services & Netlify
- 
---

## Setup & Installation

### **1️. Clone the repository**

```sh
git clone https://github.com/your-username/job-application-pipeline.git
cd job-application-pipeline
```

### **2️. Set up the backend**

```sh
cd backend
npm install
```

### **3️. Configure `.env` file (Backend)**

```ini
MONGO_URI=your-mongodb-uri
AZURE_STORAGE_CONNECTION_STRING=your-azure-storage-connection
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
GOOGLE_SHEET_ID=your-google-sheet-id
CANDIDATE_EMAIL=your-email@example.com
```

### **4️. Start the backend server**

```sh
npm run dev
```

### **5️. Set up the frontend**

```sh
cd frontend
npm install
npm start
```

---

## API Endpoints

### **1️. Submit Job Application**

**POST `/api/apply`** - Submits an application with CV upload.

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

## Deployment

### **1️. Deploy Backend (Azure App Services)**

```sh
az webapp up --name job-application-backend --resource-group myResourceGroup --sku B1 --location EastUS
```

### **2️. Deploy Frontend (Netlify)**

1. **Build the frontend**:
   ```sh
   cd frontend
   npm run build
   ```
2. **Deploy to Netlify**:
   - Go to [Netlify](https://www.netlify.com/)
   - Click **New site from Git**
   - Select your repository and deploy the `frontend/build` folder

---

## Testing & Debugging

### **1️. Verify Webhook Submission**

- Check if data is sent to [**https://rnd-assignment.automations-3d6.workers.dev/**](https://rnd-assignment.automations-3d6.workers.dev/)
- If failed, check `console.log("Webhook Error:", error.response?.data || error.message);`

### **2️. Check Google Sheets Storage**

- Ensure **Google Sheet ID** is correct in `.env`
- If data is missing, check logs for `console.log("Extracted CV Data:", extractedData);`

### **3️. Verify Email Sending**

- If Gmail SMTP fails, enable **Less Secure Apps** or use **SendGrid API**.
- Check logs for `console.log("Email scheduled for", name);`

## 👨‍💻 Creation

- **Name** - Prathiharan

