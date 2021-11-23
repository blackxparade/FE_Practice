/*  Create types for the following functions */

function addTwoNumber(a, b) {
     return a + b;
}

const sum = addTwoNumber(1,2);
const sumOfSum = addTwoNumber(sum, 2);


/* Declare option parameters */
function getName(firstName, lastName) {
    return lastName ? `${firstName} ${lastName}` : firstName ;
}

/* declare object desctructure*/
function isStock({ resourceCategory}) {
    return resourceCategory ===  'stock';
}


function isImpactedStock({ isImpacted, resourceCategory }) {
    if(isImpacted && isStock({ resourceCategory })){
        return true;
    }
    return false;
}








