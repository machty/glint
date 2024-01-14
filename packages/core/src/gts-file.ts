import { Stack, VirtualCode } from '@volar/language-core';
import type * as ts from 'typescript/lib/tsserverlibrary.js';
// import { VueCompilerOptions, VueLanguagePlugin } from '../types';
import { computedFiles } from './computedFiles';
import { computedMappings } from './computedMappings';
// import { computedSfc } from './computedSfc';
// import { computedVueSfc } from './computedVueSfc';
import { Signal, signal } from 'computeds';

export class GtsGeneratedCode implements VirtualCode {

	// sources

	id = 'gts_virtual_code';

	_snapshot: Signal<ts.IScriptSnapshot>;

	// computeds

	// OK so

	// getVueSfc = computedVueSfc(this.plugins, this.fileName, () => this._snapshot());
	// sfc = computedSfc(this.ts, this.plugins, this.fileName, () => this._snapshot(), this.getVueSfc);
	getMappings = computedMappings(() => this._snapshot(), this.sfc);
	getEmbeddedCodes = computedFiles(this.plugins, this.fileName, this.sfc, this.codegenStack);

	// others

	codegenStacks: Stack[] = [];
	get embeddedCodes() {
		return this.getEmbeddedCodes();
	}
	get snapshot() {
		return this._snapshot();
	}
	get mappings() {
		return this.getMappings();
	}

	constructor(
		public fileName: string,
		public languageId: string,
		public initSnapshot: ts.IScriptSnapshot,
		// public vueCompilerOptions: VueCompilerOptions,
		public plugins: ReturnType<VueLanguagePlugin>[],
		public ts: typeof import('typescript/lib/tsserverlibrary.js'),
		public codegenStack: boolean,
	) {
		this._snapshot = signal(initSnapshot);
	}

	update(newSnapshot: ts.IScriptSnapshot) {
		this._snapshot.set(newSnapshot);
	}
}