# ColorScheme
URL: https://flet.dev/docs/types/colorscheme

ReferenceTypesClassesThemeColorScheme
ColorScheme

A set of more than 40 colors based on the Material spec that can be used to configure the color properties of most components. Read more about color schemes in here.

Properties
error - The color to use for input validation errors, e.g.
error_container - A color used for error elements needing less emphasis than error.
inverse_primary - An accent color used for displaying a highlight color on inverse_surface backgrounds, like button text in a SnackBar.
inverse_surface - A surface color used for displaying the reverse of what’s seen in the surrounding UI, for example in a SnackBar to bring attention to an alert.
outline - A utility color that creates boundaries and emphasis to improve usability.
outline_variant - A utility color that creates boundaries for decorative elements when a 3:1 contrast isn’t required, such as for dividers or decorative elements.
primary - The color displayed most frequently across your app's screens and components.
primary_container - A color used for elements needing less emphasis than primary.
primary_fixed - A substitute for primary_container that's the same color for the dark and light themes.
primary_fixed_dim - A color used for elements needing more emphasis than primary_fixed.
scrim - A color use to paint the scrim around of modal components.
secondary - An accent color used for less prominent components in the UI, such as filter Chips, while expanding the opportunity for color expression.
secondary_container - A color used for elements needing less emphasis than secondary.
secondary_fixed - A substitute for secondary_container that's the same color for the dark and light themes.
secondary_fixed_dim - A color used for elements needing more emphasis than secondary_fixed.
shadow - A color use to paint the drop shadows of elevated components.
surface - The background color for widgets like Card.
surface_bright - A color that's always the lightest in the dark or light theme.
surface_container - A recommended color role for a distinct area within the surface.
surface_container_high - A surface container color with a darker tone.
surface_container_highest - A surface container color with the darkest tone.
surface_container_low - A surface container color with a lighter tone that creates less emphasis than surface_container but more emphasis than surface_container_lowest.
surface_container_lowest - A surface container color with the lightest tone and the least emphasis relative to the surface.
surface_dim - A color that's always darkest in the dark or light theme.
surface_tint - A color used as an overlay on a surface color to indicate a component's elevation.
tertiary - A color used as a contrasting accent that can balance primary and secondary colors or bring heightened attention to an element, such as an input field.
tertiary_container - A color used for elements needing less emphasis than tertiary.
tertiary_fixed - A substitute for tertiary_container that's the same color for dark and light themes.
tertiary_fixed_dim - A color used for elements needing more emphasis than tertiary_fixed.
Events
on_error - A color that's clearly legible when drawn on error.
on_error_container - A color that's clearly legible when drawn on error_container.
on_inverse_surface - A color that's clearly legible when drawn on inverse_surface.
on_primary - A color that's clearly legible when drawn on primary.
on_primary_container - A color that's clearly legible when drawn on primary_container.
on_primary_fixed - A color that is used for text and icons that exist on top of elements having primary_fixed color.
on_primary_fixed_variant - A color that provides a lower-emphasis option for text and icons than on_primary_fixed.
on_secondary - A color that's clearly legible when drawn on secondary.
on_secondary_container - A color that's clearly legible when drawn on secondary_container.
on_secondary_fixed - A color that is used for text and icons that exist on top of elements having secondary_fixed color.
on_secondary_fixed_variant - A color that provides a lower-emphasis option for text and icons than on_secondary_fixed.
on_surface - A color that's clearly legible when drawn on surface.
on_surface_variant - A color that's clearly legible when drawn on surface_container_highest.
on_tertiary - A color that's clearly legible when drawn on tertiary.
on_tertiary_container - A color that's clearly legible when drawn on tertiary_container.
on_tertiary_fixed - A color that is used for text and icons that exist on top of elements having tertiary_fixed color.
on_tertiary_fixed_variant - A color that provides a lower-emphasis option for text and icons than on_tertiary_fixed.
Properties​
build
error
class-attribute
instance-attribute
​
Copy
error: ColorValue | None = None

The color to use for input validation errors, e.g. for FormFieldControl.error.

build
error_container
class-attribute
instance-attribute
​
Copy
error_container: ColorValue | None = None

A color used for error elements needing less emphasis than error.

build
inverse_primary
class-attribute
instance-attribute
​
Copy
inverse_primary: ColorValue | None = None

An accent color used for displaying a highlight color on inverse_surface backgrounds, like button text in a SnackBar.

build
inverse_surface
class-attribute
instance-attribute
​
Copy
inverse_surface: ColorValue | None = None

A surface color used for displaying the reverse of what’s seen in the surrounding UI, for example in a SnackBar to bring attention to an alert.

build
outline
class-attribute
instance-attribute
​
Copy
outline: ColorValue | None = None

A utility color that creates boundaries and emphasis to improve usability.

build
outline_variant
class-attribute
instance-attribute
​
Copy
outline_variant: ColorValue | None = None

A utility color that creates boundaries for decorative elements when a 3:1 contrast isn’t required, such as for dividers or decorative elements.

build
primary
class-attribute
instance-attribute
​
Copy
primary: ColorValue | None = None

The color displayed most frequently across your app's screens and components.

build
primary_container
class-attribute
instance-attribute
​
Copy
primary_container: ColorValue | None = None

A color used for elements needing less emphasis than primary.

build
primary_fixed
class-attribute
instance-attribute
​
Copy
primary_fixed: ColorValue | None = None

A substitute for primary_container that's the same color for the dark and light themes.

build
primary_fixed_dim
class-attribute
instance-attribute
​
Copy
primary_fixed_dim: ColorValue | None = None

A color used for elements needing more emphasis than primary_fixed.

build
scrim
class-attribute
instance-attribute
​
Copy
scrim: ColorValue | None = None

A color use to paint the scrim around of modal components.

build
secondary
class-attribute
instance-attribute
​
Copy
secondary: ColorValue | None = None

An accent color used for less prominent components in the UI, such as filter Chips, while expanding the opportunity for color expression.

build
secondary_container
class-attribute
instance-attribute
​
Copy
secondary_container: ColorValue | None = None

A color used for elements needing less emphasis than secondary.

build
secondary_fixed
class-attribute
instance-attribute
​
Copy
secondary_fixed: ColorValue | None = None

A substitute for secondary_container that's the same color for the dark and light themes.

build
secondary_fixed_dim
class-attribute
instance-attribute
​
Copy
secondary_fixed_dim: ColorValue | None = None

A color used for elements needing more emphasis than secondary_fixed.

build
shadow
class-attribute
instance-attribute
​
Copy
shadow: ColorValue | None = None

A color use to paint the drop shadows of elevated components.

build
surface
class-attribute
instance-attribute
​
Copy
surface: ColorValue | None = None

The background color for widgets like Card.

build
surface_bright
class-attribute
instance-attribute
​
Copy
surface_bright: ColorValue | None = None

A color that's always the lightest in the dark or light theme.

build
surface_container
class-attribute
instance-attribute
​
Copy
surface_container: ColorValue | None = None

A recommended color role for a distinct area within the surface.

build
surface_container_high
class-attribute
instance-attribute
​
Copy
surface_container_high: ColorValue | None = None

A surface container color with a darker tone.

build
surface_container_highest
class-attribute
instance-attribute
​
Copy
surface_container_highest: ColorValue | None = None

A surface container color with the darkest tone. It is used to create the most emphasis against the surface.

build
surface_container_low
class-attribute
instance-attribute
​
Copy
surface_container_low: ColorValue | None = None

A surface container color with a lighter tone that creates less emphasis than surface_container but more emphasis than surface_container_lowest.

build
surface_container_lowest
class-attribute
instance-attribute
​
Copy
surface_container_lowest: ColorValue | None = None

A surface container color with the lightest tone and the least emphasis relative to the surface.

build
surface_dim
class-attribute
instance-attribute
​
Copy
surface_dim: ColorValue | None = None

A color that's always darkest in the dark or light theme.

build
surface_tint
class-attribute
instance-attribute
​
Copy
surface_tint: ColorValue | None = None

A color used as an overlay on a surface color to indicate a component's elevation.

build
tertiary
class-attribute
instance-attribute
​
Copy
tertiary: ColorValue | None = None

A color used as a contrasting accent that can balance primary and secondary colors or bring heightened attention to an element, such as an input field.

build
tertiary_container
class-attribute
instance-attribute
​
Copy
tertiary_container: ColorValue | None = None

A color used for elements needing less emphasis than tertiary.

build
tertiary_fixed
class-attribute
instance-attribute
​
Copy
tertiary_fixed: ColorValue | None = None

A substitute for tertiary_container that's the same color for dark and light themes.

build
tertiary_fixed_dim
class-attribute
instance-attribute
​
Copy
tertiary_fixed_dim: ColorValue | None = None

A color used for elements needing more emphasis than tertiary_fixed.

Events​
bolt
on_error
class-attribute
instance-attribute
​
Copy
on_error: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that's clearly legible when drawn on error.

bolt
on_error_container
class-attribute
instance-attribute
​
Copy
on_error_container: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that's clearly legible when drawn on error_container.

bolt
on_inverse_surface
class-attribute
instance-attribute
​
Copy
on_inverse_surface: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that's clearly legible when drawn on inverse_surface.

bolt
on_primary
class-attribute
instance-attribute
​
Copy
on_primary: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that's clearly legible when drawn on primary.

bolt
on_primary_container
class-attribute
instance-attribute
​
Copy
on_primary_container: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that's clearly legible when drawn on primary_container.

bolt
on_primary_fixed
class-attribute
instance-attribute
​
Copy
on_primary_fixed: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that is used for text and icons that exist on top of elements having primary_fixed color.

bolt
on_primary_fixed_variant
class-attribute
instance-attribute
​
Copy
on_primary_fixed_variant: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that provides a lower-emphasis option for text and icons than on_primary_fixed.

bolt
on_secondary
class-attribute
instance-attribute
​
Copy
on_secondary: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that's clearly legible when drawn on secondary.

bolt
on_secondary_container
class-attribute
instance-attribute
​
Copy
on_secondary_container: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that's clearly legible when drawn on secondary_container.

bolt
on_secondary_fixed
class-attribute
instance-attribute
​
Copy
on_secondary_fixed: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that is used for text and icons that exist on top of elements having secondary_fixed color.

bolt
on_secondary_fixed_variant
class-attribute
instance-attribute
​
Copy
on_secondary_fixed_variant: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that provides a lower-emphasis option for text and icons than on_secondary_fixed.

bolt
on_surface
class-attribute
instance-attribute
​
Copy
on_surface: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that's clearly legible when drawn on surface.

bolt
on_surface_variant
class-attribute
instance-attribute
​
Copy
on_surface_variant: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that's clearly legible when drawn on surface_container_highest.

bolt
on_tertiary
class-attribute
instance-attribute
​
Copy
on_tertiary: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that's clearly legible when drawn on tertiary.

bolt
on_tertiary_container
class-attribute
instance-attribute
​
Copy
on_tertiary_container: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that's clearly legible when drawn on tertiary_container.

bolt
on_tertiary_fixed
class-attribute
instance-attribute
​
Copy
on_tertiary_fixed: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that is used for text and icons that exist on top of elements having tertiary_fixed color.

bolt
on_tertiary_fixed_variant
class-attribute
instance-attribute
​
Copy
on_tertiary_fixed_variant: ColorValue | None = field(
    default=None, metadata={"event": False}
)

A color that provides a lower-emphasis option for text and icons than on_tertiary_fixed.

Edit this page