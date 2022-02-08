import redux from "redux";

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

function buyCake() {
    return {
        type: BUY_CAKE,
        info: "First redux action"
    }
}

function buyIceCream() {
    return {
        type: BUY_ICECREAM
    }
}

// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// }

// const reducer = (state = initialState, action) => {

//     switch (action.type) {
//         case BUY_CAKE: {
//             return {
//                 ...state,
//                 numOfCakes: state.numOfCakes - 1
//             }
//         }

//         case BUY_ICECREAM: {
//             return {
//                 ...state,
//                 numOfIceCreams: state.numOfIceCreams - 1
//             }
//         }

//         default:
//             return state;
//     }
// }

const cakeInitialState = 10;
const iceCreamInitialState = 20;

const cakeReducer = (state = cakeInitialState, action) => {
    switch (action.type) {
        case BUY_CAKE: {
            return state - 1;
        }

        default:
            return state;
    }
}

const iceCreamReducer = (state = iceCreamInitialState, action) => {
    switch (action.type) {
        case BUY_ICECREAM: {
            return state - 1
        }

        default:
            return state;
    }
}

const roorReducer = combineReducers({
    numOfCakes: cakeReducer,
    numOfIceCreams: iceCreamReducer
})

const store = createStore(roorReducer);
console.log("Initial state => ", store.getState());

const unsubscribe = store.subscribe(() => {
    console.log("Updated state => ", store.getState());
})

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());

unsubscribe();