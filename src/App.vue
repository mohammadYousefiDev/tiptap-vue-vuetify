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

  props: ['EditorContent'],

  components: {
    EditorContent,
    EditorMenuBubble,
  },
  data() {
    return {

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

          /**
           * this is default content of editor
           */
          content: '',

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
      content: "",

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
  min-height: 300px;
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

  img
  {
    max-width: 100%;
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