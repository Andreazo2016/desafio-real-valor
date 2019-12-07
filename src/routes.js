import { Switch, Route } from 'react-router-dom';
import React from 'react';

import Home from './pages/Home';
import FormInvest from './components/FormInvest';
import Chart from './components/Chart';
import ChartBitcoin from './components/ChartBitcoin';

export default function Rotas () {
  return (
    <Switch>
        <Route path="/" exact  component={Home}/>
        <Route path="/form" component={FormInvest} />
        <Route path="/chart" component={Chart} />
        <Route path="/chartBitcoin" component={ChartBitcoin} />
    </Switch>
  );
}
