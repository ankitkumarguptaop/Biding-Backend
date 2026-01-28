class BadRequest extends Error {
  constructor(message) {
    super(message);
  }
}

class NotFound extends Error {
  constructor(message) {
    super(message);
  }
}

class UnAuthorized extends Error {
  constructor(message) {
    super(message);
  }
}

class NoContent extends Error {
  constructor(message) {
    super(message);
    this.name = "NoContent";
  }
}

class ForBidden extends Error {
  constructor(message) {
    super(message);
    this.name = "ForBidden";
  }
}

module.exports = {
  ForBidden,
  NoContent,
  UnAuthorized,
  NotFound,
  BadRequest,
};