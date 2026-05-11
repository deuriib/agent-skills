# Colors
URL: https://flet.dev/docs/cookbook/colors

CookbookColors
Working with Colors

Flet supports two primary ways of defining colors:

Hexadecimal values
Named colors
Hexadecimal Values​

Hex color values follow either of these formats:

#aarrggbb or 0xaarrggbb
#rrggbb or 0xrrggbb (opacity defaults to ff if aa is omitted)
>>> ft.Container(bgcolor="#ff0000")


Live example

Named Color​

Flet uses Material Design theme colors and color palettes.

You can define named colors in two ways:

As a string (e.g., "blue", "redAccent100")
Using the Colors or CupertinoColors enums for better type safety and autocompletion
>>> ft.Container(bgcolor="yellow")

>>> ft.Container(bgcolor=ft.Colors.YELLOW)

>>> ft.Container(bgcolor=ft.CupertinoColors.DESTRUCTIVE_RED)

Theme Colors​

Live Example

There are 30 named theme colors in Theme.color_scheme that are generated based on the Theme.color_scheme_seed, which defaults to Colors.BLUE.

>>> page.theme = ft.Theme(color_scheme_seed=ft.Colors.GREEN)


Any of the 30 theme scheme colors can be overridden, in which case they will have an absolute value that will no longer be dependent on the seed color.

page.theme = ft.Theme(

    color_scheme=ft.ColorScheme(

        primary=ft.Colors.GREEN,

        error=ft.Colors.RED,

    ),

)


Theme colors serve as fallback values for most Flet controls.

Color Palettes​

Live example

Originally introduced by Material Design in 2014, color palettes are collections of coordinated colors designed to work together harmoniously.

Each color swatch (palette) includes multiple shades of a specific color, where lower numbers represent lighter shades and higher numbers represent darker ones. Most palettes range from 50 to 900, in increments of 100, while accent swatches (e.g., Colors.RED_ACCENT) have only 100, 200, 400, and 700.

In addition to color swatches, Flet provides named black and white variants with built-in opacities, such as:

Colors.BLACK_54 → black at 54% opacity
Colors.WHITE_70 → white at 70% opacity

These palette colors can be used:

directly as values for control color properties (e.g., bgcolor, color)
as seed colors for generating dynamic theme color schemes using Theme.color_scheme_seed
Color opacity​

Flet provides multiple ways to set opacity:

Using with_opacity​

This method is present in both Colors and CupertinoColors enums. It takes a color and an opacity, and returns a string in the format "color,opacity", understood by Flet.

>>> ft.Colors.with_opacity(0.5, ft.Colors.RED)

"red,0.5"

>>> ft.CupertinoColors.with_opacity(0.8, ft.CupertinoColors.LINK)

"link,0.8"

Embedding Opacity in Hex Code​

For colors in hex format, you can specify the aa channel with values between 00 and ff.

>>> "#7fff6666"


Defining colors for Flet controls​

Most Flet controls have default colors defined by the Theme.color_scheme, and these can be overridden at various levels.

Live example

Control Level​

If a color is provided as value for a control's color-like property, it will be used directly.

>>> ft.Card(bgcolor=ft.Colors.GREEN_200)


Note: Not every Flet control has a color property that can be set on the control level. For example, FilledButton always has a default "primary" color that is defined by the nearest ancestor's theme.

Control Theme Level​

The Theme object has a lot of properties that can be used to override default colors for Flet controls.

For example, the nearest Theme.card_bgcolor will be used for the Card control.

Note: If you need to change theme for particular descendants, you can wrap them in a Container, for example, and customize its theme property, which will be applied to all its descendants.

Ancestor Theme Level​

Flet searches upward in the widget tree to find the nearest ancestor with a defined theme, and will take color from its Theme.color_scheme. In the example below, the nearest ancestor for the FilledButton is Container, and the primary color that is used for the button will be taken from the Container.theme.

import flet as ft



def main(page: ft.Page):

    page.add(

        ft.Container(

            width=200,

            height=200,

            border=ft.Border.all(1, ft.Colors.BLACK),

            content=ft.FilledButton("Primary color"),

            theme=ft.Theme(color_scheme=ft.ColorScheme(primary=ft.Colors.YELLOW))

        )

    )



ft.run(main)


If no theme is defined for a control, its parent, or its parent’s ancestors, the control defaults to using the uppermost ancestor's theme, which is Page.theme (or Page.dark_theme in dark mode).

Edit this page