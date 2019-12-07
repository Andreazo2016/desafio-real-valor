export function chooseTypeInvestiments(investiment){
    return{
        type:'TYPE_INVESTIMENT',
        investiment
    }
}

export function chooseTimeAndValue(time,value){
    return{
        type:'INVESTIMENT_TIME_VALUE',
        time,
        value
    }
}

export function openCloseModal(openModal){
    return{
        type:'OPEN_CLOSE_MODAL',
        openModal
    }
}