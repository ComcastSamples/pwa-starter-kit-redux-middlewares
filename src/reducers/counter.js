/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { INCREMENT, DECREMENT, FETCHING_NUMBER, FETCH_NUMBER_SUCCESS, FETCH_NUMBER_FAILURE } from '../actions/counter.js';

const INITIAL_STATE = {
  clicks: 0,
  value: 0,
  fact: "An interesting fact about the number to the left will appear here!",
  factStatus: "loaded",
};

const counter = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        clicks: state.clicks + 1,
        value: state.value + 1
      };
    case DECREMENT:
      return {
        ...state,
        clicks: state.clicks + 1,
        value: state.value - 1
      };
    case FETCHING_NUMBER:
      return {
        ...state,
        fact: "Loading the next number fact...",
        factStatus: "loading"
      };
    case FETCH_NUMBER_SUCCESS:
      return {
        ...state,
        fact: action.fact,
        factStatus: "loaded"
      };
    case FETCH_NUMBER_FAILURE:
      return {
        ...state,
        fact: "Unable to load number fact 😞",
        factStatus: "failure"
      };
    default:
      return state;
  }
};

export default counter;
