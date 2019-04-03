const categories = [
    {
        collapse: true,
        name: "Hår",
        deep: 0,
        children: [
            {
                name: "Clips",
                deep: 1
            },
            {
                collapse: true,
                name: "Microringar",
                deep: 1,
                children: [
                    {
                        name: "Rinex Loop",
                        deep: 2
                    }
                ]
            },
            {
                collapse: true,
                name: "Tape Extensions",
                deep: 1,
                children: [
                    {
                        name: "Tillbehör",
                        deep: 2
                    }
                ]
            }
        ]
    },
    {
        collapse: true,
        name: "Produkter",
        deep: 0,
        children: [
            {
                collapse: true,
                name: "Hårvård",
                deep: 1,
                children: [
                    {
                        name: "Schampo",
                        deep: 2
                    },
                    {
                        name: "Balsam",
                        deep: 2
                    },
                    {
                        name: "Inpackning",
                        deep: 2
                    },
                    {
                        name: "Leave-in",
                        deep: 2
                    },
                ]
            }
        ]
    }
];

export default categories;