import axios from 'axios'
import c3 from 'c3'
import _ from 'lodash'
import url from 'url'

const validate = {
  logHtml: () => {

  },
  logJson: () => {

  }
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

      let reqUrl = $(elem).val()

      // for url module to be ablt to parse reqUrl
      reqUrl.startsWith('http://') ? null : reqUrl = 'http://' + reqUrl

      let parsedUrl = url.parse(reqUrl),
          hostUrl = parsedUrl.host,
          urlPath = parsedUrl.path
      
      function validLogsUrl() {
        return new Promise ((resolve reject) => {
          if ( reqUrl.match(/\s+/g)) resolve(null)
          else if (hostUrl === 'logs.tf' && urlPath.match(/^\/\d{5,}$/g) {
            resolve() /// what do i resolve
          }
          else /// if some random string or url


        })
      }
      
      if ( validLogsUrl() ) {
          axios(`http://logs.tf/json${urlPath}`).then(//validate recursively then push into promises arr),
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