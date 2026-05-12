# Flip
URL: https://flet.dev/docs/types/flip

ReferenceTypesClassesFlip
Flip

Configuration for LayoutControl.flip.

Mirrors a control across its x and/or y axis.

Properties
filter_quality - The filter quality with which to apply this transform as a bitmap operation.
flip_x - Whether to flip the x axis.
flip_y - Whether to flip the y axis.
origin - The origin of the coordinate system (relative to the upper left corner).
transform_hit_tests - Whether to apply the transformation when performing hit tests.
Properties​
build
filter_quality
class-attribute
instance-attribute
​
Copy
filter_quality: FilterQuality | None = None

The filter quality with which to apply this transform as a bitmap operation.

build
flip_x
class-attribute
instance-attribute
​
Copy
flip_x: bool = False

Whether to flip the x axis.

build
flip_y
class-attribute
instance-attribute
​
Copy
flip_y: bool = False

Whether to flip the y axis.

build
origin
class-attribute
instance-attribute
​
Copy
origin: Offset | None = None

The origin of the coordinate system (relative to the upper left corner).

build
transform_hit_tests
class-attribute
instance-attribute
​
Copy
transform_hit_tests: bool = True

Whether to apply the transformation when performing hit tests.

Edit this page