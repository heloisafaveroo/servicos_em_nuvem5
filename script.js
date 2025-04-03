const API_KEY = '7985d79bb7fd42368d17af51fbc0c9d3'; // Substitua pela sua chave de API real da Open Exchange Rates.
const API_URL = 'https://openexchangerates.org/api/latest.json';

const form = document.getElementById('currencyForm');
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const conversionResultDiv = document.getElementById('conversionResult');
const errorMessage = document.getElementById('errorMessage');
const result = document.getElementById('result');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const amount = amountInput.value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (amount && fromCurrency && toCurrency) {
        fetchConversionRate(amount, fromCurrency, toCurrency);
    } else {
        errorMessage.textContent = 'Por favor, preencha todos os campos.';
        result.textContent = ''; // Limpa o resultado anterior
    }
});

function fetchConversionRate(amount, fromCurrency, toCurrency) {
    const url = `${API_URL}?app_id=${API_KEY}&symbols=${fromCurrency},${toCurrency}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar dados da API: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados da API:', data); // Para depuração
            if (data.rates && data.rates[fromCurrency] && data.rates[toCurrency]) {
                const rateFrom = data.rates[fromCurrency];
                const rateTo = data.rates[toCurrency];
                const conversionRate = rateTo / rateFrom;
                const convertedAmount = (amount * conversionRate).toFixed(2);
                result.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
                errorMessage.textContent = ''; // Limpa mensagens de erro
            } else {
                throw new Error('Moeda não encontrada nos dados da API.');
            }
        })
        .catch(error => {
            console.error('Erro:', error); // Para depuração
            errorMessage.textContent = error.message;
            result.textContent = ''; // Limpa o resultado anterior
        });
}