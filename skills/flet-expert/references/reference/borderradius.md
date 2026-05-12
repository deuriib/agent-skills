# BorderRadius
URL: https://flet.dev/docs/types/borderradius

ReferenceTypesClassesBorderRadius
BorderRadius

Corner radii for a rectangle, defined for all four corners.

Properties
bottom_left - Radius of the bottom left border corner.
bottom_right - Radius of the bottom right border corner.
top_left - Radius of the top left border corner.
top_right - Radius of the top right border corner.
Methods
all - Creates a BorderRadius where all radii are radius.
copy - Returns a copy of this object with the specified properties overridden.
horizontal - Creates a horizontally symmetrical BorderRadius where the left and right sides of the rectangle have the same radii.
only - Creates a border radius with only the given values.
vertical - Creates a vertically symmetric BorderRadius where the top and bottom sides of the rectangle have the same radii.
Properties​
build
bottom_left
instance-attribute
​
Copy
bottom_left: Number

Radius of the bottom left border corner.

build
bottom_right
instance-attribute
​
Copy
bottom_right: Number

Radius of the bottom right border corner.

build
top_left
instance-attribute
​
Copy
top_left: Number

Radius of the top left border corner.

build
top_right
instance-attribute
​
Copy
top_right: Number

Radius of the top right border corner.

Methods​
deployed_code
all
classmethod
​
Copy
all(value: Number) -> BorderRadius

Creates a BorderRadius where all radii are radius.

deployed_code
copy
​
Copy
copy(
    top_left: Number | None = None,
    top_right: Number | None = None,
    bottom_left: Number | None = None,
    bottom_right: Number | None = None,
) -> BorderRadius

Returns a copy of this object with the specified properties overridden.

deployed_code
horizontal
classmethod
​
Copy
horizontal(
    left: Number = 0, right: Number = 0
) -> BorderRadius

Creates a horizontally symmetrical BorderRadius where the left and right sides of the rectangle have the same radii.

deployed_code
only
classmethod
​
Copy
only(
    top_left: Number = 0,
    top_right: Number = 0,
    bottom_left: Number = 0,
    bottom_right: Number = 0,
) -> BorderRadius

Creates a border radius with only the given values. The other corners will be right angles.

deployed_code
vertical
classmethod
​
Copy
vertical(
    top: Number = 0, bottom: Number = 0
) -> BorderRadius

Creates a vertically symmetric BorderRadius where the top and bottom sides of the rectangle have the same radii.

Usage example​
container_1.border_radius= ft.BorderRadius.all(30)

Edit this page