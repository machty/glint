import {
  createConnection,
  createServer,
  createSimpleProjectProvider,
  createTypeScriptProjectProvider,
} from '@volar/language-server/node.js';

import { ServerProject, ServicePlugin } from '@volar/language-server';
// import * as vue2 from '@vue/language-core';
// import { VueCompilerOptions } from '@vue/language-core';
// import * as nameCasing from '@vue/language-service';
// import * as vue from '@vue/language-service';
// import * as componentMeta from 'vue-component-meta/out/base';
// import {
//   DetectNameCasingRequest,
//   GetComponentMeta,
//   GetConvertAttrCasingEditsRequest,
//   GetConvertTagCasingEditsRequest,
//   ParseSFCRequest,
// } from './protocol';
// import { VueInitializationOptions } from './types';
import { createSys } from '@volar/typescript';
import { assert } from '../cli/utils/assert.js';
import { createGtsServicePlugin } from '../volar/gts-service-plugin.js';

// import { create as createVueService } from './plugins/vue';

const connection = createConnection();
const server = createServer(connection);
// const checkers = new WeakMap<ServerProject, componentMeta.ComponentMetaChecker>();
// const envToVueOptions = new WeakMap<vue.ServiceEnvironment, VueCompilerOptions>();

connection.listen();

type InitializationOptions = {};

connection.onInitialize((params) => {
  const options: InitializationOptions = params.initializationOptions;
  const glintFileExtensions: string[] = ['gts'];

  // if (options.vue?.additionalExtensions) {
  //   for (const additionalExtension of options.vue.additionalExtensions) {
  //     glintFileExtensions.push(additionalExtension);
  //   }
  // }

  return server.initialize(
    params,
    // options.vue?.hybridMode ? createSimpleProjectProvider : createTypeScriptProjectProvider,

    // Use classic TS LS (takeover mode)
    createTypeScriptProjectProvider,
    {
      watchFileExtensions: [
        // 'js',
        // 'cjs',
        // 'mjs',
        // 'ts',
        // 'cts',
        // 'mts',
        // 'jsx',
        // 'tsx',
        // 'json',
        ...glintFileExtensions,
      ],
      getServicePlugins() {
        // What is a service plugin?

        // const ts = getTsLib();
        // const services = vue.resolveServices({}, ts, (env) => envToVueOptions.get(env)!);

        // return Object.values(services);

        const services: Record<string, ServicePlugin> = {};

        // services['gts'] = {

        // }

        return [];
      },
      async getLanguagePlugins(serviceEnv, projectContext) {
        const ts = server.modules.typescript;
        assert(ts, 'TypeScript module is missing');

        return [createGtsServicePlugin()];

        //   const ts = getTsLib();
        //   const [commandLine, vueOptions] = await parseCommandLine();
        //   const resolvedVueOptions = vue.resolveVueCompilerOptions(vueOptions);
        //   const languages = vue.resolveLanguages(
        //     {},
        //     ts,
        //     commandLine?.options ?? {},
        //     resolvedVueOptions,
        //     options.codegenStack
        //   );

        //   envToVueOptions.set(serviceEnv, resolvedVueOptions);

        //   return Object.values(languages);

        //   async function parseCommandLine() {
        //     let commandLine: vue2.ParsedCommandLine | undefined;
        //     let vueOptions: Partial<vue.VueCompilerOptions> = {};

        //     if (projectContext.typescript) {
        //       const sys = createSys(
        //         ts,
        //         serviceEnv,
        //         serviceEnv.uriToFileName(serviceEnv.workspaceFolder.toString())
        //       );
        //       let sysVersion: number | undefined;
        //       let newSysVersion = await sys.sync();

        //       while (sysVersion !== newSysVersion) {
        //         sysVersion = newSysVersion;
        //         if (projectContext.typescript.configFileName) {
        //           commandLine = vue2.createParsedCommandLine(
        //             ts,
        //             sys,
        //             projectContext.typescript.configFileName
        //           );
        //         }
        //         newSysVersion = await sys.sync();
        //       }
        //     }

        //     if (commandLine) {
        //       vueOptions = commandLine.vueOptions;
        //     }
        //     vueOptions.extensions = [
        //       ...(vueOptions.extensions ?? ['.vue']),
        //       ...glintFileExtensions.map((ext) => '.' + ext),
        //     ];
        //     vueOptions.extensions = [...new Set(vueOptions.extensions)];

        //     return [commandLine, vueOptions] as const;
        //   }
      },
    }
  );
});

connection.onInitialized(() => {
  server.initialized();
});

connection.onShutdown(() => {
  server.shutdown();
});

// connection.onRequest(ParseSFCRequest.type, (params) => {
//   return vue2.parse(params);
// });

// connection.onRequest(DetectNameCasingRequest.type, async (params) => {
//   const languageService = await getService(params.textDocument.uri);
//   if (languageService) {
//     return nameCasing.detect(
//       getTsLib(),
//       languageService.context,
//       params.textDocument.uri,
//       envToVueOptions.get(languageService.context.env)!
//     );
//   }
// });

// connection.onRequest(GetConvertTagCasingEditsRequest.type, async (params) => {
//   const languageService = await getService(params.textDocument.uri);
//   if (languageService) {
//     return nameCasing.convertTagName(
//       getTsLib(),
//       languageService.context,
//       params.textDocument.uri,
//       params.casing,
//       envToVueOptions.get(languageService.context.env)!
//     );
//   }
// });

// connection.onRequest(GetConvertAttrCasingEditsRequest.type, async (params) => {
//   const languageService = await getService(params.textDocument.uri);
//   if (languageService) {
//     const vueOptions = envToVueOptions.get(languageService.context.env);
//     if (vueOptions) {
//       return nameCasing.convertAttrName(
//         getTsLib(),
//         languageService.context,
//         params.textDocument.uri,
//         params.casing,
//         envToVueOptions.get(languageService.context.env)!
//       );
//     }
//   }
// });

// connection.onRequest(GetComponentMeta.type, async (params) => {
//   const project = await server.projects.getProject(params.uri);
//   const langaugeService = project.getLanguageService();

//   let checker = checkers.get(project);
//   if (!checker) {
//     checker = componentMeta.baseCreate(
//       getTsLib(),
//       langaugeService.context.language.typescript!.configFileName,
//       langaugeService.context.language.typescript!.projectHost,
//       envToVueOptions.get(langaugeService.context.env)!,
//       {},
//       langaugeService.context.language.typescript!.languageServiceHost.getCurrentDirectory() +
//         '/tsconfig.json.global.vue'
//     );
//     checkers.set(project, checker);
//   }
//   return checker?.getComponentMeta(langaugeService.context.env.uriToFileName(params.uri));
// });

function getTsLib() {
  const ts = server.modules.typescript;
  if (!ts) {
    throw 'typescript not found';
  }
  return ts;
}

async function getService(uri: string) {
  return (await server.projects.getProject(uri)).getLanguageService();
}
