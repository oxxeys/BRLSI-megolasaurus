import { Application, 
    Graphics,
    Container,
    Text,
    TextStyle,
    Assets,
    Sprite,
    Texture,
    textureFrom
} from "pixi.js";

let app;
const gridSize = 3;
const tileSize = 200;
const empty = { x: 2, y: 2};
let tiles = [];

async function preloadImages() {
    await Assets.load('assets/images/thigh.jpg')
}

(async () => {

    app = new Application();
    await app.init({
        width: 800,
        height: 800,
        backgroundAlpha: 0.2
    });
    
    document.getElementById("SecondGame").appendChild(app.canvas);
    
    await preloadImages();

    const baseTexture = Texture.from('assets/images/thigh.jpg').baseTexture;
    console.log(baseTexture.valid); // should be true

  const tileContainer = new Container();
  app.stage.addChild(tileContainer);

  for (let y = 0; y < gridSize; y++) {
    tiles[y] = [];
    for (let x = 0; x < gridSize; x++) {
      if (x === empty.x && y === empty.y) {
        tiles[y][x] = null;
        continue;
      }

      const frame = new Rectangle(x * tileSize, y * tileSize, tileSize, tileSize);
      const texture = new Texture(baseTexture, frame);
      const sprite = new Sprite(texture);
      sprite.tint = 0xff0000; // red overlay for visibility

      sprite.x = x * tileSize;
      sprite.y = y * tileSize;
      sprite.gridX = x;
      sprite.gridY = y;
      sprite.width = tileSize;
      sprite.height = tileSize;

      sprite.eventMode = 'static';
      sprite.cursor = 'pointer';

      sprite.on('pointerdown', () => tryMove(sprite));

      tileContainer.addChild(sprite);
      tiles[y][x] = sprite;
    }
  }

  shuffleBoard();
})();

function tryMove(tile) {
  const dx = Math.abs(tile.gridX - empty.x);
  const dy = Math.abs(tile.gridY - empty.y);

  if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
    // Animate move
    animateMove(tile, empty.x, empty.y);

    tiles[empty.y][empty.x] = tile;
    tiles[tile.gridY][tile.gridX] = null;

    const oldX = tile.gridX;
    const oldY = tile.gridY;

    tile.gridX = empty.x;
    tile.gridY = empty.y;

    empty.x = oldX;
    empty.y = oldY;
  }
}

function animateMove(sprite, targetGridX, targetGridY) {
  const targetX = targetGridX * tileSize;
  const targetY = targetGridY * tileSize;

  const speed = 10;
  const ticker = new Ticker();
  ticker.add(() => {
    const dx = targetX - sprite.x;
    const dy = targetY - sprite.y;

    if (Math.abs(dx) < speed && Math.abs(dy) < speed) {
      sprite.x = targetX;
      sprite.y = targetY;
      ticker.stop();
      return;
    }

    sprite.x += dx * 0.2;
    sprite.y += dy * 0.2;
  });
  ticker.start();
}

function shuffleBoard() {
  for (let i = 0; i < 100; i++) {
    const neighbors = getMovableTiles();
    const tile = neighbors[Math.floor(Math.random() * neighbors.length)];
    tryMove(tile);
  }
}

function getMovableTiles() {
  const result = [];
  const { x, y } = empty;
  const offsets = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  for (const [dx, dy] of offsets) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
      const tile = tiles[ny][nx];
      if (tile) result.push(tile);
    }
  }
  return result;
}

function resize() {

  const parent = app.view.parentNode;
  
  app.renderer.resize(parent.clientWidth, parent.clientHeight);
  
}

window.addEventListener("resize", resize);

window.onload = function(){
  resize();
};
