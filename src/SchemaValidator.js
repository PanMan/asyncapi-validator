'use strict'

const Ajv = require('ajv')
const ValidationError = require('./ValidationError')

class SchemaValidator {
  /**
   * @param {Object} schema
   * @param {Object} asyncapiSchema
   * @returns {boolean}
   */
  validate(schema, asyncapiSchema) {
    // validate user defined AsyncApi schema against AsyncApi schema definition
    const ajv = new Ajv({ schemaId: 'auto', allErrors: true })
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'))

    const validate = ajv.compile(asyncapiSchema)
    const valid = validate(schema)

    if (!valid) {
      throw new ValidationError('schema validation failed', null, ajv.errorsText(validate.errors))
    }
    return true
  }
}

module.exports = new SchemaValidator()
