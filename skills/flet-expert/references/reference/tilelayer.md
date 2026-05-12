# TileLayer
URL: https://flet.dev/docs/controls/map/tilelayer

ReferenceControlsMapLayersTileLayer
TileLayer

Displays square raster images in a continuous grid, sourced from the provided url_template and fallback_url.

Typically, the first layer to be added to a Map, as it provides the tiles on which other layers are displayed.

CACHING

This control supports basic map tile caching (for compatible tile providers). On non-web platforms, built-in caching is automatically enabled with a default soft limit of 1 GB. On web platforms, caching is typically handled by the browser.

No guarantees are provided regarding the persistence or reliability of cached tiles. Cached data may become unavailable or be cleared at any time. For example, do not rely on this caching mechanism in scenarios where missing tiles could create risk or unsafe conditions (for example, offline or safety-critical mapping applications).

It aims to:

Improve developer experience by:

Reducing the costs of using tile servers by reducing duplicate tile requests
Keep your app lightweight - the built-in cache doesn't ship any binaries or databases, just a couple extra libraries you probably already use

Improve user experience by:

Reducing tile loading durations, as fetching from the cache is very quick
Reducing network/Internet usage, which may be limited or metered/expensive (eg. mobile broadband)
Improve compliance with tile server requirements, by reducing the strain on them
Be extensible, customizable, and integrate with multiple tile providers

But it comes at the expense of usage of on-device storage capacity.

SUPPORTED SOURCES

flet-map doesn't provide tiles, so you'll need to bring your own raster tiles. There are multiple different supported sources.

Slippy Map/CARTO (XYZ): This is the most common format for raster tiles, although many satellite tiles will instead use WMS. Typically, a URL with placeholders for X, Y, and Z values. Set the url_template to the template provided by the tile server - usually it can be copied directly from an account portal or documentation. Additional information, like API/access keys, can be passed in using the additional_options property. It's also possible to specify a fallback_url template, used if fetching a tile from the primary url_template fails.
Tile Map Service (TMS): This is also supported. Follow the instructions for the XYZ source above, then set the enable_tms property to True. Read more on WMS here.
Web Map Services (WMS): This is also supported. Use wms_configuration to specify the necessary configuration for WMS tile servers. Read more on WMS here.

Example:

ftm.TileLayer(

    url_template="https://tile.openstreetmap.org/{z}/{x}/{y}.png",

    user_agent_package_name="MyTownMaps/1.4 (+https://example.org; contact: maps@example.org)",

)


Inherits: MapLayer

Properties
additional_options - Static information that should replace placeholders in the url_template.
display_mode - Defines how tiles are displayed on the map.
enable_retina_mode - Whether to enable retina mode.
enable_tms - Whether to inverse Y-axis numbering for tiles.
error_image_src - The source of the tile image to show in place of the tile that failed to load.
evict_error_tile_strategy - If a tile was loaded with error, the tile provider will be asked to evict the image based on this strategy.
fallback_url - Fallback URL template used if fetching tiles from url_template fails.
keep_buffer - When panning the map, keep this many rows and columns of tiles before unloading them.
max_native_zoom - Maximum zoom number supported by the tile source has available.
max_zoom - The maximum zoom level up to which this layer will be displayed (inclusive).
min_native_zoom - Minimum zoom level supported by the tile source.
min_zoom - The minimum zoom level at which this layer is displayed (inclusive).
pan_buffer - When loading tiles only visible tiles are loaded by default.
subdomains - List of subdomains used in the URL template.
tile_bounds - Defines the bounds of the map.
tile_size - The size in pixels of each tile image.
url_template - The URL template is a string that contains placeholders, which, when filled in, create a URL/URI to a specific tile.
user_agent_package_name - The package name of the user agent to use when fetching tiles from the tile server.
wms_configuration - The configuration for WMS tile servers.
zoom_offset - The zoom number used in tile URLs will be offset with this value.
zoom_reverse - Whether the zoom number used in tile URLs will be reversed (max_zoom - zoom instead of zoom).
Events
on_image_error - Fires if an error occurs when fetching the tiles.
Properties​
build
additional_options
class-attribute
instance-attribute
​
Copy
additional_options: dict[str, str] = field(
    default_factory=dict
)

Static information that should replace placeholders in the url_template. Applying API keys, for example, is a good usecase of this parameter.

EXAMPLE
TileLayer(

    url_template="https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}{r}.png?access_token={accessToken}",

    additional_options={

        'accessToken': '<ACCESS_TOKEN_HERE>',

        'id': 'mapbox.streets',

    },

)

build
display_mode
class-attribute
instance-attribute
​
Copy
display_mode: TileDisplay = field(
    default_factory=lambda: FadeInTileDisplay()
)

Defines how tiles are displayed on the map.

build
enable_retina_mode
class-attribute
instance-attribute
​
Copy
enable_retina_mode: bool = False

Whether to enable retina mode. Retina mode improves the resolution of map tiles, particularly on high density displays.

build
enable_tms
class-attribute
instance-attribute
​
Copy
enable_tms: bool = False

Whether to inverse Y-axis numbering for tiles. Turn this on for TMS services.

build
error_image_src
class-attribute
instance-attribute
​
Copy
error_image_src: str | None = None

The source of the tile image to show in place of the tile that failed to load.

See on_image_error property for details on the error.

build
evict_error_tile_strategy
class-attribute
instance-attribute
​
Copy
evict_error_tile_strategy: (
    TileLayerEvictErrorTileStrategy | None
) = TileLayerEvictErrorTileStrategy.NONE

If a tile was loaded with error, the tile provider will be asked to evict the image based on this strategy.

build
fallback_url
class-attribute
instance-attribute
​
Copy
fallback_url: str | None = None

Fallback URL template used if fetching tiles from url_template fails.

The template must follow the same format and support the same placeholders as url_template.

NOTE

When this is specified, tiles will not be cached in memory, to prevent inconsistencies when url_template is unreliable, avoiding situations where tiles from different sources are displayed simultaneously. Disabling caching may negatively impact performance and efficiency, hence the recommendation to only specify a fallback URL when really necessary.

build
keep_buffer
class-attribute
instance-attribute
​
Copy
keep_buffer: int = 2

When panning the map, keep this many rows and columns of tiles before unloading them.

build
max_native_zoom
class-attribute
instance-attribute
​
Copy
max_native_zoom: int = 19

Maximum zoom number supported by the tile source has available.

Tiles from above this zoom level will not be displayed, instead tiles at this zoom level will be displayed and scaled.

Most tile servers support up to zoom level 19, which is the default. Otherwise, this should be specified.

You can also set max_zoom, which is an absolute zoom limit for users. It is recommended to set it to a few levels greater than the maximum zoom level covered by any of your tile layers.

Raises:

ValueError - If it is less than 0.0.
build
max_zoom
class-attribute
instance-attribute
​
Copy
max_zoom: Number = float('inf')

The maximum zoom level up to which this layer will be displayed (inclusive). The main usage for this property is to display a different TileLayer when zoomed far in.

Prefer max_native_zoom for setting the maximum zoom level supported by the tile source.

Typically set to infinity so that there are tiles always displayed.

Raises:

ValueError - If it is less than 0.0.
build
min_native_zoom
class-attribute
instance-attribute
​
Copy
min_native_zoom: int = 0

Minimum zoom level supported by the tile source.

Tiles from below this zoom level will not be displayed, instead tiles at this zoom level will be displayed and scaled.

This should usually be 0 (as default), as most tile sources will support zoom levels onwards from this.

Raises:

ValueError - If it is less than 0.0.
build
min_zoom
class-attribute
instance-attribute
​
Copy
min_zoom: Number = 0.0

The minimum zoom level at which this layer is displayed (inclusive).

Typically 0.0.

Raises:

ValueError - If it is less than 0.0.
build
pan_buffer
class-attribute
instance-attribute
​
Copy
pan_buffer: int = 1

When loading tiles only visible tiles are loaded by default.

This option increases the loaded tiles by the given number on both axis which can help prevent the user from seeing loading tiles whilst panning. Setting the pan buffer too high can impact performance, typically this is set to 0 or 1.

build
subdomains
class-attribute
instance-attribute
​
Copy
subdomains: list[str] = field(
    default_factory=lambda: ["a", "b", "c"]
)

List of subdomains used in the URL template.

To use subdomains, add the {s} placeholder to the URL template (url_template and fallback_url)

NOTE

Subdomains are now usually considered redundant due to the usage of HTTP/2 & HTTP/3 which don't have the same restrictions. Usage of subdomains will also hinder the ability to cache tiles, potentially leading to increased tile requests and costs. Hence, if the server supports HTTP/2 or HTTP/3 (how to check), avoid using subdomains.

EXAMPLE

If subdomains is set to ["a", "b", "c"] and the url_template is "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", the resulting tile URLs will be:

"https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
"https://b.tile.openstreetmap.org/{z}/{x}/{y}.png"
"https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
build
tile_bounds
class-attribute
instance-attribute
​
Copy
tile_bounds: MapLatitudeLongitudeBounds | None = None

Defines the bounds of the map. Only tiles that fall within these bounds will be loaded.

build
tile_size
class-attribute
instance-attribute
​
Copy
tile_size: int = 256

The size in pixels of each tile image. Should be a positive power of 2.

NOTE

Some tile servers will use 512x512px tiles instead of 256x256px, such as Mapbox. Using these larger tiles can help reduce tile requests, and when ombined with Retina Mode, it can give the same resolution.

To use these tiles, set tile_size to the actual dimensions of the tiles (otherwise they will appear to small), such as 512. Also set zoom_offset to the result of -((d/256) - 1) - ie. -1 for x512px tiles (otherwise they will appear at the wrong geographical locations).

The {d} placeholder may also be used in the URL template (url_template and fallback_url) to pass through the value of tile_size.

Raises:

ValueError - If it is less than 0.0.
build
url_template
instance-attribute
​
Copy
url_template: str

The URL template is a string that contains placeholders, which, when filled in, create a URL/URI to a specific tile.

Provider Examples: https://wiki.openstreetmap.org/wiki/Raster_tile_providers

Placeholders:

As well as the standard XYZ placeholders in the template, the following placeholders may also be used:

{s}: see subdomains property
{r}: retina scaling factor (2 or 1)
{d}: reflects the tile_size property

Additional placeholders can also be added freely to the template, and are filled in with the specified values in additional_options. This can be used to easier add switchable styles or access tokens.

Compliance with tile server requirements:

It is your own responsibility to comply with any appropriate restrictions and requirements set by your chosen tile server/provider. Always read their terms of service. Failure to do so may lead to any punishment, at the tile server's discretion.

Production apps should be extremely cautious about using this tile server; other projects, libraries, and packages suggesting that OpenStreetMap provides free-to-use map tiles are incorrect.

Case Example - OpenStreetMap (direct): OpenStreetMap (OSM) is one of the most popular sources for map tiles and data. Their data is free for everyone to use (under ODbL), but their public tile server is not free for everyone to use. It is without cost (for users), but, "without cost" ≠ "without restriction" ≠ "open". Due to excessive usage, the OSM Foundation (running OSM as a not-for-profit) has implemented some measures to prevent abuse and ensure the sustainability of their service.

For example: on non-web platforms (ex: desktop), they require a proper User-Agent header to be set. See the user_agent_package_name property for details and recommended best practices. This does not apply to the web platform, because you cannot set a User-Agent header different to what is provided by the browser.

Read more on their tile usage policy here.

build
user_agent_package_name
class-attribute
instance-attribute
​
Copy
user_agent_package_name: str = 'unknown'

The package name of the user agent to use when fetching tiles from the tile server.

This is used to identify your app to the tile server, and is important for compliance with tile server usage policies.

OSM BEST PRACTICE RECOMMENDATIONS

OpenStreetMap (OSM) recommends the following:

Use a clear, unique User-Agent string that names your app and optionally includes a contact URL or email.

Good Example: MyTownMaps/1.4 (+https://example.org; contact: maps@example.org)
Bad Example: com.example.app
For web apps, the browsers will use the browser’s default User-Agent header.
Do not use a library default User-Agent, and never impersonate another app or a browser.
If your platform automatically sets an X-Requested-With header with an app ID, that is acceptable, but a proper User-Agent is still recommended.
Referer (web only): Browsers are expected to send a valid Referer header. Native apps usually do not have a referer, this is ok.
build
wms_configuration
class-attribute
instance-attribute
​
Copy
wms_configuration: WMSTileLayerConfiguration | None = None

The configuration for WMS tile servers.

build
zoom_offset
class-attribute
instance-attribute
​
Copy
zoom_offset: Number = 0.0

The zoom number used in tile URLs will be offset with this value.

Raises:

ValueError - If it is less than 0.0.
build
zoom_reverse
class-attribute
instance-attribute
​
Copy
zoom_reverse: bool = False

Whether the zoom number used in tile URLs will be reversed (max_zoom - zoom instead of zoom).

Events​
bolt
on_image_error
class-attribute
instance-attribute
​
Copy
on_image_error: ControlEventHandler[TileLayer] | None = (
    None
)

Fires if an error occurs when fetching the tiles.

Event handler argument data property contains information about the error.

Edit this page