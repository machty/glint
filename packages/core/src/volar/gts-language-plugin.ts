// import remarkMdx from 'remark-mdx'
// import remarkParse from 'remark-parse'
// import {unified} from 'unified'
import { LanguagePlugin } from '@volar/language-core';
import { VirtualGtsCode } from './gts-virtual-code.js';

/**
 * Create a [Volar](https://volarjs.dev) language module to support GTS.
 */
export function createGtsLanguagePlugin(): LanguagePlugin {
  return {
    createVirtualCode(fileId, languageId, snapshot) {
      if (languageId === 'glimmer-ts') {
        return new VirtualGtsCode(snapshot);
      }
    },

    updateVirtualCode(fileId, virtualCode, snapshot) {
      (virtualCode as VirtualGtsCode).update(snapshot);
      return virtualCode;
    },

    typescript: {
      extraFileExtensions: [{ extension: 'gts', isMixedContent: true, scriptKind: 7 }],

      getScript(rootVirtualCode) {
        return {
          // hacky: assuming that the first embeddedCode is TS IR
          code: rootVirtualCode.embeddedCodes[0],
          extension: '.ts',
          scriptKind: 3, // TS
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
