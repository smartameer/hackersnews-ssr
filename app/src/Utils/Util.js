export const agoTimeFormat = (commentedTs, suffix = 'ago') => {
    const periods = {
        years: 12 * 30 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000
    }

    const now = new Date()
    const diff = now.getTime() - (commentedTs * 1000)

    if (diff > periods.years) {
        return Math.floor(diff / periods.years) + ` years ${suffix}`
    } else if (diff > periods.month) {
        return Math.floor(diff / periods.month) + ` months ${suffix}`
    } else if (diff > periods.week) {
        return Math.floor(diff / periods.week) + ` weeks ${suffix}`
    } else if (diff > periods.day) {
        return Math.floor(diff / periods.day) + ` days ${suffix}`
    } else if (diff > periods.hour) {
        return Math.floor(diff / periods.hour) + ` hours ${suffix}`
    } else if (diff > periods.minute) {
        return Math.floor(diff / periods.minute) + ` minutes ${suffix}`
    }
    return 'Just now'
}
