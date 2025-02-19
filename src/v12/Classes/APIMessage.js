const { APIMessage: dAPIMessage, MessageEmbed } = require('discord.js');
const Util = require('../Util');
const { MessageComponentTypes } = require('../Constants.js');
const BaseMessageComponent = require('./interfaces/BaseMessageComponent');
const MessageActionRow = require('./MessageActionRow');
const MessageButton = require('./MessageButton');
const MessageMenu = require('./MessageMenu');

class sendAPICallback extends dAPIMessage {
  resolveData() {
    if (this.data) {
      return this;
    }

    super.resolveData();

    if (this.options.content instanceof MessageEmbed) {
      this.data.embed = this.options.content;
      this.data.embeds.push(this.options.content);
      this.data.content = undefined;
    }

    if (this.options.flags) {
      this.data.flags = parseInt(this.options.flags);
    }

    if (typeof this.options.ephemeral === 'boolean' && this.options.ephemeral === true) {
      this.data.flags = 64;
    }

    let components = [];
    let hasActionRow = false;
    let hasComponent = false;
    if (MessageComponentTypes[this.options.type]) {
      hasComponent = true;
      if (this.options.type === MessageComponentTypes.ACTION_ROW) {
        components.push({
          type: MessageComponentTypes.ACTION_ROW,
          components: this.options.components.map((b) =>
            BaseMessageComponent.create(b.type === MessageComponentTypes.BUTTON ? Util.resolveButton(b) : Util.resolveMenu(b)),
          ),
        });
        hasActionRow = true;
      } else if (this.options.type === MessageComponentTypes.BUTTON || this.options.type === MessageComponentTypes.SELECT_MENU) {
        components.push({
          type: MessageComponentTypes.ACTION_ROW,
          components: [
            BaseMessageComponent.create(
              this.options.type === MessageComponentTypes.BUTTON ? Util.resolveButton(this.options) : Util.resolveMenu(this.options),
            ),
          ],
        });
      }
    }

    if (this.options.component) {
      hasComponent = true;
      if (this.options.component instanceof MessageActionRow) {
        components.push({
          type: MessageComponentTypes.ACTION_ROW,
          components: this.options.component.components.map((b) =>
            BaseMessageComponent.create(b.type === MessageComponentTypes.BUTTON ? Util.resolveButton(b) : Util.resolveMenu(b)),
          ),
        });
      } else if (this.options.component instanceof MessageButton || this.options.component instanceof MessageMenu) {
        components.push({
          type: MessageComponentTypes.ACTION_ROW,
          components: [
            BaseMessageComponent.create(
              this.options.component instanceof MessageButton ? Util.resolveButton(this.options.component) : Util.resolveMenu(this.options.component),
            ),
          ],
        });
      }
    }

    if (this.options.components) {
      hasComponent = true;
      if (Array.isArray(this.options.components)) {
        if (hasActionRow === false) {
          components.push(
            ...this.options.components.map((c) => {
              let buttons = [];

              buttons.push(
                ...c.components.map((b) =>
                  BaseMessageComponent.create(b.type === MessageComponentTypes.BUTTON ? Util.resolveButton(b) : Util.resolveMenu(b)),
                ),
              );

              return {
                type: MessageComponentTypes.ACTION_ROW,
                components: buttons,
              };
            }),
          );
        }
      } else {
        components.push({
          type: MessageComponentTypes.ACTION_ROW,
          components: this.options.components.components.map((b) =>
            BaseMessageComponent.create(b.type === MessageComponentTypes.BUTTON ? Util.resolveButton(b) : Util.resolveMenu(b)),
          ),
        });
      }
    }

    if (this.options.button || this.options.buttons) {
      hasComponent = true;
      [this.options.buttons || this.options.button].forEach((optBtn) => {
        components.push({
          type: MessageComponentTypes.ACTION_ROW,
          components: Array.isArray(optBtn)
            ? optBtn.map((b) => BaseMessageComponent.create(Util.resolveButton(b)))
            : [BaseMessageComponent.create(Util.resolveButton(optBtn))],
        });
      });
    }

    if (this.options.menu || this.options.menus) {
      hasComponent = true;
      [this.options.menu || this.options.menus].forEach((optMenu) => {
        components.push({
          type: MessageComponentTypes.ACTION_ROW,
          components: Array.isArray(optMenu)
            ? optMenu.map((b) => BaseMessageComponent.create(Util.resolveMenu(b)))
            : [BaseMessageComponent.create(Util.resolveMenu(optMenu))],
        });
      });
    }

    if (this.options.components === null || this.options.component === null || this.options.buttons === null || this.options.button === null) {
      hasComponent = true;
      components = [];
    }

    if (typeof components.length == 'number' && hasComponent === true) {
      this.data.components = components.length === 0 ? [] : components;
    }

    return this;
  }
}

class APIMessage extends dAPIMessage {
  resolveData() {
    if (this.data) {
      return this;
    }

    super.resolveData();

    if (this.options.content instanceof MessageEmbed) {
      this.data.embed = this.options.content;
      this.data.embeds.push(this.options.content);
      this.data.content = undefined;
    }

    let components = [];
    let hasActionRow = false;
    let hasComponent = false;
    if (MessageComponentTypes[this.options.type]) {
      hasComponent = true;
      if (this.options.type === MessageComponentTypes.ACTION_ROW) {
        components.push({
          type: MessageComponentTypes.ACTION_ROW,
          components: this.options.components.map((b) =>
            BaseMessageComponent.create(b.type === MessageComponentTypes.BUTTON ? Util.resolveButton(b) : Util.resolveMenu(b)),
          ),
        });
        hasActionRow = true;
      } else if (this.options.type === MessageComponentTypes.BUTTON || this.options.type === MessageComponentTypes.SELECT_MENU) {
        components.push({
          type: MessageComponentTypes.ACTION_ROW,
          components: [
            BaseMessageComponent.create(
              this.options.type === MessageComponentTypes.BUTTON ? Util.resolveButton(this.options) : Util.resolveMenu(this.options),
            ),
          ],
        });
      }
    }

    if (this.options.component) {
      hasComponent = true;
      if (this.options.component instanceof MessageActionRow) {
        components.push({
          type: MessageComponentTypes.ACTION_ROW,
          components: this.options.component.components.map((b) =>
            BaseMessageComponent.create(b.type === MessageComponentTypes.BUTTON ? Util.resolveButton(b) : Util.resolveMenu(b)),
          ),
        });
      } else if (this.options.component instanceof MessageButton || this.options.component instanceof MessageMenu) {
        components.push({
          type: MessageComponentTypes.ACTION_ROW,
          components: [
            BaseMessageComponent.create(
              this.options.component instanceof MessageButton ? Util.resolveButton(this.options.component) : Util.resolveMenu(this.options.component),
            ),
          ],
        });
      }
    }

    if (this.options.components) {
      hasComponent = true;
      if (Array.isArray(this.options.components)) {
        if (hasActionRow === false) {
          components.push(
            ...this.options.components.map((c) => {
              let buttons = [];

              buttons.push(
                ...c.components.map((b) =>
                  BaseMessageComponent.create(b.type === MessageComponentTypes.BUTTON ? Util.resolveButton(b) : Util.resolveMenu(b)),
                ),
              );

              return {
                type: MessageComponentTypes.ACTION_ROW,
                components: buttons,
              };
            }),
          );
        }
      } else {
        components.push({
          type: MessageComponentTypes.ACTION_ROW,
          components: this.options.components.components.map((b) =>
            BaseMessageComponent.create(b.type === MessageComponentTypes.BUTTON ? Util.resolveButton(b) : Util.resolveMenu(b)),
          ),
        });
      }
    }

    if (this.options.button || this.options.buttons) {
      hasComponent = true;
      [this.options.buttons || this.options.button].forEach((optBtn) => {
        components.push({
          type: MessageComponentTypes.ACTION_ROW,
          components: Array.isArray(optBtn)
            ? optBtn.map((b) => BaseMessageComponent.create(Util.resolveButton(b)))
            : [BaseMessageComponent.create(Util.resolveButton(optBtn))],
        });
      });
    }

    if (this.options.menu || this.options.menus) {
      hasComponent = true;
      [this.options.menu || this.options.menus].forEach((optMenu) => {
        components.push({
          type: MessageComponentTypes.ACTION_ROW,
          components: Array.isArray(optMenu)
            ? optMenu.map((b) => BaseMessageComponent.create(Util.resolveMenu(b)))
            : [BaseMessageComponent.create(Util.resolveMenu(optMenu))],
        });
      });
    }

    if (this.options.components === null || this.options.component === null || this.options.buttons === null || this.options.button === null) {
      hasComponent = true;
      components = [];
    }

    if (typeof components.length == 'number' && hasComponent === true) {
      this.data.components = components.length === 0 ? [] : components;
    }

    return this;
  }
}

module.exports = {
  sendAPICallback,
  APIMessage,
};
