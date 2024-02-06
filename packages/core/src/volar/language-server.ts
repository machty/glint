#!/usr/bin/env node

// import {
//   createMdxLanguagePlugin,
//   createMdxServicePlugin,
//   resolveRemarkPlugins
// } from '@mdx-js/language-service'
import {
  createConnection,
  createServer,
  createTypeScriptProjectProvider,
} from '@volar/language-server/node.js';
// import {loadPlugin} from 'load-plugin'
// import remarkFrontmatter from 'remark-frontmatter'
// import remarkGfm from 'remark-gfm'
// import {create as createMarkdownServicePlugin} from 'volar-service-markdown'
import { create as createTypeScriptServicePlugin } from 'volar-service-typescript';
import { createGtsServicePlugin } from './gts-service-plugin.js';
import { createGtsLanguagePlugin } from './gts-language-plugin.js';
import { assert } from '../transform/util.js';

// process.title = 'mdx-language-server'

/** @type {PluggableList} */
// const defaultPlugins = [[remarkFrontmatter, ['toml', 'yaml']], remarkGfm];
const connection = createConnection();
const server = createServer(connection);

connection.onInitialize((parameters) =>
  server.initialize(parameters, createTypeScriptProjectProvider, {
    watchFileExtensions: [
      // 'js',
      // 'ts',
      'gts',
      // 'ts',
    ],

    getServicePlugins() {
      assert(server.modules.typescript, 'TypeScript module is missing');

      // What is the difference between a createMdxServicePlugin and a createMdxLanguagePlugin?

      return [
        // createMarkdownServicePlugin({configurationSection: 'mdx.validate'}),
        createGtsServicePlugin(),
        createTypeScriptServicePlugin(server.modules.typescript),
      ];
    },

    async getLanguagePlugins(serviceEnvironment, projectContext) {
      const ts = server.modules.typescript;
      assert(ts, 'TypeScript module is missing');

      // const configFileName = projectContext?.typescript?.configFileName;

      // /** @type {PluggableList | undefined} */
      // let plugins
      // let checkMdx = false
      // let jsxImportSource = 'react'

      // if (configFileName) {
      //   const cwd = path.dirname(configFileName)
      //   const configSourceFile = ts.readJsonConfigFile(
      //     configFileName,
      //     ts.sys.readFile
      //   )
      //   const commandLine = ts.parseJsonSourceFileConfigFileContent(
      //     configSourceFile,
      //     ts.sys,
      //     cwd,
      //     undefined,
      //     configFileName
      //   )
      //   plugins = await resolveRemarkPlugins(
      //     commandLine.raw?.mdx,
      //     (name) =>
      //       /** @type {Promise<Plugin>} */ (
      //         loadPlugin(name, {prefix: 'remark', cwd})
      //       )
      //   )
      //   checkMdx = Boolean(commandLine.raw?.mdx?.checkMdx)
      //   jsxImportSource = commandLine.options.jsxImportSource || jsxImportSource
      // }

      return [createGtsLanguagePlugin()];
    },
  })
);

// connection.onRequest('mdx/toggleDelete', async (parameters) => {
//   const commands = await getCommands(parameters.uri)
//   return commands.toggleDelete(parameters)
// })

// connection.onRequest('mdx/toggleEmphasis', async (parameters) => {
//   const commands = await getCommands(parameters.uri)
//   return commands.toggleEmphasis(parameters)
// })

// connection.onRequest('mdx/toggleInlineCode', async (parameters) => {
//   const commands = await getCommands(parameters.uri)
//   return commands.toggleInlineCode(parameters)
// })

// connection.onRequest('mdx/toggleStrong', async (parameters) => {
//   const commands = await getCommands(parameters.uri)
//   return commands.toggleStrong(parameters)
// })

connection.onInitialized(() => {
  server.initialized();
});

connection.listen();

/**
 * @param {string} uri
 * @returns {Promise<Commands>}
 */
// async function getCommands(uri) {
//   const project = await server.projects.getProject(uri)
//   const service = project.getLanguageService()
//   return service.context.inject('mdxCommands')
// }
