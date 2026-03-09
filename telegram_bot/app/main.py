from fastapi import FastAPI
from app.api.api_router import api_router
from app.core.lifespan import lifespan

print("rat")  # проверка запуска

app = FastAPI(lifespan=lifespan)
app.include_router(api_router)

