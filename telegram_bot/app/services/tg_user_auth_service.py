import httpx
from app.exceptions.exceptions import MyBackendError, MyConnectionError, MyNotFoundError, MyUnauthorizedError
from app.managers.token_manager import TokenManager

class TGUserAuthService:

    def __init__ (self, client: httpx.AsyncClient, tokenManager: TokenManager ):
        self.client = client
        self.tokenManager = tokenManager

    #get secured endpoint with JWT token
    async def send_to_validate_Code (self, url, payload):
        #FIRST we get JWT token from tokenManager
        jwtToken = await self.tokenManager.getToken()
        #SECOND create and send request to url 
        headers = {"Authorization": f"Bearer {jwtToken}"}

        try:
            response = await self.client.post(url=url, headers=headers, json=payload)
            if response.status_code == 204:
                raise MyNotFoundError("User not found")
            if response.status_code == 401:
                raise MyUnauthorizedError("Authorization error")
            response.raise_for_status()# For all other errors (400, 500 etc)
            return response.json()
        except httpx.ConnectError:
            raise MyConnectionError("Backend Server not responding")
        except httpx.HTTPStatusError as e:
            # Wrap any other HTTP errors into your base custom error
            raise MyBackendError(f"Backend error: {e.response.status_code}")
    
