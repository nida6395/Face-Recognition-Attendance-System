from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from api import router

app = FastAPI()

# ✅ CORRECT CORS CONFIG
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Favicon redirect
@app.get("/favicon.ico")
def favicon():
    return RedirectResponse(url="/static/favicon.ico")

# API routes
app.include_router(router)
