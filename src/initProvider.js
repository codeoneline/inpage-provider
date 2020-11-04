const WanMaskInpageProvider = require('./WanMaskInpageProvider')

/**
 * Initializes a WanMaskInpageProvider and (optionally) assigns it as window.wanchain.
 *
 * @param {Object} options - An options bag.
 * @param {Object} options.connectionStream - A Node.js stream.
 * @param {number} options.maxEventListeners - The maximum number of event listeners.
 * @param {boolean} options.shouldSendMetadata - Whether the provider should send page metadata.
 * @param {boolean} options.shouldSetOnWindow - Whether the provider should be set as window.wanchain
 * @returns {WanMaskInpageProvider | Proxy} The initialized provider (whether set or not).
 */
function initProvider ({
  connectionStream,
  maxEventListeners = 100,
  shouldSendMetadata = true,
  shouldSetOnWindow = true,
} = {}) {

  let provider = new WanMaskInpageProvider(
    connectionStream, { shouldSendMetadata, maxEventListeners },
  )

  provider = new Proxy(provider, {
    deleteProperty: () => true, // some libraries, e.g. web3@1.x, mess with our API
  })

  if (shouldSetOnWindow) {
    setGlobalProvider(provider)
  }

  return provider
}

/**
 * Sets the given provider instance as window.wanchain and dispatches the
 * 'wanchain#initialized' event on window.
 *
 * @param {WanMaskInpageProvider} providerInstance - The provider instance.
 */
function setGlobalProvider (providerInstance) {
  window.wanchain = providerInstance
  window.dispatchEvent(new Event('wanchain#initialized'))
}

module.exports = {
  initProvider,
  setGlobalProvider,
}
