const Elm = require('./Main.elm')
const mountNode = document.getElementById('main')

let app

const port = chrome.runtime.connect({ name: 'broadcast' })

port.onMessage.addListener(state => {
  // mount app on first broadcast
  if (!app) {
    app = Elm.Main.embed(mountNode, state)
    return
  }
  app.ports.onState.send(state)
})

document.addEventListener('click', () => {
  chrome.runtime.sendMessage({ kind: 'clicked' })
})
