/**
 * @typedef {import('@volar/language-service').DataTransferItem} DataTransferItem
 * @typedef {import('@volar/language-service').ServicePlugin} ServicePlugin
 * @typedef {import('@volar/language-service').ServicePluginInstance<Provide>} ServicePluginInstance
 * @typedef {import('./commands.js').SyntaxToggle} SyntaxToggle
 */

/**
 * @typedef Commands
 * @property {SyntaxToggle} toggleDelete
 * @property {SyntaxToggle} toggleEmphasis
 * @property {SyntaxToggle} toggleInlineCode
 * @property {SyntaxToggle} toggleStrong
 */

/**
 * @typedef Provide
 * @property {() => Commands} mdxCommands
 */

// import path from 'node:path/posix'
// import {toMarkdown} from 'mdast-util-to-markdown'
// import {fromPlace} from 'unist-util-lsp'
// import {URI, Utils} from 'vscode-uri'
// import {createSyntaxToggle} from './commands.js'
// import {VirtualGtsCode} from './virtual-code.js'
import { ServicePlugin, ServicePluginInstance } from '@volar/language-service';

/**
 * Create an Volar service plugin for .gts files.
 *
 * Other services like MDX supports reporting diagnostics for parsing errors;
 * TODO: figure out what a .gts service needs to provde
 *
 * @returns {ServicePlugin}
 *   The Volar service plugin for MDX files.
 */
export function createGtsServicePlugin(): ServicePlugin {
  return {
    name: 'glimmer-ts-service',

    /**
     * @returns {ServicePluginInstance}
     */
    create(context): ServicePluginInstance {
      return {
        provide: {
          // mdxCommands() {
          //   return {
          //     toggleDelete: createSyntaxToggle(context, 'delete', '~'),
          //     toggleEmphasis: createSyntaxToggle(context, 'emphasis', '_'),
          //     toggleInlineCode: createSyntaxToggle(context, 'inlineCode', '`'),
          //     toggleStrong: createSyntaxToggle(context, 'strong', '**')
          //   }
          // }
        },

        // See ServicePluginInstance for all the hooks we can implement for a servie

        // async provideDocumentDropEdits(document, position, dataTransfer) { },

        // provideSemanticDiagnostics(document) { }
      };
    },
  };
}
