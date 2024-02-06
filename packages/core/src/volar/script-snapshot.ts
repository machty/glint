/**
 * @typedef {import('typescript').IScriptSnapshot} IScriptSnapshot
 */

/**
 * A TypeScript compatible script snapshot that wraps a string of text.
 *
 * @implements {IScriptSnapshot}
 */
export class ScriptSnapshot {
  constructor(public text: string) {}

  getChangeRange() {}

  getLength() {
    return this.text.length;
  }

  getText(start: number, end: number) {
    return this.text.slice(start, end);
  }
}
