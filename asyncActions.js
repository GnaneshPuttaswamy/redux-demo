import axios from "axios";
import redux from "redux";
import thunk from "redux-thunk";

const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = thunk.default;

const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';


const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}


const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}


const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case FETCH_USERS_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }

        case FETCH_USERS_SUCCESS: {
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: ""
            }
        }

        case FETCH_USERS_FAILURE: {
            return {
                ...state,
                users: [],
                loading: false,
                error: action.payload
            }
        }

        default:
            return state;
    }
}


const fetchUsers = () => {
    return function (dispatch) {

        dispatch(fetchUsersRequest());

        axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                const users = response.data.map(user => user.id);
                dispatch(fetchUsersSuccess(users));
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.message))
            })
    }
}

const store = createStore(appReducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch(fetchUsers());