import { createStore, combineReducers, compose } from "redux";

const { NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === "development";

const reducers = {
  spaceData: (
    state = {
      value: "",
      counter: 0,
      columnWidth: 0,
      rowsCapsules: [],
    },
    action
  ) => {
    const { type } = action;
    switch (type) {
      case "counter/incremented":
        return { ...state, counter: action.payload };
      case "value/changed":
        return { ...state, value: action.payload };
      case "columnWidth/changed":
        return { ...state, columnWidth: action.payload };
      case "rowsCapsules/changed":
        return { ...state, rowsCapsules: action.payload };
      default:
        return state;
    }
  },
};

const slices = combineReducers({ ...reducers });

const composeEnhancers =
  isDevelopment && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })
    : compose;

const store = createStore(slices, composeEnhancers());

export default store;
