import * as crypto from "crypto";

export const secretKet = '92Fhneh0Fhfrtkzy2Irjkf3Bvgekmc11'

export function calculateHMAC(data, key) {
    const hmac = crypto.createHmac('sha256', key);
    hmac.update(data, 'utf-8');
    return hmac.digest('hex');
}

