const express = require('express');
console.log(express)
const app = express();
const morgan = require('morgan');

function delay(duration) {
    const startTime = Date.now();
    // 在这里阻塞
    while (Date.now() - startTime < duration) {
        // do nothing
    }
}

app.use(morgan('combined'));

app.get('/', (req, res) => {
    // 阻塞的real life example
    // JSON.stringify({})=>{}
    // JSON.parse({})=>{}

    res.send('performance example');
});


app.get('/timer', (req, res) => {
    // 当我们在这里阻塞的时候
    // 如果正常这么写 两个网页同时加载/timer
    // 会发现第二个网页的请求会被阻塞
    delay(5000);
    //   delay the response
    res.send('timer example');
})

app.listen(3000, () => {
    console.log('server started');
})