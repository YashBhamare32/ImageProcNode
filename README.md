# Blob API Integration Assignment

This project implements a RESTful API using Node.js and Express to handle image uploads and retrieval of job statuses. The API integrates with a MongoDB database using Mongoose for data modeling and querying.

## Features

1. **File Upload Endpoint**: Allows clients to upload images as multipart form-data.
2. **Job Status Retrieval**: Retrieves the status of a job based on its ID.
3. **Authentication**: Uses JWT tokens for authentication via Bearer tokens in HTTP headers.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer
- Axios
- JWT

# API Endpoints

## POST /api/v1/job
Uploads an image file.

Request Body: Multipart form-data with fields image (file) and token (JWT Bearer token).
Response: JSON object with the status of the job.


## GET /api/v1/job/status/:id
Retrieves the status of a job identified by :id.

Parameters: id (integer) - ID of the job to retrieve status for.
Response: JSON object containing jobId and status.


## POST /api/v1/blob
Takes an image as input and a jwt token and creates a new job entry in the database.

Request Body:Multipart form-data with fields image (file) and token (JWT Bearer token) received from job worker service.
Response: JSON object with the status of the job but it returns it to job worker service.

## GET /api/v1/blob/:id
Retreives the blob from the database with the help of blob id.

Parameters: id (integer) - ID of the blob to retrieve.
Response: JSON object containing blob details.
