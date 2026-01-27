// В этом файле ты делаешь все, где у тебя fetch (запросы)

// Пишу через async await потому что мне так удобней.
// url в файле явно не указан, тк эта функция не должжна про такое знать
export async function getUsers(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
