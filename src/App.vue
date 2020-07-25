<template>
  <v-app class="editor col-md-8 mx-auto">
    <editor-menu-bubble class="menububble" :editor="editor" @hide="hideLinkMenu" v-slot="{ commands, isActive, getMarkAttrs, menu }">
      <div
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >

        <form class="menububble__form" v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
          <input class="menububble__input linkam" type="text" v-model="linkUrl" placeholder="link + inter" ref="linkInput" @keydown.esc="hideLinkMenu"/>
          <button class="menububble__button" @click="setLinkUrl(commands.link, null)" type="button">
            <v-icon>mdi-close</v-icon>
          </button>
        </form>

        <template v-else>
          <button
            class="menububble__button"
            @click="showLinkMenu(getMarkAttrs('link'))"
            :class="{ 'is-active': isActive.link() }"
          >
            <!-- <span>{{ isActive.link() ? 'Update Link' : 'Add Link'}}</span> -->
            <v-icon size="22" color="#000" class="deforme">mdi-link-variant-plus</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click.prevent="commands.bold"
          >
            <v-icon size="26" color="#000">mdi-format-bold</v-icon>
          </button>

          <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 1 }) }"
              @click.prevent="commands.heading({ level: 1 })"
            >
              <v-icon size="24" color="#000" class="deforme">mdi-format-header-1</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 2 }) }"
              @click.prevent="commands.heading({ level: 2 })"
            >
              <v-icon size="24" color="#000" class="deforme">mdi-format-header-2</v-icon>
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              @click.prevent="commands.heading({ level: 3 })"
            >
              <v-icon size="24" color="#000" class="deforme">mdi-format-header-3</v-icon>
            </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click.prevent="commands.italic"
          >
            <v-icon size="25" color="#000" class="deforme">mdi-format-italic</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click.prevent="commands.underline"
          >
            <v-icon size="22" color="#000" class="deforme">mdi-format-underline</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click.prevent="commands.strike"
          >
            <v-icon size="21" color="#000" class="deforme">mdi-format-strikethrough-variant</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click.prevent="commands.bullet_list"
          >
            <v-icon size="22" color="#000" class="deforme">mdi-format-list-bulleted</v-icon>
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click.prevent="commands.ordered_list"
          >
            <v-icon size="22" color="#000" class="deforme">mdi-format-list-numbered</v-icon>
          </button>

          <button class="menubar__button"
              :class="{ 'is-active': editor.activeMarkAttrs.aligntext.align === 'right' }"
              @click.prevent="commands.aligntext({ align: 'right' })">
              <v-icon size="20" color="#000" class="deforme">mdi-format-align-right</v-icon>
          </button>

          <button class="menubar__button"
              :class="{ 'is-active': editor.activeMarkAttrs.aligntext.align === 'center' }"
              @click.prevent="commands.aligntext({ align: 'center' })">
              <v-icon size="20" color="#000" class="deforme">mdi-format-align-center</v-icon>
          </button>
          
          <button class="menubar__button"
              :class="{ 'is-active': editor.activeMarkAttrs.aligntext.align === 'left' }"
              @click.prevent="commands.aligntext({ align: 'left' })">
              <v-icon size="20" color="#000" class="deforme">mdi-format-align-left</v-icon>
          </button>

          <button class="menubar__button" @click.prevent="imageUpload = !imageUpload">
            <v-icon size="21" color="#000" class="deforme">mdi-image-plus</v-icon>
          </button>

          <button
            class="menubar__button"
            @click.prevent="commands.horizontal_rule"
          >
            <v-icon size="21" color="#000" class="deforme">mdi-minus</v-icon>
          </button>

          <v-menu
            :close-on-content-click="false"
            :nudge-width="250"
            content-class="emoji_select"
            right
            :offset-y="true"
          >
            <template v-slot:activator="{ on }">
              <button class="menubar__button" type="button" v-on="on">
                <v-icon size="21" color="#000" class="deforme">mdi-emoticon-happy-outline</v-icon>
              </button>
            </template>

            <div class="icon_pack text-center">
              <span
                class="icon_pack_span"
                v-for="(emoji, i) in emojis"
                :key="i"
                @click="addEmoji(emoji.text)"
              >{{emoji.text}}</span>
            </div>
          </v-menu>

        </template>

        <!-- image uploader dialog -->
     <v-dialog v-model="imageUpload" max-width="700px">

          <h4 class="col-12 px-0 mt-0">
            <v-icon class="ml-3">mdi-scale-balance</v-icon> 
            آپلود تصویر 
            <v-icon color="red" @click="imageUpload = !imageUpload" class="float-left" size="25">mdi-close</v-icon> 
          </h4>

          <v-divider class="col-12 mb-0"></v-divider>

          <v-file-input
            v-model="files"
            color="info"
            label=""
            show-size
            placeholder="برای انتخاب تصویر کلیک نمایید"
            prepend-icon="mdi-paperclip"
            height="50"
            class="imageUpload"
            clearable
            :loading="imageUploadLoading"
            accept="image/*"
            @change="changeImage"
          >
          </v-file-input>

        <v-alert
          class="size-14 mt-0 px-0">
          <p class="imageUploadWarning mb-2">
          <v-icon size="17" color="#C2185B" class="ml-1">mdi-alert-circle-outline</v-icon>  فایل ارسالی باید حداکثر 5 مگابایت و فرمت آن jpg, png, jpeg باشد.
          </p>

          <v-btn color="info" block class="mt-4" height="50" @click="imageUp(commands.image)">
            ارسال تصویر
          </v-btn>
          
          </v-alert>

        </v-dialog>

      </div>
    </editor-menu-bubble>

    <editor-content class="editor__content" :editor="editor" />

  </v-app>
</template>

<script>
import { Editor, EditorContent, EditorMenuBubble } from 'tiptap'

import { DOMParser } from 'prosemirror-model'

import {
  Blockquote,
  BulletList,
  CodeBlock,
  HardBreak,
  Heading,
  ListItem,
  Strike,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Bold,
  Code,
  Italic,
  Link,
  Image,
  History,
  Underline
} from 'tiptap-extensions'

import AlignText from './tiptap-align.js';  
export default {

  props: ['mainContent', 'EditorContent'],

  components: {
    EditorContent,
    EditorMenuBubble,
  },
  data() {
    return {

      /**
       * this is main editor object
       * all of element must be define in 'extension' prop
       */

      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new Underline(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new HorizontalRule(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Image(),
          new Bold(),
          new Code(),
          new Italic(),
          new History(),
          new AlignText(),
          new Strike(),
        ],
        content: '',
        onUpdate: ({ getHTML }) => 
        {
          /**
           * save new content in custom data
           * data name must not be "content"
           */
          this.content1 = getHTML()
        }
      }),

      /**
       * This data is main content of your text editor
       * You can send to backend api
       */
      content1: "",

      linkUrl: null,
      linkMenuIsActive: false,
      emojis:[
        {
          text: '😃'
        },
        {
          text: '😉'
        },
        {
          text: '😋'
        },
        {
          text: '😎'
        },
        {
          text: '😍'
        },
        {
          text: '🙄'
        },
        {
          text: '😑'
        },
        {
          text: '🤔'
        },
        {
          text: '😥'
        },
        {
          text: '🤐'
        },
        {
          text: '😫'
        },
        {
          text: '😲'
        },
        {
          text: '😭'
        },
        {
          text: '😡'
        },
        {
          text: '😬'
        },
        {
          text: '😴'
        }
      ],
      linkMenuIsActive: false,
      imageUploadLoading: false,
      files: null,
      imageUpload: false,
      img: null,
    }
  },

  watch: {
    content: function() {
      // Emit this information to the parents component
      this.$emit("txtContent", this.content);
    },
    mainContent (newValue) {
      this.editor.setContent(newValue)
    },
    EditorContent(params){
      this.editor.setContent(params)
    }
  },

  
  methods: {
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu() {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl(command, url) {
      command({ href: url })
      this.hideLinkMenu()
    },

    elementFromString(value) {
      const element = document.createElement('div')
      element.innerHTML = value.trim()

      return element
    },

    insertHTML({ state, view }, value) {
      const { selection } = state
      const element = this.elementFromString(value)
      const slice = DOMParser.fromSchema(state.schema).parseSlice(element)
      const transaction = state.tr.insert(selection.anchor, slice.content)

      this.editor.view.dispatch(transaction)
    },

    addEmoji(emoji){
      const transaction = this.editor.state.tr.insertText(emoji)
      this.editor.view.dispatch(transaction)
    },

    /**
     * change image event
     */
    changeImage()
    {
      this.img = event.target.files[0];
    },

    /**
     * image upload
     */
    imageUp(command)
    {
      this.imageUploadLoading = !this.imageUploadLoading;

      const data = new FormData()

      data.append('img', this.img)

      axios.post( 'api/user/uploadImageEditor', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(r => 
      {
        var src = '../uploads/editor/'+r.data;
        
        command({ src });

        // this.insertHTML(this.editor, '<img src="../uploads/editor/'+r.data+'" />');

        this.imageUploadLoading = !this.imageUploadLoading;
        this.imageUpload = !this.imageUpload;
      })
      
    },
  },
}
</script>

<style lang="scss">

@import '~vuetify/dist/vuetify.min.css';

@import '~@mdi/font/css/materialdesignicons.min.css';

.ProseMirror
{
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  padding: 21px;
  font-size: 23px;
  font-family: sans-serif;

  a
  {
    color: blue;
  }
}

.v-dialog
{
  background: #fff;
  margin: 0;
  padding: 10px 15px;
}

.editor
{
  margin-right: auto;
  margin-left: auto;
}

.menububble
{
  border: 1px solid #ddd;
  border-radius: 30px;
  padding: 7px 15px;
  margin-bottom: 10px;
  background: #fafafa;
}

.menubar__button, .menububble__button
{
  margin-left: 7px;
  border: 1px solid #fafafa;
  padding: 2px;
}

.linkam
{
  height: 35px;
  direction: ltr !important;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 30px;
  outline: none;
}

button.is-active{
  border: 1px solid #ddd !important;
  background: #f5f5f5;
  border-radius: 30px;
  padding: 2px;
}

.icon_pack{
  background: #fff;
  padding: 10px;
  font-size: 20px;

  .icon_pack_span{
    cursor: pointer;
  }
}
</style>