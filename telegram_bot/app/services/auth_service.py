import logging
import httpx
from app.exceptions.exceptions import MyBackendError, MyConnectionError 

class AuthService:

    def __init__ (self, client: httpx.AsyncClient):
        self.client = client

    #just ping for test
    async def ping (self):
        response = await self.client.get("https://example.com")
        return {"status of ping": response.status_code} 

    #login function to the Spring back
    #payload = {"serviceName": "telegram", "secret": 2146}
    #loginUrl = "http://localhost:8080/api/service/auth/login"
    async def login (self, url, payload):
        try:
            response = await self.client.post(url, json=payload, timeout=5.0)
            response.raise_for_status()
            return response.json()
        except httpx.ConnectError:
            logging.error(f"Can not connect to server {url}")
            raise MyConnectionError(f"Can not connect to server {url}")
        except Exception as e:
            logging.error(f"Unexpected error {e}")
            raise MyBackendError(f"Unexpected error {e}")
    
    
