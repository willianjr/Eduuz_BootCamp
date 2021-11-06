import shortid from 'shortid'

describe.skip('Generete Hash', () => {
	test('É possivel gerar um hash id', async () => {
		const hash = await shortid.generate()

		expect(hash.length).toBeGreaterThan(0)
		expect(hash).toBeDefined()
	})
})
