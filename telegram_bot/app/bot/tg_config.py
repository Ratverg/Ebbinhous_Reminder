import os
from dotenv import load_dotenv
from pathlib import Path

# 1. Try to load from the current directory (Standard for Docker/Production)
load_dotenv()

# 2. If variables are still missing, try the specific local dev path
if not os.getenv("BOT_TOKEN"):
    # Path to your local dev .env (3 levels up)
    local_env = Path(__file__).resolve().parents[3] / '.env'
    load_dotenv(dotenv_path=local_env)

BOT_TOKEN = os.getenv("BOT_TOKEN")
SECRET_KEY = os.getenv("SECRET_KEY")
BACKEND_SERVER_NAME = os.getenv("BACKEND_SERVER_NAME")

if not BOT_TOKEN:
    print(f"⚠️ Warning: BOT_TOKEN not found at {env_path}")