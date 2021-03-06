import * as Lab from '@hapi/lab'
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { Log } from '../../src/definitions/log'
import { getLogger } from '../../src/modules'

export const lab = Lab.script()
const describe = lab.describe
const it = lab.it
const before = lab.before
const expect = chai.expect

chai.use(sinonChai)

describe('getLogger', () => {
  describe('when creating a default logger', () => {
    let result: any
    before(() => {
      result = getLogger('euab:getLogger.test')
      result.log = sinon.spy()
    })

    it('the log function should not be called because DEBUG is not set', () => {
      result('will not log because DEBUG is not set')
      expect(result.log.notCalled)
    })
  })

  describe('when creating a custom logger', () => {
    describe('and the logger is a function', () => {
      const customLogger = sinon.spy()
      const logger: Log = {
        log: (message: string) => {
          customLogger(message)
        },
      }
      let result: any
      before(() => {
        result = getLogger('euab:getLogger.test', { logger })
      })

      it('the log function should be called with "this should log"', () => {
        result('this should log')
        expect(customLogger).to.be.calledWith('this should log')
      })
    })

    describe('and the logger is not a function', () => {
      const logger: Log = {
        // @ts-ignore
        log: 'I\'m not a logger',
      }
      let result: any
      before(() => {
        result = getLogger('euab:getLogger.test', { logger })
        result.log = sinon.spy()
      })

      it('the log function should not be called because DEBUG is not set', () => {
        result('will not log because DEBUG is not set')
        expect(result.log.notCalled)
      })
    })
  })
})
