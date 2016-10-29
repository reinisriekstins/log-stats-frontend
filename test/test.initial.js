//mocha.setup({timeout: 3000})

describe('my first test suite', function () {

  before(() => {
    console.log('before')
  })

  beforeEach(() => {
    console.log('beforeEach')
  })

  it('should be true that 1 = 1', () => {
     expect(1).to.equal(1)
     console.log('test 1')
  })

  it('should be true that 2 = 2', () => {
     expect(2).to.equal(2)
     console.log('test 2')
  })

  it('is an asynchronous test', function (done) { 
    this.timeout(3000)
    setTimeout(() => {
      expect(1).to.equal(1)
     console.log('async done')
     done()
    }, 2500)
  })

  afterEach(() => {
    console.log('afterEach')
  })

  after(() => {
    console.log('after')
  })
})