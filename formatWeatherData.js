module.exports = (data) => {
    const { daily } = data;
    const dates = daily.time;
    const highs = daily.temperature_2m_max;
    const lows = daily.temperature_2m_min;
    const days = [];
    // API is returning yesterday's data in position 0, so starting with today's data at position 1
    for (let i = 1; i < 6; i += 1) {
        days.push({
            date: dates[i],
            high: highs[i],
            low: lows[i],
        });
    }
    return days
}