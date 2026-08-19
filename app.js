// ================================================================
// DSU VISUALIZER — Complete Application Logic
// ================================================================

// ---- C++ Code Definitions (Union by Size & Union by Rank) ----
const CPP_LINES_SIZE = [
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
    { html: '<span class="kw">void</span> <span class="fn">unionBySize</span>(<span class="typ">int</span> a, <span class="typ">int</span> b) {', id: 'unite-sig' },
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

const CPP_LINES_RANK = [
    { html: '<span class="typ">int</span> p[N], rk[N];', id: 'decl' },
    { html: '', id: 'blank1' },
    { html: '<span class="kw">void</span> <span class="fn">init</span>(<span class="typ">int</span> n) {', id: 'init-sig' },
    { html: '    <span class="kw">for</span> (<span class="typ">int</span> i = <span class="num">0</span>; i &lt; n; i++) {', id: 'init-loop' },
    { html: '        p[i] = i;', id: 'init-parent' },
    { html: '        rk[i] = <span class="num">0</span>;', id: 'init-size' },
    { html: '    }', id: 'init-loop-end' },
    { html: '}', id: 'init-end' },
    { html: '', id: 'blank2' },
    { html: '<span class="typ">int</span> <span class="fn">find</span>(<span class="typ">int</span> x) {', id: 'find-sig' },
    { html: '    <span class="kw">if</span> (p[x] == x)', id: 'find-base' },
    { html: '        <span class="kw">return</span> x;', id: 'find-baseret' },
    { html: '    <span class="kw">return</span> p[x] = <span class="fn">find</span>(p[x]);', id: 'find-compress' },
    { html: '}', id: 'find-end' },
    { html: '', id: 'blank3' },
    { html: '<span class="kw">void</span> <span class="fn">unionByRank</span>(<span class="typ">int</span> a, <span class="typ">int</span> b) {', id: 'unite-sig' },
    { html: '    a = <span class="fn">find</span>(a);', id: 'unite-finda' },
    { html: '    b = <span class="fn">find</span>(b);', id: 'unite-findb' },
    { html: '    <span class="kw">if</span> (a == b) <span class="kw">return</span>;', id: 'unite-same' },
    { html: '    <span class="kw">if</span> (rk[a] &lt; rk[b]) {', id: 'unite-cmp' },
    { html: '        p[a] = b;', id: 'unite-attach-a-b' },
    { html: '    } <span class="kw">else if</span> (rk[b] &lt; rk[a]) {', id: 'unite-cmp-b' },
    { html: '        p[b] = a;', id: 'unite-attach-b-a' },
    { html: '    } <span class="kw">else</span> {', id: 'unite-cmp-eq' },
    { html: '        p[b] = a;', id: 'unite-attach' },
    { html: '        rk[a]++;', id: 'unite-size' },
    { html: '    }', id: 'unite-end-if' },
    { html: '}', id: 'unite-end' },
    { html: '', id: 'blank4' },
    { html: '<span class="typ">bool</span> <span class="fn">connected</span>(<span class="typ">int</span> a, <span class="typ">int</span> b) {', id: 'conn-sig' },
    { html: '    <span class="kw">return</span> <span class="fn">find</span>(a) == <span class="fn">find</span>(b);', id: 'conn-return' },
    { html: '}', id: 'conn-end' },
];

const CPP_LINES = CPP_LINES_SIZE;

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
    constructor(n, mode = 'size') {
        this.n = n;
        this.mode = mode; // 'size' or 'rank'
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.size = new Array(n).fill(1);
        this.rank = new Array(n).fill(0);
    }

    clone() {
        const d = new DSU(this.n, this.mode);
        d.parent = [...this.parent];
        d.size = [...this.size];
        d.rank = [...this.rank];
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
    const snap = () => ({ parent: [...dsu.parent], size: [...dsu.size], rank: [...dsu.rank] });

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
    const snap = () => ({ parent: [...dsu.parent], size: [...dsu.size], rank: [...dsu.rank] });
    const initialParent = [...dsu.parent];

    const opName = dsu.mode === 'rank' ? 'unionByRank' : 'unionBySize';

    // Step 0: Starting
    steps.push({
        desc: `Calling <span class="op-name">${opName}</span>(<span class="node-ref">${a}</span>, <span class="node-ref">${b}</span>)`,
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

    if (dsu.mode === 'rank') {
        // UNION BY RANK
        const rkA = dsu.rank[rootA], rkB = dsu.rank[rootB];
        steps.push({
            desc: `Comparing ranks: rk[<span class="node-ref">${rootA}</span>] = ${rkA}, rk[<span class="node-ref">${rootB}</span>] = ${rkB}`,
            codeIds: ['unite-cmp'],
            nodes: { [rootA]: 'found', [rootB]: 'found' },
            edges: [],
            ...snap(),
            arrayHL: { parent: [], size: [rootA, rootB] },
            changedCells: { parent: [], size: [] },
        });

        if (rkA < rkB) {
            dsu.parent[rootA] = rootB;
            steps.push({
                desc: `rk[<span class="node-ref">${rootA}</span>] < rk[<span class="node-ref">${rootB}</span>] (${rkA} < ${rkB}) → setting p[<span class="node-ref">${rootA}</span>] = <span class="node-ref">${rootB}</span> (rank of ${rootB} stays ${rkB})`,
                codeIds: ['unite-attach-a-b'],
                nodes: { [rootB]: 'found', [rootA]: 'joined' },
                edges: [[rootA, rootB]],
                ...snap(),
                arrayHL: { parent: [rootA], size: [] },
                changedCells: { parent: [rootA], size: [] },
            });
        } else if (rkB < rkA) {
            dsu.parent[rootB] = rootA;
            steps.push({
                desc: `rk[<span class="node-ref">${rootB}</span>] < rk[<span class="node-ref">${rootA}</span>] (${rkB} < ${rkA}) → setting p[<span class="node-ref">${rootB}</span>] = <span class="node-ref">${rootA}</span> (rank of ${rootA} stays ${rkA})`,
                codeIds: ['unite-attach-b-a'],
                nodes: { [rootA]: 'found', [rootB]: 'joined' },
                edges: [[rootB, rootA]],
                ...snap(),
                arrayHL: { parent: [rootB], size: [] },
                changedCells: { parent: [rootB], size: [] },
            });
        } else {
            dsu.parent[rootB] = rootA;
            dsu.rank[rootA]++;
            steps.push({
                desc: `rk[<span class="node-ref">${rootA}</span>] == rk[<span class="node-ref">${rootB}</span>] (${rkA} == ${rkB}) → setting p[<span class="node-ref">${rootB}</span>] = <span class="node-ref">${rootA}</span> and incrementing rk[<span class="node-ref">${rootA}</span>]++ to ${dsu.rank[rootA]}`,
                codeIds: ['unite-attach', 'unite-size'],
                nodes: { [rootA]: 'found', [rootB]: 'joined' },
                edges: [[rootB, rootA]],
                ...snap(),
                arrayHL: { parent: [rootB], size: [rootA] },
                changedCells: { parent: [rootB], size: [rootA] },
            });
        }
    } else {
        // UNION BY SIZE
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
            ...snap(),
            arrayHL: { parent: [pb], size: [] },
            changedCells: { parent: [pb], size: [] },
        });

        // Update size
        dsu.size[pa] += dsu.size[pb];
        steps.push({
            desc: `Updating size: sz[<span class="node-ref">${pa}</span>] = ${dsu.size[pa]}`,
            codeIds: ['unite-size'],
            nodes: { [pa]: 'found' },
            edges: [],
            ...snap(),
            arrayHL: { parent: [], size: [pa] },
            changedCells: { parent: [], size: [pa] },
        });
    }

    const hasChanged = dsu.parent.some((p, idx) => p !== initialParent[idx]);
    return { steps, changed: hasChanged };
}
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

            // Size / Rank badge — always shown
            const badgeX = x + CFG.NODE_R + 6;
            const badgeY = y - CFG.NODE_R + 4;
            const val = mode === 'rank' ? (rank ? rank[i] : 0) : (size ? size[i] : 1);
            const badgeW = val >= 10 ? 26 : 20;
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
            badgeText.textContent = val;
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

        this._bindEvents();
    }

    _bindEvents() {
        this.container.addEventListener('wheel', (e) => this._onWheel(e), { passive: false });
        this.container.addEventListener('mousedown', (e) => this._onMouseDown(e));
        window.addEventListener('mousemove', (e) => this._onMouseMove(e));
        window.addEventListener('mouseup', () => this._onMouseUp());

        // Touch support
        this.container.addEventListener('touchstart', (e) => this._onTouchStart(e), { passive: false });
        this.container.addEventListener('touchmove', (e) => this._onTouchMove(e), { passive: false });
        this.container.addEventListener('touchend', () => this._onTouchEnd());
    }

    zoomIn() { this._zoomAtPoint(1.2, this.container.clientWidth / 2, this.container.clientHeight / 2); }
    zoomOut() { this._zoomAtPoint(1 / 1.2, this.container.clientWidth / 2, this.container.clientHeight / 2); }

    reset() {
        this.scale = 1;
        this.tx = 0;
        this.ty = 0;
        this._apply();
    }

    _apply() {
        this.viewport.setAttribute('transform', `translate(${this.tx}, ${this.ty}) scale(${this.scale})`);
        this.indicator.textContent = `${Math.round(this.scale * 100)}%`;
    }

    _zoomAtPoint(factor, mouseX, mouseY) {
        const newScale = Math.max(CFG.MIN_ZOOM, Math.min(CFG.MAX_ZOOM, this.scale * factor));
        const actualFactor = newScale / this.scale;

        this.tx = mouseX - actualFactor * (mouseX - this.tx);
        this.ty = mouseY - actualFactor * (mouseY - this.ty);
        this.scale = newScale;
        this._apply();
    }

    _onWheel(e) {
        e.preventDefault();
        const rect = this.container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const factor = e.deltaY < 0 ? 1.1 : 0.9;
        this._zoomAtPoint(factor, mouseX, mouseY);
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
        if (e.touches.length === 1 && !e.target.closest('.node-group')) {
            this.isPanning = true;
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
            this.startTx = this.tx;
            this.startTy = this.ty;
        } else if (e.touches.length === 2) {
            this.isPanning = false;
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            this._lastPinchDist = Math.sqrt(dx * dx + dy * dy);
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
                this._zoomAtPoint(factor, (e.touches[0].clientX + e.touches[1].clientX) / 2, (e.touches[0].clientY + e.touches[1].clientY) / 2);
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
        this.stepBarWindow = document.getElementById('step-bar-window');
        this.stepNavCounter = document.getElementById('step-nav-counter');

        this.componentBadge = document.getElementById('component-badge');
        this.compCountVal = document.getElementById('comp-count-val');

        // Modal Popup DOM refs
        this.initModalOverlay = document.getElementById('init-modal-overlay');
        this.modalInputN = document.getElementById('modal-input-n');
        this.modalSelectMode = document.getElementById('modal-select-mode');
        this.btnModalStart = document.getElementById('btn-modal-start');

        this.btnPlayPause = document.getElementById('btn-play-pause');

        this.inputN = document.getElementById('input-n');
        this.selectMode = document.getElementById('select-mode');
        this.secondArrayLabel = document.getElementById('second-array-label');

        this.inputA = document.getElementById('input-a');
        this.inputB = document.getElementById('input-b');

        this.btnInit = document.getElementById('btn-init');
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

        // Synchronize mode selects
        if (this.selectMode && this.modalSelectMode) {
            this.selectMode.addEventListener('change', () => {
                this.modalSelectMode.value = this.selectMode.value;
            });
            this.modalSelectMode.addEventListener('change', () => {
                this.selectMode.value = this.modalSelectMode.value;
            });
        }

        // State
        this.dsu = null;
        this.history = [];   // stack of { parent, size, rank } snapshots for Undo
        this.redoStack = []; // stack of { parent, size, rank } snapshots for Redo
        this.opHistory = []; // operation history for Components table
        this.steps = null;
        this.currentStep = -1;
        this.isPlaying = false;
        this.autoPlayTimer = null;
        this.isAutoPlaying = false;
        this.operationChanged = false;

        this.hoveredNode = -1;

        // Build code panel
        this._buildCodePanel('size');

        // Bind events
        if (this.btnModalStart) {
            this.btnModalStart.addEventListener('click', () => {
                const nVal = parseInt(this.modalInputN.value);
                if (!isNaN(nVal) && nVal >= 1 && nVal <= 20) {
                    this.inputN.value = nVal;
                }
                if (this.modalSelectMode && this.selectMode) {
                    this.selectMode.value = this.modalSelectMode.value;
                }
                this.closeInitModal();
                this.init();
            });
        }

        this.btnInit.addEventListener('click', () => this.openInitModal());
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

    _buildCodePanel(mode = 'size') {
        const scroll = document.getElementById('code-scroll');
        scroll.innerHTML = '';
        const lines = mode === 'rank' ? CPP_LINES_RANK : CPP_LINES_SIZE;
        lines.forEach((line, idx) => {
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

        if (this.secondArrayLabel) {
            this.secondArrayLabel.textContent = this.dsu.mode === 'rank' ? 'rk[]' : 'sz[]';
        }

        for (let i = 0; i < this.dsu.n; i++) {
            // Parent cell
            const pCell = document.createElement('div');
            pCell.className = 'array-cell';
            pCell.setAttribute('data-arr-node', i);
            pCell.innerHTML = `<span class="array-index">${i}</span><span class="array-value" id="p-val-${i}">${this.dsu.parent[i]}</span>`;
            pCell.addEventListener('mouseenter', () => this._onArrayHover(i));
            pCell.addEventListener('mouseleave', () => this._onArrayLeave(i));
            this.parentArrayEl.appendChild(pCell);

            // Size / Rank cell
            const secVal = this.dsu.mode === 'rank' ? this.dsu.rank[i] : this.dsu.size[i];
            const sCell = document.createElement('div');
            sCell.className = 'array-cell';
            sCell.innerHTML = `<span class="array-index">${i}</span><span class="array-value" id="sz-val-${i}">${secVal}</span>`;
            sCell.addEventListener('mouseenter', () => this._onArrayHover(i));
            sCell.addEventListener('mouseleave', () => this._onArrayLeave(i));
            this.sizeArrayEl.appendChild(sCell);
        }
    }

    _updateArrays(parent, secondaryArr, highlightCells = null, changedCells = null) {
        if (!this.dsu) return;
        const arr = secondaryArr || (this.dsu.mode === 'rank' ? this.dsu.rank : this.dsu.size);
        for (let i = 0; i < this.dsu.n; i++) {
            const pVal = document.getElementById(`p-val-${i}`);
            const szVal = document.getElementById(`sz-val-${i}`);
            if (pVal) pVal.textContent = parent[i];
            if (szVal && arr) szVal.textContent = arr[i];

            const pCell = pVal?.closest('.array-cell');
            const sCell = szVal?.closest('.array-cell');
            if (pCell) pCell.classList.remove('highlighted', 'active', 'changed');
            if (sCell) sCell.classList.remove('highlighted', 'active', 'changed');

            if (highlightCells) {
                if (highlightCells.parent?.includes(i) && pCell) pCell.classList.add('active');
                if (highlightCells.size?.includes(i) && sCell) sCell.classList.add('active');
                if (highlightCells.rank?.includes(i) && sCell) sCell.classList.add('active');
            }
            if (changedCells) {
                if (changedCells.parent?.includes(i) && pCell) pCell.classList.add('changed');
                if (changedCells.size?.includes(i) && sCell) sCell.classList.add('changed');
                if (changedCells.rank?.includes(i) && sCell) sCell.classList.add('changed');
            }
        }
    }

    _onNodeHover(i) {
        this.hoveredNode = i;
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
        const nodeEl = this.renderer.nodeElements[i];
        if (nodeEl) {
            const circle = nodeEl.querySelector('.node-circle');
            if (circle) circle.style.stroke = 'var(--accent-light)';
            if (circle) circle.style.strokeWidth = '3';
        }
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
        this.autoPlayTimer = setInterval(() => {
            if (this.steps && this.currentStep < this.steps.length - 1) {
                this.nextStep();
            } else {
                this._stopAutoPlay();
            }
        }, 1000);
    }

    _stopAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
        this.isAutoPlaying = false;
        if (this.btnPlayPause) {
            this.btnPlayPause.textContent = '▶ Play';
            this.btnPlayPause.className = 'btn btn-secondary';
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
        this.btnUnion.disabled = active || !this.dsu;
        this.btnFind.disabled = active || !this.dsu;
        this.btnUndo.disabled = active || this.history.length === 0;
        this.btnRedo.disabled = active || this.redoStack.length === 0;
        this.btnInit.disabled = active;
        this.inputA.disabled = active || !this.dsu;
        this.inputB.disabled = active || !this.dsu;
        this.inputN.disabled = active;
        if (this.selectMode) this.selectMode.disabled = active;
        this.btnPrev.disabled = !active;
        this.btnNext.disabled = !active;
        this.btnSkip.disabled = !active;
        if (this.btnPlayPause) this.btnPlayPause.disabled = !active;
        this.stepCounter.style.display = active ? '' : 'none';
    }

    _renderStep(idx) {
        if (!this.steps || idx < 0 || idx >= this.steps.length) return;
        const step = this.steps[idx];
        this.currentStep = idx;

        this.stepDesc.innerHTML = step.desc;
        this.stepCounter.textContent = `${idx + 1} / ${this.steps.length}`;
        this.stepNavCounter.textContent = `${idx + 1} / ${this.steps.length}`;

        this.btnPrev.disabled = idx === 0;
        this.btnNext.disabled = false;

        const secondaryArr = this.dsu.mode === 'rank' ? step.rank : step.size;
        this.renderer.render(step.parent, step.size, step.rank, this.dsu.n, this.dsu.mode, step.nodes, step.edges);

        const isFind = step.codeIds?.some(id => id.startsWith('find-') || id.startsWith('conn-'));
        this._highlightCode(step.codeIds, isFind ? 'find' : 'highlighted');

        this._updateArrays(step.parent, secondaryArr, step.arrayHL, step.changedCells);
        this._updateComponentBadge(step.parent);

        this.renderer.onNodeHover = (i) => this._onNodeHover(i);
        this.renderer.onNodeLeave = (i) => this._onNodeLeave(i);
    }

    // ---- Public API ----

    init() {
        const n = parseInt(this.inputN.value);
        const mode = this.selectMode ? this.selectMode.value : 'size';
        if (isNaN(n) || n < 1 || n > 20) {
            showToast('Enter a valid number of nodes (1–20)', 'error');
            return;
        }

        this._stopAutoPlay();

        // Reset
        this.dsu = new DSU(n, mode);
        this.history = [];
        this.redoStack = [];
        this.opHistory = [];
        this.steps = null;
        this.currentStep = -1;
        this.operationChanged = false;

        // Rebuild code panel for selected mode
        this._buildCodePanel(mode);

        // Record Initial state in History table
        this._recordHistory('Init', `${n}`, this.dsu.parent);

        // Update max for inputs
        this.inputA.max = n - 1;
        this.inputB.max = n - 1;
        this.inputA.value = '';
        this.inputB.value = '';

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
        this.renderer.render(this.dsu.parent, this.dsu.size, this.dsu.rank, this.dsu.n, mode);

        // Highlight init code
        this._highlightCode(['init-sig', 'init-loop', 'init-parent', 'init-size']);

        const paramStr = mode === 'rank' ? 'rank = 0' : 'size = 1';
        this.stepDesc.innerHTML = `Initialized <span class="node-ref">${n}</span> nodes (0 to ${n - 1}) using <strong>Union by ${mode === 'rank' ? 'Rank' : 'Size'}</strong>. Each node is its own parent, ${paramStr}.`;

        this.panZoom.reset();
        showToast(`DSU initialized with ${n} nodes (Union by ${mode.toUpperCase()})`, 'success');
    }

    startUnion() {
        const a = parseInt(this.inputA.value);
        const b = parseInt(this.inputB.value);
        if (!this._validateInput(a, b)) return;

        const dsuClone = this.dsu.clone();
        const result = generateUnionSteps(dsuClone, a, b);

        this.steps = result.steps;
        this.operationChanged = result.changed;
        this._currentOpInfo = { name: 'Union', detail: `${a}, ${b}` };
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
        setTimeout(() => this._commitOperation(), 400);
    }

    _commitOperation() {
        this._stopAutoPlay();
        if (this.operationChanged && this._finalDsu) {
            this.history.push({
                parent: [...this.dsu.parent],
                size: [...this.dsu.size],
                rank: [...this.dsu.rank],
                opHistorySnap: [...this.opHistory],
            });
            this.redoStack = [];

            this.dsu.parent = [...this._finalDsu.parent];
            this.dsu.size = [...this._finalDsu.size];
            this.dsu.rank = [...this._finalDsu.rank];

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

        this.renderer.render(this.dsu.parent, this.dsu.size, this.dsu.rank, this.dsu.n, this.dsu.mode);
        this._buildArrays();
        this._updateComponentBadge(this.dsu.parent);

        this.stepDesc.innerHTML = 'Operation complete. Enter nodes for the next operation.';
        this.stepBarWindow.classList.add('idle');

        this.btnUndo.disabled = this.history.length === 0;
        this.btnRedo.disabled = this.redoStack.length === 0;
    }

    undo() {
        if (this.history.length === 0) return;

        this.redoStack.push({
            parent: [...this.dsu.parent],
            size: [...this.dsu.size],
            rank: [...this.dsu.rank],
            opHistorySnap: [...this.opHistory],
        });

        const prev = this.history.pop();
        this.dsu.parent = prev.parent;
        this.dsu.size = prev.size;
        this.dsu.rank = prev.rank || new Array(this.dsu.n).fill(0);
        this.opHistory = prev.opHistorySnap ? [...prev.opHistorySnap] : [];

        this.steps = null;
        this.currentStep = -1;
        this._setStepUI(false);
        this._highlightCode(null);
        this.stepNavCounter.textContent = '—';

        this.renderer.render(this.dsu.parent, this.dsu.size, this.dsu.rank, this.dsu.n, this.dsu.mode);
        this._buildArrays();
        this._updateComponentBadge(this.dsu.parent);
        this._renderHistoryTable();

        this.stepDesc.innerHTML = 'Last union undone. State restored.';
        this.stepBarWindow.classList.add('idle');
        this.btnUndo.disabled = this.history.length === 0;
        this.btnRedo.disabled = this.redoStack.length === 0;

        showToast('Last union undone', 'info');
    }

    redo() {
        if (this.redoStack.length === 0) return;

        this.history.push({
            parent: [...this.dsu.parent],
            size: [...this.dsu.size],
            rank: [...this.dsu.rank],
            opHistorySnap: [...this.opHistory],
        });

        const next = this.redoStack.pop();
        this.dsu.parent = next.parent;
        this.dsu.size = next.size;
        this.dsu.rank = next.rank || new Array(this.dsu.n).fill(0);
        this.opHistory = next.opHistorySnap ? [...next.opHistorySnap] : [];

        this.steps = null;
        this.currentStep = -1;
        this._setStepUI(false);
        this._highlightCode(null);
        this.stepNavCounter.textContent = '—';

        this.renderer.render(this.dsu.parent, this.dsu.size, this.dsu.rank, this.dsu.n, this.dsu.mode);
        this._buildArrays();
        this._updateComponentBadge(this.dsu.parent);
        this._renderHistoryTable();

        this.stepDesc.innerHTML = 'Union redone. State updated.';
        this.stepBarWindow.classList.add('idle');
        this.btnUndo.disabled = this.history.length === 0;
        this.btnRedo.disabled = this.redoStack.length === 0;

        showToast('Union redone', 'success');
    }
}

// ================================================================
// Initialize
// ================================================================
const app = new App();
app.openInitModal();
