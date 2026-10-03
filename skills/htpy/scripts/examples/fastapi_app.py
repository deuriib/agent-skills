# FastAPI / Starlette Integration Example

```python
# app.py — minimal FastAPI app
from fastapi import FastAPI
from htpy import h1, p
from htpy.starlette import HtpyResponse

app = FastAPI()

@app.get("/")
async def index():
    return HtpyResponse(h1["Hello, FastAPI!"])
```

```python
# app.py — Starlette app
from starlette.applications import Starlette
from starlette.requests import Request
from starlette.routing import Route
from htpy import h1, div, p, Renderable
from htpy.starlette import HtpyResponse

async def homepage(request: Request) -> HtpyResponse:
    return HtpyResponse(div[
        h1["Welcome"],
        p["This is a Starlette app with htpy."],
    ])

app = Starlette(routes=[Route("/", homepage)])
```

```python
# app.py — async component with data
from fastapi import FastAPI
from htpy import div, h1, p, Renderable
from htpy.starlette import HtpyResponse

app = FastAPI()

async def fetch_user(user_id: int) -> dict:
    # Simulate DB call
    return {"id": user_id, "name": "Alice"}

@app.get("/user/{user_id}")
async def user_page(user_id: int):
    user = await fetch_user(user_id)
    return HtpyResponse(div[
        h1[f"User: {user['name']}"],
        p[f"ID: {user['id']}"],
    ])
```

```python
# app.py — streaming response
from fastapi import FastAPI
from starlette.responses import StreamingResponse
from htpy import div, h1, ul, li

app = FastAPI()

@app.get("/stream")
async def stream_page():
    async def generate():
        async for chunk in div[
            h1["Streaming Page"],
            ul[(li[f"Item {i}"] for i in range(10))],
        ].aiter_chunks():
            yield chunk
    return StreamingResponse(generate(), media_type="text/html")
```
