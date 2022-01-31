1. Create a container component
2. Create two separate list like the following
    ![](.\store1.png)

3. Create somehow a reactive store which handles the separate lists.
    THe store should have the following
    States:
        - Items
    Getters:
        - Is empty
        - Is All selected
        - Is multiple selected
        - Selected item
        - Selected Items
    Actions:
        - Select all
        - Deselect all
        - Select item
        - Toggle item selection

4. At one of the lists, 1 item could be selected only.
5. At the other one multiple items could be selected.
6. For every List display the all of the relevant getters and make it possible to use the all of the relevant actions for them (either single item selection, or multiple item selection)