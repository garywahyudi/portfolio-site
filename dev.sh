#!/bin/bash

# Source conda for script use
source $(conda info --base)/etc/profile.d/conda.sh

# Start the Python backend
cd api
echo "Starting FastAPI backend..."
conda activate portfolio-site
uvicorn index:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# Wait a moment to ensure the backend starts
sleep 2

# Start Next.js frontend
echo "Starting Next.js frontend..."
npm run dev

# When npm process ends, kill the background Python process
kill $BACKEND_PID
