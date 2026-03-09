from aiogram import Router, Dispatcher
from fastapi import FastAPI
from aiogram.types import Message
from aiogram.filters import CommandStart, Command
from app.exceptions.exceptions import MyBackendError, MyConnectionError, MyNotFoundError, MyUnauthorizedError
from app.services.tg_responses_service import TGResponsesService
from app.services.tg_user_auth_service import TGUserAuthService
from app.bot.tg_config import BACKEND_SERVER_NAME
import httpx
import logging

tg_router = Router()
BACKEND_SERVER_NAME = BACKEND_SERVER_NAME


#if "dispatcher" recieve "/start" with Args it goes here
#deep link example "https://t.me/Ebbinghaus_Reminder_main_bot?start=V530M2"
# INJECTION telegram_auth_service in AIOGRAM:
# - search for object of type "TGUserAuthService"
# - found that we put in ._dp
# - inject it to the handler
# so yes, we can put service to dispatcher, as in a dict
@tg_router.message(CommandStart(deep_link=True))
async def start_handler(message: Message, command: CommandStart, tg_auth_service: TGUserAuthService, tg_responses_service: TGResponsesService):
    #get auth code from the "args"
    startArgs = command.args
    # create payload
    tg_request_dto = {
        "authCodeTemp": startArgs,
        "telegramId": message.from_user.id,
        "chatId": message.chat.id,
        "tgUsername": message.from_user.username
    }
    try:
        print("--------------------WTF----------------")
        #send payload to the spring back, and get TGUserDTO back
        tg_data = await tg_auth_service.send_to_validate_Code(f"http://{BACKEND_SERVER_NAME}:8080/api/service/telegram/validate-code",tg_request_dto)
        print(f"tg_data - {tg_data}")
        #get ARUserDTO
        ar_data = await tg_responses_service.get_curr_user_info_ar(f"http://{BACKEND_SERVER_NAME}:8080/api/service/telegram/ar-user-info/{message.from_user.id}")
        print(f"ar_data - {ar_data}")
        #send message to telegram
        print(f"tg_data - {tg_data} ar_data : {ar_data}")
        await message.answer(tg_responses_service.start_message_connected(ar_data, tg_data))
    except MyConnectionError as e:
        # Send a friendly message back to the user
        await message.answer("Bot: Sorry, could not connect to server")
    except MyBackendError as e:
        # Send a friendly message back to the user
        await message.answer("Bot: Sorry, some back end errror")
    await message.answer(f"Bot: sent request to back with payload = {tg_request_dto}")


# if "dispatcher" recieve "/start" it goes here
@tg_router.message(CommandStart())
async def start_handler(message: Message, tg_responses_service:TGResponsesService):
    await message.answer(tg_responses_service.start_message())

@tg_router.message(Command(commands=["status"]))
async def status_handler(message: Message, tg_responses_service: TGResponsesService):
    try:
        ar_data = await tg_responses_service.get_curr_user_info_ar(f"http://{BACKEND_SERVER_NAME}:8080/api/service/telegram/ar-user-info/{message.from_user.id}")
        tg_data = await tg_responses_service.get_curr_user_info_tg(f"http://{BACKEND_SERVER_NAME}:8080/api/service/telegram/tg-user-info/{message.from_user.id}")
        await message.answer(tg_responses_service.format_curr_user_info_ar_tg(ar_data, tg_data))
    except MyConnectionError:
        # Backend is down
        await message.answer("Bot: Sorry, could not connect to server")
    except MyNotFoundError:
        # 404 Not Found from Backend
        await message.answer("Bot: Your account is not currently linked.")
    except MyUnauthorizedError:
        # 401 Unauthorized (Token issue)
        await message.answer("Bot: Unauthorized connection error")
    except MyBackendError as e:
        # Any other 4xx or 5xx errors
        await message.answer("Bot: Sorry, some back end errror")

@tg_router.message(Command(commands=["help"]))
async def status_handler(message: Message, ):
    await message.answer("help yourself!")

@tg_router.message(Command(commands=["notifications"]))
async def status_handler(message: Message, tg_responses_service: TGResponsesService):
    try:
        all_notifications_list = await tg_responses_service.get_nt_list(f"http://{BACKEND_SERVER_NAME}:8080/api/service/telegram/all-notifications/{message.from_user.id}")
        await message.answer(tg_responses_service.format_all_notifications_list(all_notifications_list), parse_mode="HTML")
    except MyConnectionError:
        # Backend is down
        await message.answer("Bot: Sorry, could not connect to server")
    except MyNotFoundError:
        # 404 Not Found from Backend
        await message.answer("Bot: Your account is not currently linked.")
    except MyUnauthorizedError:
        # 401 Unauthorized (Token issue)
        await message.answer("Bot: Unauthorized connection error")
    except MyBackendError as e:
        # Any other 4xx or 5xx errors
        await message.answer("Bot: Sorry, some back end errror")

@tg_router.message(Command(commands=["unlink"]))
async def status_handler(message: Message, tg_responses_service: TGResponsesService):
    try:
        await tg_responses_service.unlink_tg_user(f"http://{BACKEND_SERVER_NAME}:8080/api/service/telegram/unlink-tg-user/{message.from_user.id}")
        await message.answer(tg_responses_service.format_unlink_tg_user(message.from_user.id), parse_mode="HTML")

    except MyConnectionError:
        # Backend is down
        await message.answer("Bot: Sorry, could not connect to server")
    except MyNotFoundError:
        # 404 Not Found from Backend
        await message.answer("Bot: Your account is not currently linked.")
    except MyUnauthorizedError:
        # 401 Unauthorized (Token issue)
        await message.answer("Bot: Unauthorized connection error")
    except MyBackendError as e:
        # Any other 4xx or 5xx errors
        await message.answer("Bot: Sorry, some back end errror")

#if "dispatcher" recieve any message "adsfasdf" it goes here
@tg_router.message()
async def echo_handler(message: Message, tg_responses_service: TGResponsesService):
    #.answer is syntax sugar, it's equal to
    # await bot.send_message(
    #   chat_id=message.chat.id,
    #   text="Hello!"
    #)
    try:
        ar_data = await tg_responses_service.get_curr_user_info_ar(f"http://{BACKEND_SERVER_NAME}:8080/api/service/telegram/ar-user-info/{message.from_user.id}")
        tg_data = await tg_responses_service.get_curr_user_info_tg(f"http://{BACKEND_SERVER_NAME}:8080/api/service/telegram/tg-user-info/{message.from_user.id}")
        await message.answer(tg_responses_service.format_curr_user_info_ar_tg(ar_data, tg_data))
    except MyConnectionError:
        # Backend is down
        await message.answer("Bot: Sorry, could not connect to server")
    except MyNotFoundError:
        # 404 Not Found from Backend
        await message.answer("Bot: Your account is not currently linked.")
    except MyUnauthorizedError:
        # 401 Unauthorized (Token issue)
        await message.answer("Bot: Unauthorized connection error")
    except MyBackendError as e:
        # Any other 4xx or 5xx errors
        await message.answer("Bot: Sorry, some back end errror")

        
