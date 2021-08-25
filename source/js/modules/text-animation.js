export default class TextAnimation {
  constructor(
      selector,
      duration,
      activeClass,
      transitionProperty,
      noWords = true
  ) {
    this._selector = selector;
    this._duration = duration;
    this._activeClass = activeClass;
    this._transitionProperty = transitionProperty;
    this._element = document.querySelector(this._selector);
    this._delay = 0;
    this._wordsCount = 0;
    this._noWords = noWords;

    if (!this._element) {
      return;
    }

    this.prePareText();
  }

  createElement(char, index) {
    const span = document.createElement(`span`);
    span.textContent = char;
    switch (index % 4) {
      case 0:
        this._delay = 100;
        break;
      case 1:
        this._delay = 50;
        break;
      case 2:
        this._delay = 0;
        break;
      case 3:
        this._delay = 50;
        break;
    }

    span.style.transition = `${this._transitionProperty} 
                             ${this._duration}ms 
                             ease 
                             ${this._delay + this._wordsCount * 100}ms`;

    return span;
  }

  prePareText() {
    const text = this._element.textContent.trim().split(` `).filter((char) => char !== ``);
    const content = text.reduce((fragmentParent, word) => {
      const wordElement = Array.from(word).reduce((fragment, char, index) => {
        fragment.appendChild(this.createElement(char, index));
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.classList.add(`text__word`);
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      if (!this._noWords) {
        this._wordsCount++;
      }
      return fragmentParent;
    }, document.createDocumentFragment());
    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.classList.add(this._activeClass);
  }

  destroyAnimation() {
    this._element.classList.remove(this._activeClass);
  }
}
