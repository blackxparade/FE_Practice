Create a component structure like the following:

- app
    - overview
        - asset-card

1. From the overview.vue file pass somehow the following information to the asset-card
    - appId: string,
    - Pass somehow a function that will tell app.vue to show a global loader.
Criteria:
    - Pass the requried information with 2 different techniques (props/events,Slots)
    - Do not mix the implementations, create separate folders for the created component trees at the local scaffolding_base