const openOrClose = (e) => {
  console.log(e);
  const elem = e.target;
  elem.dataset.state = elem.dataset.state == "close" ? "open" : "close";
};
