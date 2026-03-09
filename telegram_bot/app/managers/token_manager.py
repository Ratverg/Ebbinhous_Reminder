from app.services.auth_service import AuthService
from datetime import datetime, timezone

class TokenManager:
    def __init__(self, service: AuthService, url, payload):
        self._jwt_token = None
        self._is_expired = True
        self._expired_at = None
        self.service = service
        self.url = url
        self.payload = payload 
    
    async def getToken(self):
        # if there is already "_jwt_token" and also this token is not expired - just return it
        if self._jwt_token != None and (not self.checkIsExpired()):
            return self._jwt_token
        
        # otherwise - get new _jwt_token from BACK API
        # AuthService will break on error and throw error, that goes to upper level
        response = await self.service.login(self.url, self.payload)
        self._jwt_token = response["jwtToken"]
        self._expired_at = datetime.fromisoformat(response["expiredAt"].replace("Z", "+00:00")) #convert to datetime object
        return self._jwt_token
    
    # "-> bool" means this function will return bool
    def checkIsExpired (self) -> bool:
        now = datetime.now(timezone.utc)
        expired = now > self._expired_at
        # print (f"expiredAt {self._expired_at} now {now} expired? {expired}")
        return expired 