import { atom } from "recoil";

const countState = atom({
    key: 'counter',
    default: 0,
});

const inputState = atom({
    key: 'input',
    default: 0,
})

export { countState, inputState };