(() => {
  // src/constants.ts
  var UNKNOWN_ERROR = "unknown_error";
  var JSONQL_ERRORS_INFO = "__PLACEHOLDER__";

  // src/base/406-error.ts
  var Jsonql406Error = class extends Error {
    constructor(...args) {
      super(...args);
      this.message = args[0];
      this.detail = args[1];
      this.className = Jsonql406Error.name;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, Jsonql406Error);
      }
    }
    static get statusCode() {
      return void 0;
    }
  };

  // src/base/500-error.ts
  var Jsonql500Error = class extends Error {
    constructor(...args) {
      super(...args);
      this.message = args[0];
      this.detail = args[1];
      this.className = Jsonql500Error.name;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, Jsonql500Error);
      }
    }
    static get statusCode() {
      return void 0;
    }
  };

  // src/base/forbidden-error.ts
  var JsonqlForbiddenError = class extends Error {
    constructor(...args) {
      super(...args);
      this.message = args[0];
      this.detail = args[1];
      this.className = JsonqlForbiddenError.name;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, JsonqlForbiddenError);
      }
    }
    static get statusCode() {
      return void 0;
    }
  };

  // src/base/authorisation-error.ts
  var JsonqlAuthorisationError = class extends Error {
    constructor(...args) {
      super(...args);
      this.message = args[0];
      this.detail = args[1];
      this.className = JsonqlAuthorisationError.name;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, JsonqlAuthorisationError);
      }
    }
    static get statusCode() {
      return void 0;
    }
  };

  // src/base/contract-auth-error.ts
  var JsonqlContractAuthError = class extends Error {
    constructor(...args) {
      super(...args);
      this.message = args[0];
      this.detail = args[1];
      this.className = JsonqlContractAuthError.name;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, JsonqlContractAuthError);
      }
    }
    static get statusCode() {
      return void 0;
    }
  };

  // src/base/resolver-app-error.ts
  var JsonqlResolverAppError = class extends Error {
    constructor(...args) {
      super(...args);
      this.message = args[0];
      this.detail = args[1];
      this.className = JsonqlResolverAppError.name;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, JsonqlResolverAppError);
      }
    }
    static get statusCode() {
      return void 0;
    }
  };

  // src/base/resolver-not-found-error.ts
  var JsonqlResolverNotFoundError = class extends Error {
    constructor(...args) {
      super(...args);
      this.message = args[0];
      this.detail = args[1];
      this.className = JsonqlResolverNotFoundError.name;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, JsonqlResolverNotFoundError);
      }
    }
    static get statusCode() {
      return void 0;
    }
  };

  // src/base/enum-error.ts
  var JsonqlEnumError = class extends Error {
    constructor(...args) {
      super(...args);
      this.message = args[0];
      this.detail = args[1];
      this.className = JsonqlEnumError.name;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, JsonqlEnumError);
      }
    }
  };

  // src/base/type-error.ts
  var JsonqlTypeError = class extends Error {
    constructor(...args) {
      super(...args);
      this.message = args[0];
      this.detail = args[1];
      this.className = JsonqlTypeError.name;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, JsonqlTypeError);
      }
    }
  };

  // src/base/checker-error.ts
  var JsonqlCheckerError = class extends Error {
    constructor(...args) {
      super(...args);
      this.message = args[0];
      this.detail = args[1];
      this.className = JsonqlCheckerError.name;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, JsonqlCheckerError);
      }
    }
  };

  // src/base/validation-error.ts
  var JsonqlValidationError = class extends Error {
    constructor(...args) {
      super(...args);
      this.message = args[0];
      this.detail = args[1];
      this.className = JsonqlValidationError.name;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, JsonqlValidationError);
      }
    }
  };

  // src/base/error.ts
  var JsonqlError = class extends Error {
    constructor(...args) {
      super(...args);
      this.message = args[0];
      this.detail = args[1];
      this.className = JsonqlError.name;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, JsonqlError);
      }
    }
    static get statusCode() {
      return void 0;
    }
  };

  // src/base/server-error.ts
  var JsonqlServerError = class extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      this.className = JsonqlServerError.name;
    }
    static get statusCode() {
      return void 0;
    }
  };

  // src/base/general-error.ts
  var GeneralError = class extends Error {
    constructor(...args) {
      super(...args);
      this.message = args[0];
      this.detail = args[1];
      this.className = GeneralError.name;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, GeneralError);
      }
    }
  };

  // src/fn/final-catch.ts
  function finalCatch(e) {
    if (Array.isArray(e)) {
      throw new JsonqlValidationError("", e);
    }
    const msg = e.message || void 0;
    const detail = e.detail || e;
    switch (true) {
      case e instanceof Jsonql406Error:
        throw new Jsonql406Error(msg, detail);
      case e instanceof Jsonql500Error:
        throw new Jsonql500Error(msg, detail);
      case e instanceof JsonqlForbiddenError:
        throw new JsonqlForbiddenError(msg, detail);
      case e instanceof JsonqlAuthorisationError:
        throw new JsonqlAuthorisationError(msg, detail);
      case e instanceof JsonqlContractAuthError:
        throw new JsonqlContractAuthError(msg, detail);
      case e instanceof JsonqlResolverAppError:
        throw new JsonqlResolverAppError(msg, detail);
      case e instanceof JsonqlResolverNotFoundError:
        throw new JsonqlResolverNotFoundError(msg, detail);
      case e instanceof JsonqlEnumError:
        throw new JsonqlEnumError(msg, detail);
      case e instanceof JsonqlTypeError:
        throw new JsonqlTypeError(msg, detail);
      case e instanceof JsonqlCheckerError:
        throw new JsonqlCheckerError(msg, detail);
      case e instanceof JsonqlValidationError:
        throw new JsonqlValidationError(msg, detail);
      case e instanceof JsonqlServerError:
        throw new JsonqlServerError(msg, detail);
      default:
        throw new JsonqlError(msg, detail);
    }
  }

  // src/fn/get-error-by-status.ts
  function getErrorByStatus(statusCode, contract = false) {
    switch (statusCode) {
      case void 0:
        return contract ? "JsonqlContractAuthError" : "JsonqlAuthorisationError";
      case void 0:
        return "JsonqlForbiddenError";
      case void 0:
        return "JsonqlResolverNotFoundError";
      case void 0:
        return "Jsonql406Error";
      case void 0:
        return "Jsonql500Error";
      default:
        return "JsonqlError";
    }
  }

  // src/fn/get-error-name-by-instance.ts
  function mapErrToName(errs, e) {
    return errs.filter((err) => e instanceof err).map((err) => err.name);
  }
  function getErrorNameByInstance(errs, e) {
    let error = mapErrToName(errs, e);
    return error.length ? error[0] : UNKNOWN_ERROR;
  }
  function getErrorNameByInstanceWithDefault(errs, e) {
    let name = getErrorNameByInstance(errs, e);
    return name === UNKNOWN_ERROR ? "JsonqlError" : name;
  }
})();
