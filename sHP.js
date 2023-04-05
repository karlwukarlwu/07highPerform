const express = require('express');
// const morgan = require('morgan');

// 👇这个模块是提高性能的
// 有了pm2 这些可以不要了
// const cluster = require('cluster');
// const os = require('os');


const app = express();

function delay(duration) {
    const startTime = Date.now();
    // 在这里阻塞
    while (Date.now() - startTime < duration) {
    }
}



app.get('/', (req, res) => {
    // process.pid是进程的id
    res.send(`performance example${process.pid}`);
});


app.get('/timer', (req, res) => {
    delay(8000);
    res.send(`timer example${process.pid}`);
})


// 第一版
// console.log("Running in cluster mode")
// 但是实际上nodejs是单线程的
// 这个fork 和master stream 只是
// cluster.isMaster 这个不同
// if(cluster.isMaster) {
//     console.log('Master process started');
//     cluster.fork();
//     cluster.fork();
// }else {
//     console.log(`Worker process started${process.pid}`);
//     app.listen(3000)
// }
// So after the code has been executed,
// there will be three processes in total:
// one master process and two worker processes.

// 主进程走完就不走这个ifelse了
// if you wrap this block of code with a while(true) loop,
// it will continue to create new worker processes endlessly
// until the process is terminated manually or there is some kind of error.

// 第二版优化
// 用os模块来获取cpu的数量
// 这个和load balance 负载均衡有关
// if(cluster.isMaster) {
//     console.log('Master process started');
//     // 拿到cpu的数量
//     const NUM_WORKERS = os.cpus().length;
//     // fork出来的进程数
//     for(let i = 0; i < NUM_WORKERS; i++) {
//         cluster.fork();
//     }
// }else {
//     console.log(`Worker process started${process.pid}`);
//     app.listen(3000)
// }

// 第三版优化 上了pm2
// 用pm2来管理进程
app.listen(3000, () => {
    console.log('server started');
})
//pm2 start 文件名.js -i 2
// -i 是instance
// 2  max是最大的
// 直接terminal写这个就可以了
//pm2 logs 这个可以看log
//pm2 restart  sHP
//             这个是任务的name 输入这个重启
//一些命令行的操作
// pm2 start sHP.js -l logs.txt
// 启动并且把log写到logs.txt里面
//pm2 start sHP.js -l logs.txt -i max加上这个就是max启动
//pm2 show 0
// 这个是查看进程的信息 0是进程的id
// pm2 stop 4
// 单独停止进程 4是进程的id
//pm2 start 4
// 单独启动进程 4是进程的id
//pm2 monitor
// 这个是查看所有进程的信息 有个网页

//想要修改完了不用重启
//pm2 reload sHP
// 这个是重启进程