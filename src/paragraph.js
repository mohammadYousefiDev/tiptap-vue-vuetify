import { Link } from 'tiptap-extensions'
export default class Paragraph extends Mark {
  get schema() {
    return {
      attrs: {
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs: dom => ({}),
        },
      ],
      toDOM: node => ['p', {
        ...node.attrs,
      }, 0],
    }
  }
}