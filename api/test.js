
const HostHelper = require('../helpers/host.helper')
const CityAreaHelper = require('../helpers/cityarea.helper')
// const hostList = require('../assets/jsonfiles/HostList_2018_3_32')
const hostList = require('../assets/jsonfiles/HostList_2018_4_17')
const ConversationHelper = require('../helpers/conversationV2.helper')
const RegistrationHelper = require('../helpers/registration.helper')

const SuccessHelper = require('../helpers/success.helper')
const User = require('../models/User')
const ReportHelper = require('../helpers/report.helper')
const RoleHelper = require('../helpers/role.helper')
const CityArea = require('../models/CityArea')
const _ = require('lodash')
const isValidCoordinates = require('is-valid-coordinates')
const mailing = require('../assets/mail-templates/simple-mails')
const CategoryHelper = require('../helpers/category.helper')
const MainCategory = require('../models/MainCategory')
const SubCategory = require('../models/SubCategory')
const Languages = require('../models/Language')
const SSS = require('../service/ServerSocketService')
const http = require('http')
const request = require('request')

const testFunction = (req, res, next) => {
  console.log(req.files)
  console.log(req.body)
  res.end()
}

const testGetUserConvo = async (req, res, next) => {
  console.log(req.query)
  const { _user } = req.query
  try {
    const datas = await ConversationHelper.__getUserConversationV2(_user, true, 'PRIVATE,GROUP')

    // const datas = await ConversationHelper.__getUserConversation(_user)

    res.send(datas)
  } catch (e) {
    console.log(e)
    res.send(e)
  }

  res.end()
}

const testGegeofromNeo = async (req, res, next) => {
  console.log(req.query)
  const { city } = req.query
  try {
    const datas = await CityAreaHelper.getGeoJson(city)
    res.send(datas)
  } catch (e) {
    console.log(e)
    res.send(e)
  }

  res.end()
}
// dumb f(x)
const htmlAreas = (cityData, index, status) => {
  return `
  ___________________________________________________________________________________________________________________

  #:       ${index + 1}
  status:  ${status}
  City:    ${cityData.cityName}
  Address: ${cityData.display_name}`
}

const geoParse = (hList, res, start) => {
  return Promise.all(hList.map(async (record, index) => {
    const datas = await CityAreaHelper.getGeoJson(record.cityName, record.type === 'test' ? 'county' : 'city')
    if (datas.err) {
        // failed to fetch geoJson
     // failedCount.push({display_name: 'failed in fetching geoJson', cityName: record.cityName}, index, 'failed')

      res.write(htmlAreas({display_name: 'failed in fetching geoJson', cityName: record.cityName}, index + start, 'error'))

      return record
    }

    const area = await CityAreaHelper.create({...datas, ...record})
    if (area.err) {
      res.write(htmlAreas({display_name: 'failed in Saving Record', cityName: record.cityName}, index + start, 'error'))
      return record
    }
   // successCount.push(datas)
    res.write(htmlAreas(datas, index + start, 'success'))
    return null
   // resolve('ff')
  }))
}

const parseReport = (res, data) => {
  res.write('----- report ------')
  res.write(JSON.stringify(data.filter((x, i) => x !== null)))
}

const geoParseGeometries = async (req, res, next) => {
  return false // must not used: its ver dengerous
  try {
    // let successCount = [], failedCount = []
      // loop must not spam cause https://nominatim.openstreetmap.org will ban request

    const hList = hostList.hostList

    const batch1 = await geoParse(hList.slice(0, 100), res, 0)
    const batch2 = await geoParse(hList.slice(101, 200), res, 101)
    const batch3 = await geoParse(hList.slice(201, 300), res, 201)
    const batch4 = await geoParse(hList.slice(301, 400), res, 301)

    parseReport(res, [...batch1, ...batch2, ...batch3, ...batch4])

    // await Promise.all(hostList.hostList.slice(201, 400).map(async (record, index) => {
    //   const datas = await CityAreaHelper.getGeoJson(record.cityName)
    //   if (datas.err) {
    //       // failed to fetch geoJson
    //    // failedCount.push({display_name: 'failed in fetching geoJson', cityName: record.cityName}, index, 'failed')
    //     return res.write(htmlAreas({display_name: 'failed in fetching geoJson', cityName: record.cityName}, index, 'error'))
    //   }

    //   // const area = await CityAreaHelper.create({...datas, ...record})
    //   // if (area.err) {
    //   //   return res.write(htmlAreas({display_name: 'failed in Saving Record', cityName: record.cityName}, index))
    //   // }
    //  // successCount.push(datas)
    //   return res.write(htmlAreas(datas, index, 'success'))
    //  // resolve('ff')
    // }))
  } catch (e) {
    console.log(e)
    res.send(e)
  }
  res.end()
}

// checking host list there is something wrong going on here
// user 5a7b485a039e2860cf9dd19a vanish sudenly

const getHostList = async (req, res, next) => {
  try {
    // find base on coordinate
   //  const area = await CityAreaHelper.searchNear({lat, lng})
    const data = await HostHelper.getHosts()

    if (data.err) {
      res.send(data.err)
      console.log(data.err)
      return res.end()
    }
    res.send(data.hosts)
    console.log(data.hosts)
    res.end()
    return true
  } catch (e) {
    console.log(e)
    res.end()
  }
}

const testGeo = async (req, res, next) => {
  console.log(req.query)
  const [lat, lng] = req.query.latlong.split(',')
  try {
    // find base on coordinate
   //  const area = await CityAreaHelper.searchNear({lat, lng})
   // const area = await CityAreaHelper.searchIntersect({lat, lng})

    if (area.err) {
      res.send(area.err)
      console.log(area.err)
      return res.end()
    }
    res.send(area.area)
    console.log(area.area)
    res.end()
    return true
  } catch (e) {
    console.log(e)
    res.end()
  }
}

const host = async (req, res, next) => {
  console.log(req.query)
  const [lat, lng] = req.query.latlng.split(',')
  try {
    // find base on coordinate
   //  const area = await CityAreaHelper.searchNear({lat, lng})
    const area = await HostHelper.getHostByCoordinates({lat, lng})

    if (area.err) {
      res.send(area.err)
      return res.end()
    }
   // res.send('City: ' + area.area.cityName)
    res.send(area)
    console.log(area.area)
    res.end()
    return true
  } catch (e) {
    console.log(e)
    res.end()
  }
}

/**
  //   console.log(req.query)
  //   const [lat, lng] = req.query.latlong.split(',')

  //   console.log(lat, lng)
  //   CityArea.findOne({
  //     geometries: {$geoIntersects: {
  //       $geometry: {
  //         type: 'Point',
  //       //  coordinates: [14.55459465, 121.021407905201]
  //         coordinates: [lng, lat] // makati
  //        // coordinates: [121.08897208098142, 14.56823597999714] // pasig
  //       //  coordinates: [121.09352110747068, 14.561590189774423] // pasig
  //         // crs: {
  //         //   type: 'name',
  //         //   properties: { name: 'urn:x-mongodb:crs:strictwinding:EPSG:4326' }
  //         // }
  //       }
  //     }}
  //   }
  // // geometries: false
  //     , {}, (err, place) => {
  //       const poly = place.geometries.map((geo, ig) => {
  //         return geo.coordinates.map((division, i) => {
  //           return division.map((aRea, ia) => {
  //             return aRea.map((siDe, iD) => {
  //               return {lat: siDe[1], lng: siDe[0]}
  //             })
  //           })
  //         })
  //       })

  //       res.send(poly)

  //       console.log(place)
  //       if (err) {
  //       //  res.send(err)
  //     //    console.log(err)
  //         return res.end()
  //       }
  //     //  res.send(place)
  //     //  console.log(place)
  //       res.end()
  //     })

  // res.send('<h1>tst</H1>')

 *
 */
const TestInsert = async (req, res, next) => {
  try {
    const area = await CityAreaHelper.create({
      hostname: 'Gemeente Den Haag',
      name: 'Den Haag ',
      city: '\'s-Gravenhage',
      centralPoint: {
        longitude: 4.26968022053645,
        latitude: 52.07494555
      },
      geometries: {
        'type': 'MultiPolygon',
        'coordinates': [
          [0, 0]
        ]
      }

    })

    if (area.err) {
      res.send(area.err)
      console.log(area.err)
      res.end()
      return true
    }

    res.send(area.area)
    res.end()
  } catch (e) {
    console.log(e)
  }
}

const hostUser = async function (req, res, next) {
  try {
    const roleHost = '5a75c9de3a06a627a7e8af45'
    const host = await User.find({_role: roleHost}, {hostName: true, city: true})

    SuccessHelper.success(res, host)
  } catch (e) {
    console.log(e.message)
  }
}

const timeTest = async function (req, res, next) {
  try {
    res.send({createdAt: new Date(Date.now())})
  } catch (e) {
    console.log(e.message)
  }
}

const getJsonAddress = async function (req, res, next) {
  try {
    const address = req.body.address || req.query.address
    const host = await CityAreaHelper.getHostNameByAddress(address)

    SuccessHelper.success(res, host)
  } catch (e) {
    console.log(e.message)
  }
}

const mailtest = async function (req, res, next) {
  try {
    let data = {value: 'none'}
    if (req.params.type === 'sendReportAToHost') {
      data = mailing.sendReportAToHost('username', 'teamName', 'teamEmail', 'text', 'category1', 'category2', 'location', 'reportDeepLink', 'en')
    }

    if (req.params.type === 'sendReportANotifToReporter') {
      data = mailing.sendReportANotifToReporter('location', 'date', 'category1', 'category2', 'text', 'en')
    }

    res.send(data)
  } catch (e) {
    console.log(e.message)
  }
}
const getHostIdByCity = async function (req, res, next) {
  try {
    const { language, city } = req.query
    const data = await RegistrationHelper.getHostIdByCity({language, city})

    SuccessHelper.success(res, data)
  } catch (e) {
    console.log(e.message)
  }
}

const getCategories = async function (req, res, next) {
  try {
    const { _id } = req.params
    console.log(_id)
    const main = await MainCategory.find({_host: _id}, ['_id', 'name', 'description', '_reportType', '_host'])
    // get all subcattegories
    const mainIds = main.map(m => m._id)
    const sub = await SubCategory.find({_mainCategory: {$in: mainIds}}, ['_id', 'name', 'description', '_mainCategory'])
    // main
    // _mainCategory
    SuccessHelper.success(res, {main, sub})
  } catch (e) {
    console.log(e.message)
  }
}

const getTranslations = async function (req, res, next) {
  try {
    const data = await Languages.find({}, {_id: false, baseWord: true, translations: true, 'translations.code': true, 'translations.word': true})
    SuccessHelper.success(res, data)
  } catch (e) {
    console.log(e.message)
  }
}

const fcmTest = async function (req, res, next) {
  try {
    var FCM = require('fcm-node')

    var serverKey = 'AAAAWIq665Q:APA91bERF8GwK4Z2RhUPeXvzWaUSMtXkqxFXDPu4GZa7CJFRNvBbLqSEEcxZ9phyGacvevatkiCuIVhl3oJqO51tUNfzrKcgPSrNKS9gcwYORcdKKHvfZTc0wkO-1IWdmzKZbagCdl5R'// put the generated private key path here

    var fcm = new FCM(serverKey)

    var message = { // this may vary according to the message type (single recipient, multicast, topic, et cetera)
      to: 'c_yedigoiwU:APA91bGBzkXNa9YMRfYvbhxzihxKrk0azqiN_cbDu-CLrzxE6HVv_B6ATvGQZYdQT2hhgPsydqG6KraaYSs3Zc1GjBkQ5zmoQkcVOtrMK6fHadExGZenh8u9VVpKPtYuwVNlMMfRwaak',
      // to: 'testgroup',
      collapse_key: 'com.straatmobile',

      notification: {
        title: 'Title of your push notification',
        body: 'Body of your push notification',
        autoCancel: false,
        // largeIcon: 'ic_launcher',
        // smallIcon: 'ic_launcher',
        icon: 'ic_launcher',
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        sound: 'default',
        badge: 1
      },

      data: {  // you can send only notification or only data(or include both)
        test1: 'test1 value',
        test2: 'test2 value'
      }
    }

    fcm.send(message, function (err, response) {
      if (err) {
        console.log('Something has gone wrong!')
      } else {
        console.log('Successfully sent with response: ', response)
      }
    })
    SuccessHelper.success(res, fcm)
  } catch (e) {
    console.log(e.message)
    return SuccessHelper.success(res, e)
  }
}

const socketTest = async function (req, res, next) {
  try {
    const { _id } = req.params

    // const reportModel = ReportHelper.getModel()
    const reportTest = await ReportHelper.getReportByQueryObjectClean({_id: '5b1ad23fead53b00143dbf4b'})
    //  console.log('reportTest', reportTest)
    // const reportTest = await ReportHelper.getReportByQueryObjectClean({_id: '5b1ad23fead53b00143dbf4b'})

    // IO(req, {to:_id, type: 'receive-global-msg', data: { data: {TYPE: 'REPORT', content: reportTest.reports[0]}}})
    SSS.report.creation(req, reportTest.reports[0])
    return SuccessHelper.success(res, 'sended: ' + _id)
  } catch (e) {
    console.log(e.message)
  }
}

const blockTest = async function (req, res, next) {
  try {
    // const { _id } = req.params
    const reporter = await User.findById('5b30a0087549730014268476')
    if (reporter) {
      SSS.userSetting.blockUser(req, reporter)
    }
    return SuccessHelper.success(res, reporter)
  } catch (e) {
    console.log(e.message)
  }
}

module.exports = {
  testFunction,
  testGeo,
  TestInsert,
  testGegeofromNeo,
  geoParseGeometries,
  host,                    // get host data test
  getHostList,
  testGetUserConvo,
  hostUser,
  timeTest,
  mailtest,
  getJsonAddress,
  getHostIdByCity,
  getCategories,
  getTranslations,
  fcmTest,
  socketTest,
  blockTest
}
