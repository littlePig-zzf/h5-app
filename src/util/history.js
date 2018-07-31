export function back () {
  if (window.history.length > 1) {
    return this.$router.back()
  }

  this.$router.push(`/home`)
}
