"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "soils",
      [
        {
          soil: "Calcari",
          description:
            "Sòl ric en carbonat de calci, sovint blanc i amb bones propietats de retenció d'aigua.",
          effect:
            "Produeix vins elegants amb una acidesa més alta, sovint amb un caràcter mineral.",
        },
        {
          soil: "Granit",
          description: "Sòl rocós format per grans de quars, feldspat i mica.",
          effect:
            "Contribueix a la frescor i la finor dels vins, amb aromes minerals marcades.",
        },
        {
          soil: "Argilós",
          description:
            "Sòl pesat que reté molt bé l'aigua, amb una textura fina i compacta.",
          effect: "Produeix vins més estructurats, amb cos i intensitat.",
        },
        {
          soil: "Llimós",
          description:
            "Sòl amb partícules molt fines, amb bon drenatge però retenció d'aigua moderada.",
          effect: "Produeix vins equilibrats, amb bona acidesa i frescor.",
        },
        {
          soil: "Gravós",
          description: "Sòl amb còdols de grans dimensions, molt ben drenat.",
          effect:
            "Contribueix a la concentració i intensitat del vi, mantenint la frescor.",
        },
        {
          soil: "Pissarra",
          description:
            "Sòl de roca metamòrfica, fosca i laminar, molt present en regions vinícoles.",
          effect:
            "Aporta una mineralitat forta i produeix vins més afruitats i intensos.",
        },
        {
          soil: "Argilo-calcari",
          description:
            "Barreja d'argila i calcària, combinant retenció d'aigua amb mineralitat.",
          effect: "Produeix vins amb bon equilibri entre acidesa i estructura.",
        },
        {
          soil: "Sorrenós",
          description: "Sòl lleuger i molt permeable, amb partícules de sorra.",
          effect:
            "Els vins resultants són més lleugers, amb menys tanins i una frescor suau.",
        },
        {
          soil: "Llicorella",
          description: "Sòl de pissarra trencadissa, típic del Priorat.",
          effect: "Produeix vins amb molta mineralitat, estructura i potència.",
        },
        {
          soil: "Volcànic",
          description:
            "Sòl d'origen volcànic, ric en minerals com ferro i magnesi.",
          effect:
            "Dona als vins una marcada mineralitat i frescor, sovint amb notes especiades.",
        },
        {
          soil: "Basalt",
          description: "Sòl derivat de lava solidificada, ric en minerals.",
          effect:
            "Aporta una mineralitat molt forta i una acidesa equilibrada als vins.",
        },
        {
          soil: "Loess",
          description:
            "Sòl format per sediments fins de quars, molt comú a Alemanya.",
          effect: "Produeix vins amb acidesa equilibrada i aromes delicades.",
        },
        {
          soil: "Marga",
          description:
            "Sòl ric en argila, llim i calci, amb bones propietats de retenció d'aigua.",
          effect:
            "Vins amb bon equilibri entre acidesa i tanins, sovint elegants i ben estructurats.",
        },
        {
          soil: "Terra Roja",
          description:
            "Sòl argilós de color vermell intens, ric en òxids de ferro.",
          effect:
            "Produeix vins estructurats amb intensitat de sabor i caràcter fort.",
        },
        {
          soil: "Argila Blava",
          description:
            "Sòl argilós, compacte i ric en minerals, que reté molta aigua.",
          effect: "Produeix vins amb molt cos, estructura i tanins potents.",
        },
        {
          soil: "Kimmeridgià",
          description:
            "Sòl calcari marí, ric en fòssils, típic de la regió de Chablis.",
          effect:
            "Produeix vins amb una acidesa vibrant i una mineralitat molt marcada.",
        },
        {
          soil: "Galets",
          description: "Grans còdols presents en el sòl, típics del Rhône.",
          effect:
            "Ajuda a conservar la calor, donant vins amb maduresa i potència.",
        },
        {
          soil: "Al·luvial",
          description:
            "Sòl format per sediments portats pels rius, amb bona fertilitat.",
          effect: "Produeix vins frescos i equilibrats, amb aromes fruitoses.",
        },
        {
          soil: "Calcarenita",
          description: "Sòl calcari d'origen marí amb sorra i fòssils.",
          effect:
            "Aporta frescor i elegància als vins, amb bona acidesa i complexitat.",
        },
        {
          soil: "Terra Franca",
          description:
            "Sòl equilibrat amb proporcions iguals de sorra, llim i argila.",
          effect:
            "Produeix vins ben equilibrats amb bona estructura i frescor.",
        },
        {
          soil: "Terra Negreta",
          description:
            "Sòl volcànic de color fosc, típic de les illes Canàries.",
          effect: "Produeix vins amb molta intensitat i caràcter mineral.",
        },
        {
          soil: "Toba Calcària",
          description: "Sòl calcari porós, amb gran capacitat de drenatge.",
          effect: "Produeix vins elegants, amb acidesa alta i aromes florals.",
        },
        {
          soil: "Silex",
          description: "Sòl ric en sílex, molt comú a la vall del Loira.",
          effect:
            "Aporta als vins una mineralitat afilada i una acidesa vibrant.",
        },
        {
          soil: "Llim",
          description:
            "Sòl amb una textura suau, format per partícules fines de roca descomposta.",
          effect: "Produeix vins equilibrats i amb una acidesa moderada.",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("soils", null, {});
  },
};
