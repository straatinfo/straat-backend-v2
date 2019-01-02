const Language = require('../models/Language')

const data = [
  {
    baseWord: 'word',
    translations: [{
      code: 'en',
      word: 'word'
    },
    {
      word: 'wort',
      code: 'de'
    }
    ]
  },
  {
    baseWord: 'dog',
    translations: [{
      code: 'en',
      word: 'dog'
    },
    {
      code: 'de',
      word: 'hund'
    },
    {
      word: 'aso',
      code: 'tl'
    }
    ]
  },
  {
    baseWord: 'cat',
    translations: [{
      code: 'en',
      word: 'cat'
    },
    {
      code: 'de',
      word: 'katze'
    },
    {
      word: 'kuting',
      code: 'tl'
    }
    ]
  },
  {
    baseWord: 'mouse',
    translations: [{
      code: 'en',
      word: 'mouse'
    },
    {
      code: 'de',
      word: 'maus'
    },
    {
      word: 'daga',
      code: 'tl'
    }
    ]
  },
  {
    baseWord: 'a2',
    translations: [{
      code: 'en',
      word: 'a2'
    },
    {
      code: 'nl',
      word: 'a2'
    }
    ]
  },
  {
    baseWord: 'a3',
    translations: [{
      code: 'en',
      word: 'a3'
    },
    {
      code: 'nl',
      word: 'a3 dutch'
    }
    ]
  },
  {
    baseWord: 'a4',
    translations: [{
      code: 'en',
      word: 'a4'
    }]
  },
  {
    baseWord: 'a5',
    translations: [{
      code: 'en',
      word: 'a5'
    },
    {
      code: 'nl',
      word: 'a5 dutch'
    }
    ]
  },
  {
    baseWord: 'a6',
    translations: [{
      code: 'en',
      word: 'a6'
    },
    {
      code: 'nl',
      word: 'a6 dutch'
    }
    ]
  },
  {
    baseWord: 'a7',
    translations: [{
      code: 'en',
      word: 'a7'
    },
    {
      code: 'nl',
      word: 'a7 dutch'
    }
    ]
  },
  {
    baseWord: 'a8',
    translations: [{
      code: 'en',
      word: 'a8'
    }]
  },
  {
    baseWord: 'a9',
    translations: [{
      code: 'en',
      word: 'a9'
    },
    {
      code: 'nl',
      word: 'a9 dutch'
    },
    {
      word: 'a9 dutch1',
      code: 'nl'
    }
    ]
  },
  {
    baseWord: 'a',
    translations: [{
      code: 'en',
      word: 'a'
    }]
  },
  {
    baseWord: 'a1',
    translations: [{
      code: 'en',
      word: 'a1'
    }]
  },
  {
    baseWord: 'any main',
    translations: [{
      code: 'en',
      word: 'any main'
    }]
  },
  {
    baseWord: 'b',
    translations: [{
      code: 'en',
      word: 'b'
    }]
  },
  {
    baseWord: 'c',
    translations: [{
      code: 'en',
      word: 'c'
    }]
  },
  {
    baseWord: 'e',
    translations: [{
      code: 'en',
      word: 'e'
    }]
  },
  {
    baseWord: 'd',
    translations: [{
      code: 'en',
      word: 'd'
    }]
  },
  {
    baseWord: 'gen main 2018 03 25 ii',
    translations: [{
      code: 'en',
      word: 'gen main 2018 03 25 ii'
    }]
  },
  {
    baseWord: 'gen main 2018 03 25 i',
    translations: [{
      code: 'en',
      word: 'gen main 2018 03 25 i'
    }]
  },
  {
    baseWord: 'gen main 2018 03 25 iii',
    translations: [{
      code: 'en',
      word: 'gen main 2018 03 25 iii'
    }]
  },
  {
    baseWord: 'gen main 2018 03 25 iv',
    translations: [{
      code: 'en',
      word: 'gen main 2018 03 25 iv'
    }]
  },
  {
    baseWord: 'gen main 2018 03 25 v',
    translations: [{
      code: 'en',
      word: 'gen main 2018 03 25 v'
    }]
  },
  {
    baseWord: 'gen main 2018 04 07 i',
    translations: [{
      code: 'en',
      word: 'gen main 2018 04 07 i'
    }]
  },
  {
    baseWord: 'gen main 2018 04 07 ii',
    translations: [{
      code: 'en',
      word: 'gen main 2018 04 07 ii'
    }]
  },
  {
    baseWord: 'h',
    translations: [{
      code: 'en',
      word: 'h'
    }]
  },
  {
    baseWord: 'other',
    translations: [{
      code: 'en',
      word: 'other'
    },
    {
      word: 'overige',
      code: 'nl'
    }
    ]
  },
  {
    baseWord: 'overige',
    translations: [{
      code: 'en',
      word: 'overige'
    }]
  },
  {
    baseWord: 'gen main 2018 04 07 b i',
    translations: [{
      code: 'en',
      word: 'gen main 2018 04 07 b i'
    }]
  },
  {
    baseWord: 'z',
    translations: [{
      code: 'en',
      word: 'z'
    }]
  },
  {
    baseWord: 'overig',
    translations: [{
      code: 'en',
      word: 'overig'
    }]
  },
  {
    baseWord: 'gen des 2018 03 25 b i',
    translations: [{
      code: 'en',
      word: 'gen des 2018 03 25 b i'
    }]
  },
  {
    baseWord: 'gen des 2018 03 25 b iii',
    translations: [{
      code: 'en',
      word: 'gen des 2018 03 25 b iii'
    }]
  },
  {
    baseWord: 'gen des 2018 03 25 b ii',
    translations: [{
      code: 'en',
      word: 'gen des 2018 03 25 b ii'
    }]
  },
  {
    baseWord: 'y',
    translations: [{
      code: 'en',
      word: 'y'
    }]
  },
  {
    baseWord: 'gen sub 2018 03 25 ic',
    translations: [{
      code: 'en',
      word: 'gen sub 2018 03 25 ic'
    }]
  },
  {
    baseWord: 'gen sub 2018 03 25 ib',
    translations: [{
      code: 'en',
      word: 'gen sub 2018 03 25 ib'
    }]
  },
  {
    baseWord: 'gen sub 2018 03 25 ia',
    translations: [{
      code: 'en',
      word: 'gen sub 2018 03 25 ia'
    }]
  },
  {
    baseWord: 'gen main 2018 04 07 c i',
    translations: [{
      code: 'en',
      word: 'gen main 2018 04 07 c i'
    }]
  },
  {
    baseWord: 'algemene informatie',
    translations: [{
      code: 'en',
      word: 'algemene informatie'
    }]
  },
  {
    baseWord: 'oproep',
    translations: [{
      code: 'en',
      word: 'oproep'
    }]
  },
  {
    baseWord: 'uitnodiging',
    translations: [{
      code: 'en',
      word: 'uitnodiging'
    }]
  },
  {
    baseWord: 'new main',
    translations: [{
      code: 'en',
      word: 'new main'
    }]
  },
  {
    baseWord: 'english',
    translations: [{
      code: 'en',
      word: 'english'
    },
    {
      code: 'nl',
      word: 'dutch'
    }
    ]
  },
  {
    baseWord: 'mat',
    translations: [{
      code: 'en',
      word: 'mat'
    },
    {
      word: 'this is a dutch',
      code: 'nl'
    }
    ]
  },
  {
    baseWord: 'ok',
    translations: [{
      code: 'en',
      word: 'ok'
    },
    {
      code: 'nl',
      word: 'this is a test'
    }
    ]
  },
  {
    baseWord: 'sub category',
    translations: [{
      code: 'en',
      word: 'sub category'
    }]
  },
  {
    baseWord: 'oki',
    translations: [{
      code: 'en',
      word: 'oki'
    }]
  },
  {
    baseWord: 'add',
    translations: [{
      code: 'en',
      word: 'add'
    },
    {
      code: 'nl',
      word: 'sub'
    }
    ]
  },
  {
    baseWord: 'add ',
    translations: [{
      code: 'en',
      word: 'add '
    }]
  },
  {
    baseWord: 'main',
    translations: [{
      code: 'en',
      word: 'main'
    },
    {
      code: 'nl',
      word: 'this is a sub'
    }
    ]
  },
  {
    baseWord: 'po',
    translations: [{
      code: 'en',
      word: 'po'
    },
    {
      code: 'nl',
      word: 'pl'
    }
    ]
  },
  {
    baseWord: 'exact',
    translations: [{
      code: 'en',
      word: 'exact'
    },
    {
      code: 'nl',
      word: 'man'
    }
    ]
  },
  {
    baseWord: 'spec design main 2018 03 25 iii',
    translations: [{
      code: 'en',
      word: 'spec design main 2018 03 25 iii'
    }]
  },
  {
    baseWord: 'test',
    translations: [{
      code: 'en',
      word: 'test'
    }]
  },
  {
    baseWord: 'spec design main 2018 03 25 i',
    translations: [{
      code: 'en',
      word: 'spec design main 2018 03 25 i'
    }]
  },
  {
    baseWord: 'spec design main 2018 03 25 ii',
    translations: [{
      code: 'en',
      word: 'spec design main 2018 03 25 ii'
    }]
  },
  {
    baseWord: 'asdfasdf',
    translations: [{
      code: 'en',
      word: 'asdfasdf'
    }]
  },
  {
    baseWord: 'bb',
    translations: [{
      code: 'en',
      word: 'bb'
    }]
  },
  {
    baseWord: 'english category sample',
    translations: [{
      code: 'en',
      word: 'english category sample'
    },
    {
      code: 'nl',
      word: 'dutch category sample'
    }
    ]
  },
  {
    baseWord: 'english sub cat',
    translations: [{
      code: 'en',
      word: 'english sub cat'
    },
    {
      code: 'nl',
      word: 'dutch sub cat'
    }
    ]
  },
  {
    baseWord: 'english sub cat ',
    translations: [{
      code: 'en',
      word: 'english sub cat '
    }]
  },
  {
    baseWord: 'test english for general',
    translations: [{
      code: 'en',
      word: 'test english for general'
    },
    {
      word: 'test dutch for general',
      code: 'nl'
    }
    ]
  },
  {
    baseWord: 'test english cat',
    translations: [{
      code: 'en',
      word: 'test english cat'
    },
    {
      code: 'nl',
      word: 'test dutch cat'
    }
    ]
  },
  {
    baseWord: 'go',
    translations: [{
      code: 'en',
      word: 'go'
    }]
  },
  {
    baseWord: 'green',
    translations: [{
      code: 'en',
      word: 'green'
    },
    {
      code: 'nl',
      word: 'groen'
    }
    ]
  },
  {
    baseWord: 'spec desg eng 2018 05 09 i',
    translations: [{
      code: 'en',
      word: 'spec desg eng 2018 05 09 i'
    },
    {
      code: 'nl',
      word: 'spec desg dut 2018 05 09 i'
    }
    ]
  },
  {
    baseWord: 'spec desg eng 2018 05 09 ii',
    translations: [{
      code: 'en',
      word: 'spec desg eng 2018 05 09 ii'
    },
    {
      code: 'nl',
      word: 'spec desg eng 2018 05 09 ii'
    }
    ]
  },
  {
    baseWord: 'spec sub eng 2018 05 09 ia',
    translations: [{
      code: 'en',
      word: 'spec sub eng 2018 05 09 ia'
    },
    {
      code: 'nl',
      word: 'spec sub eng 2018 05 09 ia'
    }
    ]
  },
  {
    baseWord: 'spec sub eng 2018 05 09 ib',
    translations: [{
      code: 'en',
      word: 'spec sub eng 2018 05 09 ib'
    },
    {
      code: 'nl',
      word: 'spec sub dut 2018 05 09 ib'
    }
    ]
  },
  {
    baseWord: 'no other',
    translations: [{
      code: 'en',
      word: 'no other'
    },
    {
      word: 'geen andere',
      code: 'nl'
    }
    ]
  },
  {
    baseWord: 'eng',
    translations: [{
      code: 'en',
      word: 'eng'
    },
    {
      word: 'duthc',
      code: 'nl'
    }
    ]
  },
  {
    baseWord: 'englishes',
    translations: [{
      code: 'en',
      word: 'englishes'
    },
    {
      word: 'duthy',
      code: 'nl'
    }
    ]
  },
  {
    baseWord: 'gen eng main 2018 05 09 i',
    translations: [{
      code: 'en',
      word: 'gen eng main 2018 05 09 i'
    },
    {
      code: 'nl',
      word: 'gen eng main 2018 05 09 ii'
    }
    ]
  },
  {
    baseWord: 'main eng 2018 05 09 i',
    translations: [{
      code: 'en',
      word: 'main eng 2018 05 09 i'
    },
    {
      code: 'nl',
      word: 'main dutch 2018 05 09 i'
    }
    ]
  },
  {
    baseWord: 'main eng 2018 05 09 ii',
    translations: [{
      code: 'en',
      word: 'main eng 2018 05 09 ii'
    },
    {
      code: 'nl',
      word: 'main dutch 2018 05 09 ii'
    }
    ]
  },
  {
    baseWord: 'main eng 2018 05 09 iii',
    translations: [{
      code: 'en',
      word: 'main eng 2018 05 09 iii'
    },
    {
      code: 'nl',
      word: 'main dutch 2018 05 09 iii'
    }
    ]
  },
  {
    baseWord: 'sub eng 2018 05 09 iia',
    translations: [{
      code: 'en',
      word: 'sub eng 2018 05 09 iia'
    },
    {
      code: 'nl',
      word: 'sub dutch 2018 05 09 iia'
    }
    ]
  },
  {
    baseWord: 'sub eng 2018 05 09 iib',
    translations: [{
      code: 'en',
      word: 'sub eng 2018 05 09 iib'
    },
    {
      code: 'nl',
      word: 'sub dutch 2018 05 09 iib'
    }
    ]
  },
  {
    baseWord: 'main eng 2018 05 09 b i',
    translations: [{
      code: 'en',
      word: 'main eng 2018 05 09 b i'
    },
    {
      code: 'nl',
      word: 'main dutch 2018 05 09 b i'
    }
    ]
  },
  {
    baseWord: 'main eng 2018 05 09 b ii',
    translations: [{
      code: 'en',
      word: 'main eng 2018 05 09 b ii'
    },
    {
      code: 'nl',
      word: 'main dutch 2018 05 09 b ii'
    }
    ]
  },
  {
    baseWord: 'main eng 2018 05 09 c i',
    translations: [{
      code: 'en',
      word: 'main eng 2018 05 09 c i'
    },
    {
      word: 'main dutch 2018 05 09 c i',
      code: 'nl'
    }
    ]
  },
  {
    baseWord: 'main eng 2018 05 09 c ii',
    translations: [{
      code: 'en',
      word: 'main eng 2018 05 09 c ii'
    },
    {
      code: 'nl',
      word: 'main dutch 2018 05 09 c ii'
    }
    ]
  },
  {
    baseWord: 'main eng 2018 05 09 c iii',
    translations: [{
      code: 'en',
      word: 'main eng 2018 05 09 c iii'
    },
    {
      code: 'nl',
      word: 'main dutch 2018 05 09 c iii'
    }
    ]
  },
  {
    baseWord: 'vandalism',
    translations: [{
      code: 'en',
      word: 'vandalism'
    }]
  },
  {
    baseWord: 'waste',
    translations: [{
      code: 'en',
      word: 'waste'
    },
    {
      code: 'nl',
      word: 'afval'
    }
    ]
  },
  {
    baseWord: 'waste next to container',
    translations: [{
      code: 'en',
      word: 'waste next to container'
    },
    {
      code: 'nl',
      word: 'afval naast container'
    }
    ]
  },
  {
    baseWord: 'large waste',
    translations: [{
      code: 'en',
      word: 'large waste'
    },
    {
      code: 'nl',
      word: 'grofvuil'
    }
    ]
  },
  {
    baseWord: 'small chemical waste',
    translations: [{
      code: 'en',
      word: 'small chemical waste'
    },
    {
      code: 'nl',
      word: 'klein chemisch afval'
    }
    ]
  },
  {
    baseWord: 'main a eng 20180528 i',
    translations: [{
      code: 'en',
      word: 'main a eng 20180528 i'
    },
    {
      code: 'nl',
      word: 'main a dutch 20180528 i'
    }
    ]
  },
  {
    baseWord: 'english orangecat',
    translations: [{
      code: 'en',
      word: 'english orangecat'
    },
    {
      code: 'nl',
      word: 'dutch orangecat'
    }
    ]
  },
  {
    baseWord: 'english subcat',
    translations: [{
      code: 'en',
      word: 'english subcat'
    },
    {
      code: 'nl',
      word: 'dutch subcat'
    }
    ]
  }
]

const model = function () {
  return Language
}

module.exports = {
  model,
  data
}
