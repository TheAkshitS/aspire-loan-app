export function creditLimit(state) {
  return new Intl.NumberFormat({ maximumSignificantDigits: 2 }).format(
    state.creditLimit,
  )
}

export function activeLoanList(state) {
  const activeLoanList = state.allLoans.filter(
    (loan) => loan.isApproved === true,
  )

  return activeLoanList
}
