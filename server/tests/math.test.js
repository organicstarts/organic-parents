test('Async test demo', (done) => {
    setTimeout(() => {
        expect(1).toBe(2)
    }, 2000)
})