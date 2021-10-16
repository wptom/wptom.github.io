const amount1 = document.getElementById('amount1');
const amount2 = document.getElementById('amount2');
const currency = document.getElementById('currency');
const currencyOptions = document.getElementById('currency');
const bgImage = document.querySelector('.bg-image');

// Get currency rates from API
const getCurrencyRates = () => {

    fetch("https://api.kb.cz/openapi/v1/exchange-rates")
        .then(res => res.json())
        .then(data => {
            const currencyList = data[0].exchangeRates;
            currencyList.forEach((item) => {
                let option = document.createElement('option');
                option.text = item.currencyISO;
                option.setAttribute('data-country-iso', item.countryISO);
                option.setAttribute('data-middle', item.middle);
                option.setAttribute('data-currency-full-name', item.currencyFullName);
                currencyOptions.add(option);
            });

            console.log(data[0].exchangeRates[0]);
        });
}

// Calculate
function calculate(changedField) {
    let amount1Val = amount1.value;
    let amount2Val = amount2.value;
    let middleVal = currency.options[currency.selectedIndex].getAttribute('data-middle');
    let changedFieldId = changedField.id;

    if (changedFieldId === 'amount1') {
        amount2.value = (amount1Val * middleVal).toFixed(2);

    } else if (changedFieldId === 'amount2') {
        amount1.value = (amount2Val / middleVal).toFixed(2);

    } else if (changedFieldId === 'currency') {
        amount1.value = 0.00;
        amount2.value = 0.00;
        let countryISO = currency.options[currency.selectedIndex].getAttribute('data-country-iso').toLowerCase();
        bgImage.style.backgroundImage = "url('https://flagcdn.com/" + countryISO + ".svg')";

    }
}

amount1.addEventListener('keyup', () => calculate(amount1));
amount2.addEventListener('keyup', () => calculate(amount2));
currency.addEventListener('change', () => calculate(currency));

getCurrencyRates();
