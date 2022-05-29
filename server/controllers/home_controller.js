export default function (io) {
  const home = function (req, res) {
    console.log("home reached");
    res.send("Router is Working");
  };

  return { home };
}
