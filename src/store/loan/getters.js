export function creditLimit (state) {    
    return new Intl.NumberFormat({ maximumSignificantDigits: 2 }).format(
        state.creditLimit,
    )
}
