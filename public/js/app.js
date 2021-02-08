const fetchWeather = (address, cb) => {
    const url = `/weather?address=${address}`

    fetch(url)
        .then(data => data.json())
        .then(data => {
            if (data.errorMessage) {
                cb(data.errorMessage, undefined);
            } else {
                cb(undefined, data)
            }
        })

}
const input = document.querySelector('input')
const form = document.querySelector('form')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


form.addEventListener('submit', (e) => {
    e.preventDefault()

    let location = input.value
    if (location) {
        message2.textContent = 'Loading...'
    }

    fetchWeather(location, (err, data) => {

        if (err) {
            message1.textContent = err
        } else {
            message2.textContent = data.forecast
        }
    })
    input.value = ''
    message1.textContent = ''
})