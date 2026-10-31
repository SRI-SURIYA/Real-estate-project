@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background-color: #020617;
  color: #f8fafc;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background: #020617;
}

* {
  box-sizing: border-box;
}

button,
input,
select {
  font: inherit;
}

img {
  max-width: 100%;
  display: block;
}
