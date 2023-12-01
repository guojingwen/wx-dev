import Koa from 'koa';
import sha1 from 'sha1';

const app = new Koa();

const config = {
    token: 'wx-dev',
    appID: 'wx71a4ef0889d6ef46',
    appsecret: 'dba63edf28fb758d6ea829042bbed2f0'
}
app.use(async ctx => {
    console.log(ctx.query)
    if(ctx.method === 'GET') {
        const {signature, echostr, timestamp, nonce} = ctx.query
        const {token} = config
        const arr = [timestamp, nonce, token];
        const str = arr.join(' ');
        const sha1Str = sha1(str);
        if(sha1Str === signature) {
            ctx.body = echostr;
            return
        }
    }
    ctx.body = '微信公众号开发';
})

app.listen('8000', () => {
    console.log('服务器启动在8000端口上')
})