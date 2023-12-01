import Koa from 'koa';
import sha1 from 'sha1';

const app = new Koa();

const config = {
    token: 'wx-dev', // 来自 接口配置信息
    appID: 'wx71a4ef0889d6ef46',
    appsecret: 'dba63edf28fb758d6ea829042bbed2f0'
}
app.use(async ctx => {
    console.log(ctx.query, ctx.method);
    if(ctx.method === 'GET') {
        // 你可以这样直接返回完成微信验证签名
       /*  if(ctx.query.echostr) {
            ctx.body = ctx.query.echostr;
            return
        } */
        // 但是不建议，因为别人可能冒充微信给你发消息
        // 正确的验证签名如下
        const {signature, echostr, timestamp, nonce} = ctx.query
        const {token} = config
        const arr = [timestamp, nonce, token];
        const sha1Str = sha1(arr.join(''));
        console.log('---', sha1Str, signature)
        if(sha1Str === signature) {
            return ctx.body = echostr;
        }
    }
    ctx.body = '微信公众号开发';
})

app.listen('8000', () => {
    console.log('服务器启动在8000端口上')
})