import { Options } from '../definitions/options'
import { getLogger } from './'

/**
 * Builds the regex to test UAs against
 * @param {string[]} userAgentToBlock - one or more (partial) User Agent strings to block
 * @param {Options} [options] - optional options which may contain custom log function
 * @return {RegExp|null} the regex to test against, or null if invalid input provided
 */
const buildUaBlockRegex = (userAgentToBlock: string[], options?: Options): RegExp | null => {
  const log: any = getLogger('euab:buildUaBlockRegex', options)

  if (userAgentToBlock.join('').trim().length > 0) {
    const blockRegex = new RegExp(`^.*(${userAgentToBlock.join('|').toLowerCase()}).*$`)
    log(`created blocked regex: ${blockRegex}`)
    return blockRegex
  }

  log(`!!! could not create regex from '${userAgentToBlock}' - middleware will call 'next' on all requests`)
  return null
}

export {buildUaBlockRegex}
