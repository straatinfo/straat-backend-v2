
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

module.exports = {
  getTeamLeadersId,
  intersection
}
