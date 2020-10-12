# WanchainMask Inpage Provider

The inpage Wanchain provider object injected by WanchainMask into web pages.
Contains a lot of implementation details specific to WanchainMask, and is probably
not suitable for out-of-the-box use with other wallets.

## Installation

`yarn add @wanchainmask/inpage-provider`

## Usage

```javascript
import { initProvider } from '@wanchainmask/inpage-provider'

// Create a stream to a remote provider:
const wanchainMaskStream = new LocalMessageDuplexStream({
  name: 'inpage',
  target: 'contentscript',
})

// this will initialize the provider and set it as window.wanchain
initProvider({
  connectionStream: wanchainMaskStream,
})

const { wanchain } = window
```

### Do Not Modify the Provider

The Provider object should not be mutated by consumers under any circumstances.
The maintainers of this package will neither fix nor take responsbility for bugs caused by third parties mutating the provider object.
