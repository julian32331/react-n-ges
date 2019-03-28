const categories = [
    {
        collapse: true,
        name: "Hår",
        children: [
            {
                name: "Clips"
            },
            {
                collapse: true,
                name: "Microringar",
                children: [
                    {
                        name: "Rinex Loop"
                    }
                ]
            },
            {
                collapse: true,
                name: "Tape Extensions",
                children: [
                    {
                        name: "Tillbehör"
                    }
                ]
            }
        ]
    },
    {
        collapse: true,
        name: "Produkter",
        children: [
            {
                collapse: true,
                name: "Hårvård",
                children: [
                    {
                        name: "Schampo"
                    },
                    {
                        name: "Balsam"
                    },
                    {
                        name: "Inpackning"
                    },
                    {
                        name: "Leave-in"
                    },
                ]
            }
        ]
    }
];

export default categories;