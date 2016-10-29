import axios from 'axios'
import c3 from 'c3'
import _ from 'lodash'
import url from 'url'

function validateInputVal (inputVal) {
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

      let url = validateInputVal( $(elem).val() )

      if (url) {
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