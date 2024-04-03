const { contextBridge, ipcRenderer } = require("electron");
window.chunkLoadingGlobal={
    timeout:6000,
}
contextBridge.exposeInMainWorld("electronAPI", {
    on: (channel, callback) => {
        ipcRenderer.on(channel, callback);
    },
    send: (channel, args) => {
        ipcRenderer.send(channel, args);
    }
});