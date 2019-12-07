import React, { useEffect, useCallback, useState } from 'react';
import './ChartBitcoin.css'
import { connect } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import moment from 'moment';

import api from './../../service/api';
import * as Util from './../../Utils';
import ReactModal from './../../components/Modal';
import * as HomeActions from './../../store/actions/HomeActions';
import * as DetailActions from './../../store/actions/DetailActions';


function Chart({ type, time, InitialCapital, dispatch }) {

  const [data, setData] = useState([])

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


  const rendimentoBitcoin = () => {
    const qtdBitcoin = 1;
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
    rendimentoBitcoin();
    dispatch(HomeActions.openCloseModal(true));
  }

  useEffect(() => {
    const getDataFromApi = async () => {
  
      const oneYearLast = moment().subtract(365, 'days').format('YYYY-MM-DD');
      const toDay = moment().format('YYYY-MM-DD');
  
      const response = await api.get(`/historical/close.json?start=${oneYearLast}&end=${toDay}`)
      const { bpi } = response.data;
  
      console.log(bpi);
  
      const array_of_date = Object.entries(bpi);
  
      const values = array_of_date.map(bitcoin => {
  
        return { date: Util.brazilianDateFormated(bitcoin[0]), valor: bitcoin[1], value: 20000 }
  
      })
  
      console.log(values);
      setData(values);
  
    }
      getDataFromApi();
   
  }, []);

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
