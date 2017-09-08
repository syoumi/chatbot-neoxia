{
  "lang": "ma",
  "data": [
    {
      "action": "salutations-action",
      "keywords": [
        "salut",
        "slt",
        "salam",
        "bonjour",
        "bonsoir",
        "bsr",
        "bjr",
        "hello",
        "salam",
        "lu",
        "coucou",
        "cc"
      ],
      "answers": [
        "Salam !\n Khassek chi dar?"
      ],
      "nextActions": [],
      "previousActions" : [],
      "hasParam": "0"
    },

    {
      "action": "yes-action",
      "keywords": [
        "oui",
        "ouai",
        "wéé",
        "yes",
        "yeah",
        "d accord",
        "d acc",
        "ok",
        "okay",
        "okey",
        "c est bon",
        "pourquoi pas",
        "prq pas"
      ],
      "answers": [
        "Génial !",
        "Super !",
        "C'est bon.",
        "Bien entendu."
      ],
      "nextActions": [],
      "previousActions" : [],
      "hasParam": "0"
    },

    {
      "action": "no-action",
      "keywords": [
        "non",
        "pas d accord",
        "pas du tout",
        "du tout",
        "non merci"
      ],
      "answers": [
        "D'accord.",
        "C'est noté.",
        "Comme vous voulez."
      ],
      "nextActions": [],
      "previousActions" : [],
      "hasParam": "0"
    },

    {
      "action": "thanks-action",
      "keywords": [
        "merci",
        "merci beaucoup",
        "je vous remercie",
        "thanks",
        "thank you",
        "thx",
        "grand merci",
        "je suis reconnaissant",
        "remerciement",
        "merci bien"
      ],
      "answers": [
        "À votre service.",
        "Je vous en prie.",
        "Mais de rien.",
        "C'est un plaisir.",
        "C'est toujours un plaisir de vous rendre service.",
        "Aucun problème, je suis là pour ça."
      ],
      "nextActions": [],
      "previousActions" : [],
      "hasParam": "0"
    },

    {
     "action": "goodbye-action",
     "keywords": [
       "au revoir",
       "bye",
       "à plus",
       "à toute",
       "à plus tard",
       "à tout à l heure",
       "ciao",
       "à bientôt",
       "je dois y aller",
       "je quitte",
       "goodbye"
     ],
     "answers": [
       "À bientôt !",
       "Au revoir.",
       "Dans l'espoir de vous revoir bientôt.",
       "Salut, à plus !"
     ],
     "nextActions": [],
     "previousActions" : [],
     "hasParam" : "0"
   },

   {
    "action": "salamalec-action",
    "keywords": [
      "ça va",
      "sa va",
      "cv",
      "comment vas tu",
      "comment allez vous",
      "est ce que vous allez bien"
    ],
    "answers": [
      "Très bien, merci et vous?",
      "Super, merci. Vous?"
    ],
    "nextActions": ["salamalec-answer-action"],
    "previousActions" : [],
    "hasParam" : "0"
  },

  {
   "action": "salamalec-answer-action",
   "keywords": [
     "bien merci",
     "très bien",
     "cv",
     "ça va",
     "aussi",
     "de même",
     "également",
     "cv hmd"
   ],
   "answers": [
     "Bien.\nComment puis-je vous aider ?"
   ],
   "nextActions": [],
   "previousActions" : ["salamalec-action"],
   "hasParam" : "0"
  },

  {
    "action": "catalogue-action",
    "keywords": [
        "consulter catalogue",
        "voir catalogue",
        "veux catalogue",
        "quelles sont vos propositions",
        "je cherche un logement",
        "qu est ce que vous proposez",
        "quels sont vos biens",
        "qu est ce que vous vendez",
        "propositions",
        "suggestions"
    ],
    "answers": [
        "Quel type de logement voulez-vous consulter?",
        "Veuillez préciser, s'il vous plaît, le type de logement que vous souhaitez consulter."
      ],
      "nextActions": ["type-building-action"],
      "previousActions" : [],
      "hasParam": "0"
    },

    {
      "action": "catalogue-city-action",
      "keywords": [
          "quelles sont vos propositions à #city|city#",
          "quels sont vos biens à #city|city#",
          "je cherche un logement à #city|city#"
      ],
      "answers": [
          "Quel type de logement voulez-vous consulter ?",
          "Par quel type de logement êtes-vous intéressé ?"
      ],
      "nextActions": ["type-building-v2-action"],
      "previousActions" : [],
      "hasParam": "1"
    },

    {
      "action": "catalogue-building-action",
      "keywords": [
          "quelles sont vos propositions de #building|building#",
          "est-ce vous avez des #building|building#",
          "je cherche un #building|building#"
      ],
      "answers": [
          "Voulez-vous acheter ou louer ?"
      ],
      "nextActions": ["operation-v3-action"],
      "previousActions" : [],
      "hasParam": "1"
    },

    {
      "action": "catalogue-neighborhood-action",
      "keywords": [
          "je cherche un logement à #neighborhood|neighborhood#",
          "est-ce vous avez un logement à #building|building#",
          "quelles sont vos propositions à #neighborhood|neighborhood#"
      ],
      "answers": [
          "Quel type de logement voulez-vous consulter ?",
          "Par quel type de logement êtes-vous intéressé ?"
      ],
      "nextActions": ["type-building-v2-action"],
      "previousActions" : [],
      "hasParam": "1"
    },

    {
      "action": "catalogue-building-operation-action",
      "keywords": [
          "je veux #operation|operation# un #building|building#",
          "je souhaite #operation|operation# un #building|building#",
          "je cherche #building|building# à #operation|operation#",
          "est-ce que vous #operation|operation# des #building|building#"
      ],
      "answers": [
          "Avec plaisir. Mais si vous le permettez, j'ai besoin de vous poser quelques questions afin de choisir le logement qui vous le convient le plus.\nVous pouvez sauter cette étape si vous voulez."
      ],
      "nextActions": ["accept-city-action", "skip-city-action"],
      "previousActions" : [],
      "hasParam": "1"
    },

    {
      "action": "catalogue-building-operation-city-action",
      "keywords": [
          "je souhaite #operation|operation# un #building|building# à #city|city#",
          "je cherche un #building|building# à #city|city# à #operation|operation#",
          "je cherche #building|building# à #operation|operation# à #city|city",
          "est ce que vous #operation|operation# des #building|building# à #city|city#"
      ],
      "answers": [
          "D'accord. Mais si vous le permettez, j'ai besoin de vous poser quelques questions afin de choisir le logement qui vous le convient le plus.\nVous pouvez sauter cette étape si vous voulez. "
      ],
      "nextActions": ["skip-neighborhood-action", "accept-neighborhood-action"],
      "previousActions" : [],
      "hasParam": "1"
    },

    {
      "action": "catalogue-building-operation-neighborhood-action",
      "keywords": [
          "je souhaite #operation|operation# un #building|building# à #neighborhood|neighborhood#",
          "je cherche un #building|building# à #neighborhood|neighborhood# à #operation|operation#",
          "est ce que vous #operation|operation# des #building|building# à #neighborhood|neighborhood#"
      ],
      "answers": [
         "D'accord. Mais si vous le permettez, j'ai besoin de vous poser quelques questions afin de choisir le logement qui vous le convient le plus.\nVous pouvez sauter cette étape si vous voulez."
      ],
      "nextActions": ["accept-fixing-price-action", "skip-fixing-price-action"],
      "previousActions" : [],
      "hasParam": "1"
    },

    {
      "action": "catalogue-building-operation-city-neighborhood-action",
      "keywords": [
          "je souhaite #operation|operation# un #building|building# à #city|city# à #neighborhood|neighborhood#",
          "est ce que vous #operation|operation# des #building|building# à #city|city# à #neighborhood|neighborhood#",
          "je cherche un #building|building# à #city|city# à #neighborhood|neighborhood# à #operation|operation#"
      ],
      "answers": [
          "D'accord. Mais si vous le permettez, j'ai besoin de vous poser quelques questions afin de choisir le logement qui vous le convient le plus.\nVous pouvez sauter cette étape si vous voulez."
      ],
      "nextActions": ["accept-fixing-price-action", "skip-fixing-price-action"],
      "previousActions" : [],
      "hasParam": "1"
    },

    {
      "action": "catalogue-building-city-neighborhood-action",
      "keywords": [
          "je cherche un #building|building# à #city|city# à #neighborhood|neighborhood#"
      ],
      "answers": [
          "Voulez-vous acheter ou louer ?"
      ],
      "nextActions": ["operation-v2-option"],
      "previousActions" : [],
      "hasParam": "1"
    },

    {
      "action": "catalogue-city-neighborhood-action",
      "keywords": [
          "je cherche un logement à #city|city# à #neighborhood|neighborhood#"
      ],
      "answers": [
          "Par quel de logement êtes-vous intéressé ?",
          "Quel type de logement souhaitez-vous consulter ?"
      ],
      "nextActions": ["type-building-v3-action"],
      "previousActions" : [],
      "hasParam": "1"
    },

    {
      "action": "catalogue-sell-building-action",
      "keywords": [
          "est ce que vous vendez un #building|building#",
          "je cherche #building|building# à vendre",
          "est-ce que vous avez des #building|building# à vendre"
      ],
      "answers": [
          "Avec plaisir. Mais si vous le permettez, j'ai besoin de vous poser quelques questions afin de choisir le logement qui vous le convient le plus.\nVous pouvez sauter cette étape si vous voulez."
      ],
      "nextActions": ["accept-city-action", "skip-city-action"],
      "previousActions" : [],
      "hasParam": "1"
    },

    {
      "action": "catalogue-sell-building-city-action",
      "keywords": [
          "est ce que vous vendez un #building|building# à #city|city#"
      ],
      "answers": [
          "D'accord. Mais si vous le permettez, j'ai besoin de vous poser quelques questions afin de choisir le logement qui vous le convient le plus.\nVous pouvez sauter cette étape si vous voulez."
      ],
      "nextActions": ["skip-fixing-neighborhood", "accept-neighborhood-action"],
      "previousActions" : [],
      "hasParam": "1"
    },

    {
      "action": "catalogue-sell-building-neighborhood-action",
      "keywords": [
          "est ce que vous vendez un #building|building# à #neighborhood|neighborhood#"
      ],
      "answers": [
          "D'accord. Mais si vous le permettez, j'ai besoin de vous poser quelques questions afin de choisir le logement qui vous le convient le plus.\nVous pouvez sauter cette étape si vous voulez."
      ],
      "nextActions": ["skip-fixing-price-action", "accept-fixing-price-action"],
      "previousActions" : [],
      "hasParam": "1"
    },

    {
      "action": "type-building-action",
      "keywords": [
        "#building|building#"
      ],
      "answers": [
        "D'accord. Voulez-vous acheter ou louer?"
      ],
      "nextActions": ["operation-action"],
      "previousActions" : ["catalogue-action"],
      "hasParam": "1"
    },

    {
      "action": "type-building-v2-action",
      "keywords": [
        "#building|building#"
      ],
      "answers": [
        "D'accord.\nVoulez-vous acheter ou louer?"
      ],
      "nextActions": ["operation-v2-action"],
      "previousActions" : ["catalogue-city-action", "catalogue-neighborhood-action"],
      "hasParam": "1"
    },

    {
      "action": "type-building-v3-action",
      "keywords": [
        "#building|building#"
      ],
      "answers": [
        "D'accord. Voulez-vous acheter ou louer?"
      ],
      "nextActions": ["operation-v3-action"],
      "previousActions" : ["catalogue-neighborhood-action"],
      "hasParam": "1"
    },

    {
      "action": "operation-action",
      "keywords": [
        "#operation|operation#"
      ],
      "answers": [
        "D'accord. Mais si vous permettez, j'ai besoin de vous poser certaines questions afin de choisir le logement qui vous convient le plus. Vous pouvez sautez cette étape, si vous voulez."
      ],
      "nextActions": ["accept-city-action", "skip-city-action"],
      "previousActions" : ["type-building-action"],
      "hasParam": "1"
    },

    {
      "action": "operation-v2-action",
      "keywords": [
        "#operation|operation#"
      ],
      "answers": [
        "D'accord. Mais si vous le permettez, j'ai besoin de vous poser certaines questions afin de choisir ce qui vous convient le plus. Vous pouvez sauter cette étape si vous voulez."
      ],
      "nextActions": ["accept-neighborhood-action", "skip-neighborhood-action"],
      "previousActions" : ["catalogue-city-action"],
      "hasParam": "1"
    },

    {
      "action": "operation-v3-action",
      "keywords": [
        "#operation|operation#"
      ],
      "answers": [
        "D'accord. Mais si vous le permettez, j'ai besoin de vous poser certaines questions afin de choisir ce qui vous convient le plus. Vous pouvez sauter cette étape si vous voulez."
      ],
      "nextActions": ["accept-neighborhood-action", "skip-neighborhood-action"],
      "previousActions" : ["type-building-v3-action"],
      "hasParam": "1"
    },

    {
      "action": "skip-city-action",
      "keywords": [
        "sauter",
        "non",
        "non merci",
        "plus tard"
      ],
      "answers": [
        "Veuillez patienter s'il vous plaît. Je vous envoie le catalogue dans quelques instants."
      ],
      "nextActions": [],
      "previousActions" : ["catalogue-building-operation-action", "operation-action"],
      "hasParam": "0"
    },

    {
      "action": "skip-neighborhood-action",
      "keywords": [
        "Sauter",
        "non",
        "non merci",
        "plus tard"
      ],
      "answers": [
        "Veuillez patienter s'il vous plaît. Je vous envoie le catalogue dans quelques instants."
      ],
      "nextActions": [],
      "previousActions" : [""],
      "hasParam": "0"
    },

    {
      "action": "refuse-neighborhood-action",
      "keywords": [
        "non",
        "plus tard",
        "pas maintenant"
      ],
      "answers": [
        "Comme vous voulez.\nVoulez-vous fixer une fourchette des prix ?"
      ],
      "nextActions": ["accept-fixing-price-action", "refuse-fixing-price-action", "fixing-price-action"],
      "previousActions" : ["fixing-city-action"],
      "hasParam": "0"
    },

    {
      "action": "accept-neighborhood-action",
      "keywords": [
        "filtrer",
        "oui",
        "ok",
        "d accord",
        "prq pas",
        "pourquoi pas",
        "si",
        "vas y"
      ],
      "answers": [
        "D'accord.\nVoulez-choisir également un quartier? Si oui, lequel?"
      ],
      "nextActions": ["fixing-neighborhood-action", "refuse-neighborhood-action"],
      "previousActions" : ["operation-v2-action"],
      "hasParam": "0"
    },

    {
      "action": "skip-fixing-price-action",
      "keywords": [
        "Sauter",
        "non",
        "non merci",
        "plus tard"
      ],
      "answers": [
        "Veuillez patienter s'il vous plaît. Je vous envoie le catalogue dans quelques instants."
      ],
      "nextActions": [],
      "previousActions" : [""],
      "hasParam": "0"
    },

    {
      "action": "accept-fixing-price-action",
      "keywords": [
        "filtrer",
        "oui",
        "d accord",
        "pourquoi pas",
        "prq pas",
        "ok",
        "si",
        "fixer fourchette"
      ],
      "answers": [
        "D'accord. Veuillez spéficier le prix minimum (en DH), s'il vous plaît."
      ],
      "nextActions": ["min-price-action"],
      "previousActions" : ["fixing-neighborhood-action", "refuse-neighborhood-action", "refuse-city-action", "catalogue-building-operation-neighborhood-action", "catalogue-building-operation-city-neighborhood-action", "operation-v2-action"],
      "hasParam": "0"
    },

    {
      "action": "min-price-action",
      "keywords": [
        "#minPrice|currency#",
        "#minPrice|currency# dh"
      ],
      "answers": [
        "Veuillez spéficier le prix maximum (en DH), s'il vous plaît."
      ],
      "nextActions": ["max-price-action"],
      "previousActions" : ["accept-fixing-price-action"],
      "hasParam": "1"
    },

    {
      "action": "max-price-action",
      "keywords": [
        "#maxPrice|currency#",
        "Le prix max est #maxPrice|currency#",
        "#maxPrice|currency# dh"
      ],
      "answers": [
        "C'est noté.\nSouhaitez-vous spécifier le nombre de chambres?\nSi oui, combien ?"
      ],
      "nextActions": ["fixing-nbr-rooms-action", "refuse-nbr-rooms-action"],
      "previousActions" : ["min-price-action"],
      "hasParam": "1"
    },

    {
      "action": "fixing-price-action",
      "keywords": [
        "#minPrice|currency# #maxPrice|currency#",
        "entre #minPrice|currency# et #maxPrice|currency#",
        "#minPrice|currency# dh #maxPrice|currency# dh"
      ],
      "answers": [
        "C'est noté.\nSouhaitez-vous spécifier le nombre de chambres?\nSi oui, combien ?"
      ],
      "nextActions": ["fixing-nbr-rooms-action", "refuse-nbr-rooms-action"],
      "previousActions" : ["fixing-neighborhood-action", "refuse-neighborhood-action"],
      "hasParam": "1"
    },

    {
      "action": "refuse-fixing-price-action",
      "keywords": [
        "non",
        "non merci",
        "pas maintenant"
      ],
      "answers": [
        "C'est noté.\nSouhaitez-vous spécifier le nombre de chambres?\nSi oui, combien?"
      ],
      "nextActions": ["fixing-nbr-rooms-action", "refuse-nbr-rooms-action"],
      "previousActions" : ["fixing-neighborhood-action", "refuse-neighborhood-action", "refuse-city-action", "catalogue-building-operation-neighborhood-action", "catalogue-building-operation-city-neighborhood-action", "operation-v2-action"],
      "hasParam": "0"
    },

    {
      "action": "fixing-nbr-rooms-action",
      "keywords": [
        "#nbrRooms|number#",
        "#nbrRooms|number# chambres",
        "#nbrRooms|number# pièces"
      ],
      "answers": [
        "C'est noté.\nVeuillez patienter s'il vous plaît. Je vous envoie le catalogue dans quelques instants."
      ],
      "nextActions": [],
      "previousActions" : ["max-price-action", "refuse-fixing-price-action", "fixing-price-action"],
      "hasParam": "1"
    },

    {
      "action": "refuse-nbr-rooms-action",
      "keywords": [
        "non",
        "non merci",
        "pas maintenant"
      ],
      "answers": [
        "Comme vous voulez.\nVeuillez patienter s'il vous plaît. Je vous envoie le catalogue dans quelques instants."
      ],
      "nextActions": [],
      "previousActions" : ["refuse-fixing-price-action", "max-price-action", "fixing-price-action"],
      "hasParam": "0"
    },

    {
      "action": "accept-city-action",
      "keywords": [
        "filter",
        "oui",
        "pourquoi pas",
        "prq pas",
        "ok",
        "si",
        "vas y"
      ],
      "answers": [
        "Quelle ville voulez-vous?"
      ],
      "nextActions": ["fixing-city-action"],
      "previousActions" : ["operation-action", "catalogue-building-operation-action", "catalogue-sell-building-action"],
      "hasParam": "0"
    },

    {
      "action": "fixing-city-action",
      "keywords": [
        "#city|city#"
      ],
      "answers": [
        "D'accord. Peut-être voulez-vous choisir également un quartier. Si oui, lequel?"
      ],
      "nextActions": ["fixing-neighborhood-action", "refuse-neighborhood-action"],
      "previousActions" : ["accept-city-action"],
      "hasParam": "1"
    },

    {
      "action": "fixing-neighborhood-action",
      "keywords": [
        "#neighborhood|neighborhood#"
      ],
      "answers": [
        "C'est noté. Voulez-vous fixer la fourchette des prix ?"
      ],
      "nextActions": ["accept-fixing-price-action", "refuse-fixing-price-action", "fixing-price-action"],
      "previousActions" : ["fixing-city-action", "type-building-v2-action"],
      "hasParam": "1"
    },

    {
      "action": "price-action",
      "keywords": [
        "puis je avoir une idée concernant les prix",
        "pouvez vous me donner une idée sur vos prix",
        "meilleurs prix",
        "vos prix"
      ],
      "answers": [
        "Par quel type de logement êtes-vous intéressé ?"
      ],
      "nextActions": ["type-building-action"],
      "previousActions" : [],
      "hasParam": "0"
    },



    {
      "action": "test-action",
      "keywords": ["test"],
      "answers": [
        "att"
      ],
      "nextActions": [],
      "previousActions" : [],
      "hasParam": "0"
    },

    {
      "action": "unknown-action",
      "keywords": [],
      "answers": [
        "Mafhamtch mzyan klamek, momkin tawdi7?",
        "Sma7liya ola sma7iliya, mafhamtch mzyan. Momkin tawdi7?",
        "Mab9itch mtab3ak mzyan. Momkin twada7 ola twad7i ktar?"
      ],
      "nextActions": [],
      "previousActions" : [],
      "hasParam": "0"
    }

  ]
}
