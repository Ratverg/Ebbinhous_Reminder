class MyBackendError(Exception):
    """Base exception for our backend service"""
    pass

class MyConnectionError(MyBackendError):
    """Server is unreachable (ConnectError)"""
    pass

class MyNotFoundError(MyBackendError):
    """Resource not found (404)"""
    pass

class MyUnauthorizedError(MyBackendError):
    """Authorization failed (401)"""
    pass