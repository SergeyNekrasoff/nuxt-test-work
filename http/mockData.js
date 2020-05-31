export default function timeoutPromise(interval, data) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(data) && data.length) {
        setTimeout(() => {
          resolve({ 
            data: data, 
            status: 200 
          })
        }, interval)
      } else {
        setTimeout(() => {
          reject({ error: {
            status: 403,
            message: 'Something went wrong...'
          }})
        }, 5000)
      }
    },)
}