
const PasswordManager = (() => {
  const pools = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    digits: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{};:,.<>?" 
  };

  //хелперы
  const pick = str => str[Math.floor(Math.random() * str.length)];
  const strToBytes = s => Uint8Array.from([...s].map(c => c.charCodeAt(0))); //превращаем строку в массив байтов
  const bytesToStr = bytes => String.fromCharCode(...bytes);

  //шифровка простая
  const xor = (text, key) => {
    const data = strToBytes(text);
    const k    = strToBytes(key);
    return bytesToStr(data.map((b, i) => b ^ k[i % k.length])); //если длина ключа меньше текста, используем i % k.length => ключ зацикливается, но лучше использовать web crypto
  };

  const enc = (plain, key) => btoa(xor(plain, key));   // строка в base64 - стандарт кодирования бинарных данных в «печатаемые» символы [A-Za-z0-9+/]
  const dec = (b64,   key) => xor(atob(b64), key);

 //слой хранения
  const loadStore  = () => JSON.parse(localStorage.getItem("pmStore") || "{}"); //браузерное хранилище
  const saveStore  = obj => localStorage.setItem("pmStore", JSON.stringify(obj));

  
  function generate({ length = 12, lower = true, upper = true, digits = true, symbols = true } = {}) {
    let alphabet = "";
    if (lower)   alphabet += pools.lower;
    if (upper)   alphabet += pools.upper;
    if (digits)  alphabet += pools.digits;
    if (symbols) alphabet += pools.symbols;
    if (!alphabet) throw new Error("No character sets selected");

    let pwd = "";
    for (let i = 0; i < length; i++) pwd += pick(alphabet);
    return pwd;
  }

  function save(label, password, masterKey) {
    const store = loadStore();
    store[label] = enc(password, masterKey);
    saveStore(store);
  }

  //читает Store, дешифрует строку, возвращает пароль
  function retrieve(label, masterKey) {
    const store = loadStore();
    if (!(label in store)) throw new Error("Label not found");
    return dec(store[label], masterKey);
  }

  function list() {
    return Object.keys(loadStore());
  }

  function remove(label) {
    const store = loadStore();
    delete store[label];
    saveStore(store);
  }

  //import/export
  function exportVault() {
    return JSON.stringify(loadStore());
  }
  function importVault(json) {
    saveStore(JSON.parse(json));
  }



  return { generate, save, retrieve, list, remove, export: exportVault, import: importVault };
})();
