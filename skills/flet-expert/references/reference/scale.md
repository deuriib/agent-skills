# Scale
URL: https://flet.dev/docs/types/scale

ReferenceTypesClassesScale
Scale

Scaling configuration for an object.

Properties
alignment - Gives the origin of scale.
filter_quality - The filter quality with which to apply this transform as a bitmap operation.
origin - The origin of the coordinate system (relative to the upper left corner), in logical pixels.
scale - scale_x and scale_y get the value of scale if scale is provided.
scale_x - The scalar by which to multiply the x-axis.
scale_y - The scalar by which to multiply the y-axis.
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

Gives the origin of scale.

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
scale
class-attribute
instance-attribute
​
Copy
scale: Number | None = None

scale_x and scale_y get the value of scale if scale is provided.

build
scale_x
class-attribute
instance-attribute
​
Copy
scale_x: Number | None = None

The scalar by which to multiply the x-axis.

build
scale_y
class-attribute
instance-attribute
​
Copy
scale_y: Number | None = None

The scalar by which to multiply the y-axis.

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
    scale: Number | None = None,
    scale_x: Number | None = None,
    scale_y: Number | None = None,
    alignment: Alignment | None = None,
    origin: Offset | None = None,
    transform_hit_tests: bool | None = None,
    filter_quality: FilterQuality | None = None,
) -> Scale

Returns a copy of this object with the specified properties overridden.

Edit this page