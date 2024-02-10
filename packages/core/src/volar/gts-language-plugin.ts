// import remarkMdx from 'remark-mdx'
// import remarkParse from 'remark-parse'
// import {unified} from 'unified'
import { LanguagePlugin } from '@volar/language-core';
import { VirtualGtsCode } from './gts-virtual-code.js';
import type * as ts from 'typescript';
import { loadConfig } from '../index.js';
import { ConfigLoader } from '../config/loader.js';
import { assert } from '../transform/util.js';
export type TS = typeof ts;

/**
 * Create a [Volar](https://volarjs.dev) language module to support GTS.
 */
export function createGtsLanguagePlugin(): LanguagePlugin {

  const loader = new ConfigLoader();

  return {
    createVirtualCode(fileId, languageId, snapshot) {
      if (languageId === 'glimmer-ts') {
        // TODO: are we using fileId correctly? Why did Volar standardize on file IDs rather
        // than paths, and how can I get ri of these `replace()` hacks?
        const filePath = fileId.replace('file://', '').replace('%40', '@');
        const glintConfig = loader.configForFile(filePath);
        assert(glintConfig, 'Glint config is missing');
        return new VirtualGtsCode(glintConfig, snapshot);
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
