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
              :class="{ 'is-active': editor.activeMarkAttrs.aligntext.align === 'left' }"
              @click.prevent="commands.aligntext({ align: 'left' })">
              <v-icon size="20" color="#000" class="deforme">mdi-format-align-left</v-icon>
          </button>

          <button class="menubar__button"
              :class="{ 'is-active': editor.activeMarkAttrs.aligntext.align === 'center' }"
              @click.prevent="commands.aligntext({ align: 'center' })">
              <v-icon size="20" color="#000" class="deforme">mdi-format-align-center</v-icon>
          </button>
          
          <button class="menubar__button"
              :class="{ 'is-active': editor.activeMarkAttrs.aligntext.align === 'right' }"
              @click.prevent="commands.aligntext({ align: 'right' })">
              <v-icon size="20" color="#000" class="deforme">mdi-format-align-right</v-icon>
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

          <button
            class="menububble__button"
            @click.prevent="showLinkModal(getMarkAttrs('link'))"
            :class="{ 'is-active': isActive.link() }"
          >
            <v-icon size="19" color="#000" class="deforme">mdi-link-variant-plus</v-icon>
          </button>

          <v-menu
            :close-on-content-click="true"
            :nudge-width="250"
            content-class="emoji_select"
            left
            :offset-y="true"
          >
            <template v-slot:activator="{ on }">
              <button class="menubar__button" type="button" v-on="on">
                <v-icon size="21" color="#000" class="deforme">mdi-palette</v-icon>
              </button>
            </template>

            <div class="icon_pack text-center">
              <span
                v-for="(color, i) in colors"
                :key="i"
                class="pointer"
                :class="{ 'is-active1': isActive.textColor({ level: 'text-'+color.name }) }"
                @click.prevent="commands.textColor({ level: 'text-'+color.name })"
              ><v-icon :color="color.color">mdi-circle</v-icon></span>

            </div>
          </v-menu>

        </template>

        <!-- image uploader dialog -->
        <v-dialog v-model="imageUpload" max-width="400px">

          <h4 class="col-12 px-0 mt-0">
            <v-icon color="#000" class="mr-1" size="20">mdi-cloud-upload-outline</v-icon> 
            Image send
            <v-icon color="red" @click="imageUpload = !imageUpload" class="float-right" size="25">mdi-close</v-icon> 
          </h4>

          <v-divider class="col-12"></v-divider>

          <form ref="imageUpload" class="col-12 px-0 py-0" @submit.prevent="addImage(commands.image)" action="" autocomplete="off">

            <v-text-field
              label="Image Absolute URL"
              outlined
              v-model="imageUrl"
              hide-details
            ></v-text-field>

          <v-btn type="submit" color="info" class="mt-4" height="40">Send</v-btn>

          </form> 

        </v-dialog>

        <v-dialog width="400" v-model="linkModal">
          <header class="pa-4 font-weight-bold">Add\edit link
            <v-icon class="float-right" color="error" @click="linkModal = !linkModal">mdi-close</v-icon>
          </header>
          <v-divider></v-divider>
          <div class="pa-4 pt-7 texam">
            <v-form autocomplete="off">
              <v-text-field
                label="link"
                height="50"
                v-model="linkUrl"
                hide-details
                class="mb-5 size14"
                outlined
              ></v-text-field>

              <v-checkbox
                v-model="linkNewTab"
                label="Open in new tab"
                hide-details
              ></v-checkbox>
            </v-form>

            <v-btn @click="sendLink(commands.link)" color="info" class="mt-4">Add link</v-btn>
          </div>
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
import CustomLink from './customLink';
import TextColor from './textColor';

export default {

  props: ['EditorContent'],

  components: {
    EditorContent,
    EditorMenuBubble,
  },
  data() {
    return {
      linkNewTab: false,
      linkUrl: null,
      linkModal: false,

      /**
       * this is main editor object
       * elements must be define in 'extension' prop of this object
       */

      editor: new Editor(
        {
          extensions: [
            new Blockquote(),
            new BulletList(),
            new CodeBlock(),
            new TextColor(),
            new Underline(),
            new HardBreak(),
            new Heading({ levels: [1, 2, 3] }),
            new ListItem(),
            new OrderedList(),
            new HorizontalRule(),
            new TodoItem(),
            new TodoList(),
            new CustomLink(),
            new Image(),
            new Bold(),
            new Code(),
            new Italic(),
            new History(),
            new AlignText(),
            new Strike(),
          ],

          /**
           * this is default content of editor
           */
          content: '<p><strong>Bold</strong></p><h1>Heading1</h1><h2>Heading2</h2><h3>Heading3</h3><p><em>Italic</em></p><p><u>Underline</u></p><p><s>Strike</s></p><p>Unordered list:</p><ul><li><p>option1</p></li><li><p>option2</p></li></ul><p></p><p>Ordered list</p><ol><li><p>option1</p></li><li><p>option2</p></li></ol><p></p><p>left align</p><p><span style="text-align: center; display: block">center align</span></p><p><span style="text-align: right; display: block">right align</span></p><p></p><p><img src="https://vuetech.ir/_nuxt/img/services.e3dbeef.png"></p><h2></h2><hr><p></p><p>😉😍🙄😑</p><p><a href="https://vuetech.ir" rel="noopener noreferrer nofollow">Link without target</a></p><p><a href="https://vuetech.ir" target="_blank" rel="noopener noreferrer nofollow">Link with target _blank</a></p><p></p><p><span class="custom-style text-success">Green text</span></p><p><span class="custom-style text-primary">Blue text</span></p>',

          /**
           * this prop gets updated editor content
           */
          onUpdate: ({ getHTML }) => 
          {
            /**
             * save new content in custom data
             */
            this.content = getHTML()
          }

        }
      ),

      /**
       * This data is main content of your text editor
       * You can send to backend api
       */
      content: '',

      linkUrl: null,
      linkMenuIsActive: false,
      emojis:[
        { text: '😃' },
        { text: '😉' },
        { text: '😋' },
        { text: '😎' },
        { text: '😍' },
        { text: '🙄' },
        { text: '😑' },
        { text: '🤔' },
        { text: '😥' },
        { text: '🤐' },
        { text: '😫' },
        { text: '😲' },
        { text: '😭' },
        { text: '😡' },
        { text: '😬' },
        { text: '😴' }
      ],
      colors: [
        {name: 'primary', color: '#007bff'}, 
        {name: 'success', color: '#28a745'},
        {name: 'warning', color: '#ffc107'}, 
        {name: 'danger', color: '#dc3545'},
        {name: 'info', color: '#17a2b8'},
        {name: 'dark', color: '#343a40'}
      ],
      linkMenuIsActive: false,
      img: null,

      imageUrl: '',
      imageUpload: false
    }
  },

  watch: 
  {
    /**
     * watch content prop to change
     * after any change we can pass it to parent component (if exists)
     * note: emit to parent have a space bug -- i dont know
     * you can install vuex
     * send content to state
     * then watch vuex state in parent component
     * and insert to your data
     */
    content: function() 
    {
      /**
       * pass editor content to vuex state
       * and get that in parent component (watch vuex state)
       */

      //this.$store.commit("editorContent", this.content);
    },

    /**
     * this is editor content prop that pass from parent to editor component
     */
    EditorContent(params)
    {
      this.editor.setContent(params)
    }

  },

  methods: 
  {
    showLinkModal(attr)
    {
      const { selection, state } = this.editor;
      const { from, to } = selection;
      const text = state.doc.textBetween(from, to, ' ');

      if(text=='') return;

      this.linkModal = true;

      if(attr.target == '_blank'){
        this.linkNewTab = true;
      }

      this.linkUrl = attr.href
    },

    sendLink(command)
    {
      if(this.linkNewTab)
      {
        command({ href: this.linkUrl, target: '_blank' });
      }
      else{
        command({ href: this.linkUrl});
      }
      
      this.linkModal = false;
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
     * image upload
     */
    addImage(command)
    {
      if(this.imageUrl == '') return;

      var src = this.imageUrl;

      command({ src });

      this.imageUrl = '';
      this.imageUpload = !this.imageUpload;
      
    }

  },
}
</script>

<style lang="scss">

@import '~vuetify/dist/vuetify.min.css';

@import '~@mdi/font/css/materialdesignicons.min.css';

.ProseMirror
{
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  padding: 21px;
  font-size: 23px;
  font-family: sans-serif;
  overflow-y: scroll;

  a
  {
    color: blue;
  }

  img
  {
    max-width: 100%;
  }

  ul, ol{
    padding-left: 60px;
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

.pointer{
  cursor: pointer;
}

.text-dark {
  color: #343a40!important;
}

.text-primary {
  color: #007bff!important;
}

.text-success {
  color: #28a745!important;
}

.text-warning {
  color: #ffc107!important;
}

.text-danger {
  color: #dc3545!important;
}

.text-info {
  color: #17a2b8!important;
}
</style>