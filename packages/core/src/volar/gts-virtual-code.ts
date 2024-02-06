/**
 * @typedef {import('@volar/language-service').CodeMapping} CodeMapping
 * @typedef {import('@volar/language-service').VirtualCode} VirtualCode
 * @typedef {import('estree').ExportDefaultDeclaration} ExportDefaultDeclaration
 * @typedef {import('estree').Program} Program
 * @typedef {import('mdast').Nodes} Nodes
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast-util-mdxjs-esm').MdxjsEsm} MdxjsEsm
 * @typedef {import('typescript').IScriptSnapshot} IScriptSnapshot
 * @typedef {import('unified').Processor<Root>} Processor
 * @typedef {import('vfile-message').VFileMessage} VFileMessage
 */

import { CodeMapping, VirtualCode } from '@volar/language-core';
import { IScriptSnapshot } from 'typescript';

/**
 * A Volar virtual code that contains some additional metadata for MDX files.
 */
export class VirtualGtsCode implements VirtualCode {
  snapshot: IScriptSnapshot;

  /**
   * The virtual files embedded in the GTS file. (such as <template>)
   */
  embeddedCodes = [];

  /**
   * The file ID.
   */
  id = 'gts';

  /**
   * The language ID.
   */
  languageId = 'gts';

  mappings: CodeMapping[] = [];

  constructor(snapshot: IScriptSnapshot) {
    this.snapshot = snapshot;
    this.update(snapshot);
  }

	// This gets called by the constructor and whenever the language server receives a file change event,
	// i.e. the user saved the file.
  update(snapshot: IScriptSnapshot) {
    this.snapshot = snapshot;
  //   const length = snapshot.getLength();
  //   this.mappings[0] = {
  //     sourceOffsets: [0],
  //     generatedOffsets: [0],
  //     lengths: [length],
  //     data: {
  //       completion: true,
  //       format: true,
  //       navigation: true,
  //       semantic: true,
  //       structure: true,
  //       verification: true,
  //     },
  //   };

  //   const gts = snapshot.getText(0, length);

  //   try {
  //     const ast = this.#processor.parse(gts);
  //     this.embeddedCodes = getEmbeddedCodes(gts, ast, this.#checkMdx, this.#jsxImportSource);
  //     this.ast = ast;
  //     this.error = undefined;
  //   } catch (error) {
  //     this.error = /** @type {VFileMessage} */ error;
  //     this.ast = undefined;
  //     this.embeddedCodes = [
  //       {
  //         embeddedCodes: [],
  //         id: 'jsx',
  //         languageId: 'javascriptreact',
  //         mappings: [],
  //         snapshot: new ScriptSnapshot(fallback),
  //       },
  //       {
  //         embeddedCodes: [],
  //         id: 'md',
  //         languageId: 'markdown',
  //         mappings: [],
  //         snapshot: new ScriptSnapshot(gts),
  //       },
  //     ];
  //   }
  }
}
