"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "grapes",
      [
        {
          grape: "Pinot Noir",
          description:
            "Una de les varietats de raïm negre més elegants i difícils de cultivar. Utilitzada especialment a Borgonya i Champagne, produeix vins lleugers, delicats i amb una acidesa marcada, sovint amb aromes de cireres, mores i terra humida.",
        },
        {
          grape: "Chardonnay",
          description:
            "Una de les varietats de raïm blanc més versàtils, que es conrea a tot el món. A Borgonya i Champagne, produeix vins amb una gran capacitat de guarda, amb notes cítriques, florals i, en alguns casos, tocs mantegosos i de vainilla quan es cria en bótes de roure.",
        },
        {
          grape: "Merlot",
          description:
            "Una varietat de raïm negre suau i afruitada, molt utilitzada a Bordeus. Els vins de Merlot són coneguts per la seva textura sedosa i notes de prunes, cireres negres i xocolata, amb una estructura més suau que la del Cabernet Sauvignon.",
        },
        {
          grape: "Cabernet Sauvignon",
          description:
            "Un dels raïms negres més plantats i respectats del món, famós per la seva estructura tànnica i la seva capacitat de guarda. Els vins de Cabernet Sauvignon solen tenir notes de grosella negra, tabac, cuir i espècies, amb una acidesa alta i tanins potents.",
        },
        {
          grape: "Sauvignon Blanc",
          description:
            "Raïm blanc conegut per la seva acidesa alta i els seus aromes de fruites tropicals, herba tallada i aranja. S'utilitza àmpliament a la regió de Bordeus i a altres regions del món, produint vins frescos i vibrants.",
        },
        {
          grape: "Verdejo",
          description:
            "Varietat autòctona de la regió de Rueda, a Espanya. Els vins elaborats amb Verdejo són frescos, amb notes de fruites verdes, herba tallada i un toc amarg al final, que els fa molt refrescants.",
        },
        {
          grape: "Tempranillo",
          description:
            "La varietat de raïm negre més important d'Espanya, especialment a La Rioja i Ribera del Duero. Tempranillo produeix vins amb cos mitjà a ple, amb notes de maduixes, cireres, tabac i espècies, i sovint s'envellix en bótes de roure.",
        },
        {
          grape: "Garnatxa",
          description:
            "Un raïm negre conegut per la seva maduresa alcohòlica i la seva fruitositat intensa. Es troba sovint a Catalunya, especialment al Priorat, produint vins plens de cos, amb notes de gerds, cireres, espècies i herbes mediterrànies.",
        },
        {
          grape: "Carinyena",
          description:
            "Raïm negre cultivat principalment a Catalunya i Priorat, que dona estructura i tanins als vins. Els vins de Carinyena tenen un caràcter robust, amb notes de mora, cirera negra i herbes seques.",
        },
        {
          grape: "Riesling",
          description:
            "Raïm blanc molt valorat, especialment a Alemanya. Els vins de Riesling poden anar des dels secs fins als dolços, amb una acidesa vibrant i aromes florals, de préssec, albercoc i un toc mineral molt característic.",
        },
        {
          grape: "Pinot Meunier",
          description:
            "Varietat de raïm negre que sovint es fa servir a la regió de Champagne per elaborar vins escumosos. Dona vins més afruitats i suaus que el Pinot Noir, sovint amb notes de poma i baies.",
        },
        {
          grape: "Macabeu",
          description:
            "Raïm blanc molt utilitzat a Catalunya per elaborar Cava. Dona vins lleugers, amb notes de poma verda i flors blanques, i una acidesa fresca que el fa ideal per a vins escumosos.",
        },
        {
          grape: "Parellada",
          description:
            "Un altre raïm utilitzat per elaborar Cava. La Parellada dona vins blancs frescos amb una acidesa vibrant i notes florals, sovint complementant altres varietats per crear vins equilibrats.",
        },
        {
          grape: "Xarel·lo",
          description:
            "Raïm autòcton de Catalunya que es fa servir principalment per a la producció de Cava. Dona vins amb bona estructura, acidesa vibrant i aromes cítriques i herbacis, molt apreciats per la seva capacitat de guarda.",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("grapes", null, {});
  },
};
