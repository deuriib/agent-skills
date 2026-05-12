# DragTarget
URL: https://flet.dev/docs/controls/dragtarget

ReferenceControlsDragTarget
DragTarget
Examples​

See these.

A control that completes drag operation when a Draggable control is dropped.

When a Draggable is dragged on top of a DragTarget, the DragTarget is asked whether it will accept the data the Draggable is carrying. The DragTarget will accept incoming drag if it belongs to the same group as Draggable. If the user does drop the Draggable on top of the DragTarget (and the DragTarget has indicated that it will accept the Draggable's data), then the DragTarget is asked to accept the Draggable's data.

Inherits: Control

Properties
content - The content of this control.
group - The group this target belongs to.
Events
on_accept - Called when the user does drop an acceptable (same group) Draggable on this target.
on_leave - Called when a Draggable leaves this target.
on_move - Called when a Draggable moves within this target.
on_will_accept - Called when a Draggable is dragged on this target.
Properties​
build
content
instance-attribute
​
Copy
content: Control

The content of this control.

Raises:

ValueError - If it is not visible.
build
group
class-attribute
instance-attribute
​
Copy
group: str = 'default'

The group this target belongs to.

NOTE

For a DragTarget to accept an incoming drop from a Draggable, they must both be in the same group.

Events​
bolt
on_accept
class-attribute
instance-attribute
​
Copy
on_accept: EventHandler[DragTargetEvent] | None = None

Called when the user does drop an acceptable (same group) Draggable on this target.

bolt
on_leave
class-attribute
instance-attribute
​
Copy
on_leave: EventHandler[DragTargetLeaveEvent] | None = None

Called when a Draggable leaves this target.

bolt
on_move
class-attribute
instance-attribute
​
Copy
on_move: EventHandler[DragTargetEvent] | None = None

Called when a Draggable moves within this target.

bolt
on_will_accept
class-attribute
instance-attribute
​
Copy
on_will_accept: EventHandler[DragWillAcceptEvent] | None = (
    None
)

Called when a Draggable is dragged on this target.

Edit this page