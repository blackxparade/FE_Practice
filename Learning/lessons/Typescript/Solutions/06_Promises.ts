
/* Check readme how to run ts code */

/*
    ------- 1  --------
    Add types where you can
    Use Generic for the Promise Type
    Rewrite the promise chain to async / await
*/

function Item({ unid = Math.floor(Math.random() * 100), name, type }) {
    return {
        unid,
        name,
        type,
    }
}
const car = Item({ name: 'car', type: 'asset'});
const boiler = Item({ name: 'boiler', type: 'asset'});

const mockItems = [car, boiler];

const api = { getAssets: () => (Promise.resolve(mockItems)) }

function fetchAssets({ getAssets }) {
    return getAssets();
}

let items;

// fetchAssets().then((returnedItems) => {
//     items = returnedItems
//     console.log('fetched items ', items);
// })

// i have 0 idea if it works or not, could not test it
// i did the next task here as well -> error handling
const asyncFetchAssets = async (): Promise<ReturnType<typeof Item>> => {
    try {
        const response = await api.getAssets(); // why can't i reach getAssets() without api from here? 
        items = response;
        return items;
    } catch (error) {
        if (error) {
            return error.message
        }
    }
}


/*
    ------- 2  --------
    Use Generic for the Promise Type
    Rewrite the promise chain to async / await
    Catch error as well
*/
// const api = { getAssets: () => (Promise.reject(new Error('error'))) }

// function fetchAssets({ getAssets }) {
//     return getAssets();
// }

// let itemsError;

// fetchAssets().catch((error) => {
//     console.log('error occured ', error);
// })