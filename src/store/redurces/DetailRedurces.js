const INITIAL_STATE = {
    type: '',
    time: 12,
    value: 2000,
    isModalOpen: false,
    details: {
        dataInicio: '10/08/1898',
        capitalInicial: 34567.11,
        montante: 12354.54,
        rentabilidade: 45687.45
    }
}

export default function DetailInfo(state = INITIAL_STATE, actions) {    
    if (actions.type === 'ADD_DETAIL_INVEST') {
        const { details } = actions;
        const newState = {
            ...state,
            details
        }
        return newState;
    }

    return state;

}