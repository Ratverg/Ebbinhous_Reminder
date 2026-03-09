from fastapi import APIRouter, Request, Depends
from app.deps.auth_deps import AuthDeps
from app.bot.tg_bot import TelegramBot
from aiogram.types import Update
from app.services.tg_message_service import TGMessageService


#now we can add routes in separate files
api_router = APIRouter()    

#we get client from the request (we have only one client created at "lifespan.py")
@api_router.get("/ping")
async def ping(request: Request):
    #get client from the request
    client = request.app.state.http_client
    r = await client.get("https://example.com")
    return {"status": r.status_code}

@api_router.get("/test")
async def test():
    return {"status": "rat!"}

#this is for webhook for the telegram bot
#tg bot sends POST requests here
@api_router.post("/tg_webhook")
async def test(request: Request):
    #request comes as a JSON object (after parcing request.json())
    #here we validate and convert this request to Update object
    updateJSON = await request.json()
    update = Update.model_validate(updateJSON)
    #here we get created telegram bot from "app.state.telegram_bot" (yes, "app.state" storage we get from the "request") 
    #request.app — provides a reference to the main FastAPI instance,
    #allowing us to retrieve globally initialized objects like 'telegram_bot'.
    bot : TelegramBot = request.app.state.telegram_bot
    #we send this "update" object to bot dispatcher, and dispatcher decides, where to send this "update" 
    await bot.process_update(update)
    return {"status": "tg webhook done!"}

# JWT Validation via Dependency Injection:
# ---------------------------
# 1. FastAPI intercepts the request BEFORE executing the endpoint.
# 2. It injects the 'Request' object into 'AuthDeps.validate_token'.
# 3. If validation fails, an HTTPException is raised (blocking the endpoint).
# 4. If successful, the decoded JWT payload is injected into 'response_dict'.
# ---------------------------
# "dict = Depends(AuthDeps.validate_token)" it DOES NOT means dict = "something" !!!, it means:
#   "dict" - hint return type of dictionary
#   "= Depends(AuthDepts.validate_token())" - it's like default value in regular function, but fastApi goes and execute function ".validate_token()"
# ---------------------------
@api_router.get("/secured-test")
async def secure_test(response_dict: dict = Depends(AuthDeps.validate_token)):
    return response_dict

@api_router.post("/send-message")
async def send_message(request: Request, response_dict: dict = Depends(AuthDeps.validate_token)):
    #here we get created telegram bot from "app.state.telegram_bot"
    tg_message_service : TGMessageService = request.app.state.tg_message_service
    data = await request.json()
    chat_id = data["chatId"]
    text = data["text"]
    await tg_message_service.send_message(text, chat_id)
    # print(f"response from api_router {response_dict}")
    return {"ok" : True}

@api_router.get("/health")
async def health(request: Request, response_dict: dict = Depends(AuthDeps.validate_token)):
    # print (response_dict)
    tg_health_response_dto = {"botOnline": "true"}
    return tg_health_response_dto