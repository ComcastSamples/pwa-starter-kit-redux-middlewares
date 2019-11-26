/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

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

export const incrementAndFetchFact = () => {
  return (dispatch, getState) => {
    const { counter } = getState();
    dispatch(fetchNumber(counter.value+1));
    dispatch(increment());
  };
};

export const decrement = () => {
  return {
    type: DECREMENT
  };
};

export const decrementAndFetchFact = () => {
  return (dispatch, getState) => {
    const { counter } = getState();
    dispatch(fetchNumber(counter.value-1));
    dispatch(decrement());
  };
};

export const fetchingNumber = () => {
  return {
    type: FETCHING_NUMBER,
  }
};

export const fetchNumber = (number) => {
  return (dispatch) => {
    dispatch(fetchingNumber()),
    fetch(`http://numbersapi.com/${number}?json`).then((response) => {
      response.json().then((data) => {
        dispatch(fetchNumberSuccess(data))
      }).catch((error) => dispatch(fetchNumberFailure(error)))
    }).catch((error) => dispatch(fetchNumberFailure(error)))
  };
};

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
