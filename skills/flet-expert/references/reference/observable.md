# Observable
URL: https://flet.dev/docs/types/observable

ReferenceTypesClassesObservable
Observable

Mixin: notifies when fields change; auto-wraps lists/dicts to be observable.

EXAMPLE
import flet as ft

from dataclasses import dataclass





@ft.observable

@dataclass

class MyDataClass:

    x: int

    y: int





obj = MyDataClass(1, 2)





def listener(sender, field):

    print(f"Changed: {field} in {sender}")





obj.subscribe(listener)

obj.x = 3

obj.y = 4

Methods
notify - Manually notify listeners that something changed.
subscribe - Register a change listener.
Methods​
deployed_code
notify
​
Copy
notify()

Manually notify listeners that something changed.

deployed_code
subscribe
​
Copy
subscribe(fn: Listener) -> Callable[[], None]

Register a change listener.

Parameters:

fn (Listener) - Listener callback receiving (sender, field).

Returns:

Callable[[], None] - A disposer function that unsubscribes the listener.
Edit this page