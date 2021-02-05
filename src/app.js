const path = require('path')
const express = require('express')
const fetchWeather = require('./utils/fetchWeather')

const app = express()
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')

/* Configure view */
app.set('view engine', 'ejs')
app.set('views', viewsPath)

/* Configure the static assets directory */
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kenny'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            errorMessage: 'You must provide an address'
        })
    }

    fetchWeather(address, (err, data) => {
        if (err) {
            return res.send({ errorMessage: err })
        }

        res.send({
            address,
            forecast: data
        })
    })


})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ errorMessage: 'You must provide a search term' })
    }
    res.send({ products: [] })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author: 'Kenny Delver'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        errorMessage: 'Article not found',
        title: 'Article 404'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        errorMessage: 'Page not found',
        title: '404 page'
    })
})

app.listen(3000, () => {
    console.log('servers is up on port 3000');
})