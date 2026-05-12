# ScrollBarTheme
URL: https://flet.dev/docs/types/scrollbartheme

ReferenceTypesClassesThemeScrollBarTheme
ScrollBarTheme

Customizes the colors, thickness, and shape of scrollbars across the app.

Properties
cross_axis_margin - Distance from the scrollbar thumb to the nearest cross axis edge in logical pixels.
interactive - Whether the Scrollbar should be interactive and respond to dragging on the thumb, or tapping in the track area.
main_axis_margin - Distance from the scrollbar thumb's start and end to the edge of the viewport in logical pixels.
min_thumb_length - The preferred smallest size the scrollbar thumb can shrink to when the total scrollable extent is large, the current visible viewport is small, and the viewport is not overscrolled.
radius - The Radius of the scrollbar thumb's rounded rectangle corners.
thickness - The thickness of the scrollbar in the cross axis of the scrollable.
thumb_color - Overrides the default Color of the Scrollbar thumb.
thumb_visibility - Indicates that the scrollbar thumb should be visible, even when a scroll is not underway.
track_border_color - Overrides the default Color of the Scrollbar track border.
track_color - Overrides the default Color of the Scrollbar track.
track_visibility - Indicates that the scrollbar track should be visible.
Properties​
build
cross_axis_margin
class-attribute
instance-attribute
​
Copy
cross_axis_margin: Number | None = None

Distance from the scrollbar thumb to the nearest cross axis edge in logical pixels. The scrollbar track consumes this space. Must not be null and defaults to 0.

build
interactive
class-attribute
instance-attribute
​
Copy
interactive: bool | None = None

Whether the Scrollbar should be interactive and respond to dragging on the thumb, or tapping in the track area. When False, the scrollbar will not respond to gesture or hover events, and will allow to click through it. Defaults to True when None, unless on Android, which will default to False when None.

build
main_axis_margin
class-attribute
instance-attribute
​
Copy
main_axis_margin: Number | None = None

Distance from the scrollbar thumb's start and end to the edge of the viewport in logical pixels. It affects the amount of available paint area. The scrollbar track consumes this space. Mustn't be null and defaults to 0.

build
min_thumb_length
class-attribute
instance-attribute
​
Copy
min_thumb_length: Number | None = None

The preferred smallest size the scrollbar thumb can shrink to when the total scrollable extent is large, the current visible viewport is small, and the viewport is not overscrolled.

build
radius
class-attribute
instance-attribute
​
Copy
radius: Number | None = None

The Radius of the scrollbar thumb's rounded rectangle corners.

build
thickness
class-attribute
instance-attribute
​
Copy
thickness: ControlStateValue[Number | None] | None = None

The thickness of the scrollbar in the cross axis of the scrollable. Property value could be either a single float value or a dictionary with ft.ControlState as keys and float as values.

build
thumb_color
class-attribute
instance-attribute
​
Copy
thumb_color: ControlStateValue[ColorValue] | None = None

Overrides the default Color of the Scrollbar thumb. The value is either a single color string or ft.ControlState dictionary.

build
thumb_visibility
class-attribute
instance-attribute
​
Copy
thumb_visibility: ControlStateValue[bool] | None = None

Indicates that the scrollbar thumb should be visible, even when a scroll is not underway. When False, the scrollbar will be shown during scrolling and will fade out otherwise. When True, the scrollbar will always be visible and never fade out. Property value could be either a single boolean value or a dictionary with ft.ControlState as keys and boolean as values.

build
track_border_color
class-attribute
instance-attribute
​
Copy
track_border_color: ControlStateValue[ColorValue] | None = (
    None
)

Overrides the default Color of the Scrollbar track border. The value is either a single color string or ft.ControlState dictionary.

build
track_color
class-attribute
instance-attribute
​
Copy
track_color: ControlStateValue[ColorValue] | None = None

Overrides the default Color of the Scrollbar track. The value is either a single color string or ft.ControlState dictionary.

build
track_visibility
class-attribute
instance-attribute
​
Copy
track_visibility: ControlStateValue[bool] | None = None

Indicates that the scrollbar track should be visible. When True, the scrollbar track will always be visible so long as the thumb is visible. If the scrollbar thumb is not visible, the track will not be visible either. Defaults to False when None. If this property is None, then ScrollbarTheme.track_visibility of Theme.scrollbar_theme is used. If that is also None, the default value is False. Property value could be either a single boolean value or a dictionary with ft.ControlState as keys and boolean as values.

Edit this page