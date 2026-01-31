interface IUser {
    name: string;
    surname?: string;
    age: number;
    height: number;
    weight: number;
}

interface IUserInfo extends IUser {
    job: string;
    salary: number;
    town: string;
    status: string;
    car: string
}

let statuses: "loading" | "success" | "error";
let textType: 'uppercase' | 'lowercase' | 'capitalize';

let user1: IUser = {
    name: 'Timur',
    age: 18,
    height: 176,
    weight: 79
}

let user2: IUser = {
    name: 'John',
    surname: 'Goprans',
    age: 24,
    height: 180,
    weight: 80
}

let userInfo2: IUserInfo = {
    name: 'Nurudin',
    age: 35,
    height: 173,
    weight: 86,
    job: 'loader',
    salary: 1300,
    town: 'Saint-Peterburg',
    status: 'Married',
    car: 'Camry 3.5'
}

let userInfo1: IUserInfo = {
    name: 'Adam',
    age: 18,
    height: 170,
    weight: 60,
    job: 'developer',
    salary: 2000,
    town: 'Makhachkala',
    status: 'No married',
    car: 'None'
}

const result = formatText('hello world!', 'uppercase');
console.log(result);

let textInfo = returnText('qwer', '');
console.log(textInfo);

const users: IUser[] = [
    {
        name: 'Gena',
        age: 13,
        height: 157,
        weight: 78
    },
    {
        name: 'Timur',
        age: 18,
        height: 176,
        weight: 79
    },
    {
        name: 'John',
        surname: 'Goprans',
        age: 24,
        height: 180,
        weight: 80
    }
] 

let filteredAge: IUser[] = users.filter((user) => user.age > 20);

console.log(filteredAge);

function add(number1: number, number2: number): number {
    return number1 + number2;
}
add(20, 30);
add(130, 230);

function formatText(text: string, format: string): string {
    if (format === 'uppercase') {
        return text.toUpperCase();
    } else if (format === 'lowercase') {
        return text.toLowerCase();
    } else if (format === 'capitalize') {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }
    return text;
}

function returnText(text: string, symbol: string): string {
    return text.replaceAll(symbol, "");
}