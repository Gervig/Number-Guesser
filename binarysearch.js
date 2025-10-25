const values = [21, 22, 23, 25, 27, 28, 29, 31, 32, 34, 35];

function binarySearch(searchfor, values) {
  // console.log(`I gang med at søge efter: ` + searchfor);

  let found = false;

  // finder værdier
  let min = values[0];
  let max = values[values.length - 1];
  let middle = values[Math.floor(values.length / 2)];

  // klar til kode

  // console.log(`Min: ${min}, max: ${max}, middle: ${middle}`);

  // sammenlign middle med searchfor, log større end eller mindre end

  found = middle == searchfor;
  let greaterthan = middle > searchfor;
  let lessthan = middle < searchfor;

  // if (found) console.log(`Middle er lig med searchfor`);
  // if (greaterthan) console.log(`Middle er større end searchfor`);
  // if (lessthan) console.log(`Middle er mindre end searchfor`);

  // sæt nyt min og max hvis searchfor ikke er fundet, endtil found er true eller count er større end values.length
  count = 1;
  while (!found) {
    // checker of search for er i øvre eller nedre halvdel
    greaterthan = middle > searchfor;
    lessthan = middle < searchfor;
    // instantiere upperhalf og lowerhalf
    let upperhalf = [];
    let lowerhalf = [];
    // hvis i nedre halvdel
    if (lessthan) {
      upperhalf = values.slice(values.indexOf(middle), values.indexOf(max) + 1);
      min = upperhalf[0];
      max = upperhalf[upperhalf.length - 1];
      middle = upperhalf[Math.floor(upperhalf.length / 2)];
      found = middle == searchfor;
    }
    // hvis i øvrehalvdel
    if (greaterthan) {
      lowerhalf = values.slice(values.indexOf(min), values.indexOf(middle) + 1);
      min = lowerhalf[0];
      max = lowerhalf[lowerhalf.length - 1];
      middle = lowerhalf[Math.floor(lowerhalf.length / 2)];
      found = middle == searchfor;
    }
    // tæler iterationer op, stopper hvis iterationer er større end values længde
    count++;
    // hvis der er 2 tal tilbage i øvre eller nedre del, så sættes middle til index 0. Ovenover ville den være sat til index 1.
    // så der testes for begge index
    if (upperhalf.length == 2 || lowerhalf.length == 2) {
      greaterthan ? (middle = lowerhalf[0]) : (middle = upperhalf[0]);
      found = middle == searchfor;
    }
    if (count > values.length) {
      console.log(`while loop kunne ikke finde searchfor!`);
      break;
    }
  }

  if (!found) return -1;
  if (found) return values.indexOf(middle);
}

let result = binarySearch(34, values);
console.log(`result for 34 in values: ${result}`);

let data = [];
for (let i = 1; i <= 100; i++) {
  data[i - 1] = i;
}

console.log(data);

result = binarySearch(50, data);
console.log(`result for 50 in data: ${result}`);

result = binarySearch(25, data);
console.log(`result for 25 in data: ${result}`);

result = binarySearch(75, data);
console.log(`result for 75 in data: ${result}`);

result = binarySearch(12, data);
console.log(`result for 12 in data: ${result}`);

result = binarySearch(18, data);
console.log(`result for 18 in data: ${result}`);

result = binarySearch(15, data);
console.log(`result for 15 in data: ${result}`);

result = binarySearch(3, data);
console.log(`result for 3 in data: ${result}`);

//TODO: binarysearch kan ikke finde searchfor ved index 0
result = binarySearch(1, data); // kan ikke finde den!
console.log(`result for 1 in data: ${result}`);

result = binarySearch(2, data);
console.log(`result for 2 in data: ${result}`);
