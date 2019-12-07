import React from 'react';
import './Home.css'

import { connect } from 'react-redux';
import * as HomeActions from './../../store/actions/HomeActions';


function Home({ dispatch, history }) {

  const handleSubmitBitcon = () => {
    dispatch(HomeActions.chooseTypeInvestiments('Bitcoin'))
    history.push('/chartBitcoin');

  }
  const handleSubmitTesouro = () => {
    dispatch(HomeActions.chooseTypeInvestiments('Tesouro Direto pré-fixado'))
    history.push('/form');
  }


  return (
    <div className="home-container">
      <p>Qual deseja investir?</p>
      <div className="home-content">

        <button type="submit" className="bitconBtn"
          onClick={handleSubmitBitcon}
        >
          Bitcon
       </button>
        <button type="submit" className="tesouroBtn"
          onClick={handleSubmitTesouro}
        >
          Tesouro direto
       </button>

      </div>
    </div>

  );
}

export default connect()(Home)