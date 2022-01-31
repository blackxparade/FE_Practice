Create a component structure like the following:

- app
    - overview
        - asset-card
            - linked-asset-widet
                - link-assets-modal



1. From the app.vue file pass somehow the following information to the link-asset-modal
    - appId: string,
    - Pass somehow a function that will tell app.vue to show a global loader.
Criteria:
    - Pass the requried information with 4 different techniques (Singleton, Injection, Waterfall-props/events,Slots, Nested Slots)
    - Do not mix the implementations, create separate folders for the created component trees at the local scaffolding_base