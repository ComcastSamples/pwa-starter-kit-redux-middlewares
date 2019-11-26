/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { html } from 'lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { incrementAndFetchFact, decrementAndFetchFact } from '../actions/counter.js';

// We are lazy loading its reducer.
import counter from '../reducers/counter.js';
store.addReducers({
  counter
});

// These are the elements needed by this element.
import './counter-element.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class MyView2 extends connect(store)(PageViewElement) {
  static get properties() {
    return {
      // This is the data from the store.
      _clicks: { type: Number },
      _value: { type: Number },
      _fact: { type: String }
    };
  }

  static get styles() {
    return [
      SharedStyles
    ];
  }

  render() {
    return html`
      <section>
        <h2>Redux example: Async API Call</h2>
        <div class="container">
          <div class="circle">${this._value}</div>
          <div class="fact">
            <p id="fact" class="${this._factStatus}">${this._fact}</p>
          </div>
        </div>
        <p>This page contains a reusable <code>&lt;counter-element&gt;</code>. The
        element is not built in a Redux-y way, but this page is connected to the
        Redux store and the display of the number fact from the
        <a href="http://numbersapi.com/">Numbers API</a> is Redux-y! When the element
        updates its counter, this page updates the values in the Redux store, and you
        can see the current value of the counter reflected in the bubble above and an
        associated fact when the API returns.</p>
        <br><br>
      </section>
      <section>
        <p>
          <counter-element
              value="${this._value}"
              clicks="${this._clicks}"
              @counter-incremented="${this._counterIncremented}"
              @counter-decremented="${this._counterDecremented}">
          </counter-element>
        </p>
      </section>
    `;
  }

  _counterIncremented() {
    store.dispatch(incrementAndFetchFact());
  }

  _counterDecremented() {
    store.dispatch(decrementAndFetchFact());
  }

  // This is called every time something is updated in the store.
  stateChanged(state) {
    this._clicks = state.counter.clicks;
    this._value = state.counter.value;
    this._fact = state.counter.fact;
    this._factStatus = state.counter.factStatus;
  }
}

window.customElements.define('my-view2', MyView2);
