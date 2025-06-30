from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import Optional, List
from jose import JWTError, jwt
from passlib.context import CryptContext
from mangum import Mangum
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Portfolio API"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# For Vercel serverless function compatibility
handler = Mangum(app)

# Security configuration
SECRET_KEY = os.getenv("SECRET_KEY", "temporarysecretkey")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Models
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class User(BaseModel):
    username: str
    email: Optional[str] = None
    disabled: Optional[bool] = None

class UserInDB(User):
    hashed_password: str

class BlogPost(BaseModel):
    id: Optional[str] = None
    title: str
    content: str
    author: str
    published_date: Optional[datetime] = None
    tags: List[str] = []

# Mock database (replace with a real database in production)
fake_users_db = {
    "admin": {
        "username": "admin",
        "email": "admin@example.com",
        "hashed_password": pwd_context.hash("adminpassword"),
        "disabled": False,
    }
}

# Sample blog posts (for demo purposes)
blog_posts = [
    BlogPost(
        id="1",
        title="Getting Started with Next.js 14",
        content="<p>Next.js 14 introduces several new features including improved build times, better developer experience, and enhanced performance. This post explores the key features and how to get started with this powerful framework.</p><h2>Server Components</h2><p>React Server Components allow developers to build applications that span the server and client, combining the rich interactivity of client-side apps with the improved performance of traditional server rendering.</p><h2>Improved Routing</h2><p>The new App Router provides a more intuitive and powerful routing system, making it easier to create complex applications with nested routes.</p>",
        author="John Doe",
        published_date=datetime.now() - timedelta(days=5),
        tags=["Next.js", "React", "Web Development"]
    ),
    BlogPost(
        id="2",
        title="Python FastAPI for Modern APIs",
        content="<p>FastAPI is a modern, high-performance web framework for building APIs with Python 3.7+ based on standard Python type hints. It's one of the fastest Python frameworks available, on par with NodeJS and Go.</p><h2>Key Features</h2><ul><li>Fast: Very high performance, on par with NodeJS and Go</li><li>Intuitive: Great editor support with completion everywhere</li><li>Easy: Designed to be easy to use and learn</li><li>Short: Minimize code duplication</li></ul><p>In this post, we'll explore how to build a modern API with FastAPI and deploy it to production.</p>",
        author="Jane Smith",
        published_date=datetime.now() - timedelta(days=10),
        tags=["Python", "FastAPI", "Backend"]
    )
]

# Authentication helpers
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)
    return None

def authenticate_user(db, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# API Routes
@app.get("/")
async def root():
    return {"message": "Welcome to the Portfolio API"}

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

# Blog API routes
@app.get("/api/blog")
@app.get("/blog")  # Keep original route for backward compatibility
async def get_posts():
    return blog_posts

@app.get("/api/blog/{post_id}")
@app.get("/blog/{post_id}")  # Keep original route for backward compatibility
async def get_post(post_id: str):
    for post in blog_posts:
        if post.id == post_id:
            return post
    raise HTTPException(status_code=404, detail="Post not found")

@app.post("/api/blog")
@app.post("/blog")  # Keep original route for backward compatibility
async def create_post(post: BlogPost, current_user: User = Depends(get_current_active_user)):
    post_dict = post.dict()
    post_dict["id"] = str(len(blog_posts) + 1)  # Simple ID generation
    post_dict["published_date"] = datetime.now()
    post_dict["author"] = current_user.username
    blog_posts.append(BlogPost(**post_dict))
    return post_dict

@app.put("/api/blog/{post_id}")
@app.put("/blog/{post_id}")  # Keep original route for backward compatibility
async def update_post(post_id: str, updated_post: BlogPost, current_user: User = Depends(get_current_active_user)):
    for i, post in enumerate(blog_posts):
        if post.id == post_id:
            if post.author != current_user.username:
                raise HTTPException(status_code=403, detail="Not authorized to update this post")
            
            # Keep original data that shouldn't change
            updated_data = updated_post.dict()
            updated_data["id"] = post_id
            updated_data["author"] = post.author
            updated_data["published_date"] = post.published_date
            
            blog_posts[i] = BlogPost(**updated_data)
            return blog_posts[i]
    
    raise HTTPException(status_code=404, detail="Post not found")

@app.delete("/api/blog/{post_id}")
@app.delete("/blog/{post_id}")  # Keep original route for backward compatibility
async def delete_post(post_id: str, current_user: User = Depends(get_current_active_user)):
    for i, post in enumerate(blog_posts):
        if post.id == post_id:
            if post.author != current_user.username:
                raise HTTPException(status_code=403, detail="Not authorized to delete this post")
            
            del blog_posts[i]
            return {"message": "Post deleted successfully"}
    
    raise HTTPException(status_code=404, detail="Post not found")
