function normalFunction(i,t) {
    console.log('Normal function started',i);
    const date = new Date().valueOf()
    while(new Date().valueOf() - date < t) {

    }
    console.log('Normal function ended',i);
}

async function asyncFunction(i,t) {
    console.log('Async function started',i);
    await normalFunction(i,t);
    console.log('Async function resumed after normal function',i);
}

asyncFunction(1,20000);
asyncFunction(2,20000);
console.log('Main thread continues');
