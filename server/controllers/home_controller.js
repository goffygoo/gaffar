export default function (io) {
  const home = function (req, res) {
    res.send("Router is Working");
  };

  return { home };
}
