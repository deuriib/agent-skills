# Aliases
URL: https://flet.dev/docs/types/aliases

ReferenceTypesAliases
Aliases
AppCallable​

Type alias for Flet app lifecycle callbacks.

Represents a callable (synchronous or asynchronous) that accepts a single argument of type Page. The return value is ignored.

Used for both main and before_main handlers.

Copy
Callable[[Page], Any | Awaitable[Any]]
AnimationValue​

Type alias for animation configuration values.

Represents animation input as either:

True or False to enable or disable animation,
an int duration in milliseconds,
or an explicit Animation configuration.
Copy
bool | int | Animation
BadgeValue​

Type alias for badge content values.

Represents a badge as either:

a str value, rendered as a text label badge,
or a Badge.
Copy
str | Badge
BlurValue​

Type alias for blur configuration values.

Represents blur as either:

a single sigma value applied to both axes,
a (sigma_x, sigma_y) tuple,
or an explicit Blur object.
Copy
Number | tuple[Number, Number] | Blur
BorderRadiusValue​

Type alias for border radius values.

Represents radius as either:

a single numeric radius applied to all corners,
or an explicit BorderRadius configuration.
Copy
Number | BorderRadius
BorderSideStrokeAlignValue​

Type alias for border stroke alignment values.

Represents stroke alignment as either:

a BorderSideStrokeAlign enum value,
or a numeric alignment value.
Copy
BorderSideStrokeAlign | Number
BoxShadowValue​

Type alias for box shadow values.

Represents shadows as either:

a single BoxShadow object,
or a list of BoxShadow objects.
Copy
BoxShadow | list[BoxShadow]
ColorValue​

Type alias for color values.

Represents a color and can be:

a string (representing a color name or hex value),
a material color from the Colors enum,
or a Cupertino color from the CupertinoColors enum.

More information here.

Copy
str | Colors | CupertinoColors
context​

Global context object for the running Flet app.

Use context to access the current page and control auto-update behavior inside callbacks.

Copy
Context()
ControlEvent​

Type alias for an event emitted by any base control.

Copy
Event[_BaseControlType]
ControlEventHandler​

Type alias for typed control event callback handlers.

Represents a callback that accepts either:

no arguments,
or a typed Event for a specific control type.
Copy
Callable[[], Any] | Callable[[Event[EventControlType]], Any]
ControlStateValue​

Type alias for state-dependent control values.

Represents either:

a single value applied to all (supported) states,
or a mapping from ControlState to per-state values.
Copy
T | dict[ControlState, T]
DateTimeValue​

Type alias for date/time values.

Represents either a datetime or a date.

Copy
datetime | date
DurationValue​

Type alias for duration values.

Represents duration as either:

a Duration object,
or an integer number of milliseconds (or seconds, depending on context).
Copy
Duration | int
EventControlType​

Type variable bound to a control type for typed event payloads.

Copy
TypeVar('EventControlType', bound=_BaseControlType)
EventHandler​

Type alias for generic event callback handlers.

Represents a callback that accepts either:

no arguments,
or an Event-derived payload.
Copy
Callable[[], Any] | Callable[[EventType], Any]
IconData​

Represents an icon used in the UI.

An icon can come from:

the Material icon set via the Icons icon collection,
the Cupertino icon set via the CupertinoIcons icon collection,
or a custom icon set defined by the developer.

Internally, an icon is stored as an integer that encodes icon's index in its originating code set.

Encoding structure:

Lower 16 bits (bits 0-15): the icon's index.
Third byte (bits 16-24): the icon set identifier (set ID), which distinguishes between icon sets like Material, Cupertino, etc.

This encoding scheme allows a single integer to uniquely represent any icon across multiple icon sets.

Inherits: enum.IntEnum

Methods
random - Selects a random icon from the subclass enum, with optional exclusions and weights.
IconDataOrControl​

Type alias for icon-like values.

Represents either:

an IconData value (for example, a member of Icons or CupertinoIcons),
or a custom icon Control.
Copy
IconData | 'Control'
KeyValue​

Type alias for control key values.

Represents keys as either:

a ValueKey or ScrollKey object,
or a primitive str, int, float, or bool value.
Copy
ValueKey | ScrollKey | str | int | float | bool
MarginValue​

Type alias for margin values.

Represents margin as either:

a single numeric value applied to all sides,
or an explicit Margin configuration.
Copy
Number | Margin
Number​

Type alias for numeric values (int or float).

Copy
int | float
OffsetValue​

Type alias for offset values.

Represents offset as either:

an Offset object,
or an (x, y) tuple.
Copy
Offset | tuple[Number, Number]
PaddingValue​

Type alias for padding values.

Represents padding as either:

a single numeric value applied to all sides,
or an explicit Padding configuration.
Copy
Number | Padding
ResponsiveNumber​

Type alias for responsive numeric values.

Represents either:

a single numeric value used for all breakpoints,
or a breakpoint-to-value mapping keyed by string or ResponsiveRowBreakpoint.
Copy
dict[str | ResponsiveRowBreakpoint, Number] | Number
RotateValue​

Type alias for rotation values.

Represents rotation as either:

a numeric angle in radians,
or an explicit Rotate transform.
Copy
Number | Rotate
ScaleValue​

Type alias for scale values.

Represents scale as either:

a numeric uniform scale factor,
or an explicit Scale transform.
Copy
Number | Scale
StrOrControl​

Type alias for string or control values.

Represents a string or a control and can be:

a string, which will be converted internally into a Text control,
or a control.
Copy
str | 'Control'
TooltipValue​

Type alias for tooltip values.

Represents a tooltip as either:

a str message,
or a Tooltip.
Copy
str | Tooltip
Edit this page