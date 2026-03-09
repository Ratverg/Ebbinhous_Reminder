from app.services.version_info_service import VersionInfoService
from app.bot.tg_config import BACKEND_SERVER_NAME

import asyncio

#Worker
class VersionInfoWorker:
    def __init__(self, version_info_service: VersionInfoService, interval: int=10):
        self.version_info_service = version_info_service
        self.interval = interval
        self._stop_event = asyncio.Event()#this type used for "stop" flag
        self._task = None
        
    async def _run(self):
        #Run while "stop" flag does not set
        while not self._stop_event.is_set():
            try:
                #"ping" end point using versionInfoService
                await self.version_info_service.getInfo(url=f"http://${BACKEND_SERVER_NAME}:8080/api/service/telegram/about")
            except Exception as e:
                print ("VersionInfoWorker Error: ", repr(e)) #repr() make more user friendly
            #async pause
            await asyncio.sleep(self.interval)

    def start(self):
        self._task = asyncio.create_task(self._run())

    async def stop(self):
        self._stop_event.set()
        # we need this to stop event correctly
        if self._task:
            await self._task
        print("task is finished")