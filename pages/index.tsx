import { NextPageContext } from "next"
import { signOut, getSession } from "next-auth/react"
import userCurrentUser from "../hooks/useCurrentUser"
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useInfoModalStore from "@/hooks/useInfoModalStore";
import useFavorites from "@/hooks/useFavorites";
import useMovieList from "@/hooks/useMovieList";
import InfoModal from "@/components/InfoModal";
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
  // const { data: user } = userCurrentUser();
  // console.log('this is user', user);
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModalStore();

  return (
    <>
      {/* <h1 className="text-red-500">netflix clone</h1>
      <p className="text-white">Logged in as : {user?.name}</p>
      <button onClick={() => signOut()}
        className="h-10 w-full bg-white"
      >  Logout</button> */}
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  )
}
