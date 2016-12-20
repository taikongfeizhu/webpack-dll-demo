import React from 'react';
import { Route, IndexRoute } from 'react-router';
import NotFound from '../components/NotFound';
import { Main, Entry, EntryItem } from '../containers';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Entry}/>
    <Route path="entry" component={Entry}/>
    <Route path="entry/:id" components={EntryItem}/>
    <Route path="*" component={NotFound}/>
  </Route>
);
