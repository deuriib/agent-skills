# ExpansionPanel
URL: https://flet.dev/docs/controls/expansionpanel

ReferenceControlsExpansionPanel
ExpansionPanel

A material expansion panel. It can either be expanded or collapsed. Its body is only visible when it is expanded.

Example:

ft.ExpansionPanelList(

    width=400,

    controls=[

        ft.ExpansionPanel(

            header=ft.Text("Shipping address"),

            content=ft.Text("123 Market Street, Springfield"),

            expanded=True,

        ),

        ft.ExpansionPanel(

            header=ft.Text("Billing address"),

            content=ft.Text("Same as shipping"),

        ),

    ],

)

Basic ExpansionPanel

Inherits: LayoutControl, AdaptiveControl

Properties
bgcolor - The background color of this panel.
can_tap_header - Whether tapping on this panel's header will expand or collapse it.
content - The control to be found in the body of this panel.
expanded - Whether this panel is in expanded (True) or collapsed (False) state.
header - The control to be found in the header of this panel.
highlight_color - Defines the highlight color of this panel if can_tap_header is True, or the highlight color of the expand/collapse IconButton if can_tap_header is False.
splash_color - Defines the splash color of this panel if can_tap_header is True, or the splash color of the expand/collapse IconButton if can_tap_header is False.
Properties​
build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

The background color of this panel.

build
can_tap_header
class-attribute
instance-attribute
​
Copy
can_tap_header: bool = False

Whether tapping on this panel's header will expand or collapse it.

build
content
class-attribute
instance-attribute
​
Copy
content: Control | None = None

The control to be found in the body of this panel.

It is displayed below the header when this panel is expanded.

If this property is None, this panel will have a placeholder Text as content.

build
expanded
class-attribute
instance-attribute
​
Copy
expanded: bool = False

Whether this panel is in expanded (True) or collapsed (False) state.

build
header
class-attribute
instance-attribute
​
Copy
header: Control | None = None

The control to be found in the header of this panel.

It is always visible, regardless of whether this panel is expanded or collapsed. If can_tap_header is True, tapping on this header will expand or collapse this panel.

If this property is None, this panel will have a placeholder Text as header.

build
highlight_color
class-attribute
instance-attribute
​
Copy
highlight_color: ColorValue | None = None

Defines the highlight color of this panel if can_tap_header is True, or the highlight color of the expand/collapse IconButton if can_tap_header is False.

If this is None, then the icon button will use its default highlight color Theme.highlight_color, and this panel will use its default highlight color Theme.highlight_color (if can_tap_header is True).

build
splash_color
class-attribute
instance-attribute
​
Copy
splash_color: ColorValue | None = None

Defines the splash color of this panel if can_tap_header is True, or the splash color of the expand/collapse IconButton if can_tap_header is False.

If can_tap_header is False, and Theme.use_material3 is True, this field will be ignored, as IconButton.splash_color will be ignored, and you should use highlight_color instead.

If this is None, then the icon button will use its default splash color Theme.splash_color, and this panel will use its default splash color Theme.splash_color (if can_tap_header is True).

Edit this page