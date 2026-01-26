export const getElement = (id) => document.getElementById(id);

export const onClick = (e, handler) => {e.addEventListener("click", handler)};
