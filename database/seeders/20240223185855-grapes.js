"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "grapes",
      [
        {
          grape: "Cabernet Sauvignon",
          description:
            "Varietat de raïm negre coneguda per la seva estructura robusta i la seva capacitat d'envelliment. Sovint presenta notes de grosella negra i pebre.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Merlot",
          description:
            "Varietat de raïm negre que és més suau que el Cabernet Sauvignon, amb sabors de cirera, pruna i xocolata. Ideal per a vins equilibrats.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Pinot Noir",
          description:
            "Varietat de raïm negre delicada que produeix vins elegants i aromàtics amb notes de maduixa, frambuesa i terra.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Syrah/Shiraz",
          description:
            "Varietat de raïm negre que produeix vins rics i especiats, amb sabors de fruita negra, xocolata i notes de pebre.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Chardonnay",
          description:
            "Varietat de raïm blanc que és versàtil i pot produir vins amb una gamma de sabors, des de fruita fresca fins a notes de mantega.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Sauvignon Blanc",
          description:
            "Varietat de raïm blanc coneguda per la seva acidesa alta i aromes herbàcies, sovint amb notes de grosella i cítrics.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Riesling",
          description:
            "Varietat de raïm blanc famosa per la seva dolçor i aromes florals. Pot ser sec o dolç, amb notes de poma i mel.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Tempranillo",
          description:
            "Varietat de raïm negre originària d'Espanya, utilitzada per a vins de Rioja. Té sabors de fruites madures i un caràcter terros.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Malbec",
          description:
            "Varietat de raïm negre famosa a Argentina, coneguda pels seus vins rics i concentrats amb notes de cirera i figues.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Grenache",
          description:
            "Varietat de raïm negre que és fruitera i especiada, sovint utilitzada en vins de mescla, especialment al sud de França.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Zinfandel",
          description:
            "Varietat de raïm negre popular a Califòrnia, coneguda pels seus vins rics i fruiters, amb notes de cirera i especiats.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Cabernet Franc",
          description:
            "Varietat de raïm negre que aporta aromes de fruita i una frescor especial, sovint utilitzada en vins de mescla.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Barbera",
          description:
            "Varietat de raïm negre italiana, coneguda pels seus vins amb una alta acidesa i sabors de fruita vermella.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Moscato",
          description:
            "Varietat de raïm blanc coneguda per la seva dolçor i aromes florals. S'utilitza sovint per a vins espumosos i dolços.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Sangiovese",
          description:
            "Varietat de raïm negre italià, base dels vins Chianti, amb sabors de cirera i una bona acidesa.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Nebbiolo",
          description:
            "Varietat de raïm negre de Piemont, coneguda pels seus vins Barolo i Barbaresco, amb notes de rosa i taronja.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Viognier",
          description:
            "Varietat de raïm blanc que produeix vins amb aromes florals i de fruita de pinyol, sovint utilitzada en vins de mescla.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Chenin Blanc",
          description:
            "Varietat de raïm blanc versàtil, amb una gamma de vins que van des de secs fins a dolços, amb notes de poma i flors.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Tannat",
          description:
            "Varietat de raïm negre que és coneguda pels seus tanins forts, sovint utilitzada en vins de mescla.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Fiano",
          description:
            "Varietat de raïm blanc italiana, coneguda pels seus vins aromàtics amb notes de mel i fruites.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          grape: "Pedro Ximénez",
          description:
            "Varietat de raïm blanc espanyol, famosa pels seus vins dolços amb un alt contingut de sucres.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("grapes", null, {});
  },
};
