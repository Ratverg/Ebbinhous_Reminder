from app.services.auth_service import AuthService
import asyncio

class PingWorker:
    def __init__(self, service: AuthService, interval: int=10):
        self.service = service
        self.interval = interval
        self._stop_event = asyncio.Event()
        self._task = None

    async def _run(self):
        while not self._stop_event.is_set():
            response = await self.service.ping()
            print(response)
            await asyncio.sleep(self.interval)

    def start(self):
        self._task = asyncio.create_task(self._run())

    async def stop(self):
        self._stop_event.set()
        if self._task:
            await self._task
        print("task is finished")




