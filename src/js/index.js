'use strict';
import axios from 'axios'
import c3 from 'c3'
import _ from 'lodash'
import url from 'url'

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
        console.log(error)
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

$(() => {
  let accordion = new Foundation.Accordion($('.accordion'))

  // create array of promises
  let promises = new Array(
    document.querySelectorAll('.log-input').length*2
  )

  // on input value change validate url and
  // send request with axios
  $('.log-input').each((i, elem) => {
    $(elem).on('keyup', _.debounce(() => {

      let urlPath = validateInputVal( $(elem).val() )

      if (urlPath) {
        //// update dom to remove notification
        // axios
      }
      else //// update dom with notification

      Promise
        .resolve( )
        .then(axios.get)// http request via axios

      if ( validLogsUrl() ) {
          axios(`http://logs.tf/json${urlPath}`).then()//validate recursively then push into promises arr),
          axios(`http://logs.tf${urlPath}`)// see above
      }
      else {

      }
      /// if valid, send axios requests
      /// .then() validate received data
      /// if not valid, display message
      /// otherwise save to the promises array
    }, 300))
  })

  $('#generate-1').click(() => {
    /// Promise.all(promises)
    /// if all resolutions are null, dont do shit

    /// generate list of players in accordion-2
  })

  // when user click on button generate
  // it unlock and opens next accordion pane
  $('[id^=generate-]').each((i, elem) => {
    $(elem).click(() => {
      $(`#accordion-${i+2}`).removeClass('disabled')
      $('.accordion').foundation('down', $(`#accordion-${i+2} .accordion-content`))
    })
  })

  //$('#accordion-1').html(inputs)

  //$('input[type=text]:nth(0)').focus()

  // on change, move cursor to next input
  //$('input[type=text]').each((i, elem) => {
  //  $(`input[type=text]:nth(${i})`).on('change paste keyup',
  //    () => $(`input[type=text]:nth(${i+1})`).focus().select()
  //  )
  //})

})
