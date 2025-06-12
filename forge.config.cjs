module.exports = {
  packagerConfig: {
    asar: true,
    icon: './app_icon.ico',
    executableName: 'NoteGame'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'NoteGame',
        setupIcon: './app_icon.ico'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['win32']
    }
  ]
};
