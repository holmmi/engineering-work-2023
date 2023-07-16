export type SupportedLanguages = 'fi'

export const resources = {
  fi: {
    translation: {
      paths: {
        frontPage: '/etusivu',
        unitConversion: '/yksikkomuunnokset',
        unitConversionExercise: '/yksikkomuunnokset/:yksikko',
      },
      translatedPaths: {
        unitConversionExercise: {
          length: '/yksikkomuunnokset/pituus',
          area: '/yksikkomuunnokset/pinta-ala',
          volume: '/yksikkomuunnokset/tilavuus',
        },
      },
      drawerItems: {
        frontPage: 'Etusivu',
        unitConversion: 'Yksikkömuunnokset',
      },
      views: {
        unitConversion: {
          title: 'Yksikkömuunnokset',
          length: 'Pituus',
          lengthInformation:
            'Esimerkiksi ihmisen pituus tai lautojen pituus ilmoitetaan pituusyksiköillä, kuten senttimetreinä. Pituusyksiköiden suhdeluku on 10.',
          area: 'Pinta-ala',
          areaInformation:
            'Esimerkiksi asuntojen ja pelikenttien kokoa ilmaistaan pinta-alayksiköillä. Pinta-alayksiköiden suhdeluku on 100 ja yksiöt ovat neliöityjä lukuunottamatta aareja ja hehtaareja.',
          volume: 'Tilavuus',
          volumeInformation:
            'Esimerkiksi uima-altaan suuruusluokkaa voidaan ilmaista tilavuusyksiköillä. Tilavuusyksiköiden suhdeluku on 1000 ja yksiköt ovat kuutioituja.',
          choose: 'Siirry tehtäviin',
        },
        unitConversionExercise: {
          length: {
            title: 'Pituus',
            info: 'Muunna suluissa olevaan yksikköön. Muista, että pituuksien suhdeluku on 10. Kerro lukua 10:llä, mikäli muunnat pienempään yksikköön. Jaa lukua 10:llä, mikäli muunnat suurempaan yksikköön.',
          },
          common: {
            checkAnswer: 'Tarkista vastaus',
            correctAnswer: 'Oikein!',
            wrongAnswer: 'Väärä vastaus, yritä uudelleen!',
          },
        },
      },
    },
  },
}
