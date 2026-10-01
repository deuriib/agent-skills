# Condition-Based Waiting

Flaky repros and async failures tempt `sleep 5` and hope. Hope is not
a synchronization primitive. Poll for the condition you actually need,
with a deadline after which you fail loudly.

## Pattern

```text
REPEAT until <condition> or <deadline>:
  check condition (file exists, port open, queue empty, text appears)
  if met → proceed, log elapsed time
  else wait <short interval>, try again
ON deadline → fail with: condition checked, deadline, last observed state
```

Concrete shapes (adapt to the repo's language):

```bash
# wait for a server, max 30s
for i in $(seq 1 30); do
  curl -sf http://localhost:3000/health && break
  sleep 1
done
```

```python
deadline = time.time() + 30
while time.time() < deadline:
    if queue.empty():
        break
    time.sleep(0.5)
else:
    raise TimeoutError("queue did not drain in 30s; depth=%d" % queue.qsize())
```

## Rules

- **Name the condition explicitly.** "Wait until the health endpoint returns 200", not "wait a bit for startup".
- **Always set a bounded deadline.** No unbounded loops. On expiry, report the condition, the deadline, and the last observed state.
- **Log the outcome.** Elapsed time on success; last-state snapshot on timeout. Timeouts without state are undebuggable.
- **Keep intervals short** (0.2–1s). Long sleeps make repros slow; tight loops without sleep burn CPU and skew timing bugs.

## When it applies

- Reproducing race conditions, startup ordering, eventual consistency.
- CI-only flakes where the machine is slower than yours.
- Anywhere you catch yourself writing `sleep N` with N chosen by feel.
