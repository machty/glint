// import {
//   LanguageServerPlugin,
//   MessageType,
//   ShowMessageNotification,
// } from '@volar/language-server/node.js';
// // import { getLanguageModule } from './core';
// // import { getAstroInstall } from './utils.js';

// // import { create as createAstroService } from './plugins/astro.js';
// // import { create as createTypescriptAddonsService } from './plugins/typescript-addons/index.js';
// import { create as createTypeScriptService } from './plugins/typescript/index.js';

// // private glintConfig: GlintConfig,
// // private documents: DocumentCache,
// // private transformManager: TransformManager

// export const plugin: LanguageServerPlugin = (
//   initOptions,
//   modules
// ): ReturnType<LanguageServerPlugin> => {
//   return {
//     // TODO: Figure out how to defer registering these file extensions until the various Glint environments
//     // have been resolved and loaded; i.e. we don't want to register .gts files if the
//     // ember-template-imports environment isn't enabled. But this might not be possible given
//     // the order in which these things are registered/resolved in Volar.
//     extraFileExtensions: [
//       // Script Kind = 7 means "Deferred"
//       { extension: 'gts', isMixedContent: true, scriptKind: 7 },
//       { extension: 'gjs', isMixedContent: true, scriptKind: 7 },
//       { extension: 'hbs', isMixedContent: true, scriptKind: 7 },
//     ],
//     watchFileExtensions: ['js', 'ts', 'gts', 'gjs', 'hbs'],

//     // getServicePlugins() {
//     //   const ts = getTsLib();
//     //   const services = vue.resolveServices({}, ts, env => envToVueOptions.get(env)!);

//     //   return Object.values(services);
//     // },


//     // Resolve the configuration for the language server, which i think means for each file you open it'll
//     // find the nearest config for that file; it'll recurse upwards until it finds an ember app, etc.
// 		// IS THIS TRUE?? does it run for each file?? I THINK SO but it caches by TS config. One "project" per TS config
//     resolveConfig(config, ctx) {
//       // TODO: we need to resolve the tsconfig in order to find out the various template environments and custom extensions.
//       // i.e. only import .gts and .gjs if using the template environment.
//       // But not sure how to do that if we're already returning watchFileExtensions in hash above

//       config.languages ??= {};
//       if (ctx) {
//         // const nearestPackageJson = modules.typescript?.findConfigFile(
//         //   ctx.project.rootUri.fsPath,
//         //   modules.typescript.sys.fileExists,
//         //   'package.json'
//         // );
//         // // we are finding the installed Astro/Ember app
//         // const astroInstall = getAstroInstall([ctx.project.rootUri.fsPath], {
//         //   nearestPackageJson: nearestPackageJson,
//         //   readDirectory: modules.typescript!.sys.readDirectory,
//         // });
//         // if (astroInstall === 'not-found') {
//         //   ctx.server.connection.sendNotification(ShowMessageNotification.type, {
//         //     message: `Couldn't find Astro in workspace "${ctx.project.rootUri.fsPath}". Experience might be degraded. For the best experience, please make sure Astro is installed into your project and restart the language server.`,
//         //     type: MessageType.Warning,
//         //   });
//         // }
//         // // we take the astro/ember installation, pass it to getLanguageModule.
//         // // So that we can define a language module for "astro
//         // config.languages.astro = getLanguageModule(
//         //   typeof astroInstall === 'string' ? undefined : astroInstall,
//         //   modules.typescript!
//         // );
//         // config.languages.vue = getVueLanguageModule();
//         // config.languages.svelte = getSvelteLanguageModule();
//       }

//       // let documentCache = new DocumentCache(glintConfig);
//       // let transformManager = new TransformManager(glintConfig, documentCache);

// 			// TODO is this the right place to require typescript
// 			// const ts = require('typescript');
//       // Require doesn't work.

// 			// can we get configPath?
// 			// what is configInput?

// 			// let config = configInput ? new GlintConfig(ts, configPath, configInput) : null;
// 			// get GlintConfig so that we can
// 			// get DocumentCache and pass in stuff so that we can get
// 			// TransformManager



//       config.services ??= {
// 				// tsConfig is string to tsconfig or it's json of the cofig itself
//         // typescript: createTypeScriptService(ctx?.project?.tsConfig),
//         typescript: createTypeScriptService(),
//       };

//       // TODO: figure out exactly how we'll be process .gts files???
//       // is there a separate plugin?
//       // How does vue work? maybe look at vue language tools? Astro might be too confusing.

//       // Declare additional services that can enhance the language server's capabilities:
//       // config.services.html ??= createHtmlService();
//       // config.services.css ??= createCssService();
//       // config.services.emmet ??= createEmmetService();
//       // config.services.typescript ??= createTypeScriptService();
//       // config.services.typescripttwoslash ??= createTypeScriptTwoSlashService();
//       // config.services.typescriptaddons ??= createTypescriptAddonsService();
//       // config.services.astro ??= createAstroService();

//       if (ctx) {
//         // This is where Astro imports/configures its built-in Prettier plugin, in case
//         // we'd ever consider inlining Prettier within Glint.
//       }

//       return config;
//     },
//   };
// };
