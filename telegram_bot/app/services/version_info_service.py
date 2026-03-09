import httpx
from app.managers.token_manager import TokenManager

class VersionInfoService:

    def __init__ (self, client: httpx.AsyncClient, tokenManager: TokenManager ):
        self.client = client
        self.tokenManager = tokenManager

    #get secured endpoint with JWT token
    async def getInfo (self, url):
        #FIRST we get JWT token from tokenManager
        jwtToken = await self.tokenManager.getToken()
        #SECOND create and send request to url 
        headers = {"Authorization": f"Bearer {jwtToken}"}
        response = await self.client.get(url=url, headers=headers)
        print(response.json())
        return response.json()