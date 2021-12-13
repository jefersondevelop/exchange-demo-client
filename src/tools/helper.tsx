// Capitalize
export function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Format price
export function formatPrice(number: string) {
    const fnumber = parseFloat(number);
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(fnumber);
}

// Get wind direction
export function windDirection(degree: any) {
    const sectors = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];

    degree += 22.5;

    if (degree < 0) {
        degree = 360 - (Math.abs(degree) % 360);
    } else {
        degree = degree % 360;
    }

    const which = parseInt((degree / 45).toString(), 10);
    return sectors[which];
}

// Get stocks data
export async function getStocks(symbols: string) {
    let stocks = undefined;
    try {
        const stocks_call = await fetch(
            `//www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols=${symbols},&apikey=${process.env.REACT_APP_STOCKS_API_KEY}`
        )
            .then(res => {
                if (res.ok) {
                    return res;
                } else {
                    throw Error(`Request rejected with status ${res.status}`);
                }
            })
            .catch(console.error);

        if (stocks_call !== undefined) {
            stocks = await stocks_call.json();
        }

        return stocks;
    } catch (e) {
        return "";
    }
}

// Get weather data
export async function getWeather(city: string, country: string, days: string) {
    let forecast = undefined;
    try {
        const forecast_call = await fetch(
            `//api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&cnt=${days}&units=metric`
        )
            .then(res => {
                if (res.ok) {
                    return res;
                } else {
                    throw Error(`Request rejected with status ${res.status}`);
                }
            })
            .catch(console.error);

        if (forecast_call !== undefined) {
            forecast = await forecast_call.json();
        }

        return forecast;
    } catch (e) {
        return "";
    }
}

export function dateFormatWithMonthName(date: string): string {
    if (date != null) {
        let newDate = new Date(date)
        let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        let stringDate = (newDate.getDate()) + " de " + months[newDate.getMonth()] + " de " + newDate.getFullYear()
        return stringDate
    }
    return date
}