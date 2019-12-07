import React, { useEffect, useCallback, useState } from 'react';
import './Chart.css'
import { connect } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import moment from 'moment';

import api from './../../service/api';
import * as Util from './../../Utils';
import ReactModal from './../../components/Modal';
import * as HomeActions from './../../store/actions/HomeActions';
import * as DetailActions from './../../store/actions/DetailActions';



function Chart({ type, time, InitialCapital, dispatch }) {

  const [data, setData] = useState([])
  const [isRender, setIsRender] = useState(0);



  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Data: ${Util.brazilianDateFormated(label)}`}</p>
          <p className="intro">{`valor: ${Util.moneyFormated(payload[0].value)}`}</p>
        </div>
      );
    }

    return null;
  };

  const rendimentoTesouro = () => {

    const dataInicio = moment().subtract(time, 'months').format('DD/MM/YYYY');
    const lastInvestiment = data[data.length - 1];
    const montante = lastInvestiment.valor;
    const rentabilidade = (Number(montante) - Number(InitialCapital));
    const details = {
      dataInicio,
      capitalInicial: InitialCapital,
      montante,
      rentabilidade
    }
    dispatch(DetailActions.addDetils(details));
  }

  const rendimentoBitcoin = () => {
    const qtdBitcoin = 2;
    const dataInicio = Util.brazilianDateFormated(data[0].date);
    const lastInvestiment = data[data.length - 1];
    const montante = lastInvestiment.valor;
    const rentabilidade = (Number(montante) * qtdBitcoin);
    const details = {
      dataInicio,
      capitalInicial: InitialCapital,
      montante,
      rentabilidade
    }
    dispatch(DetailActions.addDetils(details));

  }

  const handleClickLineChart = (e) => {
    rendimentoTesouro();
    dispatch(HomeActions.openCloseModal(true));
  }

  const calculateTesouroDireto = (tempo,capital) => {
     
    const taxaJuros = 10 / 12;
    const tempoAplicacao = tempo + 1;

    const montantes = [];
    for (let i = 1; i < tempoAplicacao; i++) {
      const taxa = Number.parseFloat(taxaJuros).toPrecision(1) / 100;

      const taxa_somada = Number(1) + Number(taxa);
      const multiplicao = Math.pow(taxa_somada, i);
      const juros_total = capital * multiplicao;

      montantes.push({ date: 'Mês ' + i, valor: juros_total, value: capital * 2 });
    }
    setData(montantes);
  }

  const calcTesouro = useCallback( async ()=> {
    const tempo = Number(time);
    const capital = InitialCapital;
    calculateTesouroDireto( tempo,capital);

  },[InitialCapital, time])

  useEffect(() => {
    calcTesouro();
    
  },[calcTesouro, isRender] );

  return (
    <div className="chart-container">
      <span>{type}</span>
      <div className="chart-content">
        <ReactModal />
        <LineChart
          width={700}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
          onClick={handleClickLineChart}
        >

          <CartesianGrid strokeDasharray="10 10" />
          <XAxis dataKey="date" />
          <YAxis dataKey="value" />
          <Tooltip content={<CustomTooltip />} />
          <Line name="Valor " type="linear" dataKey="valor" stroke="#1bce55" activeDot={{ r: 8 }} />
        </LineChart>

      </div>
      <div className="chart-info">
        <p>Eixo Y: Valores em R$</p>
        <p>Eixo x: Tempo de investimento</p>
      </div>
    </div>

  );
}


export default connect(state => ({ type: state.HomeRedurces.type, time: state.HomeRedurces.time, InitialCapital: state.HomeRedurces.value }))(Chart);
