

from datetime import datetime
import httpx

from app.exceptions.exceptions import MyBackendError, MyConnectionError, MyNotFoundError, MyUnauthorizedError
from app.managers.token_manager import TokenManager
from babel.dates import format_datetime


class TGResponsesService:
    def __init__ (self, client: httpx.AsyncClient, tokenManager: TokenManager ):
        self.client = client
        self.tokenManager = tokenManager

    async def get_curr_user_info_tg(self, url: str):
        #FIRST we get JWT token from tokenManager
        jwtToken = await self.tokenManager.getToken()
        #SECOND we create and send request to url
        headers = {"Authorization":f"Bearer {jwtToken}"}
        try:
            response = await self.client.get(url=url, headers=headers)
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
    
    async def get_curr_user_info_ar(self, url: str):
        #FIRST we get JWT token from tokenManager
        jwtToken = await self.tokenManager.getToken()
        #SECOND we create and send request to url
        headers = {"Authorization":f"Bearer {jwtToken}"}
        try:
            response = await self.client.get(url=url, headers=headers)
            if response.status_code == 404:
                raise MyNotFoundError("User not found")
            if response.status_code == 401:
                raise MyUnauthorizedError("Authorization error")
            response.raise_for_status()# For all other errors (400, 500 etc)
            return response.json()
        except httpx.ConnectError:
            raise MyConnectionError("Backend Server not responding")
        except httpx.HTTPStatusError as e:
            # Wrap any other HTTP errors into your base custom error
            raise MyBackendError(f"Backend error: {e.response}")
        



    
    async def get_nt_list(self, url: str):
        #FIRST we get JWT token from tokenManager
        jwtToken = await self.tokenManager.getToken()
        #SECOND we create and send request to url
        headers = {"Authorization":f"Bearer {jwtToken}"}
        try:
            response = await self.client.get(url=url, headers=headers)
            if response.status_code == 404:
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
    
    async def unlink_tg_user(self, url: str):
        #FIRST we get JWT token from tokenManager
        jwtToken = await self.tokenManager.getToken()
        #SECOND we create and send request to url
        headers = {"Authorization":f"Bearer {jwtToken}"}
        try:
            response = await self.client.delete(url=url, headers=headers)
            if response.status_code == 204:
                return True # All fine, this is normal status code afted delete
            if response.status_code == 404:
                raise MyNotFoundError("User not found")
            if response.status_code == 401:
                raise MyUnauthorizedError("Authorization error")
            response.raise_for_status()# For all other errors (400, 500 etc)
        except httpx.ConnectError:
            raise MyConnectionError("Backend Server not responding")
        except httpx.HTTPStatusError as e:
            # Wrap any other HTTP errors into your base custom error
            raise MyBackendError(f"Backend error: {e.response.status_code}")


    def format_unlink_tg_user(self, telegram_id):
        data_formatted = (
            f"✅ TG Account with id: {telegram_id} unlinked successfully\n\n"
        )
        return data_formatted

    def format_curr_user_info_ar_tg(self, ar_data, tg_data):
        ar_tg_data_formatted = (
            f"✅ Connected to Telegram account successfully\n\n"
            f"👤 Username: {ar_data['username']}\n"
            f"👤 Email: {ar_data['email']}\n"
            f"👤 TelegramID: {tg_data['telegramId']}\n"
            f"👤 Telegram Username: {tg_data['tgUsername']}\n"
        )
        return ar_tg_data_formatted
    
    def start_message(self):
        data_formatted = (
            f"✅ To connect your Telegram account or change settings account go to http://abbynghause-reminder.net\n\n"
            f"Command list:\n"
            f"/start — start command\n"
            f"/status — check status\n"
            f"/unlink — unlink Telegram\n"
            f"/help — help =)\n"
            f"/notifications — all notifications list\n"
        )
        return data_formatted

    def start_message_connected(self, ar_data, tg_data):
        data_formatted = (
            f"✅ Connected to Telegram account successfully\n\n"
            f"✅ To connect your Telegram account or change settings account go to http://abbynghause-reminder.net\n\n"
            f"👤 Username: {ar_data['username']}\n"
            f"👤 Email: {ar_data['email']}\n"
            f"👤 TelegramID: {tg_data['telegramId']}\n"
            f"👤 Telegram Username: {tg_data['tgUsername']}\n\n"
            f"Command list:\n"
            f"/start — start command\n"
            f"/status — check status\n"
            f"/unlink — unlink Telegram\n"
            f"/help — help =)\n"
            f"/notifications — all notifications list\n"
        )
        return data_formatted

    def format_all_notifications_list(self, nt_list):
        nt_list_formatted = "✅ Here is your full notifications list:\n\n"
        for nt in nt_list:
            # datetime.fromisoformat(response["expiredAt"].replace("Z", "+00:00"))
            date_str = nt['dates'][0]['repeatDate'].replace("Z", "+00:00")
            row_date = datetime.fromisoformat(date_str)
            date_formatted = format_datetime(row_date, "d MMM yyyy - HH'ч.' mm'мин.'", locale='ru')
            title_str = nt['title']
            nt_list_formatted += f"<b>{title_str}</b>\n"
            nt_list_formatted += f"<code>{date_formatted}</code>\n\n"
        return nt_list_formatted
    



    def format_curr_user_info_tg(self, tg_data):
        tg_data_formatted = (
            f"✅ Connected to Telegram account successfully\n\n"
            f"👤 ID: {tg_data['telegramId']}\n"
            f"Command list:\n"
            f"/status — check status\n"
            f"/unlink — unlink Telegram\n"
            f"/help — help =)"
        )
        return tg_data_formatted

    # def format_curr_user_info_ar(self, arData):
    #     ar_data_formatted = (
    #         f"✅ Connected to Telegram account successfully\n\n"
    #         f"👤 Username: {arData['username']}\n"
    #         f"👤 Email: {arData['email']}\n"
    #     )
    #     return ar_data_formatted