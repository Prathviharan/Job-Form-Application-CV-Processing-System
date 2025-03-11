require("dotenv").config();
const { BlobServiceClient } = require("@azure/storage-blob");
const fs = require("fs");

// Validate and get connection string
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!connectionString) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is not defined in environment variables");
}

// Initialize BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);

const uploadToAzure = async (file) => {
    try {
        const blobName = `${Date.now()}-${file.originalname}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Use createReadStream for better performance (avoid loading the entire file into memory)
        const fileStream = fs.createReadStream(file.path);

        // Upload the file to Azure Blob Storage
        const uploadResponse = await blockBlobClient.uploadStream(fileStream);

        // Log the response for debugging purposes
        console.log("Upload Response:", uploadResponse);

        // Generate the public URL of the uploaded file
        return blockBlobClient.url;
    } catch (error) {
        console.error("Azure Blob Upload Error:", error);
        throw new Error("Failed to upload file to Azure Blob Storage");
    }
};

// Directly export the function
module.exports = uploadToAzure;
