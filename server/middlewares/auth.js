function test(req, res, next) {
  console.log("hello form test middleware");
  next();
}

export { test };
