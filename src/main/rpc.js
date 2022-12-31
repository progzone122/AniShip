const DiscordRPC = require('discord-rpc')
const clientId = '979331521905307688'
DiscordRPC.register(clientId)

const rpc = new DiscordRPC.Client({ transport: 'ipc' })

const setActivity = () => {
  rpc.setActivity({
    details: 'Telegram channel: @aniship',
    // state: 'Смотри аниме комфортно :)',
    state: 'Включён режим разработчика',
    largeImageKey: 'icon'
    // largeImageText: 'tea is delicious',
    // smallImageKey: 'snek_small',
    // smallImageText: 'i am my own pillows',
  })
}
rpc.on('ready', () => {
  setInterval(() => {
    setActivity()
  }, 15e3)
})
rpc.login({ clientId }).catch(console.error)
