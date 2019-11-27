/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/* Saga code would typically be in a "sagas" folder but putting it here to show how the code changes */
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { sagaMiddleware } from '../store';
// end Saga intro code

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const FETCHING_NUMBER = 'FETCHING_NUMBER';
export const FETCH_NUMBER_SUCCESS = 'FETCH_NUMBER_SUCCESS';
export const FETCH_NUMBER_FAILURE = 'FETCH_NUMBER_FAILURE';

export const increment = () => {
  return {
    type: INCREMENT
  };
};

export const decrement = () => {
  return {
    type: DECREMENT
  };
};

export const fetchingNumber = () => {
  return {
    type: FETCHING_NUMBER,
  }
};

// Begin Sagas
const getCounter = state => state.counter;

function* fetchNumber() {
  try {
    yield put(fetchingNumber());
    let counter = yield select(getCounter);
    const number = counter.value;
    const data = yield call(() => {
      return fetch(`http://numbersapi.com/${number}?json`).then((response) => {
        return response.json()
      });
    });
    yield put(fetchNumberSuccess(data));
  } catch (error) {
    yield put(fetchNumberFailure(error));
  }
}

function* watchIncrementDecrement() {
  yield takeLatest([INCREMENT, DECREMENT], fetchNumber);
}

sagaMiddleware.run(watchIncrementDecrement);
// End Sagas

export const fetchNumberSuccess = (data) => {
  return {
    type: FETCH_NUMBER_SUCCESS,
    fact: data.text
  }
};

export const fetchNumberFailure = (error) => {
  return {
    type: FETCH_NUMBER_FAILURE,
    fact: error
  }
};
