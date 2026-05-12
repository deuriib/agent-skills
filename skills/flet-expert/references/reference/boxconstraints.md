# BoxConstraints
URL: https://flet.dev/docs/types/boxconstraints

ReferenceTypesClassesBoxConstraints
BoxConstraints

Constraints that must be respected by a size of a box.

A Size respects a BoxConstraints if, and only if, all of the following relations hold:

min_width <= Size.width <= max_width min_height <= Size.height <= max_height

Read more about BoxConstraints here.

Properties
max_height - The maximum height that satisfies the constraints, such that min_height <= max_height <= float("inf").
max_width - The maximum width that satisfies the constraints, such that min_width <= max_width <= float("inf").
min_height - The minimum height that satisfies the constraints, such that 0.0 <= min_height <= max_height.
min_width - The minimum width that satisfies the constraints, such that 0.0 <= min_width <= max_width.
Methods
copy - Returns a copy of this object with the specified properties overridden.
Properties​
build
max_height
class-attribute
instance-attribute
​
Copy
max_height: Number = float('inf')

The maximum height that satisfies the constraints, such that min_height <= max_height <= float("inf").

build
max_width
class-attribute
instance-attribute
​
Copy
max_width: Number = float('inf')

The maximum width that satisfies the constraints, such that min_width <= max_width <= float("inf").

build
min_height
class-attribute
instance-attribute
​
Copy
min_height: Number = 0

The minimum height that satisfies the constraints, such that 0.0 <= min_height <= max_height.

build
min_width
class-attribute
instance-attribute
​
Copy
min_width: Number = 0

The minimum width that satisfies the constraints, such that 0.0 <= min_width <= max_width.

Methods​
deployed_code
copy
​
Copy
copy(
    min_width: Number | None = None,
    min_height: Number | None = None,
    max_width: Number | None = None,
    max_height: Number | None = None,
) -> BoxConstraints

Returns a copy of this object with the specified properties overridden.

Edit this page