# PubSubClient
URL: https://flet.dev/docs/types/pubsub/pubsubclient

ReferenceTypesClassesPubSubClient
PubSubClient

Session-scoped facade over PubSubHub.

This client binds all pub/sub operations to one session ID so callers can publish and subscribe without passing their session identity explicitly on each call.

Methods
send_all - Broadcasts a global message to all sessions.
send_all_on_topic - Broadcasts a topic message to all subscribers of topic.
send_others - Broadcasts a global message to all sessions except this client session.
send_others_on_topic - Broadcasts a topic message excluding this client session.
subscribe - Subscribes this session to global messages.
subscribe_topic - Subscribes this session to a topic.
unsubscribe - Removes global subscriptions for this session.
unsubscribe_all - Removes all global and topic subscriptions for this session.
unsubscribe_topic - Removes this session's subscriptions for a specific topic.
Methods​
deployed_code
send_all
​
Copy
send_all(message: Any)

Broadcasts a global message to all sessions.

Parameters:

message (Any) - Payload to publish.
deployed_code
send_all_on_topic
​
Copy
send_all_on_topic(topic: str, message: Any)

Broadcasts a topic message to all subscribers of topic.

Parameters:

topic (str) - Topic name to publish on.
message (Any) - Payload to publish.
deployed_code
send_others
​
Copy
send_others(message: Any)

Broadcasts a global message to all sessions except this client session.

Parameters:

message (Any) - Payload to publish.
deployed_code
send_others_on_topic
​
Copy
send_others_on_topic(topic: str, message: Any)

Broadcasts a topic message excluding this client session.

Parameters:

topic (str) - Topic name to publish on.
message (Any) - Payload to publish.
deployed_code
subscribe
​
Copy
subscribe(handler: Callable)

Subscribes this session to global messages.

The handler is invoked with one positional argument: message.

Parameters:

handler (Callable) - Sync or async callback for global messages.
deployed_code
subscribe_topic
​
Copy
subscribe_topic(topic: str, handler: Callable)

Subscribes this session to a topic.

The handler is invoked with two positional arguments: (topic, message).

Parameters:

topic (str) - Topic name to subscribe to.
handler (Callable) - Sync or async callback for topic messages.
deployed_code
unsubscribe
​
Copy
unsubscribe()

Removes global subscriptions for this session.

deployed_code
unsubscribe_all
​
Copy
unsubscribe_all()

Removes all global and topic subscriptions for this session.

deployed_code
unsubscribe_topic
​
Copy
unsubscribe_topic(topic: str)

Removes this session's subscriptions for a specific topic.

Parameters:

topic (str) - Topic to unsubscribe from.
Edit this page