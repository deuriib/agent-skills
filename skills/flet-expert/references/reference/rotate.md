# Rotate
URL: https://flet.dev/docs/types/rotate

ReferenceTypesClassesRotate
Rotate

Rotation configuration of an object.

Properties
alignment - The alignment of the rotation.
angle - The rotation in clockwise radians.
filter_quality - The filter quality with which to apply this transform as a bitmap operation.
origin - The origin of the coordinate system (relative to the upper left corner), in logical pixels.
transform_hit_tests - Whether to apply the transformation when performing hit tests.
Methods
copy - Returns a copy of this object with the specified properties overridden.
Properties​
build
alignment
class-attribute
instance-attribute
​
Copy
alignment: Alignment | None = None

The alignment of the rotation.

build
angle
instance-attribute
​
Copy
angle: Number

The rotation in clockwise radians.

build
filter_quality
class-attribute
instance-attribute
​
Copy
filter_quality: FilterQuality | None = None

The filter quality with which to apply this transform as a bitmap operation.

build
origin
class-attribute
instance-attribute
​
Copy
origin: Offset | None = None

The origin of the coordinate system (relative to the upper left corner), in logical pixels.

build
transform_hit_tests
class-attribute
instance-attribute
​
Copy
transform_hit_tests: bool = True

Whether to apply the transformation when performing hit tests.

Methods​
deployed_code
copy
​
Copy
copy(
    angle: Number | None = None,
    alignment: Alignment | None = None,
    origin: Offset | None = None,
    transform_hit_tests: bool | None = None,
    filter_quality: FilterQuality | None = None,
) -> Rotate

Returns a copy of this object with the specified properties overridden.

Edit this page