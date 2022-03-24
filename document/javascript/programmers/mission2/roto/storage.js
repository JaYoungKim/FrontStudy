const storage = {
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      alert(e.message)
    }
  },
  getItem: (key, defaultValue) => {
    try {
      const storedValue = localStorage.getItem(key)

      if (storedValue) {
        return JSON.parse(storedValue)
      }

      return defaultValue
    } catch (e) {
      return defaultValue
    }
  },
}

export default storage
