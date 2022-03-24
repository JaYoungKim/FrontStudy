const storage = {
  getItem: (key, defaultValue) => {
    try {
      const storedValue = localStorage.getItem(key)
      if (storedValue) {
        return JSON.parse(storedValue)
      }
      return defaultValue
    } catch (error) {
      console.error(error.message)
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error.message)
    }
  }
}