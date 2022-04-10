import Cookie from 'js-cookie'
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export const getUser = async () => {
  const token = Cookie.get('jwt')

  try {
    let response = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    response = await response.json()

    return response
  } catch (e) {
    return { error: 'An error occured' }
  }
}
