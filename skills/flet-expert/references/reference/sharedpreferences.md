# SharedPreferences
URL: https://flet.dev/docs/services/sharedpreferences

ReferenceServicesSharedPreferences
SharedPreferences

Provides access to persistent key-value storage.

Inherits: Service

Methods
clear - Clears all keys and values.
contains_key - Checks if the given key exists.
get - Gets the value for the given key.
get_keys - Gets all keys with the given prefix.
remove - Removes the value for the given key.
set - Sets a value for the given key.
Examples​
Basic Example​
import flet as ft





async def main(page: ft.Page):

    async def set_value():

        await ft.SharedPreferences().set(store_key.value, store_value.value)

        get_key.value = store_key.value

        store_key.value = ""

        store_value.value = ""

        page.show_dialog(ft.SnackBar("Value saved to SharedPreferences"))



    async def get_value():

        contents = await ft.SharedPreferences().get(get_key.value)

        page.add(ft.Text(f"SharedPreferences contents: {contents}"))



    page.add(

        ft.SafeArea(

            content=ft.Column(

                controls=[

                    ft.Column(

                        [

                            ft.Row(

                                [

                                    store_key := ft.TextField(label="Key"),

                                    store_value := ft.TextField(label="Value"),

                                    ft.Button("Set", on_click=set_value),

                                ]

                            ),

                            ft.Row(

                                [

                                    get_key := ft.TextField(label="Key"),

                                    ft.Button("Get", on_click=get_value),

                                ]

                            ),

                        ],

                    )

                ],

            ),

        )

    )





if __name__ == "__main__":

    ft.run(main)

Methods​
deployed_code
clear
async
​
Copy
clear() -> bool

Clears all keys and values.

Returns:

bool - True if the preferences were cleared successfully, False otherwise.
deployed_code
contains_key
async
​
Copy
contains_key(key: str) -> bool

Checks if the given key exists.

Parameters:

key (str) - The key to check for existence.

Returns:

bool - True if the key exists, False otherwise.
deployed_code
get
async
​
Copy
get(key: str) -> SharedPreferencesValueType | None

Gets the value for the given key.

Parameters:

key (str) - The key to retrieve the value for.

Returns:

SharedPreferencesValueType | None - The value for the given key, or None if the key doesn't exist.
deployed_code
get_keys
async
​
Copy
get_keys(key_prefix: str) -> list[str]

Gets all keys with the given prefix.

Parameters:

key_prefix (str) - The prefix to filter keys by.

Returns:

list[str] - A list of keys that start with the given prefix.
deployed_code
remove
async
​
Copy
remove(key: str) -> bool

Removes the value for the given key.

Parameters:

key (str) - The key to remove.

Returns:

bool - True if the key was removed, False if the key didn't exist.
deployed_code
set
async
​
Copy
set(
    key: str, value: SharedPreferencesValueType
) -> bool

Sets a value for the given key.

NOTE

Due to limitations on Android, it is not possible to set values that start with any of the following: VGhpcyBpcyB0aGUgcHJlZml4IGZvciBhIGxpc3Qu, VGhpcyBpcyB0aGUgcHJlZml4IGZvciBCaWdJbnRlZ2Vy, and VGhpcyBpcyB0aGUgcHJlZml4IGZvciBEb3VibGUu.

Parameters:

key (str) - The key to store the value under.
value (SharedPreferencesValueType) - The value to store.

Returns:

bool - True if the value was set successfully, False otherwise.

Raises:

ValueError - If value is of an unsupported type (str, int, float, bool, and list[str]).
Edit this page