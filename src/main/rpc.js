const DiscordRPC = require('discord-rpc')
const clientId = '979331521905307688'
DiscordRPC.register(clientId)

const rpc = new DiscordRPC.Client({ transport: 'ipc' })

function setActivity (v, nameAnime = 'Нет данных', series = 'Нет данных') {
  switch (v) {
  case 'default':
    rpc.setActivity({
      details: 'Telegram channel: @aniship',
      state: 'Смотри аниме комфортно :)',
      largeImageKey: 'icon'
      // largeImageText: 'tea is delicious',
      // smallImageKey: 'snek_small',
      // smallImageText: 'i am my own pillows',
    })
    break
  case 'watchAnime':
    rpc.setActivity({
      details: 'Смотрит аниме (' + series + ')',
      state: nameAnime,
      largeImageKey: 'icon',
      largeImageText: 'Смотрит: ' + nameAnime,
      smallImageText: 'Смотрит: ' + nameAnime
      // startTimestamp: 11111111111,
    })
    break
  }
}

rpc.on('ready', () => {
  setActivity('default')
  setInterval(() => {
    setActivity()
  }, 15e3)
})
rpc.login({ clientId }).catch(console.error)
