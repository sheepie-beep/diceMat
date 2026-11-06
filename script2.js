
const diceTypes = [4, 6, 8, 10, 12, 20, 100];

const diceShapes = {
    4: "50,5 94,91 6,91",
    6: "12,12 88,12 88,88 12,88",
    8: "50,4 95,50 50,96 5,50",
    10: "50,4 91,35 75,85 50,98 25,85 9,35",
    12: "50,4 87,19 97,57 73,92 27,92 3,57 13,19",
    20: "50,3 91,27 91,73 50,97 9,73 9,27",
    100: "50,3 91,27 91,73 50,97 9,73 9,27"
};

const diceDetails = {
    4: `<path d="M50 5 L50 57 L6 91 M50 57 L94 91" />`,
    6: `<path d="M12 12 L50 32 L88 12 M50 32 L50 76 L12 88 M50 76 L88 88" />`,
    8: `<path d="M5 50 L50 32 L95 50 M50 32 L50 96 M5 50 L50 96 L95 50" />`,
    10: `<path d="M9 35 L50 29 L91 35 M50 29 L50 98 M25 85 L50 29 L75 85" />`,
    12: `<path d="M13 19 L50 35 L87 19 M50 35 L73 60 L50 85 L27 60 Z M3 57 L27 60 M97 57 L73 60" />`,
    20: `<path d="M50 3 L50 32 L9 27 M50 32 L91 27 M9 73 L50 32 L91 73 M9 73 L50 97 L91 73 M50 32 L50 97" />`,
    100: `<path d="M50 3 L50 32 L9 27 M50 32 L91 27 M9 73 L50 32 L91 73 M9 73 L50 97 L91 73 M50 32 L50 97" />`
};

const page = document.body.dataset.page;

let activeSkin = Object.keys(skins)[0];
let dice = [];
let nextDiceId = 1;
let isRolling = false;

const diceSound = new Audio("assets/sounds/dicesound001.mp3");
diceSound.preload = "auto";
diceSound.volume = 0.6;

function loadSavedData() {
    try {
        const savedSkin = localStorage.getItem("littleDiceSkin");

        if (savedSkin && skins[savedSkin]) {
            activeSkin = savedSkin;
        }

        const savedDice = JSON.parse(
            localStorage.getItem("littleDiceBoard") || "[]"
        );

        if (Array.isArray(savedDice)) {
            dice = savedDice.filter(die =>
                die &&
                Number.isSafeInteger(die.id) &&
                diceTypes.includes(die.sides) &&
                (
                    die.value === null ||
                    (
                        Number.isInteger(die.value) &&
                        die.value >= 1 &&
                        die.value <= die.sides
                    )
                )
            );

            nextDiceId = Math.max(
                1,
                ...dice.map(die => die.id + 1)
            );
        }
    } catch (error) {
        dice = [];
    }
}

function saveData() {
    try {
        localStorage.setItem("littleDiceSkin", activeSkin);
        localStorage.setItem(
            "littleDiceBoard",
            JSON.stringify(dice)
        );
    } catch (error) {
        return;
    }
}

function randomNumber(sides) {
    const values = new Uint32Array(1);
    const range = 4294967296;
    const limit = range - (range % sides);

    do {
        crypto.getRandomValues(values);
    } while (values[0] >= limit);

    return (values[0] % sides) + 1;
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => {
        const replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return replacements[character];
    });
}

function getSkinFont(skinKey) {
    const skin = skins[skinKey];

    return {
        family: skin.font?.family || "'Nunito', sans-serif",
        color: skin.font?.color || "#ffffff",
        size: skin.font?.size || 29,
        shadow: skin.font?.shadow || "0 2px 4px #422b4780"
    };
}

function applyNumberStyle(element, skinKey, sides) {
    const font = getSkinFont(skinKey);
    const skin = skins[skinKey];

    const customSize = skin.font?.sizes?.[sides];
    const size = customSize || font.size;

    element.style.fontFamily = font.family;
    element.style.color = font.color;
    element.style.fontSize = `${size}px`;
    element.style.textShadow = font.shadow;
    element.style.webkitTextStroke = `${skin.font?.outlineWidth ?? 1}px ${skin.font?.outline || "transparent"}`;
}

function createDieSVG(sides, skinKey, uniqueId, outline = false) {
    const points = diceShapes[sides];
    const details = diceDetails[sides];

    if (outline) {
        return `
            <svg viewBox="0 0 100 100" aria-hidden="true">
                <polygon
                    points="${points}"
                    fill="none"
                    stroke="#354b5b"
                    stroke-width="4"
                    stroke-linejoin="round"
                />
                <g
                    fill="none"
                    stroke="#354b5b"
                    stroke-width="3"
                    stroke-linejoin="round"
                >
                    ${details}
                </g>
            </svg>
        `;
    }

    const skin = skins[skinKey];
    const gradientId = `gradient-${uniqueId}`;
    const shineId = `shine-${uniqueId}`;
    const clipId = `clip-${uniqueId}`;
    const isPattern = skin.type === "pattern";

    const borderColor = skin.borderColor || skin.dark || "#60485b";
    const facetColor = skin.facetColor || borderColor;

    if (isPattern) {
        return `
            <svg viewBox="0 0 100 100" aria-hidden="true">
                <defs>
                    <clipPath id="${clipId}">
                        <polygon points="${points}" />
                    </clipPath>
                </defs>

                <g clip-path="url(#${clipId})">
                    <image
                        href="${escapeHTML(skin.image)}"
                        x="0"
                        y="0"
                        width="100"
                        height="100"
                        preserveAspectRatio="xMidYMid slice"
                    />
                </g>

                <polygon
                    points="${points}"
                    fill="none"
                    stroke="${borderColor}"
                    stroke-width="2.5"
                    stroke-linejoin="round"
                />

                ${
                    skin.showFacets === false
                        ? ""
                        : `
                            <g
                                fill="none"
                                stroke="${facetColor}"
                                stroke-width="2"
                                stroke-opacity="${skin.facetOpacity ?? 0.55}"
                                stroke-linejoin="round"
                            >
                                ${details}
                            </g>
                        `
                }
            </svg>
        `;
    }

    return `
        <svg viewBox="0 0 100 100" aria-hidden="true">
            <defs>
                <linearGradient
                    id="${gradientId}"
                    x1="0%" y1="0%"
                    x2="100%" y2="100%"
                >
                    <stop offset="0%" stop-color="${skin.light}" />
                    <stop offset="48%" stop-color="${skin.main}" />
                    <stop offset="100%" stop-color="${skin.dark}" />
                </linearGradient>

                <linearGradient
                    id="${shineId}"
                    x1="0%" y1="0%"
                    x2="100%" y2="100%"
                >
                    <stop offset="0%" stop-color="#ffffff" stop-opacity=".55" />
                    <stop offset="50%" stop-color="#ffffff" stop-opacity="0" />
                    <stop offset="100%" stop-color="#ffffff" stop-opacity=".15" />
                </linearGradient>

                <clipPath id="${clipId}">
                    <polygon points="${points}" />
                </clipPath>
            </defs>

            <polygon
                points="${points}"
                fill="url(#${gradientId})"
                stroke="${skin.dark}"
                stroke-width="2.5"
                stroke-linejoin="round"
            />

            <g clip-path="url(#${clipId})">
                <polygon
                    points="0,0 100,0 50,55"
                    fill="#ffffff"
                    opacity=".2"
                />

                <polygon
                    points="0,100 50,55 100,100"
                    fill="${skin.dark}"
                    opacity=".2"
                />

                <rect
                    width="100"
                    height="100"
                    fill="url(#${shineId})"
                />

                <g fill="${skin.sparkle}">
                    <circle cx="25" cy="29" r="1.5" opacity=".9" />
                    <circle cx="75" cy="67" r="1.2" opacity=".8" />
                    <circle cx="31" cy="75" r=".9" opacity=".8" />
                    <circle cx="70" cy="23" r=".9" opacity=".9" />
                    <circle cx="19" cy="55" r=".8" opacity=".7" />
                    <circle cx="83" cy="47" r=".8" opacity=".8" />

                    <path
                        d="M72 32 L74 37 L79 39 L74 41 L72 46 L70 41 L65 39 L70 37 Z"
                        opacity=".85"
                    />

                    <path
                        d="M28 56 L29.5 59 L33 60.5 L29.5 62 L28 65 L26.5 62 L23 60.5 L26.5 59 Z"
                        opacity=".65"
                    />
                </g>
            </g>
        </svg>
    `;
}

function createDieElement(die) {
    const element = document.createElement("div");

    element.className = "die";
    element.dataset.id = die.id;
    element.dataset.sides = die.sides;

    element.innerHTML = `
        ${createDieSVG(die.sides, activeSkin, `die-${die.id}`)}
        <span class="die-number">${die.value ?? "?"}</span>
        <span class="die-label">D${die.sides}</span>
    `;

    applyNumberStyle(
        element.querySelector(".die-number"),
        activeSkin,
        die.sides
    );

    return element;
}

function updateTotal() {
    const totalDisplay = document.getElementById("total");

    if (!totalDisplay) return;

    const total = dice.reduce((sum, die) => {
        return sum + (die.value ?? 0);
    }, 0);

    totalDisplay.textContent = total;
}

function updateCount() {
    const countDisplay = document.getElementById("dice-count");

    if (!countDisplay) return;

    const count = dice.length;

    countDisplay.textContent =
        `${count} ${count === 1 ? "die" : "dice"}`;
}

function updateButtons() {
    const rollButton = document.getElementById("roll-btn");
    const clearButton = document.getElementById("clear-btn");

    if (rollButton) {
        rollButton.disabled = isRolling || dice.length === 0;
    }

    if (clearButton) {
        clearButton.disabled = isRolling || dice.length === 0;
    }

    document.querySelectorAll(".dice-add").forEach(button => {
        button.disabled = isRolling;
    });
}

function renderBoard() {
    const board = document.getElementById("dice-board");

    if (!board) return;

    board.innerHTML = "";

    if (dice.length === 0) {
        board.innerHTML = `
            <div class="empty-state">
                <h3>Your dice go here!</h3>
                <p>Choose some dice below.</p>
            </div>
        `;
    } else {
        dice.forEach(die => {
            board.appendChild(createDieElement(die));
        });
    }

    updateTotal();
    updateCount();
    updateButtons();
}

function addDie(sides) {
    if (isRolling || !diceTypes.includes(sides)) return;

    dice.push({
        id: nextDiceId++,
        sides,
        value: null
    });

    saveData();
    renderBoard();
}

function clearDice() {
    if (isRolling) return;

    dice = [];

    saveData();
    renderBoard();
}

function createDiceSelector() {
    const selector = document.getElementById("dice-selector");

    if (!selector) return;

    selector.innerHTML = "";

    diceTypes.forEach(sides => {
        const button = document.createElement("button");

        button.className = "dice-add";
        button.type = "button";
        button.setAttribute("aria-label", `Add D${sides}`);

        button.innerHTML = `
            <span class="selector-shape">
                ${createDieSVG(sides, activeSkin, `selector-${sides}`, true)}
            </span>
            <span class="dice-add-label">D${sides}</span>
        `;

        button.addEventListener("click", () => addDie(sides));

        selector.appendChild(button);
    });
}

function createSidebarDice() {
    const sidebar = document.getElementById("sidebar-dice");
    const equippedName = document.getElementById("equipped-name");

    if (!sidebar) return;

    sidebar.innerHTML = "";

    if (equippedName) {
        equippedName.textContent = skins[activeSkin].name;
    }

    const previewTypes = [4, 6, 12, 20];

    previewTypes.forEach(sides => {
        const preview = document.createElement("div");

        preview.className = "sidebar-preview";

        preview.innerHTML = createDieSVG(
            sides,
            activeSkin,
            `sidebar-${sides}`
        );

        sidebar.appendChild(preview);
    });
}

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function rollDice() {
    if (isRolling || dice.length === 0) return;

    const board = document.getElementById("dice-board");

    if (!board) return;

    isRolling = true;
    updateButtons();

    diceSound.pause();
    diceSound.currentTime = 0;
    diceSound.play().catch(() => {});

    const elements = [...board.querySelectorAll(".die")];

    const stagger = 100;
    const rollDuration = 1100;

    const results = dice.map(die => randomNumber(die.sides));

    elements.forEach((element, index) => {
        element.classList.remove("landed");
        element.style.animationDelay = `${index * stagger}ms`;
        element.classList.add("rolling");
    });

    const shuffleInterval = setInterval(() => {
        elements.forEach(element => {
            const sides = Number(element.dataset.sides);
            const numberElement = element.querySelector(".die-number");

            numberElement.textContent = randomNumber(sides);
        });
    }, 65);

    await wait(rollDuration + (elements.length - 1) * stagger);

    clearInterval(shuffleInterval);

    dice.forEach((die, index) => {
        die.value = results[index];

        const element = elements[index];
        const numberElement = element.querySelector(".die-number");

        numberElement.textContent = die.value;
        element.classList.remove("rolling");
        element.style.animationDelay = "0ms";
        element.classList.add("landed");
    });

    updateTotal();
    saveData();

    await wait(350);

    elements.forEach(element => {
        element.classList.remove("landed");
    });

    isRolling = false;
    updateButtons();
}

function createCollectionGrid() {
    const grid = document.getElementById("collection-grid");
    const count = document.getElementById("collection-count");

    if (!grid) return;

    grid.innerHTML = "";

    const entries = Object.entries(skins);

    if (count) {
        count.textContent =
            `${entries.length} ${entries.length === 1 ? "collection" : "collections"}`;
    }

    entries.forEach(([key, skin]) => {
        const card = document.createElement("div");

        card.className =
            `collection-card ${key === activeSkin ? "equipped" : ""}`;

        card.innerHTML = `
            <div class="collection-preview">
                ${createDieSVG(20, key, `collection-${key}`)}
            </div>

            <h3>${escapeHTML(skin.name)}</h3>
            <p>${escapeHTML(skin.description || "")}</p>

            <button
                class="equip-btn"
                type="button"
                ${key === activeSkin ? "disabled" : ""}
            >
                ${key === activeSkin ? "Equipped" : "Equip Set"}
            </button>
        `;

        const button = card.querySelector(".equip-btn");

        button.addEventListener("click", () => {
            activeSkin = key;
            saveData();
            window.location.href = "index.html";
        });

        grid.appendChild(card);
    });
}

function initializeMat() {
    createDiceSelector();
    createSidebarDice();
    renderBoard();

    const rollButton = document.getElementById("roll-btn");
    const clearButton = document.getElementById("clear-btn");

    rollButton.addEventListener("click", rollDice);
    clearButton.addEventListener("click", clearDice);
}

loadSavedData();

if (page === "mat") {
    initializeMat();
}

if (page === "bag") {
    createCollectionGrid();
}
