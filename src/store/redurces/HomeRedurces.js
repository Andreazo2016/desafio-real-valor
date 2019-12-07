const INITIAL_STATE = {
    type:'',
    time:0,
    value:0,
    isModalOpen:false,
    details:{
        dataInicio:'10/08/1898',
        capitalInicial:34567.11,
        montante:12354.54,
        rentabilidade:45687.45
    }
}


export default function HomeInfo(state=INITIAL_STATE, actions){
    if( actions.type === 'TYPE_INVESTIMENT'){
        return { type: actions.investiment, time : state.time, value:state.value};
    }
    if( actions.type === 'INVESTIMENT_TIME_VALUE'){
        return { time: actions.time, value: actions.value, type : state.type}
    }
    if( actions.type === 'OPEN_CLOSE_MODAL'){
        const newValue =  { ...state, isModalOpen:actions.openModal}
        return newValue;
    }
    return state;
}