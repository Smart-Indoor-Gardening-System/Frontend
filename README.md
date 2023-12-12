
# Frontend Setup Guide

## Overview

This guide will walk you through setting up and running your frontend project using Docker and Vite. Docker ensures a consistent environment, and Vite provides a fast development server.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


### Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (if not already installed locally)

## Step 1: Clone the Repository

Clone your frontend project repository to your local machine:

```bash
git clone https://github.com/Smart-Indoor-Gardening-System/Frontend.git
cd Frontend-Master


## Step 2: Docker Setup
2.1 Dockerfile
Ensure your project has a Dockerfile at the root.

## Step 3: Build and Run with Docker
3.1 Build Docker Image
Navigate to your project's root directory and build the Docker image:
docker build -t vite-react-app:v1.0.0 .
docker run -it --rm -p 5173:5173 vite-react-app:v1.0.0


```bash
git clone 
cd your-frontend-repo
Step 2: Docker Setup
2.1 Dockerfile
Ensure your project has a Dockerfile at the root. If not, create one with the following content:

Dockerfile
Copy code
FROM node

WORKDIR /app

COPY package.json .
RUN npm install

COPY .

EXPOSE 5173

CMD ["npm", "run", "dev"]
2.2 Vite Configuration
Make sure your Vite configuration (vite.config.js) has the following content:

javascript
Copy code
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  }
})
Step 3: Build and Run with Docker
3.1 Build Docker Image
Navigate to your project's root directory and build the Docker image:

bash
Copy code
docker build -t your-frontend-app:v1.0.0 .
3.2 Run Docker Container
Run the Docker container:

bash
Copy code
docker run -it --rm -p 5173:5173 your-frontend-app:v1.0.0
## Step 4: Access Your Frontend
Open your web browser and visit http://localhost:5173/ to view your running frontend application.

