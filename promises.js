((c)=>{
    const cuadrado = value =>{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve({value: value, result: value*value})
            }, Math.random()*100)
        })
    }

    cuadrado(2)
        .then(obj=>{
            c("Iniciando promesa")
            c(`Promise: ${obj.value}, ${obj.result}`)
            return cuadrado(4)
        })
        .then(obj=>{
            c(`Promise: ${obj.value}, ${obj.result}`)
        })
        .catch(error=>c(error))
})(console.log)