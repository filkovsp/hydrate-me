export default function randomIntBetween(min, max) {
    return (Math.random() * max | 0) + min;
}

function randomInt(max) {
    return (Math.random() * max | 0);
}

export {randomIntBetween, randomInt};