const x = list(1,2,3,4,5,6);


// Understanding map
display("What is the result of map?");
display(map(x => 0, x));


// Understanding what accumulate does
display("What is the result of accumulate?");
display(accumulate((x, y) => pair(x, y), null, x));
//Think about what is "x" and what is "y"

const xs = list(1,2,3,4,5);
const sx = map(x => stringify(x), xs); //display
// display_list(sx);


accumulate((x , y) => {
    display("x here is:");
    display(x);
    display("y here is:");
    display(y);
    display(x + y, "Result of this iteration is:");
    return x + y;
}, "", sx);


// understanding filter
display("What is the result of filter?");
display(filter(x => x % 2 === 0, x));


const x2 = list(7,8,9,10);
// understanding append
display("");
display("Understanding append: ");
display(append(x, x2));


// understanding member
display("");
display("Understanding member: ");
display(member(3, x)); // gives a sub-list starting with 3
display(member(3, x2)); // gives null since 3 is not within x2

// How do we use this to check if an element exist in a list?


const x3 = list(1,2,3,4,5,6);
const x5 = list(list(1), list(4));
const x6 = list(list(1), list(4));
const three = 3;
// understanding equal
equal(3, three); // true
equal(x, x3); // true
equal(x, x2); // false
equal(x5, x6); // true


// understanding remove
display("Understanding remove: Look at the output");
const xxs = list(3,3,3,3,4,4,4,4,5);
display(remove(3, xxs));
display(remove(4, xxs));