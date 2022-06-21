exports.dummyHelper = () => {
  return null;
};

const booleanDecorator = (validations) => {
  return validations;
};

const numberDecorator = (validations) => {
  return validations;
};

const stringDecorator = (validations, input) => {
  // could just create another object
  for (let propName in validations) {
    if (propName.startsWith("is")) {
      delete validations[propName];
    }
  }
  // both of these methods are inclusive
  validations.isAtLeast = (charsLong, error) => {
    if (input.length < charsLong) {
      throw error;
    }
  };
  validations.isAtMost = (charsLong, error) => {
    if (input.length > charsLong) {
      throw error;
    }
  };
  validations.isExactly = (charsLong, error) => {
    if (!(input.length === charsLong)) {
      throw error;
    }
  };
  return validations;
};

exports.validate = (input) => {
  return {
    isRequired(error) {
      // test if something is undefined or null (nullish)
      if (typeof input === "undefined" || input + "" === "null") {
        throw error;
      }
      return this;
    },
    isString(error) {
      if (!(typeof input === "string")) {
        throw error;
      }
      return stringDecorator(this, input);
    },
    isNumber(error) {
      if (!(typeof input === "number")) {
        throw error;
      }
      return numberDecorator(this);
    },
    isBool(error) {
      if (!(typeof input === "boolean")) {
        throw error;
      }
      return booleanDecorator(this);
    },
  };
};
