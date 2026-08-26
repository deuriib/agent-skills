# Async Rendering Example

```python
# async_basic.py — Async component
import asyncio
from htpy import p, div, Renderable

async def get_text() -> str:
    return "fetched asynchronously"

async def my_component() -> Renderable:
    result = await get_text()
    return p[result]

async def main():
    async for chunk in div[my_component()].aiter_chunks():
        print(chunk)

asyncio.run(main())
```

```python
# async_iterator.py — Async iterator as children
from htpy import ul, li, Renderable

async def stream_items():
    for i in range(5):
        yield li[f"Item {i}"]

def my_list() -> Renderable:
    return ul[stream_items()]

async def main():
    async for chunk in my_list().aiter_chunks():
        print(chunk)

asyncio.run(main())
```

```python
# async_fastapi.py — Full FastAPI integration
from fastapi import FastAPI
from starlette.responses import StreamingResponse
from htpy import div, h1, p, Renderable
from htpy.starlette import HtpyResponse

app = FastAPI()

async def fetch_data() -> str:
    # Simulate async DB call
    await asyncio.sleep(0.1)
    return "Async data from DB"

async def page_component() -> Renderable:
    data = await fetch_data()
    return div[h1["Async Page"], p[data]]

@app.get("/")
async def index():
    return HtpyResponse(await page_component())

# Streaming version
@app.get("/stream")
async def stream():
    async def generate():
        async for chunk in div[h1["Streaming"]].aiter_chunks():
            yield chunk
    return StreamingResponse(generate(), media_type="text/html")
```

```python
# async_context.py — Async + Context
import asyncio
from typing import Literal
from htpy import Context, Node, div, h1, Renderable

Theme = Literal["light", "dark"]
theme_context: Context[Theme] = Context("theme", default="light")

async def fetch_theme() -> Theme:
    await asyncio.sleep(0.05)
    return "dark"

@theme_context.consumer
def themed_header(theme: Theme) -> Renderable:
    return h1(class_=f"theme-{theme}")["Hello!"]

async def my_page() -> Renderable:
    theme = await fetch_theme()
    return theme_context.provider(theme, div[themed_header()])

async def main():
    page = await my_page()
    async for chunk in page.aiter_chunks():
        print(chunk)

asyncio.run(main())
```
