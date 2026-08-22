// ================================================================
// DSU VISUALIZER — Complete Application Logic
// ================================================================

// ---- C++ Code Definition (each line with syntax-highlighted HTML) ----
const CPP_LINES = [
    { html: '<span class="typ">int</span> p[N], sz[N];', id: 'decl' },
    { html: '', id: 'blank1' },
    { html: '<span class="kw">void</span> <span class="fn">init</span>(<span class="typ">int</span> n) {', id: 'init-sig' },
    { html: '    <span class="kw">for</span> (<span class="typ">int</span> i = <span class="num">0</span>; i &lt; n; i++) {', id: 'init-loop' },
    { html: '        p[i] = i;', id: 'init-parent' },
    { html: '        sz[i] = <span class="num">1</span>;', id: 'init-size' },
    { html: '    }', id: 'init-loop-end' },
    { html: '}', id: 'init-end' },
    { html: '', id: 'blank2' },
    { html: '<span class="typ">int</span> <span class="fn">find</span>(<span class="typ">int</span> x) {', id: 'find-sig' },
    { html: '    <span class="kw">if</span> (p[x] == x)', id: 'find-base' },
    { html: '        <span class="kw">return</span> x;', id: 'find-baseret' },
    { html: '    <span class="kw">return</span> p[x] = <span class="fn">find</span>(p[x]);', id: 'find-compress' },
    { html: '}', id: 'find-end' },
    { html: '', id: 'blank3' },
    { html: '<span class="kw">void</span> <span class="fn">union</span>(<span class="typ">int</span> a, <span class="typ">int</span> b) {', id: 'unite-sig' },
    { html: '    a = <span class="fn">find</span>(a);', id: 'unite-finda' },
    { html: '    b = <span class="fn">find</span>(b);', id: 'unite-findb' },
    { html: '    <span class="kw">if</span> (a == b) <span class="kw">return</span>;', id: 'unite-same' },
    { html: '    <span class="kw">if</span> (sz[a] &lt; sz[b])', id: 'unite-cmp' },
    { html: '        <span class="fn">swap</span>(a, b);', id: 'unite-swap' },
    { html: '    p[b] = a;', id: 'unite-attach' },
    { html: '    sz[a] += sz[b];', id: 'unite-size' },
    { html: '}', id: 'unite-end' },
    { html: '', id: 'blank4' },
    { html: '<span class="typ">bool</span> <span class="fn">connected</span>(<span class="typ">int</span> a, <span class="typ">int</span> b) {', id: 'conn-sig' },
    { html: '    <span class="kw">return</span> <span class="fn">find</span>(a) == <span class="fn">find</span>(b);', id: 'conn-return' },
    { html: '}', id: 'conn-end' },
];

// ---- Configuration ----
const CFG = {
    NODE_R: 28,
    LEVEL_H: 100,
    SIBLING_GAP: 80,
    TREE_GAP: 100,
    MIN_ZOOM: 0.3,
    MAX_ZOOM: 3,
    ZOOM_STEP: 0.12,
};

// Distinct hue per node index for visual separation
const NODE_COLORS = [
    { fill: 'rgba(6,182,212,0.18)',   stroke: '#06b6d4' },   // cyan
    { fill: 'rgba(245,158,11,0.18)',  stroke: '#f59e0b' },   // amber
    { fill: 'rgba(139,92,246,0.18)',  stroke: '#8b5cf6' },   // violet
    { fill: 'rgba(16,185,129,0.18)', stroke: '#10b981' },    // emerald
    { fill: 'rgba(244,63,94,0.18)',  stroke: '#f43f5e' },    // rose
    { fill: 'rgba(59,130,246,0.18)', stroke: '#3b82f6' },    // blue
    { fill: 'rgba(234,179,8,0.18)',  stroke: '#eab308' },    // yellow
    { fill: 'rgba(168,85,247,0.18)', stroke: '#a855f7' },    // purple
    { fill: 'rgba(20,184,166,0.18)', stroke: '#14b8a6' },    // teal
    { fill: 'rgba(251,146,60,0.18)', stroke: '#fb923c' },    // orange
    { fill: 'rgba(99,102,241,0.18)', stroke: '#6366f1' },    // indigo
    { fill: 'rgba(236,72,153,0.18)', stroke: '#ec4899' },    // pink
    { fill: 'rgba(34,197,94,0.18)',  stroke: '#22c55e' },    // green
    { fill: 'rgba(14,165,233,0.18)', stroke: '#0ea5e9' },    // sky
    { fill: 'rgba(217,70,239,0.18)', stroke: '#d946ef' },    // fuchsia
    { fill: 'rgba(132,204,22,0.18)', stroke: '#84cc16' },    // lime
    { fill: 'rgba(249,115,22,0.18)', stroke: '#f97316' },    // deep orange
    { fill: 'rgba(56,189,248,0.18)', stroke: '#38bdf8' },    // light blue
    { fill: 'rgba(192,132,252,0.18)',stroke: '#c084fc' },    // light purple
    { fill: 'rgba(52,211,153,0.18)', stroke: '#34d399' },    // light emerald
];

function getNodeColor(i) {
    return NODE_COLORS[i % NODE_COLORS.length];
}

// ================================================================
// DSU Core Data Structure
// ================================================================
class DSU {
    constructor(n) {
        this.n = n;
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.size = new Array(n).fill(1);
    }

    clone() {
        const d = new DSU(this.n);
        d.parent = [...this.parent];
        d.size = [...this.size];
        return d;
    }

    find(x) {
        if (this.parent[x] === x) return x;
        return (this.parent[x] = this.find(this.parent[x]));
    }
}

// ================================================================
// Step Generator — produces micro-steps for visualization
// ================================================================
function generateFindPathCompressionSteps(dsu, x, steps) {
    const snap = () => ({ parent: [...dsu.parent], size: [...dsu.size] });

    // Build path up to root
    const path = [];
    let curr = x;
    while (curr !== dsu.parent[curr]) {
        path.push(curr);
        curr = dsu.parent[curr];
    }
    const root = curr;
    path.push(root);

    // 1. Recurse up phase
    for (let i = 0; i < path.length - 1; i++) {
        const u = path[i];
        const pU = dsu.parent[u];
        steps.push({
            desc: `Recursing <span class="op-name">find</span>(<span class="node-ref">${u}</span>): p[${u}] = ${pU} ≠ ${u} → call find(${pU})`,
            codeIds: ['find-base', 'find-compress'],
            nodes: { [u]: 'active', [pU]: 'comparing' },
            edges: [[u, pU]],
            ...snap(),
            arrayHL: { parent: [u, pU], size: [] },
            changedCells: { parent: [], size: [] },
        });
    }

    // 2. Base case at root
    steps.push({
        desc: `Base case in <span class="op-name">find</span>(<span class="node-ref">${root}</span>): p[${root}] == ${root} → return root <span class="node-ref">${root}</span>`,
        codeIds: ['find-base', 'find-baseret'],
        nodes: { [root]: 'found' },
        edges: [],
        ...snap(),
        arrayHL: { parent: [root], size: [] },
        changedCells: { parent: [], size: [] },
    });

    // 3. Unwind & Path Compression phase
    for (let i = path.length - 2; i >= 0; i--) {
        const u = path[i];
        const oldParent = dsu.parent[u];
        if (oldParent !== root) {
            dsu.parent[u] = root; // Path Compression
            steps.push({
                desc: `<strong style="color:var(--accent-light)">Path Compression:</strong> p[<span class="node-ref">${u}</span>] = <span class="node-ref">${root}</span> (re-linked direct to root ${root})`,
                codeIds: ['find-compress'],
                nodes: { [u]: 'joined', [root]: 'found' },
                edges: [[u, root]],
                ...snap(),
                arrayHL: { parent: [u, root], size: [] },
                changedCells: { parent: [u], size: [] },
            });
        }
    }

    return root;
}

function generateUnionSteps(dsu, a, b) {
    const steps = [];
    const snap = () => ({ parent: [...dsu.parent], size: [...dsu.size] });
    const initialParent = [...dsu.parent];

    // Step 0: Starting
    steps.push({
        desc: `Calling <span class="op-name">unite</span>(<span class="node-ref">${a}</span>, <span class="node-ref">${b}</span>)`,
        codeIds: ['unite-sig'],
        nodes: { [a]: 'active', [b]: 'active' },
        edges: [],
        ...snap(),
        arrayHL: { parent: [a, b], size: [] },
        changedCells: { parent: [], size: [] },
    });

    // Steps: find root of a
    steps.push({
        desc: `Finding root of <span class="node-ref">${a}</span>: a = find(${a})`,
        codeIds: ['unite-finda'],
        nodes: { [a]: 'active' },
        edges: [],
        ...snap(),
        arrayHL: { parent: [a], size: [] },
        changedCells: { parent: [], size: [] },
    });

    const rootA = generateFindPathCompressionSteps(dsu, a, steps);

    steps.push({
        desc: `Root of <span class="node-ref">${a}</span> is <span class="node-ref">${rootA}</span>`,
        codeIds: ['unite-finda'],
        nodes: { [rootA]: 'found', [a]: 'active' },
        edges: [],
        ...snap(),
        arrayHL: { parent: [rootA], size: [] },
        changedCells: { parent: [], size: [] },
    });

    // Steps: find root of b
    steps.push({
        desc: `Finding root of <span class="node-ref">${b}</span>: b = find(${b})`,
        codeIds: ['unite-findb'],
        nodes: { [b]: 'active' },
        edges: [],
        ...snap(),
        arrayHL: { parent: [b], size: [] },
        changedCells: { parent: [], size: [] },
    });

    const rootB = generateFindPathCompressionSteps(dsu, b, steps);

    steps.push({
        desc: `Root of <span class="node-ref">${b}</span> is <span class="node-ref">${rootB}</span>`,
        codeIds: ['unite-findb'],
        nodes: { [rootB]: 'found', [b]: 'active' },
        edges: [],
        ...snap(),
        arrayHL: { parent: [rootB], size: [] },
        changedCells: { parent: [], size: [] },
    });

    // Check same root
    if (rootA === rootB) {
        steps.push({
            desc: `Root of <span class="node-ref">${a}</span> == Root of <span class="node-ref">${b}</span> == <span class="node-ref">${rootA}</span> → Already in same set!`,
            codeIds: ['unite-same'],
            nodes: { [rootA]: 'result-same', [a]: 'result-same', [b]: 'result-same' },
            edges: [],
            ...snap(),
            arrayHL: { parent: [rootA], size: [rootA] },
            changedCells: { parent: [], size: [] },
        });
        const hasChanged = dsu.parent.some((p, idx) => p !== initialParent[idx]);
        return { steps, changed: hasChanged };
    }

    steps.push({
        desc: `<span class="node-ref">${rootA}</span> ≠ <span class="node-ref">${rootB}</span> → different sets, proceeding with union`,
        codeIds: ['unite-same'],
        nodes: { [rootA]: 'found', [rootB]: 'found' },
        edges: [],
        ...snap(),
        arrayHL: { parent: [rootA, rootB], size: [] },
        changedCells: { parent: [], size: [] },
    });

    // Compare sizes
    let pa = rootA, pb = rootB;
    const szA = dsu.size[pa], szB = dsu.size[pb];
    steps.push({
        desc: `Comparing sizes: sz[<span class="node-ref">${pa}</span>] = ${szA}, sz[<span class="node-ref">${pb}</span>] = ${szB}`,
        codeIds: ['unite-cmp'],
        nodes: { [pa]: 'found', [pb]: 'found' },
        edges: [],
        ...snap(),
        arrayHL: { parent: [], size: [pa, pb] },
        changedCells: { parent: [], size: [] },
    });

    if (szA < szB) {
        [pa, pb] = [pb, pa];
        steps.push({
            desc: `sz[<span class="node-ref">${rootA}</span>] < sz[<span class="node-ref">${rootB}</span>] → swap so larger root is <span class="node-ref">${pa}</span>`,
            codeIds: ['unite-swap'],
            nodes: { [pa]: 'found', [pb]: 'active' },
            edges: [],
            ...snap(),
            arrayHL: { parent: [], size: [pa, pb] },
            changedCells: { parent: [], size: [] },
        });
    } else {
        steps.push({
            desc: `sz[<span class="node-ref">${pa}</span>] ≥ sz[<span class="node-ref">${pb}</span>] → no swap needed`,
            codeIds: ['unite-cmp'],
            nodes: { [pa]: 'found', [pb]: 'active' },
            edges: [],
            ...snap(),
            arrayHL: { parent: [], size: [pa, pb] },
            changedCells: { parent: [], size: [] },
        });
    }

    // Attach
    dsu.parent[pb] = pa;
    steps.push({
        desc: `Setting p[<span class="node-ref">${pb}</span>] = <span class="node-ref">${pa}</span> — attaching tree rooted at ${pb} under ${pa}`,
        codeIds: ['unite-attach'],
        nodes: { [pa]: 'found', [pb]: 'joined' },
        edges: [[pb, pa]],
        parent: [...dsu.parent],
        size: [...dsu.size],
        arrayHL: { parent: [pb], size: [] },
        changedCells: { parent: [pb], size: [] },
    });

    // Update size
    dsu.size[pa] += dsu.size[pb];
    steps.push({
        desc: `Updating sz[<span class="node-ref">${pa}</span>] = ${dsu.size[pa] - dsu.size[pb]} + ${dsu.size[pb]} = <strong>${dsu.size[pa]}</strong>`,
        codeIds: ['unite-size'],
        nodes: { [pa]: 'joined', [pb]: 'joined' },
        edges: [[pb, pa]],
        parent: [...dsu.parent],
        size: [...dsu.size],
        arrayHL: { parent: [], size: [pa] },
        changedCells: { parent: [], size: [pa] },
    });

    // Done
    steps.push({
        desc: `<span class="op-name">unite</span>(<span class="node-ref">${a}</span>, <span class="node-ref">${b}</span>) complete ✓`,
        codeIds: ['unite-end'],
        nodes: { [pa]: 'result-same', [pb]: 'result-same', [a]: 'result-same', [b]: 'result-same' },
        edges: [[pb, pa]],
        parent: [...dsu.parent],
        size: [...dsu.size],
        arrayHL: { parent: [], size: [] },
        changedCells: { parent: [], size: [] },
    });

    return { steps, changed: true };
}

function generateFindSteps(dsu, a, b) {
    const steps = [];
    const snap = () => ({ parent: [...dsu.parent], size: [...dsu.size] });
    const initialParent = [...dsu.parent];

    steps.push({
        desc: `Checking if <span class="node-ref">${a}</span> and <span class="node-ref">${b}</span> are connected`,
        codeIds: ['conn-sig'],
        nodes: { [a]: 'active', [b]: 'active' },
        edges: [],
        ...snap(),
        arrayHL: { parent: [a, b], size: [] },
        changedCells: { parent: [], size: [] },
    });

    // Find root of a
    steps.push({
        desc: `Finding root of <span class="node-ref">${a}</span>`,
        codeIds: ['conn-return'],
        nodes: { [a]: 'active' },
        edges: [],
        ...snap(),
        arrayHL: { parent: [a], size: [] },
        changedCells: { parent: [], size: [] },
    });

    const rootA = generateFindPathCompressionSteps(dsu, a, steps);

    steps.push({
        desc: `Root of <span class="node-ref">${a}</span> is <span class="node-ref">${rootA}</span>`,
        codeIds: ['conn-return'],
        nodes: { [rootA]: 'found' },
        edges: [],
        ...snap(),
        arrayHL: { parent: [rootA], size: [] },
        changedCells: { parent: [], size: [] },
    });

    // Find root of b
    steps.push({
        desc: `Finding root of <span class="node-ref">${b}</span>`,
        codeIds: ['conn-return'],
        nodes: { [b]: 'active' },
        edges: [],
        ...snap(),
        arrayHL: { parent: [b], size: [] },
        changedCells: { parent: [], size: [] },
    });

    const rootB = generateFindPathCompressionSteps(dsu, b, steps);

    steps.push({
        desc: `Root of <span class="node-ref">${b}</span> is <span class="node-ref">${rootB}</span>`,
        codeIds: ['conn-return'],
        nodes: { [rootB]: 'found' },
        edges: [],
        ...snap(),
        arrayHL: { parent: [rootB], size: [] },
        changedCells: { parent: [], size: [] },
    });

    // Compare
    const same = rootA === rootB;
    if (same) {
        steps.push({
            desc: `Root of <span class="node-ref">${a}</span> == Root of <span class="node-ref">${b}</span> == <span class="node-ref">${rootA}</span> → <strong style="color:var(--success)">YES, same set!</strong>`,
            codeIds: ['conn-return'],
            nodes: { [a]: 'result-same', [b]: 'result-same', [rootA]: 'result-same' },
            edges: [],
            ...snap(),
            arrayHL: { parent: [rootA], size: [rootA] },
            changedCells: { parent: [], size: [] },
        });
    } else {
        steps.push({
            desc: `Root of <span class="node-ref">${a}</span> = <span class="node-ref">${rootA}</span> ≠ Root of <span class="node-ref">${b}</span> = <span class="node-ref">${rootB}</span> → <strong style="color:var(--error)">NO, different sets</strong>`,
            codeIds: ['conn-return'],
            nodes: { [a]: 'result-diff', [b]: 'result-diff', [rootA]: 'result-diff', [rootB]: 'result-diff' },
            edges: [],
            ...snap(),
            arrayHL: { parent: [rootA, rootB], size: [] },
            changedCells: { parent: [], size: [] },
        });
    }

    const hasChanged = dsu.parent.some((p, idx) => p !== initialParent[idx]);
    return { steps, changed: hasChanged };
}

// ================================================================
// Tree Layout Engine
// ================================================================
function computeTreeLayout(parent, size, n) {
    // Build children adjacency
    const children = Array.from({ length: n }, () => []);
    const roots = [];
    for (let i = 0; i < n; i++) {
        if (parent[i] === i) roots.push(i);
        else children[parent[i]].push(i);
    }

    // Sort children by value for consistent layout
    for (let i = 0; i < n; i++) children[i].sort((a, b) => a - b);

    // Separate singletons (root with no children) from real trees
    const singletons = roots.filter(r => children[r].length === 0);
    const treeroots = roots.filter(r => children[r].length > 0);

    const positions = {};

    // Lay out singletons in a 2D rectangular matrix box shape (cols x rows)
    const cols = Math.ceil(Math.sqrt(singletons.length));
    const rows = singletons.length > 0 ? Math.ceil(singletons.length / cols) : 0;
    const NODE_GAP_X = 95;
    const NODE_GAP_Y = 85;

    if (singletons.length > 0) {
        for (let i = 0; i < singletons.length; i++) {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const itemsInRow = Math.min(cols, singletons.length - row * cols);
            const startX = -((itemsInRow - 1) * NODE_GAP_X) / 2;

            positions[singletons[i]] = {
                x: startX + col * NODE_GAP_X,
                y: row * NODE_GAP_Y,
            };
        }
    }

    // Lay out real trees (hierarchical) below the singleton rectangle box
    let globalX = -((treeroots.length - 1) * CFG.TREE_GAP) / 2;
    const treeYOffset = singletons.length > 0
        ? (rows * NODE_GAP_Y) + 60
        : 0;

    function layoutSubtree(node, depth) {
        const kids = children[node];
        if (kids.length === 0) {
            positions[node] = { x: globalX, y: treeYOffset + depth * CFG.LEVEL_H };
            globalX += CFG.SIBLING_GAP;
            return;
        }
        const startX = globalX;
        for (const child of kids) {
            layoutSubtree(child, depth + 1);
        }
        const endX = globalX - CFG.SIBLING_GAP;
        positions[node] = {
            x: (startX + endX) / 2,
            y: treeYOffset + depth * CFG.LEVEL_H,
        };
    }

    for (const root of treeroots) {
        layoutSubtree(root, 0);
        globalX += CFG.TREE_GAP;
    }

    return { positions, roots, children, singletons };
}

// ================================================================
// SVG Renderer
// ================================================================
class Renderer {
    constructor(svg) {
        this.svg = svg;
        this.edgesGroup = svg.querySelector('#edges-group');
        this.nodesGroup = svg.querySelector('#nodes-group');
        this.nodeElements = {};
        this.onNodeHover = null;
        this.onNodeLeave = null;
    }

    render(parent, size, n, highlightNodes = {}, highlightEdges = []) {
        this.edgesGroup.innerHTML = '';
        this.nodesGroup.innerHTML = '';
        this.nodeElements = {};

        if (n === 0) return {};

        const layout = computeTreeLayout(parent, size, n);
        const { positions, roots, children, singletons } = layout;

        // Find bounds for centering
        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
        for (let i = 0; i < n; i++) {
            if (positions[i].x < minX) minX = positions[i].x;
            if (positions[i].x > maxX) maxX = positions[i].x;
            if (positions[i].y < minY) minY = positions[i].y;
            if (positions[i].y > maxY) maxY = positions[i].y;
        }
        const treeW = maxX - minX;
        const treeH = maxY - minY;
        const svgRect = this.svg.getBoundingClientRect();
        const offsetX = (svgRect.width / 2) - (treeW / 2) - minX;
        const offsetY = (svgRect.height / 2) - (treeH / 2) - minY;

        // Draw clean rectangular box around initialized singletons if present
        if (singletons && singletons.length > 0) {
            let sMinX = Infinity, sMaxX = -Infinity, sMinY = Infinity, sMaxY = -Infinity;
            for (const s of singletons) {
                const pos = positions[s];
                if (pos.x < sMinX) sMinX = pos.x;
                if (pos.x > sMaxX) sMaxX = pos.x;
                if (pos.y < sMinY) sMinY = pos.y;
                if (pos.y > sMaxY) sMaxY = pos.y;
            }
            const boxPadX = 45;
            const boxPadY = 36;
            const boxX = sMinX + offsetX - boxPadX;
            const boxY = sMinY + offsetY - boxPadY;
            const boxW = (sMaxX - sMinX) + boxPadX * 2;
            const boxH = (sMaxY - sMinY) + boxPadY * 2;

            const boxRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            boxRect.setAttribute('x', boxX);
            boxRect.setAttribute('y', boxY);
            boxRect.setAttribute('width', Math.max(120, boxW));
            boxRect.setAttribute('height', Math.max(80, boxH));
            boxRect.setAttribute('class', 'singleton-box');
            boxRect.setAttribute('rx', '12');
            this.edgesGroup.appendChild(boxRect);
        }

        // Highlighted edges set for quick lookup
        const hlEdgeSet = new Set(highlightEdges.map(e => `${e[0]}-${e[1]}`));

        // Draw edges
        for (let i = 0; i < n; i++) {
            if (parent[i] !== i) {
                const from = positions[i];
                const to = positions[parent[i]];
                const x1 = from.x + offsetX;
                const y1 = from.y + offsetY;
                const x2 = to.x + offsetX;
                const y2 = to.y + offsetY;

                // Calculate line start/end to stop at circle border
                const dx = x2 - x1, dy = y2 - y1;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 1) continue;
                const ux = dx / dist, uy = dy / dist;
                const sx = x1 + ux * CFG.NODE_R;
                const sy = y1 + uy * CFG.NODE_R;
                const ex = x2 - ux * (CFG.NODE_R + 2);
                const ey = y2 - uy * (CFG.NODE_R + 2);

                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', sx);
                line.setAttribute('y1', sy);
                line.setAttribute('x2', ex);
                line.setAttribute('y2', ey);
                line.setAttribute('class', 'edge-line');

                const key = `${i}-${parent[i]}`;
                if (hlEdgeSet.has(key)) {
                    line.classList.add('highlighted');
                }

                this.edgesGroup.appendChild(line);

                // Arrow at parent end
                const arrowSize = 8;
                const ax = ex, ay = ey;
                const perpX = -uy, perpY = ux;
                const p1x = ax - ux * arrowSize + perpX * arrowSize * 0.45;
                const p1y = ay - uy * arrowSize + perpY * arrowSize * 0.45;
                const p2x = ax - ux * arrowSize - perpX * arrowSize * 0.45;
                const p2y = ay - uy * arrowSize - perpY * arrowSize * 0.45;

                const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                arrow.setAttribute('points', `${ax},${ay} ${p1x},${p1y} ${p2x},${p2y}`);
                arrow.setAttribute('class', 'edge-arrow');
                if (hlEdgeSet.has(key)) arrow.classList.add('highlighted');
                this.edgesGroup.appendChild(arrow);
            }
        }

        // Draw nodes
        for (let i = 0; i < n; i++) {
            const x = positions[i].x + offsetX;
            const y = positions[i].y + offsetY;
            const isRoot = parent[i] === i;

            const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute('class', 'node-group');
            g.setAttribute('data-node', i);

            // Outer ring for root nodes
            if (isRoot) {
                const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                glow.setAttribute('cx', x);
                glow.setAttribute('cy', y);
                glow.setAttribute('r', CFG.NODE_R + 4);
                glow.setAttribute('fill', 'none');
                glow.setAttribute('stroke', '#64748b');
                glow.setAttribute('stroke-width', '1.5');
                glow.setAttribute('stroke-dasharray', '4 3');
                glow.setAttribute('opacity', '0.5');
                g.appendChild(glow);
            }

            // Circle — dull dark slate by default
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', x);
            circle.setAttribute('cy', y);
            circle.setAttribute('r', CFG.NODE_R);
            circle.setAttribute('class', 'node-circle');
            if (highlightNodes[i]) {
                circle.classList.add(highlightNodes[i]);
            }
            g.appendChild(circle);

            // Label
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', x);
            label.setAttribute('y', y);
            label.setAttribute('class', 'node-label');
            label.textContent = i;
            g.appendChild(label);

            // Size badge — always shown
            const badgeX = x + CFG.NODE_R + 6;
            const badgeY = y - CFG.NODE_R + 4;
            const badgeW = size[i] >= 10 ? 26 : 20;
            const badgeH = 17;

            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', badgeX - badgeW / 2);
            rect.setAttribute('y', badgeY - badgeH / 2);
            rect.setAttribute('width', badgeW);
            rect.setAttribute('height', badgeH);
            rect.setAttribute('class', 'size-badge-bg');
            rect.setAttribute('rx', '4');
            if (!isRoot) {
                rect.style.fill = '#334155';
                rect.style.opacity = '0.6';
            }
            g.appendChild(rect);

            const badgeText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            badgeText.setAttribute('x', badgeX);
            badgeText.setAttribute('y', badgeY);
            badgeText.setAttribute('class', 'size-badge-text');
            if (!isRoot) badgeText.style.fill = '#94a3b8';
            badgeText.textContent = size[i];
            g.appendChild(badgeText);

            // Hover events
            g.addEventListener('mouseenter', () => {
                if (this.onNodeHover) this.onNodeHover(i);
            });
            g.addEventListener('mouseleave', () => {
                if (this.onNodeLeave) this.onNodeLeave(i);
            });

            this.nodesGroup.appendChild(g);
            this.nodeElements[i] = g;
        }

        return layout;
    }
}

// ================================================================
// Pan & Zoom
// ================================================================
class PanZoom {
    constructor(container, viewport, indicator) {
        this.container = container;
        this.viewport = viewport;
        this.indicator = indicator;
        this.scale = 1;
        this.tx = 0;
        this.ty = 0;
        this.isPanning = false;
        this.startX = 0;
        this.startY = 0;
        this.startTx = 0;
        this.startTy = 0;

        this._onWheel = this._onWheel.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onTouchStart = this._onTouchStart.bind(this);
        this._onTouchMove = this._onTouchMove.bind(this);
        this._onTouchEnd = this._onTouchEnd.bind(this);

        container.addEventListener('wheel', this._onWheel, { passive: false });
        container.addEventListener('mousedown', this._onMouseDown);
        window.addEventListener('mousemove', this._onMouseMove);
        window.addEventListener('mouseup', this._onMouseUp);
        container.addEventListener('touchstart', this._onTouchStart, { passive: false });
        container.addEventListener('touchmove', this._onTouchMove, { passive: false });
        container.addEventListener('touchend', this._onTouchEnd);

        this._lastPinchDist = 0;
    }

    _apply() {
        this.viewport.setAttribute('transform', `translate(${this.tx}, ${this.ty}) scale(${this.scale})`);
        this.indicator.textContent = `${Math.round(this.scale * 100)}%`;
    }

    reset() {
        this.scale = 1;
        this.tx = 0;
        this.ty = 0;
        this._apply();
    }

    zoomIn() {
        this.scale = Math.min(CFG.MAX_ZOOM, this.scale * (1 + CFG.ZOOM_STEP));
        this._apply();
    }

    zoomOut() {
        this.scale = Math.max(CFG.MIN_ZOOM, this.scale * (1 - CFG.ZOOM_STEP));
        this._apply();
    }

    _onWheel(e) {
        e.preventDefault();
        const rect = this.container.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        const oldScale = this.scale;
        if (e.deltaY < 0) this.scale = Math.min(CFG.MAX_ZOOM, this.scale * (1 + CFG.ZOOM_STEP));
        else this.scale = Math.max(CFG.MIN_ZOOM, this.scale * (1 - CFG.ZOOM_STEP));

        // Zoom toward cursor
        const factor = this.scale / oldScale;
        this.tx = mx - factor * (mx - this.tx);
        this.ty = my - factor * (my - this.ty);
        this._apply();
    }

    _onMouseDown(e) {
        if (e.target.closest('.node-group')) return;
        this.isPanning = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.startTx = this.tx;
        this.startTy = this.ty;
        this.container.classList.add('grabbing');
    }

    _onMouseMove(e) {
        if (!this.isPanning) return;
        this.tx = this.startTx + (e.clientX - this.startX);
        this.ty = this.startTy + (e.clientY - this.startY);
        this._apply();
    }

    _onMouseUp() {
        this.isPanning = false;
        this.container.classList.remove('grabbing');
    }

    _onTouchStart(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            this._lastPinchDist = Math.sqrt(dx * dx + dy * dy);
        } else if (e.touches.length === 1) {
            this.isPanning = true;
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
            this.startTx = this.tx;
            this.startTy = this.ty;
        }
    }

    _onTouchMove(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (this._lastPinchDist > 0) {
                const factor = dist / this._lastPinchDist;
                this.scale = Math.max(CFG.MIN_ZOOM, Math.min(CFG.MAX_ZOOM, this.scale * factor));
                this._apply();
            }
            this._lastPinchDist = dist;
        } else if (e.touches.length === 1 && this.isPanning) {
            this.tx = this.startTx + (e.touches[0].clientX - this.startX);
            this.ty = this.startTy + (e.touches[0].clientY - this.startY);
            this._apply();
        }
    }

    _onTouchEnd() {
        this.isPanning = false;
        this._lastPinchDist = 0;
    }
}

// ================================================================
// Toast Notifications
// ================================================================
function showToast(message, type = 'info', duration = 3000) {
    if (type === 'success' || type === 'info') return; // Disable green and blue non-error toast popups
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(30px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ================================================================
// Main Application
// ================================================================
class App {
    constructor() {
        // DOM refs
        this.stepDesc = document.getElementById('step-description');
        this.stepCounter = document.getElementById('step-counter');
        this.stepBar = document.getElementById('step-bar');
        this.stepNavCounter = document.getElementById('step-nav-counter');

        this.componentBadge = document.getElementById('component-badge');
        this.compCountVal = document.getElementById('comp-count-val');

        // Onboarding and Tutorial DOM refs
        this.theoryModalOverlay = document.getElementById('theory-modal-overlay');
        this.btnTheoryStart = document.getElementById('btn-theory-start');
        this.btnTheorySkip = document.getElementById('btn-theory-skip');
        this.btnTheoryGuide = document.getElementById('btn-theory-guide');

        this.tutorialCard = document.getElementById('tutorial-card');
        this.tutCurrentChapterEl = document.getElementById('tut-current-chapter');
        this.tutTitleEl = document.getElementById('tut-title');
        this.tutContentEl = document.getElementById('tut-content');
        this.btnTutPrev = document.getElementById('btn-tut-prev');
        this.btnTutNext = document.getElementById('btn-tut-next');
        this.btnTutPlay = document.getElementById('btn-tut-play');
        this.btnTutClose = document.getElementById('btn-tut-close');

        // Modal Popup DOM refs
        this.initModalOverlay = document.getElementById('init-modal-overlay');
        this.modalInputN = document.getElementById('modal-input-n');
        this.btnModalStart = document.getElementById('btn-modal-start');

        this.btnPlayPause = document.getElementById('btn-play-pause');

        this.inputN = document.getElementById('input-n');
        this.inputA = document.getElementById('input-a');
        this.inputB = document.getElementById('input-b');

        this.btnInit = document.getElementById('btn-init');
        this.btnAddNode = document.getElementById('btn-add-node');
        this.btnUnion = document.getElementById('btn-union');
        this.btnFind = document.getElementById('btn-find');
        this.btnUndo = document.getElementById('btn-undo');
        this.btnRedo = document.getElementById('btn-redo');
        this.btnPrev = document.getElementById('btn-prev');
        this.btnNext = document.getElementById('btn-next');
        this.btnSkip = document.getElementById('btn-skip');
        this.btnZoomIn = document.getElementById('btn-zoom-in');
        this.btnZoomOut = document.getElementById('btn-zoom-out');
        this.btnZoomReset = document.getElementById('btn-zoom-reset');

        this.btnToggleCode = document.getElementById('btn-toggle-code');
        this.btnCloseCode = document.getElementById('btn-close-code');
        this.codePanel = document.getElementById('code-panel');

        this.btnToggleHistory = document.getElementById('btn-toggle-history');
        this.btnCloseHistory = document.getElementById('btn-close-history');
        this.historyPanel = document.getElementById('history-panel');
        this.historyTableBody = document.getElementById('history-table-body');

        this.arrayPanel = document.getElementById('array-panel');
        this.parentArrayEl = document.getElementById('parent-array');
        this.sizeArrayEl = document.getElementById('size-array');

        this.emptyState = document.getElementById('empty-state');

        const svg = document.getElementById('tree-svg');
        const viewport = document.getElementById('viewport');
        const indicator = document.getElementById('zoom-indicator');
        const container = document.getElementById('canvas-container');

        this.renderer = new Renderer(svg);
        this.panZoom = new PanZoom(container, viewport, indicator);

        // State
        this.dsu = null;
        this.history = [];   // stack of { parent, size } snapshots for Undo
        this.redoStack = []; // stack of { parent, size } snapshots for Redo
        this.opHistory = []; // operation history for Components table
        this.steps = null;
        this.currentStep = -1;
        this.isPlaying = false;
        this.autoPlayTimer = null;
        this.isAutoPlaying = false;
        this.operationChanged = false;

        this.hoveredNode = -1;

        // Tutorial State
        this.isTutorialMode = false;
        this.tutorialChapter = 1;

        // Build code panel
        this._buildCodePanel();

        // Bind events
        if (this.btnModalStart) {
            this.btnModalStart.addEventListener('click', () => {
                const nVal = parseInt(this.modalInputN.value);
                if (!isNaN(nVal) && nVal >= 1 && nVal <= 20) {
                    this.inputN.value = nVal;
                }
                this.closeInitModal();
                this.init();
            });
        }

        // Onboarding and Tutorial Event Bindings
        if (this.btnTheoryStart) {
            this.btnTheoryStart.addEventListener('click', () => {
                this.closeTheoryModal();
                this.startGuidedTour();
            });
        }
        if (this.btnTheorySkip) {
            this.btnTheorySkip.addEventListener('click', () => {
                this.closeTheoryModal();
            });
        }
        if (this.btnTheoryGuide) {
            this.btnTheoryGuide.addEventListener('click', () => {
                this.startGuidedTour();
            });
        }
        if (this.btnTutPrev) {
            this.btnTutPrev.addEventListener('click', () => this.prevChapter());
        }
        if (this.btnTutNext) {
            this.btnTutNext.addEventListener('click', () => this.nextChapter());
        }
        if (this.btnTutPlay) {
            this.btnTutPlay.addEventListener('click', () => {
                this._toggleAutoPlay();
            });
        }
        if (this.btnTutClose) {
            this.btnTutClose.addEventListener('click', () => this.exitGuidedTour());
        }

        this.btnInit.addEventListener('click', () => this.openInitModal());
        if (this.btnAddNode) {
            this.btnAddNode.addEventListener('click', () => this.addNode());
        }
        this.btnUnion.addEventListener('click', () => this.startUnion());
        this.btnFind.addEventListener('click', () => this.startFind());
        this.btnUndo.addEventListener('click', () => this.undo());
        this.btnRedo.addEventListener('click', () => this.redo());
        this.btnPrev.addEventListener('click', () => {
            this._stopAutoPlay();
            this.prevStep();
        });
        this.btnNext.addEventListener('click', () => {
            this._stopAutoPlay();
            this.nextStep();
        });
        this.btnSkip.addEventListener('click', () => {
            this._stopAutoPlay();
            this.skipToEnd();
        });
        if (this.btnPlayPause) {
            this.btnPlayPause.addEventListener('click', () => this._toggleAutoPlay());
        }
        this.btnZoomIn.addEventListener('click', () => this.panZoom.zoomIn());
        this.btnZoomOut.addEventListener('click', () => this.panZoom.zoomOut());
        this.btnZoomReset.addEventListener('click', () => this.panZoom.reset());

        const toggleCode = () => {
            this.codePanel.classList.toggle('collapsed');
        };
        if (this.btnToggleCode) this.btnToggleCode.addEventListener('click', toggleCode);
        if (this.btnCloseCode) this.btnCloseCode.addEventListener('click', toggleCode);

        const toggleHistory = () => {
            this.historyPanel.classList.toggle('collapsed');
        };
        if (this.btnToggleHistory) this.btnToggleHistory.addEventListener('click', toggleHistory);
        if (this.btnCloseHistory) this.btnCloseHistory.addEventListener('click', toggleHistory);

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT') return;
            if (e.key === 'ArrowRight' || e.key === 'n') this.nextStep();
            if (e.key === 'ArrowLeft' || e.key === 'p') this.prevStep();
            if (e.key === '+' || e.key === '=') this.panZoom.zoomIn();
            if (e.key === '-') this.panZoom.zoomOut();
            if (e.key === '0') this.panZoom.reset();
        });

        // Linked hover
        this.renderer.onNodeHover = (i) => this._onNodeHover(i);
        this.renderer.onNodeLeave = (i) => this._onNodeLeave(i);

        // Open theory onboarding modal popup on startup
        setTimeout(() => {
            this.openTheoryModal();
        }, 300);
    }

    _countComponents(parent) {
        if (!parent) return 0;
        let cnt = 0;
        for (let i = 0; i < parent.length; i++) {
            if (parent[i] === i) cnt++;
        }
        return cnt;
    }

    _updateComponentBadge(parent) {
        if (!this.dsu || !parent) return;
        const count = this._countComponents(parent);
        if (this.compCountVal) this.compCountVal.textContent = count;
        if (this.componentBadge) this.componentBadge.style.display = 'inline-flex';
    }

    _recordHistory(opName, detail, parentState) {
        const comps = this._countComponents(parentState);
        const stepNum = this.opHistory.length;
        this.opHistory.push({ stepNum, opName, detail, components: comps });
        this._renderHistoryTable();
    }

    _renderHistoryTable() {
        if (!this.historyTableBody) return;
        this.historyTableBody.innerHTML = '';
        this.opHistory.forEach((item) => {
            const tr = document.createElement('tr');
            if (item.stepNum === this.opHistory.length - 1) tr.classList.add('active-hist-step');
            tr.innerHTML = `
                <td>${item.stepNum}</td>
                <td>${item.opName}${item.detail ? ` (${item.detail})` : ''}</td>
                <td><span class="comp-num-tag">${item.components}</span></td>
            `;
            this.historyTableBody.appendChild(tr);
        });
        const scroll = document.getElementById('history-scroll');
        if (scroll) scroll.scrollTop = scroll.scrollHeight;
    }

    _buildCodePanel() {
        const scroll = document.getElementById('code-scroll');
        scroll.innerHTML = '';
        CPP_LINES.forEach((line, idx) => {
            const div = document.createElement('div');
            div.className = 'code-line';
            div.setAttribute('data-code-id', line.id);
            div.innerHTML = `<span class="code-linenum">${idx + 1}</span><span class="code-text">${line.html || '&nbsp;'}</span>`;
            scroll.appendChild(div);
        });
        this.codeLines = scroll.querySelectorAll('.code-line');
    }

    _highlightCode(codeIds, type = 'highlighted') {
        this.codeLines.forEach(el => {
            el.classList.remove('highlighted', 'active-find');
        });
        if (!codeIds) return;
        const cls = type === 'find' ? 'active-find' : 'highlighted';
        for (const id of codeIds) {
            const el = document.querySelector(`[data-code-id="${id}"]`);
            if (el) {
                el.classList.add(cls);
                el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    }

    _buildArrays() {
        if (!this.dsu) return;
        this.parentArrayEl.innerHTML = '';
        this.sizeArrayEl.innerHTML = '';

        for (let i = 0; i < this.dsu.n; i++) {
            // Parent cell
            const pCell = document.createElement('div');
            pCell.className = 'array-cell';
            pCell.setAttribute('data-arr-node', i);
            pCell.innerHTML = `<span class="array-index">${i}</span><span class="array-value" id="p-val-${i}">${this.dsu.parent[i]}</span>`;
            pCell.addEventListener('mouseenter', () => this._onArrayHover(i));
            pCell.addEventListener('mouseleave', () => this._onArrayLeave(i));
            this.parentArrayEl.appendChild(pCell);

            // Size cell
            const sCell = document.createElement('div');
            sCell.className = 'array-cell';
            sCell.innerHTML = `<span class="array-index">${i}</span><span class="array-value" id="sz-val-${i}">${this.dsu.size[i]}</span>`;
            sCell.addEventListener('mouseenter', () => this._onArrayHover(i));
            sCell.addEventListener('mouseleave', () => this._onArrayLeave(i));
            this.sizeArrayEl.appendChild(sCell);
        }
    }

    _updateArrays(parent, size, highlightCells = null, changedCells = null) {
        if (!this.dsu) return;
        for (let i = 0; i < this.dsu.n; i++) {
            const pVal = document.getElementById(`p-val-${i}`);
            const szVal = document.getElementById(`sz-val-${i}`);
            if (pVal) pVal.textContent = parent[i];
            if (szVal) szVal.textContent = size[i];

            const pCell = pVal?.closest('.array-cell');
            const sCell = szVal?.closest('.array-cell');
            if (pCell) pCell.classList.remove('highlighted', 'active', 'changed');
            if (sCell) sCell.classList.remove('highlighted', 'active', 'changed');

            if (highlightCells) {
                if (highlightCells.parent?.includes(i) && pCell) pCell.classList.add('active');
                if (highlightCells.size?.includes(i) && sCell) sCell.classList.add('active');
            }
            if (changedCells) {
                if (changedCells.parent?.includes(i) && pCell) pCell.classList.add('changed');
                if (changedCells.size?.includes(i) && sCell) sCell.classList.add('changed');
            }
        }
    }

    _onNodeHover(i) {
        this.hoveredNode = i;
        // Highlight corresponding array cell
        const pCells = this.parentArrayEl.querySelectorAll('.array-cell');
        if (pCells[i]) pCells[i].classList.add('highlighted');
        const sCells = this.sizeArrayEl.querySelectorAll('.array-cell');
        if (sCells[i]) sCells[i].classList.add('highlighted');
    }

    _onNodeLeave(i) {
        this.hoveredNode = -1;
        const pCells = this.parentArrayEl.querySelectorAll('.array-cell');
        if (pCells[i]) pCells[i].classList.remove('highlighted');
        const sCells = this.sizeArrayEl.querySelectorAll('.array-cell');
        if (sCells[i]) sCells[i].classList.remove('highlighted');
    }

    _onArrayHover(i) {
        // Highlight corresponding tree node
        const nodeEl = this.renderer.nodeElements[i];
        if (nodeEl) {
            const circle = nodeEl.querySelector('.node-circle');
            if (circle) circle.style.stroke = 'var(--accent-light)';
            if (circle) circle.style.strokeWidth = '3';
        }
        // Also highlight the cell itself
        const pCells = this.parentArrayEl.querySelectorAll('.array-cell');
        if (pCells[i]) pCells[i].classList.add('highlighted');
        const sCells = this.sizeArrayEl.querySelectorAll('.array-cell');
        if (sCells[i]) sCells[i].classList.add('highlighted');
    }

    _onArrayLeave(i) {
        const nodeEl = this.renderer.nodeElements[i];
        if (nodeEl) {
            const circle = nodeEl.querySelector('.node-circle');
            if (circle) circle.style.stroke = '';
            if (circle) circle.style.strokeWidth = '';
        }
        const pCells = this.parentArrayEl.querySelectorAll('.array-cell');
        if (pCells[i]) pCells[i].classList.remove('highlighted');
        const sCells = this.sizeArrayEl.querySelectorAll('.array-cell');
        if (sCells[i]) sCells[i].classList.remove('highlighted');
    }

    openInitModal() {
        if (this.initModalOverlay) {
            this.initModalOverlay.classList.remove('hidden');
            if (this.modalInputN) {
                this.modalInputN.value = this.inputN ? this.inputN.value || 6 : 6;
                this.modalInputN.focus();
                this.modalInputN.select();
            }
        }
    }

    closeInitModal() {
        if (this.initModalOverlay) {
            this.initModalOverlay.classList.add('hidden');
        }
    }

    _startAutoPlay() {
        this._stopAutoPlay();
        this.isAutoPlaying = true;
        if (this.btnPlayPause) {
            this.btnPlayPause.textContent = '⏸ Pause';
            this.btnPlayPause.className = 'btn btn-warning';
        }
        if (this.btnTutPlay) {
            this.btnTutPlay.textContent = '⏸ Pause';
            this.btnTutPlay.style.background = '#f59e0b';
        }
        this._runAutoPlayTimeout();
    }

    _runAutoPlayTimeout() {
        if (!this.isAutoPlaying) return;
        this.autoPlayTimer = setTimeout(() => {
            if (this.steps && this.currentStep < this.steps.length - 1) {
                this.nextStep();
                this._runAutoPlayTimeout();
            } else {
                this._stopAutoPlay();
            }
        }, 1000);
    }

    _stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearTimeout(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
        this.isAutoPlaying = false;
        if (this.btnPlayPause) {
            this.btnPlayPause.textContent = '▶ Play';
            this.btnPlayPause.className = 'btn btn-secondary';
        }
        if (this.btnTutPlay) {
            this.btnTutPlay.textContent = '▶ Play';
            this.btnTutPlay.style.background = '#eab308';
        }
    }

    _toggleAutoPlay() {
        if (!this.steps) return;
        if (this.isAutoPlaying) {
            this._stopAutoPlay();
        } else {
            this._startAutoPlay();
        }
    }

    _setStepUI(active) {
        this.isPlaying = active;

        const isTut = this.isTutorialMode;
        this.btnUnion.disabled = isTut || active || !this.dsu;
        this.btnFind.disabled = isTut || active || !this.dsu;
        this.btnUndo.disabled = isTut || active || this.history.length === 0;
        this.btnRedo.disabled = isTut || active || this.redoStack.length === 0;
        this.btnInit.disabled = isTut || active;
        if (this.btnAddNode) this.btnAddNode.disabled = isTut || active || !this.dsu;
        this.inputA.disabled = isTut || active || !this.dsu;
        this.inputB.disabled = isTut || active || !this.dsu;
        this.inputN.disabled = isTut || active;

        // In tutorial mode, we completely disable the step player since diagrams are static
        const hasSteps = !isTut && active && this.steps && this.steps.length > 0;
        this.btnPrev.disabled = !hasSteps || this.currentStep <= 0;
        this.btnNext.disabled = !hasSteps;
        this.btnSkip.disabled = !hasSteps;
        if (this.btnPlayPause) this.btnPlayPause.disabled = !hasSteps;
        this.stepCounter.style.display = hasSteps ? '' : 'none';
    }

    _renderStep(idx) {
        if (!this.steps || idx < 0 || idx >= this.steps.length) return;
        const step = this.steps[idx];
        this.currentStep = idx;

        // Update step bar
        this.stepDesc.innerHTML = step.desc;
        this.stepCounter.textContent = `${idx + 1} / ${this.steps.length}`;
        this.stepNavCounter.textContent = `${idx + 1} / ${this.steps.length}`;

        // Update navigation buttons: keep Next enabled even on last step so clicking Next automatically finishes!
        this.btnPrev.disabled = idx === 0;
        this.btnNext.disabled = false;

        // Render tree with step's state
        this.renderer.render(step.parent, step.size, this.dsu.n, step.nodes, step.edges);

        // Highlight code
        const isFind = step.codeIds?.some(id => id.startsWith('find-') || id.startsWith('conn-'));
        this._highlightCode(step.codeIds, isFind ? 'find' : 'highlighted');

        // Update arrays & live component count
        this._updateArrays(step.parent, step.size, step.arrayHL, step.changedCells);
        this._updateComponentBadge(step.parent);

        // Re-attach hover handlers
        this.renderer.onNodeHover = (i) => this._onNodeHover(i);
        this.renderer.onNodeLeave = (i) => this._onNodeLeave(i);
    }

    // ---- Public API ----

    init() {
        const n = parseInt(this.inputN.value);
        if (isNaN(n) || n < 1 || n > 20) {
            showToast('Enter a valid number of nodes (1–20)', 'error');
            return;
        }

        this._stopAutoPlay();

        // Reset
        this.dsu = new DSU(n);
        this.history = [];
        this.redoStack = [];
        this.opHistory = [];
        this.steps = null;
        this.currentStep = -1;
        this.operationChanged = false;

        // Record Initial state in History table
        this._recordHistory('Init', `${n}`, this.dsu.parent);

        // Update max for inputs
        this.inputA.max = n - 1;
        this.inputB.max = n - 1;
        this.inputA.value = '0';
        this.inputB.value = '1';

        // Show arrays & live badge
        this.arrayPanel.style.display = '';
        this._buildArrays();
        this._updateComponentBadge(this.dsu.parent);

        // Hide empty state
        this.emptyState.style.display = 'none';

        // Enable controls
        this._setStepUI(false);
        this.btnZoomIn.disabled = false;
        this.btnZoomOut.disabled = false;
        this.btnZoomReset.disabled = false;

        // Render initial tree
        this.renderer.render(this.dsu.parent, this.dsu.size, this.dsu.n);

        // Highlight init code
        this._highlightCode(['init-sig', 'init-loop', 'init-parent', 'init-size']);

        this.stepDesc.innerHTML = `Initialized <span class="node-ref">${n}</span> nodes (0 to ${n - 1}). Each node is its own parent, size = 1.`;

        this.panZoom.reset();
        showToast(`DSU initialized with ${n} nodes`, 'success');
    }

    startUnion() {
        let a = parseInt(this.inputA.value);
        let b = parseInt(this.inputB.value);
        if (isNaN(a)) { a = 0; this.inputA.value = 0; }
        if (isNaN(b)) { b = 1; this.inputB.value = 1; }
        if (!this._validateInput(a, b)) return;

        // Clone DSU for step generation (steps will mutate the clone)
        const dsuClone = this.dsu.clone();
        const result = generateUnionSteps(dsuClone, a, b);

        this.steps = result.steps;
        this.operationChanged = result.changed;
        this._currentOpInfo = { name: 'Union', detail: `${a}, ${b}` };
        // Save the final DSU state after the operation
        this._finalDsu = dsuClone;
        this.currentStep = -1;

        this._setStepUI(true);
        this._renderStep(0);
        this._startAutoPlay();
    }

    startFind() {
        const a = parseInt(this.inputA.value);
        const b = parseInt(this.inputB.value);
        if (!this._validateInput(a, b)) return;

        const dsuClone = this.dsu.clone();
        const result = generateFindSteps(dsuClone, a, b);

        this.steps = result.steps;
        this.operationChanged = result.changed;
        this._currentOpInfo = { name: 'Find', detail: `${a}, ${b}` };
        this._finalDsu = dsuClone;
        this.currentStep = -1;

        this._setStepUI(true);
        this._renderStep(0);
        this._startAutoPlay();
    }

    _validateInput(a, b) {
        if (isNaN(a) || isNaN(b) || a < 0 || b < 0 || a >= this.dsu.n || b >= this.dsu.n) {
            showToast(`Enter valid nodes (0 to ${this.dsu.n - 1})`, 'error');
            return false;
        }
        if (a === b) {
            showToast('Nodes must be different', 'error');
            return false;
        }
        return true;
    }

    nextStep() {
        if (!this.steps) return;
        if (this.currentStep < this.steps.length - 1) {
            this._renderStep(this.currentStep + 1);
        } else {
            // At or past last step — automatically complete / skip operation!
            this._commitOperation();
        }
    }

    prevStep() {
        if (!this.steps) return;
        if (this.currentStep > 0) {
            this._renderStep(this.currentStep - 1);
        }
    }

    skipToEnd() {
        if (!this.steps) return;
        this._renderStep(this.steps.length - 1);
        // Auto-commit after a short pause
        setTimeout(() => this._commitOperation(), 400);
    }

    _commitOperation() {
        this._stopAutoPlay();
        if (this.operationChanged && this._finalDsu) {
            // Push current state to history for Undo
            this.history.push({
                parent: [...this.dsu.parent],
                size: [...this.dsu.size],
                opHistorySnap: [...this.opHistory],
            });
            // Clear Redo stack on new operation
            this.redoStack = [];

            // Apply final state
            this.dsu.parent = [...this._finalDsu.parent];
            this.dsu.size = [...this._finalDsu.size];

            if (this._currentOpInfo) {
                this._recordHistory(this._currentOpInfo.name, this._currentOpInfo.detail, this.dsu.parent);
            }
        }

        this.steps = null;
        this._finalDsu = null;
        this._currentOpInfo = null;
        this.currentStep = -1;
        this.operationChanged = false;

        this._setStepUI(false);
        this._highlightCode(null);
        this.stepNavCounter.textContent = '—';

        // Render current state
        this.renderer.render(this.dsu.parent, this.dsu.size, this.dsu.n);
        this._buildArrays();
        this._updateComponentBadge(this.dsu.parent);

        this.stepDesc.innerHTML = 'Operation complete. Enter nodes for the next operation.';
        this.stepBar.classList.add('idle');

        this.btnUndo.disabled = this.history.length === 0;
        this.btnRedo.disabled = this.redoStack.length === 0;
    }

    undo() {
        if (this.history.length === 0) return;

        // Push current state to Redo stack
        this.redoStack.push({
            parent: [...this.dsu.parent],
            size: [...this.dsu.size],
            opHistorySnap: [...this.opHistory],
        });

        // Pop state from Undo history
        const prev = this.history.pop();
        this.dsu.parent = prev.parent;
        this.dsu.size = prev.size;
        this.dsu.n = prev.parent.length;
        this.inputN.value = this.dsu.n;
        this.inputA.max = this.dsu.n - 1;
        this.inputB.max = this.dsu.n - 1;
        this.opHistory = prev.opHistorySnap ? [...prev.opHistorySnap] : [];

        // Clear any step playback
        this.steps = null;
        this.currentStep = -1;
        this._setStepUI(false);
        this._highlightCode(null);
        this.stepNavCounter.textContent = '—';

        this.renderer.render(this.dsu.parent, this.dsu.size, this.dsu.n);
        this._buildArrays();
        this._updateComponentBadge(this.dsu.parent);
        this._renderHistoryTable();

        this.stepDesc.innerHTML = 'Last union undone. State restored.';
        this.stepBar.classList.add('idle');
        this.btnUndo.disabled = this.history.length === 0;
        this.btnRedo.disabled = this.redoStack.length === 0;

        showToast('Last union undone', 'info');
    }

    redo() {
        if (this.redoStack.length === 0) return;

        // Push current state to Undo history
        this.history.push({
            parent: [...this.dsu.parent],
            size: [...this.dsu.size],
            opHistorySnap: [...this.opHistory],
        });

        // Pop state from Redo stack
        const next = this.redoStack.pop();
        this.dsu.parent = next.parent;
        this.dsu.size = next.size;
        this.dsu.n = next.parent.length;
        this.inputN.value = this.dsu.n;
        this.inputA.max = this.dsu.n - 1;
        this.inputB.max = this.dsu.n - 1;
        this.opHistory = next.opHistorySnap ? [...next.opHistorySnap] : [];

        // Clear any step playback
        this.steps = null;
        this.currentStep = -1;
        this._setStepUI(false);
        this._highlightCode(null);
        this.stepNavCounter.textContent = '—';

        this.renderer.render(this.dsu.parent, this.dsu.size, this.dsu.n);
        this._buildArrays();
        this._updateComponentBadge(this.dsu.parent);
        this._renderHistoryTable();

        this.stepDesc.innerHTML = 'Union redone. State updated.';
        this.stepBar.classList.add('idle');
        this.btnUndo.disabled = this.history.length === 0;
        this.btnRedo.disabled = this.redoStack.length === 0;

        showToast('Union redone', 'success');
    }

    addNode() {
        if (!this.dsu) return;
        if (this.dsu.n >= 20) {
            showToast('Maximum of 20 nodes allowed', 'error');
            return;
        }

        // Push current state to undo history
        this.history.push({
            parent: [...this.dsu.parent],
            size: [...this.dsu.size],
            opHistorySnap: [...this.opHistory],
        });
        this.redoStack = [];

        // Add node
        const newIdx = this.dsu.n;
        this.dsu.parent.push(newIdx);
        this.dsu.size.push(1);
        this.dsu.n++;

        // Update inputs
        this.inputN.value = this.dsu.n;
        this.inputA.max = this.dsu.n - 1;
        this.inputB.max = this.dsu.n - 1;

        // Record operation history
        this._recordHistory('Add Node', `${newIdx}`, this.dsu.parent);

        // Re-render and build arrays
        this._buildArrays();
        this._updateComponentBadge(this.dsu.parent);
        this.renderer.render(this.dsu.parent, this.dsu.size, this.dsu.n);

        this.stepDesc.innerHTML = `Added new node <span class="node-ref">${newIdx}</span>. It is its own parent, size = 1.`;

        // Update Undo/Redo button states
        this.btnUndo.disabled = false;
        this.btnRedo.disabled = true;

        showToast(`Node ${newIdx} added successfully`, 'success');
    }

    openTheoryModal() {
        if (this.theoryModalOverlay) {
            this.theoryModalOverlay.classList.remove('hidden');
        }
    }

    closeTheoryModal() {
        if (this.theoryModalOverlay) {
            this.theoryModalOverlay.classList.add('hidden');
        }
    }

    startGuidedTour() {
        this.isTutorialMode = true;
        this.tutorialChapter = 1;
        if (this.tutorialCard) {
            this.tutorialCard.classList.remove('hidden');
        }
        if (this.codePanel && this.codePanel.classList.contains('collapsed')) {
            this.codePanel.classList.remove('collapsed');
        }
        this.loadChapter(1);
    }

    exitGuidedTour() {
        this.isTutorialMode = false;
        if (this.tutorialCard) {
            this.tutorialCard.classList.add('hidden');
        }
        this._stopAutoPlay();
        this.init();
    }

    nextChapter() {
        if (!this.isTutorialMode) return;
        this._stopAutoPlay();
        if (this.tutorialChapter >= 4) {
            this.exitGuidedTour();
            showToast('Guided Tour Complete! Sandbox Mode Unlocked.', 'success');
        } else {
            this.loadChapter(this.tutorialChapter + 1);
        }
    }

    prevChapter() {
        if (!this.isTutorialMode) return;
        this._stopAutoPlay();
        if (this.tutorialChapter > 1) {
            this.loadChapter(this.tutorialChapter - 1);
        }
    }

    loadChapter(chapterNum) {
        this.tutorialChapter = chapterNum;

        // Update dot indicators
        const dots = this.tutorialCard.querySelectorAll('.tutorial-progress .dot');
        dots.forEach((dot, idx) => {
            if (idx === chapterNum - 1) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        if (this.tutCurrentChapterEl) this.tutCurrentChapterEl.textContent = chapterNum;

        // Back button state
        if (this.btnTutPrev) this.btnTutPrev.disabled = chapterNum === 1;
        if (this.btnTutNext) {
            this.btnTutNext.textContent = chapterNum === 4 ? 'Finish ✓' : 'Next ▸';
        }
        if (this.btnTutPlay) {
            this.btnTutPlay.style.display = chapterNum === 1 ? 'none' : 'inline-block';
            this.btnTutPlay.textContent = '▶ Play';
            this.btnTutPlay.style.background = '#eab308';
        }

        if (chapterNum === 1) {
            this.tutTitleEl.textContent = '1. The Problem';
            this.tutContentEl.innerHTML = `
                <p>DSU manages grouped items (e.g. connected nodes in a graph) and checks connection states efficiently.</p>
                <p>Initially, we call <code>makeSet(x)</code> for each node. Each node is its own representative with a parent pointing to itself and <strong>size = 1</strong>. This takes <strong>O(1)</strong> time.</p>
                <p>Observe the 6 singletons on the canvas. No connections exist yet.</p>
            `;

            this.dsu = new DSU(6);
            this.history = [];
            this.redoStack = [];
            this.opHistory = [];
            this.steps = null;
            this.currentStep = -1;
            this._setStepUI(false);
            
            this.btnPrev.disabled = true;
            this.btnNext.disabled = true;
            this.btnPlayPause.disabled = true;
            this.btnSkip.disabled = true;
            this.stepNavCounter.textContent = '—';

            this.renderer.render(this.dsu.parent, this.dsu.size, this.dsu.n);
            this._buildArrays();
            this._updateComponentBadge(this.dsu.parent);
            this._highlightCode(['init-sig', 'init-loop', 'init-parent', 'init-size']);
            this.stepDesc.innerHTML = 'Tutorial Chapter 1: Initializing disconnected singletons.';
        }
        else if (chapterNum === 2) {
            this.tutTitleEl.textContent = '2. Naive Union & Find';
            this.tutContentEl.innerHTML = `
                <p>To join groups, we point one root to another. But naively linking nodes can create a long degenerate chain.</p>
                <p>Click the <strong>▶ Play</strong> button below to see a chain of <strong>5 → 4 → 3 → 2 → 1 → 0</strong> form.</p>
                <p>Notice how finding the root of 5 (<code>Find(5)</code>) forces traversing all 6 nodes. This takes <strong>O(N)</strong> linear time, which is slow!</p>
            `;

            const steps = [];

            // 1. Union(4, 5)
            steps.push({
                desc: 'Union(4, 5): Link root of 5 directly under root of 4.',
                codeIds: ['unite-attach'],
                nodes: { 4: 'found', 5: 'joined' },
                edges: [[5, 4]],
                parent: [0, 1, 2, 3, 4, 4],
                size: [1, 1, 1, 1, 2, 1],
                arrayHL: { parent: [5], size: [] },
                changedCells: { parent: [5], size: [] },
                isImportant: false
            });

            // 2. Union(3, 4)
            steps.push({
                desc: 'Union(3, 4): Link root of 4 directly under root of 3.',
                codeIds: ['unite-attach'],
                nodes: { 3: 'found', 4: 'joined' },
                edges: [[5, 4], [4, 3]],
                parent: [0, 1, 2, 3, 3, 4],
                size: [1, 1, 1, 3, 2, 1],
                arrayHL: { parent: [4], size: [] },
                changedCells: { parent: [4], size: [] },
                isImportant: false
            });

            // 3. Union(2, 3)
            steps.push({
                desc: 'Union(2, 3): Link root of 3 directly under root of 2.',
                codeIds: ['unite-attach'],
                nodes: { 2: 'found', 3: 'joined' },
                edges: [[5, 4], [4, 3], [3, 2]],
                parent: [0, 1, 2, 2, 3, 4],
                size: [1, 1, 4, 3, 2, 1],
                arrayHL: { parent: [3], size: [] },
                changedCells: { parent: [3], size: [] },
                isImportant: false
            });

            // 4. Union(1, 2)
            steps.push({
                desc: 'Union(1, 2): Link root of 2 directly under root of 1.',
                codeIds: ['unite-attach'],
                nodes: { 1: 'found', 2: 'joined' },
                edges: [[5, 4], [4, 3], [3, 2], [2, 1]],
                parent: [0, 1, 1, 2, 3, 4],
                size: [1, 5, 4, 3, 2, 1],
                arrayHL: { parent: [2], size: [] },
                changedCells: { parent: [2], size: [] },
                isImportant: false
            });

            // 5. Union(0, 1)
            steps.push({
                desc: 'Union(0, 1): Link root of 1 directly under root of 0. We now have a degenerate tree chain.',
                codeIds: ['unite-attach'],
                nodes: { 0: 'found', 1: 'joined' },
                edges: [[5, 4], [4, 3], [3, 2], [2, 1], [1, 0]],
                parent: [0, 0, 1, 2, 3, 4],
                size: [6, 5, 4, 3, 2, 1],
                arrayHL: { parent: [1], size: [] },
                changedCells: { parent: [1], size: [] },
                isImportant: false
            });

            // 6. Find(5) - visit 5,4,3,2,1
            steps.push({
                desc: 'Executing Find(5): Visit 5, 4, 3, 2, and 1 sequentially following parent pointers.',
                codeIds: ['find-base', 'find-compress'],
                nodes: { 5: 'active', 4: 'active', 3: 'active', 2: 'active', 1: 'active', 0: 'comparing' },
                edges: [[5, 4], [4, 3], [3, 2], [2, 1], [1, 0]],
                parent: [0, 0, 1, 2, 3, 4],
                size: [6, 5, 4, 3, 2, 1],
                arrayHL: { parent: [5, 4, 3, 2, 1], size: [] },
                changedCells: { parent: [], size: [] },
                isImportant: false
            });

            // 7. Reached root 0 (Important step!)
            steps.push({
                desc: '<strong>Find(5) completed: Root is 0.</strong> Notice that this simple lookup required traversing all 6 nodes (5 → 4 → 3 → 2 → 1 → 0). This is very slow, taking linear <strong>O(N)</strong> operations in the worst case!',
                codeIds: ['find-baseret'],
                nodes: { 0: 'found' },
                edges: [[5, 4], [4, 3], [3, 2], [2, 1], [1, 0]],
                parent: [0, 0, 1, 2, 3, 4],
                size: [6, 5, 4, 3, 2, 1],
                arrayHL: { parent: [0], size: [] },
                changedCells: { parent: [], size: [] },
                isImportant: true
            });

            this.dsu = new DSU(6);
            this.history = [];
            this.redoStack = [];
            this.opHistory = [];
            this.steps = steps;
            this.currentStep = -1;

            this._setStepUI(true);
            this._renderStep(0);
            this._stopAutoPlay();
        }
        else if (chapterNum === 3) {
            this.tutTitleEl.textContent = '3. Union by Size';
            this.tutContentEl.innerHTML = `
                <p>To prevent degenerate chains, <strong>Union by Size</strong> compares the sizes of both sets before linking them.</p>
                <p>We <strong>always attach the root of the smaller tree under the root of the larger tree</strong>.</p>
                <p>Click <strong>▶ Play</strong> to watch a balanced DSU form. When connecting set {4,5} (size 2) and set {0,1,2,3} (size 4), we attach 5 to 1. The maximum tree depth is restricted to 2, guaranteeing <strong>O(log N)</strong> height!</p>
            `;

            const steps = [];

            // 1. Union(0, 1)
            steps.push({
                desc: 'Union(0, 1): Link smaller element under larger (or root A under B since sizes are equal).',
                codeIds: ['unite-attach'],
                nodes: { 0: 'joined', 1: 'found' },
                edges: [[0, 1]],
                parent: [1, 1, 2, 3, 4, 5],
                size: [1, 2, 1, 1, 1, 1],
                arrayHL: { parent: [0], size: [1] },
                changedCells: { parent: [0], size: [1] },
                isImportant: false
            });

            // 2. Union(2, 3)
            steps.push({
                desc: 'Union(2, 3): Link root of 2 under root of 3.',
                codeIds: ['unite-attach'],
                nodes: { 2: 'joined', 3: 'found' },
                edges: [[0, 1], [2, 3]],
                parent: [1, 1, 3, 3, 4, 5],
                size: [1, 2, 1, 2, 1, 1],
                arrayHL: { parent: [2], size: [3] },
                changedCells: { parent: [2], size: [3] },
                isImportant: false
            });

            // 3. Union(4, 5)
            steps.push({
                desc: 'Union(4, 5): Link root of 4 under root of 5.',
                codeIds: ['unite-attach'],
                nodes: { 4: 'joined', 5: 'found' },
                edges: [[0, 1], [2, 3], [4, 5]],
                parent: [1, 1, 3, 3, 5, 5],
                size: [1, 2, 1, 2, 1, 2],
                arrayHL: { parent: [4], size: [5] },
                changedCells: { parent: [4], size: [5] },
                isImportant: false
            });

            // 4. Union(1, 3)
            steps.push({
                desc: 'Union(1, 3): Both roots have size 2. We attach root 3 under root 1.',
                codeIds: ['unite-attach'],
                nodes: { 1: 'found', 3: 'joined' },
                edges: [[0, 1], [2, 3], [4, 5], [3, 1]],
                parent: [1, 1, 3, 1, 5, 5],
                size: [1, 4, 1, 2, 1, 2],
                arrayHL: { parent: [3], size: [1] },
                changedCells: { parent: [3], size: [1] },
                isImportant: false
            });

            // 5. Compare Sizes of 5 and 1 (Important Step!)
            steps.push({
                desc: 'Compare sizes before Union(5, 1): Root 5 has size 2. Root 1 has size 4.',
                codeIds: ['unite-cmp'],
                nodes: { 1: 'active', 5: 'active' },
                edges: [[0, 1], [2, 3], [4, 5], [3, 1]],
                parent: [1, 1, 3, 1, 5, 5],
                size: [1, 4, 1, 2, 1, 2],
                arrayHL: { parent: [], size: [1, 5] },
                changedCells: { parent: [], size: [] },
                isImportant: true
            });

            // 6. Attach 5 under 1 (Important Step!)
            steps.push({
                desc: '<strong>Union by Size:</strong> Since size of 5 (2) is smaller than size of 1 (4), we attach root 5 under root 1. This prevents tall chains and keeps maximum tree height bounded by <strong>O(log N)</strong>!',
                codeIds: ['unite-attach', 'unite-size'],
                nodes: { 1: 'joined', 5: 'joined' },
                edges: [[0, 1], [2, 3], [4, 5], [3, 1], [5, 1]],
                parent: [1, 1, 3, 1, 5, 1],
                size: [1, 6, 1, 2, 1, 2],
                arrayHL: { parent: [5], size: [1] },
                changedCells: { parent: [5], size: [1] },
                isImportant: true
            });

            this.dsu = new DSU(6);
            this.history = [];
            this.redoStack = [];
            this.opHistory = [];
            this.steps = steps;
            this.currentStep = -1;

            this._setStepUI(true);
            this._renderStep(0);
            this._stopAutoPlay();
        }
        else if (chapterNum === 4) {
            this.tutTitleEl.textContent = '4. Path Compression';
            this.tutContentEl.innerHTML = `
                <p>During a <code>Find(x)</code> query, we traverse from a node to the root. We can optimize future lookups by flattening the tree.</p>
                <p><strong>Path Compression</strong> updates the parent of every visited node along the path to point directly to the root.</p>
                <p>Observe the steps: We will trace <code>Find(4)</code> going up the recursion stack, and then compression setting the parent of each node directly to 0 coming down!</p>
            `;

            const steps = [];

            // Step 1: Find(4)
            steps.push({
                desc: 'Find(4) starts: Parent of 4 is 3. Since 3 is not 3 (not root), we recursively call Find(3).',
                codeIds: ['find-sig', 'find-base'],
                nodes: { 4: 'active', 3: 'comparing' },
                edges: [[4, 3], [3, 2], [2, 1], [1, 0], [5, 5]],
                parent: [0, 0, 1, 2, 3, 5],
                size: [5, 4, 3, 2, 1, 1],
                arrayHL: { parent: [4, 3], size: [] },
                changedCells: { parent: [], size: [] },
                isImportant: true
            });

            // Step 2: Find(3)
            steps.push({
                desc: 'Find(3) called recursively: Parent of 3 is 2. Since 2 is not root, we call Find(2).',
                codeIds: ['find-sig', 'find-base'],
                nodes: { 4: 'active', 3: 'active', 2: 'comparing' },
                edges: [[4, 3], [3, 2], [2, 1], [1, 0], [5, 5]],
                parent: [0, 0, 1, 2, 3, 5],
                size: [5, 4, 3, 2, 1, 1],
                arrayHL: { parent: [3, 2], size: [] },
                changedCells: { parent: [], size: [] },
                isImportant: true
            });

            // Step 3: Find(2)
            steps.push({
                desc: 'Find(2) called recursively: Parent of 2 is 1. Since 1 is not root, we call Find(1).',
                codeIds: ['find-sig', 'find-base'],
                nodes: { 4: 'active', 3: 'active', 2: 'active', 1: 'comparing' },
                edges: [[4, 3], [3, 2], [2, 1], [1, 0], [5, 5]],
                parent: [0, 0, 1, 2, 3, 5],
                size: [5, 4, 3, 2, 1, 1],
                arrayHL: { parent: [2, 1], size: [] },
                changedCells: { parent: [], size: [] },
                isImportant: true
            });

            // Step 4: Find(1)
            steps.push({
                desc: 'Find(1) called recursively: Parent of 1 is 0. Since 0 is not root, we call Find(0).',
                codeIds: ['find-sig', 'find-base'],
                nodes: { 4: 'active', 3: 'active', 2: 'active', 1: 'active', 0: 'comparing' },
                edges: [[4, 3], [3, 2], [2, 1], [1, 0], [5, 5]],
                parent: [0, 0, 1, 2, 3, 5],
                size: [5, 4, 3, 2, 1, 1],
                arrayHL: { parent: [1, 0], size: [] },
                changedCells: { parent: [], size: [] },
                isImportant: true
            });

            // Step 5: Find(0) Base Case
            steps.push({
                desc: 'Find(0) base case reached: Since parent[0] === 0, Node 0 is the root. We return 0 up the recursion stack.',
                codeIds: ['find-baseret'],
                nodes: { 4: 'active', 3: 'active', 2: 'active', 1: 'active', 0: 'found' },
                edges: [[4, 3], [3, 2], [2, 1], [1, 0], [5, 5]],
                parent: [0, 0, 1, 2, 3, 5],
                size: [5, 4, 3, 2, 1, 1],
                arrayHL: { parent: [0], size: [] },
                changedCells: { parent: [], size: [] },
                isImportant: true
            });

            // Step 6: Compress 1
            steps.push({
                desc: 'Unwinding recursion - Node 1: Set parent[1] = 0 (already 0). Return 0.',
                codeIds: ['find-compress'],
                nodes: { 4: 'active', 3: 'active', 2: 'active', 1: 'joined', 0: 'found' },
                edges: [[4, 3], [3, 2], [2, 1], [1, 0], [5, 5]],
                parent: [0, 0, 1, 2, 3, 5],
                size: [5, 4, 3, 2, 1, 1],
                arrayHL: { parent: [1], size: [] },
                changedCells: { parent: [], size: [] },
                isImportant: true
            });

            // Step 7: Compress 2
            steps.push({
                desc: 'Unwinding recursion - Node 2: Set parent[2] = 0. Node 2 now points directly to root 0! Return 0.',
                codeIds: ['find-compress'],
                nodes: { 4: 'active', 3: 'active', 2: 'joined', 1: 'result-same', 0: 'found' },
                edges: [[4, 3], [3, 2], [2, 0], [1, 0], [5, 5]],
                parent: [0, 0, 0, 2, 3, 5],
                size: [5, 4, 3, 2, 1, 1],
                arrayHL: { parent: [2], size: [] },
                changedCells: { parent: [2], size: [] },
                isImportant: true
            });

            // Step 8: Compress 3
            steps.push({
                desc: 'Unwinding recursion - Node 3: Set parent[3] = 0. Node 3 now points directly to root 0! Return 0.',
                codeIds: ['find-compress'],
                nodes: { 4: 'active', 3: 'joined', 2: 'result-same', 1: 'result-same', 0: 'found' },
                edges: [[4, 3], [3, 0], [2, 0], [1, 0], [5, 5]],
                parent: [0, 0, 0, 0, 3, 5],
                size: [5, 4, 3, 2, 1, 1],
                arrayHL: { parent: [3], size: [] },
                changedCells: { parent: [3], size: [] },
                isImportant: true
            });

            // Step 9: Compress 4
            steps.push({
                desc: 'Unwinding recursion - Node 4: Set parent[4] = 0. Node 4 now points directly to root 0! Return 0.',
                codeIds: ['find-compress'],
                nodes: { 4: 'joined', 3: 'result-same', 2: 'result-same', 1: 'result-same', 0: 'found' },
                edges: [[4, 0], [3, 0], [2, 0], [1, 0], [5, 5]],
                parent: [0, 0, 0, 0, 0, 5],
                size: [5, 4, 3, 2, 1, 1],
                arrayHL: { parent: [4], size: [] },
                changedCells: { parent: [4], size: [] },
                isImportant: true
            });

            // Step 10: Complete
            steps.push({
                desc: '<strong>Path Compression complete!</strong> The entire tree is now completely flat. Future lookups on nodes 1, 2, 3, or 4 will resolve instantly in constant <strong>O(1)</strong> time!',
                codeIds: ['find-compress'],
                nodes: { 4: 'result-same', 3: 'result-same', 2: 'result-same', 1: 'result-same', 0: 'found' },
                edges: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 5]],
                parent: [0, 0, 0, 0, 0, 5],
                size: [5, 4, 3, 2, 1, 1],
                arrayHL: { parent: [], size: [] },
                changedCells: { parent: [], size: [] },
                isImportant: true
            });

            this.dsu = new DSU(6);
            this.history = [];
            this.redoStack = [];
            this.opHistory = [];
            this.steps = steps;
            this.currentStep = -1;

            this._setStepUI(true);
            this._renderStep(0);
            this._stopAutoPlay();
        }
    }
}

// Initialize
const app = new App();
app.init();
