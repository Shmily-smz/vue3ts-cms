class localStorage {
  setItem(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getItem(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  removeItem(key: string) {
    window.localStorage.removeItem(key)
  }
  clearAllItem() {
    window.localStorage.clear()
  }
}
export default new localStorage()
