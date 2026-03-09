from app.services.auth_service import AuthService 



#back groung task

async def pingTest(service: AuthService):
    result = await service.ping()
    print (result)

