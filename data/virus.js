const fetch = require('node-fetch')

async function getTotals() {
    const options = {
        headers: {
            "x-rapidapi-key": "c2ee026818msh6f337e34deb05c6p11ffa1jsn10861765f2fa"
        }
    }
    let data = await fetch("https://covid-19-data.p.rapidapi.com/totals", options)
    data = await data.json();
    console.log(`Total de infectados hoy mundialmente = ${data[0].confirmed}`);
    console.log(`Total de Recuperados hoy mundialmente = ${data[0].recovered}`);
    console.log(`Total de de estados criticos  = ${data[0].critical}`);
    console.log(`Muertes = ${data[0].deaths}`);
    console.log(`Ultimo cambio fue en  = ${new Date(data[0].lastChange).toLocaleString()}`)
    console.log(`Ultima actualizacion de datos fue en = ${new Date(data[0].lastUpdate).toLocaleString()}`)
    return data;
}

module.exports = {
    getTotals

}