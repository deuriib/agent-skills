# SliderTheme
URL: https://flet.dev/docs/types/slidertheme

ReferenceTypesClassesThemeSliderTheme
SliderTheme

Customizes the appearance of descendant Slider controls.

Properties
active_tick_mark_color - The color of the track's tick marks that are drawn between the Slider.min position and the current thumb position.
active_track_color - Overrides the default value for Slider.active_color.
disabled_active_tick_mark_color - The color of the track's tick marks that are drawn between the current thumb osition and the Slider.max position when the Slider is disabled.
disabled_active_track_color - The color of the Slider track between the Slider.min position and the current thumb position when the Slider is disabled.
disabled_inactive_tick_mark_color - The color of the track's tick marks that are drawn between the current thumb position and the Slider.max position when the Slider is disabled.
disabled_inactive_track_color - The color of the Slider track between the current thumb position and the Slider.max position when the Slider is disabled.
disabled_secondary_active_track_color - The color of the Slider track between the current thumb position and the Slider.secondary_track_value position when the Slider is disabled.
disabled_thumb_color - The color given to the thumb to draw itself with when the Slider is disabled.
inactive_tick_mark_color - The color of the track's tick marks that are drawn between the current thumb position and the Slider.max position.
inactive_track_color - Overrides the default value for Slider.inactive_color.
interaction - Overrides the default value for Slider.interaction.
min_thumb_separation - Limits the thumb's separation distance.
mouse_cursor - Overrides the default value for Slider.mouse_cursor.
overlapping_shape_stroke_color - The color given to the perimeter of the top range thumbs of a RangeSlider when the thumbs are overlapping and the top range value indicator when the value indicators are overlapping.
overlay_color - Overrides the default value for Slider.overlay_color.
padding - Overrides the default value for Slider.padding.
secondary_active_track_color - Overrides the default value for Slider.secondary_active_color.
thumb_color - Overrides the default value for Slider.thumb_color.
thumb_size - The size of the handle thumb shape thumb.
track_gap - The size of the gap between the active and inactive tracks of the gapped slider track shape.
track_height - The height of the Slider track.
value_indicator_color - The color given to the Slider's value indicator to draw itself with.
value_indicator_stroke_color - The color given to the value indicator shape stroke.
value_indicator_text_style - The TextStyle for the text on the value indicator.
year_2023 - Overrides the default value for Slider.year_2023.
Properties​
build
active_tick_mark_color
class-attribute
instance-attribute
​
Copy
active_tick_mark_color: ColorValue | None = None

The color of the track's tick marks that are drawn between the Slider.min position and the current thumb position.

build
active_track_color
class-attribute
instance-attribute
​
Copy
active_track_color: ColorValue | None = None

Overrides the default value for Slider.active_color.

build
disabled_active_tick_mark_color
class-attribute
instance-attribute
​
Copy
disabled_active_tick_mark_color: ColorValue | None = None

The color of the track's tick marks that are drawn between the current thumb osition and the Slider.max position when the Slider is disabled.

build
disabled_active_track_color
class-attribute
instance-attribute
​
Copy
disabled_active_track_color: ColorValue | None = None

The color of the Slider track between the Slider.min position and the current thumb position when the Slider is disabled.

build
disabled_inactive_tick_mark_color
class-attribute
instance-attribute
​
Copy
disabled_inactive_tick_mark_color: ColorValue | None = None

The color of the track's tick marks that are drawn between the current thumb position and the Slider.max position when the Slider is disabled.

build
disabled_inactive_track_color
class-attribute
instance-attribute
​
Copy
disabled_inactive_track_color: ColorValue | None = None

The color of the Slider track between the current thumb position and the Slider.max position when the Slider is disabled.

build
disabled_secondary_active_track_color
class-attribute
instance-attribute
​
Copy
disabled_secondary_active_track_color: ColorValue | None = (
    None
)

The color of the Slider track between the current thumb position and the Slider.secondary_track_value position when the Slider is disabled.

build
disabled_thumb_color
class-attribute
instance-attribute
​
Copy
disabled_thumb_color: ColorValue | None = None

The color given to the thumb to draw itself with when the Slider is disabled.

build
inactive_tick_mark_color
class-attribute
instance-attribute
​
Copy
inactive_tick_mark_color: ColorValue | None = None

The color of the track's tick marks that are drawn between the current thumb position and the Slider.max position.

build
inactive_track_color
class-attribute
instance-attribute
​
Copy
inactive_track_color: ColorValue | None = None

Overrides the default value for Slider.inactive_color.

build
interaction
class-attribute
instance-attribute
​
Copy
interaction: SliderInteraction | None = None

Overrides the default value for Slider.interaction.

build
min_thumb_separation
class-attribute
instance-attribute
​
Copy
min_thumb_separation: Number | None = None

Limits the thumb's separation distance.

Use this only if you want to control the visual appearance of the thumbs in terms of a logical pixel value. This can be done when you want a specific look for thumbs when they are close together. To limit with the real values, rather than logical pixels, the values can be restricted by the parent.

build
mouse_cursor
class-attribute
instance-attribute
​
Copy
mouse_cursor: ControlStateValue[MouseCursor] | None = None

Overrides the default value for Slider.mouse_cursor.

build
overlapping_shape_stroke_color
class-attribute
instance-attribute
​
Copy
overlapping_shape_stroke_color: ColorValue | None = None

The color given to the perimeter of the top range thumbs of a RangeSlider when the thumbs are overlapping and the top range value indicator when the value indicators are overlapping.

build
overlay_color
class-attribute
instance-attribute
​
Copy
overlay_color: ColorValue | None = None

Overrides the default value for Slider.overlay_color.

build
padding
class-attribute
instance-attribute
​
Copy
padding: PaddingValue | None = None

Overrides the default value for Slider.padding.

build
secondary_active_track_color
class-attribute
instance-attribute
​
Copy
secondary_active_track_color: ColorValue | None = None

Overrides the default value for Slider.secondary_active_color.

build
thumb_color
class-attribute
instance-attribute
​
Copy
thumb_color: ColorValue | None = None

Overrides the default value for Slider.thumb_color.

build
thumb_size
class-attribute
instance-attribute
​
Copy
thumb_size: ControlStateValue[Size] | None = None

The size of the handle thumb shape thumb.

build
track_gap
class-attribute
instance-attribute
​
Copy
track_gap: Number | None = None

The size of the gap between the active and inactive tracks of the gapped slider track shape.

build
track_height
class-attribute
instance-attribute
​
Copy
track_height: Number | None = None

The height of the Slider track.

build
value_indicator_color
class-attribute
instance-attribute
​
Copy
value_indicator_color: ColorValue | None = None

The color given to the Slider's value indicator to draw itself with.

build
value_indicator_stroke_color
class-attribute
instance-attribute
​
Copy
value_indicator_stroke_color: ColorValue | None = None

The color given to the value indicator shape stroke.

build
value_indicator_text_style
class-attribute
instance-attribute
​
Copy
value_indicator_text_style: TextStyle | None = None

The TextStyle for the text on the value indicator.

build
year_2023
class-attribute
instance-attribute
​
Copy
year_2023: bool = False

Overrides the default value for Slider.year_2023.

Edit this page