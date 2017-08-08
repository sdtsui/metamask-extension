const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits

const { formatBalance, generateBalanceObject } = require('../util')

module.exports = BalanceComponent

inherits(BalanceComponent, Component)
function BalanceComponent () {
  Component.call(this)
}

BalanceComponent.prototype.render = function () {
  const props = this.props
  const { balanceValue } = props
  const needsParse = 'needsParse' in props ? props.needsParse : true
  const formattedBalance = balanceValue ? formatBalance(balanceValue, 6, needsParse) : '...'

  return h('div.balance-container', {}, [

    // TODO: balance icon needs to be passed in
    h('img.balance-icon', {
      src: '../images/eth_logo.svg',
      style: {},
    }),

    this.renderBalance(formattedBalance),
  ])
}

BalanceComponent.prototype.renderBalance = function (formattedBalance) {
  const props = this.props
  const { shorten } = props
  const showFiat = 'showFiat' in props ? props.showFiat : true

  if (formattedBalance === 'None' || formattedBalance === '...') {
    return h('div.flex-column.balance-display', {}, [
      h('div.token-amount', {
        style: {},
      }, formattedBalance),
    ])
  }

  return h('div.flex-column.balance-display', {}, [
    h('div.token-amount', {
      style: {},
    }, this.getTokenBalance(formattedBalance, shorten)),

    showFiat ? this.renderFiatValue(formattedBalance) : null,
  ])
}

BalanceComponent.prototype.renderFiatValue = function (formattedBalance) {

  const props = this.props
  const { conversionRate, currentCurrency } = props

  const fiatDisplayNumber = this.getFiatDisplayNumber(formattedBalance, conversionRate)

  return this.renderFiatAmount(fiatDisplayNumber, currentCurrency)
}

BalanceComponent.prototype.renderFiatAmount = function (fiatDisplayNumber, fiatSuffix) {
  if (fiatDisplayNumber === 'N/A') return null

  return h('div.fiat-amount', {
    style: {},
  }, `${fiatDisplayNumber} ${fiatSuffix}`)
}

BalanceComponent.prototype.getTokenBalance = function (formattedBalance, shorten) {
  const balanceObj = generateBalanceObject(formattedBalance, shorten ? 1 : 3)

  const balanceValue = shorten ? balanceObj.shortBalance : balanceObj.balance
  const label = balanceObj.label

  return `${balanceValue} ${label}`
}

BalanceComponent.prototype.getFiatDisplayNumber = function (formattedBalance, conversionRate) {
  if (formattedBalance === 'None') return formattedBalance
  if (conversionRate === 0) return 'N/A'

  const splitBalance = formattedBalance.split(' ')

  return (Number(splitBalance[0]) * conversionRate).toFixed(2)
}
