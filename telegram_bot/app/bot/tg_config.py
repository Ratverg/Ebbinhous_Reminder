import os
from dotenv import load_dotenv

#get token from the .env file in root folder
load_dotenv()
BOT_TOKEN = os.getenv("BOT_TOKEN")
SECRET_KEY = os.getenv("SECRET_KEY")
BACKEND_SERVER_NAME = os.getenv("BACKEND_SERVER_NAME")