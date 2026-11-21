
const skins = {
    pink: {
        name: "Hella Pink",
        description: "Pink (Hella)",
        type: "gradient",
        light: "#ffeef7",
        main: "#ffa9d2",
        dark: "#ac206d",
        sparkle: "#f5fbff",

        font: {
            family: "'Nunito', sans-serif",
            color: "#ffffff",
            size: 29,
            shadow: "0 2px 4px #422b4780"
        }
    },

    blue: {
        name: "Protango",
        description: "low sodium",
        type: "gradient",
        light: "#efeeff",
        main: "#78b9f4",
        dark: "#4e70cf",
        sparkle: "#f4f6ff",

        font: {
            family: "'Nunito', sans-serif",
            color: "#ffffff",
            size: 29,
            shadow: "0 2px 4px #263d7980"
        }
    },

    purple: {
        name: "Purple",
        description: "Obligatory gay option",
        type: "gradient",
        light: "#fbeeff",
        main: "#f078f4",
        dark: "#5d166e",
        sparkle: "#f4f6ff",

        font: {
            family: "'Nunito', sans-serif",
            color: "#ffffff",
            size: 29,
            shadow: "0 2px 4px #263d7980"
        }
    },

    green: {
        name: "Regular Green",
        description: "I'm allergic to grass.",
        type: "gradient",
        light: "#d7ffc9",
        main: "#8edca7",
        dark: "#369c77",
        sparkle: "#ffffff",

        font: {
            family: "'Nunito', sans-serif",
            color: "#ffffff",
            size: 29,
            shadow: "0 2px 4px #285d4680"
        }
    },

    strawberry: {
        name: "stawbebe",
        description: "tester gif by Arilee on DA",
        type: "pattern",
        showFacets: true,
        facetColor: "#dfffd9",
        facetOpacity: 0.4,
        borderColor: "#53112d",
        image: "assets/dice/strawberries/strawberryArilee25DA.gif",

        font: {
            family: "Georgia, serif",
            color: "#ffe988",
            size: 30,
            shadow: "0 4px 4px #00922c",
            outline: "#000000",
            outlineWidth: 0.8
        }
    },

    water: {
        name: "Water",
        description: "is it wet?",
        type: "pattern",
        showFacets: true,
        facetColor: "#00263f",
        facetOpacity: 0.35,
        borderColor: "#00263f",
        image: "assets/dice/water/waterwavetest.gif",

        font: {
            family: "'Nunito', sans-serif",
            color: "#002faf",
            size: 29,
            shadow: "0 3px 3px #e9f6ff",
            outline: "#e9fffd",
            outlineWidth: 0.3
        }
    },

    goldandblackmarble: {
        name: "President Marble",
        description: "1% option",
        type: "pattern",
        showFacets: true,
        facetColor: "#ecdf68",
        facetOpacity: 0.5,
        borderColor: "#000000",
        image: "assets/dice/gold and black marble/kintsugi.png",

        font: {
            family: "'Nunito', sans-serif",
            color: "#c0ad00",
            size: 29,
            shadow: "0 3px 3px #af9500",
            outline: "#e9fffd",
            outlineWidth: 0.3
        }
    },

    wife: {
        name: "Wife",
        description: "Its wife colored",
        type: "pattern",
        showFacets: true,
        facetColor: "#00263f",
        facetOpacity: 0.35,
        borderColor: "#00263f",
        image: "assets/dice/imageBin fr fr/wife colored.png",

        font: {
            family: "'Nunito', sans-serif",
            color: "#002faf",
            size: 29,
            shadow: "0 3px 3px #e9f6ff",
            outline: "#e9fffd",
            outlineWidth: 0.3
        }
    },

    wife2: {
        name: "squished Wife",
        description: "haha doofus",
        type: "pattern",
        showFacets: true,
        facetColor: "#00263f",
        facetOpacity: 0.35,
        borderColor: "#00263f",
        image: "assets/dice/imageBin fr fr/aWife.png",

        font: {
            family: "'Nunito', sans-serif",
            color: "#ffaeb9",
            size: 29,
            shadow: "0 3px 3px #e9f6ff",
            outline: "#861326",
            outlineWidth: 0.4
        }
    },

    pinkPetals: {
        name: "Pink Petals",
        description: "Falling flower petals",
        type: "pattern",
        showFacets: true,
        facetColor: "#aa1616",
        facetOpacity: 0.35,
        borderColor: "#3f0000",
        image: "assets/dice/imageBin fr fr/falling petals.gif",

        font: {
            family: "'Lucida', cursive",
            color: "#ffe0e4",
            size: 29,
            shadow: "0 3px 3px #ffdded",
            outline: "#971128",
            outlineWidth: 0.8
        }
    },

    girlyPoison: {
        name: "Apple (But girlypop)",
        description: "Oh my gooooddd, haha stoppppp. 🤏💅💅💅",
        type: "pattern",
        showFacets: false,
        facetColor: "#aa1616",
        facetOpacity: 0.35,
        borderColor: "#3f0000",
        image: "assets/dice/imageBin fr fr/girly pop poison.gif",

        font: {
            family: "'Luminari', fantasy",
            color: "#ffe0e4",
            size: 29,
            shadow: "0 3px 3px #ffdded",
            outline: "#971128",
            outlineWidth: 0.4
        }
    },

    poisonApple: {
        name: "Poison Apple",
        description: "A suspiciously delicious apple.",
        type: "pattern",
        showFacets: false,
        facetColor: "#7c1736",
        facetOpacity: 0.4,
        borderColor: "#360c20",
        image: "assets/dice/imageBin fr fr/poison apple.gif",

        font: {
            family: "Georgia, serif",
            color: "#ffe5ef",
            size: 29,
            shadow: "0 3px 4px #450019",
            outline: "#630a2a",
            outlineWidth: 0.6
        }
    },

    pottedPlant: {
        name: "Potted Plant",
        description: "A little greenery for your rolls.",
        type: "pattern",
        showFacets: true,
        facetColor: "#3d7947",
        facetOpacity: 0.35,
        borderColor: "#24512c",
        image: "assets/dice/imageBin fr fr/potted plant.gif",

        font: {
            family: "'Nunito', sans-serif",
            color: "#f2ffdc",
            size: 29,
            shadow: "0 3px 3px #244c29",
            outline: "#24512c",
            outlineWidth: 0.6
        }
    },

    rosePetals: {
        name: "Rose Petals",
        description: "A little romantic drama.",
        type: "pattern",
        showFacets: true,
        facetColor: "#a72e50",
        facetOpacity: 0.35,
        borderColor: "#58152c",
        image: "assets/dice/imageBin fr fr/rose petals.gif",

        font: {
            family: "Georgia, serif",
            color: "#fff0f3",
            size: 29,
            shadow: "0 3px 3px #6e173a",
            outline: "#971128",
            outlineWidth: 0.6
        }
    },

                                         

    shikonJewel: {
        name: "Shikon Jewel",
        description: "Man I sure hope this doesn't break.",
        type: "pattern",
        showFacets: true,
        facetColor: "#d5b1f0",
        facetOpacity: 0.4,
        borderColor: "#643d86",
        image: "assets/dice/imageBin fr fr/shikon jewel.gif",

        font: {
            family: "Georgia, serif",
            color: "#fff0ff",
            size: 29,
            shadow: "0 3px 4px #704099",
            outline: "#704099",
            outlineWidth: 0.6
        }
    },

    sunflower: {
        name: "Sunflower",
        description: "A little sunshine!",
        type: "pattern",
        showFacets: true,
        facetColor: "#8e7926",
        facetOpacity: 0.35,
        borderColor: "#65531c",
        image: "assets/dice/imageBin fr fr/sunflower.jpg",

        font: {
            family: "'Nunito', sans-serif",
            color: "#5f3a09",
            size: 29,
            shadow: "0 3px 3px #f5ff69",
            outline: "#f5ff69",
            outlineWidth: 0.6
        }
    },

    wiggleLeaf: {
        name: "Wiggle Leaf",
        description: "The leaf is doing its best.",
        type: "pattern",
        showFacets: true,
        facetColor: "#3b8149",
        facetOpacity: 0.35,
        borderColor: "#24532d",
        image: "assets/dice/imageBin fr fr/wiggleLeaf.gif",

        font: {
            family: "'Nunito', sans-serif",
            color: "#efffdc",
            size: 29,
            shadow: "0 3px 3px #27542c",
            outline: "#24532d",
            outlineWidth: 0.6
        }
    }
};
