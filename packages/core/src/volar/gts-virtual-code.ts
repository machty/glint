import { CodeMapping, VirtualCode } from '@volar/language-core';
import { IScriptSnapshot } from 'typescript';
import { ScriptSnapshot } from './script-snapshot.js';
import type * as ts from 'typescript';
import { rewriteModule } from '../transform/index.js';
import { GlintConfig } from '../index.js';
export type TS = typeof ts;

/**
 * A Volar virtual code that contains some additional metadata for MDX files.
 */
export class VirtualGtsCode implements VirtualCode {
  /**
   * The virtual files embedded in the GTS file. (such as <template>)
   */
  embeddedCodes: VirtualCode<string>[] = [];

  /**
   * The file ID.
   */
  id = 'gts';

  mappings: CodeMapping[] = [];

  constructor(
    private glintConfig: GlintConfig,
    public snapshot: IScriptSnapshot,
    public languageId: 'glimmer-ts' | 'glimmer-js'
  ) {
    this.update(snapshot);
  }

  // This gets called by the constructor and whenever the language server receives a file change event,
  // i.e. the user saved the file.
  update(snapshot: IScriptSnapshot) {
    this.snapshot = snapshot;
    const length = snapshot.getLength();

    // Define a single mapping for the root virtual code (the .gts file).
    // The original MDX docs describe the root virtual code mappings are as:
    //
    // > The code mappings of the MDX file. There is always only one mapping.
    //
    // I guess it's some "identity" mapping that describes the whole file? I don't know.
    this.mappings[0] = {
      sourceOffsets: [0],
      generatedOffsets: [0],
      lengths: [length],
      data: {
        completion: true,
        format: true,
        navigation: true,
        semantic: true,
        structure: true,
        verification: true,
      },
    };

    const contents = snapshot.getText(0, length);

    let script = { filename: 'disregard.gts', contents };
    let template = undefined;

    // template is not specified for .gts files
    // let template = templatePath
    //   ? {
    //       filename: templatePath,
    //       contents: documents.getDocumentContents(templatePath, encoding),
    //     }
    //   : undefined;

    // rewrite
    const transformedModule = rewriteModule(
      this.glintConfig.ts,
      { script, template },
      this.glintConfig.environment
    );

    if (transformedModule) {
      // let a = null;
      // let s = transformedModule.toDebugString();
      // let b = 123;

      this.embeddedCodes = [
        {
          embeddedCodes: [],
          id: 'ts',
          languageId: 'typescript',
          mappings: transformedModule.toVolarMappings(),
          snapshot: new ScriptSnapshot(transformedModule.transformedContents),
        },
      ];
      let asd = null;
    } else {
      // Null transformed module means there's no embedded HBS templates,
      // so just return a full "no-op" mapping from source to transformed.
      this.embeddedCodes = [
        {
          embeddedCodes: [],
          id: 'ts',
          languageId: 'typescript',
          mappings: [
            // The Volar mapping that maps all TS syntax of the MDX file to the virtual TS file.
            // So I think in the case of a Single-File-Component (1 <template> tag surrounded by TS),
            // You'll end up with 2 entries in sourceOffets, representing before the <template> and after the </template>.
            {
              // sourceOffsets: [],
              // generatedOffsets: [],
              // lengths: [],

              // Hacked hardwired values for now.
              sourceOffsets: [0],
              generatedOffsets: [0],
              lengths: [length],

              data: {
                completion: true,
                format: false,
                navigation: true,
                semantic: true,
                structure: true,
                verification: true,
              },
            },
          ],
          snapshot: new ScriptSnapshot(contents),
        },
      ];
    }

    // const gts = snapshot.getText(0, length);

    // // Processor parses the text file into GTS.
    // // In our case, that would be... not sure; somethign that parses .gts and strips <template>. Maybe look for <template>?
    // // Processor returns an AST and then getEmbeddedCodes must split it out.

    // try {
    //   const ast = this.#processor.parse(gts);
    //   this.embeddedCodes = getEmbeddedCodes(gts, ast, this.#checkMdx, this.#jsxImportSource);
    //   this.ast = ast;
    //   this.error = undefined;
    // } catch (error) {
    //   this.error = /** @type {VFileMessage} */ error;
    //   this.ast = undefined;
    //   this.embeddedCodes = [
    //     {
    //       embeddedCodes: [],
    //       id: 'jsx',
    //       languageId: 'javascriptreact',
    //       mappings: [],
    //       snapshot: new ScriptSnapshot(`/* Glint: fallback code in case of error */`),
    //     },
    //     {
    //       embeddedCodes: [],
    //       id: 'md',
    //       languageId: 'markdown',
    //       mappings: [],
    //       snapshot: new ScriptSnapshot(gts),
    //     },
    //   ];
    // }
  }
}
