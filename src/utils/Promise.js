const PromiseAsync = promise => {
  return promise
    .then(data => Array(null, data))
    .catch(err => Array(err, null))
}

export default PromiseAsync;