const notFound = (req, res) =>{
    console.log(req._parsedOriginalUrl)
    res.status(404).send(`path localhost3000${req._parsedOriginalUrl.pathname} does not exist`)
} 

module.exports = notFound
