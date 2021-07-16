## Nugz-Firefighers

<p>A simple whitelisted job for firefighters written in Typescript/Javascript for the QBCore Framework.  Modify and extend for any other whitelisted job as desired.</p>

### Usage
1.  Clone repository into a local folder
2.  Open a command prompt, browse to the folder, then `npm install`
3.  Modify as desired (See `config.ts` for configuation options)

### While Developing

Use `npm run watch` to build the project on the fly while you are modifying.  Watch the output for warnings and errors.

### Putting into Production

1. Use `npm run build`.  This will build the client/server files and put them in the `dist/` directory.
2. Create a folder on your server `resources/nugz-firefighters`, or your preferred path
3. Upload the `fxmanifest.lua` file and `dist` folder into the `nugz-firefighters` directory
4. Add `start nugz-firefighters` to your resources.cfg file
5. Enjoy!

### Build Automatically (Optional, Not Recommended)

Due to the length of time it takes for the server to build the project with webpack/yarn, it's advised to NOT build this server side, but instead follow the instructions in 'Putting into Production' above.  However, if you'd rather:

1. `git clone` this repository into your `resources/folder-of-your-choice/nugz-firefighters`
2. cd into that directory and run `npm install`
3. Modify the `fxmanifest.lua` file and add:

```lua
dependency 'yarn'
dependency 'webpack'

webpack_config 'webpack.config.js'
```
4. Configure how you'd like `config.ts`
5. Restart your server

### Credits

- [FiveM TS Boilerplate](https://github.com/d0p3t/fivem-ts-boilerplate)
- [NativeUI in Javascript (Typescript Compatible)](https://github.com/PichotM/FiveM-NativeUI)
- [QBCore Framework](https://github.com/qbcore-framework)

### License

This resource is MIT licensed.  Please make sure you give proper credits and include this license.
