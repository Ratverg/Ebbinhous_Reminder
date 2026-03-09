from fastapi import Request, HTTPException
from jose import jwt, JWTError
from app.bot.tg_config import SECRET_KEY

#This will be used in endpoints to validate recieved requests
class AuthDeps:
    #In static method, use "class level" variables
    ALGORITHMS = ["HS256"]

    @staticmethod
    def get_token_from_header (request: Request) -> str:
        auth = request.headers.get("Authorization")
        if not auth or not auth.startswith("Bearer "):
            raise HTTPException (401, "Missing auth bearer")
        # print(auth.split(" ")[1])
        return auth.split(" ")[1]
        
    @staticmethod
    def validate_token (request: Request) -> dict:
        jwt_token = AuthDeps.get_token_from_header(request)
        try:
            return jwt.decode(
                jwt_token,
                SECRET_KEY,
                algorithms=AuthDeps.ALGORITHMS
            )    
        except JWTError as e:
            raise HTTPException(401,f"Invalid JWT code: {repr(e)}")