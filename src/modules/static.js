import moment from 'moment'

export const classFormats = [
    {
        title: '30 Minutes',
        format: 30,
        index: 0
    },
    {
        title: '45 Minutes',
        format: 45,
        index: 1
    },
    {
        title: '60 Minutes',
        format: 60,
        index: 2
    },
    {
        title: '90 Minutes',
        format: 90,
        index: 3
    }
]
export const getHourArray = ()  => {
    let date = moment()
    let hour = date.startOf('day').add(12, 'hours')
    let output = []
    do {
        let item = hour.format('HH:mm')
        output.push(item)
        hour.add(30, 'minutes')
    } while (hour.format('HH') <= 18)
    return output
}