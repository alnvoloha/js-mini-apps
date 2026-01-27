import { getUsers } from './api.js'
import './render.js'
import { renderUsers } from './render.js'

const USERS_URL = "https://jsonplaceholder.typicode.com/users"

getUsers(USERS_URL).then((users) => {renderUsers(users)})