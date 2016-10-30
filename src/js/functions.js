'use strict';

const validateInputVal = inputVal => {
  if ( !inputVal || /\s+/g.test( inputVal ) ) return null

  let parsedUrl, hostUrl, urlPath

  // remove url hash
  inputVal.replace( /#\d+$/g, '' )

  // add slash
  if ( /^\d{5,}$/g.test(inputVal) ) inputVal = `/${inputVal}`

  if ( /^\/?\d{5,}$/g.test(inputVal) ) return inputVal

  // for url module to be able to parse inputVal
  inputVal.startsWith('http://') ? null : inputVal = `http://${inputVal}`

  parsedUrl = url.parse(inputVal)
  hostUrl = parsedUrl.host
  urlPath = parsedUrl.path

  if (hostUrl === 'logs.tf' && urlPath.match(/^\/\d{5,}$/g)) return urlPath
  else return false
}

const tryParseJson = (json, reviver) => {
    try {
      return JSON.parse(json, reviver)
    } catch(error){
      //console.log(error)
    }
}

const getJson = (urlPath, depth) => {
  depth = depth || 1
  axios
    .get(`http://logs.tf/json${urlPath}`)
    .catch(console.log)
    .then(res => {
      if ( tryParseJson(res.data) ) return res.data
      else if ( $(res.data).find('.log-section > h3').html() === 'Something went wrong' ) {
        setTimeout(depth => {
          if (depth !== 20) {
            depth++
            getJson(urlPath, depth)
          }
        }, 10)
      }
      else throw new Error('something went horribly wrong')
    })
    .catch(console.log)
}

const dryGet = (urlPath, depth) => {
  depth = depth || 1
  //let returnVal = new Promise()
  return axios
    .get(`http://logs.tf${urlPath}`)
    .then(res => {
      if ( tryParseJson(res.data) ) return res.data
      else if ( $(res.data).find('.log-section > h3').html() === 'Something went wrong' ) {
        return new Promise ((resolve, reject) => {
          setTimeout(depth => {
            if (depth <= 20) getJson(urlPath, ++depth).then(resolve)
            else reject('recursion is going deep')
          }, 10)
        })
      }
      else if ( $(res.data).length ) {
        let map = $(res.data).find('#log-map').html()
        let time = $(res.data).find('.datefield').attr('data-timestamp') + '000'

        return { urlPath, time, map }
      }
      else throw new Error('something went horribly, horribly wrong')
    })
    //.catch(console.log)

}