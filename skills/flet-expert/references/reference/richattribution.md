# RichAttribution
URL: https://flet.dev/docs/controls/map/richattribution

ReferenceControlsMapAttributionsRichAttribution
RichAttribution

An animated and interactive attribution layer that supports both images and text (displayed in a popup controlled by an icon button adjacent to the images).

Inherits: MapLayer

Properties
alignment - The position in which to anchor this attribution control.
attributions - List of attributions to display.
permanent_height - The height of the permanent row in which is found the popup menu toggle button.
popup_bgcolor - The color to use as the popup box's background color.
popup_border_radius - The radius of the edges of the popup box.
popup_initial_display_duration - The popup box will be open by default and be hidden this long after the map is initialised.
show_flutter_map_attribution - Whether to add an additional attribution logo and text for flutter-map, on which 'flet-map' package is based for map-renderings.
Properties​
build
alignment
class-attribute
instance-attribute
​
Copy
alignment: AttributionAlignment | None = None

The position in which to anchor this attribution control.

build
attributions
instance-attribute
​
Copy
attributions: list[SourceAttribution]

List of attributions to display.

TextSourceAttributions are shown in a popup box, unlike ImageSourceAttribution, which are visible permanently.

build
permanent_height
class-attribute
instance-attribute
​
Copy
permanent_height: Number = 24.0

The height of the permanent row in which is found the popup menu toggle button. Also determines spacing between the items within the row.

build
popup_bgcolor
class-attribute
instance-attribute
​
Copy
popup_bgcolor: ColorValue | None = Colors.SURFACE

The color to use as the popup box's background color.

build
popup_border_radius
class-attribute
instance-attribute
​
Copy
popup_border_radius: BorderRadiusValue | None = None

The radius of the edges of the popup box.

build
popup_initial_display_duration
class-attribute
instance-attribute
​
Copy
popup_initial_display_duration: DurationValue = field(
    default_factory=lambda: Duration()
)

The popup box will be open by default and be hidden this long after the map is initialised.

This is useful with certain sources/tile servers that make immediate attribution mandatory and are not attributed with a permanently visible ImageSourceAttribution.

build
show_flutter_map_attribution
class-attribute
instance-attribute
​
Copy
show_flutter_map_attribution: bool = True

Whether to add an additional attribution logo and text for flutter-map, on which 'flet-map' package is based for map-renderings.

Edit this page