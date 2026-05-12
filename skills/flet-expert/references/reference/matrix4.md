# Matrix4
URL: https://flet.dev/docs/types/matrix4

ReferenceTypesClassesMatrix4
Matrix4

A recorded, replayable Matrix4 transform intent.

This class records constructors and mutating method calls, then Flet replays them in Flutter to build a real Matrix4 for Transform.matrix.

Properties
ctor - Recorded constructor call.
ops - Ordered list of recorded mutating operations.
Methods
diagonal3_values - Creates a matrix initialized with diagonal scale values.
identity - Creates a matrix initialized with identity transform.
multiply - Appends multiplication by another recorded matrix.
rotate_x - Appends x-axis rotation operation in radians.
rotate_y - Appends y-axis rotation operation in radians.
rotate_z - Appends z-axis rotation operation in radians.
rotation_z - Creates a matrix initialized with a z-axis rotation in radians.
scale - Appends scale operation.
set_entry - Appends raw matrix entry mutation.
skew_x - Creates a matrix initialized with x-axis skew in radians.
skew_y - Creates a matrix initialized with y-axis skew in radians.
translate - Appends translation operation.
translation_values - Creates a matrix initialized with translation components.
Properties​
build
ctor
class-attribute
instance-attribute
​
Copy
ctor: _Matrix4Call = field(
    default_factory=lambda: _Matrix4Call(name="identity")
)

Recorded constructor call.

build
ops
class-attribute
instance-attribute
​
Copy
ops: list[_Matrix4Call] = field(default_factory=list)

Ordered list of recorded mutating operations.

Methods​
deployed_code
diagonal3_values
classmethod
​
Copy
diagonal3_values(
    x: Number, y: Number, z: Number
) -> Matrix4

Creates a matrix initialized with diagonal scale values.

deployed_code
identity
classmethod
​
Copy
identity() -> Matrix4

Creates a matrix initialized with identity transform.

deployed_code
multiply
​
Copy
multiply(other: Matrix4) -> Matrix4

Appends multiplication by another recorded matrix.

deployed_code
rotate_x
​
Copy
rotate_x(angle: Number) -> Matrix4

Appends x-axis rotation operation in radians.

deployed_code
rotate_y
​
Copy
rotate_y(angle: Number) -> Matrix4

Appends y-axis rotation operation in radians.

deployed_code
rotate_z
​
Copy
rotate_z(angle: Number) -> Matrix4

Appends z-axis rotation operation in radians.

deployed_code
rotation_z
classmethod
​
Copy
rotation_z(angle: Number) -> Matrix4

Creates a matrix initialized with a z-axis rotation in radians.

deployed_code
scale
​
Copy
scale(
    x: Number,
    y: Number | None = None,
    z: Number | None = None,
) -> Matrix4

Appends scale operation.

If only x is provided then uniform scale is used. If x and y are provided then 2D scale is used. If all three are provided then 3D scale is used.

deployed_code
set_entry
​
Copy
set_entry(row: int, col: int, value: Number) -> Matrix4

Appends raw matrix entry mutation.

deployed_code
skew_x
classmethod
​
Copy
skew_x(angle: Number) -> Matrix4

Creates a matrix initialized with x-axis skew in radians.

deployed_code
skew_y
classmethod
​
Copy
skew_y(angle: Number) -> Matrix4

Creates a matrix initialized with y-axis skew in radians.

deployed_code
translate
​
Copy
translate(
    x: Number, y: Number, z: Number = 0
) -> Matrix4

Appends translation operation.

deployed_code
translation_values
classmethod
​
Copy
translation_values(
    x: Number, y: Number, z: Number
) -> Matrix4

Creates a matrix initialized with translation components.

Edit this page