import React from 'react';
import './Details.css';
import { connect } from 'react-redux';
import * as Util from './../../../../Utils/index';

function Details({ details }) {
  return (
    
    <div className="detail-container">
      <div className="detail-content">
        <span>Detalhes do investimento</span>
        <div className="detail-info">
          <p><b>Dia de inicio:</b> { `${details.dataInicio}`}</p>
          <p><b>Valor total inicial:</b> {`${Util.moneyFormated(details.capitalInicial)}`}</p>
          <p><b>Valor total hoje:</b> {`${ Util.moneyFormated(details.montante)}`}</p>
          <p><b>Rentabilidade acumulada: </b> {`${Util.moneyFormated(details.rentabilidade)}`}</p>
        </div>
      </div>

    </div>
  );
}

export default connect(state => ({ details: state.DetailInfo.details }))(Details)