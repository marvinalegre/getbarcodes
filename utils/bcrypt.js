import bcrypt from "bcryptjs";

export function genSalt(rounds) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(rounds, (err, salt) => {
      if (err) reject(err);
      resolve(salt);
    });
  });
}

export function hashString(str, salt) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(str, salt, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
}

export function compare(str, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(str, hash, function (err, res) {
      if (err) reject(err);
      resolve(res);
    });
  });
}
