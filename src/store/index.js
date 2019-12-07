import { createStore } from 'redux';

import rootReducer from './redurces';

const store = createStore(rootReducer);

export default store;