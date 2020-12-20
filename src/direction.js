import { Mark } from 'tiptap';
import { updateMark } from 'tiptap-commands';

export default class Direction extends Mark {
	get name() {
		return 'direction';
	}

	get schema() {
		return {
			attrs: {
				direction: {
					default: 'rtl',
				},
			},
			parseDOM: [
				{
					style: 'direction',
					getAttrs: value => ({ direction: value }),
				},
			],
			toDOM: mark => ['div', { style: `direction: ${mark.attrs.direction};` }, 0],
		};
	}

	commands({ type }) {
		return attrs => updateMark(type, attrs);
	}

}