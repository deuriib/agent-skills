---
name: flet-expert
description: "Trigger: Flet, building Python web/desktop/mobile apps, ft.Page, Flet controls. Expert guidance for building applications with the Flet framework."
license: Apache-2.0
metadata:
  author: deuriib
  version: "1.1"
---

# Skill: flet-expert

## Activation Contract
Use this skill when:
- The user or agent needs to build, debug, or architect applications using the Flet framework (Python).
- Questions arise about Flet controls, layout (Row/Column), navigation, or state management.
- Implementation of tutorials (Calculator, ToDo, Chat) or cookbook patterns is required.

## Hard Rules
- Always use the `ft` alias for the `flet` module: `import flet as ft`.
- Follow the standard `main(page: ft.Page)` entry point structure.
- **Prefer Declarative UI**: Use `@ft.component` and `@ft.observable` instead of manual control mutation.
- Avoid calling `page.update()` or `control.update()` manually when using the declarative approach; Flet handles re-rendering automatically for observables and hooks.
- Refer to the local documentation in `references/` for specific control properties and event handlers.

## DO's and DON'Ts

### DO
- **DO** use `@ft.observable` for your domain models and shared data.
- **DO** use `ft.use_state()` within components for local, transient UI state (e.g., `is_editing`).
- **DO** use conditional rendering (Python `if/else` inside components) instead of toggling the `visible` property of controls.
- **DO** use `Control Refs` (`ft.Ref`) only when you need direct access to an underlying control property that isn't mapped to state.
- **DO** organize your UI into small, reusable `@ft.component` functions.

### DON'T
- **DON'T** mutate control properties (like `control.value = "new"`) inside event handlers in declarative code; update the state instead.
- **DON'T** call `page.update()` inside an event handler if you modified an `@ft.observable` object or used a `set_state` hook.
- **DON'T** use plain local variables to track UI state inside a component; they will reset on every render. Use `ft.use_state()` instead.
- **DON'T** put business logic inside the component's render body; keep it in event handlers or model methods.

## Recommended Approaches

### Declarative vs. Imperative
**Mindset shift: UI = f(state)**. Instead of deciding "how" to change the screen, decide what the data looks like and let the component "describe" the UI for that data.

- **Imperative (Avoid for complex apps)**: `button.text = "Clicked!"; page.update();`
- **Declarative (Recommended)**:
  ```python
  @ft.component
  def MyComponent():
      clicked, set_clicked = ft.use_state(False)
      return ft.ElevatedButton(
          text="Clicked!" if clicked else "Click me",
          on_click=lambda _: set_clicked(True)
      )
  ```

### State Management
- Use **Hooks** (`ft.use_state`, `ft.use_effect`) for state that only matters to one component (e.g., "is this menu open?").
- Use **Observables** (`@ft.observable`) for data that lives across the app or represents your business model (e.g., "list of users").

## Decision Gates
| Feature | Approach |
|---------|----------|
| Layout | Use `ft.Row` for horizontal and `ft.Column` for vertical alignment. |
| Navigation | Use `page.on_route_change` and `ft.TemplateRoute` for multi-page apps. |
| State | Use `ft.use_state()` for local UI state or `@ft.observable` for domain data. |
| Platform | Use `ft.app(target=main)` for desktop/web and `flet build` for mobile. |

## Execution Steps
1. Identify the specific Flet component or pattern requested.
2. Search the local documentation in `references/` (e.g., `reference/controls.md` or `cookbook/`) for implementation details.
3. Provide a clean code snippet using `import flet as ft` and the **Declarative approach** by default.
4. Explain any non-obvious event handlers or layout constraints.

## Output Contract
- Correct Python code using Flet (declarative style preferred).
- References to specific local documentation files used.
- Clear explanation of the UI structure and behavior.

## References

### Getting Started
- `references/getting_started/introduction.md`: Fundamental concepts and framework architecture.
- `references/getting_started/installation.md`: Steps to set up the development environment.
- `references/getting_started/creating_a_new_flet_app.md`: Boilerplate for starting new projects.
- `references/getting_started/running_a_flet_app_(hot_reload).md`: Instructions for development workflow and hot reload.
- `references/getting_started/testing_on_mobile.md`: How to preview apps on mobile devices using Flet app.

### Cookbook (Patterns & Solutions)
- **`references/cookbook/declarative_vs_imperative_crud_app.md`**: CRITICAL. Explains the shift from manual mutations to state-driven UI.
- `references/cookbook/navigation_and_routing.md`: Implementing multi-page apps and URL handling.
- `references/cookbook/async_apps.md`: Managing concurrency and non-blocking UI updates.
- `references/cookbook/theming.md`: Customizing colors, fonts, and dark/light modes.
- `references/cookbook/client_storage.md` & `references/cookbook/session_storage.md`: Persisting user data locally or per session.
- `references/cookbook/animations.md`: Implementing implicit and explicit animations for controls.
- `references/cookbook/authentication.md`: Implementing OAuth and 3rd party login flows.
- `references/cookbook/drag_and_drop.md`: Handling drag and drop interactions between controls.
- `references/cookbook/read_and_write_files.md`: Using file pickers and local file system access.

### API Reference
- `references/reference/accelerometer.md`: Use case: Implementing and configuring Accelerometer components and features.
- `references/reference/ads.md`: Use case: Implementing and configuring Ads components and features.
- `references/reference/alertdialog.md`: Use case: Showing modal popups and alerts with Alertdialog.
- `references/reference/aliases.md`: Use case: Implementing and configuring Aliases components and features.
- `references/reference/alignment.md`: Use case: Managing UI layout and positioning with Alignment.
- `references/reference/androidbuildversion.md`: Use case: Implementing and configuring Androidbuildversion components and features.
- `references/reference/androiddeviceinfo.md`: Use case: Accessing hardware and OS details via Androiddeviceinfo.
- `references/reference/animatedswitcher.md`: Use case: Creating fluid UI transitions and Animatedswitcher.
- `references/reference/animation.md`: Use case: Creating fluid UI transitions and Animation.
- `references/reference/animationstyle.md`: Use case: Implementing and configuring Animationstyle components and features.
- `references/reference/appbar.md`: Use case: Implementing and configuring Appbar components and features.
- `references/reference/appbartheme.md`: Use case: Customizing the visual theme and styling for Appbartheme.
- `references/reference/arc.md`: Use case: Implementing and configuring Arc components and features.
- `references/reference/attributionalignment.md`: Use case: Implementing and configuring Attributionalignment components and features.
- `references/reference/audio.md`: Use case: Rendering multimedia and graphics with Audio.
- `references/reference/audiorecorder.md`: Use case: Implementing and configuring Audiorecorder components and features.
- `references/reference/autocomplete.md`: Use case: Implementing and configuring Autocomplete components and features.
- `references/reference/autocompletesuggestion.md`: Use case: Implementing and configuring Autocompletesuggestion components and features.
- `references/reference/autofillgroup.md`: Use case: Implementing and configuring Autofillgroup components and features.
- `references/reference/automaticnotchshape.md`: Use case: Implementing and configuring Automaticnotchshape components and features.
- `references/reference/badgetheme.md`: Use case: Customizing the visual theme and styling for Badgetheme.
- `references/reference/banner.md`: Use case: Implementing and configuring Banner components and features.
- `references/reference/bannerad.md`: Use case: Implementing and configuring Bannerad components and features.
- `references/reference/bannertheme.md`: Use case: Customizing the visual theme and styling for Bannertheme.
- `references/reference/barchart.md`: Use case: Displaying data visualizations using Barchart.
- `references/reference/barometer.md`: Use case: Implementing and configuring Barometer components and features.
- `references/reference/basead.md`: Use case: Implementing and configuring Basead components and features.
- `references/reference/battery.md`: Use case: Implementing and configuring Battery components and features.
- `references/reference/beveledrectangleborder.md`: Use case: Implementing and configuring Beveledrectangleborder components and features.
- `references/reference/binary_packages_(android_ios).md`: Use case: Implementing and configuring Binary Packages (Android Ios) components and features.
- `references/reference/blockpicker.md`: Use case: Allowing users to select data using Blockpicker.
- `references/reference/blur.md`: Use case: Implementing and configuring Blur components and features.
- `references/reference/border.md`: Use case: Implementing and configuring Border components and features.
- `references/reference/borderradius.md`: Use case: Implementing and configuring Borderradius components and features.
- `references/reference/borderside.md`: Use case: Implementing and configuring Borderside components and features.
- `references/reference/bottomappbar.md`: Use case: Implementing and configuring Bottomappbar components and features.
- `references/reference/bottomappbartheme.md`: Use case: Customizing the visual theme and styling for Bottomappbartheme.
- `references/reference/bottomsheet.md`: Use case: Implementing and configuring Bottomsheet components and features.
- `references/reference/bottomsheettheme.md`: Use case: Customizing the visual theme and styling for Bottomsheettheme.
- `references/reference/boxconstraints.md`: Use case: Implementing and configuring Boxconstraints components and features.
- `references/reference/boxdecoration.md`: Use case: Implementing and configuring Boxdecoration components and features.
- `references/reference/boxshadow.md`: Use case: Implementing and configuring Boxshadow components and features.
- `references/reference/browserconfiguration.md`: Use case: Implementing and configuring Browserconfiguration components and features.
- `references/reference/browsercontextmenu.md`: Use case: Implementing and configuring Browsercontextmenu components and features.
- `references/reference/button.md`: Use case: Adding interactive Button controls for user actions.
- `references/reference/buttonstyle.md`: Use case: Adding interactive Buttonstyle controls for user actions.
- `references/reference/buttontheme.md`: Use case: Customizing the visual theme and styling for Buttontheme.
- `references/reference/camera.md`: Use case: Implementing and configuring Camera components and features.
- `references/reference/candlestickchart.md`: Use case: Displaying data visualizations using Candlestickchart.
- `references/reference/canvas.md`: Use case: Rendering multimedia and graphics with Canvas.
- `references/reference/card.md`: Use case: Implementing and configuring Card components and features.
- `references/reference/cardtheme.md`: Use case: Customizing the visual theme and styling for Cardtheme.
- `references/reference/charts.md`: Use case: Displaying data visualizations using Charts.
- `references/reference/checkbox.md`: Use case: Implementing and configuring Checkbox components and features.
- `references/reference/checkboxtheme.md`: Use case: Customizing the visual theme and styling for Checkboxtheme.
- `references/reference/chip.md`: Use case: Implementing and configuring Chip components and features.
- `references/reference/chiptheme.md`: Use case: Customizing the visual theme and styling for Chiptheme.
- `references/reference/circle.md`: Use case: Implementing and configuring Circle components and features.
- `references/reference/circleavatar.md`: Use case: Implementing and configuring Circleavatar components and features.
- `references/reference/circleborder.md`: Use case: Implementing and configuring Circleborder components and features.
- `references/reference/circlelayer.md`: Use case: Implementing and configuring Circlelayer components and features.
- `references/reference/circlemarker.md`: Use case: Implementing and configuring Circlemarker components and features.
- `references/reference/circularrectanglenotchshape.md`: Use case: Implementing and configuring Circularrectanglenotchshape components and features.
- `references/reference/cli.md`: Use case: Using the CLI for Cli operations.
- `references/reference/clipboard.md`: Use case: Implementing and configuring Clipboard components and features.
- `references/reference/codeeditor.md`: Use case: Implementing and configuring Codeeditor components and features.
- `references/reference/color.md`: Use case: Implementing and configuring Color components and features.
- `references/reference/color_pickers.md`: Use case: Allowing users to select data using Color Pickers.
- `references/reference/colorfilter.md`: Use case: Implementing and configuring Colorfilter components and features.
- `references/reference/colorpicker.md`: Use case: Allowing users to select data using Colorpicker.
- `references/reference/colorscheme.md`: Use case: Implementing and configuring Colorscheme components and features.
- `references/reference/column.md`: Use case: Managing UI layout and positioning with Column.
- `references/reference/connectivity.md`: Use case: Implementing and configuring Connectivity components and features.
- `references/reference/container.md`: Use case: Managing UI layout and positioning with Container.
- `references/reference/context.md`: Use case: Implementing and configuring Context components and features.
- `references/reference/contextmenu.md`: Use case: Implementing and configuring Contextmenu components and features.
- `references/reference/continuousrectangleborder.md`: Use case: Implementing and configuring Continuousrectangleborder components and features.
- `references/reference/controls.md`: Use case: Implementing and configuring Controls components and features.
- `references/reference/controlstate.md`: Use case: Implementing and configuring Controlstate components and features.
- `references/reference/cupertinoactionsheet.md`: Use case: Implementing and configuring Cupertinoactionsheet components and features.
- `references/reference/cupertinoactivityindicator.md`: Use case: Implementing and configuring Cupertinoactivityindicator components and features.
- `references/reference/cupertinoalertdialog.md`: Use case: Showing modal popups and alerts with Cupertinoalertdialog.
- `references/reference/cupertinoappbar.md`: Use case: Implementing and configuring Cupertinoappbar components and features.
- `references/reference/cupertinobottomsheet.md`: Use case: Implementing and configuring Cupertinobottomsheet components and features.
- `references/reference/cupertinobutton.md`: Use case: Adding interactive Cupertinobutton controls for user actions.
- `references/reference/cupertinocheckbox.md`: Use case: Implementing and configuring Cupertinocheckbox components and features.
- `references/reference/cupertinocontextmenu.md`: Use case: Implementing and configuring Cupertinocontextmenu components and features.
- `references/reference/cupertinodatepicker.md`: Use case: Allowing users to select data using Cupertinodatepicker.
- `references/reference/cupertinodialogaction.md`: Use case: Showing modal popups and alerts with Cupertinodialogaction.
- `references/reference/cupertinofilledbutton.md`: Use case: Adding interactive Cupertinofilledbutton controls for user actions.
- `references/reference/cupertinolisttile.md`: Use case: Implementing and configuring Cupertinolisttile components and features.
- `references/reference/cupertinonavigationbar.md`: Use case: Implementing and configuring Cupertinonavigationbar components and features.
- `references/reference/cupertinopicker.md`: Use case: Allowing users to select data using Cupertinopicker.
- `references/reference/cupertinoradio.md`: Use case: Implementing and configuring Cupertinoradio components and features.
- `references/reference/cupertinosegmentedbutton.md`: Use case: Adding interactive Cupertinosegmentedbutton controls for user actions.
- `references/reference/cupertinoslider.md`: Use case: Implementing and configuring Cupertinoslider components and features.
- `references/reference/cupertinoslidingsegmentedbutton.md`: Use case: Adding interactive Cupertinoslidingsegmentedbutton controls for user actions.
- `references/reference/cupertinoswitch.md`: Use case: Implementing and configuring Cupertinoswitch components and features.
- `references/reference/cupertinotextfield.md`: Use case: Implementing and configuring Cupertinotextfield components and features.
- `references/reference/cupertinotimerpicker.md`: Use case: Allowing users to select data using Cupertinotimerpicker.
- `references/reference/cupertinotintedbutton.md`: Use case: Adding interactive Cupertinotintedbutton controls for user actions.
- `references/reference/datacolumn2.md`: Use case: Implementing and configuring Datacolumn2 components and features.
- `references/reference/datarow2.md`: Use case: Implementing and configuring Datarow2 components and features.
- `references/reference/datatable.md`: Use case: Implementing and configuring Datatable components and features.
- `references/reference/datatable2.md`: Use case: Implementing and configuring Datatable2 components and features.
- `references/reference/datatabletheme.md`: Use case: Customizing the visual theme and styling for Datatabletheme.
- `references/reference/datepicker.md`: Use case: Allowing users to select data using Datepicker.
- `references/reference/datepickertheme.md`: Use case: Customizing the visual theme and styling for Datepickertheme.
- `references/reference/daterangepicker.md`: Use case: Allowing users to select data using Daterangepicker.
- `references/reference/decorationimage.md`: Use case: Implementing and configuring Decorationimage components and features.
- `references/reference/deviceinfo.md`: Use case: Accessing hardware and OS details via Deviceinfo.
- `references/reference/dialogtheme.md`: Use case: Customizing the visual theme and styling for Dialogtheme.
- `references/reference/dismissible.md`: Use case: Implementing and configuring Dismissible components and features.
- `references/reference/divider.md`: Use case: Implementing and configuring Divider components and features.
- `references/reference/dividertheme.md`: Use case: Customizing the visual theme and styling for Dividertheme.
- `references/reference/draggable.md`: Use case: Implementing and configuring Draggable components and features.
- `references/reference/dragtarget.md`: Use case: Implementing and configuring Dragtarget components and features.
- `references/reference/dropdown.md`: Use case: Implementing and configuring Dropdown components and features.
- `references/reference/dropdowntheme.md`: Use case: Customizing the visual theme and styling for Dropdowntheme.
- `references/reference/duration.md`: Use case: Implementing and configuring Duration components and features.
- `references/reference/environment_variables.md`: Use case: Implementing and configuring Environment Variables components and features.
- `references/reference/exceptions.md`: Use case: Implementing and configuring Exceptions components and features.
- `references/reference/expansionpanel.md`: Use case: Implementing and configuring Expansionpanel components and features.
- `references/reference/expansionpanellist.md`: Use case: Implementing and configuring Expansionpanellist components and features.
- `references/reference/expansiontile.md`: Use case: Implementing and configuring Expansiontile components and features.
- `references/reference/expansiontiletheme.md`: Use case: Customizing the visual theme and styling for Expansiontiletheme.
- `references/reference/filepicker.md`: Use case: Allowing users to select data using Filepicker.
- `references/reference/filepickerfile.md`: Use case: Allowing users to select data using Filepickerfile.
- `references/reference/filepickeruploadfile.md`: Use case: Allowing users to select data using Filepickeruploadfile.
- `references/reference/fill.md`: Use case: Implementing and configuring Fill components and features.
- `references/reference/filledbutton.md`: Use case: Adding interactive Filledbutton controls for user actions.
- `references/reference/filledbuttontheme.md`: Use case: Customizing the visual theme and styling for Filledbuttontheme.
- `references/reference/fillediconbutton.md`: Use case: Adding interactive Fillediconbutton controls for user actions.
- `references/reference/filledtonalbutton.md`: Use case: Adding interactive Filledtonalbutton controls for user actions.
- `references/reference/filledtonaliconbutton.md`: Use case: Adding interactive Filledtonaliconbutton controls for user actions.
- `references/reference/finder.md`: Use case: Implementing and configuring Finder components and features.
- `references/reference/flashlight.md`: Use case: Implementing and configuring Flashlight components and features.
- `references/reference/flet_build.md`: Use case: Using the CLI for Flet Build operations.
- `references/reference/flet_create.md`: Use case: Implementing and configuring Flet Create components and features.
- `references/reference/flet_debug.md`: Use case: Implementing and configuring Flet Debug components and features.
- `references/reference/flet_devices.md`: Use case: Implementing and configuring Flet Devices components and features.
- `references/reference/flet_doctor.md`: Use case: Implementing and configuring Flet Doctor components and features.
- `references/reference/flet_emulators.md`: Use case: Implementing and configuring Flet Emulators components and features.
- `references/reference/flet_pack.md`: Use case: Using the CLI for Flet Pack operations.
- `references/reference/flet_publish.md`: Use case: Using the CLI for Flet Publish operations.
- `references/reference/flet_run.md`: Use case: Implementing and configuring Flet Run components and features.
- `references/reference/flet_serve.md`: Use case: Implementing and configuring Flet Serve components and features.
- `references/reference/fletapp.md`: Use case: Implementing and configuring Fletapp components and features.
- `references/reference/fletpagedisconnectedexception.md`: Use case: Implementing and configuring Fletpagedisconnectedexception components and features.
- `references/reference/flettestapp.md`: Use case: Implementing and configuring Flettestapp components and features.
- `references/reference/fletunimplementedplatformexception.md`: Use case: Implementing and configuring Fletunimplementedplatformexception components and features.
- `references/reference/fletunsupportedplatformexception.md`: Use case: Implementing and configuring Fletunsupportedplatformexception components and features.
- `references/reference/flip.md`: Use case: Implementing and configuring Flip components and features.
- `references/reference/floatingactionbutton.md`: Use case: Adding interactive Floatingactionbutton controls for user actions.
- `references/reference/floatingactionbuttontheme.md`: Use case: Customizing the visual theme and styling for Floatingactionbuttontheme.
- `references/reference/geolocator.md`: Use case: Implementing and configuring Geolocator components and features.
- `references/reference/gesturedetector.md`: Use case: Implementing and configuring Gesturedetector components and features.
- `references/reference/gradient.md`: Use case: Implementing and configuring Gradient components and features.
- `references/reference/gridview.md`: Use case: Implementing and configuring Gridview components and features.
- `references/reference/gyroscope.md`: Use case: Implementing and configuring Gyroscope components and features.
- `references/reference/hapticfeedback.md`: Use case: Implementing and configuring Hapticfeedback components and features.
- `references/reference/hero.md`: Use case: Creating fluid UI transitions and Hero.
- `references/reference/hueringpicker.md`: Use case: Allowing users to select data using Hueringpicker.
- `references/reference/icon.md`: Use case: Rendering multimedia and graphics with Icon.
- `references/reference/iconbutton.md`: Use case: Adding interactive Iconbutton controls for user actions.
- `references/reference/iconbuttontheme.md`: Use case: Customizing the visual theme and styling for Iconbuttontheme.
- `references/reference/icontheme.md`: Use case: Customizing the visual theme and styling for Icontheme.
- `references/reference/image.md`: Use case: Rendering multimedia and graphics with Image.
- `references/reference/inputborder.md`: Use case: Implementing and configuring Inputborder components and features.
- `references/reference/inputfilter.md`: Use case: Implementing and configuring Inputfilter components and features.
- `references/reference/interactiveviewer.md`: Use case: Implementing and configuring Interactiveviewer components and features.
- `references/reference/interstitialad.md`: Use case: Implementing and configuring Interstitialad components and features.
- `references/reference/iosdeviceinfo.md`: Use case: Accessing hardware and OS details via Iosdeviceinfo.
- `references/reference/iosutsname.md`: Use case: Implementing and configuring Iosutsname components and features.
- `references/reference/key.md`: Use case: Implementing and configuring Key components and features.
- `references/reference/keyboardlistener.md`: Use case: Implementing and configuring Keyboardlistener components and features.
- `references/reference/line.md`: Use case: Implementing and configuring Line components and features.
- `references/reference/lineargradient.md`: Use case: Implementing and configuring Lineargradient components and features.
- `references/reference/linechart.md`: Use case: Displaying data visualizations using Linechart.
- `references/reference/linuxdeviceinfo.md`: Use case: Accessing hardware and OS details via Linuxdeviceinfo.
- `references/reference/listtile.md`: Use case: Implementing and configuring Listtile components and features.
- `references/reference/listtiletheme.md`: Use case: Customizing the visual theme and styling for Listtiletheme.
- `references/reference/listview.md`: Use case: Implementing and configuring Listview components and features.
- `references/reference/locale.md`: Use case: Implementing and configuring Locale components and features.
- `references/reference/localeconfiguration.md`: Use case: Implementing and configuring Localeconfiguration components and features.
- `references/reference/locationinfo.md`: Use case: Implementing and configuring Locationinfo components and features.
- `references/reference/lottie.md`: Use case: Rendering multimedia and graphics with Lottie.
- `references/reference/macosdeviceinfo.md`: Use case: Accessing hardware and OS details via Macosdeviceinfo.
- `references/reference/magnetometer.md`: Use case: Implementing and configuring Magnetometer components and features.
- `references/reference/map.md`: Use case: Implementing and configuring Map components and features.
- `references/reference/mapcontrol.md`: Use case: Implementing and configuring Mapcontrol components and features.
- `references/reference/margin.md`: Use case: Managing UI layout and positioning with Margin.
- `references/reference/markdown.md`: Use case: Implementing and configuring Markdown components and features.
- `references/reference/markdowncustomcodetheme.md`: Use case: Customizing the visual theme and styling for Markdowncustomcodetheme.
- `references/reference/markdownstylesheet.md`: Use case: Implementing and configuring Markdownstylesheet components and features.
- `references/reference/marker.md`: Use case: Implementing and configuring Marker components and features.
- `references/reference/markerlayer.md`: Use case: Implementing and configuring Markerlayer components and features.
- `references/reference/materialpicker.md`: Use case: Allowing users to select data using Materialpicker.
- `references/reference/matplotlibchart.md`: Use case: Displaying data visualizations using Matplotlibchart.
- `references/reference/matplotlibchartwithtoolbar.md`: Use case: Displaying data visualizations using Matplotlibchartwithtoolbar.
- `references/reference/matrix4.md`: Use case: Implementing and configuring Matrix4 components and features.
- `references/reference/menubar.md`: Use case: Implementing and configuring Menubar components and features.
- `references/reference/menuitembutton.md`: Use case: Adding interactive Menuitembutton controls for user actions.
- `references/reference/menustyle.md`: Use case: Implementing and configuring Menustyle components and features.
- `references/reference/mergesemantics.md`: Use case: Implementing and configuring Mergesemantics components and features.
- `references/reference/multiplechoiceblockpicker.md`: Use case: Allowing users to select data using Multiplechoiceblockpicker.
- `references/reference/multiview.md`: Use case: Implementing and configuring Multiview components and features.
- `references/reference/navigationbar.md`: Use case: Implementing and configuring Navigationbar components and features.
- `references/reference/navigationbartheme.md`: Use case: Customizing the visual theme and styling for Navigationbartheme.
- `references/reference/navigationdrawer.md`: Use case: Implementing and configuring Navigationdrawer components and features.
- `references/reference/navigationdrawertheme.md`: Use case: Customizing the visual theme and styling for Navigationdrawertheme.
- `references/reference/navigationrail.md`: Use case: Implementing and configuring Navigationrail components and features.
- `references/reference/navigationrailtheme.md`: Use case: Customizing the visual theme and styling for Navigationrailtheme.
- `references/reference/notchshape.md`: Use case: Implementing and configuring Notchshape components and features.
- `references/reference/observable.md`: Use case: Implementing and configuring Observable components and features.
- `references/reference/offset.md`: Use case: Implementing and configuring Offset components and features.
- `references/reference/outlinedborder.md`: Use case: Implementing and configuring Outlinedborder components and features.
- `references/reference/outlinedbutton.md`: Use case: Adding interactive Outlinedbutton controls for user actions.
- `references/reference/outlinedbuttontheme.md`: Use case: Customizing the visual theme and styling for Outlinedbuttontheme.
- `references/reference/outlinediconbutton.md`: Use case: Adding interactive Outlinediconbutton controls for user actions.
- `references/reference/oval.md`: Use case: Implementing and configuring Oval components and features.
- `references/reference/overlayimage.md`: Use case: Implementing and configuring Overlayimage components and features.
- `references/reference/overlayimagelayer.md`: Use case: Implementing and configuring Overlayimagelayer components and features.
- `references/reference/padding.md`: Use case: Managing UI layout and positioning with Padding.
- `references/reference/page.md`: Use case: Implementing and configuring Page components and features.
- `references/reference/pagelet.md`: Use case: Implementing and configuring Pagelet components and features.
- `references/reference/pagetransitionstheme.md`: Use case: Customizing the visual theme and styling for Pagetransitionstheme.
- `references/reference/pagetransitiontheme.md`: Use case: Customizing the visual theme and styling for Pagetransitiontheme.
- `references/reference/pageview.md`: Use case: Implementing and configuring Pageview components and features.
- `references/reference/paint.md`: Use case: Implementing and configuring Paint components and features.
- `references/reference/paintgradient.md`: Use case: Implementing and configuring Paintgradient components and features.
- `references/reference/paintlineargradient.md`: Use case: Implementing and configuring Paintlineargradient components and features.
- `references/reference/paintradialgradient.md`: Use case: Implementing and configuring Paintradialgradient components and features.
- `references/reference/paintsweepgradient.md`: Use case: Implementing and configuring Paintsweepgradient components and features.
- `references/reference/path.md`: Use case: Implementing and configuring Path components and features.
- `references/reference/permissionhandler.md`: Use case: Implementing and configuring Permissionhandler components and features.
- `references/reference/piechart.md`: Use case: Displaying data visualizations using Piechart.
- `references/reference/placeholder.md`: Use case: Implementing and configuring Placeholder components and features.
- `references/reference/plotlychart.md`: Use case: Displaying data visualizations using Plotlychart.
- `references/reference/points.md`: Use case: Implementing and configuring Points components and features.
- `references/reference/polygonlayer.md`: Use case: Implementing and configuring Polygonlayer components and features.
- `references/reference/polygonmarker.md`: Use case: Implementing and configuring Polygonmarker components and features.
- `references/reference/polylinelayer.md`: Use case: Implementing and configuring Polylinelayer components and features.
- `references/reference/polylinemarker.md`: Use case: Implementing and configuring Polylinemarker components and features.
- `references/reference/popupmenubutton.md`: Use case: Adding interactive Popupmenubutton controls for user actions.
- `references/reference/popupmenutheme.md`: Use case: Customizing the visual theme and styling for Popupmenutheme.
- `references/reference/progressbar.md`: Use case: Implementing and configuring Progressbar components and features.
- `references/reference/progressindicatortheme.md`: Use case: Customizing the visual theme and styling for Progressindicatortheme.
- `references/reference/progressring.md`: Use case: Implementing and configuring Progressring components and features.
- `references/reference/pubsubclient.md`: Use case: Implementing and configuring Pubsubclient components and features.
- `references/reference/pubsubhub.md`: Use case: Implementing and configuring Pubsubhub components and features.
- `references/reference/radarchart.md`: Use case: Displaying data visualizations using Radarchart.
- `references/reference/radialgradient.md`: Use case: Implementing and configuring Radialgradient components and features.
- `references/reference/radio.md`: Use case: Implementing and configuring Radio components and features.
- `references/reference/radiogroup.md`: Use case: Implementing and configuring Radiogroup components and features.
- `references/reference/radiotheme.md`: Use case: Customizing the visual theme and styling for Radiotheme.
- `references/reference/rangeslider.md`: Use case: Implementing and configuring Rangeslider components and features.
- `references/reference/rect.md`: Use case: Implementing and configuring Rect components and features.
- `references/reference/ref.md`: Use case: Implementing and configuring Ref components and features.
- `references/reference/reference_overview.md`: Use case: Implementing and configuring Reference Overview components and features.
- `references/reference/reorderabledraghandle.md`: Use case: Implementing and configuring Reorderabledraghandle components and features.
- `references/reference/reorderablelistview.md`: Use case: Implementing and configuring Reorderablelistview components and features.
- `references/reference/responsiverow.md`: Use case: Implementing and configuring Responsiverow components and features.
- `references/reference/responsiverowbreakpoint.md`: Use case: Implementing and configuring Responsiverowbreakpoint components and features.
- `references/reference/richattribution.md`: Use case: Implementing and configuring Richattribution components and features.
- `references/reference/rive.md`: Use case: Rendering multimedia and graphics with Rive.
- `references/reference/rotate.md`: Use case: Implementing and configuring Rotate components and features.
- `references/reference/rotatedbox.md`: Use case: Implementing and configuring Rotatedbox components and features.
- `references/reference/rotatedoverlayimage.md`: Use case: Implementing and configuring Rotatedoverlayimage components and features.
- `references/reference/roundedrectangleborder.md`: Use case: Implementing and configuring Roundedrectangleborder components and features.
- `references/reference/router.md`: Use case: Implementing and configuring Router components and features.
- `references/reference/row.md`: Use case: Managing UI layout and positioning with Row.
- `references/reference/safearea.md`: Use case: Managing UI layout and positioning with Safearea.
- `references/reference/scale.md`: Use case: Implementing and configuring Scale components and features.
- `references/reference/scatterchart.md`: Use case: Displaying data visualizations using Scatterchart.
- `references/reference/screenbrightness.md`: Use case: Implementing and configuring Screenbrightness components and features.
- `references/reference/screenshot.md`: Use case: Implementing and configuring Screenshot components and features.
- `references/reference/scrollbartheme.md`: Use case: Customizing the visual theme and styling for Scrollbartheme.
- `references/reference/scrollkey.md`: Use case: Implementing and configuring Scrollkey components and features.
- `references/reference/searchbar.md`: Use case: Implementing and configuring Searchbar components and features.
- `references/reference/searchbartheme.md`: Use case: Customizing the visual theme and styling for Searchbartheme.
- `references/reference/searchviewtheme.md`: Use case: Customizing the visual theme and styling for Searchviewtheme.
- `references/reference/securestorage.md`: Use case: Implementing and configuring Securestorage components and features.
- `references/reference/segmentedbutton.md`: Use case: Adding interactive Segmentedbutton controls for user actions.
- `references/reference/segmentedbuttontheme.md`: Use case: Customizing the visual theme and styling for Segmentedbuttontheme.
- `references/reference/selectionarea.md`: Use case: Implementing and configuring Selectionarea components and features.
- `references/reference/semantics.md`: Use case: Implementing and configuring Semantics components and features.
- `references/reference/semanticsservice.md`: Use case: Implementing and configuring Semanticsservice components and features.
- `references/reference/services.md`: Use case: Implementing and configuring Services components and features.
- `references/reference/shadermask.md`: Use case: Implementing and configuring Shadermask components and features.
- `references/reference/shadow.md`: Use case: Implementing and configuring Shadow components and features.
- `references/reference/shakedetector.md`: Use case: Implementing and configuring Shakedetector components and features.
- `references/reference/shape.md`: Use case: Implementing and configuring Shape components and features.
- `references/reference/shapeborder.md`: Use case: Implementing and configuring Shapeborder components and features.
- `references/reference/share.md`: Use case: Implementing and configuring Share components and features.
- `references/reference/sharedpreferences.md`: Use case: Implementing and configuring Sharedpreferences components and features.
- `references/reference/shimmer.md`: Use case: Implementing and configuring Shimmer components and features.
- `references/reference/simpleattribution.md`: Use case: Implementing and configuring Simpleattribution components and features.
- `references/reference/size.md`: Use case: Implementing and configuring Size components and features.
- `references/reference/slidepicker.md`: Use case: Allowing users to select data using Slidepicker.
- `references/reference/slider.md`: Use case: Implementing and configuring Slider components and features.
- `references/reference/slidertheme.md`: Use case: Customizing the visual theme and styling for Slidertheme.
- `references/reference/snackbar.md`: Use case: Implementing and configuring Snackbar components and features.
- `references/reference/snackbartheme.md`: Use case: Customizing the visual theme and styling for Snackbartheme.
- `references/reference/sourceattribution.md`: Use case: Implementing and configuring Sourceattribution components and features.
- `references/reference/stack.md`: Use case: Managing UI layout and positioning with Stack.
- `references/reference/stadiumborder.md`: Use case: Implementing and configuring Stadiumborder components and features.
- `references/reference/storagepaths.md`: Use case: Implementing and configuring Storagepaths components and features.
- `references/reference/strutstyle.md`: Use case: Implementing and configuring Strutstyle components and features.
- `references/reference/submenubutton.md`: Use case: Adding interactive Submenubutton controls for user actions.
- `references/reference/sweepgradient.md`: Use case: Implementing and configuring Sweepgradient components and features.
- `references/reference/switch.md`: Use case: Implementing and configuring Switch components and features.
- `references/reference/switchtheme.md`: Use case: Customizing the visual theme and styling for Switchtheme.
- `references/reference/systemoverlaystyle.md`: Use case: Implementing and configuring Systemoverlaystyle components and features.
- `references/reference/tabbartheme.md`: Use case: Customizing the visual theme and styling for Tabbartheme.
- `references/reference/tabs.md`: Use case: Implementing and configuring Tabs components and features.
- `references/reference/templateroute.md`: Use case: Implementing and configuring Templateroute components and features.
- `references/reference/tester.md`: Use case: Implementing and configuring Tester components and features.
- `references/reference/text.md`: Use case: Displaying and styling text content using Text.
- `references/reference/textbutton.md`: Use case: Adding interactive Textbutton controls for user actions.
- `references/reference/textbuttontheme.md`: Use case: Customizing the visual theme and styling for Textbuttontheme.
- `references/reference/textdecoration.md`: Use case: Implementing and configuring Textdecoration components and features.
- `references/reference/textfield.md`: Use case: Displaying and styling text content using Textfield.
- `references/reference/textselection.md`: Use case: Implementing and configuring Textselection components and features.
- `references/reference/textspan.md`: Use case: Displaying and styling text content using Textspan.
- `references/reference/textstyle.md`: Use case: Displaying and styling text content using Textstyle.
- `references/reference/texttheme.md`: Use case: Customizing the visual theme and styling for Texttheme.
- `references/reference/textthemestyle.md`: Use case: Customizing the visual theme and styling for Textthemestyle.
- `references/reference/theme.md`: Use case: Customizing the visual theme and styling for .
- `references/reference/tilelayer.md`: Use case: Implementing and configuring Tilelayer components and features.
- `references/reference/timepicker.md`: Use case: Allowing users to select data using Timepicker.
- `references/reference/timepickertheme.md`: Use case: Customizing the visual theme and styling for Timepickertheme.
- `references/reference/tooltip.md`: Use case: Implementing and configuring Tooltip components and features.
- `references/reference/tooltiptheme.md`: Use case: Customizing the visual theme and styling for Tooltiptheme.
- `references/reference/transform.md`: Use case: Implementing and configuring Transform components and features.
- `references/reference/transparentpointer.md`: Use case: Implementing and configuring Transparentpointer components and features.
- `references/reference/types.md`: Use case: Implementing and configuring Types components and features.
- `references/reference/underlinetabindicator.md`: Use case: Implementing and configuring Underlinetabindicator components and features.
- `references/reference/url.md`: Use case: Implementing and configuring Url components and features.
- `references/reference/urllauncher.md`: Use case: Implementing and configuring Urllauncher components and features.
- `references/reference/useraccelerometer.md`: Use case: Implementing and configuring Useraccelerometer components and features.
- `references/reference/valuekey.md`: Use case: Implementing and configuring Valuekey components and features.
- `references/reference/verticaldivider.md`: Use case: Implementing and configuring Verticaldivider components and features.
- `references/reference/video.md`: Use case: Rendering multimedia and graphics with Video.
- `references/reference/view.md`: Use case: Implementing and configuring View components and features.
- `references/reference/wakelock.md`: Use case: Implementing and configuring Wakelock components and features.
- `references/reference/webdeviceinfo.md`: Use case: Accessing hardware and OS details via Webdeviceinfo.
- `references/reference/webview.md`: Use case: Implementing and configuring Webview components and features.
- `references/reference/webviewconfiguration.md`: Use case: Implementing and configuring Webviewconfiguration components and features.
- `references/reference/windowdragarea.md`: Use case: Implementing and configuring Windowdragarea components and features.
- `references/reference/windowsdeviceinfo.md`: Use case: Accessing hardware and OS details via Windowsdeviceinfo.

### Tutorials
- `references/tutorials/calculator.md`: Example of a complete functional app with layout and logic.
- `references/tutorials/todo.md`: CRUD patterns and state management example.
- `references/tutorials/chat.md`: Real-time communication and complex list handling.
- `references/tutorials/solitaire.md`: Game logic and advanced drag-and-drop example.

### Publishing
- `references/publishing_flet_app/publishing_flet_app_(overview).md`: General guide for distribution.
- `references/publishing_flet_app/android.md`, `ios.md`, `web.md`, etc.: Platform-specific build instructions.
