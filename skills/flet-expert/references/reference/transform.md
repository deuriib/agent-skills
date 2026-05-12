# Transform
URL: https://flet.dev/docs/types/transform

ReferenceTypesClassesTransform
Transform

Configuration for LayoutControl.transform.

Applies a generic matrix transform backed by recorded Matrix4.

Properties
alignment - The alignment of the origin, relative to the size of the box.
filter_quality - The filter quality with which to apply this transform as a bitmap operation.
matrix - Matrix transform intent recorded in Python and replayed in Flutter.
origin - The origin of the coordinate system (relative to the upper left corner).
transform_hit_tests - Whether to apply the transformation when performing hit tests.
Properties​
build
alignment
class-attribute
instance-attribute
​
Copy
alignment: Alignment | None = None

The alignment of the origin, relative to the size of the box.

build
filter_quality
class-attribute
instance-attribute
​
Copy
filter_quality: FilterQuality | None = None

The filter quality with which to apply this transform as a bitmap operation.

build
matrix
instance-attribute
​
Copy
matrix: Matrix4

Matrix transform intent recorded in Python and replayed in Flutter.

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