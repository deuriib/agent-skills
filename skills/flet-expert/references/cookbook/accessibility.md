# Accessibility
URL: https://flet.dev/docs/cookbook/accessibility

CookbookAccessibility
Accessibility

Flet is based on Flutter which includes first-class framework support for accessibility in addition to that provided by the underlying operating system.

Screen readers​

For mobile, screen readers (TalkBack, VoiceOver) enable visually impaired users to get spoken feedback about the contents of the screen and interact with the UI via gestures on mobile and keyboard shortcuts on desktop. Turn on VoiceOver or TalkBack on your mobile device and navigate around your app.

For web, the following screen readers are currently supported:

Mobile Browsers:

iOS - VoiceOver
Android - TalkBack

Desktop Browsers:

MacOS - VoiceOver
Windows - JAWs & NVDA

Screen Readers users on web will need to toggle "Enable accessibility" button to build the semantics tree.

Text​

Use Text.semantics_label property to override default Text control semantics.

Buttons​

All buttons with text on them generate proper semantics.

Use tooltip property to add screen reader semantics for IconButton, FloatingActionButton and PopupMenuButton buttons.

TextField and Dropdown​

Use TextField.label and Dropdown.label properties to add screen reader semantics to those controls.

Custom semantics​

For any specific requirements use Semantics control.

Debugging semantics​

Set Page.show_semantics_debugger to True to show an overlay that shows the accessibility information reported by the framework.

You can implement a specific keyboard shortcut to conveniently toggle semantics debugger during app development:

import flet as ft





def main(page: ft.Page):

    page.vertical_alignment = ft.MainAxisAlignment.CENTER

    page.horizontal_alignment = ft.CrossAxisAlignment.CENTER



    def on_keyboard(e: ft.KeyboardEvent):

        if e.shift and e.key == "S":

            page.show_semantics_debugger = not page.show_semantics_debugger

            page.update()



    page.on_keyboard_event = on_keyboard



    def button_click(e: ft.Event[ft.Button]):

        counter.value = str(int(counter.value) + 1)

        page.update()



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    counter := ft.Text("0", size=40),

                    ft.Text("Press Shift+S to toggle semantics debugger"),

                    ft.Button(

                        content="Increment number",

                        icon=ft.Icons.ADD,

                        on_click=button_click,

                    ),

                ]

            )

        )

    )





if __name__ == "__main__":

    ft.run(main)

Edit this page