# RadioGroup
URL: https://flet.dev/docs/controls/radiogroup

ReferenceControlsRadioGroup
RadioGroup
Examples​

See these.

Radio buttons let people select a single option from two or more choices.

Inherits: Control

Properties
content - The content of the RadioGroup.
value - Current value of the RadioGroup.
Events
on_change - Called when the state of the RadioGroup is changed.
Properties​
build
content
instance-attribute
​
Copy
content: Control

The content of the RadioGroup.

Typically a list of Radio controls nested in a container control, e.g. Column, Row.

Raises:

ValueError - If content is not visible.
build
value
class-attribute
instance-attribute
​
Copy
value: str | None = None

Current value of the RadioGroup.

Events​
bolt
on_change
class-attribute
instance-attribute
​
Copy
on_change: ControlEventHandler[RadioGroup] | None = None

Called when the state of the RadioGroup is changed.

Edit this page