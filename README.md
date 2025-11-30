# Arrow Game

link: https://george70-svg.github.io/arrow/

`yarn dev` - For start

## 2D game on canvas

### The game is written in pure JS/TS. The interface is in React

The game loop is written in the main class Game. All game objects are inherited from the abstract class Shape. Separate classes for collision calculations, the controller, animation sprites, and day/night cycles have been implemented. To reduce bundle size, large images were converted to webp format

### Stack:
1) React/TypeScript
2) Vite
3) Eslint
4) Prettier
5) FSD
6) SCSS/CSS module

### Work has been carried out on performance

Before:
<img width="1580" height="880" alt="Снимок экрана 2025-11-25 в 12 46 20" src="https://github.com/user-attachments/assets/aa21d699-8bfd-4b52-b176-c6df5d5be14d" />

After:
<img width="1576" height="875" alt="Снимок экрана 2025-11-25 в 23 06 48" src="https://github.com/user-attachments/assets/46a27e3a-c899-4f81-b37d-b30f377193af" />
