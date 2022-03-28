import Icon from './icon'

export default function demo() {
  return (
    <>
      <h1>
        NextAuth.js Example{' '}
        <Icon
          type="icon-circle-true"
          style={{ color: '#52C41A', fontSize: '20px' }}
        />
      </h1>
      <p>
        This is an example site to demonstrate how to use{' '}
        <a href="https://next-auth.js.org">NextAuth.js</a> for authentication.
      </p>
    </>
  )
}
