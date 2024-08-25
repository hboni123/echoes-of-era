
# Chat with Historical Figures

## Overview

This project allows users to chat with historical figures, powered by OpenAI's GPT-3.5 model. In addition to text responses, the project integrates with Amazon Polly to provide audio responses. The frontend is built with Next.js, while the backend is powered by Node.js and Express, hosted on an AWS EC2 instance.

## Features

- Chat with various historical figures using GPT-3.5.
- Receive both text and audio responses (generated using Amazon Polly).
- Fully deployed on an AWS EC2 instance.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [AWS Setup](#aws-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

## Installation

### Prerequisites

- Node.js and npm installed on your machine.
- AWS account with access to IAM and Polly.
- Git for version control.

### Cloning the Repository

```bash
git clone https://github.com/hboni123/echoes-of-era.git
cd your-repo-name
```

### Installing Dependencies

Navigate to the backend and frontend directories and install the required dependencies:

Link to frontend directory: [echoes-of-era-frontend](https://github.com/hboni123/echoes-of-era-frontend)

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## Environment Variables

### Setting Up the `.env` File

Create a `.env` file in the `backend` directory and add the following environment variables:

```plaintext
# OpenAI API Key
OPENAI_API_KEY=your-openai-api-key

# AWS Credentials for Polly
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=your-aws-region

# Backend Port
PORT=5000
```

### Obtaining the Keys

- **OpenAI API Key**: Obtain from the [OpenAI Dashboard](https://platform.openai.com/account/api-keys).
- **AWS Credentials**: Create an IAM user in AWS with `AmazonPollyFullAccess` permissions. Obtain the `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION` values from the AWS Management Console.

## AWS Setup

### 1. Create IAM User for Polly

1. **Sign in to the AWS Management Console**.
2. **Navigate to IAM** and create a new user with **Programmatic access**.
3. **Attach the `AmazonPollyFullAccess` policy** to the user.
4. **Download the credentials** (`.csv` file) and add them to your `.env` file.

### 2. Setting Up EC2

1. **Launch an EC2 instance** running Amazon Linux or Ubuntu.
2. **SSH into the EC2 instance** and clone the repository.
3. **Pull the latest changes** and install dependencies using `npm install`.
4. **Configure the environment variables** on the EC2 instance.

## Running the Application

### Starting the Backend

1. **Start the backend server** using `pm2` or `node`:

```bash
# Using PM2
pm2 start index.js

# Using Node.js directly
node index.js
```

2. **Access the backend** via `http://your-ec2-public-ip:5000`.

### Running the Frontend

1. **Deploy the frontend** using Vercel, Netlify, or run it locally:

```bash
npm run dev
```

2. **Access the frontend** via `http://localhost:3000` (or your deployed URL).

## API Documentation

### `/chat` Endpoint

**Endpoint**: `/chat`

**Method**: `POST`

**Request Body**:

```json
{
  "message": "Hello, how are you?",
  "figure": "Albert Einstein"
}
```

**Response**:

```json
{
  "response": "Hello, I'm Albert Einstein. How can I assist you today?",
  "audio": "base64-encoded-mp3-string"
}
```

- **response**: The text response generated by OpenAI.
- **audio**: The base64-encoded MP3 audio generated by Amazon Polly.

## Troubleshooting

### Common Issues

1. **Error Generating Voice**: Ensure your IAM user has the `AmazonPollyFullAccess` policy attached and that your AWS credentials are correctly set in the `.env` file.

2. **No Text or Audio Response**: Check the backend logs using `pm2 logs` to diagnose any issues with OpenAI or Polly.

3. **CORS Errors**: Ensure the backend allows cross-origin requests from your frontend domain.

### Logs

Use `pm2 logs` to view detailed logs for the backend, including OpenAI and Polly errors.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [OpenAI](https://openai.com/) for their powerful GPT-3.5 API.
- [AWS Polly](https://aws.amazon.com/polly/) for voice generation.

---

This README should provide a comprehensive overview of your project, helping users to set up, configure, and run the application smoothly. If you need any further customization or additional sections, feel free to ask!
