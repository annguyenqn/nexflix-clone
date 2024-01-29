import { NextPageContext } from "next"
import { signOut, getSession } from "next-auth/react"
import userCurrentUser from "../hooks/useCurrentUser"
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
export default function Home() {
  const { data: user } = userCurrentUser();
  console.log('this is user', user);

  return (
    <>
      <h1 className="text-red-500">netflix clone</h1>
      <p className="text-white">Logged in as : {user?.name}</p>
      <button onClick={() => signOut()}
        className="h-10 w-full bg-white"
      >  Logout</button>
    </>
  )
}
