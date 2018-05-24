
/**
 *
 *
 * @description
 * @param {[teamLeaders]}
 * @return array
 *
 */
const getTeamLeadersId = function (teamLeaders) {
  return teamLeaders.map(function (teamLeader, index) {
    // console.log('teamLeader._id', typeof (teamLeader._id))
    return teamLeader._id.toString()
  })
}

const contains = function (array, item) {
  // bagal pag anony ang gagamitn sa array.find()
  for (var i = array.length - 1; i >= 0; i--) {
    if (array[i] === item) {
      return true
    }
  }
  return false
}

const intersection = function (ar1, ar2) {
  // let result = []
  return ar1.filter(function (item, index) {
    if (contains(ar2, item.toString()) > 0) {
      return true
    }
    return false
  })
}

const getEmail = function ({model, data, isArray}) {
  // console.log('getEmail', data)
  if (model === 'teamLeaders' && isArray) {
    return data.map(tl => {
      if (tl && tl._user && tl._user.email) {
        return tl._user.email
      }
      return null
    }).filter(email => !!email)
  }
  return []
}

module.exports = {
  getTeamLeadersId,
  intersection,
  getEmail
}
