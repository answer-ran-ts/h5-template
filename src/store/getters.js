
const getters = {
  // user
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  info: state => state.user.info,
}

export default getters
