import { validator } from '@ioc:Adonis/Core/Validator'

/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
validator.rule('isCPFCNPJ', (value, _, options) => {
  let valid: boolean = false
  let documentId: string[] = []

  if (typeof value === 'string') {
    value = value.replace(/[^\d]+/g, '')

    if (value.length === 11) {
      if (!value.match(/(\d)\1{10}/)) {
        documentId = value.split('')

        const validator = documentId
          .filter((digit: any, index: number, array: any) => index >= array.length - 2 && digit)
          .map((el: any) => +el)

        const toValidate = (pop: number) =>
          documentId
            .filter(
              (digit: any, index: number, array: string | any[]) =>
                index < array.length - pop && digit
            )
            .map((el: string | number) => +el)

        const rest = (count: number, pop: number) =>
          ((toValidate(pop).reduce(
            (soma: number, el: number, i: number) => soma + el * (count - i),
            0
          ) *
            10) %
            11) %
          10

        valid = !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1])
      }
    } else if (value.length === 14) {
      if (!value.match(/(\d)\1{13}/)) {
        documentId = value.split('')

        let totalLength = documentId.length - 2
        let cutVerificationDigit = documentId.slice(0, totalLength)
        let verificationDigit0: number = +documentId.slice(totalLength, undefined)[0]
        let verificationDigit1: number = +documentId.slice(totalLength, undefined)[1]
        let sum = 0
        let pos = totalLength - 7

        for (let i = totalLength; i >= 1; i--) {
          sum += +cutVerificationDigit[totalLength - i] * pos--
          if (pos < 2) pos = 9
        }

        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)

        if (result === verificationDigit0) {
          totalLength = totalLength + 1
          cutVerificationDigit = documentId.slice(0, totalLength)
          sum = 0
          pos = totalLength - 7

          for (let i = totalLength; i >= 1; i--) {
            sum += +cutVerificationDigit[totalLength - i] * pos--
            if (pos < 2) pos = 9
          }

          result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
          if (result === verificationDigit1) {
            valid = true
          }
        }
      }
    }
  }

  if (!valid) {
    options.errorReporter.report(
      options.pointer,
      'isCPFCNPJ',
      'isCPFCNPJ validation failed',
      options.arrayExpressionPointer
    )
  }
})
