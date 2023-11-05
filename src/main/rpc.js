const DiscordRPC = require('discord-rpc')
class RPC {
  constructor({ clientId }) {
    DiscordRPC.register(clientId)
    this.rpc = new DiscordRPC.Client({ transport: 'ipc' });
    this.onReady();
    this.rpc.login({ clientId }).catch(console.error)
  }
  onReady() {
    this.rpc.on('ready', () => {
      setInterval(() => {
        this.setActivity()
      }, 15e3)
    })
  }
  setActivity(details = "Смотри аниме комфортно :)", state = "Telegram channel: @aniship") {
    this.rpc.setActivity({
      details,
      state,
      largeImageKey: 'icon'
    })
  }
}
const rpc = new RPC({
  clientId: "979331521905307688"
});