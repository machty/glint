import type { ServicePlugin, ServicePluginInstance } from '@volar/language-service';
import { TextDocument } from 'vscode-languageserver-textdocument';

export interface Provide {
	'gts/gtsFile': (document: TextDocument) => GtsFile | undefined;
}

export function create(): ServicePlugin {
	return {
		name: 'gts-file',
		create(context): ServicePluginInstance<Provide> {
			return {};
		},
	};
}
// /Users/machty/code/volar-workspace/vue/packages/language-core/src/virtualFile/vueFile.ts