// function make_withdraw(balance, password) {
    
//     let wrong_tries = 0; // Keep track of consecutive wrong tries here. // Will cause different behaviour if this is placed elsewhere.
//     //if you put it outside make_with, then different accounts share the same count
//     // if you put inside withfral, then evry time you do withdrawl, it start with 0
//     function withdraw(amount, pw) {
//         if (wrong_tries >= 3) {
//             return "Account disabled";
//         } else if (pw !== password) {
//             wrong_tries = wrong_tries + 1; // Increment count when there is a wrong password.
//             return "Wrong password; no withdraw";
//         } else {
//             wrong_tries = 0; // Reset count when a correct password is entered, since question is looking at 3 CONSECUTIVE wrong password entries.
//             if (balance >= amount) {
//                 balance = balance - amount;
//                 return balance;
//             } else {
//                 return "Insufficient funds";
//             }
//         }
//     }
//     return withdraw;
// }

// let commission = 25; // my commission in dollars // return a calculator for total price
// // total price = (commission + cost) * (1 + tax_rate)
// function make_price_calculator(tax_rate) { 
//     function calculator(cost) {
//         return (commission + cost) * (1 + tax_rate); 
//     }
//         return calculator; 
// }
// const calc = make_price_calculator(0.07);
// commission = 125;
// calc(75);

function curry(f) {
return x => y => f(x, y);
}
(curry(math_pow))(3)(4);

//(curry(accumulate))(x)(y)(z)
