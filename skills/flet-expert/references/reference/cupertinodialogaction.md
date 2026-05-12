# CupertinoDialogAction
URL: https://flet.dev/docs/controls/cupertinodialogaction

ReferenceControlsCupertinoDialogAction
CupertinoDialogAction
Examples​

See these.

A dialog action button.

Typically used as a child of CupertinoAlertDialog.actions.

Inherits: Control

Properties
content - The content of this action button.
default - Whether this action is a default action.
destructive - If set to True, this button's text color will be red.
text_style - The text style to use for text in this button.
Events
on_click - Called when a user clicks this button.
Properties​
build
content
instance-attribute
​
Copy
content: StrOrControl

The content of this action button.

Raises:

ValueError - If it is neither a string nor a visible Control.
build
default
class-attribute
instance-attribute
​
Copy
default: bool = False

Whether this action is a default action. In this case, the button will have bold text.

INFO

Multiple actions can have this property set to True in a CupertinoAlertDialog.

build
destructive
class-attribute
instance-attribute
​
Copy
destructive: bool = False

If set to True, this button's text color will be red.

Typically used for actions that destroy objects, such as an delete that deletes an email etc.

build
text_style
class-attribute
instance-attribute
​
Copy
text_style: TextStyle | None = None

The text style to use for text in this button.

Can be useful when content is a string.

Events​
bolt
on_click
class-attribute
instance-attribute
​
Copy
on_click: (
    ControlEventHandler[CupertinoDialogAction] | None
) = None

Called when a user clicks this button.

Edit this page