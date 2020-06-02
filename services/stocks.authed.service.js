const knex = require('../database/db')

module.exports = {
    findAuthedSymbolsOnly,
    findAuthedSymbolsByStartDate,
    findAuthedSymbolsByEndDate,
    findAuthedSymbolBetweenDates
}

async function findAuthedSymbolsOnly(symbol) {
    let stocks;
    stocks = await knex.from("stocks").select("timestamp", "symbol", "name", "industry", "open", "high", "low", "close", "volumes").where('symbol', '=', symbol).distinct().limit(1)
    if (stocks.length === 0) {
        throw {
            error: true,
            status: 404,
            message: "No entry for symbol in stocks database"
        }
    }
    return stocks
}

async function findAuthedSymbolsByStartDate(symbol, fromDate) {
    let stocks;
    if (fromDate.length !== 10) {
        throw {
            error: true,
            status: 400,
            message: "From date cannot be parsed by Date.parse()"
        }
    } else if (fromDate[8] > 3) {
        throw {
            error: true,
            status: 400,
            message: "From date cannot be parsed by Date.parse()"
        }
    } else {
        stocks = await knex.from("stocks").select("timestamp", "symbol", "name", "industry", "open", "high", "low", "close", "volumes").where('symbol', '=', symbol).andWhere('timestamp', '>=', fromDate).distinct().orderBy('timestamp')
        if (stocks.length === 0) {
            throw {
                error: true,
                status: 404,
                message: "No entries available for query symbol for supplied date range"
            }
        }
    }
    return stocks
}

async function findAuthedSymbolsByEndDate(symbol, toDate) {
    let stocks;
    if (toDate.length !== 10) {
        throw {
            error: true,
            status: 400,
            message: "From date cannot be parsed by Date.parse()"
        }
    } else if (toDate[8] > 3) {
        throw {
            error: true,
            status: 400,
            message: "To date cannot be parsed by Date.parse()"
        }
    } else {
        stocks = await knex.from("stocks").select("timestamp", "symbol", "name", "industry", "open", "high", "low", "close", "volumes").where('symbol', '=', symbol).andWhere('timestamp', '<=', toDate).distinct().orderBy('timestamp')
        if (stocks.length === 0) {
            throw {
                error: true,
                status: 404,
                message: "No entries available for query symbol for supplied date range"
            }
        }
    }
    return stocks
}

async function findAuthedSymbolBetweenDates(symbol, fromDate, toDate) {
    let stocks;
    if (fromDate.length !== 10 || fromDate[8] > 3) {
        throw {
            error: true,
            status: 400,
            message: "From date cannot be parsed by Date.parse()"
        }
    } else if (toDate.length !== 10 || toDate[8] > 3) {
        throw {
            error: true,
            status: 400,
            message: "To date cannot be parsed by Date.parse()"
        }
    } else {
        stocks = await knex.from("stocks").select("timestamp", "symbol", "name", "industry", "open", "high", "low", "close", "volumes").whereBetween('timestamp', [fromDate, toDate]).andWhere('symbol', '=', symbol).distinct()
        if (stocks.length === 0) {
            throw {
                error: true,
                status: 404,
                message: "No entries available for query symbol for supplied date range"
            }
        }
    }
    return stocks
}