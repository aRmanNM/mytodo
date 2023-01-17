import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-actionbar",
  templateUrl: "actionbar.component.html",
})
export class ActionbarComponent implements OnInit {
  headerEmoji: string;
  constructor() {}

  emojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "🙃",
    "😉",
    "😊",
    "😇",
    "😍",
    "🤩",
    "😘",
    "😗",
    "😚",
    "😙",
    "😋",
    "😛",
    "😜",
    "🤪",
    "😝",
    "🤑",
    "🤗",
    "🤭",
    "🤫",
    "🤔",
    "🤐",
    "🤨",
    "😏",
    "🤯",
    "🤠",
    "😎",
    "🤓",
    "🧐",
  ];

  ngOnInit() {
    let index = Math.floor(Math.random() * this.emojis.length);
    this.headerEmoji = this.emojis[index];
  }
}
