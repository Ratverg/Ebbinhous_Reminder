from jose import jwt, JWTError
from fastapi import HTTPException

# class Security:
#     def __init__(self):
#         self._SECRECT_KEY = "ratsecretratsecretratsecretratsecretratsecretratsecret"
#         self._ALGORITHMS = ["HS256"]
#     def validateJWT (self, jwtToken: str) -> dict:
#         try:
#             return jwt.decode(
#                 jwtToken,
#                 self._SECRECT_KEY,
#                 algorithms=self._ALGORITHMS
#             )    
#         except JWTError as e:
#             raise HTTPException(401,f"Invalid JWT code: {repr(e)}")
        
# sec = Security()
# print(sec.validateJWT("eyJhbGciOiJIUzI1NiJ9.eyJ0eXBlIjoiU0VSVklDRSIsInJvbGVzIjoiU0VSVklDRSIsInN1YiI6InRlbGVncmFtIiwiaWF0IjoxNzY2MjM3OTE3LCJleHAiOjE3NjYyMzc5Nzd9.zS-4Ow2GKEfc-jbgoQutWCY30u3U4P_TtVHx1wmI65A"))