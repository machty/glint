// import remarkMdx from 'remark-mdx'
// import remarkParse from 'remark-parse'
// import {unified} from 'unified'
import { LanguagePlugin } from '@volar/language-core';
import { VirtualMdxCode } from './virtual-code.js';
import { GtsGeneratedCode } from './gts-virtual-code.js';

/**
 * Create a [Volar](https://volarjs.dev) language module to support GTS.
 */
export function createGtsLanguagePlugin(): LanguagePlugin {
  return {
    createVirtualCode(fileId, languageId, snapshot) {
      if (languageId === 'gts') {
        return new GtsGeneratedCode(snapshot, processor, checkMdx, jsxImportSource);
      }
    },

    updateVirtualCode(fileId, virtualCode, snapshot) {
      virtualCode.update(snapshot);
      return virtualCode;
    },

    typescript: {
      extraFileExtensions: [{ extension: 'mdx', isMixedContent: true, scriptKind: 7 }],

      getScript(rootVirtualCode) {
        return {
          code: rootVirtualCode.embeddedCodes[0],
          extension: '.jsx',
          scriptKind: 2,
        };
      },

      resolveLanguageServiceHost(host) {
        return {
          ...host,
          getCompilationSettings: () => ({
            ...host.getCompilationSettings(),
            // Always allow JS for type checking.
            allowJs: true,
          }),
        };
      },
    },
  };
}
