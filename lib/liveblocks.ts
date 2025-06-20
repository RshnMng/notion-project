import { Liveblocks } from '@liveblocks/node'



export function getLiveBlocks() {
const key = process.env.LIVEBLOCKS_PRIVATE_KEY;

console.log(key, 'this is liveblocks private key');

if(!key) {
    throw new Error('liveblocks private key not set');
}

return  new Liveblocks({
    secret: key,
});

}



export default { getLiveBlocks };