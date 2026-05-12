# PubSubHub
URL: https://flet.dev/docs/types/pubsub/pubsubhub

ReferenceTypesClassesPubSubHub
PubSubHub

Thread-safe in-memory pub/sub router scoped to a Flet server process.

Subscribers are grouped by session ID and optionally by topic. Handlers can be synchronous callables or async coroutine functions:

global subscribers receive (message);
topic subscribers receive (topic, message).

This hub is used by session-scoped PubSubClient instances to fan out messages between connected sessions.

Methods
send_all - Sends a message to all global subscribers across all sessions.
send_all_on_topic - Sends a topic message to all subscribers of topic.
send_others - Sends a global message to all sessions except one.
send_others_on_topic - Sends a topic message to all subscribers except one session.
subscribe - Registers a global subscriber for a session.
subscribe_topic - Registers a topic subscriber for a session.
unsubscribe - Removes all global subscribers for a session.
unsubscribe_all - Removes both global and topic subscriptions for a session.
unsubscribe_topic - Removes all handlers for a specific session/topic pair.
Methods​
deployed_code
send_all
​
Copy
send_all(message: Any)

Sends a message to all global subscribers across all sessions.

Parameters:

message (Any) - Payload to deliver.
deployed_code
send_all_on_topic
​
Copy
send_all_on_topic(topic: str, message: Any)

Sends a topic message to all subscribers of topic.

Parameters:

topic (str) - Topic name to broadcast on.
message (Any) - Payload to deliver.
deployed_code
send_others
​
Copy
send_others(except_session_id: str, message: Any)

Sends a global message to all sessions except one.

Parameters:

except_session_id (str) - Session ID to exclude from delivery.
message (Any) - Payload to deliver.
deployed_code
send_others_on_topic
​
Copy
send_others_on_topic(
    except_session_id: str, topic: str, message: Any
)

Sends a topic message to all subscribers except one session.

Parameters:

except_session_id (str) - Session ID to exclude from delivery.
topic (str) - Topic name to publish on.
message (Any) - Payload to deliver.
deployed_code
subscribe
​
Copy
subscribe(session_id: str, handler: Callable)

Registers a global subscriber for a session.

The handler will receive one positional argument: message. Duplicate registrations of the same handler are ignored because handlers are stored in a set.

Parameters:

session_id (str) - Session identifier that owns this subscription.
handler (Callable) - Sync or async callback invoked for global messages.
deployed_code
subscribe_topic
​
Copy
subscribe_topic(
    session_id: str,
    topic: str,
    handler: Callable | Callable[..., Awaitable[Any]],
)

Registers a topic subscriber for a session.

The handler will receive two positional arguments: (topic, message).

Parameters:

session_id (str) - Session identifier that owns this subscription.
topic (str) - Topic name to subscribe to.
handler (Callable | Callable[..., Awaitable[Any]]) - Sync or async callback invoked for topic messages.
deployed_code
unsubscribe
​
Copy
unsubscribe(session_id: str)

Removes all global subscribers for a session.

This does not remove topic subscriptions; use unsubscribe_all to remove both.

Parameters:

session_id (str) - Session identifier to remove.
deployed_code
unsubscribe_all
​
Copy
unsubscribe_all(session_id: str)

Removes both global and topic subscriptions for a session.

Parameters:

session_id (str) - Session identifier to fully unsubscribe.
deployed_code
unsubscribe_topic
​
Copy
unsubscribe_topic(session_id: str, topic: str)

Removes all handlers for a specific session/topic pair.

Parameters:

session_id (str) - Session identifier to remove from the topic.
topic (str) - Topic to unsubscribe from.
Edit this page