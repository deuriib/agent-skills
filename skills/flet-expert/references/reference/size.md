# Size
URL: https://flet.dev/docs/types/size

ReferenceTypesClassesSize
Size

A 2D size with width and height.

Properties
aspect_ratio - Returns the aspect ratio (width / height).
height
width
Methods
copy - Returns a copy of this object with the specified properties overridden.
from_height - Creates a Size with the given height and an infinite width.
from_radius - Creates a square Size whose width and height are twice the given radius.
from_width - Creates a Size with the given width and an infinite height.
infinite - Creates a Size whose width and height are both positive infinity.
is_finite - Checks if both dimensions are finite.
is_infinite - Checks if either dimension is infinite.
square - Creates a square Size where width and height are the same.
zero - Creates a Size whose width and height are both 0.0.
Properties​
build
aspect_ratio
property
​
Copy
aspect_ratio: float

Returns the aspect ratio (width / height).

build
height
instance-attribute
​
Copy
height: Number
build
width
instance-attribute
​
Copy
width: Number
Methods​
deployed_code
copy
​
Copy
copy(
    width: Number | None = None,
    height: Number | None = None,
) -> Size

Returns a copy of this object with the specified properties overridden.

deployed_code
from_height
classmethod
​
Copy
from_height(height: Number) -> Size

Creates a Size with the given height and an infinite width.

deployed_code
from_radius
classmethod
​
Copy
from_radius(radius: Number) -> Size

Creates a square Size whose width and height are twice the given radius.

deployed_code
from_width
classmethod
​
Copy
from_width(width: Number) -> Size

Creates a Size with the given width and an infinite height.

deployed_code
infinite
classmethod
​
Copy
infinite()

Creates a Size whose width and height are both positive infinity.

deployed_code
is_finite
​
Copy
is_finite() -> bool

Checks if both dimensions are finite.

deployed_code
is_infinite
​
Copy
is_infinite() -> bool

Checks if either dimension is infinite.

deployed_code
square
classmethod
​
Copy
square(dimension: Number) -> Size

Creates a square Size where width and height are the same.

deployed_code
zero
classmethod
​
Copy
zero()

Creates a Size whose width and height are both 0.0.

Edit this page