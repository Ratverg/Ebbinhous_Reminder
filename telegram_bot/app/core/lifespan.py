from fastapi import FastAPI 
import httpx
from contextlib import asynccontextmanager
from app.services.auth_service import AuthService
from app.services.tg_responses_service import TGResponsesService
from app.workers.ping_worker import PingWorker
from app.managers.token_manager import TokenManager
from app.workers.version_info_worker import VersionInfoWorker
from app.services.version_info_service import VersionInfoService
from app.services.tg_user_auth_service import TGUserAuthService
from app.services.tg_message_service import TGMessageService
from app.bot.tg_bot import TelegramBot
from app.bot.tg_config import BOT_TOKEN
from app.bot.tg_config import BACKEND_SERVER_NAME
from app.bot.tg_router import tg_router

@asynccontextmanager
async def lifespan(app: FastAPI):
   #create global httpx client
   #app.state - is some kind of storage, we put what we need here 
   app.state.http_client = httpx.AsyncClient(
      timeout=5.0
   )

   # CREATE auth service
   authService = AuthService(app.state.http_client)
   payload = {"serviceName": "telegram", "secret": 2146}
   loginUrl = f"http://{BACKEND_SERVER_NAME}:8080/api/service/auth/login"
   # CREATE auth service 
   app.state.token_manager = TokenManager(authService, loginUrl, payload)

   #CREATE TGUserAuthService
   tg_auth_service = TGUserAuthService(app.state.http_client, app.state.token_manager)

   #CREATE TGResponsesService
   tg_responses_service = TGResponsesService(app.state.http_client, app.state.token_manager)

   # CREATE and RUN telegram bot, and send TGUserAuthService as "telegram_auth_service"
   app.state.telegram_bot = TelegramBot(BOT_TOKEN, tg_router, tg_auth_service, tg_responses_service)
   await app.state.telegram_bot.start_bot()

   #CREATE TGMessageService
   app.state.tg_message_service = TGMessageService(app.state.telegram_bot)

   # RUN BACKGROUND WORKERS
   # ping worker - pinging adress
   #app.state.ping_worker = PingWorker(authService, interval=10)
   #  app.state.ping_worker.start()
    # version info worker
   # versionService = VersionInfoService(app.state.http_client, app.state.token_manager)
   # app.state.version_info_worker = VersionInfoWorker(versionService, interval=10)
   #  app.state.version_info_worker.start() 

   yield #all code is executing here

   #close httpx client 
   await app.state.telegram_bot.stop_bot()  
#  app.state.ping_worker.stop()
#  app.state.version_info_worker.stop()
   await app.state.http_client.aclose() 
    

