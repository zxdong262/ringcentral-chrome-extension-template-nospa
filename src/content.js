
/**
 * content.js for chrome extension
 */

import createApp from 'ringcentral-embeddable-extension-common/src/no-spa/init'
import * as config from './config'

window.addEventListener('load', createApp(config))

