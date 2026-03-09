import socket
from aiogram import Bot, Dispatcher
from aiogram.types import Update
from aiogram.client.session.aiohttp import AiohttpSession
from aiohttp import TCPConnector, ClientTimeout
from app.services.tg_responses_service import TGResponsesService
from app.services.tg_user_auth_service import TGUserAuthService

#MAIN telegram bot class
class TelegramBot:
    def __init__ (self, token: str, tg_router, tg_auth_service: TGUserAuthService, tg_responses_service: TGResponsesService):
        #connect tg_router, that has routes where to send "update" object
        self.tg_router = tg_router
        #creating main BOT object
        self._bot = Bot(token)
        #create dispatcher, that decides what to do with "update" object
        self._dp = Dispatcher()
        #connect routes - to dispatcher
        self._dp.include_router(self.tg_router)
        #put TGAuthService object to dispatcher, it clould be autoinjected later in tg_router:
        self._dp["tg_auth_service"] = tg_auth_service
        #put TGResponsesService in dispatcher
        self._dp["tg_responses_service"] = tg_responses_service
    

    #start bot, connect webhook - API point, where bot will send all "update" objects
    #this API point needs to be HTTPS, so we need to use "ngrok.exe" server, that starts locally and forwards all data
    #TODO in production change to real adress with https
    async def start_bot(self):
        try:
            await self._bot.set_webhook(
                "https://ebbinghaus-reminder-bot.windway.dev/tg_webhook"
            )
            print("Telegram webhook set successfully")
        except Exception as e:
            # 
            print("WARNING: Failed to set Telegram webhook:", e)

    #delete webhook and close session (used in "lifespan")
    async def stop_bot(self):
        try:
            await self._bot.delete_webhook()
        finally:
            await self._bot.session.close()

    #send "update" message to the dispatcher
    #dispatcher use "tg_router" to decide what to do with
    async def process_update(self, update: Update):
        await self._dp.feed_update(self._bot, update)
    
    @property
    def bot(self) -> Bot:
        return self._bot