from aiogram import Bot
from app.bot.tg_bot import TelegramBot

class TGMessageService:
    def __init__(self, telegram_bot: TelegramBot):
        self.telegram_bot = telegram_bot

    async def send_message(self, message: str, chat_id: int):
        await self.telegram_bot.bot.send_message(
            chat_id= chat_id,
            text=message,
            parse_mode="HTML"
        )
