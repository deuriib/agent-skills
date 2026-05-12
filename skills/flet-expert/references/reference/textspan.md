# TextSpan
URL: https://flet.dev/docs/types/textspan

ReferenceTypesClassesTextSpan
TextSpan

A text span.

Usage Example: As a child of Text.spans.

For the object to be useful, at least one of text or spans should be set.

Inherits: Control

Properties
semantics_label - An alternative semantics label for this text.
spans - Additional spans to include as children.
spell_out - Whether the assistive technologies should spell out this text character by character.
style - Defines the style of this text span.
text - The text contained in this span.
url - The URL to open when this button is clicked.
Events
on_click - Called when this span is clicked.
on_enter - Called when a mouse pointer has entered this span.
on_exit - Called when a mouse pointer has exited this span.
Properties​
build
semantics_label
class-attribute
instance-attribute
​
Copy
semantics_label: str | None = None

An alternative semantics label for this text.

If present, the semantics of this control will contain this value instead of the actual text.

Raises:

ValueError - If it is set when text is None.
build
spans
class-attribute
instance-attribute
​
Copy
spans: list[TextSpan] | None = None

Additional spans to include as children.

NOTE

If both spans and text are defined, the text takes precedence.

build
spell_out
class-attribute
instance-attribute
​
Copy
spell_out: bool | None = None

Whether the assistive technologies should spell out this text character by character.

If the text is 'hello world', setting this to true causes the assistive technologies, such as VoiceOver or TalkBack, to pronounce 'h-e-l-l-o-space-w-o-r-l-d' instead of complete words. This is useful for texts, such as passwords or verification codes.

If this span contains other text span children, they also inherit the property from this span unless explicitly set.

If the property is not set, this text span inherits the spell out setting from its parent. If this text span does not have a parent or the parent does not have a spell out setting, this text span does not spell out the text by default.

build
style
class-attribute
instance-attribute
​
Copy
style: TextStyle | None = None

Defines the style of this text span.

build
text
class-attribute
instance-attribute
​
Copy
text: str | None = None

The text contained in this span.

NOTE

If both text and spans are defined, the text takes precedence.

build
url
class-attribute
instance-attribute
​
Copy
url: str | Url | None = None

The URL to open when this button is clicked.

Additionally, if on_click event callback is provided, it is fired after that.

Events​
bolt
on_click
class-attribute
instance-attribute
​
Copy
on_click: ControlEventHandler[TextSpan] | None = None

Called when this span is clicked.

bolt
on_enter
class-attribute
instance-attribute
​
Copy
on_enter: ControlEventHandler[TextSpan] | None = None

Called when a mouse pointer has entered this span.

bolt
on_exit
class-attribute
instance-attribute
​
Copy
on_exit: ControlEventHandler[TextSpan] | None = None

Called when a mouse pointer has exited this span.

Edit this page