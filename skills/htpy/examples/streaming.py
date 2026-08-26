# Streaming Example

```python
# django_stream.py — Django StreamingHttpResponse
from django.http import StreamingHttpResponse
from htpy import ul, li, h1, div
from myapp.models import Article

def article_list(request):
    return StreamingHttpResponse(div[
        h1["Articles"],
        ul[
            (li[article.title] for article in Article.objects.all())
        ],
    ])
```

```python
# callable_stream.py — Lazy evaluation with callables
import time
from htpy import div, h1

def calculate_magic_number() -> str:
    time.sleep(1)  # Simulate expensive computation
    return "42"

element = div[
    h1["Welcome to my page"],
    "The magic number is ",
    calculate_magic_number,
]

# First render: h1 appears immediately, "42" after 1 second
for chunk in element.iter_chunks():
    print(chunk)
```

```python
# lambda_stream.py — Lambda for lazy expressions
from htpy import div, h1

def fib(n: int) -> int:
    if n == 0: return 0
    if n == 1: return 1
    return fib(n - 1) + fib(n - 2)

print(div[
    h1["Fibonacci!"],
    "fib(20)=",
    lambda: str(fib(20)),
])
# <div><h1>Fibonacci!</h1>fib(20)=6765</div>
```

```python
# iter_chunks_example.py — Direct chunk streaming
from htpy import ul, li, fragment

# With parent element
for chunk in ul[li["a"], li["b"]].iter_chunks():
    print(f"chunk: {chunk!r}")

# Without parent (use fragment)
for chunk in fragment[li["x"], li["y"]].iter_chunks():
    print(f"chunk: {chunk!r}")
```
