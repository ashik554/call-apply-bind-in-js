const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],

  book(flightNum, name) {
    console.log(
      `${name} booked a ticket on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push(
      `Flight:${this.airline} flight ${this.iataCode}${flightNum}`,
      name
    );
  },
};

lufthansa.book(210, 'Jonas');
lufthansa.book(510, 'Shiju');
console.log(lufthansa);

const eurowings = {
  airline: 'eurowings',
  iataCode: 'EW',
  bookings: [],
};
const swiss = {
  airline: 'swiss airlines',
  iataCode: 'LX',
  bookings: [],
};

// if I want to use book method for this eurowings at first we habe to decclare a variable  for this method and then  ,we have to use call method . this call method calls the book function and then we have to pass eurowings as a  first argument. Here using call method this key word is set to the eurowings.
const book = lufthansa.book;

/// using call method
book.call(eurowings, 210, 'ashik');
console.log(eurowings);

// for lufthansa
book.call(lufthansa, 439, 'Marry cupper');
console.log(lufthansa);
// for swiss
book.call(swiss, 430, 'Marry cupper');
console.log(swiss);
// Apply method is also work like call method but the basic difference is the apply method does not recive the arguments but it receive an array of argments.
const flightData = [583, 'George Copper'];
book.apply(swiss, flightData);
console.log(swiss);
//In morden JS we donot need to use apply method because use call meethod we can do it the following way. In fact using spread operator.
book.call(swiss, ...flightData);
console.log(swiss);

//THE MOST IMPORTANT METHOD IS BIND .This method is also allows manually set the this keyword for any function call.But the difference is that the bind does not immediately call the function instead it returns a new function where the this keyword is bound.
// Using bind method incase of eurowings.

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

// now we just pass the argument with is bookEW function because bind method set the this keyword in this bookEW method.
bookEW(23, 'Steven Williams');

/// in bind method we can also pass arguments  just like call method

// if we can book tickets for different passengers we can use bind method the following way

const bookEW23 = book.bind(eurowings, 23);
// according to our method mentioned above the flight number is now fixed 23 . Now we can also book ticket on 23 number flight only passing name as a argument on bookEW23 function.In this bind method we can specifiy the a part of argument before function call. This is called a partial application.

bookEW23('Jonas');
bookEW23('copper');

// we can also use the bind method in case of addeventListener.For this I sholud see the vedio of jonas.

// with partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
// if we cant to use partial application that means one argument will be pre-defined or fixed for all.
const addVat = addTax.bind(null, 0.23); // 0.23 is rate that is pre-set here.
///addVat =value+value*0.23///    (like this actually we set the addVat function and here null we have to pass null, we can also pass any other value without null. Actually it is kind of convention. Without null of other value the result of the function wiil be NAN.If you want to use this partial application method the order of the argument is very important. The value which we want to fix (in this case rate ) w must be set is as a first argumet in the function.Otherwise it does not work.
console.log(addVat(100));
// we can also use here the concept of function reuturn another function,

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVat2 = addTaxRate(0.23);
console.log(addVat2(100));
