// import type { Service } from '@volar/language-server';
// import { create as createVolarBaseTypeScriptService } from 'volar-service-typescript';
// import { Position, positionToOffset } from '../../util/position.js';
// import MappingTree from '../../../transform/template/mapping-tree.js';
// import { GlintConfig } from '../../../config/config.js';

// import {
//   offsetToPosition,
//   filePathToUri,
//   uriToFilePath,
//   scriptElementKindToCompletionItemKind,
// } from '../../util/index.js';
// import { TextDocument } from 'vscode-languageserver-textdocument';

// export const create =
//   (): Service =>
//   (context, modules): ReturnType<Service> => {
//     const typeScriptPlugin = createVolarBaseTypeScriptService()(context, modules);

//     if (!context) {
//       // This block gets hit once when initializing our LanguageServerPlugin; we return
//       // basic information about the capabilities of our plugin that don't depend on additional context.
//       return {
//         triggerCharacters: typeScriptPlugin.triggerCharacters,
//         signatureHelpTriggerCharacters: typeScriptPlugin.signatureHelpTriggerCharacters,
//         signatureHelpRetriggerCharacters: typeScriptPlugin.signatureHelpRetriggerCharacters,
//       };
//     }

//     // if (modules?.typescript) {
//     //   let glintConfig = new GlintConfig(modules?.typescript, configPath, configInput);

//     //   // 
//     //   let a = null;
//     // }

//     // context.

//     // context.rawHost.
//     // let glintConfig = configInput ? new GlintConfig(ts, configPath, configInput) : null;

//     // context;

//     function isAnalyzableFile(synthesizedScriptPath: string): boolean {
//       if (synthesizedScriptPath.endsWith('.ts')) {
//         return true;
//       }

//       // let allowJs = this.service.getProgram()?.getCompilerOptions().allowJs ?? false;
//       // if (allowJs && synthesizedScriptPath.endsWith('.js')) {
//       //   return true;
//       // }

//       return false;
//     }

//     /*
//     function getTransformedOffset(
//       originalURI: string,
//       originalPosition: Position
//     ): {
//       transformedFileName: string;
//       transformedOffset: number;
//       mapping?: MappingTree | undefined;
//     } {
//       let originalFileName = uriToFilePath(originalURI);
//       let originalFileContents = context!.documents.getDocumentContents(originalFileName);
//       let originalOffset = positionToOffset(originalFileContents, originalPosition);
//       let { transformedStart, transformedFileName, mapping } =
//         this.transformManager.getTransformedRange(originalFileName, originalOffset, originalOffset);

//       return {
//         mapping,
//         transformedOffset: transformedStart,
//         transformedFileName: this.glintConfig.getSynthesizedScriptPathForTS(transformedFileName),
//       };
//     }

//     function getTransformedOffsetByDocument(
//       document: TextDocument,
//       originalPosition: Position
//     ): {
//       transformedFileName: string;
//       transformedOffset: number;
//       mapping?: MappingTree | undefined;
//     } {
//       let originalURI = document.uri;
//       let originalFileName = uriToFilePath(originalURI);
//       let originalFileContents = document.getText();
//       let originalOffset = positionToOffset(originalFileContents, originalPosition);

//       // We need to be able to fetch a transformManager so that we can fetch other files, e.g.
//       // transform a .ts component file by embedding an .hbs, or vice versa. But a TransformManager
//       // needs a few things like a glintConfig and a DocumentCache.
//       //
//       // let documentCache = new DocumentCache(glintConfig);
//       // let transformManager = new TransformManager(glintConfig, documentCache);

//       let { transformedStart, transformedFileName, mapping } =
//         this.transformManager.getTransformedRange(originalFileName, originalOffset, originalOffset);

//       return {
//         mapping,
//         transformedOffset: transformedStart,
//         transformedFileName: this.glintConfig.getSynthesizedScriptPathForTS(transformedFileName),
//       };
//     }
//     */

//     // Context is provided here, allowing us to build out a fuller functional version of our plugin.

//     return {
//       ...typeScriptPlugin,

//       // These (and additional) hooks can be overridden to enhance/decorate the responses
//       // that come from the default TS server, such as completions, code actions, etc.
//       // Full list:
//       // https://github.com/volarjs/volar.js/blob/188f49ee79bd2ea8e8fc32b80003c85f79868f9d/packages/language-service/lib/types.ts#L90

//       // TODO: delete me
//       async provideCompletionItems(document, position, completionContext, token) {
//         // let { transformedFileName, transformedOffset, mapping } = getTransformedOffsetByDocument(
//         //   document,
//         //   position
//         // );

//         // if (!isAnalyzableFile(transformedFileName)) return;

//         // // If we're in a free-text region of a template, or if there's no mapping and yet
//         // // we're in a template file, then we have no completions to offer.
//         // if (
//         //   mapping?.sourceNode.type === 'TextContent' ||
//         //   mapping?.sourceNode.type === 'TemplateEmbedding' ||
//         //   (!mapping && this.glintConfig.environment.isTemplate(uri))
//         // ) {
//         //   return;
//         // }

//         // const ts = require('typescript');

//         context; // does this have getTextDocument on it? Can it be passed to DocumentCache to be read-only on top of its thing?

//         // What's on completion
//         const originalCompletions = await typeScriptPlugin.provideCompletionItems!(
//           document,
//           position,
//           completionContext,
//           token
//         );
//         if (!originalCompletions) return null;

//         return originalCompletions;
//       },

//       // async provideCompletionItems(document, position, completionContext, token) {
//       // 	const originalCompletions = await typeScriptPlugin.provideCompletionItems!(
//       // 		document,
//       // 		position,
//       // 		completionContext,
//       // 		token
//       // 	);
//       // 	if (!originalCompletions) return null;

//       // 	return enhancedProvideCompletionItems(originalCompletions);
//       // },

//       // async resolveCompletionItem(item, token) {
//       //   ...
//       // },

//       // async provideCodeActions(document, range, codeActionContext, token) {
//       //   ...
//       // },

//       // async resolveCodeAction(codeAction, token) {
//       //   ...
//       // },

//       // async provideSemanticDiagnostics(document, token) {
//       //   ...
//       // },
//     };
//   };
