import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import doctorReducer from "./reducers/doctorReducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import patientReducer from "./reducers/patientReducer";

const initialState = {};

const middleware = [thunk];

const doctorPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["userDetail", "isDetailfillled", "isDoctor"],
};
const patientPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["userDetail", "isDoctor"],
};

const reducers = combineReducers({
  doctor: persistReducer(doctorPersistConfig, doctorReducer),
  patient: persistReducer(patientPersistConfig, patientReducer),
  // doctor: doctorReducer,
  // patient: patientReducer,
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(reducers, initialState, enhancer);
const persistor = persistStore(store);

export { store, persistor };