export default async function ({ redirect, $auth }) {
  let user = $auth.user
  if (!user) {
    redirect('/auth/login')
  }
}
