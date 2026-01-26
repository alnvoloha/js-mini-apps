// function getElement(string) {
// return document.getElementById(string);
// } 
export const getElement = (string) => document.getElementById(string);

export const onClick = (e, handler) => {
    e.addEventListener("click", handler);
}

export const onEnter = (element, handler) => {
  element.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handler();
    }
  });
};