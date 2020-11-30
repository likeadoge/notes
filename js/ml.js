const tmTrue = { $: Symbol('true'), kind: 'info' }
const tmFalse = { $: Symbol('false'), kind: 'info' }
const tmIf = { $: Symbol('if'), kind: 'info' }
const tmZero = { $: Symbol('zero'), kind: 'info' }
const tmSucc = { $: Symbol('succ'), kind: 'info' }
const tmPred = { $: Symbol('pred'), kind: 'info' }
const tmIsZero = { $: Symbol('iszero'), kind: 'info' }




const tmTerm = {
    $: Symbol('term'),
    kind: 'type',
    valid: [
        [tmTrue.$],
        [tmFalse.$],
        [tmIf.$, tmTerm.$, tmTerm.$, tmTerm.$],
        [tmZero.$],
        [tmIsZero.$, tmTerm.$],
        [tmPred.$, tmTerm.$],
        [tmSucc.$, tmTerm.$]
    ]
}

const tmMatch = {
    $: Symbol('match'),
    kind: "fn_local"
}

const tmCase = {
    $: Symbol('case'), 
    kind: "fn_local"
}

const m = {
    input:[],
    
}

//  {
//     $: Symbol('isNum'),
//     kind: "fn_custom",
//     argu: [Symbol('_')],
//     body: ((_) => [tmMatch.$, _, []]
//     )(...isNum.argu)
// }

const fn = (self, args) => {
    const _self = self || Symbol(`anymous_${Math.random()}`)
    const _args = args || []

    return (genBody) => ({
        $: _self,
        kind: "fn_custom",
        argu: args,
        body: genBody(_self, _args)
    })
}

const cas = ()=>{

}

const isNum = fn(Symbol('isNum'), [Symbol("t")])(
    (isNum, [t]) => [
        tmMatch.$, t, [
            [[tmZero, _], tmTrue],
            [[tmSucc, _t1], isNum]
        ]
    ]
)