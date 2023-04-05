const {isMainThread,Worker,workerData}= require('worker_threads')
// 这次三个的process.pid都是一样的
// 这个方法好像有争议
// 算了算了
if(isMainThread){
    console.log(`${process.pid} is master`)
    new Worker(__filename,{
        workerData:[7,6,2,3]
    })
    new Worker(__filename,{
        workerData:[1,3,4,3]
    })
}else {
    console.log(`${process.pid} is worker`)
    console.log(`${workerData} sorted is ${workerData.sort()}`)
    console.log('Worker process started')
}