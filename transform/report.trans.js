
/**
 *
 *
 * @description used for convo title
 * @param {report}
 * @return string
 *
 */
const getReportChatTitle = function (report) {
  const title = report._mainCategory ? report._mainCategory.name || null : null
  return title
}

module.exports = {
  getReportChatTitle
}
