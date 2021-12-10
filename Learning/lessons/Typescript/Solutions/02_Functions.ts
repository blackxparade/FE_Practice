/*  Create types for the following functions */
import { Asset } from './01_Types';

function addTwoNumber(a: number, b: number) {
    return a + b;
}

const sum = addTwoNumber(1,2);
const sumOfSum = addTwoNumber(sum, 2);


/* Declare option parameters */
function getName(firstName: string, lastName?: string) {
   return lastName ? `${firstName} ${lastName}` : firstName ;
}

/* declare object desctructure*/
function isStock({ resourceCategory }: { resourceCategory: 'stock' | 'asset'}) {
   return resourceCategory ===  'stock';
}


function isImpactedStock({ status, resourceCategory }: Asset) {
   if(status && isStock({ resourceCategory })){
       return true;
   }
   return false;
}








