import Vue from 'vue'

Vue.filter('date', (timestamp) => {
  if (timestamp) {
    return moment.unix(timestamp).format('M/D/YY HH:mm')
  } else {
    return ''
  }
})

Vue.filter('blogDate', (timestamp) => {
  if (timestamp) {
    return moment.unix(timestamp).format('M/D/YY')
  } else {
    return ''
  }
})

Vue.filter('hasVideo', (str) => {
  if (str) {
    return 'Yes'
  } else {
    return 'No'
  }
})

Vue.filter('hasLink', (str) => {
  if (str) {
    return 'Link'
  } else {
    return ''
  }
})

Vue.filter('capitalize', (str) => {
  let FL = str.substring(0, 1)
  let capitalizedFL = FL.toUpperCase()
  return capitalizedFL + str.substring(1)
})

Vue.filter('uppercase', (str) => {
  return str.toUpperCase()
})