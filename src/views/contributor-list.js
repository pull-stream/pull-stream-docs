const html = require('inu/html')
const css = require('sheetify')

const prefix = css`
  :host {
    overflow: hidden;
  }

  ul {
    display: flex;
    list-style-type: none;
    margin: 0px;
    padding: 0px;
  }

  img {
    display: inline-block;
    border-radius: 25px;
    width: 25px;
    height: 25px;
    margin-left: 5px;
  }
`

module.exports = contributorsList

function contributorsList (contributors) {
  return html`
    <div class=${`contrib ${prefix}`}>
      <ul>
        ${contributors.slice(0, 20).sort(shuffle).map(c => html`
          <li>
            <a target='_blank' title=${c.name} href=${`https://github.com/${c.name}`}>
              <img src=${c.image} />
            </a>
          </li>
        `)}
      </ul>
    </div>
  `
}

function shuffle() {
  return Math.random() - 0.5
}
