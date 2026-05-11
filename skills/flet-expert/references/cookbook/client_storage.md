# Client Storage
URL: https://flet.dev/docs/cookbook/client-storage

CookbookClient Storage
Client Storage

Flet's client storage API allows storing key-value data on a client side in a persistent storage. Flet implementation uses shared_preferences Flutter package.

The actual storage mechanism depends on a platform where Flet app is running:

Web - Local storage.
Desktop - JSON file.
iOS - NSUserDefaults.
Android - SharedPreferences.

Writing data to the storage:

# strings

await page.shared_preferences.set("key", "value")



# numbers, booleans

await page.shared_preferences.set("number.setting", 12345)

await page.shared_preferences.set("bool_setting", True)



# lists

await page.shared_preferences.set("favorite_colors", ["red", "green", "blue"])

NOTE

Each Flutter application using shared_preferences plugin has its own set of preferences. As the same Flet client (which is a Flutter app) is used to run UI for multiple Flet apps any values stored in one Flet application are visible/available to another Flet app running by the same user.

To distinguish one application settings from another it is recommended to use some unique prefix for all storage keys, for example {company}.{product}.. For example to store auth token in one app you could use acme.one_app.auth_token key and in another app use acme.second_app.auth_token.

CAUTION

It is responsibility of Flet app developer to encrypt sensitive data before sending it to a client storage, so it's not read/tampered by another app or an app user.

Reading data:

# The value is automatically converted back to the original type

value = await page.shared_preferences.get("key")



colors = await page.shared_preferences.get("favorite_colors")

# colors = ["red", "green", "blue"]


Check if a key exists:

await page.shared_preferences.contains_key("key") # True if the key exists


Get all keys:

await page.shared_preferences.get_keys("key-prefix.")


Remove a value:

await page.shared_preferences.remove("key")


Clear the storage:

await page.shared_preferences.clear()

CAUTION

clear() is a dangerous function that removes all preferences of all Flet apps ever run by the same user and serves as a heads-up that permanent application data shouldn't be stored in the client storage.

Edit this page