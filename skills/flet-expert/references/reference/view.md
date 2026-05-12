# View
URL: https://flet.dev/docs/controls/view

ReferenceControlsView
View

View is the top most container for all other controls.

A root view is automatically created when a new user session started. From layout perspective the View represents a Column control, so it has a similar behavior and shares same properties.

Inherits: ScrollableControl, LayoutControl

Properties
appbar - An AppBar control to display at the top of the Page.
bgcolor - Background color of the view.
bottom_appbar - A BottomAppBar control to display at the bottom of the Page.
can_pop - Whether the view can be popped.
controls - A list of controls to display.
decoration - The background decoration.
drawer - A NavigationDrawer control to display as a panel sliding from the start edge of the view.
end_drawer - A NavigationDrawer control to display as a panel sliding from the end edge of the view.
floating_action_button - A FloatingActionButton control to display on top of Page content.
floating_action_button_location - Describes position of floating_action_button
foreground_decoration - The foreground decoration.
fullscreen_dialog - If True, the view is a fullscreen modal dialog.
horizontal_alignment - How the child Controls should be placed horizontally.
navigation_bar - A navigation bar (NavigationBar or CupertinoNavigationBar) control to display at the bottom of the Page.
padding - A space between page contents and its edges.
route - View's route - not currently used by Flet framework, but can be used in a user program to update Page.route when a view popped.
services - A list of Service controls associated with this view.
spacing - The vertical spacing between controls on the Page.
vertical_alignment - Defines how the child controls should be placed vertically.
Events
on_confirm_pop - An event handler that is called when the view is about to be popped.
Methods
close_drawer - Close the drawer.
close_end_drawer - Close the end drawer.
confirm_pop - Resolves a pending pop-confirmation request for this view.
show_drawer - Show the drawer.
show_end_drawer - Show the end drawer.
Properties​
build
appbar
class-attribute
instance-attribute
​
Copy
appbar: AppBar | CupertinoAppBar | None = None

An AppBar control to display at the top of the Page.

build
bgcolor
class-attribute
instance-attribute
​
Copy
bgcolor: ColorValue | None = None

Background color of the view.

build
bottom_appbar
class-attribute
instance-attribute
​
Copy
bottom_appbar: BottomAppBar | None = None

A BottomAppBar control to display at the bottom of the Page.

build
can_pop
class-attribute
instance-attribute
​
Copy
can_pop: bool = True

Whether the view can be popped.

build
controls
class-attribute
instance-attribute
​
Copy
controls: list[BaseControl] = field(default_factory=list)

A list of controls to display.

build
decoration
class-attribute
instance-attribute
​
Copy
decoration: BoxDecoration | None = None

The background decoration.

build
drawer
class-attribute
instance-attribute
​
Copy
drawer: NavigationDrawer | None = None

A NavigationDrawer control to display as a panel sliding from the start edge of the view.

build
end_drawer
class-attribute
instance-attribute
​
Copy
end_drawer: NavigationDrawer | None = None

A NavigationDrawer control to display as a panel sliding from the end edge of the view.

build
floating_action_button
class-attribute
instance-attribute
​
Copy
floating_action_button: FloatingActionButton | None = None

A FloatingActionButton control to display on top of Page content.

build
floating_action_button_location
class-attribute
instance-attribute
​
Copy
floating_action_button_location: (
    FloatingActionButtonLocation | OffsetValue | None
) = None

Describes position of floating_action_button

build
foreground_decoration
class-attribute
instance-attribute
​
Copy
foreground_decoration: BoxDecoration | None = None

The foreground decoration.

build
fullscreen_dialog
class-attribute
instance-attribute
​
Copy
fullscreen_dialog: bool = False

If True, the view is a fullscreen modal dialog.

build
horizontal_alignment
class-attribute
instance-attribute
​
Copy
horizontal_alignment: CrossAxisAlignment = (
    CrossAxisAlignment.START
)

How the child Controls should be placed horizontally.

build
navigation_bar
class-attribute
instance-attribute
​
Copy
navigation_bar: (
    NavigationBar | CupertinoNavigationBar | None
) = None

A navigation bar (NavigationBar or CupertinoNavigationBar) control to display at the bottom of the Page.

build
padding
class-attribute
instance-attribute
​
Copy
padding: PaddingValue | None = field(
    default_factory=lambda: Padding.all(10)
)

A space between page contents and its edges.

build
route
class-attribute
instance-attribute
​
Copy
route: str = field(default_factory=lambda: '/')

View's route - not currently used by Flet framework, but can be used in a user program to update Page.route when a view popped.

build
services
class-attribute
instance-attribute
​
Copy
services: list[Service] = field(
    default_factory=list, metadata={"skip": True}
)

A list of Service controls associated with this view.

build
spacing
class-attribute
instance-attribute
​
Copy
spacing: Number = 10

The vertical spacing between controls on the Page.

NOTE

Has effect only when vertical_alignment is set to MainAxisAlignment.START, MainAxisAlignment.END, or MainAxisAlignment.CENTER.

build
vertical_alignment
class-attribute
instance-attribute
​
Copy
vertical_alignment: MainAxisAlignment = (
    MainAxisAlignment.START
)

Defines how the child controls should be placed vertically.

Events​
bolt
on_confirm_pop
class-attribute
instance-attribute
​
Copy
on_confirm_pop: ControlEventHandler[View] | None = None

An event handler that is called when the view is about to be popped. You can use this event to confirm or cancel the pop action by calling confirm_pop method.

Methods​
deployed_code
close_drawer
async
​
Copy
close_drawer()

Close the drawer.

deployed_code
close_end_drawer
async
​
Copy
close_end_drawer()

Close the end drawer.

deployed_code
confirm_pop
async
​
Copy
confirm_pop(should_pop: bool) -> None

Resolves a pending pop-confirmation request for this view.

Call this from on_confirm_pop to allow or cancel the current back-navigation attempt.

Parameters:

should_pop (bool) - True to proceed with popping this view, False to keep the view on the navigation stack.
NOTES
This method only has effect while a pop confirmation is pending.
If not called, the frontend confirmation wait times out and the pop is canceled.
deployed_code
show_drawer
async
​
Copy
show_drawer()

Show the drawer.

Raises:

ValueError - If no drawer is defined.
deployed_code
show_end_drawer
async
​
Copy
show_end_drawer()

Show the end drawer.

Raises:

ValueError - If no end_drawer is defined.
Edit this page