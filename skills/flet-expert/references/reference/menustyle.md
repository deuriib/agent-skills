# MenuStyle
URL: https://flet.dev/docs/types/menustyle

ReferenceTypesClassesMenuStyle
MenuStyle

Defines the visual style/appearance of a menu.

Properties
alignment - Determines the desired alignment of the submenu when opened relative to the button that opens it.
bgcolor - The menu's background fill color.
elevation - The menu's elevation, i.e.
fixed_size - The menu's size.
max_size - The maximum size of the menu itself.
min_size - The minimum size of the menu itself.
mouse_cursor - The cursor for a mouse pointer when it enters or is hovering over the menu.
padding - The padding between the menu's boundary and its child.
shadow_color - The shadow color of the menu
shape - The menu's shape.
side - The color and weight of the menu's outline.
visual_density - Defines how compact the menu's layout will be.
Properties​
build
alignment
class-attribute
instance-attribute
​
Copy
alignment: Alignment | None = None

Determines the desired alignment of the submenu when opened relative to the button that opens it.

If there isn't sufficient space to open the menu with the given alignment, and there's space on the other side of the button, then the alignment is swapped to it's opposite (1 becomes -1, etc.), and the menu will try to appear on the other side of the button. If there isn't enough space there either, then the menu will be pushed as far over as necessary to display as much of itself as possible, possibly overlapping the parent button.

build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ControlStateValue[ColorValue] | None = None

The menu's background fill color.

build
elevation
class-attribute
instance-attribute
​
Copy
elevation: ControlStateValue[Number | None] | None = None

The menu's elevation, i.e. the size of the shadow below the menu.

build
fixed_size
class-attribute
instance-attribute
​
Copy
fixed_size: ControlStateValue[Size] | None = None

The menu's size.

This size is still constrained by the style's min_size and max_size. Fixed size dimensions whose value is float('inf') are ignored.

To specify menus with a fixed width and the default height use Size.from_width(320). Similarly, to specify a fixed height and the default width use Size.from_height(100).

build
max_size
class-attribute
instance-attribute
​
Copy
max_size: ControlStateValue[Size] | None = None

The maximum size of the menu itself.

A Size.infinite or None value for this property means that the menu's maximum size is not constrained.

This value must be greater than or equal to min_size.

build
min_size
class-attribute
instance-attribute
​
Copy
min_size: ControlStateValue[Size] | None = None

The minimum size of the menu itself.

This value must be less than or equal to max_size.

build
mouse_cursor
class-attribute
instance-attribute
​
Copy
mouse_cursor: ControlStateValue[MouseCursor] | None = None

The cursor for a mouse pointer when it enters or is hovering over the menu.

build
padding
class-attribute
instance-attribute
​
Copy
padding: ControlStateValue[PaddingValue] | None = None

The padding between the menu's boundary and its child.

build
shadow_color
class-attribute
instance-attribute
​
Copy
shadow_color: ControlStateValue[ColorValue] | None = None

The shadow color of the menu

The material's elevation shadow can be difficult to see for dark themes, so by default the menu classes add a semi-transparent overlay to indicate elevation.

build
shape
class-attribute
instance-attribute
​
Copy
shape: ControlStateValue[OutlinedBorder] | None = None

The menu's shape.

This shape is combined with side to create a shape decorated with an outline.

build
side
class-attribute
instance-attribute
​
Copy
side: ControlStateValue[BorderSide] | None = None

The color and weight of the menu's outline.

This value is combined with shape to create a shape decorated with an outline.

build
visual_density
class-attribute
instance-attribute
​
Copy
visual_density: VisualDensity | None = None

Defines how compact the menu's layout will be.

Edit this page