import { Mark } from "tiptap";
import { updateMark } from "tiptap-commands";

export default class TextColor extends Mark {
  get name() {
    return "textColor";
  }

  get defaultOptions() {
    return {
      levels: ["text-success", "text-danger", "text-info", "text-primary", "text-warning", "text-dark"]
    };
  }

  get schema() {
    return {
      attrs: {
        level: {
          default: ""
        }
      },
      parseDOM: [
        {
          tag: "span.custom-style",
          getAttrs(dom) {
            return { level: dom.classList[1] };
          }
        }
      ],
      toDOM: mark => {
        return ["span", { class: `custom-style ${mark.attrs.level}` }, 0];
      }
    };
  }

  commands({ type }) {
    return attrs => updateMark(type, attrs);
  }
}
