import React, { useState } from 'react';
import './FormInvest.css'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import { connect } from 'react-redux';
import * as HomeActions from './../../store/actions/HomeActions';
import * as Util from './../../Utils';

function FormInvest({ history, investiment, dispatch }) {

    const [value, setValue] = useState('');
    const [time, setTime] = useState('');

    const optionsTime = [
        '12', '24'
    ]
    const optionsMoney = [
        'R$ 10.000', 'R$ 2.000'
    ]

    const handleSelectTime = (data) => {
        const { value } = data;
        setTime(value);
    }
    const handleSelectMoney = (data) => {
        const { value } = data;
        setValue(value);
    }

    const handleSimulation = () => {
        dispatch(HomeActions.chooseTimeAndValue(time, (Util.removeCurrency(value) * 1000)));
        history.push('/chart')
    }

    return (
        <div className="form-container">

            <span> Tipo de investimento {investiment} </span>
            <div className="form-content">
                <span>Escolha o tempo de insvestimento</span>
                <Dropdown
                    options={optionsTime}
                    onChange={handleSelectTime}
                    value={time}
                    placeholder="Tempo de investimento em meses"
                />
                <span>Escolha o valor do investimento </span>
                <Dropdown
                    options={optionsMoney}
                    onChange={handleSelectMoney}
                    value={value}
                    placeholder="Valor do investimento"
                />
                <button onClick={handleSimulation}>Simular</button>
            </div>

        </div>
    );
}

export default connect(state => ({ investiment: state.HomeRedurces.type }))(FormInvest)
