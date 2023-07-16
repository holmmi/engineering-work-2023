type UnitDetails = {
  name: string
  ratio: number
  units: string[]
}

export type UnitName = 'length' | 'area' | 'volume'

const units: Record<UnitName, UnitDetails> = Object.freeze({
  length: {
    name: 'Length',
    ratio: 10,
    units: ['km', 'hm', 'dam', 'm', 'dm', 'cm', 'mm'],
  },
  area: {
    name: 'Area',
    ratio: 100,
    units: ['km^2', 'ha', 'a', 'm^2', 'dm^2', 'cm^2', 'mm^2'],
  },
  volume: {
    name: 'Volume',
    ratio: 1000,
    units: ['km^3', 'hm^3', 'dam^3', 'm^3', 'dm^3', 'cm^3', 'mm^3'],
  },
})

export type UnitConversion = {
  unitName: UnitName
  fromUnit: string
  toUnit: string
  valueToConvert: number
}

const getRandomBetween = (min: number, max: number): number =>
  min + Math.floor(Math.random() * (max - min))

const MIN_VALUE = 0
const MAX_VALUE = 999
const MIN_DECIMAL_VALUE = 1
const MAX_DECIMAL_VALUE = 99

const useDecimalPoint = (): boolean => Math.random() > 0.5

export const createUnitConversion = (unitName: UnitName): UnitConversion => {
  let valueToConvert = getRandomBetween(MIN_VALUE, MAX_VALUE)
  if (valueToConvert === 0 || useDecimalPoint()) {
    const tempValue = valueToConvert
    valueToConvert = Number(
      `${tempValue}.${getRandomBetween(MIN_DECIMAL_VALUE, MAX_DECIMAL_VALUE)}`
    )
  }
  const unit = units[unitName]
  const fromUnit = getRandomBetween(0, unit.units.length - 1)
  let toUnit = getRandomBetween(0, unit.units.length - 1)
  if (fromUnit === toUnit) {
    if (fromUnit < unit.units.length - 1) {
      toUnit++
    } else {
      toUnit--
    }
  }
  return {
    unitName,
    fromUnit: unit.units[fromUnit],
    toUnit: unit.units[toUnit],
    valueToConvert,
  }
}

export const isAnswerCorrect = (
  answer: number,
  unitConversion: UnitConversion
): boolean => {
  const fromUnit = units[unitConversion.unitName].units.indexOf(
    unitConversion.fromUnit
  )
  const toUnit = units[unitConversion.unitName].units.indexOf(
    unitConversion.toUnit
  )
  const distanceBetweenIndices = fromUnit - toUnit
  const factor = Math.pow(
    units[unitConversion.unitName].ratio,
    distanceBetweenIndices * -1
  )
  let correctAnswer = unitConversion.valueToConvert * factor
  if (!Number.isInteger(correctAnswer)) {
    correctAnswer = parseFloat(correctAnswer.toFixed(10))
  }
  return answer === correctAnswer
}
