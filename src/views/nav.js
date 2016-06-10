const html = require('inu').html

module.exports = nav

function nav (model) {
  return html`
    <nav>
      <a class='logo' href='/'>
        <h1>pull-stream</h1>
      </a>
      <ul class='categories'>
        ${model.categories.map((category) => html`
          <li class='category'>
            <h2>${category}</h2>
            <ul class='modules'>
              ${model.modules
                .filter(m => m.category === category)
                .map((module) => {
                  return html`
                    <a href=${`#/${module.name}`}>
                      <li>${module.name}</li>
                    </a>
                  `
              })}
            </ul>
          </li>
        `)}
      </ul>
    </nav>
  `
}
