const { calculateIcon } = require('../weather')

describe('Weather icons test suit', () => {
  test('1. When (precipitation=0), partly icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 0
    }
    expect(calculateIcon(data)).toBe('partly-cloudy-day')
  })

  test('2. When (precipitation=2), drizzle icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 2
    }
    expect(calculateIcon(data)).toBe('drizzle')
  })

  test('3. When (precipitation=5), rain icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 5
    }
    expect(calculateIcon(data)).toBe('rain')
  })

  test('7. When (precipitation=0, snow_fraction=0), partly icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 0,
      snow_fraction: 0
    }
    expect(calculateIcon(data)).toBe('partly-cloudy-day')
  })

  test('8. When (precipitation=2, snow_fraction=0), drizzle icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 2,
      snow_fraction: 0
    }
    expect(calculateIcon(data)).toBe('drizzle')
  })

  test('9. When (precipitation=15, snow_fraction=0), rain icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 15,
      snow_fraction: 0
    }
    expect(calculateIcon(data)).toBe('rain')
  })

  test('10. When (precipitation=3, snow_fraction=1), sleet icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 3,
      snow_fraction: 1
    }
    expect(calculateIcon(data)).toBe('sleet')
  })

  test('11. When (precipitation=8, snow_fraction=2), snow icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 8,
      snow_fraction: 2
    }
    expect(calculateIcon(data)).toBe('snow')
  })

  test('12. When (precipitation=0, snow_fraction=2), partly icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 0,
      snow_fraction: 2
    }
    expect(calculateIcon(data)).toBe('partly-cloudy-day')
  })

  test('13. When (precipitation=0, cloud_fraction=0.2), clear skies icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 0,
      cloud_fraction: 0.2
    }
    expect(calculateIcon(data)).toBe('clear-day')
  })

  test('14. When (precipitation=0, cloud_fraction=0.5), partly cloudy icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 0,
      cloud_fraction: 0.5
    }
    expect(calculateIcon(data)).toBe('partly-cloudy-day')
  })

  test('15. When (precipitation=0, cloud_fraction=0.9), overcast icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 0,
      cloud_fraction: 0.9
    }
    expect(calculateIcon(data)).toBe('overcast-day')
  })

  test('16. When (precipitation=5, cloud_fraction=0.2), rain icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 5,
      cloud_fraction: 0.2
    }
    expect(calculateIcon(data)).toBe('rain')
  })

  test('17. When (precipitation=0, cloud_fraction=0.9, snow_fraction=2), overcast icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 0,
      cloud_fraction: 0.9,
      snow_fraction: 2
    }
    expect(calculateIcon(data)).toBe('overcast-day')
  })

  test('18. When (precipitation=NaN, cloud_fraction=0, snow_fraction=1, lightning=1), not-available icon appears', () => {
    const data = {
      isDay: true,
      cloud_fraction: 0,
      snow_fraction: 1,
      lightning: true
    }
    expect(calculateIcon(data)).toBe('not-available')
  })

  test('19. When (precipitation=NaN, cloud_fraction=NaN, snow_fraction=NaN, lightning=NaN), not-available icon appears', () => {
    const data = {}
    expect(calculateIcon(data)).toBe('not-available')
  })

  test('20. When (precipitation=4, cloud_fraction=NaN, snow_fraction=0, lightning=1), thunderstorms-rain icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 4,
      snow_fraction: 0,
      lightning: true
    }
    expect(calculateIcon(data)).toBe('thunderstorms-rain')
  })

  test('21. When (precipitation=NaN, cloud_fraction=0.9, snow_fraction=2), overcast icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 0,
      cloud_fraction: 0.9,
      snow_fraction: 2,
      lightning: false
    }
    expect(calculateIcon(data)).toBe('overcast-day')
  })

  test('22. When (isDay=0, precipitation=0, cloud_fraction=0.9, snow_fraction=0), overcast-night icon appears', () => {
    const data = {
      isDay: false,
      precipitation: 0,
      cloud_fraction: 0.9,
      snow_fraction: 0,
      lightning: false
    }
    expect(calculateIcon(data)).toBe('overcast-night')
  })

  test('23. When (precipitation=150, cloud_fraction=100, snow_fraction=1), overcast icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 150,
      cloud_fraction: 100,
      snow_fraction: 1,
    }
    expect(calculateIcon(data)).toBe('sleet')
  })

  test('24. When (precipitation=0, cloud_fraction=2, snow_fraction=1), not-available icon appears', () => {
    const data = {
      isDay: true,
      precipitation: 17000,
      cloud_fraction: 2,
      snow_fraction: 1,
    }
    expect(calculateIcon(data)).toBe('not-available')
  })

  test('25. When (precipitation=0, cloud_fraction=0, snow_fraction=0), not-available icon appears', () => {
    const data = {
      isDay: true,
      precipitation: -5,
      cloud_fraction: 0,
      snow_fraction: 0,
    }
    expect(calculateIcon(data)).toBe('not-available')
  })
})

