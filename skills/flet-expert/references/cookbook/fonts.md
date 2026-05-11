# Fonts
URL: https://flet.dev/docs/cookbook/fonts

CookbookFonts
Fonts
System fonts​

You can use the (system) fonts installed on your computer, e.g. "Consolas", "Arial", "Verdana", "Tahoma", etc.

LIMITATION

System fonts cannot be used in Flet web apps rendered with canvas kit web renderer.

Usage Example​

The following example demonstrates how to use the "Consolas" font in a Flet application.

import flet as ft



def main(page: ft.Page):

    page.add(

        ft.Text(

            value="This text is rendered with Consolas font",

            font_family="Consolas"

        )

    )



ft.run(main)

Importing Fonts​

Font can be imported from external resource by providing an absolute URL or from application assets directory (see Assets Guide).

This is done by setting the page's fonts property.

To apply one of the imported fonts, you can:

Use Theme.font_family to set a default/fallback app-wide font family.
Specify a font for individual controls. For example, Text.font_family.
Usage Example​

The example below loads the "Kanit" font from GitHub and "Open Sans" from local assets. "Kanit" is set as the default app font, while "Open Sans" is applied to a specific Text control.

import flet as ft



def main(page: ft.Page):

    page.fonts = {

        "Kanit": "https://raw.githubusercontent.com/google/fonts/master/ofl/kanit/Kanit-Bold.ttf",

        "Open Sans": "/fonts/OpenSans-Regular.ttf"

    }



    page.theme = Theme(font_family="Kanit")  # Default app font



    page.add(

        ft.Text("This text uses the Kanit font"),

        ft.Text("This text uses the Open Sans font", font_family="Open Sans")

    )



ft.run(main, assets_dir="assets")

Static and Variable Fonts​

Currently, only static fonts are supported. These fonts have a specific width, weight, or style combination (e.g., "Open Sans Regular").

Support for variable fonts is in progress.

However, to use variable fonts, you can create static instances at specific weights using fonttools, e.g.:

fonttools varLib.mutator ./YourVariableFont-VF.ttf wght=140 wdth=85


To explore available font features (e.g. possible options for wght) use Wakamai Fondue online tool.

Edit this page