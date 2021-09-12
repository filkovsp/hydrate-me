export default function randomIntBetween(min, max) {
    return (Math.random() * max | 0) + min;
}

export {randomIntBetween};