# Portfolio Site with Blog

A modern personal portfolio site with blogging capabilities, built with Next.js for the frontend and Python FastAPI for the backend. This project is optimized for deployment on Vercel.

## Tech Stack

### Frontend
- Next.js 14 with App Router
- TypeScript
- TailwindCSS for styling
- React components for blog and portfolio features

### Backend
- Python 3.11
- FastAPI for API development
- JWT authentication for secure admin access
- MongoDB for data storage (configurable)

## Features

- Responsive design optimized for all devices
- Server-side rendering for optimal performance
- Blog system with markdown support
- Portfolio project showcase
- Admin dashboard for content management
- API endpoints for blog and portfolio data
- Secure authentication for admin users

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- Conda (Miniconda or Anaconda)
- Git

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd portfolio-site
```

2. Install JavaScript dependencies:
```bash
npm install
```

3. Set up the Python environment:
```bash
cd api
chmod +x setup.sh
./setup.sh
cd ..
```

### Development

To run both the frontend and backend simultaneously:

```bash
./dev.sh
```

Or run them separately:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
cd api
source $(conda info --base)/etc/profile.d/conda.sh
conda activate portfolio-site
uvicorn index:app --reload --port 8000
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)
- API Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

### Environment Variables

- Frontend: `.env.development` and `.env.production`
- Backend: `api/.env`

Make sure to update these files with your own values before deploying to production.

## Deployment on Vercel

This project is optimized for Vercel deployment with both frontend and backend:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure the environment variables in the Vercel dashboard
4. Deploy

The deployment will automatically handle both the Next.js frontend and the Python FastAPI backend.

## Security Best Practices

- JWT authentication with secure token handling
- CORS configuration for API protection
- Environment variables for sensitive information
- Input validation on both frontend and backend
- Rate limiting (configurable in production)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
