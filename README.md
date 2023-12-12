
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


git clone https://github.com/Smart-Indoor-Gardening-System/Frontend.git
cd Frontend-Master


## Step 2: Docker Setup
2.1 Dockerfile
Ensure your project has a Dockerfile at the root.

## Step 3: Build and Run with Docker
3.1 Build Docker Image
Navigate to your project's root directory and build the Docker image:
docker build -t vite-react-app:v1.0.0 .

docker run -it --rm -p 5173:5173 -v $(pwd):/app vite-react-app:v1.0.0


## Step 4: Access Your Frontend
Open your web browser and visit http://localhost:5173/ to view your running frontend application.

