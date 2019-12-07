import moment from 'moment';

export function dateFormattedChart(date){
    return moment(new Date(date).getTime() * 1000).format('MMMM D, YYYY')
}

export function moneyFormated(data){
    return 'R$ ' +  Number(data).toLocaleString('pt-BR');
}

export function brazilianDateFormated(date){
    return new Date(date).toLocaleDateString("pt-BR");
}

export function removeCurrency(currency){
    return Number(currency.replace(/[^0-9.-]+/g,""))
}