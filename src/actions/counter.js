/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

/* Epic code would typically be in an "epics" folder but putting it here to show how the code changes */
import { combineEpics, ofType } from 'redux-observable';
import { withLatestFrom, switchMap, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of, concat } from 'rxjs';
import { epicMiddleware } from '../store';
// end Epic intro code

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

// Begin Epics
const fetchNumber = (action$, state$) => action$.pipe(
  ofType(INCREMENT, DECREMENT),
  withLatestFrom(state$),
  switchMap(([, state]) => {
    const counter = state.counter;
    const number = counter.value;

    return concat(
      of(fetchingNumber()),
      ajax.getJSON(`http://numbersapi.com/${number}?json`).pipe(
        map(response => fetchNumberSuccess(response)),
        catchError(error => of(fetchNumberFailure(error)))
      )
    );
  })
);

export const rootEpic = combineEpics(
  fetchNumber
);

epicMiddleware.run(rootEpic);
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
