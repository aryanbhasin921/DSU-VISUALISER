# 🌐 DSU Visualizer — Interactive Disjoint Set Union Visualizer

An interactive, web-based visualizer for the **Disjoint Set Union (Union-Find)** data structure with **Union-by-Size** and **Recursive Path Compression**.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## ✨ Features

- **🌲 Circular Node Layout**: Singleton nodes are positioned in a non-overlapping circle. Trees grow vertically below root nodes.
- **⚡ 2-Color Highlighting System**:
  - **Amber Gold (`#f59e0b`)**: Highlights input parameters `Node A` & `Node B`.
  - **Electric Violet (`#a855f7`)**: Highlights the node currently active in recursion.
  - **Dull Dark Slate (`#1e293b`)**: Keeps idle nodes clean and distraction-free.
- **🧬 Step-by-Step Path Compression**: Animates recursion moving up to the root, then unwinding back down while re-linking parent pointers directly to the root (`p[x] = find(p[x])`).
- **📊 Live Parent & Size Arrays**: Real-time rendering of `p[]` (Parent) and `sz[]` (Size) arrays with linked hover interaction.
- **🌐 Live Component Counter & History**: Live badge displaying total connected components (`Components: K`) alongside a detailed operation history panel.
- **↩ Undo & ↪ Redo**: Full time-travel support for undoing and redoing union operations.
- **💻 Synchronized C++ Code Panel**: Displays C++ logic with line-by-line step highlighting (collapsible).
- **🔍 Infinite Pan & Zoom**: Smooth panning, zooming, and pinching for larger trees (1–20 nodes).

---

## 🛠️ Built With

- **HTML5 & CSS3** (Vanilla CSS with Flexbox/Grid)
- **JavaScript (ES6+)**
- **SVG Engine** (Dynamic vector graph layout and line drawing)

---

## 🚀 Getting Started

No build tools or installation required!

1. Clone or download this repository.
2. Open `index.html` in any web browser.

```bash
git clone https://github.com/YOUR_USERNAME/dsu-visualizer.git
cd dsu-visualizer
open index.html  # On macOS
# Or double-click index.html
```

---

## 📖 How to Use

1. Enter the number of nodes (1–20) and click **Init**.
2. Enter **Node A** and **Node B**.
3. Click **Union** to perform Union-by-Size or **Find** to check set connectivity.
4. Use **▸ Next** or **Skip ⏭** to step through path compression and tree building.
5. Use **↩ Undo** or **↪ Redo** to time-travel through operations.
6. Toggle **📊 History** or **💻 Code** panels as needed.

---

## 📝 License

MIT License. Feel free to use and modify!
