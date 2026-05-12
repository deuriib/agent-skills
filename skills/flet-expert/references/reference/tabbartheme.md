# TabBarTheme
URL: https://flet.dev/docs/types/tabbartheme

ReferenceTypesClassesThemeTabBarTheme
TabBarTheme

Customizes the appearance of TabBar control across the app.

Properties
divider_color - Overrides the default value for TabBar.divider_color.
divider_height - Overrides the default value for TabBar.divider_height.
indicator - Overrides the default value for TabBar.indicator.
indicator_animation - Overrides the default value for TabBar.indicator_animation.
indicator_color - Overrides the default value for TabBar.indicator_color.
indicator_size - Overrides the default value for TabBar.indicator_size.
label_color - Overrides the default value for TabBar.label_color.
label_padding - Overrides the default value for TabBar.label_padding.
label_text_style - Overrides the default value for TabBar.label_text_style.
mouse_cursor - Overrides the default value for TabBar.mouse_cursor.
overlay_color - Overrides the default value for TabBar.overlay_color.
splash_border_radius - Overrides the default value for TabBar.splash_border_radius.
tab_alignment - Overrides the default value for TabBar.tab_alignment.
unselected_label_color - Overrides the default value for TabBar.unselected_label_color.
unselected_label_text_style - Overrides the default value for TabBar.unselected_label_text_style.
Properties​
build
divider_color
class-attribute
instance-attribute
​
Copy
divider_color: ColorValue | None = None

Overrides the default value for TabBar.divider_color.

build
divider_height
class-attribute
instance-attribute
​
Copy
divider_height: Number | None = None

Overrides the default value for TabBar.divider_height.

build
indicator
class-attribute
instance-attribute
​
Copy
indicator: UnderlineTabIndicator | None = None

Overrides the default value for TabBar.indicator.

build
indicator_animation
class-attribute
instance-attribute
​
Copy
indicator_animation: TabIndicatorAnimation | None = None

Overrides the default value for TabBar.indicator_animation.

build
indicator_color
class-attribute
instance-attribute
​
Copy
indicator_color: ColorValue | None = None

Overrides the default value for TabBar.indicator_color.

build
indicator_size
class-attribute
instance-attribute
​
Copy
indicator_size: TabBarIndicatorSize | None = None

Overrides the default value for TabBar.indicator_size.

build
label_color
class-attribute
instance-attribute
​
Copy
label_color: ColorValue | None = None

Overrides the default value for TabBar.label_color.

build
label_padding
class-attribute
instance-attribute
​
Copy
label_padding: PaddingValue | None = None

Overrides the default value for TabBar.label_padding.

build
label_text_style
class-attribute
instance-attribute
​
Copy
label_text_style: TextStyle | None = None

Overrides the default value for TabBar.label_text_style.

build
mouse_cursor
class-attribute
instance-attribute
​
Copy
mouse_cursor: (
    ControlStateValue[MouseCursor | None] | None
) = None

Overrides the default value for TabBar.mouse_cursor.

build
overlay_color
class-attribute
instance-attribute
​
Copy
overlay_color: ControlStateValue[ColorValue] | None = None

Overrides the default value for TabBar.overlay_color.

build
splash_border_radius
class-attribute
instance-attribute
​
Copy
splash_border_radius: BorderRadiusValue | None = None

Overrides the default value for TabBar.splash_border_radius.

build
tab_alignment
class-attribute
instance-attribute
​
Copy
tab_alignment: TabAlignment | None = None

Overrides the default value for TabBar.tab_alignment.

build
unselected_label_color
class-attribute
instance-attribute
​
Copy
unselected_label_color: ColorValue | None = None

Overrides the default value for TabBar.unselected_label_color.

build
unselected_label_text_style
class-attribute
instance-attribute
​
Copy
unselected_label_text_style: TextStyle | None = None

Overrides the default value for TabBar.unselected_label_text_style.

Examples​
Example 1​
page.theme = ft.Theme(

    tabs_theme=ft.TabBarTheme(

        divider_color=ft.Colors.BLUE,

        indicator_color=ft.Colors.RED,

        indicator_tab_size=True,

        label_color=ft.Colors.GREEN,

        unselected_label_color=ft.Colors.AMBER,

        overlay_color={

            ft.MaterialState.FOCUSED: ft.Colors.with_opacity(0.2, ft.Colors.GREEN),

            ft.MaterialState.DEFAULT: ft.Colors.with_opacity(0.2, ft.Colors.PINK),

        },

    )

)

Edit this page