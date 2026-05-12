# Offset
URL: https://flet.dev/docs/types/offset

ReferenceTypesClassesOffset
Offset

A 2D floating-point offset.

Properties
distance - The magnitude of the offset.
filter_quality - The filter quality with which to apply this transform as a bitmap operation.
transform_hit_tests - Whether to apply the transformation when performing hit tests.
x - The horizontal offset.
y - The vertical offset.
Methods
copy - Returns a copy of this object with the specified properties overridden.
Properties​
build
distance
property
​
Copy
distance: float

The magnitude of the offset.

build
filter_quality
class-attribute
instance-attribute
​
Copy
filter_quality: FilterQuality | None = None

The filter quality with which to apply this transform as a bitmap operation.

build
transform_hit_tests
class-attribute
instance-attribute
​
Copy
transform_hit_tests: bool = True

Whether to apply the transformation when performing hit tests.

build
x
class-attribute
instance-attribute
​
Copy
x: Number = 0

The horizontal offset.

build
y
class-attribute
instance-attribute
​
Copy
y: Number = 0

The vertical offset.

Methods​
deployed_code
copy
​
Copy
copy(
    x: Number | None = None,
    y: Number | None = None,
    transform_hit_tests: bool | None = None,
    filter_quality: FilterQuality | None = None,
) -> Offset

Returns a copy of this object with the specified properties overridden.

Edit this page