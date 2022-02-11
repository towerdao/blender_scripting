//@ts-ignore
export function weightedRand(spec) {
    //@ts-ignore
    var i, j, table=[];
    for (i in spec) {
      // The constant 10 below should be computed based on the
      // weights in the spec for a correct and optimal table size.
      // E.g. the spec {0:0.999, 1:0.001} will break this impl.
      for (j=0; j<spec[i]*10; j++) {
        table.push(i);
      }
    }
    return function() {
      //@ts-ignore
       return table[Math.floor(Math.random() * table.length)];
    }
  }
  
  //@ts-ignore
  export function mapEntries(obj, mapper) {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, mapper(v)]));
  }
  
  //@ts-ignore
  export function filterEntries(obj, filterer) {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => filterer(v)));
  }
  
  // Decision tree API
  //@ts-ignore
  export const decision = (conditionFunction, trueOutcome, falseOutcome) => (context) => conditionFunction(context) ? trueOutcome : falseOutcome;
  
  //@ts-ignore
  export const decide = (context, decision) => {
      const outcome = decision(context);
  
      return typeof outcome === "function" ? decide(context, outcome) : outcome;
  }