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
      navigation: {
        title: 'Tehtäväalusta',
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
          area: {
            title: 'Pinta-ala',
            info: 'Muunna suluissa olevaan yksikköön. Muista, että pinta-alojen suhdeluku on 100. Kerro lukua 100:lla, mikäli muunnat pienempään yksikköön. Jaa lukua 100:lla, mikäli muunnat suurempaan yksikköön.',
          },
          volume: {
            title: 'Tilavuus',
            info: 'Muunna suluissa olevaan yksikköön. Muista, että tilavuuksien suhdeluku on 1000. Kerro lukua 1000:lla, mikäli muunnat pienempään yksikköön. Jaa lukua 1000:lla, mikäli muunnat suurempaan yksikköön.',
          },
          common: {
            checkAnswer: 'Tarkista vastaus',
            correctAnswer: 'Oikein!',
            wrongAnswer: 'Väärä vastaus, yritä uudelleen!',
            wrongFormat:
              'Tarkista, että olet kirjoittanut vastauksesi oikein. Vain numerot hyväksytään!',
          },
        },
      },
    },
  },
}
