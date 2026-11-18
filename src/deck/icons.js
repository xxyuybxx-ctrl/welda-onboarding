const fs = require('fs'), path = require('path');
const React = require('react'), RDS = require('react-dom/server'), sharp = require('sharp');
const lu = require('react-icons/lu');
async function icon(name, color) {
  const dir = path.join(__dirname, 'assets', 'icons'); fs.mkdirSync(dir, { recursive: true });
  const f = path.join(dir, `${name}_${color}.png`);
  if (!fs.existsSync(f)) {
    const svg = RDS.renderToStaticMarkup(React.createElement(lu[name], { size: 256, color: '#' + color, strokeWidth: 1.8 }));
    await sharp(Buffer.from(svg)).resize(256, 256).png().toFile(f);
  }
  return f;
}
module.exports = { icon };
