 const withCss = require('@zeit/next-css')
// export const withSass = require('@zeit/next-sass')

if(typeof require !== 'undefined'){
    require.extensions['.css','.scss']=file=>{}
}

// module.exports = withSass({
//   /* config options here */
// })

module.exports = withCss({})

// module.exports = {
//   ...withCss,
//   ...withSass
// }